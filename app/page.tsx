/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BudgetSlider } from "./components/budget-slider";
import { FavouritesPanel, FavouriteToggle } from "./components/favourite-toggle";
import { JsonLd } from "./components/json-ld";
import {
  fetchProperties,
  fetchPropertyCities,
  fetchPropertyTypes,
  bedroomOptions,
  getGeneralWhatsAppUrl,
  getPropertyCityFilterIds,
  getPropertyTypeFilterIds,
  getWhatsAppUrl,
  quickFilters,
} from "./data/properties";
import {
  Locale,
  getLocaleBasePath,
  getTranslations,
  locales,
} from "./i18n/translations";
import { SITE_URL } from "./lib/seo";

export const revalidate = 300;

export type HomeSearchParams = {
  bedrooms?: string;
  max_price?: string;
  page?: string;
  property_city?: string;
  reference?: string;
  property_type?: string;
};

type HomeProps = {
  searchParams: Promise<HomeSearchParams>;
};

type HomeContentProps = HomeProps & {
  locale?: Locale;
};

export default function Home(props: HomeProps) {
  return <HomeContent {...props} locale="en" />;
}

export async function HomeContent({
  locale = "en",
  searchParams,
}: HomeContentProps) {
  const t = getTranslations(locale);
  const basePath = getLocaleBasePath(locale);
  const favouriteLabels = {
    clear: t.clear,
    favourite: t.favourite,
    favourites: t.favourites,
    moreSaved: t.moreSaved,
    saved: t.saved,
    saveHint: t.saveHint,
  };
  const toggleLabels = {
    favourite: t.favourite,
    saved: t.saved,
  };
  const {
    bedrooms = "",
    max_price = "20000000",
    page = "1",
    property_city: selectedPropertyCity = "",
    reference = "",
    property_type: selectedPropertyType = "",
  } = await searchParams;
  const selectedReference = reference.trim().toUpperCase();
  const currentPage = Math.max(Number(page) || 1, 1);
  const hasMaxPriceFilter = Boolean(max_price) && max_price !== "20000000";
  const selectedBedrooms = Number(bedrooms) || undefined;
  const selectedMaxPrice = Math.min(
    Math.max(Number(max_price) || 20000000, 250000),
    20000000,
  );
  const [propertyCities, propertyTypes] = await Promise.all([
    fetchPropertyCities(),
    fetchPropertyTypes(),
  ]);
  const propertyCityFilterIds = getPropertyCityFilterIds(
    selectedPropertyCity,
    propertyCities,
  );
  const propertyTypeFilterIds = getPropertyTypeFilterIds(
    selectedPropertyType,
    propertyTypes,
  );
  const result = await fetchProperties(9, {
    bedrooms: selectedBedrooms,
    maxPrice: hasMaxPriceFilter ? selectedMaxPrice : undefined,
    page: currentPage,
    propertyCities: propertyCityFilterIds,
    reference: selectedReference || undefined,
    propertyTypes: propertyTypeFilterIds,
  });
  const { properties, total, totalPages } = result;
  const selectedCityName = propertyCities.find(
    (propertyCity) => String(propertyCity.id) === selectedPropertyCity,
  )?.name;
  const selectedTypeName = propertyTypes.find(
    (propertyType) => String(propertyType.id) === selectedPropertyType,
  )?.name;
  const resultTitle =
    [selectedReference, selectedCityName, selectedTypeName]
      .filter(Boolean)
      .join(" - ") ||
    t.featuredProperties;
  const paginationBaseParams = new URLSearchParams();

  if (selectedPropertyCity) {
    paginationBaseParams.set("property_city", selectedPropertyCity);
  }

  if (selectedPropertyType) {
    paginationBaseParams.set("property_type", selectedPropertyType);
  }

  if (selectedReference) {
    paginationBaseParams.set("reference", selectedReference);
  }

  if (selectedBedrooms) {
    paginationBaseParams.set("bedrooms", String(selectedBedrooms));
  }

  if (hasMaxPriceFilter) {
    paginationBaseParams.set("max_price", String(selectedMaxPrice));
  }

  function getPageHref(pageNumber: number) {
    const params = new URLSearchParams(paginationBaseParams);
    params.set("page", String(pageNumber));

    return `${basePath}?${params.toString()}`;
  }

  function normalizeFilterName(value: string) {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function getQuickFilterHref(cityName: string) {
    const matchedCity = propertyCities.find(
      (propertyCity) =>
        normalizeFilterName(propertyCity.name) === normalizeFilterName(cityName),
    );
    const params = new URLSearchParams(paginationBaseParams);

    params.set("page", "1");

    if (matchedCity) {
      params.set("property_city", String(matchedCity.id));
    }

    return `${basePath}?${params.toString()}`;
  }

  function getLanguageHref(targetLocale: Locale) {
    const params = new URLSearchParams(paginationBaseParams);
    params.set("page", String(currentPage));

    return `${getLocaleBasePath(targetLocale)}?${params.toString()}`;
  }

  const pageNumbers = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, index) => {
      const start = Math.min(
        Math.max(currentPage - 2, 1),
        Math.max(totalPages - 4, 1),
      );

      return start + index;
    },
  ).filter((pageNumber) => pageNumber <= totalPages);

  return (
    <main lang={locale} className="min-h-screen bg-[#f7f2ea] text-[#171717]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["RealEstateAgent", "Organization"],
          name: "Move2Marbella",
          url: SITE_URL,
          logo: `${SITE_URL}/m2m_logo_white_web.png`,
          image: `${SITE_URL}/move2marbella-panorama.jpg`,
          telephone: "+34650059356",
          areaServed: "Costa del Sol",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Marbella",
            addressRegion: "Málaga",
            addressCountry: "ES",
          },
        }}
      />
      <section className="relative overflow-hidden bg-[#0f253d] text-white">
        <img
          src="/move2marbella-panorama.jpg"
          alt="Aerial panorama of Marbella and the Costa del Sol"
          className="absolute inset-0 h-full w-full object-cover opacity-38"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f253d]/40 via-[#0f253d]/72 to-[#0f253d]" />

        <div className="relative mx-auto flex min-h-[92vh] w-full max-w-6xl flex-col px-5 pb-6 pt-5 sm:px-8 lg:min-h-[86vh]">
          <header className="flex items-center justify-between gap-4">
            <Link href={basePath} className="leading-tight">
              <img
                src="/m2m_logo_white_web.png"
                alt="Move2Marbella"
                className="h-auto w-44 sm:w-56"
              />
            </Link>
            <a
              href={getGeneralWhatsAppUrl()}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f253d] shadow-sm"
            >
              WhatsApp
            </a>
          </header>

          <div className="flex flex-1 flex-col justify-end gap-6 py-10">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#ba9456]">
                {t.heroEyebrow}
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
                {t.heroTitle}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/82 sm:text-lg">
                {t.heroText}
              </p>
            </div>

            <form
              action={basePath}
              className="grid gap-3 rounded-[8px] bg-white p-3 text-[#171717] shadow-2xl shadow-black/25 md:grid-cols-12"
            >
              <input type="hidden" name="page" value="1" />
              <label className="grid gap-1 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                  {t.location}
                </span>
                <select
                  name="property_city"
                  defaultValue={selectedPropertyCity}
                  className="h-12 rounded-[6px] border border-[#d7d2c4] bg-white px-3 text-base outline-none"
                >
                  <option value="">{t.costaDelSol}</option>
                  {propertyCities.map((propertyCity) => (
                    <option key={propertyCity.id} value={propertyCity.id}>
                      {propertyCity.depth > 0 ? "- " : ""}
                      {propertyCity.name}
                      {propertyCity.count > 0 ? ` (${propertyCity.count})` : ""}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                  {t.type}
                </span>
                <select
                  name="property_type"
                  defaultValue={selectedPropertyType}
                  className="h-12 rounded-[6px] border border-[#d7d2c4] bg-white px-3 text-base outline-none"
                >
                  <option value="">{t.anyProperty}</option>
                  {propertyTypes.map((propertyType) => (
                    <option key={propertyType.id} value={propertyType.id}>
                      {propertyType.depth > 0 ? "- " : ""}
                      {propertyType.name}
                      {propertyType.count > 0 ? ` (${propertyType.count})` : ""}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                  {t.bedrooms}
                </span>
                <select
                  name="bedrooms"
                  defaultValue={bedrooms}
                  className="h-12 rounded-[6px] border border-[#d7d2c4] bg-white px-3 text-base outline-none"
                >
                  <option value="">{t.any}</option>
                  {bedroomOptions.map((bedroomCount) => (
                    <option key={bedroomCount} value={bedroomCount}>
                      {bedroomCount}+
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                  {t.reference}
                </span>
                <input
                  name="reference"
                  defaultValue={selectedReference}
                  placeholder="R5394643"
                  className="h-12 min-w-0 rounded-[6px] border border-[#d7d2c4] bg-white px-3 text-base uppercase outline-none"
                />
              </label>
              <BudgetSlider
                defaultValue={selectedMaxPrice}
                label={t.maxPrice}
                max={20000000}
                min={250000}
                step={250000}
              />
              <button className="h-12 self-end rounded-[6px] bg-[#ba9456] px-5 text-base font-bold text-[#0f253d] md:col-span-2">
                {t.search}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {locales.map((languageLocale) => (
              <Link
                key={languageLocale}
                href={getLanguageHref(languageLocale)}
                aria-label={languageLocale.toUpperCase()}
                className="shrink-0 rounded-full border border-[#ded4c2] bg-white px-3 py-2 text-sm font-semibold text-[#242424]"
              >
                {languageLocale.toUpperCase()}
              </Link>
            ))}
          </div>

          <div>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
                  {t.liveSearchPreview}
                </p>
                <h2 className="mt-1 text-2xl font-semibold">
                  {resultTitle}
                </h2>
              </div>
              <span className="text-sm font-medium text-[#6f6a61]">
                {total} results
              </span>
            </div>

            <div className="grid gap-4">
              {properties.length > 0 ? properties.map((property) => {
                const propertyHref = `${basePath}/properties/${property.ref}?wp_id=${property.id}`;

                return (
                  <article
                    key={property.ref}
                    className="overflow-hidden rounded-[8px] bg-white shadow-sm ring-1 ring-black/5 sm:grid sm:grid-cols-[220px_1fr]"
                  >
                    <div className="relative h-56 sm:h-full">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0f253d]">
                        {property.tag}
                      </span>
                    </div>
                    <div className="grid gap-4 p-4">
                      <div>
                        <p className="text-sm font-medium text-[#6f6a61]">
                          {property.location}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold">
                          {property.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm font-semibold text-[#242424]">
                        <span>{property.beds} {t.bedrooms.toLowerCase()}</span>
                        <span>{property.baths} {t.bathrooms.toLowerCase()}</span>
                        <span>{property.size}</span>
                        <span>{property.ref}</span>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="min-w-full text-lg font-bold sm:min-w-0">
                          {property.price}
                        </p>
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
                        <a
                          href={getWhatsAppUrl(property.ref)}
                          className="rounded-full bg-[#0f253d] px-4 py-2 text-sm font-semibold text-white"
                        >
                          {t.enquire}
                        </a>
                      </div>
                    </div>
                  </article>
                );
              }) : (
                <div className="rounded-[8px] bg-white p-6 text-[#55514a] shadow-sm ring-1 ring-black/5">
                  {t.noPropertiesFound}
                </div>
              )}
            </div>

            {totalPages > 1 ? (
              <nav
                aria-label="Property results pagination"
                className="mt-6 flex flex-wrap items-center justify-center gap-2"
              >
                {currentPage > 1 ? (
                  <Link
                    href={getPageHref(currentPage - 1)}
                    className="rounded-full border border-[#ded4c2] bg-white px-4 py-2 text-sm font-semibold text-[#0f253d]"
                  >
                    {t.previous}
                  </Link>
                ) : null}

                {pageNumbers.map((pageNumber) => (
                  <Link
                    key={pageNumber}
                    href={getPageHref(pageNumber)}
                    aria-current={
                      pageNumber === currentPage ? "page" : undefined
                    }
                    className={
                      pageNumber === currentPage
                        ? "rounded-full bg-[#0f253d] px-4 py-2 text-sm font-semibold text-white"
                        : "rounded-full border border-[#ded4c2] bg-white px-4 py-2 text-sm font-semibold text-[#0f253d]"
                    }
                  >
                    {pageNumber}
                  </Link>
                ))}

                {currentPage < totalPages ? (
                  <Link
                    href={getPageHref(currentPage + 1)}
                    className="rounded-full border border-[#ded4c2] bg-white px-4 py-2 text-sm font-semibold text-[#0f253d]"
                  >
                    {t.next}
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </div>
        </div>

        <aside className="space-y-4">
          <FavouritesPanel labels={favouriteLabels} />

          <div className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
              {t.quickFilters}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {quickFilters.map((filter) => (
                <Link
                  key={filter.label}
                  href={getQuickFilterHref(filter.cityName)}
                  className={
                    selectedCityName &&
                    normalizeFilterName(selectedCityName) ===
                      normalizeFilterName(filter.cityName)
                      ? "rounded-full bg-[#0f253d] px-3 py-2 text-sm font-semibold text-white"
                      : "rounded-full border border-[#ded4c2] px-3 py-2 text-sm font-semibold text-[#242424]"
                  }
                >
                  {filter.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
