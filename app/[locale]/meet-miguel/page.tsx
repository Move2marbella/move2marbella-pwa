import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ContentPageShell } from "../../components/content-page-shell";
import { JsonLd } from "../../components/json-ld";
import { getLocale, locales, type Locale } from "../../i18n/translations";
import { SITE_URL, getLanguageAlternates, getLocalizedPath, getPageRobots } from "../../lib/seo";

type MeetMiguelPageProps = {
  params: Promise<{ locale: string }>;
};

const supportedLocales = locales.filter((locale) => locale !== "hu");

const proofCards = [
  {
    title: "Costa del Sol experience since 2010",
    text: "Miguel has advised international buyers across Marbella, Estepona, Benahavis, Nueva Andalucia, the Golden Mile and other prime western Costa del Sol areas.",
  },
  {
    title: "Doctor and economist background",
    text: "His medical and economics training brings a structured, analytical way of thinking to a market where calm judgment matters.",
  },
  {
    title: "Buyer-first advisory",
    text: "The goal is not to push the fastest transaction. It is to help you choose a property decision you can still defend years later.",
  },
];

const buyerQuestions = [
  "Which area fits your lifestyle, family needs or investment goals?",
  "Is the property genuinely well positioned, or simply well presented?",
  "What are the real purchase costs, ownership costs and renovation risks?",
  "How strong is the resale potential and rental logic?",
  "Are there hidden issues in the micro-location, community rules or price level?",
  "Does the shortlist match your long-term strategy, not only today's emotion?",
];

const advisoryPillars = [
  {
    title: "Area fit",
    text: "Marbella, Estepona, Benahavis and the wider Costa del Sol are not one single market. Each micro-area behaves differently.",
  },
  {
    title: "Property-type fit",
    text: "A beach apartment, golf villa, off-plan unit and refurbishment opportunity can all be attractive, but they serve different goals.",
  },
  {
    title: "Micro-location quality",
    text: "Long-term satisfaction often depends on the exact setting, access, noise, community, views and liquidity of the location.",
  },
  {
    title: "Cost clarity",
    text: "Move2Marbella looks beyond the asking price: taxes, legal costs, financing, community fees, maintenance and furnishing needs.",
  },
  {
    title: "Resale and rental logic",
    text: "Some homes look impressive online but are weaker in future buyer demand. Others are quieter, but strategically stronger.",
  },
  {
    title: "Coordinated support",
    text: "The process can include lawyers, tax advisers, mortgage specialists, banks and local professionals when needed.",
  },
];

const faqs = [
  {
    question: "Who is Miguel Horvath?",
    answer:
      "Miguel Horvath, also known as Zsolt Miguel Horvath or Dr. Horvath Zsolt Mihaly, is the founder of Move2Marbella and a Costa del Sol property advisor for international buyers.",
  },
  {
    question: "What makes Move2Marbella different?",
    answer:
      "The work is based on buyer advisory, not only listing search. The focus is area fit, micro-location, cost clarity, resale potential and a shortlist that makes sense.",
  },
  {
    question: "Which areas does Miguel focus on?",
    answer:
      "The main focus areas include Marbella, Estepona, Benahavis, Nueva Andalucia, the Golden Mile, San Pedro de Alcantara and other high-demand western Costa del Sol locations.",
  },
  {
    question: "Is the service only for Hungarian buyers?",
    answer:
      "No. Move2Marbella supports international buyers, while Hungarian-language advisory is an important advantage for clients who want local guidance in their own language.",
  },
];

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: MeetMiguelPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);

  if (locale === "hu") {
    return {};
  }

  return {
    title: "Meet Miguel Zsolt Horvath",
    description:
      "Meet Miguel Zsolt Horvath, founder of Move2Marbella and Costa del Sol buyer advisor helping clients choose the right area, property and strategy.",
    alternates: {
      canonical: getLocalizedPath(locale, "/meet-miguel"),
      languages: getLanguageAlternates("/meet-miguel"),
    },
    robots: getPageRobots(),
  };
}

function getIntro(locale: Locale) {
  if (locale === "es") {
    return {
      eyebrow: "Asesor inmobiliario en Marbella",
      title: "Conoce a Miguel Horvath",
      body:
        "Miguel ayuda a compradores internacionales a elegir la zona correcta, revisar el precio con criterio y avanzar con un proceso claro en la Costa del Sol.",
    };
  }

  return {
    eyebrow: "Costa del Sol buyer advisor",
    title: "Meet Miguel Zsolt Horvath",
    body:
      "Founder of Move2Marbella, Miguel helps international buyers choose the right area, understand the real price logic and move through the Marbella buying process with clarity.",
  };
}

function Section({
  children,
  eyebrow,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[320px_1fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-[#171717]">
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-base leading-8 text-[#4b4740]">
        {children}
      </div>
    </section>
  );
}

export default async function MeetMiguelPage({ params }: MeetMiguelPageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);

  if (locale === "hu") {
    notFound();
  }

  const intro = getIntro(locale);

  return (
    <ContentPageShell locale={locale} {...intro}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Zsolt Miguel Horvath",
          alternateName: ["Miguel Horvath", "Dr. Horváth Zsolt Mihály"],
          jobTitle: "Costa del Sol property advisor",
          worksFor: {
            "@type": "RealEstateAgent",
            name: "Move2Marbella",
            url: SITE_URL,
          },
          areaServed: ["Marbella", "Estepona", "Benahavis", "Costa del Sol"],
          knowsAbout: [
            "Marbella property market",
            "Costa del Sol property buying",
            "buyer advisory",
            "property investment",
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-10 sm:px-8 md:grid-cols-3">
        {proofCards.map((item) => (
          <article
            key={item.title}
            className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
          >
            <h2 className="text-2xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-base leading-7 text-[#4b4740]">
              {item.text}
            </p>
          </article>
        ))}
      </section>

      <Section eyebrow="Why it matters" title="Good advice is more than showing listings">
        <p>
          Buying in Marbella is rarely just about finding a beautiful home.
          Most buyers are really trying to understand the right area, the right
          property type, the right price level and the right buying strategy
          before committing.
        </p>
        <p>
          Move2Marbella was built around decision support. The aim is to reduce
          uncertainty, make the process easier to understand and help each buyer
          move forward with a shortlist that has been filtered properly.
        </p>
      </Section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            Buyer questions
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[#171717]">
            The questions behind a confident purchase
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {buyerQuestions.map((question) => (
            <div
              key={question}
              className="rounded-[8px] bg-white p-4 font-medium leading-7 text-[#242424] shadow-sm ring-1 ring-black/5"
            >
              {question}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            Move2Marbella method
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[#171717]">
            A structured way to compare properties
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {advisoryPillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <h3 className="text-xl font-semibold text-[#171717]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-[#4b4740]">
                {pillar.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <Section eyebrow="Support" title="Before, during and after the purchase">
        <p>
          A purchase in Spain involves more than choosing the property.
          International buyers often need legal, tax, banking, mortgage and
          practical local support to keep the process secure and understandable.
        </p>
        <p>
          Miguel coordinates the advisory side with a trusted local network
          where needed, while keeping the buyer focused on the main objective:
          choosing the location, property and strategy that fit the plan.
        </p>
      </Section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            Quick answers
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[#171717]">
            About Miguel and Move2Marbella
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <h3 className="text-lg font-semibold text-[#171717]">
                {faq.question}
              </h3>
              <p className="mt-3 text-base leading-7 text-[#4b4740]">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </ContentPageShell>
  );
}

export const revalidate = 300;
