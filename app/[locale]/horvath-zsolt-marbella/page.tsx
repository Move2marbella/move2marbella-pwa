import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { JsonLd } from "../../components/json-ld";
import { LanguageSwitcher } from "../../components/language-switcher";
import { MainNav } from "../../components/main-nav";
import { TrackedWhatsAppLink } from "../../components/tracked-whatsapp-link";
import { getGeneralWhatsAppUrl } from "../../data/properties";
import { getLocale, type Locale } from "../../i18n/translations";
import { SITE_URL, getPageRobots } from "../../lib/seo";
import { getEditablePageContent } from "../../lib/editable-copy";

type HorvathZsoltPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const pagePath = "/hu/horvath-zsolt-marbella";
export const horvathZsoltContent = {
  hu: {
    metaDescription: "Ismerd meg Horváth Zsoltot, a Move2Marbella alapítóját és magyar nyelvű marbellai ingatlan tanácsadót a Costa del Solon.",
    heroAlt: "Marbella és a Costa del Sol panorámája",
    heroEyebrow: "Magyar ingatlan tanácsadó Marbellán",
    heroTitle: "Horváth Zsolt Marbella ingatlan tanácsadó",
    heroBody: "A Move2Marbella alapítójaként abban segítek, hogy ne csak szép ingatlanokat nézz meg, hanem jó döntést hozz a Costa del Solon: megfelelő környék, reális ár, tiszta folyamat és hosszú távon is védhető választás.",
    stats: [
      { value: "2010 óta", label: "helyi tapasztalat a Costa del Solon" },
      { value: "orvos & közgazdász", label: "orvosi és közgazdasági háttér" },
      { value: "HU / EN / ES", label: "magyar nyelvű vásárlói támogatás" },
    ],
    profileAlt: "Horváth Zsolt Marbella ingatlan tanácsadó",
    profileCaption: "Zsolt Miguel Horvath dr.",
    sections: [
      {
        eyebrow: "Miért fontos",
        title: "A bizalom itt nem extra, hanem alap",
        body: [
          "Külföldön ingatlant venni nem egyszerű keresési feladat. A vevőnek egyszerre kell értenie a környékeket, az árakat, a jogi folyamatot, a fenntartási költségeket, a bérbeadási realitást és azt is, hogy egy adott ingatlan mennyire lesz jó döntés néhány év múlva.",
          "Sokan YouTube-on, TikTokon vagy személyes ajánláson keresztül találkoznak velem először. Ezért fontos, hogy az appban is világos legyen, ki áll a Move2Marbella mögött, és milyen szemlélettel dolgozunk.",
        ],
      },
      {
        eyebrow: "Szemlélet",
        title: "Nem listákat mutatunk, döntést segítünk",
        body: [
          "A jó ingatlan nem csak fotókon néz ki jól. Számít a mikrolokáció, a zaj, a közösségi díj, a közlekedés, a vevői kereslet, a jövőbeli likviditás és az is, hogy az adott ingatlan illik-e a célodhoz.",
          "A Move2Marbella tanácsadói megközelítése ezért nem a gyors nyomásgyakorlásról szól. A cél az, hogy legyen egy rövid, átlátható, szakmailag szűrt listád, és tudd, miért érdemes vagy miért nem érdemes továbbmenni egy adott opcióval.",
        ],
      },
    ],
    servicesEyebrow: "Miben segítek",
    servicesTitle: "Magyar vevőknek a Costa del Solon",
    services: [
      "Marbella, Estepona, Benahavís és Nueva Andalucía környékválasztás",
      "vételár, költségek és fenntartási terhek reális áttekintése",
      "rövidlista készítése életmód vagy befektetési cél alapján",
      "ügyvéd, adótanácsadó, bank és jelzálog folyamat koordinációja",
      "resale és bérbeadási logika ellenőrzése",
      "magyar nyelvű magyarázat a spanyol vásárlási folyamatban",
    ],
    faqEyebrow: "Gyakori kérdések",
    faqTitle: "Rövid válaszok magyar vevőknek",
    faqs: [
      { question: "Ki Horváth Zsolt Marbella ingatlanpiacán?", answer: "Horváth Zsolt, más néven Zsolt Miguel Horváth, a Move2Marbella alapítója és magyar nyelvű ingatlan tanácsadó a Costa del Solon." },
      { question: "Miben segít a Move2Marbella magyar vevőknek?", answer: "Környékválasztásban, ingatlanszűrésben, vételi költségek értelmezésében, ügyvédi és banki folyamatok koordinálásában, valamint a vásárlási döntés szakmai előkészítésében." },
      { question: "Mely területekre fókuszál Horváth Zsolt?", answer: "Elsősorban Marbella, Estepona, Benahavís, Nueva Andalucía, Golden Mile és a nyugati Costa del Sol kiemelt környékei tartoznak a fókuszterülethez." },
      { question: "Csak magyar vevőkkel dolgozik a Move2Marbella?", answer: "Nem. A Move2Marbella nemzetközi vevőket is támogat, de a magyar nyelvű tanácsadás fontos előny azoknak, akik Spanyolországban magyarul szeretnének biztonságosabban dönteni." },
    ],
    ctaEyebrow: "Következő lépés",
    ctaTitle: "Szeretnéd tudni, melyik környék vagy ingatlan illik hozzád?",
    ctaBody: "Küldd el, mit keresel, vagy nézd meg az aktív ajánlatokat és az értékbecslő eszközt. Innen már strukturáltan tudunk továbbmenni.",
    whatsappCta: "Írok WhatsAppon",
    propertiesCta: "Ingatlanok keresése",
    valuationCta: "Értékbecslés",
  },
};

export function generateStaticParams() {
  return [{ locale: "hu" }];
}

export async function generateMetadata({
  params,
}: HorvathZsoltPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);

  if (locale !== "hu") {
    return {};
  }

  const page = getEditablePageContent("horvathZsolt", "hu", horvathZsoltContent.hu);
  const title = page.heroTitle;
  const description = page.metaDescription;

  return {
    title,
    description,
    alternates: {
      canonical: pagePath,
      languages: {
        hu: pagePath,
        "x-default": pagePath,
      },
    },
    openGraph: {
      title,
      description,
      url: pagePath,
      type: "profile",
      images: [
        {
          url: "/move2marbella-panorama.jpg",
          width: 1200,
          height: 675,
          alt: page.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/move2marbella-panorama.jpg"],
    },
    robots: getPageRobots(),
  };
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[8px] border border-white/14 bg-white/10 p-4">
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm leading-5 text-white/72">{label}</p>
    </div>
  );
}

function Section({
  children,
  eyebrow,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[320px_1fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-[#171717]">
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-base leading-8 text-[#4b4740]">
        {children}
      </div>
    </section>
  );
}

function getMeetMiguelHref(locale: Locale) {
  return locale === "hu" ? pagePath : `/${locale}/meet-miguel`;
}

export default async function HorvathZsoltMarbellaPage({
  params,
}: HorvathZsoltPageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = getLocale(localeParam);

  if (locale !== "hu") {
    notFound();
  }

  const page = getEditablePageContent("horvathZsolt", "hu", horvathZsoltContent.hu);

  return (
    <main lang="hu" className="min-h-screen bg-[#f7f2ea] text-[#171717]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Dr. Horváth Zsolt Mihály",
          alternateName: ["Zsolt Miguel Horváth", "Miguel Horvath"],
          jobTitle: "Marbella ingatlan tanácsadó",
          worksFor: {
            "@type": "RealEstateAgent",
            name: "Move2Marbella",
            url: SITE_URL,
          },
          url: `${SITE_URL}${pagePath}`,
          knowsAbout: [
            "Marbella ingatlanpiac",
            "Costa del Sol ingatlanvásárlás",
            "külföldi vásárlók támogatása Spanyolországban",
          ],
          areaServed: ["Marbella", "Estepona", "Benahavís", "Costa del Sol"],
        }}
      />
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

      <section className="relative overflow-hidden bg-[#0f253d] text-white">
        <Image
          src="/move2marbella-panorama.jpg"
          alt={page.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-34"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f253d]/48 via-[#0f253d]/78 to-[#0f253d]" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col px-5 py-5 sm:px-8">
          <header className="flex items-center justify-between gap-4">
            <Link href="/hu" className="leading-tight">
              <Image
                src="/m2m_logo_white_web.png"
                alt="Move2Marbella"
                width={224}
                height={48}
                className="h-auto w-44 sm:w-56"
              />
            </Link>
            <MainNav locale="hu" tone="light" />
          </header>

          <div className="flex flex-1 flex-col justify-end gap-7 py-12">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#ba9456]">
                {page.heroEyebrow}
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
                {page.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
                {page.heroBody}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {page.stats.map((stat) => <Stat key={stat.label} {...stat} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
        <LanguageSwitcher currentLocale="hu" getHref={getMeetMiguelHref} />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
        <figure className="overflow-hidden rounded-[8px] bg-white shadow-sm ring-1 ring-black/5">
          <Image
            src="/zsolt-miguel-horvath.webp"
            alt={page.profileAlt}
            width={1536}
            height={1024}
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="aspect-[3/2] w-full object-cover"
          />
          <figcaption className="border-t border-[#ece2d3] px-5 py-4 text-base font-semibold text-[#0f253d]">
            {page.profileCaption}
          </figcaption>
        </figure>
      </section>

      {page.sections.map((section) => (
        <Section key={section.title} eyebrow={section.eyebrow} title={section.title}>
          {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </Section>
      ))}

      <Section eyebrow={page.servicesEyebrow} title={page.servicesTitle}>
        <div className="grid gap-3 sm:grid-cols-2">
          {page.services.map((item) => (
            <div
              key={item}
              className="rounded-[8px] bg-white p-4 font-medium text-[#242424] shadow-sm ring-1 ring-black/5"
            >
              {item}
            </div>
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            {page.faqEyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[#171717]">
            {page.faqTitle}
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {page.faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <h3 className="text-lg font-semibold text-[#171717]">
                {faq.question}
              </h3>
              <p className="mt-3 text-base leading-7 text-[#4b4740]">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-4 rounded-[8px] bg-[#0f253d] p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ba9456]">
              {page.ctaEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              {page.ctaTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/76">
              {page.ctaBody}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <TrackedWhatsAppLink
              href={getGeneralWhatsAppUrl()}
              source="horvath_zsolt_cta"
              className="rounded-full bg-[#ba9456] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white"
            >
              {page.whatsappCta}
            </TrackedWhatsAppLink>
            <Link
              href="/hu"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#0f253d]"
            >
              {page.propertiesCta}
            </Link>
            <Link
              href="/hu/valuation"
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white"
            >
              {page.valuationCta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export const revalidate = 300;
