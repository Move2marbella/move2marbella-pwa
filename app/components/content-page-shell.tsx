import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getGeneralWhatsAppUrl } from "../data/properties";
import { type Locale, getLocaleBasePath } from "../i18n/translations";
import { LanguageSwitcher } from "./language-switcher";
import { MainNav } from "./main-nav";
import { TrackedWhatsAppLink } from "./tracked-whatsapp-link";

type ContentPageShellProps = {
  body: string;
  children: ReactNode;
  eyebrow: string;
  getLanguageHref?: (locale: Locale) => string;
  languagePath?: string;
  locale: Locale;
  title: string;
};

const ctaLabels: Record<
  Locale,
  {
    search: string;
    title: string;
    valuation: string;
    whatsapp: string;
  }
> = {
  de: {
    search: "Immobilien suchen",
    title: "Möchten Sie eine Shortlist statt endlosem Suchen?",
    valuation: "Bewertung",
    whatsapp: "WhatsApp",
  },
  en: {
    search: "Search properties",
    title: "Want a shortlist instead of endless browsing?",
    valuation: "Valuation",
    whatsapp: "WhatsApp",
  },
  es: {
    search: "Buscar propiedades",
    title: "Quieres una shortlist en lugar de buscar sin fin?",
    valuation: "Tasacion",
    whatsapp: "WhatsApp",
  },
  fr: {
    search: "Chercher des biens",
    title: "Vous voulez une shortlist plutot qu'une recherche sans fin?",
    valuation: "Estimation",
    whatsapp: "WhatsApp",
  },
  hu: {
    search: "Ingatlanok keresése",
    title: "Szeretnél végtelen böngészés helyett egy rövid listát?",
    valuation: "Értékbecslés",
    whatsapp: "WhatsApp",
  },
  pl: {
    search: "Szukaj nieruchomości",
    title: "Chcesz shortlist zamiast bezkoncowego przegladania?",
    valuation: "Wycena",
    whatsapp: "WhatsApp",
  },
  ru: {
    search: "Поиск объектов",
    title: "Хотите shortlist вместо бесконечного просмотра?",
    valuation: "Оценка",
    whatsapp: "WhatsApp",
  },
};

export function ContentPageShell({
  body,
  children,
  eyebrow,
  getLanguageHref,
  languagePath,
  locale,
  title,
}: ContentPageShellProps) {
  const basePath = getLocaleBasePath(locale);
  const switcherPath = languagePath ?? "";
  const cta = ctaLabels[locale];

  return (
    <main lang={locale} className="min-h-screen bg-[#f7f2ea] text-[#171717]">
      <section className="relative overflow-hidden bg-[#0f253d] text-white">
        <Image
          src="/move2marbella-panorama.jpg"
          alt="Marbella and the Costa del Sol"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f253d]/50 via-[#0f253d]/80 to-[#0f253d]" />
        <div className="relative mx-auto flex min-h-[54vh] max-w-6xl flex-col px-5 py-5 sm:px-8">
          <header className="flex items-center justify-between gap-4">
            <Link href={basePath} className="leading-tight">
              <Image
                src="/m2m_logo_white_web.png"
                alt="Move2Marbella"
                width={224}
                height={48}
                className="h-auto w-44 sm:w-56"
              />
            </Link>
            <MainNav locale={locale} tone="light" />
          </header>
          <div className="flex flex-1 flex-col justify-end py-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#ba9456]">
              {eyebrow}
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
              {body}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
        <LanguageSwitcher
          currentLocale={locale}
          getHref={getLanguageHref}
          path={switcherPath}
        />
      </section>

      {children}

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-4 rounded-[8px] bg-[#0f253d] p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ba9456]">
              Move2Marbella
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              {cta.title}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={basePath}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#0f253d]"
            >
              {cta.search}
            </Link>
            <Link
              href={`${basePath}/valuation`}
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white"
            >
              {cta.valuation}
            </Link>
            <TrackedWhatsAppLink
              href={getGeneralWhatsAppUrl()}
              source="content_page_cta"
              className="rounded-full bg-[#ba9456] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white"
            >
              {cta.whatsapp}
            </TrackedWhatsAppLink>
          </div>
        </div>
      </section>
    </main>
  );
}
