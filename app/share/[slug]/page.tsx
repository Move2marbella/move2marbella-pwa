import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail, MessageCircle } from "lucide-react";

import { PropertyGallery } from "../../components/property-gallery";
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
    return "-";
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
  const photos = listing.photos.map((photo) => photo.url);
  const galleryImages = photos.length ? photos : ["/move2marbella-panorama.jpg"];
  const emailSubject = `Property enquiry: ${listing.title}`;
  const emailBody = `Hi ${agent.name},\n\nI would like more information about ${listing.title}.\n\nReference: ${listing.reference}`;
  const mailto = agent.email
    ? `mailto:${agent.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    : null;
  const whatsappText = `Hi ${agent.name}, I would like more information about ${listing.title}. Ref: ${listing.reference}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;

  const stats = [
    { label: "Type", value: listing.propertyType ?? "-" },
    { label: "Bedrooms", value: factValue(listing.bedrooms) },
    { label: "Bathrooms", value: factValue(listing.bathrooms) },
    { label: "Built", value: factValue(listing.builtArea, " m2") },
  ];

  return (
    <main className="min-h-screen bg-[#f7f2ea] pb-24 text-[#242424]">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-[#f7f2ea]/95 px-5 py-3 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/" className="py-2">
            <img
              src="/m2m_logo_blue_web.png"
              alt="Move2Marbella"
              className="h-auto w-40 sm:w-52"
            />
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[#ded4c2] bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#242424]"
          >
            Back
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-5 sm:px-8 lg:grid-cols-[1.35fr_0.65fr]">
        <PropertyGallery images={galleryImages} title={listing.title} />

        <aside className="h-fit rounded-[8px] bg-[#0f253d] p-5 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ba9456]">
            {listing.reference}
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight">
            {listing.title}
          </h1>
          <p className="mt-2 text-sm text-white/72">
            {listing.address ?? "Costa del Sol"}
          </p>
          <p className="mt-5 text-2xl font-bold text-[#f7f2ea]">
            {listing.price}
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
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex h-12 items-center justify-center gap-2 rounded-[6px] bg-[#ba9456] px-5 text-sm font-bold uppercase tracking-wide text-white"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>

          {mailto ? (
            <a
              href={mailto}
              className="mt-3 flex h-12 items-center justify-center gap-2 rounded-[6px] border border-white/35 px-5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-[#ba9456]"
            >
              <Mail size={18} />
              Email
            </a>
          ) : null}

          <div className="mt-5 border-t border-white/15 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              Agent
            </p>
            <p className="mt-1 font-semibold">{agent.name}</p>
            {agent.email ? <p className="mt-1 text-sm text-white/65">{agent.email}</p> : null}
          </div>
        </aside>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-10 sm:px-8 lg:grid-cols-[1fr_340px]">
        <article className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold">
            {listing.propertyType ?? "Property"}
          </h2>
          <p className="mt-4 whitespace-pre-line text-base leading-8 text-[#55514a]">
            {listing.description || listing.fieldNotes || "Ask for details."}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[8px] bg-[#f7f2ea] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                Plot
              </p>
              <p className="mt-1 font-semibold">{factValue(listing.plotArea, " m2")}</p>
            </div>
            <div className="rounded-[8px] bg-[#f7f2ea] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                View
              </p>
              <p className="mt-1 font-semibold">{listing.view ?? "-"}</p>
            </div>
            <div className="rounded-[8px] bg-[#f7f2ea] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                Area
              </p>
              <p className="mt-1 font-semibold">{listing.address ?? "Costa del Sol"}</p>
            </div>
          </div>
        </article>

        <aside className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            Move2Marbella
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Private property selection</h2>
          <p className="mt-3 text-sm leading-6 text-[#6f6a61]">
            Contact your agent for more details, viewing availability, and next steps.
          </p>
        </aside>
      </section>
    </main>
  );
}
