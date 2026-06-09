import {
  fetchProperties,
  fetchPropertyCities,
  getPropertyCityFilterIds,
  type Property,
} from "./properties";

const NOTARIADO_FEATURE_SERVER =
  "https://services-eu1.arcgis.com/UpPGybwp9RK4YtZj/arcgis/rest/services/PRO_Inmuebles_Datos/FeatureServer";

const REALADVISOR_MARKET_BENCHMARKS: Record<string, number> = {
  malaga: 3602,
  marbella: 4571,
  estepona: 3316,
};

export type ValuationInput = {
  municipality: string;
  postalCode?: string;
  area?: string;
  propertyType: string;
  builtArea: number;
  bedrooms?: number;
  condition?: string;
  outdoorSpace?: string;
  parking?: string;
};

export type ValuationComparable = {
  ref: string;
  title: string;
  location: string;
  price: string;
  rawPrice: number;
  builtArea: number;
  pricePerSquareMetre: number;
  href: string;
};

export type NotariadoBenchmark = {
  geography: string;
  label: string;
  pricePerSquareMetre: number;
  averagePrice: number;
  averageArea: number;
  sales: number;
  estimated: boolean;
};

export type ValuationResult = {
  input: ValuationInput;
  estimate: {
    low: number;
    mid: number;
    high: number;
    pricePerSquareMetre: number;
    confidence: "early" | "standard" | "strong";
  };
  sources: {
    ownListings: {
      count: number;
      averagePricePerSquareMetre: number | null;
      weight: number;
      comparables: ValuationComparable[];
    };
    notariado: {
      benchmark: NotariadoBenchmark | null;
      weight: number;
    };
    realadvisor: {
      averagePricePerSquareMetre: number | null;
      weight: number;
    };
  };
  adjustments: {
    condition: number;
    outdoorSpace: number;
    parking: number;
  };
};

type ArcGisFeature = {
  attributes: {
    cp?: string;
    name_muni2?: string;
    es_estimado?: number;
    precio_m2?: number;
    precio_medio?: number;
    superficie_media?: number;
    total?: number;
    tipo_construccion_id?: number;
    clase_finca_urbana_id?: number;
  };
};

type ArcGisQueryResponse = {
  features?: ArcGisFeature[];
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function escapeSqlLiteral(value: string) {
  return value.replace(/'/g, "''");
}

function getNotariadoMunicipalityName(value: string) {
  const normalizedValue = normalize(value);
  const aliases: Record<string, string> = {
    benahavis: "Benahavís",
    malaga: "Málaga",
    mijas: "Mijas",
    marbella: "Marbella",
    estepona: "Estepona",
  };

  return aliases[normalizedValue] ?? value;
}

function getPropertyClassId(propertyType: string) {
  const normalizedType = normalize(propertyType);

  if (/villa|house|townhouse|detached|semi/.test(normalizedType)) {
    return 15;
  }

  if (/apartment|penthouse|flat|studio|duplex/.test(normalizedType)) {
    return 14;
  }

  return 99;
}

function getTypeFamily(propertyType: string) {
  const normalizedType = normalize(propertyType);

  if (/villa|house|townhouse|detached|semi/.test(normalizedType)) {
    return "house";
  }

  if (/apartment|penthouse|flat|studio|duplex/.test(normalizedType)) {
    return "apartment";
  }

  return "any";
}

function propertyMatchesFamily(property: Property, family: string) {
  if (family === "any") {
    return true;
  }

  return getTypeFamily(property.type) === family;
}

function getAdjustmentMultiplier(input: ValuationInput) {
  const conditionAdjustments: Record<string, number> = {
    renovate: -0.08,
    good: 0,
    excellent: 0.06,
    luxury: 0.12,
  };
  const outdoorAdjustments: Record<string, number> = {
    none: -0.02,
    terrace: 0.03,
    garden: 0.05,
    pool: 0.08,
  };
  const parkingAdjustments: Record<string, number> = {
    none: 0,
    street: 0.01,
    garage: 0.03,
    multiple: 0.05,
  };

  return {
    condition: conditionAdjustments[input.condition ?? "good"] ?? 0,
    outdoorSpace: outdoorAdjustments[input.outdoorSpace ?? "terrace"] ?? 0,
    parking: parkingAdjustments[input.parking ?? "none"] ?? 0,
  };
}

async function queryNotariadoLayer(layer: 3 | 4, where: string) {
  const params = new URLSearchParams({
    f: "json",
    outFields:
      "cp,name_muni2,es_estimado,precio_m2,precio_medio,superficie_media,total,tipo_construccion_id,clase_finca_urbana_id",
    returnGeometry: "false",
    where,
  });
  const response = await fetch(
    `${NOTARIADO_FEATURE_SERVER}/${layer}/query?${params.toString()}`,
    {
      next: {
        revalidate: 60 * 60 * 24,
      },
    },
  );

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as ArcGisQueryResponse;

  return data.features ?? [];
}

function selectBestNotariadoFeature(
  features: ArcGisFeature[],
  propertyClassId: number,
) {
  const rows = features
    .map((feature) => feature.attributes)
    .filter((row) => Number(row.precio_m2) > 0);

  return (
    rows.find(
      (row) =>
        row.clase_finca_urbana_id === propertyClassId &&
        row.tipo_construccion_id === 99,
    ) ??
    rows.find((row) => row.clase_finca_urbana_id === propertyClassId) ??
    rows.find(
      (row) =>
        row.clase_finca_urbana_id === 99 && row.tipo_construccion_id === 99,
    ) ??
    rows[0] ??
    null
  );
}

async function getNotariadoBenchmark(input: ValuationInput) {
  const propertyClassId = getPropertyClassId(input.propertyType);
  const cleanPostalCode = input.postalCode?.replace(/\D/g, "");

  if (cleanPostalCode?.length === 5) {
    const features = await queryNotariadoLayer(
      4,
      `cp='${escapeSqlLiteral(cleanPostalCode)}'`,
    );
    const match = selectBestNotariadoFeature(features, propertyClassId);

    if (match?.precio_m2) {
      return {
        geography: "postalCode",
        label: cleanPostalCode,
        pricePerSquareMetre: match.precio_m2,
        averagePrice: match.precio_medio ?? 0,
        averageArea: match.superficie_media ?? 0,
        sales: match.total ?? 0,
        estimated: Boolean(match.es_estimado),
      };
    }
  }

  const municipality = getNotariadoMunicipalityName(input.municipality.trim());

  if (!municipality) {
    return null;
  }

  const features = await queryNotariadoLayer(
    3,
    `name_muni2='${escapeSqlLiteral(municipality)}'`,
  );
  const match = selectBestNotariadoFeature(features, propertyClassId);

  if (!match?.precio_m2) {
    return null;
  }

  return {
    geography: "municipality",
    label: match.name_muni2 ?? municipality,
    pricePerSquareMetre: match.precio_m2,
    averagePrice: match.precio_medio ?? 0,
    averageArea: match.superficie_media ?? 0,
    sales: match.total ?? 0,
    estimated: Boolean(match.es_estimado),
  };
}

function getRealAdvisorBenchmark(input: ValuationInput) {
  const candidates = [input.area, input.municipality, "malaga"]
    .filter((value): value is string => Boolean(value))
    .map(normalize);

  for (const candidate of candidates) {
    const match = Object.entries(REALADVISOR_MARKET_BENCHMARKS).find(([key]) =>
      candidate.includes(key),
    );

    if (match) {
      return match[1];
    }
  }

  return null;
}

async function getOwnListingComparables(input: ValuationInput) {
  const [propertyCities] = await Promise.all([fetchPropertyCities()]);
  const searchTerms = [input.area, input.municipality]
    .filter((value): value is string => Boolean(value))
    .map(normalize);
  const matchedCityIds = new Set<string>();

  for (const term of searchTerms) {
    for (const city of propertyCities) {
      const cityName = normalize(city.name);
      const citySlug = normalize(city.slug);

      if (cityName.includes(term) || term.includes(cityName) || citySlug.includes(term)) {
        for (const id of getPropertyCityFilterIds(city.slug, propertyCities)) {
          matchedCityIds.add(id);
        }
      }
    }
  }

  const result = await fetchProperties(100, {
    noStore: true,
    propertyCities: Array.from(matchedCityIds),
  });
  const family = getTypeFamily(input.propertyType);
  const searchText = searchTerms.join(" ");
  const minimumArea = input.builtArea * 0.65;
  const maximumArea = input.builtArea * 1.5;
  const comparables = result.properties
    .filter((property) => property.rawPrice > 0 && property.builtArea > 0)
    .filter((property) => propertyMatchesFamily(property, family))
    .filter(
      (property) =>
        !input.builtArea ||
        (property.builtArea >= minimumArea && property.builtArea <= maximumArea),
    )
    .filter((property) => {
      if (!searchText) {
        return true;
      }

      const propertyLocation = normalize(`${property.city} ${property.location}`);

      return searchTerms.some((term) => propertyLocation.includes(term));
    })
    .slice(0, 8)
    .map((property) => ({
      ref: property.ref,
      title: property.title,
      location: property.location,
      price: property.price,
      rawPrice: property.rawPrice,
      builtArea: property.builtArea,
      pricePerSquareMetre: property.rawPrice / property.builtArea,
      href: `/properties/${property.ref}?wp_id=${property.id}`,
    }));

  return comparables;
}

function weightedAverage(
  values: { value: number | null; weight: number }[],
) {
  const usableValues = values.filter(
    (entry): entry is { value: number; weight: number } =>
      Boolean(entry.value && entry.value > 0 && entry.weight > 0),
  );
  const totalWeight = usableValues.reduce((sum, entry) => sum + entry.weight, 0);

  if (!totalWeight) {
    return null;
  }

  return (
    usableValues.reduce((sum, entry) => sum + entry.value * entry.weight, 0) /
    totalWeight
  );
}

function getConfidence(
  ownListingCount: number,
  notariadoBenchmark: NotariadoBenchmark | null,
) {
  if (ownListingCount >= 5 && notariadoBenchmark) {
    return "strong";
  }

  if (ownListingCount >= 2 || notariadoBenchmark) {
    return "standard";
  }

  return "early";
}

export async function buildValuation(input: ValuationInput) {
  const [comparables, notariadoBenchmark] = await Promise.all([
    getOwnListingComparables(input),
    getNotariadoBenchmark(input),
  ]);
  const ownAverage = comparables.length
    ? comparables.reduce((sum, property) => sum + property.pricePerSquareMetre, 0) /
      comparables.length
    : null;
  const realadvisorAverage = getRealAdvisorBenchmark(input);
  const ownWeight = comparables.length >= 3 ? 0.5 : comparables.length ? 0.35 : 0;
  const notariadoWeight = notariadoBenchmark ? 0.35 : 0;
  const realadvisorWeight = realadvisorAverage ? 0.15 : 0;
  const basePricePerSquareMetre =
    weightedAverage([
      { value: ownAverage, weight: ownWeight },
      {
        value: notariadoBenchmark?.pricePerSquareMetre ?? null,
        weight: notariadoWeight,
      },
      { value: realadvisorAverage, weight: realadvisorWeight },
    ]) ?? 0;
  const adjustments = getAdjustmentMultiplier(input);
  const adjustmentMultiplier =
    1 + adjustments.condition + adjustments.outdoorSpace + adjustments.parking;
  const adjustedPricePerSquareMetre = basePricePerSquareMetre * adjustmentMultiplier;
  const mid = adjustedPricePerSquareMetre * input.builtArea;
  const confidence = getConfidence(comparables.length, notariadoBenchmark);
  const spread = confidence === "strong" ? 0.08 : confidence === "standard" ? 0.12 : 0.18;

  return {
    input,
    estimate: {
      low: mid * (1 - spread),
      mid,
      high: mid * (1 + spread),
      pricePerSquareMetre: adjustedPricePerSquareMetre,
      confidence,
    },
    sources: {
      ownListings: {
        count: comparables.length,
        averagePricePerSquareMetre: ownAverage,
        weight: ownWeight,
        comparables,
      },
      notariado: {
        benchmark: notariadoBenchmark,
        weight: notariadoWeight,
      },
      realadvisor: {
        averagePricePerSquareMetre: realadvisorAverage,
        weight: realadvisorWeight,
      },
    },
    adjustments,
  } satisfies ValuationResult;
}
