import { permanentRedirect } from "next/navigation";
import { getLocale, getLocaleBasePath } from "../../../i18n/translations";

type LegacyTrendArticlePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function LegacyTrendArticlePage({
  params,
}: LegacyTrendArticlePageProps) {
  const { locale: rawLocale, slug } = await params;
  permanentRedirect(
    `${getLocaleBasePath(getLocale(rawLocale))}/insights/${encodeURIComponent(slug)}`,
  );
}
