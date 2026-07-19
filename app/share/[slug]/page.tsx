import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Bath,
  BedDouble,
  Building2,
  Mail,
  MapPin,
  Maximize2,
  MessageCircle,
  Ruler,
} from "lucide-react";

import { SITE_URL } from "../../lib/seo";

type ShareListing = {
  slug: string;
  agent: {
    avatar?: string | null;
    email?: string | null;
    name: string;
  };
  listing: {
    address?: string | null;
    bathrooms?: number | null;
    bedrooms?: number | null;
    builtArea?: number | null;
    condition?: string | null;
    description?: string | null;
    fieldNotes?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    orientation?: string | null;
    photos: Array<{ alt: string; url: string }>;
    plotArea?: number | null;
    price: string;
    propertyType?: string | null;
    reference: string;
    status: string;
    title: string;
    view?: string | null;
  };
};

const agentCrmUrl = (
  process.env.AGENT_CRM_PUBLIC_API_URL ?? "https://agent.move2marbella.com"
).replace(/\/$/, "");

async function getSharedListing(slug: string) {
  const response = await fetch(`${agentCrmUrl}/api/public/listing-shares/${slug}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Unable to load shared listing.");
  }

  return (await response.json()) as ShareListing;
}

function factValue(value?: number | string | null, suffix = "") {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return `${value}${suffix}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const share = await getSharedListing(slug);
  const title = `${share.listing.title} | Move2Marbella`;
  const description =
    share.listing.description ??
    share.listing.fieldNotes ??
    "Private property selection from Move2Marbella.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/share/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: share.listing.photos[0]?.url ? [share.listing.photos[0].url] : undefined,
      type: "website",
      url: `${SITE_URL}/share/${slug}`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function SharedListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { agent, listing } = await getSharedListing(slug);
  const photos = listing.photos;
  const heroImage = photos[0]?.url ?? "/move2marbella-panorama.jpg";
  const emailSubject = `Property enquiry: ${listing.title}`;
  const emailBody = `Hi ${agent.name},\n\nI would like more information about ${listing.title}.\n\nReference: ${listing.reference}`;
  const mailto = agent.email
    ? `mailto:${agent.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    : null;
  const whatsappText = `Hi ${agent.name}, I would like more information about ${listing.title}. Ref: ${listing.reference}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;

  const facts = [
    { icon: Building2, label: listing.propertyType ?? "Property" },
    { icon: BedDouble, label: factValue(listing.bedrooms, " bed") },
    { icon: Bath, label: factValue(listing.bathrooms, " bath") },
    { icon: Maximize2, label: factValue(listing.builtArea, " m2") },
    { icon: Ruler, label: factValue(listing.plotArea, " m2 plot") },
  ].filter((fact) => fact.label);

  return (
    <main className="min-h-screen bg-[#eef7f4] pb-28 text-[#092824]">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_55px_rgba(8,52,46,0.12)]">
          <div className="relative min-h-[430px] overflow-hidden bg-[#0b3f37] text-white">
            <Image
              src={heroImage}
              alt={listing.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1120px"
              className="object-cover opacity-82"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#062b27] via-[#062b27]/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/92 px-3 py-1 text-sm font-extrabold text-[#0b3f37]">
                  Move2Marbella
                </span>
                <span className="rounded-full border border-white/25 bg-white/12 px-3 py-1 text-sm font-bold">
                  {listing.reference}
                </span>
              </div>
              <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
                {listing.title}
              </h1>
              <p className="mt-3 text-3xl font-black">{listing.price}</p>
              {listing.address ? (
                <p className="mt-3 flex items-center gap-2 text-lg text-white/88">
                  <MapPin size={20} />
                  <span>{listing.address}</span>
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_330px] lg:p-7">
            <section className="grid gap-5">
              {facts.length ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {facts.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-[#d6e8e4] bg-[#f8fcfb] p-4 font-extrabold"
                    >
                      <Icon className="mb-3 text-[#0c8a79]" size={24} />
                      {label}
                    </div>
                  ))}
                </div>
              ) : null}

              {photos.length > 1 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {photos.slice(1, 7).map((photo) => (
                    <div
                      key={photo.url}
                      className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#dbe9e6]"
                    >
                      <Image
                        src={photo.url}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, 300px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : null}

              <article className="rounded-2xl border border-[#d6e8e4] bg-white p-5">
                <h2 className="text-2xl font-black">Details</h2>
                <p className="mt-3 whitespace-pre-line text-lg leading-8 text-[#49645f]">
                  {listing.description || listing.fieldNotes || "Ask for details."}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {listing.condition ? (
                    <span className="rounded-full bg-[#e7f4f1] px-3 py-1 font-bold">
                      {listing.condition}
                    </span>
                  ) : null}
                  {listing.view ? (
                    <span className="rounded-full bg-[#fff3d9] px-3 py-1 font-bold">
                      {listing.view}
                    </span>
                  ) : null}
                  {listing.orientation ? (
                    <span className="rounded-full bg-[#eef2ff] px-3 py-1 font-bold">
                      {listing.orientation}
                    </span>
                  ) : null}
                </div>
              </article>
            </section>

            <aside className="h-fit rounded-2xl border border-[#d6e8e4] bg-[#f8fcfb] p-5">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0c8a79]">
                Your agent
              </p>
              <h2 className="mt-2 text-2xl font-black">{agent.name}</h2>
              {agent.email ? <p className="mt-1 text-[#647a76]">{agent.email}</p> : null}
              <div className="mt-5 grid gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#0c8a79] px-5 text-lg font-black text-white shadow-lg shadow-[#0c8a79]/18"
                >
                  <MessageCircle size={22} />
                  WhatsApp
                </a>
                {mailto ? (
                  <a
                    href={mailto}
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-[#cfe1dd] bg-white px-5 text-lg font-black text-[#092824]"
                  >
                    <Mail size={22} />
                    Email
                  </a>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
