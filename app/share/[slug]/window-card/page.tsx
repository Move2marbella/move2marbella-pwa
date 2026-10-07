import type { Metadata } from "next";

import { PrintButton } from "../../../components/print-button";
import { factValue, getSharedListing } from "../../shared";

export const metadata: Metadata = {
  title: { absolute: " " },
  robots: { index: false, follow: false },
};

export default async function WindowCardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { listing } = await getSharedListing(slug, true);
  const hero = listing.photos[0];
  const facts = [
    ["Bedrooms", factValue(listing.bedrooms)],
    ["Bathrooms", factValue(listing.bathrooms)],
    ["Built", factValue(listing.builtArea, " m²")],
    ["Terraza", factValue(listing.terraceSize, " m²")],
    ["Plot", factValue(listing.plotArea, " m²")],
    ["Orientation", listing.orientation ?? "-"],
  ];

  return (
    <main className="window-card-page">
      <div className="window-card-toolbar"><PrintButton /></div>
      <article className="window-card-sheet">
        {hero ? (
          <img alt={hero.alt} className="window-card-hero" src={hero.url} />
        ) : (
          <div className="window-card-hero window-card-placeholder">Property</div>
        )}
        <header className="window-card-header">
          <div>
            <p>{listing.resalesRef || "Property details"}</p>
            <h1>{listing.title}</h1>
            <span>{listing.address || "Costa del Sol"}</span>
          </div>
          <strong>{listing.price}</strong>
        </header>
        <dl className="window-card-facts">
          {facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
        <section className="window-card-description">
          <h2>{listing.propertyType || "Property"}</h2>
          {listing.description ? <p>{listing.description}</p> : null}
        </section>
        {listing.photos.length > 1 ? (
          <div className="window-card-gallery">
            {listing.photos.slice(1).map((photo) => (
              <img alt={photo.alt} key={photo.url} src={photo.url} />
            ))}
          </div>
        ) : null}
      </article>
    </main>
  );
}
