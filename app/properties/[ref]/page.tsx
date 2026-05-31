/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { FavouritesPanel, FavouriteToggle } from "../../components/favourite-toggle";
import { LeadForm } from "../../components/lead-form";
import { PropertyGallery } from "../../components/property-gallery";
import {
  fetchProperties,
  getPropertyByRef,
  getWhatsAppUrl,
} from "../../data/properties";
import { Locale, getLocaleBasePath, getTranslations } from "../../i18n/translations";

type PropertyPageProps = {
  params: Promise<{
    ref: string;
  }>;
  searchParams: Promise<{
    wp_id?: string;
  }>;
};

type PropertyDetailContentProps = PropertyPageProps & {
  locale?: Locale;
};

export function generateStaticParams() {
  return fetchProperties(9).then((result) =>
    result.properties.map((property) => ({
      ref: property.ref,
    })),
  );
}

export async function generateMetadata({
  params,
  searchParams,
}: PropertyPageProps) {
  const { ref } = await params;
  const { wp_id: wordpressId } = await searchParams;
  const property = await getPropertyByRef(ref, wordpressId);

  if (!property) {
    return {
      title: "Property not found | Move2Marbella",
    };
  }

  return {
    title: `${property.title} | Move2Marbella`,
    description: `${property.price} property in ${property.location}. Reference ${property.ref}.`,
  };
}

export default async function PropertyPage({
  params,
  searchParams,
}: PropertyPageProps) {
  return (
    <PropertyDetailContent
      locale="en"
      params={params}
      searchParams={searchParams}
    />
  );
}

export async function PropertyDetailContent({
  locale = "en",
  params,
  searchParams,
}: PropertyDetailContentProps) {
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
  const leadLabels = {
    email: t.email,
    leadDefaultMessage: t.leadDefaultMessage,
    leadForm: t.leadForm,
    message: t.message,
    name: t.name,
    phone: t.phone,
    requestDetails: t.requestDetails,
    sendEnquiry: t.sendEnquiry,
  };
  const { ref } = await params;
  const { wp_id: wordpressId } = await searchParams;
  const property = await getPropertyByRef(ref, wordpressId);

  if (!property) {
    notFound();
  }

  const stats = [
    { label: t.bedrooms, value: property.beds },
    { label: t.bathrooms, value: property.baths },
    { label: t.built, value: property.size },
    { label: t.terrace, value: property.terrace },
  ];
  const propertyHref = `${basePath}/properties/${property.ref}?wp_id=${property.id}`;
  const mapZoneQuery = property.coordinates?.postalCode
    ? `${property.coordinates.postalCode} Spain`
    : null;
  const mapUrl = mapZoneQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapZoneQuery)}`
    : property.coordinates
      ? `https://www.google.com/maps/search/?api=1&query=${property.coordinates.latitude},${property.coordinates.longitude}`
      : null;
  const mapEmbedUrl = mapZoneQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(mapZoneQuery)}&output=embed`
    : null;

  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#171717]">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-[#f7f2ea]/95 px-5 py-3 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link
            href={basePath}
            className="rounded-[6px] bg-[#0f253d] px-3 py-2"
          >
            <img
              src="/m2m_logo_white_web.png"
              alt="Move2Marbella"
              className="h-auto w-40 sm:w-52"
            />
          </Link>
          <Link
            href={basePath}
            className="rounded-full border border-[#ded4c2] bg-white px-4 py-2 text-sm font-semibold text-[#242424]"
          >
            {t.back}
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-5 sm:px-8 lg:grid-cols-[1.35fr_0.65fr]">
        <PropertyGallery images={property.images} title={property.title} />

        <aside className="h-fit rounded-[8px] bg-[#0f253d] p-5 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ba9456]">
            {property.ref}
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight">
            {property.title}
          </h1>
          <p className="mt-2 text-sm text-white/72">{property.location}</p>
          <p className="mt-5 text-2xl font-bold text-[#f7f2ea]">
            {property.price}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[6px] border border-white/15 bg-white/8 p-3"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-white/55">
                  {stat.label}
                </p>
                <p className="mt-1 text-lg font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>

          <a
            href={getWhatsAppUrl(property.ref)}
            className="mt-5 flex h-12 items-center justify-center rounded-[6px] bg-[#ba9456] px-5 text-base font-bold text-[#0f253d]"
          >
            {t.askAboutProperty}
          </a>

          <FavouriteToggle
            property={{
              ref: property.ref,
              title: property.title,
              price: property.price,
              location: property.location,
              image: property.images[0],
              href: propertyHref,
            }}
            className="mt-3 flex h-12 w-full items-center justify-center"
            labels={toggleLabels}
          />
        </aside>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-10 sm:px-8 lg:grid-cols-[1fr_340px]">
        <article className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            {t.overview}
          </p>
          <h2 className="mt-2 text-2xl font-semibold">{property.type}</h2>
          <p className="mt-4 text-base leading-8 text-[#55514a]">
            {property.description}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[8px] bg-[#f7f2ea] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                {t.apiStatus}
              </p>
              <p className="mt-1 font-semibold">{property.status}</p>
            </div>
            <div className="rounded-[8px] bg-[#f7f2ea] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                {t.plot}
              </p>
              <p className="mt-1 font-semibold">{property.plot}</p>
            </div>
            <div className="rounded-[8px] bg-[#f7f2ea] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                {t.area}
              </p>
              <p className="mt-1 font-semibold">{property.location}</p>
            </div>
          </div>

          {mapEmbedUrl && property.coordinates?.postalCode ? (
            <section className="mt-6 overflow-hidden rounded-[8px] bg-[#0f253d] shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-white">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ba9456]">
                    {t.mapZone}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">
                    ZIP {property.coordinates.postalCode}
                  </h3>
                </div>
                <a
                  href={mapUrl ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#ba9456]"
                >
                  {t.openInMaps}
                </a>
              </div>
              <iframe
                title={`ZIP ${property.coordinates.postalCode} map zone`}
                src={mapEmbedUrl}
                className="h-[320px] w-full border-0 sm:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </section>
          ) : null}
        </article>

        <aside className="space-y-5">
          <LeadForm
            propertyRef={property.ref}
            propertyTitle={property.title}
            propertyPrice={property.price}
            propertyLocation={property.location}
            whatsappUrl={getWhatsAppUrl(property.ref)}
            labels={leadLabels}
          />

          <FavouritesPanel labels={favouriteLabels} />

          <section className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
              {t.features}
            </p>
            <div className="mt-4 space-y-4">
              {property.featureGroups.map((group) => (
                <section
                  key={group.Type}
                  className="border-b border-[#ece3d4] pb-4"
                >
                  <h3 className="text-sm font-bold text-[#242424]">
                    {group.Type}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.Value.map((value) => (
                      <span
                        key={value}
                        className="rounded-full bg-[#f7f2ea] px-3 py-1 text-xs font-semibold text-[#55514a]"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}

export const revalidate = 300;
