import {
  PropertyDetailContent,
  getPropertyMetadata,
} from "../../../properties/[ref]/page";
import { getLocale } from "../../../i18n/translations";

type LocalizedPropertyPageProps = {
  params: Promise<{
    locale: string;
    ref: string;
  }>;
  searchParams: Promise<{
    wp_id?: string;
  }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: LocalizedPropertyPageProps) {
  const { locale, ref } = await params;
  const { wp_id: wordpressId } = await searchParams;

  return getPropertyMetadata(getLocale(locale), ref, wordpressId);
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

// Property pages depend on the wp_id query parameter and live inventory data.
export const dynamic = "force-dynamic";
