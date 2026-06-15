import type { Metadata } from "next";
import { getLocale, getTranslations, locales } from "../../../i18n/translations";
import { getLanguageAlternates, getLocalizedPath, getPageRobots } from "../../../lib/seo";
import SimilarPropertiesPage from "../../../similar-properties/page";

type LocalizedSimilarPropertiesSlugPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
    slug: "property-no-longer-available",
  }));
}

export async function generateMetadata({
  params,
}: LocalizedSimilarPropertiesSlugPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = getLocale(localeParam);
  const t = getTranslations(locale);
  const canonical = getLocalizedPath(locale, `/similar-properties/${slug}`);

  return {
    title: t.featuredProperties,
    description: t.seoDescription,
    alternates: {
      canonical,
      languages: getLanguageAlternates(`/similar-properties/${slug}`),
    },
    robots: getPageRobots(),
  };
}

export default async function LocalizedSimilarPropertiesSlugPage({
  params,
}: LocalizedSimilarPropertiesSlugPageProps) {
  const { locale, slug } = await params;

  return (
    <SimilarPropertiesPage
      locale={getLocale(locale)}
      params={Promise.resolve({ slug })}
    />
  );
}

export const revalidate = 300;
