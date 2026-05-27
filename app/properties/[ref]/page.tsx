/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPropertyByRef,
  getWhatsAppUrl,
  properties,
} from "../../data/properties";

type PropertyPageProps = {
  params: Promise<{
    ref: string;
  }>;
};

export function generateStaticParams() {
  return properties.map((property) => ({
    ref: property.ref,
  }));
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const { ref } = await params;
  const property = getPropertyByRef(ref);

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
  const property = getPropertyByRef(ref);

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
    <main className="min-h-screen bg-[#f5f4ef] text-[#18201d]">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-[#f5f4ef]/95 px-5 py-3 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/" className="leading-tight">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#997b35]">
              Move2Marbella
            </span>
            <span className="text-base font-semibold">Property details</span>
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[#d2cbb9] bg-white px-4 py-2 text-sm font-semibold text-[#26332e]"
          >
            Back
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-5 sm:px-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="overflow-hidden rounded-[8px] bg-white shadow-sm ring-1 ring-black/5">
          <div className="grid gap-1 sm:grid-cols-[1.5fr_0.75fr]">
            <img
              src={property.images[0]}
              alt={property.title}
              className="h-[340px] w-full object-cover sm:h-[520px]"
            />
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-1">
              {property.images.slice(1).map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={property.title}
                  className="h-40 w-full object-cover sm:h-full"
                />
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-[8px] bg-[#10231f] p-5 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#d7b56d]">
            {property.ref}
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight">
            {property.title}
          </h1>
          <p className="mt-2 text-sm text-white/72">{property.location}</p>
          <p className="mt-5 text-2xl font-bold text-[#f5f4ef]">
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
            className="mt-5 flex h-12 items-center justify-center rounded-[6px] bg-[#d7b56d] px-5 text-base font-bold text-[#10231f]"
          >
            Ask about this property
          </a>
        </aside>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-10 sm:px-8 lg:grid-cols-[1fr_340px]">
        <article className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#997b35]">
            Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold">{property.type}</h2>
          <p className="mt-4 text-base leading-8 text-[#4d5a54]">
            {property.description}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[8px] bg-[#f5f4ef] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#66716b]">
                Status
              </p>
              <p className="mt-1 font-semibold">{property.status}</p>
            </div>
            <div className="rounded-[8px] bg-[#f5f4ef] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#66716b]">
                Plot
              </p>
              <p className="mt-1 font-semibold">{property.plot}</p>
            </div>
            <div className="rounded-[8px] bg-[#f5f4ef] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#66716b]">
                Area
              </p>
              <p className="mt-1 font-semibold">{property.location}</p>
            </div>
          </div>
        </article>

        <aside className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#997b35]">
            Key features
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[#4d5a54]">
            {property.features.map((feature) => (
              <li key={feature} className="border-b border-[#ebe5d7] pb-3">
                {feature}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}
