/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyGallery } from "../../components/property-gallery";
import {
  fetchProperties,
  getPropertyByRef,
  getWhatsAppUrl,
} from "../../data/properties";

type PropertyPageProps = {
  params: Promise<{
    ref: string;
  }>;
};

export function generateStaticParams() {
  return fetchProperties(9).then((result) =>
    result.properties.map((property) => ({
      ref: property.ref,
    })),
  );
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const { ref } = await params;
  const property = await getPropertyByRef(ref);

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

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { ref } = await params;
  const property = await getPropertyByRef(ref);

  if (!property) {
    notFound();
  }

  const stats = [
    { label: "Bedrooms", value: property.beds },
    { label: "Bathrooms", value: property.baths },
    { label: "Built", value: property.size },
    { label: "Terrace", value: property.terrace },
  ];

  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#171717]">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-[#f7f2ea]/95 px-5 py-3 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link
            href="/"
            className="rounded-[6px] bg-[#0f253d] px-3 py-2"
          >
            <img
              src="/m2m_logo_white_web.png"
              alt="Move2Marbella"
              className="h-auto w-40 sm:w-52"
            />
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[#ded4c2] bg-white px-4 py-2 text-sm font-semibold text-[#242424]"
          >
            Back
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
            Ask about this property
          </a>
        </aside>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-10 sm:px-8 lg:grid-cols-[1fr_340px]">
        <article className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold">{property.type}</h2>
          <p className="mt-4 text-base leading-8 text-[#55514a]">
            {property.description}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[8px] bg-[#f7f2ea] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                API Status
              </p>
              <p className="mt-1 font-semibold">{property.status}</p>
            </div>
            <div className="rounded-[8px] bg-[#f7f2ea] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                Plot
              </p>
              <p className="mt-1 font-semibold">{property.plot}</p>
            </div>
            <div className="rounded-[8px] bg-[#f7f2ea] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                Area
              </p>
              <p className="mt-1 font-semibold">{property.location}</p>
            </div>
          </div>
        </article>

        <aside className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            Resales Online features
          </p>
          <div className="mt-4 space-y-4">
            {property.featureGroups.map((group) => (
              <section key={group.Type} className="border-b border-[#ece3d4] pb-4">
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
        </aside>
      </section>
    </main>
  );
}

export const revalidate = 300;
