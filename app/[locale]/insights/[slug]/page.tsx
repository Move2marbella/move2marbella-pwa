import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentPageShell } from "../../../components/content-page-shell";
import { HungarianBuyerGuideDetails } from "../../../components/hungarian-buyer-guide-details";
import { JsonLd } from "../../../components/json-ld";
import {
  getMarketArticle,
  marketArticleSlugs,
  marketArticleUi,
} from "../../../data/market-insights";
import {
  getLocale,
  getLocaleBasePath,
  locales,
} from "../../../i18n/translations";
import {
  SITE_URL,
  getLanguageAlternates,
  getLocalizedPath,
  getPageRobots,
} from "../../../lib/seo";

type MarketArticlePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    marketArticleSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: MarketArticlePageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = getLocale(rawLocale);
  const article = getMarketArticle(locale, slug);

  if (!article) {
    return { title: "Article not found | Move2Marbella" };
  }

  const canonical = getLocalizedPath(locale, `/insights/${slug}`);
  const description = article.bullets.join(" ").slice(0, 300);

  return {
    title: article.title,
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(`/insights/${slug}`),
    },
    openGraph: {
      type: "article",
      title: article.title,
      description,
      url: canonical,
      siteName: "Move2Marbella",
      images: [
        {
          alt: article.title,
          height: 675,
          url: "/move2marbella-panorama.jpg",
          width: 1200,
        },
      ],
    },
    robots: getPageRobots(),
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: ["/move2marbella-panorama.jpg"],
    },
  };
}

export default async function MarketArticlePage({
  params,
}: MarketArticlePageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = getLocale(rawLocale);
  const article = getMarketArticle(locale, slug);

  if (!article) {
    notFound();
  }

  const ui = marketArticleUi[locale];
  const basePath = getLocaleBasePath(locale);
  const articlePath = `/insights/${slug}`;
  const canonicalUrl = `${SITE_URL}${getLocalizedPath(locale, articlePath)}`;

  return (
    <ContentPageShell
      body={article.bullets[0]}
      eyebrow={article.category}
      getLanguageHref={(nextLocale) =>
        getLocalizedPath(nextLocale, articlePath)
      }
      locale={locale}
      title={article.title}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.bullets.join(" "),
          dateModified: "2026-09-19",
          datePublished: "2026-09-19",
          inLanguage: locale,
          mainEntityOfPage: canonicalUrl,
          author: {
            "@type": "Person",
            name: "Zsolt Miguel Horvath dr.",
            url: `${SITE_URL}${getLocalizedPath(locale, "/meet-miguel")}`,
          },
          publisher: {
            "@type": "Organization",
            name: "Move2Marbella",
            url: SITE_URL,
          },
        }}
      />

      {locale === "hu" && slug === "buying-property-in-spain-guide" ? (
        <HungarianBuyerGuideDetails />
      ) : (
        <article className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d8d0c2] pb-5">
            <Link
              href={`${basePath}/insights`}
              className="text-sm font-bold uppercase tracking-[0.12em] text-[#0f253d] underline decoration-[#ba9456] decoration-2 underline-offset-4"
            >
              ← {ui.back}
            </Link>
            <p className="text-sm text-[#6f6a61]">{ui.updated}</p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
            <div className="min-w-0">
              <p className="text-xl leading-9 text-[#302d28]">
                {article.bullets[0]}
              </p>

              <section className="mt-9 border-t border-[#d8d0c2] pt-7">
                <h2 className="text-2xl font-semibold text-[#0f253d]">
                  {ui.practicalNextStep}
                </h2>
                <div className="mt-5 grid gap-5">
                  {article.bullets.slice(1).map((bullet) => (
                    <p
                      key={bullet}
                      className="text-lg leading-8 text-[#514c44]"
                    >
                      {bullet}
                    </p>
                  ))}
                </div>
              </section>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href={basePath}
                  className="rounded-[6px] bg-[#0f253d] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white"
                >
                  {ui.findProperties}
                </Link>
                <Link
                  href={`${basePath}/areas`}
                  className="rounded-[6px] bg-[#ba9456] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white"
                >
                  {ui.exploreAreas}
                </Link>
                <a
                  href={article.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[6px] border border-[#0f253d] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#0f253d]"
                >
                  {ui.readSource}
                </a>
              </div>
            </div>

            <aside className="border-l-4 border-[#ba9456] bg-[#0f253d] p-6 text-white lg:sticky lg:top-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d7b879]">
                {ui.buyerTakeaway}
              </p>
              <ul className="mt-5 grid gap-4 text-sm leading-6 text-white/85">
                {article.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-[#d7b879]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </article>
      )}
    </ContentPageShell>
  );
}
