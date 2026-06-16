import type {
  PropertyCityOption,
  PropertyTypeOption,
} from "../data/properties";

type ParsedPropertyQuery = {
  bedrooms?: number;
  keywords: string[];
  maxPrice?: number;
  propertyCity?: string;
  propertyType?: string;
};

const priceMultipliers: Record<string, number> = {
  k: 1000,
  m: 1000000,
  million: 1000000,
  millions: 1000000,
  millio: 1000000,
  millió: 1000000,
};

const propertyTypeAliases: Record<string, string[]> = {
  apartment: ["apartment", "apartman", "flat", "lakás", "piso", "appartement"],
  penthouse: ["penthouse", "ático", "atico"],
  plot: ["plot", "telek", "parcela", "terrain"],
  townhouse: ["townhouse", "town house", "adosado", "sorház"],
  villa: ["villa", "house", "ház", "casa"],
};

const keywordAliases: Record<string, string[]> = {
  "new build": ["new build", "new-build", "newbuilt", "new development", "újépítés", "ujepites", "obra nueva"],
  "sea views": ["sea view", "sea-view", "sea views", "seaview", "tengerre néző", "tengeri kilátás", "kilátás", "vista al mar"],
  beachside: [
    "beachside",
    "close to beach",
    "close to the beach",
    "near beach",
    "near the beach",
    "walking distance to beach",
    "walk to beach",
    "partközeli",
    "strandközeli",
    "tengerpart közelében",
    "cerca de la playa",
  ],
  beachfront: ["beachfront", "frontline beach", "front line beach", "first line beach", "tengerparti", "primera linea playa"],
  golf: ["golf", "golf valley", "golfpálya"],
  terrace: ["terrace", "terasz", "terraza"],
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseBedrooms(query: string) {
  const match = normalize(query).match(/(\d+)\s*(bed|beds|bedroom|bedrooms|br|halo|haloszoba|szoba)/);

  return match ? Number(match[1]) : undefined;
}

function parseMaxPrice(query: string) {
  const normalized = normalize(query);
  const match = normalized.match(
    /(?:under|below|max|maximum|up to|hasta|alatt|maximum|legfeljebb)\s*(?:eur|€)?\s*(\d+(?:[.,]\d+)?)\s*(k|m|million|millions|millio|millió)?/,
  );

  if (!match) {
    return undefined;
  }

  const amount = Number(match[1].replace(",", "."));
  const multiplier = match[2] ? priceMultipliers[match[2]] : 1;
  const value = amount * multiplier;

  return value >= 100000 ? Math.round(value) : undefined;
}

function parsePropertyType(query: string, propertyTypes: PropertyTypeOption[]) {
  const normalizedQuery = normalize(query);
  const typeByName = new Map(
    propertyTypes.map((type) => [normalize(type.name), String(type.id)]),
  );

  for (const [canonical, aliases] of Object.entries(propertyTypeAliases)) {
    if (!aliases.some((alias) => normalizedQuery.includes(normalize(alias)))) {
      continue;
    }

    const exact = typeByName.get(canonical);

    if (exact) {
      return exact;
    }

    const matched = propertyTypes.find((type) =>
      normalize(type.name).includes(canonical),
    );

    return matched ? String(matched.id) : undefined;
  }

  return propertyTypes.find((type) => normalizedQuery.includes(normalize(type.name)))
    ?.id.toString();
}

function parsePropertyCity(query: string, propertyCities: PropertyCityOption[]) {
  const normalizedQuery = normalize(query);

  return propertyCities
    .filter((city) => normalizedQuery.includes(normalize(city.name)))
    .sort((left, right) => right.name.length - left.name.length)[0]
    ?.id.toString();
}

function parseKeywords(query: string) {
  const normalizedQuery = normalize(query);

  return Object.entries(keywordAliases)
    .filter(([, aliases]) =>
      aliases.some((alias) => normalizedQuery.includes(normalize(alias))),
    )
    .map(([keyword]) => keyword);
}

export function parsePropertyQuery(
  query: string,
  propertyCities: PropertyCityOption[],
  propertyTypes: PropertyTypeOption[],
): ParsedPropertyQuery {
  if (!query.trim()) {
    return { keywords: [] };
  }

  return {
    bedrooms: parseBedrooms(query),
    keywords: parseKeywords(query),
    maxPrice: parseMaxPrice(query),
    propertyCity: parsePropertyCity(query, propertyCities),
    propertyType: parsePropertyType(query, propertyTypes),
  };
}
