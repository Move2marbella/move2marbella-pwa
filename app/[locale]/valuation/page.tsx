import type { Metadata } from "next";
import { getLocale, locales } from "../../i18n/translations";
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
  const canonical = getLocalizedPath(locale, "/valuation");

  return {
    title: "Property valuation",
    description:
      "Estimate a Costa del Sol property value using Move2Marbella listings and public Notariado market benchmarks.",
    alternates: {
      canonical,
      languages: getLanguageAlternates("/valuation"),
    },
    openGraph: {
      title: "Property valuation",
      description:
        "Estimate a Costa del Sol property value using Move2Marbella listings and public Notariado market benchmarks.",
      url: canonical,
    },
    robots: getPageRobots(),
  };
}

export default function LocalizedValuationPage({
  searchParams,
}: LocalizedValuationPageProps) {
  return <ValuationPage searchParams={searchParams} />;
}

export const revalidate = 300;
