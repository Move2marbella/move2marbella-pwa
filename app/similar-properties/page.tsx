import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FavouriteToggle } from "../components/favourite-toggle";
import { TrackedWhatsAppLink } from "../components/tracked-whatsapp-link";
import {
  fetchProperties,
  fetchPropertyCities,
  fetchPropertyTypes,
  getPropertyCityFilterIds,
  getPropertyTypeFilterIds,
  getWhatsAppUrl,
  type Property,
  type PropertyCityOption,
  type PropertyTypeOption,
} from "../data/properties";
import { type Locale, getLocaleBasePath, getTranslations } from "../i18n/translations";
import { getLanguageAlternates, getLocalizedPath, getPageRobots } from "../lib/seo";

type SimilarPropertiesPageProps = {
  locale?: Locale;
  params?: Promise<{
    slug?: string;
  }>;
};

type SimilarPropertiesLabels = {
  body: string;
  fallbackBody: string;
  heading: string;
  similarHeading: string;
  unavailable: string;
};

const labelsByLocale: Record<Locale, SimilarPropertiesLabels> = {
  de: {
    body:
      "Diese Immobilie ist nicht mehr verfügbar. Hier sind ähnliche aktive Angebote, die noch angefragt werden können.",
    fallbackBody:
      "Durchstöbern Sie aktive Angebote an der Costa del Sol oder fragen Sie uns nach passenden Alternativen.",
    heading: "Ähnliche Immobilien",
    similarHeading: "Aktive Alternativen",
    unavailable: "Diese Immobilie ist nicht mehr verfügbar",
  },
  en: {
    body:
      "This property is no longer available. Here are similar active listings you can still enquire about.",
    fallbackBody:
      "Browse active Costa del Sol listings or ask us for matching alternatives.",
    heading: "Similar properties",
    similarHeading: "Active alternatives",
    unavailable: "This property is no longer available",
  },
  es: {
    body:
      "Esta propiedad ya no está disponible. Aquí tienes propiedades activas similares sobre las que todavía puedes consultar.",
    fallbackBody:
      "Explora propiedades activas en la Costa del Sol o pídenos alternativas similares.",
    heading: "Propiedades similares",
    similarHeading: "Alternativas activas",
    unavailable: "Esta propiedad ya no está disponible",
  },
  fr: {
    body:
      "Ce bien n'est plus disponible. Voici des annonces actives similaires pour lesquelles vous pouvez encore nous contacter.",
    fallbackBody:
      "Parcourez les biens actifs sur la Costa del Sol ou demandez-nous des alternatives pertinentes.",
    heading: "Biens similaires",
    similarHeading: "Alternatives actives",
    unavailable: "Ce bien n'est plus disponible",
  },
  hu: {
    body:
      "Ez az ingatlan már nem elérhető. Itt vannak hasonló, aktív ingatlanok, amelyekről még tudsz érdeklődni.",
    fallbackBody:
      "Nézd meg az aktív Costa del Sol ingatlanokat, vagy kérj tőlünk hasonló ajánlatokat.",
    heading: "Hasonló ingatlanok",
    similarHeading: "Aktív alternatívák",
    unavailable: "Ez az ingatlan már nem elérhető",
  },
  pl: {
    body:
      "Ta nieruchomość nie jest już dostępna. Oto podobne aktywne oferty, o które nadal możesz zapytać.",
    fallbackBody:
      "Przeglądaj aktywne oferty na Costa del Sol albo poproś nas o podobne propozycje.",
    heading: "Podobne nieruchomości",
    similarHeading: "Aktywne alternatywy",
    unavailable: "Ta nieruchomość nie jest już dostępna",
  },
  ru: {
    body:
      "Этот объект больше недоступен. Ниже похожие активные предложения, по которым еще можно связаться с нами.",
    fallbackBody:
      "Посмотрите активные объекты на Costa del Sol или запросите похожие варианты.",
    heading: "Похожие объекты",
    similarHeading: "Активные альтернативы",
    unavailable: "Этот объект больше недоступен",
  },
};

const slugTypeAliases: Record<string, string> = {
  apartment: "apartment",
  apartments: "apartment",
  duplex: "apartment",
  finca: "house",
  house: "house",
  office: "commercial",
  penthouse: "penthouse",
  plot: "plot",
  townhouse: "townhouse",
  villa: "house",
};

export const metadata: Metadata = {
  title: "Similar properties",
  description:
    "Find active Move2Marbella alternatives when a property is no longer available.",
  alternates: {
    canonical: getLocalizedPath("en", "/similar-properties"),
    languages: getLanguageAlternates("/similar-properties"),
  },
  robots: getPageRobots(),
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getSlugTokens(slug?: string) {
  return normalize(slug ?? "")
    .replace(/\d+$/g, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .filter((token) => !["a", "and", "de", "for", "in", "la", "las", "los", "of", "the"].includes(token));
}

function getOriginalPropertyLabel(slug?: string) {
  if (!slug) {
    return null;
  }

  return slug
    .replace(/-\d+$/g, "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function findTypeSlug(tokens: string[], propertyTypes: PropertyTypeOption[]) {
  const aliasMatch = tokens
    .map((token) => slugTypeAliases[token])
    .find((value): value is string => Boolean(value));

  if (aliasMatch) {
    return aliasMatch;
  }

  return propertyTypes.find((type) => tokens.some((token) => normalize(type.slug).includes(token)))
    ?.slug;
}

function findCitySlug(tokens: string[], propertyCities: PropertyCityOption[]) {
  const normalizedSlug = tokens.join("-");

  return propertyCities
    .map((city) => {
      const cityTokens = normalize(`${city.slug} ${city.name}`)
        .split(/[^a-z0-9]+/)
        .filter(Boolean);
      const score = cityTokens.filter((token) => normalizedSlug.includes(token)).length;

      return {
        city,
        score,
      };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.city.depth - a.city.depth)[0]?.city.slug;
}

function propertyMatchesTokens(property: Property, tokens: string[]) {
  if (!tokens.length) {
    return true;
  }

  const haystack = normalize(
    `${property.title} ${property.location} ${property.city} ${property.type}`,
  );

  return tokens.some((token) => haystack.includes(token));
}

async function getSimilarProperties(slug?: string) {
  const [propertyTypes, propertyCities] = await Promise.all([
    fetchPropertyTypes(),
    fetchPropertyCities(),
  ]);
  const tokens = getSlugTokens(slug);
  const typeSlug = findTypeSlug(tokens, propertyTypes);
  const citySlug = findCitySlug(tokens, propertyCities);
  const propertyTypesFilter = typeSlug
    ? getPropertyTypeFilterIds(typeSlug, propertyTypes)
    : [];
  const propertyCitiesFilter = citySlug
    ? getPropertyCityFilterIds(citySlug, propertyCities)
    : [];
  const attempts = [
    { propertyCities: propertyCitiesFilter, propertyTypes: propertyTypesFilter },
    { propertyCities: propertyCitiesFilter },
    { propertyTypes: propertyTypesFilter },
    {},
  ];
  const seenRefs = new Set<string>();
  const matches: Property[] = [];

  for (const filters of attempts) {
    const result = await fetchProperties(12, {
      noStore: true,
      propertyCities: filters.propertyCities,
      propertyTypes: filters.propertyTypes,
    });

    for (const property of result.properties) {
      if (seenRefs.has(property.ref) || !propertyMatchesTokens(property, tokens)) {
        continue;
      }

      seenRefs.add(property.ref);
      matches.push(property);
    }

    if (matches.length >= 6) {
      break;
    }
  }

  if (matches.length >= 6 || !tokens.length) {
    return matches.slice(0, 9);
  }

  const fallback = await fetchProperties(9, { noStore: true });

  for (const property of fallback.properties) {
    if (!seenRefs.has(property.ref)) {
      seenRefs.add(property.ref);
      matches.push(property);
    }
  }

  return matches.slice(0, 9);
}

export default async function SimilarPropertiesPage({
  locale = "en",
  params,
}: SimilarPropertiesPageProps) {
  const { slug } = (await params) ?? {};
  return <SimilarPropertiesContent locale={locale} slug={slug} />;
}

export async function SimilarPropertiesContent({
  locale = "en",
  slug,
}: {
  locale?: Locale;
  slug?: string;
}) {
  const t = getTranslations(locale);
  const labels = labelsByLocale[locale];
  const basePath = getLocaleBasePath(locale);
  const originalProperty = getOriginalPropertyLabel(slug);
  const properties = await getSimilarProperties(slug);
  const toggleLabels = {
    favourite: t.favourite,
    saved: t.saved,
  };

  return (
    <main lang={locale} className="min-h-screen bg-[#f7f2ea] text-[#171717]">
      <section className="bg-[#0f253d] px-5 py-5 text-white sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href={basePath} className="rounded-[6px] bg-white/10 px-3 py-2">
            <Image
              src="/m2m_logo_white_web.png"
              alt="Move2Marbella"
              width={208}
              height={45}
              className="h-auto w-40 sm:w-52"
            />
          </Link>
          <Link
            href={basePath}
            className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white"
          >
            {t.back}
          </Link>
        </div>
        <div className="mx-auto max-w-6xl py-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ba9456]">
            {labels.heading}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            {labels.unavailable}
          </h1>
          {originalProperty ? (
            <p className="mt-4 max-w-2xl text-lg font-semibold text-white/86">
              {originalProperty}
            </p>
          ) : null}
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/76">
            {slug ? labels.body : labels.fallbackBody}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
              {labels.similarHeading}
            </p>
            <h2 className="mt-1 text-2xl font-semibold">{t.featuredProperties}</h2>
          </div>
          <TrackedWhatsAppLink
            href={getWhatsAppUrl(originalProperty ?? "similar properties")}
            source="similar_properties_unavailable"
            className="rounded-full bg-[#0f253d] px-5 py-3 text-sm font-semibold text-white"
          >
            {t.sendEnquiry}
          </TrackedWhatsAppLink>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => {
            const propertyHref = `${basePath}/properties/${property.ref}?wp_id=${property.id}`;

            return (
              <article
                key={property.ref}
                className="overflow-hidden rounded-[8px] bg-white shadow-sm ring-1 ring-black/5"
              >
                <div className="relative h-56">
                  {property.images[0] ? (
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      width={520}
                      height={340}
                      sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                  <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0f253d]">
                    {property.tag}
                  </span>
                </div>
                <div className="grid gap-4 p-4">
                  <div>
                    <p className="text-sm font-medium text-[#6f6a61]">
                      {property.location}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold">{property.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm font-semibold text-[#242424]">
                    <span>
                      {property.beds} {t.bedrooms.toLowerCase()}
                    </span>
                    <span>
                      {property.baths} {t.bathrooms.toLowerCase()}
                    </span>
                    <span>{property.size}</span>
                    <span>{property.ref}</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="min-w-full text-lg font-bold">{property.price}</p>
                    <FavouriteToggle
                      property={{
                        ref: property.ref,
                        title: property.title,
                        price: property.price,
                        location: property.location,
                        image: property.images[0],
                        href: propertyHref,
                      }}
                      labels={toggleLabels}
                    />
                    <Link
                      href={propertyHref}
                      className="rounded-full border border-[#0f253d] px-4 py-2 text-sm font-semibold text-[#0f253d]"
                    >
                      {t.details}
                    </Link>
                    <TrackedWhatsAppLink
                      href={getWhatsAppUrl(property.ref)}
                      propertyRef={property.ref}
                      source="similar_property_card"
                      className="rounded-full bg-[#0f253d] px-4 py-2 text-sm font-semibold text-white"
                    >
                      {t.enquire}
                    </TrackedWhatsAppLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export const revalidate = 300;
