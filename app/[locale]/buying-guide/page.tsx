import type { Metadata } from "next";
import { ContentPageShell } from "../../components/content-page-shell";
import { getLocale, locales } from "../../i18n/translations";
import { getLanguageAlternates, getLocalizedPath, getPageRobots } from "../../lib/seo";

type BuyingGuidePageProps = {
  params: Promise<{ locale: string }>;
};

const steps = [
  {
    title: "Define the buying brief",
    text: "Lifestyle, investment logic, time horizon, budget, financing and must-have criteria before viewings begin.",
  },
  {
    title: "Choose the right area",
    text: "Compare Marbella, Estepona, Benahavis and nearby locations by access, services, price level and resale strength.",
  },
  {
    title: "Check the true cost",
    text: "Purchase tax, notary, registry, legal fees, mortgage costs, community fees and ownership expenses.",
  },
  {
    title: "Shortlist and negotiate",
    text: "Use comparable listings, public market benchmarks and local context before making an offer.",
  },
  {
    title: "Legal and financial process",
    text: "NIE, lawyer review, reservation, private purchase contract, due diligence, funds and completion at notary.",
  },
  {
    title: "After completion",
    text: "Utilities, community setup, insurance, rental strategy, furnishing and ongoing owner support.",
  },
];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: BuyingGuidePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);

  return {
    title: "Buying property in Spain guide",
    description:
      "A compact guide to buying property in Marbella and the Costa del Sol with Move2Marbella.",
    alternates: {
      canonical: getLocalizedPath(locale, "/buying-guide"),
      languages: getLanguageAlternates("/buying-guide"),
    },
    robots: getPageRobots(),
  };
}

export default async function BuyingGuidePage({
  params,
}: BuyingGuidePageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);

  return (
    <ContentPageShell
      locale={locale}
      eyebrow="Buying guide"
      title="Buying property in Spain, without guessing"
      body="A compact decision guide for international buyers who want a clear process, realistic costs and a better shortlist before travelling or making an offer."
    >
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <p className="text-sm font-semibold text-[#9a7a3a]">
                Step {index + 1}
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{step.title}</h2>
              <p className="mt-3 text-base leading-7 text-[#4b4740]">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </ContentPageShell>
  );
}

export const revalidate = 300;
