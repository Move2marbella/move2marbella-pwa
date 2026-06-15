import type { Metadata } from "next";
import { getLocale, getTranslations, locales } from "../../i18n/translations";
import { getLanguageAlternates, getLocalizedPath, getPageRobots } from "../../lib/seo";
import SimilarPropertiesPage from "../../similar-properties/page";

type LocalizedSimilarPropertiesPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: LocalizedSimilarPropertiesPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);
  const t = getTranslations(locale);
  const canonical = getLocalizedPath(locale, "/similar-properties");

  return {
    title: t.featuredProperties,
    description: t.seoDescription,
    alternates: {
      canonical,
      languages: getLanguageAlternates("/similar-properties"),
    },
    robots: getPageRobots(),
  };
}

export default async function LocalizedSimilarPropertiesPage({
  params,
}: LocalizedSimilarPropertiesPageProps) {
  const { locale } = await params;

  return <SimilarPropertiesPage locale={getLocale(locale)} />;
}

export const revalidate = 300;
