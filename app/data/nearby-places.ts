import type { Locale } from "../i18n/translations";

export type NearbyPlace = {
  id: number;
  name: string;
  category: string;
  zip: string;
  city: string;
  latitude: string;
  longitude: string;
  address: string;
  website: string;
  source: string;
};

type NearbyPlacesResponse = {
  zip: string;
  count: number;
  attribution: string;
  places: NearbyPlace[];
};

export type NearbyPlacesGroup = {
  category: string;
  label: string;
  places: NearbyPlace[];
};

const WORDPRESS_NEARBY_URL =
  "https://move2marbella.com/wp-json/m2m/v1/nearby";
const NEARBY_DATA_VERSION = "1";

const categoryLabels: Record<string, Record<Locale, string>> = {
  Airport: {
    en: "Airport",
    es: "Aeropuerto",
    fr: "Aéroport",
    de: "Flughafen",
    ru: "Аэропорт",
    pl: "Lotnisko",
    hu: "Repülőtér",
  },
  Attraction: {
    en: "Attractions",
    es: "Lugares de interés",
    fr: "Sites touristiques",
    de: "Sehenswürdigkeiten",
    ru: "Достопримечательности",
    pl: "Atrakcje",
    hu: "Látnivalók",
  },
  Beach: {
    en: "Beaches",
    es: "Playas",
    fr: "Plages",
    de: "Strände",
    ru: "Пляжи",
    pl: "Plaże",
    hu: "Strandok",
  },
  Golf: {
    en: "Golf",
    es: "Golf",
    fr: "Golf",
    de: "Golf",
    ru: "Гольф",
    pl: "Golf",
    hu: "Golf",
  },
  Hospital: {
    en: "Hospitals and clinics",
    es: "Hospitales y clínicas",
    fr: "Hôpitaux et cliniques",
    de: "Krankenhäuser und Kliniken",
    ru: "Больницы и клиники",
    pl: "Szpitale i kliniki",
    hu: "Kórházak és klinikák",
  },
  Restaurant: {
    en: "Restaurants",
    es: "Restaurantes",
    fr: "Restaurants",
    de: "Restaurants",
    ru: "Рестораны",
    pl: "Restauracje",
    hu: "Éttermek",
  },
  School: {
    en: "Schools",
    es: "Colegios",
    fr: "Écoles",
    de: "Schulen",
    ru: "Школы",
    pl: "Szkoły",
    hu: "Iskolák",
  },
  Shopping: {
    en: "Shopping",
    es: "Compras",
    fr: "Commerces",
    de: "Einkaufen",
    ru: "Магазины",
    pl: "Zakupy",
    hu: "Bevásárlás",
  },
  Sports: {
    en: "Sports",
    es: "Deportes",
    fr: "Sports",
    de: "Sport",
    ru: "Спорт",
    pl: "Sport",
    hu: "Sport",
  },
  "Train station": {
    en: "Train stations",
    es: "Estaciones de tren",
    fr: "Gares",
    de: "Bahnhöfe",
    ru: "Железнодорожные станции",
    pl: "Stacje kolejowe",
    hu: "Vasútállomások",
  },
};

export async function fetchNearbyPlaces(postalCode?: string) {
  if (!postalCode) {
    return [];
  }

  try {
    const response = await fetch(
      `${WORDPRESS_NEARBY_URL}?zip=${encodeURIComponent(postalCode)}&v=${NEARBY_DATA_VERSION}`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      return [];
    }

    const result = (await response.json()) as NearbyPlacesResponse;
    return Array.isArray(result.places) ? result.places : [];
  } catch {
    return [];
  }
}

export function groupNearbyPlaces(
  places: NearbyPlace[],
  locale: Locale,
): NearbyPlacesGroup[] {
  const grouped = new Map<string, NearbyPlace[]>();

  for (const place of places) {
    const categoryPlaces = grouped.get(place.category) ?? [];
    categoryPlaces.push(place);
    grouped.set(place.category, categoryPlaces);
  }

  return Array.from(grouped.entries())
    .map(([category, categoryPlaces]) => ({
      category,
      label: categoryLabels[category]?.[locale] ?? category,
      places: categoryPlaces,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, locale));
}
