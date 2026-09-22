import { permanentRedirect } from "next/navigation";
import { getLocale, getLocaleBasePath } from "../../i18n/translations";

type LegacyTrendsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LegacyTrendsPage({
  params,
}: LegacyTrendsPageProps) {
  const { locale: rawLocale } = await params;
  permanentRedirect(`${getLocaleBasePath(getLocale(rawLocale))}/insights`);
}
