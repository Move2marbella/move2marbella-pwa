import fs from "node:fs/promises";
import path from "node:path";

const WORDPRESS_PROPERTIES_URL =
  "https://move2marbella.com/wp-json/wp/v2/properties";
const OUTPUT_PATH = path.join(process.cwd(), "public", "property-search-index.json");
const PROPERTY_FIELDS = [
  "id",
  "link",
  "modified_gmt",
  "property_city",
  "property_status",
  "property_type",
  "slug",
  "title",
  "property_meta._imported_ref",
  "property_meta._property_import_data",
  "property_meta.fave_property_bedrooms",
  "property_meta.fave_property_id",
  "property_meta.fave_property_price",
  "property_meta.own_property",
].join(",");

function decodeUnicodeArtifacts(value = "") {
  return String(value).replace(/u([0-9a-fA-F]{4})/g, (_, codePoint) =>
    String.fromCharCode(parseInt(codePoint, 16)),
  );
}

function stripHtml(value = "") {
  return decodeUnicodeArtifacts(value)
    .replace(/<[^>]*>/g, "")
    .replace(/&#8211;/g, "-")
    .replace(/&amp;/g, "&")
    .trim();
}

function cleanDescription(value = "") {
  return decodeUnicodeArtifacts(value)
    .replace(/\\r\\n|\\n|\\r/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeSearchText(value = "") {
  return decodeUnicodeArtifacts(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function parsePriceNumbers(price = "") {
  const matches = String(price).match(/\d[\d.,]*/g) ?? [];

  return matches
    .map((match) => Number(match.replace(/[.,]/g, "")))
    .filter((value) => Number.isFinite(value) && value > 0);
}

function getRawPrice(price = "") {
  return parsePriceNumbers(price)[0] ?? 0;
}

function formatPrice(currency = "EUR", price = "") {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  const prices = parsePriceNumbers(price);

  if (prices.length >= 2) {
    return `${formatter.format(prices[0])} - ${formatter.format(prices[1])}`;
  }

  if (prices.length === 1) {
    return formatter.format(prices[0]);
  }

  return price;
}

function featureValuesIncludeSea(values = []) {
  return values.some((value) =>
    normalizeSearchText(decodeUnicodeArtifacts(value)).includes("sea"),
  );
}

function propertyHasSeaViews(property) {
  const views = property.PropertyFeatures?.Category?.find(
    (category) => decodeUnicodeArtifacts(category.Type) === "Views",
  )?.Value;

  return featureValuesIncludeSea(views);
}

function propertyHasBeachfront(property) {
  const beachfrontAliases = new Set(["beachfront", "front line beach complex"]);

  return (property.PropertyFeatures?.Category ?? []).some((group) =>
    (group.Value ?? []).some((value) =>
      beachfrontAliases.has(normalizeSearchText(decodeUnicodeArtifacts(value))),
    ),
  );
}

function propertyHasHeatedPool(property) {
  return (property.PropertyFeatures?.Category ?? []).some((group) =>
    (group.Value ?? []).some(
      (value) =>
        normalizeSearchText(decodeUnicodeArtifacts(value)) === "heated pool",
    ),
  );
}

function toListingImageUrl(url = "") {
  return url.replace("/w1200/", "/w600/");
}

function normalizePost(post) {
  const importData = post.property_meta?._property_import_data?.[0];

  if (!importData) {
    return null;
  }

  try {
    const property = JSON.parse(importData);
    const city = decodeUnicodeArtifacts(property.Location);
    const subLocation = decodeUnicodeArtifacts(property.SubLocation);
    const area = decodeUnicodeArtifacts(property.Area) || "Costa del Sol";
    const propertyType = decodeUnicodeArtifacts(property.PropertyType?.NameType);
    const propertyStatus = decodeUnicodeArtifacts(property.Status?.en);
    const currentPrice =
      post.property_meta?.fave_property_price?.[0]?.trim() || property.Price;
    const location = `${city}${subLocation ? `, ${subLocation}` : ""}, ${area}`;
    const images = (property.Pictures?.Picture ?? [])
      .map((picture) => toListingImageUrl(picture.PictureURL))
      .filter(Boolean)
      .slice(0, 1);
    const featureGroups = (property.PropertyFeatures?.Category ?? []).map((group) => ({
      type: decodeUnicodeArtifacts(group.Type),
      values: (group.Value ?? []).map((value) => decodeUnicodeArtifacts(value)),
    }));
    const description = cleanDescription(property.Description);
    const ref =
      property.Reference ||
      post.property_meta?._imported_ref?.[0]?.trim() ||
      post.property_meta?.fave_property_id?.[0]?.trim();

    if (!ref) {
      return null;
    }

    return {
      agencyRef: property.AgencyRef || ref,
      baths: String(property.Bathrooms ?? "0"),
      bedrooms: Number(property.Bedrooms ?? post.property_meta?.fave_property_bedrooms?.[0] ?? 0),
      builtArea: Number(property.Built ?? 0),
      city,
      cityIds: post.property_city ?? [],
      currency: property.Currency || "EUR",
      hasBeachfront: propertyHasBeachfront(property),
      hasHeatedPool: propertyHasHeatedPool(property),
      hasSeaViews: propertyHasSeaViews(property),
      id: post.id,
      images,
      isOwnProperty: post.property_meta?.own_property?.[0] === "1",
      location,
      modified: post.modified_gmt ? `${post.modified_gmt}Z` : new Date().toISOString(),
      plotArea: Number(property.GardenPlot ?? 0),
      price: getRawPrice(currentPrice),
      priceLabel: formatPrice(property.Currency || "EUR", currentPrice),
      ref,
      searchText: normalizeSearchText(
        [
          stripHtml(post.title?.rendered ?? ""),
          location,
          propertyType,
          propertyStatus,
          description.slice(0, 1600),
          ...featureGroups.flatMap((group) => [group.type, ...group.values]),
        ].join(" "),
      ),
      status: propertyStatus,
      statusIds: post.property_status ?? [],
      tag: propertyHasSeaViews(property) ? "Sea views" : propertyStatus,
      terrace: Number(property.Terrace ?? 0),
      title: stripHtml(post.title?.rendered ?? ""),
      type: propertyType,
      typeIds: post.property_type ?? [],
      wordpressUrl: post.link,
    };
  } catch (error) {
    console.warn(`Skipping malformed property post ${post.id}`, error);
    return null;
  }
}

async function fetchPage(page) {
  const params = new URLSearchParams({
    per_page: "100",
    page: String(page),
    orderby: "modified",
    order: "desc",
    _fields: PROPERTY_FIELDS,
  });
  const response = await fetch(`${WORDPRESS_PROPERTIES_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`WordPress properties page ${page} failed: ${response.status}`);
  }

  return {
    posts: await response.json(),
    totalPages: Number(response.headers.get("X-WP-TotalPages") ?? 1),
  };
}

async function main() {
  const firstPage = await fetchPage(1);
  const allPosts = [...firstPage.posts];
  const batchSize = 6;

  for (let page = 2; page <= firstPage.totalPages; page += batchSize) {
    const pages = Array.from(
      { length: Math.min(batchSize, firstPage.totalPages - page + 1) },
      (_, index) => page + index,
    );
    const batches = await Promise.all(pages.map(fetchPage));
    allPosts.push(...batches.flatMap((batch) => batch.posts));
  }

  const propertiesByReference = new Map();

  for (const post of allPosts) {
    const property = normalizePost(post);

    if (!property) {
      continue;
    }

    const key = property.ref.toUpperCase();
    const current = propertiesByReference.get(key);

    if (!current || new Date(property.modified) > new Date(current.modified)) {
      propertiesByReference.set(key, property);
    }
  }

  const properties = Array.from(propertiesByReference.values()).sort(
    (left, right) =>
      new Date(right.modified).getTime() - new Date(left.modified).getTime(),
  );
  const snapshot = {
    generatedAt: new Date().toISOString(),
    source: WORDPRESS_PROPERTIES_URL,
    count: properties.length,
    properties,
  };

  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(snapshot)}\n`);
  console.log(
    `Wrote ${properties.length} properties to ${path.relative(process.cwd(), OUTPUT_PATH)}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
