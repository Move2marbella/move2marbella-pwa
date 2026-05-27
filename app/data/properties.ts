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
  slug: string;
  title: {
    rendered: string;
  };
  property_meta?: {
    _property_import_data?: string[];
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
  price: string;
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
};

export type PropertyTypeOption = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
  depth: number;
};

type PropertyFilters = {
  propertyType?: string;
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
  "Marbella",
  "Estepona",
  "Nueva Andalucia",
  "Puerto Banus",
  "Beachfront",
  "Hot offer",
];

const WORDPRESS_PROPERTIES_URL =
  "https://move2marbella.com/wp-json/wp/v2/properties";
const WORDPRESS_PROPERTY_TYPES_URL =
  "https://move2marbella.com/wp-json/wp/v2/property_type";

function formatPrice(currency: string, price: string) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(price));
}

function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&#8211;/g, "-")
    .replace(/&amp;/g, "&")
    .trim();
}

function cleanDescription(value: string) {
  return value
    .replace(/\\r\\n|\\n|\\r/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeProperty(post: WordPressProperty): Property | null {
  const importData = post.property_meta?._property_import_data?.[0];

  if (!importData) {
    return null;
  }

  try {
    const property = JSON.parse(importData) as ResalesProperty;
    const subLocation = property.SubLocation ? `, ${property.SubLocation}` : "";
    const location = `${property.Location}${subLocation}, ${
      property.Area ?? "Costa del Sol"
    }`;
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
      city: property.Location,
      price: formatPrice(property.Currency, property.Price),
      beds: property.Bedrooms,
      baths: property.Bathrooms,
      size: `${property.Built} m2`,
      plot: property.GardenPlot ? `${property.GardenPlot} m2` : "Community",
      terrace: `${property.Terrace} m2`,
      tag: views?.includes("Sea") ? "Sea views" : property.Status.en,
      type: property.PropertyType.NameType,
      status: property.Status.en,
      description: cleanDescription(property.Description),
      images,
      featureGroups: property.PropertyFeatures.Category,
      wordpressUrl: post.link,
    };
  } catch {
    return null;
  }
}

export async function fetchProperties(limit = 9, filters: PropertyFilters = {}) {
  const params = new URLSearchParams({
    per_page: String(limit),
    orderby: "date",
    order: "desc",
  });

  if (filters.propertyType) {
    params.set("property_type", filters.propertyType);
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

  return posts
    .map(normalizeProperty)
    .filter((property): property is Property => Boolean(property));
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

  const ordered: PropertyTypeOption[] = [];

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
  const response = await fetch(
    `${WORDPRESS_PROPERTY_TYPES_URL}?per_page=100&orderby=name&order=asc`,
    {
      next: {
        revalidate: 300,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Could not fetch Move2Marbella property types");
  }

  const terms = (await response.json()) as WordPressTerm[];

  return orderTermsByHierarchy(terms);
}

export async function getPropertyByRef(ref: string) {
  const properties = await fetchProperties(9);

  return properties.find(
    (property) => property.ref.toLowerCase() === ref.toLowerCase(),
  );
}

export function getWhatsAppUrl(ref: string) {
  return `https://wa.me/34650059356?text=Hola%2C%20need%20more%20info%20%5B${ref}%5D`;
}

export function getGeneralWhatsAppUrl() {
  return "https://wa.me/34650059356?text=Hi%20Move2Marbella%2C%20I%20am%20looking%20for%20a%20property.";
}
