import type { Metadata } from "next";
import { ContentPageShell } from "../../components/content-page-shell";
import {
  DecisionGuide,
  type EvaluationProperty,
} from "../../components/decision-guide";
import { getDecisionGuideCopy } from "../../data/decision-guide";
import { getPropertyByRef } from "../../data/properties";
import { getLocale, type Locale } from "../../i18n/translations";
import {
  getLanguageAlternates,
  getLocalizedPath,
  getPageRobots,
} from "../../lib/seo";

type DecisionGuidePageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string; wp_id?: string }>;
};

export async function generateMetadata({
  params,
}: DecisionGuidePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);
  const copy = getDecisionGuideCopy(locale);

  return {
    title: copy.eyebrow,
    description: copy.metaDescription,
    alternates: {
      canonical: getLocalizedPath(locale, "/decision-guide"),
      languages: getLanguageAlternates("/decision-guide"),
    },
    robots: getPageRobots(),
  };
}

export default async function DecisionGuidePage({
  params,
  searchParams,
}: DecisionGuidePageProps) {
  const { locale: localeParam } = await params;
  const { ref, wp_id: wordpressId } = await searchParams;
  const locale = getLocale(localeParam);
  const copy = getDecisionGuideCopy(locale);
  const property = ref ? await getPropertyByRef(ref, wordpressId) : null;
  const initialProperty: EvaluationProperty | null = property
    ? {
        id: `app:${property.ref}`,
        source: "app",
        title: property.title,
        reference: property.ref,
        location: property.location,
        price: property.price,
        image: property.images[0],
        url: getLocalizedPath(locale, `/properties/${property.ref}`),
      }
    : null;

  return (
    <ContentPageShell
      locale={locale}
      languagePath="/decision-guide"
      eyebrow={copy.eyebrow}
      title={copy.title}
      body={copy.body}
      getLanguageHref={(nextLocale: Locale) => {
        const path = getLocalizedPath(nextLocale, "/decision-guide");
        if (!property) return path;
        const query = new URLSearchParams({ ref: property.ref });
        if (wordpressId) query.set("wp_id", wordpressId);
        return `${path}?${query.toString()}`;
      }}
    >
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <DecisionGuide
          basePath={getLocalizedPath(locale)}
          copy={copy}
          initialProperty={initialProperty}
        />
      </section>
    </ContentPageShell>
  );
}
