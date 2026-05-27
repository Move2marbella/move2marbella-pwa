import {
  PropertyDetailContent,
  generateMetadata as generateBaseMetadata,
  generateStaticParams as generateBaseStaticParams,
} from "../../../properties/[ref]/page";
import { getLocale, locales } from "../../../i18n/translations";

type LocalizedPropertyPageProps = {
  params: Promise<{
    locale: string;
    ref: string;
  }>;
  searchParams: Promise<{
    wp_id?: string;
  }>;
};

export function generateStaticParams() {
  const baseParams = generateBaseStaticParams();

  if ("then" in baseParams) {
    return baseParams.then((properties) =>
      locales.flatMap((locale) =>
        properties.map((property) => ({
          locale,
          ref: property.ref,
        })),
      ),
    );
  }

  return [];
}

export async function generateMetadata({
  params,
  searchParams,
}: LocalizedPropertyPageProps) {
  const { ref } = await params;

  return generateBaseMetadata({
    params: Promise.resolve({ ref }),
    searchParams,
  });
}

export default async function LocalizedPropertyPage({
  params,
  searchParams,
}: LocalizedPropertyPageProps) {
  const { locale, ref } = await params;

  return (
    <PropertyDetailContent
      locale={getLocale(locale)}
      params={Promise.resolve({ ref })}
      searchParams={searchParams}
    />
  );
}

export const revalidate = 300;
