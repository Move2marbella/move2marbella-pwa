"use client";

import Image from "next/image";

type GuideItem = {
  title: string;
  description: string;
};

const immutableFeatures: GuideItem[] = [
  {
    title: "Location & micro-location",
    description: "The neighbourhood, complex and exact position define value today and tomorrow.",
  },
  {
    title: "Sea view",
    description: "Open sea and panoramic views are scarce, difficult to replicate and command a premium.",
  },
  {
    title: "Surroundings",
    description: "Density, green space, noise, orientation and neighbourhood character are permanent.",
  },
  {
    title: "Community quality",
    description: "Gardens, security, pools, maintenance and management shape everyday ownership.",
  },
  {
    title: "Walkability",
    description: "Convenient access to the beach, restaurants, shops and services supports demand.",
  },
  {
    title: "Rental potential / tourist licence possibility",
    description: "Demand, regulations and licence viability directly affect income potential.",
  },
];

const improvableFeatures: GuideItem[] = [
  {
    title: "Bathrooms",
    description: "Tiles, fittings, lighting and layout can be renewed after purchase.",
  },
  {
    title: "Kitchen & appliances",
    description: "Cabinetry, worktops, equipment and finishes can be upgraded or replaced.",
  },
  {
    title: "Air conditioning & heating",
    description: "Modern systems and smart controls can improve comfort and efficiency.",
  },
  {
    title: "Windows & doors",
    description: "High-quality replacements can improve insulation, comfort and appearance.",
  },
  {
    title: "Flooring, lighting & finishes",
    description: "A considered specification can transform the atmosphere and perceived quality.",
  },
  {
    title: "Interior design",
    description: "Furniture, colour, storage and styling can be adapted to the buyer.",
  },
  {
    title: "Layout optimisation where technically possible",
    description: "Selective changes can improve flow, storage and the use of available space.",
  },
];

const decisionOrder = [
  "Location",
  "View",
  "Community",
  "Surroundings",
  "Rental potential",
  "Renovation potential",
  "Price",
];

function GuideList({ items, accent }: { items: GuideItem[]; accent: "navy" | "gold" }) {
  return (
    <ol className="decision-guide-factor-list grid bg-white">
      {items.map((item, index) => (
        <li
          key={item.title}
          className="decision-guide-print-card grid grid-cols-[2.4rem_1fr] gap-3 border-b border-[#0F2346]/10 px-5 py-4 last:border-b-0 sm:grid-cols-[2.75rem_1fr] sm:px-6"
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold sm:h-10 sm:w-10 ${
              accent === "navy"
                ? "border-[#0F2346] text-[#0F2346]"
                : "border-[#C8A15A] text-[#8A682D]"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>
            <strong className="block text-sm font-semibold uppercase leading-5 text-[#0F2346] sm:text-base">
              {item.title}
            </strong>
            <span className="mt-1 block text-sm leading-5 text-[#5F6570]">
              {item.description}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export function PropertyDecisionGuideContent() {
  return (
    <section
      id="property-decision-guide"
      aria-labelledby="property-decision-guide-title"
      className="decision-guide-printable mx-auto max-w-6xl px-5 pb-14 sm:px-8 sm:pb-20"
    >
      <div className="decision-guide-print-button mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-12 items-center justify-center bg-[#C8A15A] px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#0F2346] transition hover:bg-[#D8B974] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2346]"
        >
          Print / Save as PDF
        </button>
      </div>

      <article className="decision-guide-sheet overflow-hidden border border-[#0F2346]/12 bg-[#F7F5F2] shadow-[0_24px_70px_rgba(15,35,70,0.12)]">
        <header className="decision-guide-sheet-header bg-white px-6 py-7 sm:px-9 sm:py-9 lg:px-11">
          <div className="grid gap-6 lg:grid-cols-[1fr_17rem] lg:items-start">
            <div>
              <Image
                src="/m2m_logo_blue_web.png"
                alt="Move2Marbella"
                width={260}
                height={56}
                className="h-auto w-52 sm:w-64"
              />
              <h2
                id="property-decision-guide-title"
                className="mt-6 text-4xl font-semibold uppercase leading-none text-[#0F2346] sm:text-5xl lg:text-6xl"
              >
                Property Decision Guide
              </h2>
              <p className="mt-3 text-lg font-semibold uppercase text-[#9A7534] sm:text-xl">
                What you can&apos;t change should always come first.
              </p>
            </div>
            <aside className="decision-guide-print-card border border-[#C8A15A]/55 bg-[#F7F5F2] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A7534]">
                The key message
              </p>
              <p className="mt-3 text-sm leading-6 text-[#0F2346]">
                The best decision is not only about the property today. It is about its
                lifestyle value, resilience and future potential.
              </p>
            </aside>
          </div>
          <p className="mt-6 max-w-5xl border-t border-[#0F2346]/10 pt-5 text-base leading-7 text-[#535B68]">
            When comparing two or three properties, buyers often focus on finishes,
            furniture or renovation quality. But the most important decision is usually
            about the fundamentals: location, view, surroundings, community quality and
            long-term resale value.
          </p>
        </header>

        <section className="decision-guide-matrix grid gap-4 p-4 sm:p-6 lg:grid-cols-2">
          <article className="decision-guide-print-card overflow-hidden border border-[#0F2346]/12 bg-white">
            <header className="bg-[#0F2346] px-6 py-5 text-center text-white">
              <h3 className="text-2xl font-semibold uppercase">Features you can&apos;t change</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#E8C986]">
                Timeless factors that create value
              </p>
            </header>
            <GuideList items={immutableFeatures} accent="navy" />
            <p className="border-t border-[#0F2346]/10 bg-[#EEF1F5] px-6 py-4 text-sm font-semibold leading-6 text-[#0F2346]">
              These are the fundamentals that usually define long-term value.
            </p>
          </article>

          <article className="decision-guide-print-card overflow-hidden border border-[#C8A15A]/35 bg-white">
            <header className="bg-[#C8A15A] px-6 py-5 text-center text-[#0F2346]">
              <h3 className="text-2xl font-semibold uppercase">Features you can improve</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#4D3A17]">
                Improvable features that add value
              </p>
            </header>
            <GuideList items={improvableFeatures} accent="gold" />
            <p className="border-t border-[#C8A15A]/25 bg-[#FBF4E7] px-6 py-4 text-sm font-semibold leading-6 text-[#5F491E]">
              Renovation can add value, but it cannot fix a weak location.
            </p>
          </article>
        </section>

        <section className="decision-guide-priority mx-4 bg-[#0F2346] px-5 py-5 text-white sm:mx-6 sm:px-7">
          <div className="grid gap-3 lg:grid-cols-[auto_1fr] lg:items-center">
            <h3 className="text-lg font-semibold uppercase text-[#C8A15A]">The right priority</h3>
            <p className="text-sm leading-6 text-white/88">
              Always choose a property based on the factors you cannot change. They
              determine long-term value and lifestyle.
            </p>
          </div>
        </section>

        <section className="decision-guide-comparison grid gap-3 px-4 pt-4 sm:px-6 lg:grid-cols-2">
          <div className="decision-guide-print-card border border-[#0F2346]/12 bg-white px-5 py-4 text-[#0F2346]">
            <span className="text-base font-semibold">Bad location + luxury renovation</span>
            <strong className="ml-2 text-lg text-[#9A403A]">≠ premium property</strong>
          </div>
          <div className="decision-guide-print-card border border-[#C8A15A]/40 bg-[#FBF4E7] px-5 py-4 text-[#0F2346]">
            <span className="text-base font-semibold">Good location + smart renovation</span>
            <strong className="ml-2 text-lg text-[#8A682D]">= often better long-term decision</strong>
          </div>
        </section>

        <section className="decision-guide-order px-4 py-5 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#9A7534]">
            Decision order
          </p>
          <ol className="mt-3 grid grid-cols-2 border-l border-t border-[#0F2346]/12 sm:grid-cols-4 lg:grid-cols-7">
            {decisionOrder.map((item, index) => (
              <li
                key={item}
                className="decision-guide-print-card min-h-24 border-b border-r border-[#0F2346]/12 bg-white p-4"
              >
                <span className="text-xl font-semibold text-[#C8A15A]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-5 block text-xs font-semibold uppercase leading-5 text-[#0F2346]">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <blockquote className="decision-guide-quote bg-[#0F2346] px-6 py-6 text-center text-lg font-medium leading-7 text-white sm:px-10 sm:text-xl">
          Experienced buyers don&apos;t buy the most beautiful apartment. They buy the best
          fundamentals. Everything else can be improved later.
          <footer className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#C8A15A]">
            Move2Marbella
          </footer>
        </blockquote>
      </article>
    </section>
  );
}
