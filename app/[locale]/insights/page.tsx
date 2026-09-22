import type { Metadata } from "next";
import { ContentPageShell } from "../../components/content-page-shell";
import { JsonLd } from "../../components/json-ld";
import { MarketArticleBrowser } from "../../components/market-article-browser";
import {
  getMarketArticles,
  getMarketPageCopy,
} from "../../data/market-insights";
import { getLocale, getLocaleBasePath, locales } from "../../i18n/translations";
import {
  getLanguageAlternates,
  getLocalizedPath,
  getPageRobots,
} from "../../lib/seo";

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
      canonical: getLocalizedPath(locale, "/insights"),
      languages: getLanguageAlternates("/insights"),
    },
    openGraph: {
      title: copy.title,
      description: copy.metaDescription,
      images: [
        {
          alt: "Move2Marbella Costa del Sol real estate trends",
          height: 675,
          url: "/move2marbella-panorama.jpg",
          width: 1200,
        },
      ],
      siteName: "Move2Marbella",
      type: "website",
      url: getLocalizedPath(locale, "/insights"),
    },
    robots: getPageRobots(),
    twitter: {
      card: "summary_large_image",
      description: copy.metaDescription,
      images: ["/move2marbella-panorama.jpg"],
      title: copy.title,
    },
  };
}

export default async function TrendsPage({ params }: TrendsPageProps) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const copy = getMarketPageCopy(locale);
  const articles = getMarketArticles(locale);
  const basePath = getLocaleBasePath(locale);

  return (
    <ContentPageShell
      body={copy.body}
      eyebrow={copy.eyebrow}
      languagePath="/insights"
      locale={locale}
      title={copy.title}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: copy.title,
          description: copy.metaDescription,
          url: getLocalizedPath(locale, "/insights"),
          hasPart: articles.map((insight) => ({
            "@type": "Article",
            headline: insight.title,
            url: getLocalizedPath(locale, `/insights/${insight.slug}`),
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
        <MarketArticleBrowser
          articles={articles}
          basePath={basePath}
          locale={locale}
        />
      </section>
    </ContentPageShell>
  );
}
