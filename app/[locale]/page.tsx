import type { Metadata } from "next";
import { HomeContent, HomeSearchParams } from "../page";
import { getLocale, getTranslations, locales } from "../i18n/translations";
import {
  getLanguageAlternates,
  getLocalizedPath,
  getPageRobots,
} from "../lib/seo";

type LocalizedHomeProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<HomeSearchParams>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: LocalizedHomeProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);
  const t = getTranslations(locale);
  const canonical = getLocalizedPath(locale);

  return {
    title: t.heroTitle,
    description: t.heroText,
    alternates: {
      canonical,
      languages: getLanguageAlternates(),
    },
    openGraph: {
      title: t.heroTitle,
      description: t.heroText,
      url: canonical,
    },
    twitter: {
      title: t.heroTitle,
      description: t.heroText,
    },
    robots: getPageRobots(),
  };
}

export default async function LocalizedHome({
  params,
  searchParams,
}: LocalizedHomeProps) {
  const { locale } = await params;

  return <HomeContent locale={getLocale(locale)} searchParams={searchParams} />;
}

export const revalidate = 300;
