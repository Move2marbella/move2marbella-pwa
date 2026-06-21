import { getLocationCoordinate } from "./location-coordinates";

function isNextDynamicServerError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    (error as { digest?: unknown }).digest === "DYNAMIC_SERVER_USAGE"
  );
}

type ResalesFeatureGroup = {
  Type: string;
  Value: string[];
};

type ResalesProperty = {
  Reference: string;
  AgencyRef?: string;
  Country?: string;
  Province?: string;
  Area?: string;
  Location: string;
  SubLocation?: string;
  PropertyType: {
    NameType: string;
    Type: string;
  };
  Status: {
    system?: string;
    en: string;
  };
  Bedrooms: string;
  Bathrooms: string;
  Currency: string;
  Price: string;
  Built: number;
  Terrace: number;
  GardenPlot: number;
  Description: string;
  PropertyFeatures: {
    Category: ResalesFeatureGroup[];
  };
  Pictures: {
    Picture: {
      Id: number;
      PictureURL: string;
      PictureCaption: string;
    }[];
  };
};

type WordPressProperty = {
  id: number;
  link: string;
  modified_gmt?: string;
  property_city?: number[];
  slug: string;
  title: {
    rendered: string;
  };
  property_meta?: {
    _imported_ref?: string[];
    _property_import_data?: string[];
    fave_property_id?: string[];
    fave_property_bedrooms?: string[];
    fave_property_price?: string[];
  };
  property_type?: number[];
};

type WordPressTerm = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
};

export type Property = {
  id: number;
  ref: string;
  agencyRef: string;
  title: string;
  location: string;
  city: string;
  cityIds: number[];
  currency: string;
  price: string;
  rawPrice: number;
  beds: string;
  baths: string;
  builtArea: number;
  plotArea: number;
  size: string;
  plot: string;
  terrace: string;
  tag: string;
  type: string;
  typeIds: number[];
  status: string;
  description: string;
  images: string[];
  featureGroups: ResalesFeatureGroup[];
  wordpressUrl: string;
  coordinates: {
    latitude: number;
    longitude: number;
    postalCode: string;
    source: string;
  } | null;
};

type TaxonomyOption = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
  depth: number;
};

export type PropertyTypeOption = TaxonomyOption;
export type PropertyCityOption = TaxonomyOption;

export type SearchOption = {
  label: string;
  value: string;
};

type PropertyFilters = {
  bedrooms?: number;
  keywords?: string[];
  maxPrice?: number;
  noStore?: boolean;
  propertyCities?: string[];
  reference?: string;
  seaView?: boolean;
  propertyTypes?: string[];
  page?: number;
  sort?: PropertySortOrder;
};

export type PropertySortOrder = "price_asc" | "price_desc" | "reference_desc";

type PropertySearchIndexEntry = {
  bedrooms: number;
  cityIds: number[];
  hasSeaViews: boolean;
  id: number;
  price: number;
  ref: string;
  typeIds: number[];
};

export const languages = [
  { code: "EN", label: "English" },
  { code: "ES", label: "Espanol" },
  { code: "FR", label: "Francais" },
  { code: "DE", label: "Deutsch" },
  { code: "RU", label: "Russian" },
  { code: "PL", label: "Polski" },
  { code: "HU", label: "Magyar" },
];

export const quickFilters = [
  { label: "Marbella", cityName: "Marbella" },
  { label: "Estepona", cityName: "Estepona" },
  { label: "Nueva Andalucia", cityName: "Nueva Andalucia" },
  { label: "Puerto Banus", cityName: "Puerto Banus" },
  { label: "Sea-View", seaView: true },
];

export const bedroomOptions = [1, 2, 3, 4, 5, 6];

const WORDPRESS_PROPERTIES_URL =
  "https://move2marbella.com/wp-json/wp/v2/properties";
const WORDPRESS_PROPERTY_CITIES_URL =
  "https://move2marbella.com/wp-json/wp/v2/property_city";
const WORDPRESS_PROPERTY_TYPES_URL =
  "https://move2marbella.com/wp-json/wp/v2/property_type";
const WORDPRESS_PROPERTY_FIELDS =
  "id,link,slug,title,property_city,property_type,property_meta";

function getCurrencyFormatter(currency: string) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
}

function parsePriceNumbers(price: string) {
  const matches = price.match(/\d[\d.,]*/g) ?? [];

  return matches
    .map((match) => Number(match.replace(/[.,]/g, "")))
    .filter((value) => Number.isFinite(value) && value > 0);
}

function getRawPrice(price: string) {
  return parsePriceNumbers(price)[0] ?? 0;
}

function formatPrice(currency: string, price: string) {
  const formatter = getCurrencyFormatter(currency);
  const prices = parsePriceNumbers(price);

  if (prices.length >= 2) {
    return `${formatter.format(prices[0])} - ${formatter.format(prices[1])}`;
  }

  if (prices.length === 1) {
    return formatter.format(prices[0]);
  }

  return price;
}

function featureValuesIncludeSea(values?: string[]) {
  return Boolean(
    values?.some((value) =>
      normalizeSearchText(decodeUnicodeArtifacts(value)).includes("sea"),
    ),
  );
}

function propertyHasSeaViews(property: ResalesProperty) {
  const views = property.PropertyFeatures.Category.find(
    (category) => decodeUnicodeArtifacts(category.Type) === "Views",
  )?.Value;

  return featureValuesIncludeSea(views);
}

function stripHtml(value: string) {
  return decodeUnicodeArtifacts(value)
    .replace(/<[^>]*>/g, "")
    .replace(/&#8211;/g, "-")
    .replace(/&amp;/g, "&")
    .trim();
}

function cleanDescription(value: string) {
  return decodeUnicodeArtifacts(value)
    .replace(/\\r\\n|\\n|\\r/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeUnicodeArtifacts(value?: string) {
  if (!value) {
    return "";
  }

  return value.replace(/u([0-9a-fA-F]{4})/g, (_, codePoint: string) =>
    String.fromCharCode(parseInt(codePoint, 16)),
  );
}

function normalizeProperty(post: WordPressProperty): Property | null {
  const importData = post.property_meta?._property_import_data?.[0];

  if (!importData) {
    return null;
  }

  try {
    const property = JSON.parse(importData) as ResalesProperty;
    const propertyLocation = decodeUnicodeArtifacts(property.Location);
    const propertySubLocation = decodeUnicodeArtifacts(property.SubLocation);
    const propertyArea =
      decodeUnicodeArtifacts(property.Area) || "Costa del Sol";
    const propertyType = decodeUnicodeArtifacts(property.PropertyType.NameType);
    const propertyStatus = decodeUnicodeArtifacts(property.Status.en);
    const coordinates = getLocationCoordinate(
      propertySubLocation,
      propertyLocation,
    );
    const subLocation = propertySubLocation ? `, ${propertySubLocation}` : "";
    const location = `${propertyLocation}${subLocation}, ${propertyArea}`;
    const hasSeaViews = propertyHasSeaViews(property);
    const images = property.Pictures.Picture.map(
      (picture) => picture.PictureURL,
    );

    return {
      id: post.id,
      ref: property.Reference,
      agencyRef: property.AgencyRef ?? property.Reference,
      title: stripHtml(post.title.rendered),
      location,
      city: propertyLocation,
      cityIds: post.property_city ?? [],
      currency: property.Currency,
      price: formatPrice(property.Currency, property.Price),
      rawPrice: getRawPrice(property.Price),
      beds: property.Bedrooms,
      baths: property.Bathrooms,
      builtArea: property.Built,
      plotArea: property.GardenPlot,
      size: `${property.Built} m2`,
      plot: property.GardenPlot ? `${property.GardenPlot} m2` : "Community",
      terrace: `${property.Terrace} m2`,
      tag: hasSeaViews ? "Sea views" : propertyStatus,
      type: propertyType,
      typeIds: post.property_type ?? [],
      status: propertyStatus,
      description: cleanDescription(property.Description),
      images,
      featureGroups: property.PropertyFeatures.Category.map((group) => ({
        Type: decodeUnicodeArtifacts(group.Type),
        Value: group.Value.map((value) => decodeUnicodeArtifacts(value)),
      })),
      wordpressUrl: post.link,
      coordinates,
    };
  } catch {
    return null;
  }
}

export async function fetchProperties(limit = 9, filters: PropertyFilters = {}) {
  try {
    const usesClientSideFilters = Boolean(
      filters.maxPrice ||
        filters.bedrooms ||
        filters.reference ||
        filters.seaView ||
        filters.sort ||
        filters.keywords?.length,
    );

    if (usesClientSideFilters) {
      const index = await fetchPropertySearchIndex();
      const filteredEntries = index.filter((property) => {
        if (
          filters.reference &&
          property.ref.toUpperCase() !== filters.reference.trim().toUpperCase()
        ) {
          return false;
        }

        if (filters.maxPrice && property.price > filters.maxPrice) {
          return false;
        }

        if (filters.bedrooms && property.bedrooms < filters.bedrooms) {
          return false;
        }

        if (filters.seaView && !property.hasSeaViews) {
          return false;
        }

        if (
          filters.propertyCities?.length &&
          !filters.propertyCities.some((id) => property.cityIds.includes(Number(id)))
        ) {
          return false;
        }

        if (
          filters.propertyTypes?.length &&
          !filters.propertyTypes.some((id) => property.typeIds.includes(Number(id)))
        ) {
          return false;
        }

        return true;
      });
      const sortedEntries = sortPropertySearchEntries(
        filteredEntries,
        filters.sort ?? "reference_desc",
      );
      const page = filters.page ?? 1;
      const candidateLimit = filters.keywords?.length ? 36 : limit;
      const entries = sortedEntries.slice(0, Math.max(page * limit, candidateLimit));
      const detailedProperties = (
        await Promise.all(
          entries.map((property) => fetchPropertyByWordPressId(String(property.id))),
        )
      ).filter((property): property is Property => Boolean(property));
      const matchingProperties = propertyMatchesFilters(detailedProperties, filters);
      const properties = matchingProperties.slice((page - 1) * limit, page * limit);
      const total = filters.keywords?.length ? matchingProperties.length : sortedEntries.length;

      return {
        page,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
        properties,
      };
    }

    const params = new URLSearchParams({
      per_page: String(usesClientSideFilters ? 100 : limit),
      page: String(usesClientSideFilters ? 1 : (filters.page ?? 1)),
      orderby: "date",
      order: "desc",
      _fields: WORDPRESS_PROPERTY_FIELDS,
    });

    if (filters.propertyTypes?.length) {
      params.set("property_type", filters.propertyTypes.join(","));
    }

    if (filters.propertyCities?.length) {
      params.set("property_city", filters.propertyCities.join(","));
    }

    const response = await fetch(
      `${WORDPRESS_PROPERTIES_URL}?${params.toString()}`,
      filters.noStore
        ? {
            cache: "no-store",
          }
        : {
            next: {
              revalidate: 300,
            },
          },
    );

    if (!response.ok) {
      throw new Error("Could not fetch Move2Marbella properties");
    }

    const posts = (await response.json()) as WordPressProperty[];
    const page = filters.page ?? 1;
    const normalizedProperties = posts
      .map(normalizeProperty)
      .filter((property): property is Property => Boolean(property));
    const filteredProperties = propertyMatchesFilters(normalizedProperties, filters);
    const properties = sortProperties(filteredProperties, filters.sort ?? "reference_desc");
    const total = Number(response.headers.get("X-WP-Total") ?? posts.length);
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return {
      page,
      total,
      totalPages,
      properties,
    };
  } catch (error) {
    if (isNextDynamicServerError(error)) {
      throw error;
    }

    console.error("Move2Marbella property fetch failed", error);

    return {
      page: filters.page ?? 1,
      total: 0,
      totalPages: 1,
      properties: [],
    };
  }
}

function sortPropertySearchEntries(
  properties: PropertySearchIndexEntry[],
  sort: PropertySortOrder,
) {
  return [...properties].sort((left, right) => {
    if (sort === "reference_desc") {
      return getReferenceNumber(right.ref) - getReferenceNumber(left.ref);
    }

    const direction = sort === "price_asc" ? 1 : -1;

    return (left.price - right.price) * direction;
  });
}

function sortProperties(properties: Property[], sort: PropertySortOrder) {
  return [...properties].sort((left, right) => {
    if (sort === "reference_desc") {
      return getReferenceNumber(right.ref) - getReferenceNumber(left.ref);
    }

    const direction = sort === "price_asc" ? 1 : -1;

    return (left.rawPrice - right.rawPrice) * direction;
  });
}

function getReferenceNumber(ref: string) {
  return Number(ref.replace(/\D/g, "")) || 0;
}

function getIndexedPropertyHasSeaViews(post: WordPressProperty) {
  const importData = post.property_meta?._property_import_data?.[0];

  if (!importData) {
    return false;
  }

  try {
    return propertyHasSeaViews(JSON.parse(importData) as ResalesProperty);
  } catch {
    return false;
  }
}

async function fetchPropertySearchIndex() {
  try {
    const baseParams = new URLSearchParams({
      per_page: "100",
      page: "1",
      orderby: "modified",
      order: "desc",
      _fields:
        "id,property_city,property_type,property_meta._imported_ref,property_meta._property_import_data,property_meta.fave_property_id,property_meta.fave_property_price,property_meta.fave_property_bedrooms",
    });
    const firstResponse = await fetch(
      `${WORDPRESS_PROPERTIES_URL}?${baseParams.toString()}`,
      {
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!firstResponse.ok) {
      throw new Error("Could not fetch Move2Marbella property search index");
    }

    const firstPage = (await firstResponse.json()) as WordPressProperty[];
    const totalPages = Number(firstResponse.headers.get("X-WP-TotalPages") ?? 1);
    const restPages = await fetchWordPressPropertyPages(baseParams, totalPages, 3600);
    const propertiesByReference = new Map<string, PropertySearchIndexEntry>();

    for (const post of firstPage.concat(...restPages)) {
      const ref =
        post.property_meta?._imported_ref?.[0]?.trim() ||
        post.property_meta?.fave_property_id?.[0]?.trim();

      if (!ref || propertiesByReference.has(ref.toUpperCase())) {
        continue;
      }

      propertiesByReference.set(ref.toUpperCase(), {
        bedrooms: Number(post.property_meta?.fave_property_bedrooms?.[0] ?? 0),
        cityIds: post.property_city ?? [],
        hasSeaViews: getIndexedPropertyHasSeaViews(post),
        id: post.id,
        price: getRawPrice(post.property_meta?.fave_property_price?.[0] ?? "0"),
        ref,
        typeIds: post.property_type ?? [],
      });
    }

    return Array.from(propertiesByReference.values());
  } catch (error) {
    if (isNextDynamicServerError(error)) {
      throw error;
    }

    console.error("Move2Marbella property search index fetch failed", error);

    return [];
  }
}

function propertyMatchesFilters(properties: Property[], filters: PropertyFilters) {
  return properties.filter((property) => {
    if (filters.maxPrice && property.rawPrice > filters.maxPrice) {
      return false;
    }

    if (filters.bedrooms && Number(property.beds) < filters.bedrooms) {
      return false;
    }

    if (filters.seaView && !propertyMatchesKeywords(property, ["sea views"])) {
      return false;
    }

    if (
      filters.propertyCities?.length &&
      !filters.propertyCities.some((id) => property.cityIds.includes(Number(id)))
    ) {
      return false;
    }

    if (
      filters.propertyTypes?.length &&
      !filters.propertyTypes.some((id) => property.typeIds.includes(Number(id)))
    ) {
      return false;
    }

    if (filters.keywords?.length && !propertyMatchesKeywords(property, filters.keywords)) {
      return false;
    }

    return true;
  });
}

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function propertyMatchesKeywords(property: Property, keywords: string[]) {
  const searchableText = normalizeSearchText(
    [
      property.title,
      property.location,
      property.type,
      property.tag,
      property.status,
      property.description,
      ...property.featureGroups.flatMap((group) => [group.Type, ...group.Value]),
    ].join(" "),
  );

  return keywords.every((keyword) => {
    const normalizedKeyword = normalizeSearchText(keyword);

    if (normalizedKeyword === "sea views") {
      return searchableText.includes("sea") || searchableText.includes("mar");
    }

    if (normalizedKeyword === "new build") {
      return (
        searchableText.includes("new build") ||
        searchableText.includes("new development") ||
        searchableText.includes("brand new") ||
        searchableText.includes("obra nueva")
      );
    }

    if (normalizedKeyword === "beachside") {
      return (
        searchableText.includes("beachside") ||
        searchableText.includes("close to beach") ||
        searchableText.includes("close to the beach") ||
        searchableText.includes("walking distance to beach") ||
        searchableText.includes("walk to beach") ||
        searchableText.includes("near beach")
      );
    }

    if (normalizedKeyword === "beachfront") {
      return (
        searchableText.includes("beachfront") ||
        searchableText.includes("frontline beach") ||
        searchableText.includes("front line beach") ||
        searchableText.includes("first line beach")
      );
    }

    return normalizedKeyword
      .split(" ")
      .filter(Boolean)
      .every((token) => searchableText.includes(token));
  });
}

export async function fetchPropertySitemapEntries() {
  const baseParams = new URLSearchParams({
    per_page: "100",
    page: "1",
    orderby: "modified",
    order: "desc",
    _fields:
      "id,modified_gmt,property_meta._imported_ref,property_meta.fave_property_id",
  });
  const firstResponse = await fetch(
    `${WORDPRESS_PROPERTIES_URL}?${baseParams.toString()}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!firstResponse.ok) {
    throw new Error("Could not fetch Move2Marbella property sitemap");
  }

  const firstPage = (await firstResponse.json()) as WordPressProperty[];
  const totalPages = Number(firstResponse.headers.get("X-WP-TotalPages") ?? 1);
  const restPages = await fetchWordPressPropertyPages(baseParams, totalPages, 3600);
  const propertiesByReference = new Map<
    string,
    { id: number; ref: string; modified: Date }
  >();

  for (const post of firstPage.concat(...restPages)) {
    const ref =
      post.property_meta?._imported_ref?.[0]?.trim() ||
      post.property_meta?.fave_property_id?.[0]?.trim();

    if (!ref || propertiesByReference.has(ref.toUpperCase())) {
      continue;
    }

    propertiesByReference.set(ref.toUpperCase(), {
      id: post.id,
      ref,
      modified: post.modified_gmt ? new Date(`${post.modified_gmt}Z`) : new Date(),
    });
  }

  return Array.from(propertiesByReference.values());
}

async function fetchWordPressPropertyPages(
  baseParams: URLSearchParams,
  totalPages: number,
  revalidate: number,
) {
  const restPages: WordPressProperty[][] = [];
  const batchSize = 5;

  for (
    let firstPageInBatch = 2;
    firstPageInBatch <= totalPages;
    firstPageInBatch += batchSize
  ) {
    const pagesInBatch = Array.from(
      { length: Math.min(batchSize, totalPages - firstPageInBatch + 1) },
      (_, index) => firstPageInBatch + index,
    );
    const batch = await Promise.all(
      pagesInBatch.map(async (page) => {
        const params = new URLSearchParams(baseParams);
        params.set("page", String(page));

        try {
          const response = await fetch(
            `${WORDPRESS_PROPERTIES_URL}?${params.toString()}`,
            {
              next: {
                revalidate,
              },
            },
          );

          if (!response.ok) {
            return [];
          }

          return (await response.json()) as WordPressProperty[];
        } catch (error) {
          if (isNextDynamicServerError(error)) {
            throw error;
          }

          console.error("Move2Marbella property page fetch failed", error);

          return [];
        }
      }),
    );

    restPages.push(...batch);
  }

  return restPages;
}

async function fetchPropertyByExactReference(ref: string) {
  const normalizedReference = ref.trim().toUpperCase();

  if (!normalizedReference) {
    return null;
  }

  const entries = await fetchPropertySearchIndex();
  const entry = entries.find(
    (property) => property.ref.toUpperCase() === normalizedReference,
  );

  return entry ? fetchPropertyByWordPressId(String(entry.id)) : null;
}

async function fetchPropertyByWordPressId(id: string) {
  const params = new URLSearchParams({
    _fields: WORDPRESS_PROPERTY_FIELDS,
  });

  try {
    const response = await fetch(`${WORDPRESS_PROPERTIES_URL}/${id}?${params}`, {
      next: {
        revalidate: 300,
      },
    });

    if (!response.ok) {
      return null;
    }

    return normalizeProperty((await response.json()) as WordPressProperty);
  } catch (error) {
    if (isNextDynamicServerError(error)) {
      throw error;
    }

    console.error("Move2Marbella property detail fetch failed", error);

    return null;
  }
}

async function findPropertyByReference(ref: string) {
  return fetchPropertyByExactReference(ref);
}

async function fetchTaxonomyTerms(url: string, errorMessage: string) {
  try {
    const baseParams = new URLSearchParams({
      per_page: "100",
      orderby: "name",
      order: "asc",
    });
    const firstResponse = await fetch(`${url}?${baseParams.toString()}`, {
      next: {
        revalidate: 300,
      },
    });

    if (!firstResponse.ok) {
      throw new Error(errorMessage);
    }

    const firstPage = (await firstResponse.json()) as WordPressTerm[];
    const totalPages = Number(firstResponse.headers.get("X-WP-TotalPages") ?? 1);

    if (totalPages <= 1) {
      return firstPage;
    }

    const restPages = await Promise.all(
      Array.from({ length: totalPages - 1 }, async (_, index) => {
        const params = new URLSearchParams(baseParams);
        params.set("page", String(index + 2));

        const response = await fetch(`${url}?${params.toString()}`, {
          next: {
            revalidate: 300,
          },
        });

        if (!response.ok) {
          return [];
        }

        return (await response.json()) as WordPressTerm[];
      }),
    );

    return firstPage.concat(...restPages);
  } catch (error) {
    if (isNextDynamicServerError(error)) {
      throw error;
    }

    console.error(errorMessage, error);

    return [];
  }
}

function orderTermsByHierarchy(terms: WordPressTerm[]) {
  const childrenByParent = new Map<number, WordPressTerm[]>();

  for (const term of terms) {
    const children = childrenByParent.get(term.parent) ?? [];
    children.push(term);
    childrenByParent.set(term.parent, children);
  }

  for (const children of childrenByParent.values()) {
    children.sort((a, b) => a.name.localeCompare(b.name));
  }

  const ordered: TaxonomyOption[] = [];

  function walk(parentId: number, depth: number) {
    for (const term of childrenByParent.get(parentId) ?? []) {
      ordered.push({
        id: term.id,
        name: term.name,
        slug: term.slug,
        parent: term.parent,
        count: term.count,
        depth,
      });
      walk(term.id, depth + 1);
    }
  }

  walk(0, 0);

  return ordered;
}

export async function fetchPropertyTypes() {
  const terms = await fetchTaxonomyTerms(
    WORDPRESS_PROPERTY_TYPES_URL,
    "Could not fetch Move2Marbella property types",
  );

  return orderTermsByHierarchy(terms);
}

export async function fetchPropertyCities() {
  const terms = await fetchTaxonomyTerms(
    WORDPRESS_PROPERTY_CITIES_URL,
    "Could not fetch Move2Marbella property cities",
  );

  return orderTermsByHierarchy(terms);
}

export const PROPERTY_CITY_SEARCH_OPTIONS = [
  { label: "Marbella East", slug: "marbella-east" },
  { label: "Marbella", slug: "marbella-golden-mile" },
  { label: "Marbella West", slug: "marbella-west" },
  { label: "Benahavís", slug: "benahavis-area" },
  { label: "Estepona", slug: "estepona-area" },
  { label: "Mijas Costa", slug: "mijas-area" },
  { label: "Benalmádena", slug: "benalmadena-area" },
  { label: "Fuengirola", slug: "fuengirola-area" },
  { label: "Inland", slug: "inland" },
  { label: "Málaga", slug: "malaga" },
];

const PROPERTY_TYPE_SEARCH_OPTIONS = [
  { label: "Apartment", slug: "apartment" },
  { label: "House", slug: "house" },
  { label: "Plot", slug: "plot" },
  { label: "Commercial", slug: "commercial" },
  { label: "Penthouse", slug: "penthouse" },
  { label: "Townhouse", slug: "townhouse" },
];

const PROPERTY_TYPE_FILTER_SLUGS: Record<string, string[]> = {
  penthouse: ["penthouse", "penthouse-duplex"],
};

export function getSimplifiedPropertyCityOptions(
  propertyCities: PropertyCityOption[],
) {
  return getSearchOptions(PROPERTY_CITY_SEARCH_OPTIONS, propertyCities);
}

export function getSimplifiedPropertyTypeOptions(
  propertyTypes: PropertyTypeOption[],
) {
  return getSearchOptions(PROPERTY_TYPE_SEARCH_OPTIONS, propertyTypes);
}

function getSearchOptions(
  options: { label: string; slug: string }[],
  terms: TaxonomyOption[],
) {
  return options
    .map((option) => {
      const term = terms.find((term) => term.slug === option.slug);

      if (!term) {
        return null;
      }

      return {
        label: option.label,
        value: option.slug,
      };
    })
    .filter((option): option is SearchOption => Boolean(option));
}

function getTaxonomyFilterIds(
  selectedTermId: string,
  terms: TaxonomyOption[],
) {
  if (!selectedTermId) {
    return [];
  }

  const selectedTerm =
    terms.find((term) => term.slug === selectedTermId) ??
    terms.find((term) => String(term.id) === selectedTermId);

  if (!selectedTerm) {
    return [];
  }

  const selectedId = selectedTerm.id;
  const ids = new Set<number>([selectedId]);
  let changed = true;

  while (changed) {
    changed = false;

    for (const term of terms) {
      if (ids.has(term.parent) && !ids.has(term.id)) {
        ids.add(term.id);
        changed = true;
      }
    }
  }

  return Array.from(ids).map(String);
}

export function getPropertyTypeFilterIds(
  selectedTypeId: string,
  propertyTypes: PropertyTypeOption[],
) {
  const selectedSlugs = PROPERTY_TYPE_FILTER_SLUGS[selectedTypeId] ?? [
    selectedTypeId,
  ];
  const ids = new Set<string>();

  for (const selectedSlug of selectedSlugs) {
    for (const id of getTaxonomyFilterIds(selectedSlug, propertyTypes)) {
      ids.add(id);
    }
  }

  return Array.from(ids);
}

export function getPropertyCityFilterIds(
  selectedCityId: string,
  propertyCities: PropertyCityOption[],
) {
  return getTaxonomyFilterIds(selectedCityId, propertyCities);
}

export function getPropertyCityDescendants(
  selectedCityId: string,
  propertyCities: PropertyCityOption[],
) {
  const ids = getPropertyCityFilterIds(selectedCityId, propertyCities).map(Number);
  const selectedTerm =
    propertyCities.find((term) => term.slug === selectedCityId) ??
    propertyCities.find((term) => String(term.id) === selectedCityId);

  if (!selectedTerm) {
    return [];
  }

  return propertyCities.filter(
    (term) => ids.includes(term.id) && term.id !== selectedTerm.id,
  );
}

export async function getPropertyByRef(ref: string, wordpressId?: string) {
  if (wordpressId) {
    const property = await fetchPropertyByWordPressId(wordpressId);

    if (property?.ref.toLowerCase() === ref.toLowerCase()) {
      return property;
    }
  }

  return findPropertyByReference(ref);
}

export function getWhatsAppUrl(ref: string) {
  return `https://wa.me/34650059356?text=Hola%2C%20need%20more%20info%20%5B${ref}%5D`;
}

export function getGeneralWhatsAppUrl() {
  return "https://wa.me/34650059356?text=Hi%20Move2Marbella%2C%20I%20am%20looking%20for%20a%20property.";
}
