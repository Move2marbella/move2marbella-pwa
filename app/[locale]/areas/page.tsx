import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "../../components/content-page-shell";
import { getLocale, locales } from "../../i18n/translations";
import { getLanguageAlternates, getLocalizedPath, getPageRobots } from "../../lib/seo";

type AreasPageProps = {
  params: Promise<{ locale: string }>;
};

const areaNames = [
  "Marbella",
  "Nueva Andalucia",
  "Puerto Banus",
  "Golden Mile",
  "Benahavis",
  "Estepona",
  "Mijas",
  "La Cala de Mijas",
  "Fuengirola",
  "Sotogrande",
];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: AreasPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);

  return {
    title: "Costa del Sol area guides",
    description:
      "Compact Move2Marbella area guides for Marbella, Estepona, Benahavis and the Costa del Sol property market.",
    alternates: {
      canonical: getLocalizedPath(locale, "/areas"),
      languages: getLanguageAlternates("/areas"),
    },
    robots: getPageRobots(),
  };
}

export default async function AreasPage({ params }: AreasPageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);

  return (
    <ContentPageShell
      locale={locale}
      eyebrow="Area guides"
      title="Where to buy on the Costa del Sol"
      body="Choose the right area before choosing the property. These compact guides help compare lifestyle, price logic and buyer fit across the key Costa del Sol locations."
    >
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {areaNames.map((area) => (
            <article
              key={area}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9a7a3a]">
                Costa del Sol
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{area}</h2>
              <p className="mt-3 text-base leading-7 text-[#4b4740]">
                Buyer profile, lifestyle fit, price expectations and active
                Move2Marbella listings for this area.
              </p>
              <Link
                href={`/${locale}`}
                className="mt-4 inline-flex rounded-full border border-[#0f253d] px-4 py-2 text-sm font-semibold text-[#0f253d]"
              >
                View properties
              </Link>
            </article>
          ))}
        </div>
      </section>
    </ContentPageShell>
  );
}

export const revalidate = 300;
