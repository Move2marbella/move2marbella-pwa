import type { Metadata } from "next";
import { getLocale, getTranslations, locales } from "../../i18n/translations";
import { getLanguageAlternates, getLocalizedPath, getPageRobots } from "../../lib/seo";
import ValuationPage, { type ValuationSearchParams } from "../../valuation/page";

type LocalizedValuationPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<ValuationSearchParams>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: LocalizedValuationPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);
  const t = getTranslations(locale);
  const canonical = getLocalizedPath(locale, "/valuation");

  return {
    title: t.valuation.heroTitle,
    description: t.valuation.heroBody,
    alternates: {
      canonical,
      languages: getLanguageAlternates("/valuation"),
    },
    openGraph: {
      title: t.valuation.heroTitle,
      description: t.valuation.heroBody,
      images: [
        {
          alt: "Move2Marbella Costa del Sol property valuation",
          height: 675,
          url: "/move2marbella-panorama.jpg",
          width: 1200,
        },
      ],
      siteName: "Move2Marbella",
      type: "website",
      url: canonical,
    },
    robots: getPageRobots(),
    twitter: {
      card: "summary_large_image",
      description: t.valuation.heroBody,
      images: ["/move2marbella-panorama.jpg"],
      title: t.valuation.heroTitle,
    },
  };
}

export default async function LocalizedValuationPage({
  params,
  searchParams,
}: LocalizedValuationPageProps) {
  const { locale } = await params;

  return <ValuationPage locale={getLocale(locale)} searchParams={searchParams} />;
}

export const revalidate = 3600;
