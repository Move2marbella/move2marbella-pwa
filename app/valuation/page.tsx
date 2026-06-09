/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../components/json-ld";
import { ValuationLeadGate } from "../components/valuation-lead-gate";
import { ValuationLocationFields } from "../components/valuation-location-fields";
import { buildValuation, type ValuationInput } from "../data/valuation";
import { locationCoordinates } from "../data/location-coordinates";
import {
  PROPERTY_CITY_SEARCH_OPTIONS,
  fetchPropertyCities,
  getPropertyCityDescendants,
  type PropertyCityOption,
} from "../data/properties";
import {
  type Locale,
  getLocaleBasePath,
  getTranslations,
} from "../i18n/translations";
import { SITE_URL } from "../lib/seo";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Property valuation",
  description:
    "Estimate a Costa del Sol property value using Move2Marbella listings and public Notariado market benchmarks.",
};

export type ValuationSearchParams = {
  area?: string;
  bedrooms?: string;
  built_area?: string;
  condition?: string;
  municipality?: string;
  outdoor_space?: string;
  parking?: string;
  postal_code?: string;
  property_type?: string;
};

export type ValuationAreaOption = {
  label: string;
  municipality: string;
  postalCode: string;
  value: string;
};

export type ValuationMunicipalityOption = {
  label: string;
  municipality: string;
  postalCode: string;
  value: string;
  areas: ValuationAreaOption[];
};

type ValuationPageProps = {
  locale?: Locale;
  searchParams: Promise<ValuationSearchParams>;
};

const propertyTypes = ["Apartment", "Penthouse", "Townhouse", "Villa", "Plot"];

const municipalityByMainCitySlug: Record<string, string> = {
  "benahavis-area": "Benahavís",
  "benalmadena-area": "Benalmádena",
  "estepona-area": "Estepona",
  "fuengirola-area": "Fuengirola",
  inland: "Málaga",
  malaga: "Málaga",
  "marbella-east": "Marbella",
  "marbella-golden-mile": "Marbella",
  "marbella-west": "Marbella",
  "mijas-area": "Mijas",
};

const valuationOptionLabels: Record<
  Locale,
  {
    confidence: Record<"early" | "standard" | "strong", string>;
    condition: Record<string, string>;
    outdoorSpace: Record<string, string>;
    parking: Record<string, string>;
    propertyType: Record<string, string>;
  }
> = {
  en: {
    confidence: { early: "Early signal", standard: "Standard", strong: "Strong" },
    condition: {
      renovate: "Needs renovation",
      good: "Good",
      excellent: "Excellent",
      luxury: "Luxury / turnkey",
    },
    outdoorSpace: {
      none: "None",
      terrace: "Terrace",
      garden: "Garden",
      pool: "Private pool",
    },
    parking: {
      none: "No parking",
      street: "Street parking",
      garage: "Garage",
      multiple: "Multiple spaces",
    },
    propertyType: {
      Apartment: "Apartment",
      Penthouse: "Penthouse",
      Townhouse: "Townhouse",
      Villa: "Villa",
      Plot: "Plot",
    },
  },
  es: {
    confidence: { early: "Señal inicial", standard: "Estándar", strong: "Alta" },
    condition: {
      renovate: "Necesita reforma",
      good: "Buen estado",
      excellent: "Excelente",
      luxury: "Lujo / listo para entrar",
    },
    outdoorSpace: {
      none: "Ninguno",
      terrace: "Terraza",
      garden: "Jardín",
      pool: "Piscina privada",
    },
    parking: {
      none: "Sin parking",
      street: "Parking en calle",
      garage: "Garaje",
      multiple: "Varias plazas",
    },
    propertyType: {
      Apartment: "Apartamento",
      Penthouse: "Ático",
      Townhouse: "Adosado",
      Villa: "Villa",
      Plot: "Parcela",
    },
  },
  fr: {
    confidence: { early: "Signal initial", standard: "Standard", strong: "Forte" },
    condition: {
      renovate: "À rénover",
      good: "Bon état",
      excellent: "Excellent",
      luxury: "Luxe / clé en main",
    },
    outdoorSpace: {
      none: "Aucun",
      terrace: "Terrasse",
      garden: "Jardin",
      pool: "Piscine privée",
    },
    parking: {
      none: "Sans parking",
      street: "Parking rue",
      garage: "Garage",
      multiple: "Plusieurs places",
    },
    propertyType: {
      Apartment: "Appartement",
      Penthouse: "Penthouse",
      Townhouse: "Maison mitoyenne",
      Villa: "Villa",
      Plot: "Terrain",
    },
  },
  de: {
    confidence: { early: "Erstes Signal", standard: "Standard", strong: "Stark" },
    condition: {
      renovate: "Renovierungsbedürftig",
      good: "Gut",
      excellent: "Ausgezeichnet",
      luxury: "Luxus / bezugsfertig",
    },
    outdoorSpace: {
      none: "Keiner",
      terrace: "Terrasse",
      garden: "Garten",
      pool: "Privater Pool",
    },
    parking: {
      none: "Kein Parkplatz",
      street: "Straßenparken",
      garage: "Garage",
      multiple: "Mehrere Plätze",
    },
    propertyType: {
      Apartment: "Apartment",
      Penthouse: "Penthouse",
      Townhouse: "Reihenhaus",
      Villa: "Villa",
      Plot: "Grundstück",
    },
  },
  ru: {
    confidence: { early: "Первичный сигнал", standard: "Стандарт", strong: "Высокая" },
    condition: {
      renovate: "Нужен ремонт",
      good: "Хорошее",
      excellent: "Отличное",
      luxury: "Люкс / готово к въезду",
    },
    outdoorSpace: {
      none: "Нет",
      terrace: "Терраса",
      garden: "Сад",
      pool: "Частный бассейн",
    },
    parking: {
      none: "Без парковки",
      street: "Парковка на улице",
      garage: "Гараж",
      multiple: "Несколько мест",
    },
    propertyType: {
      Apartment: "Апартаменты",
      Penthouse: "Пентхаус",
      Townhouse: "Таунхаус",
      Villa: "Вилла",
      Plot: "Участок",
    },
  },
  pl: {
    confidence: { early: "Wstępny sygnał", standard: "Standard", strong: "Mocna" },
    condition: {
      renovate: "Do remontu",
      good: "Dobry",
      excellent: "Bardzo dobry",
      luxury: "Luksus / gotowe",
    },
    outdoorSpace: {
      none: "Brak",
      terrace: "Taras",
      garden: "Ogród",
      pool: "Prywatny basen",
    },
    parking: {
      none: "Brak parkingu",
      street: "Parking uliczny",
      garage: "Garaż",
      multiple: "Kilka miejsc",
    },
    propertyType: {
      Apartment: "Apartament",
      Penthouse: "Penthouse",
      Townhouse: "Dom szeregowy",
      Villa: "Willa",
      Plot: "Działka",
    },
  },
  hu: {
    confidence: { early: "Korai jelzés", standard: "Standard", strong: "Erős" },
    condition: {
      renovate: "Felújítandó",
      good: "Jó",
      excellent: "Kiváló",
      luxury: "Luxus / kulcsrakész",
    },
    outdoorSpace: {
      none: "Nincs",
      terrace: "Terasz",
      garden: "Kert",
      pool: "Privát medence",
    },
    parking: {
      none: "Nincs parkoló",
      street: "Utcai parkolás",
      garage: "Garázs",
      multiple: "Több hely",
    },
    propertyType: {
      Apartment: "Apartman",
      Penthouse: "Penthouse",
      Townhouse: "Sorház",
      Villa: "Villa",
      Plot: "Telek",
    },
  },
};

const formatEuro = new Intl.NumberFormat("en-GB", {
  currency: "EUR",
  maximumFractionDigits: 0,
  style: "currency",
});

const formatNumber = new Intl.NumberFormat("en-GB", {
  maximumFractionDigits: 0,
});

function getNumber(value: string | undefined, fallback: number) {
  const number = Number(value);

  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function getPostalCode(slug: string, fallback: string) {
  return (
    locationCoordinates.find((coordinate) => coordinate.slug === slug)?.postalCode ??
    fallback
  );
}

function buildValuationMunicipalityOptions(
  propertyCities: PropertyCityOption[],
) {
  return PROPERTY_CITY_SEARCH_OPTIONS.map((mainCity) => {
    const municipality =
      municipalityByMainCitySlug[mainCity.slug] ?? mainCity.label;
    const fallbackPostalCode = getPostalCode(mainCity.slug, "29660");
    const descendants = getPropertyCityDescendants(mainCity.slug, propertyCities);
    const areas = descendants
      .filter((city) => city.count > 0)
      .map((city) => ({
        label: city.name,
        municipality,
        postalCode: getPostalCode(city.slug, fallbackPostalCode),
        value: city.slug,
      }));

    return {
      label: mainCity.label,
      municipality,
      postalCode: fallbackPostalCode,
      value: mainCity.slug,
      areas: areas.length
        ? areas
        : [
            {
              label: mainCity.label,
              municipality,
              postalCode: fallbackPostalCode,
              value: mainCity.slug,
            },
          ],
    };
  });
}

function getSelectedLocation(
  searchParams: ValuationSearchParams,
  options: ValuationMunicipalityOption[],
) {
  const selectedMunicipalitySlug =
    searchParams.municipality && options.some((option) => option.value === searchParams.municipality)
      ? searchParams.municipality
      : options[2]?.value ?? options[0]?.value ?? "marbella-west";
  const selectedMunicipality =
    options.find((option) => option.value === selectedMunicipalitySlug) ??
    options[0];
  const selectedArea =
    selectedMunicipality.areas.find((area) => area.value === searchParams.area) ??
    selectedMunicipality.areas[0];

  return {
    selectedArea,
    selectedMunicipality,
  };
}

function getInput(
  searchParams: ValuationSearchParams,
  locationOptions: ValuationMunicipalityOption[],
): ValuationInput {
  const { selectedArea, selectedMunicipality } = getSelectedLocation(
    searchParams,
    locationOptions,
  );

  return {
    area: selectedArea?.label ?? selectedMunicipality.label,
    bedrooms: searchParams.bedrooms ? getNumber(searchParams.bedrooms, 3) : 3,
    builtArea: getNumber(searchParams.built_area, 140),
    condition: searchParams.condition || "good",
    municipality: selectedArea?.municipality ?? selectedMunicipality.municipality,
    outdoorSpace: searchParams.outdoor_space || "terrace",
    parking: searchParams.parking || "garage",
    postalCode: selectedArea?.postalCode ?? selectedMunicipality.postalCode,
    propertyType: searchParams.property_type || "Apartment",
  };
}

function hasUserInput(searchParams: ValuationSearchParams) {
  return Object.values(searchParams).some((value) => Boolean(value));
}

function formatWeight(weight: number) {
  return `${Math.round(weight * 100)}%`;
}

function getNotariadoGeographyLabel(
  geography: string,
  labels: {
    geographyMunicipality: string;
    geographyNearestMunicipality: string;
    geographyNearestPostalCode: string;
    geographyPostalCode: string;
  },
) {
  const geographyLabels: Record<string, string> = {
    municipality: labels.geographyMunicipality,
    nearestMunicipality: labels.geographyNearestMunicipality,
    nearestPostalCode: labels.geographyNearestPostalCode,
    postalCode: labels.geographyPostalCode,
  };

  return geographyLabels[geography] ?? geography;
}

function interpolate(value: string, replacements: Record<string, string>) {
  return Object.entries(replacements).reduce(
    (text, [key, replacement]) => text.replace(`{${key}}`, replacement),
    value,
  );
}

function Field({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="space-y-2 text-sm font-semibold text-[#0f253d]">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-12 w-full rounded-md border border-[#d8d0c2] bg-white px-4 text-base text-[#171717] outline-none transition focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20"
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="h-12 w-full rounded-md border border-[#d8d0c2] bg-white px-4 text-base text-[#171717] outline-none transition focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20"
    />
  );
}

export default async function ValuationPage({
  locale = "en",
  searchParams,
}: ValuationPageProps) {
  const params = await searchParams;
  const propertyCities = await fetchPropertyCities();
  const locationOptions = buildValuationMunicipalityOptions(propertyCities);
  const input = getInput(params, locationOptions);
  const shouldShowResult = hasUserInput(params);
  const valuation = shouldShowResult ? await buildValuation(input) : null;

  return (
    <ValuationContent
      input={input}
      locale={locale}
      locationOptions={locationOptions}
      searchParams={params}
      valuation={valuation}
    />
  );
}

export async function ValuationContent({
  input,
  locale = "en",
  locationOptions,
  searchParams,
  valuation,
}: {
  input: ValuationInput;
  locale?: Locale;
  locationOptions: ValuationMunicipalityOption[];
  searchParams: ValuationSearchParams;
  valuation: Awaited<ReturnType<typeof buildValuation>> | null;
}) {
  const t = getTranslations(locale);
  const v = t.valuation;
  const options = valuationOptionLabels[locale];
  const basePath = getLocaleBasePath(locale);
  const confidenceLabel = valuation
    ? options.confidence[valuation.estimate.confidence]
    : "";
  const propertyTypeLabel =
    options.propertyType[input.propertyType] ?? input.propertyType;
  const propertyInArea = interpolate(v.propertyInArea, {
    area: input.area ?? input.municipality,
    type: propertyTypeLabel,
  });
  const { selectedArea, selectedMunicipality } = getSelectedLocation(
    searchParams,
    locationOptions,
  );

  return (
    <main lang={locale} className="min-h-screen bg-[#f7f2ea] text-[#171717]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: v.heroTitle,
          applicationCategory: "RealEstateApplication",
          url: `${SITE_URL}/valuation`,
        }}
      />

      <section className="relative overflow-hidden bg-[#0f253d] text-white">
        <img
          src="/move2marbella-panorama.jpg"
          alt="Marbella and the Costa del Sol"
          className="absolute inset-0 h-full w-full object-cover opacity-32"
        />
        <div className="absolute inset-0 bg-[#0f253d]/78" />

        <div className="relative mx-auto w-full max-w-6xl px-5 py-5 sm:px-8">
          <header className="flex items-center justify-between gap-4">
            <Link href={basePath} className="leading-tight">
              <img
                src="/m2m_logo_white_web.png"
                alt="Move2Marbella"
                className="h-auto w-44 sm:w-56"
              />
            </Link>
            <Link
              href={basePath}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f253d] shadow-sm"
            >
              {v.searchProperties}
            </Link>
          </header>

          <div className="grid gap-10 pb-12 pt-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#ba9456]">
                {v.heroEyebrow}
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
                {v.heroTitle}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/78">
                {v.heroBody}
              </p>
            </div>

            <form
              action={`${basePath}/valuation`}
              className="grid gap-4 rounded-lg bg-[#f7f2ea] p-4 text-[#171717] shadow-2xl shadow-black/20 sm:grid-cols-2 sm:p-5"
            >
              <ValuationLocationFields
                areaLabel={v.formArea}
                municipalityLabel={v.formMunicipality}
                options={locationOptions}
                postalCode={input.postalCode ?? selectedArea?.postalCode ?? ""}
                selectedArea={selectedArea?.value ?? ""}
                selectedMunicipality={selectedMunicipality.value}
              />
              <Field label={v.formPropertyType}>
                <Select name="property_type" defaultValue={input.propertyType}>
                  {propertyTypes.map((propertyType) => (
                    <option key={propertyType} value={propertyType}>
                      {options.propertyType[propertyType] ?? propertyType}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label={v.builtArea}>
                <Input
                  inputMode="numeric"
                  min={20}
                  name="built_area"
                  type="number"
                  defaultValue={input.builtArea}
                />
              </Field>
              <Field label={t.bedrooms}>
                <Input
                  inputMode="numeric"
                  min={0}
                  name="bedrooms"
                  type="number"
                  defaultValue={input.bedrooms}
                />
              </Field>
              <Field label={v.adjustments}>
                <Select name="condition" defaultValue={input.condition}>
                  {Object.entries(options.condition).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label={v.formOutdoorSpace}>
                <Select name="outdoor_space" defaultValue={input.outdoorSpace}>
                  {Object.entries(options.outdoorSpace).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label={v.formParking}>
                <Select name="parking" defaultValue={input.parking}>
                  {Object.entries(options.parking).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </Field>
              <div className="flex items-end">
                <button className="h-12 w-full rounded-md bg-[#ba9456] px-5 text-base font-semibold text-white shadow-sm transition hover:bg-[#a37f43]">
                  {v.calculateEstimate}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {valuation ? (
          <>
            <div className="rounded-lg border border-[#ded6c8] bg-white p-5 shadow-sm sm:p-7 lg:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ba9456]">
                    {v.indicativeRange}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-[#0f253d] sm:text-4xl">
                    {formatEuro.format(valuation.estimate.low)} -{" "}
                    {formatEuro.format(valuation.estimate.high)}
                  </h2>
                  <p className="mt-2 text-sm text-[#5c564d]">
                    {v.midpoint} {formatEuro.format(valuation.estimate.mid)} |{" "}
                    {formatEuro.format(valuation.estimate.pricePerSquareMetre)} / m2
                  </p>
                </div>
                <span className="rounded-full bg-[#0f253d] px-4 py-2 text-sm font-semibold text-white">
                  {confidenceLabel}
                </span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Metric
                  label={v.property}
                  value={`${input.builtArea} m2`}
                  detail={propertyInArea}
                />
                <Metric
                  label={v.confidence}
                  value={confidenceLabel}
                  detail={v.detailedSourceQuality}
                />
                <Metric
                  label={v.report}
                  value={v.ready}
                  detail={v.benchmarksAvailable}
                />
              </div>
            </div>

            <ValuationLeadGate
              estimateSummary={`${formatEuro.format(valuation.estimate.low)} - ${formatEuro.format(valuation.estimate.high)}`}
              labels={{
                comparableActiveListings: v.comparableActiveListings,
                consent: v.consent,
                detailedReport: v.detailedReport,
                email: t.email,
                emailPlaceholder: v.emailPlaceholder,
                leadBody: v.leadBody,
                leadTitle: v.leadTitle,
                name: t.name,
                notariadoBenchmark: v.notariadoBenchmark,
                phone: t.phone,
                preview: v.preview,
                showDetailedValuation: v.showDetailedValuation,
                sourceWeights: v.sourceWeights,
              }}
              propertySummary={`${propertyTypeLabel}, ${input.builtArea} m2 - ${input.area}, ${input.municipality}`}
            >
              <div className="grid gap-8 lg:col-span-2 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-lg border border-[#ded6c8] bg-white p-5 shadow-sm sm:p-7">
                  <h2 className="text-2xl font-semibold text-[#0f253d]">
                    {v.sourceBreakdown}
                  </h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <Metric
                      label={v.ownListingComps}
                      value={String(valuation.sources.ownListings.count)}
                      detail={`${v.weight} ${formatWeight(valuation.sources.ownListings.weight)}`}
                    />
                    <Metric
                      label={v.notariadoBenchmark}
                      value={
                        valuation.sources.notariado.benchmark
                          ? formatEuro.format(
                              valuation.sources.notariado.benchmark
                                .pricePerSquareMetre,
                            )
                          : v.noMatch
                      }
                      detail={`${v.weight} ${formatWeight(valuation.sources.notariado.weight)}`}
                    />
                    <Metric
                      label={v.marketBenchmark}
                      value={
                        valuation.sources.realadvisor.averagePricePerSquareMetre
                          ? formatEuro.format(
                              valuation.sources.realadvisor
                                .averagePricePerSquareMetre,
                            )
                          : v.noMatch
                      }
                      detail={`${v.weight} ${formatWeight(valuation.sources.realadvisor.weight)}`}
                    />
                  </div>

                  <div className="mt-7 rounded-lg bg-[#f7f2ea] p-4">
                    <h3 className="text-lg font-semibold text-[#0f253d]">
                      {v.sourceLogic}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#5c564d]">
                      {v.sourceLogicBody}
                    </p>
                  </div>
                </div>

                <aside className="rounded-lg border border-[#ded6c8] bg-white p-5 shadow-sm sm:p-7">
                  <h2 className="text-2xl font-semibold text-[#0f253d]">
                    {v.benchmarkDetails}
                  </h2>
                  <dl className="mt-5 grid gap-4 text-sm">
                    <Detail
                      label={t.area}
                      value={`${input.area}, ${input.municipality}`}
                    />
                    <Detail
                      label={v.property}
                      value={`${propertyTypeLabel}, ${input.builtArea} m2`}
                    />
                    <Detail
                      label={v.notariadoArea}
                      value={
                        valuation.sources.notariado.benchmark
                          ? `${valuation.sources.notariado.benchmark.label} (${getNotariadoGeographyLabel(
                              valuation.sources.notariado.benchmark.geography,
                              v,
                            )})`
                          : v.noPublicMatch
                      }
                    />
                    <Detail
                      label={v.transactions}
                      value={
                        valuation.sources.notariado.benchmark
                          ? formatNumber.format(
                              valuation.sources.notariado.benchmark.sales,
                            )
                          : "-"
                      }
                    />
                    <Detail
                      label={v.adjustments}
                      value={`${Math.round(
                        (valuation.adjustments.condition +
                          valuation.adjustments.outdoorSpace +
                          valuation.adjustments.parking) *
                          100,
                      )}%`}
                    />
                  </dl>
                </aside>
              </div>

              <div className="lg:col-span-2">
                <h2 className="text-2xl font-semibold text-[#0f253d]">
                  {v.comparableListings}
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {valuation.sources.ownListings.comparables.length ? (
                    valuation.sources.ownListings.comparables.map((property) => (
                      <Link
                        key={property.ref}
                        href={`${basePath}${property.href}`}
                        className="rounded-lg border border-[#ded6c8] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ba9456]">
                          {property.ref}
                        </p>
                        <h3 className="mt-2 line-clamp-2 min-h-12 text-base font-semibold text-[#0f253d]">
                          {property.title}
                        </h3>
                        <p className="mt-2 text-sm text-[#5c564d]">
                          {property.location}
                        </p>
                        <div className="mt-4 flex items-end justify-between gap-3">
                          <span className="text-lg font-semibold text-[#171717]">
                            {property.price}
                          </span>
                          <span className="text-sm text-[#5c564d]">
                            {formatEuro.format(property.pricePerSquareMetre)} / m2
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="rounded-lg border border-[#ded6c8] bg-white p-5 text-sm text-[#5c564d] md:col-span-2 xl:col-span-4">
                      {v.noComparables}
                    </p>
                  )}
                </div>
              </div>
            </ValuationLeadGate>
          </>
        ) : (
          <div className="rounded-lg border border-[#ded6c8] bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-2xl font-semibold text-[#0f253d]">
              {v.firstValuationTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5c564d]">
              {v.firstValuationBody}
            </p>
          </div>
        )}

        <p className="text-xs leading-5 text-[#6d6559] lg:col-span-2">
          {v.estimateDisclaimer}
        </p>
      </section>
    </main>
  );
}

function Metric({
  detail,
  label,
  value,
}: {
  detail: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-[#ded6c8] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6d6559]">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold text-[#0f253d]">{value}</p>
      <p className="mt-1 text-sm text-[#5c564d]">{detail}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#ece5d8] pb-3">
      <dt className="text-[#6d6559]">{label}</dt>
      <dd className="text-right font-semibold text-[#0f253d]">{value}</dd>
    </div>
  );
}
