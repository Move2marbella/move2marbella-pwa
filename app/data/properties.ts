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

export async function fetchProperties(limit = 9) {
  const response = await fetch(
    `${WORDPRESS_PROPERTIES_URL}?per_page=${limit}&orderby=date&order=desc`,
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

export async function getPropertyByRef(ref: string) {
  const properties = await fetchProperties(9);

  return properties.find(
    (property) => property.ref.toLowerCase() === ref.toLowerCase(),
  );
}

export function getWhatsAppUrl(ref: string) {
  return `https://wa.me/34650059356?text=Hola%2C%20need%20more%20info%20%5B${ref}%5D`;
}
