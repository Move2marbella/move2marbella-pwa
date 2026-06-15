import type { Metadata } from "next";
import { ContentPageShell } from "../../components/content-page-shell";
import { JsonLd } from "../../components/json-ld";
import { getLocale, locales } from "../../i18n/translations";
import { getLanguageAlternates, getLocalizedPath, getPageRobots } from "../../lib/seo";

type BuyingGuidePageProps = {
  params: Promise<{ locale: string }>;
};

const content = {
  en: {
    body:
      "A compact guide to the practical buying process on the Costa del Sol: reservation, arras contract, legal checks, notary completion and the real extra costs.",
    eyebrow: "Buying guide",
    metaDescription:
      "A compact guide to buying resale and new-build property in Marbella and the Costa del Sol: deposits, arras contract, taxes, legal checks and completion costs.",
    title: "Buying property in Spain, without guessing",
    resaleTitle: "Resale property process",
    newBuildTitle: "New-build and off-plan process",
    costsTitle: "Typical extra costs",
    checksTitle: "Lawyer checks before completion",
    steps: [
      {
        title: "Offer accepted",
        text: "After the buyer chooses the property and agrees the final price with the seller, the reservation process starts.",
      },
      {
        title: "Initial deposit",
        text: "For many resale properties, especially below EUR 500,000, a EUR 6,000 deposit is common. It is usually paid to the buyer's lawyer first.",
      },
      {
        title: "Arras contract",
        text: "The official reservation contract normally increases the payment to 10% of the purchase price. The initial deposit is deducted from this amount.",
      },
      {
        title: "Legal protection",
        text: "If the seller withdraws, they generally repay double the deposit. If the buyer withdraws without legal reason, the buyer may lose the deposit.",
      },
      {
        title: "Due diligence",
        text: "Most resale transactions allow around 60 days for legal checks, funds, mortgage coordination and notary completion.",
      },
      {
        title: "Notary completion",
        text: "The final deed is signed before a notary, the balance is paid and ownership officially transfers to the buyer.",
      },
    ],
    newBuild: [
      "Reservation deposits are often around EUR 6,000-11,000.",
      "During construction, buyers commonly pay around 30% in stages.",
      "The remaining 70% is paid on completion at the notary.",
      "Timelines are often 1-2 years, depending on the project.",
    ],
    costs: [
      { label: "Resale transfer tax in Andalucia", value: "7% ITP" },
      { label: "Lawyer fee", value: "approx. 1%" },
      { label: "Notary and land registry", value: "approx. 0.5%" },
      { label: "Typical resale extras", value: "approx. 8.5%" },
      { label: "New-build VAT", value: "10% IVA" },
      { label: "Typical new-build extras", value: "approx. 11.5%" },
    ],
    checks: [
      "Land registry ownership and title",
      "Charges, debts or mortgages on the property",
      "Licences and legal status",
      "Utility, community and local tax debts",
    ],
    faqs: [
      {
        question: "How much deposit is usual for a resale property?",
        answer:
          "A EUR 6,000 initial deposit is common in many resale transactions, followed by an arras contract that usually brings the payment to 10% of the purchase price.",
      },
      {
        question: "How long does a resale purchase usually take?",
        answer:
          "A typical resale purchase on the Costa del Sol often completes in around 60 days, depending on legal checks, financing and seller-buyer agreement.",
      },
      {
        question: "What are the typical buying costs for resale property?",
        answer:
          "In Andalucia, resale buyers usually budget around 8.5% on top of the price: 7% ITP transfer tax, around 1% lawyer fee and around 0.5% notary and registry costs.",
      },
      {
        question: "What is different with new-build property?",
        answer:
          "New-build property usually has staged payments during construction, 10% IVA instead of 7% ITP, and total extra costs of around 11.5% above the purchase price.",
      },
    ],
  },
  hu: {
    body:
      "Rövid, gyakorlati útmutató a Costa del Sol ingatlanvásárláshoz: foglaló, arras szerződés, ügyvédi ellenőrzés, közjegyzői zárás és várható extra költségek.",
    eyebrow: "Vásárlási útmutató",
    metaDescription:
      "Kompakt magyar útmutató használt és újépítésű ingatlan vásárlásához Marbellán és a Costa del Solon: foglaló, arras, ITP, IVA, ügyvéd és közjegyző.",
    title: "Ingatlanvásárlás Spanyolországban, érthetően",
    resaleTitle: "Használt ingatlan vásárlási folyamata",
    newBuildTitle: "Újépítésű és off-plan ingatlanok",
    costsTitle: "Jellemző extra költségek",
    checksTitle: "Ügyvédi ellenőrzések zárás előtt",
    steps: [
      {
        title: "Áralku és megállapodás",
        text: "Miután a vevő kiválasztotta az ingatlant és a felek megállapodtak a végleges vételárban, elindul a foglalási folyamat.",
      },
      {
        title: "Kezdeti depozit",
        text: "Használt ingatlanoknál, főleg 500.000 EUR alatt, gyakori a 6.000 EUR depozit. Ezt a vevő jellemzően a saját ügyvédjének utalja.",
      },
      {
        title: "Contrato de Arras",
        text: "A hivatalos foglalói szerződésben általában a vételár 10%-a szerepel. A korábbi 6.000 EUR ebbe beleszámít.",
      },
      {
        title: "A foglaló jogi jelentősége",
        text: "Ha az eladó lép vissza, általában a foglaló kétszeresét fizeti vissza. Ha a vevő lép vissza indokolatlanul, elveszítheti a foglalót.",
      },
      {
        title: "Kb. 60 napos lezárás",
        text: "A legtöbb használt ingatlannál körülbelül 60 nap áll rendelkezésre a jogi ellenőrzésekre, finanszírozásra és közjegyzői zárásra.",
      },
      {
        title: "Közjegyzői aláírás",
        text: "A végleges adásvételi szerződés közjegyző előtt kerül aláírásra. Ekkor fizetik ki a fennmaradó vételárat, és átszáll a tulajdonjog.",
      },
    ],
    newBuild: [
      "A kezdeti foglaló gyakran 6.000-11.000 EUR között van.",
      "Az építkezés alatt jellemzően kb. 30% kerül kifizetésre több részletben.",
      "A fennmaradó kb. 70% az elkészüléskor, közjegyző előtt fizetendő.",
      "A projekt átadása gyakran 1-2 év, ezért a birtokbaadás is később történik.",
    ],
    costs: [
      { label: "Használt ingatlan illeték Andalúziában", value: "7% ITP" },
      { label: "Ügyvédi díj", value: "kb. 1%" },
      { label: "Közjegyző és földhivatal", value: "kb. 0,5%" },
      { label: "Használt ingatlan teljes extra költség", value: "kb. 8,5%" },
      { label: "Újépítésű ingatlan ÁFA", value: "10% IVA" },
      { label: "Újépítésű teljes extra költség", value: "kb. 11,5%" },
    ],
    checks: [
      "Tulajdoni lap és tulajdonjog vizsgálata",
      "Terhek, tartozások és jelzálog ellenőrzése",
      "Engedélyek és jogi státusz áttekintése",
      "Közüzemi, közösségi és helyi adótartozások ellenőrzése",
    ],
    faqs: [
      {
        question: "Mekkora foglaló szokás használt ingatlannál?",
        answer:
          "Gyakori a 6.000 EUR kezdeti depozit, majd a Contrato de Arras aláírásakor a fizetés általában a vételár 10%-ára egészül ki.",
      },
      {
        question: "Mennyi idő alatt zárul egy használt ingatlan vásárlása?",
        answer:
          "A Costa del Solon a használt ingatlanok vásárlása gyakran körülbelül 60 nap alatt zárul, ha a jogi ellenőrzés és a finanszírozás rendben halad.",
      },
      {
        question: "Mennyi extra költséggel kell számolni használt ingatlannál?",
        answer:
          "Andalúziában használt ingatlannál jellemzően kb. 8,5% extra költséggel érdemes számolni: 7% ITP, kb. 1% ügyvéd és kb. 0,5% közjegyző/földhivatal.",
      },
      {
        question: "Miben más az újépítésű ingatlan vásárlása?",
        answer:
          "Újépítésű ingatlannál nincs 7% ITP, helyette 10% IVA fizetendő, az építkezés alatt gyakori a kb. 30%-os részletfizetés, a teljes extra költség pedig kb. 11,5%.",
      },
    ],
  },
};

function getContent(locale: string) {
  return locale === "hu" ? content.hu : content.en;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: BuyingGuidePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);
  const page = getContent(locale);

  return {
    title: page.title,
    description: page.metaDescription,
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
  const page = getContent(locale);

  return (
    <ContentPageShell
      locale={locale}
      eyebrow={page.eyebrow}
      title={page.title}
      body={page.body}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            {page.resaleTitle}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {page.steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <p className="text-sm font-semibold text-[#9a7a3a]">
                {locale === "hu" ? "Lépés" : "Step"} {index + 1}
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{step.title}</h2>
              <p className="mt-3 text-base leading-7 text-[#4b4740]">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-10 sm:px-8 lg:grid-cols-2">
        <div className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            {page.newBuildTitle}
          </p>
          <ul className="mt-4 grid gap-3 text-base leading-7 text-[#4b4740]">
            {page.newBuild.map((item) => (
              <li key={item} className="rounded-[6px] bg-[#f7f2ea] p-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            {page.checksTitle}
          </p>
          <ul className="mt-4 grid gap-3 text-base leading-7 text-[#4b4740]">
            {page.checks.map((item) => (
              <li key={item} className="rounded-[6px] bg-[#f7f2ea] p-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            {page.costsTitle}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {page.costs.map((cost) => (
            <article
              key={`${cost.label}-${cost.value}`}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <p className="text-3xl font-semibold text-[#0f253d]">
                {cost.value}
              </p>
              <p className="mt-2 text-base leading-7 text-[#4b4740]">
                {cost.label}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            FAQ
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {page.faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <h2 className="text-xl font-semibold text-[#171717]">
                {faq.question}
              </h2>
              <p className="mt-3 text-base leading-7 text-[#4b4740]">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </ContentPageShell>
  );
}

export const revalidate = 300;
