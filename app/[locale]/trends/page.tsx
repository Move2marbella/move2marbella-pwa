import type { Metadata } from "next";
import { ContentPageShell } from "../../components/content-page-shell";
import { JsonLd } from "../../components/json-ld";
import { getMarketPageCopy } from "../../data/market-insights";
import { getLocale, locales } from "../../i18n/translations";
import { getLanguageAlternates, getLocalizedPath, getPageRobots } from "../../lib/seo";

type TrendsPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: TrendsPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const copy = getMarketPageCopy(locale);

  return {
    title: copy.title,
    description: copy.metaDescription,
    alternates: {
      canonical: getLocalizedPath(locale, "/trends"),
      languages: getLanguageAlternates("/trends"),
    },
    openGraph: {
      title: copy.title,
      description: copy.metaDescription,
      url: getLocalizedPath(locale, "/trends"),
    },
    robots: getPageRobots(),
  };
}

export default async function TrendsPage({ params }: TrendsPageProps) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const copy = getMarketPageCopy(locale);

  return (
    <ContentPageShell
      body={copy.body}
      eyebrow={copy.eyebrow}
      languagePath="/trends"
      locale={locale}
      title={copy.title}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: copy.title,
          description: copy.metaDescription,
          url: getLocalizedPath(locale, "/trends"),
          hasPart: copy.insights.map((insight) => ({
            "@type": "Article",
            headline: insight.title,
            url: insight.href,
          })),
        }}
      />
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
              {copy.updatedLabel}
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-[#0f253d]">
              {copy.updatedValue}
            </h2>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {copy.insights.map((insight) => (
            <article
              key={insight.href}
              className="grid rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9a7a3a]">
                {insight.category}
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#0f253d]">
                {insight.title}
              </h3>
              <ul className="mt-4 grid gap-2 text-base leading-7 text-[#55514a]">
                {insight.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ba9456]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <a
                href={insight.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-fit rounded-full bg-[#0f253d] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#173b60]"
              >
                {copy.readMore}
              </a>
            </article>
          ))}
        </div>
      </section>
    </ContentPageShell>
  );
}
