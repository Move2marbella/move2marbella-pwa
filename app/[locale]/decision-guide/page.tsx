import { permanentRedirect } from "next/navigation";
import { getLocale, getLocaleBasePath } from "../../i18n/translations";

type LegacyDecisionGuidePageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string; wp_id?: string }>;
};

export default async function LegacyDecisionGuidePage({
  params,
  searchParams,
}: LegacyDecisionGuidePageProps) {
  const { locale: rawLocale } = await params;
  const query = new URLSearchParams();
  const { ref, wp_id: wordpressId } = await searchParams;

  if (ref) query.set("ref", ref);
  if (wordpressId) query.set("wp_id", wordpressId);

  const suffix = query.size ? `?${query.toString()}` : "";
  permanentRedirect(
    `${getLocaleBasePath(getLocale(rawLocale))}/score${suffix}`,
  );
}
