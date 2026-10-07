import type { Metadata } from "next";

import { PropertyGallery } from "../../../components/property-gallery";
import { factValue, getSharedListing } from "../../shared";

const unbrandedShareUrl = "https://property-details-share.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { listing } = await getSharedListing(slug, true);
  const description =
    listing.description ||
    `${listing.propertyType || "Property"} in ${listing.address || "Costa del Sol"}`;
  const image = listing.photos[0]?.url;

  return {
    title: { absolute: listing.title },
    description,
    openGraph: {
      title: listing.title,
      description,
      images: image ? [{ url: image, alt: listing.title }] : [],
      type: "website",
      url: `${unbrandedShareUrl}/share/${slug}/unbranded`,
    },
    robots: { index: false, follow: false },
    twitter: {
      card: "summary_large_image",
      title: listing.title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function UnbrandedSharedListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { listing } = await getSharedListing(slug, true);
  const images = listing.photos.map((photo) => photo.url);
  const stats = [
    { label: "Type", value: listing.propertyType ?? "-" },
    { label: "Bedrooms", value: factValue(listing.bedrooms) },
    { label: "Bathrooms", value: factValue(listing.bathrooms) },
    { label: "Built", value: factValue(listing.builtArea, " m²") },
    { label: "Terraza", value: factValue(listing.terraceSize, " m²") },
  ];

  return (
    <main className="unbranded-listing-page min-h-screen bg-[#f7f2ea] pb-16 pt-5 text-[#242424]">
      <section className="mx-auto grid max-w-6xl gap-5 px-5 sm:px-8 lg:grid-cols-[1.35fr_0.65fr]">
        {images.length ? (
          <PropertyGallery images={images} title={listing.title} />
        ) : (
          <div className="grid min-h-80 place-items-center rounded-[8px] bg-white text-sm text-black/45 shadow-sm ring-1 ring-black/5">
            Photos unavailable
          </div>
        )}

        <aside className="h-fit rounded-[8px] bg-[#0f253d] p-5 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ba9456]">
            {listing.resalesRef || "Property details"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight">{listing.title}</h1>
          <p className="mt-2 text-sm text-white/72">
            {listing.address || "Costa del Sol"}
          </p>
          <p className="mt-5 text-2xl font-bold text-[#f7f2ea]">{listing.price}</p>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {stats.map((stat) => (
              <div
                className="rounded-[6px] border border-white/15 bg-white/8 p-3"
                key={stat.label}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-white/55">
                  {stat.label}
                </p>
                <p className="mt-1 text-lg font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 pt-5 sm:px-8">
        <article className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold">
            {listing.propertyType || "Property"}
          </h2>
          {listing.description ? (
            <p className="mt-4 whitespace-pre-line text-base leading-8 text-[#55514a]">
              {listing.description}
            </p>
          ) : null}

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Plot", value: factValue(listing.plotArea, " m²") },
              { label: "View", value: listing.view || "-" },
              { label: "Orientation", value: listing.orientation || "-" },
              { label: "Condition", value: listing.condition || "-" },
              { label: "Area", value: listing.address || "Costa del Sol" },
              { label: "Resales ref", value: listing.resalesRef || "-" },
            ].map((fact) => (
              <div className="rounded-[8px] bg-[#f7f2ea] p-4" key={fact.label}>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                  {fact.label}
                </p>
                <p className="mt-1 font-semibold">{fact.value}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
