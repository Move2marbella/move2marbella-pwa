import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPageShell } from "../../components/content-page-shell";
import { JsonLd } from "../../components/json-ld";
import { getLocale, locales, type Locale } from "../../i18n/translations";
import { SITE_URL, getLanguageAlternates, getLocalizedPath, getPageRobots } from "../../lib/seo";

type MeetMiguelPageProps = {
  params: Promise<{ locale: string }>;
};

const supportedLocales = locales.filter((locale) => locale !== "hu");

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
    title: "Meet Miguel Horvath",
    description:
      "Meet Miguel Horvath, founder of Move2Marbella and Costa del Sol property advisor for international buyers.",
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
    title: "Meet Miguel Horvath",
    body:
      "Miguel helps international buyers choose the right area, understand the price logic and move through the Marbella buying process with a clear shortlist.",
  };
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
        }}
      />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-10 sm:px-8 md:grid-cols-3">
        {[
          {
            title: "Local experience",
            text: "On-the-ground Costa del Sol market context since 2010.",
          },
          {
            title: "Buyer-first process",
            text: "Area fit, price logic and due diligence before pressure or emotion.",
          },
          {
            title: "International support",
            text: "Clear communication for buyers comparing Spain from abroad.",
          },
        ].map((item) => (
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
    </ContentPageShell>
  );
}

export const revalidate = 300;
