import { HomeContent, HomeSearchParams } from "../page";
import { getLocale, locales } from "../i18n/translations";

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

export default async function LocalizedHome({
  params,
  searchParams,
}: LocalizedHomeProps) {
  const { locale } = await params;

  return <HomeContent locale={getLocale(locale)} searchParams={searchParams} />;
}

export const revalidate = 300;
