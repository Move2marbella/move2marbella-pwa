import { getLocationCoordinate } from "./location-coordinates";

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
  slug: string;
  title: {
    rendered: string;
  };
  property_meta?: {
    _imported_ref?: string[];
    _property_import_data?: string[];
    fave_property_id?: string[];
  };
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
  currency: string;
  price: string;
  rawPrice: number;
  beds: string;
  baths: string;
  size: string;
  plot: string;
  terrace: string;
  tag: string;
  type: string;
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

type PropertyFilters = {
  bedrooms?: number;
  maxPrice?: number;
  propertyCities?: string[];
  propertyTypes?: string[];
  page?: number;
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
];

export const bedroomOptions = [1, 2, 3, 4, 5, 6];

const WORDPRESS_PROPERTIES_URL =
  "https://move2marbella.com/wp-json/wp/v2/properties";
const WORDPRESS_PROPERTY_CITIES_URL =
  "https://move2marbella.com/wp-json/wp/v2/property_city";
const WORDPRESS_PROPERTY_TYPES_URL =
  "https://move2marbella.com/wp-json/wp/v2/property_type";
const WORDPRESS_PROPERTY_FIELDS = "id,link,slug,title,property_meta";

function formatPrice(currency: string, price: string) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(price));
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
    const views = property.PropertyFeatures.Category.find(
      (category) => category.Type === "Views",
    )?.Value;
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
      currency: property.Currency,
      price: formatPrice(property.Currency, property.Price),
      rawPrice: Number(property.Price),
      beds: property.Bedrooms,
      baths: property.Bathrooms,
      size: `${property.Built} m2`,
      plot: property.GardenPlot ? `${property.GardenPlot} m2` : "Community",
      terrace: `${property.Terrace} m2`,
      tag: views?.includes("Sea") ? "Sea views" : propertyStatus,
      type: propertyType,
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
  const usesClientSideFilters = Boolean(filters.maxPrice || filters.bedrooms);
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
    {
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
  const filteredProperties = normalizedProperties.filter((property) => {
    if (filters.maxPrice && property.rawPrice > filters.maxPrice) {
      return false;
    }

    if (filters.bedrooms && Number(property.beds) < filters.bedrooms) {
      return false;
    }

    return true;
  });
  const properties = usesClientSideFilters
    ? filteredProperties.slice((page - 1) * limit, page * limit)
    : filteredProperties;
  const total = usesClientSideFilters
    ? filteredProperties.length
    : Number(response.headers.get("X-WP-Total") ?? posts.length);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    page,
    total,
    totalPages,
    properties,
  };
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
        const response = await fetch(
          `${WORDPRESS_PROPERTIES_URL}?${params.toString()}`,
          {
            next: {
              revalidate: 3600,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Could not fetch Move2Marbella property sitemap");
        }

        return (await response.json()) as WordPressProperty[];
      }),
    );

    restPages.push(...batch);
  }
  const propertiesByReference = new Map<
    string,
    { ref: string; modified: Date }
  >();

  for (const post of firstPage.concat(...restPages)) {
    const ref =
      post.property_meta?._imported_ref?.[0]?.trim() ||
      post.property_meta?.fave_property_id?.[0]?.trim();

    if (!ref || propertiesByReference.has(ref.toUpperCase())) {
      continue;
    }

    propertiesByReference.set(ref.toUpperCase(), {
      ref,
      modified: post.modified_gmt ? new Date(`${post.modified_gmt}Z`) : new Date(),
    });
  }

  return Array.from(propertiesByReference.values());
}

async function fetchPropertyByWordPressId(id: string) {
  const params = new URLSearchParams({
    _fields: WORDPRESS_PROPERTY_FIELDS,
  });
  const response = await fetch(`${WORDPRESS_PROPERTIES_URL}/${id}?${params}`, {
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    return null;
  }

  return normalizeProperty((await response.json()) as WordPressProperty);
}

async function findPropertyByReference(ref: string) {
  const pageSize = 20;
  const maxPagesToScan = 25;

  for (let page = 1; page <= maxPagesToScan; page += 1) {
    const result = await fetchProperties(pageSize, { page });
    const property = result.properties.find(
      (item) => item.ref.toLowerCase() === ref.toLowerCase(),
    );

    if (property) {
      return property;
    }

    if (page >= result.totalPages) {
      break;
    }
  }

  return null;
}

async function fetchTaxonomyTerms(url: string, errorMessage: string) {
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
        throw new Error(errorMessage);
      }

      return (await response.json()) as WordPressTerm[];
    }),
  );

  return firstPage.concat(...restPages);
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

function getTaxonomyFilterIds(
  selectedTermId: string,
  terms: TaxonomyOption[],
) {
  if (!selectedTermId) {
    return [];
  }

  const selectedId = Number(selectedTermId);
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
  return getTaxonomyFilterIds(selectedTypeId, propertyTypes);
}

export function getPropertyCityFilterIds(
  selectedCityId: string,
  propertyCities: PropertyCityOption[],
) {
  return getTaxonomyFilterIds(selectedCityId, propertyCities);
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
