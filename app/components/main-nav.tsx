import Link from "next/link";
import { getGeneralWhatsAppUrl } from "../data/properties";
import { type Locale, getLocaleBasePath } from "../i18n/translations";
import { TrackedWhatsAppLink } from "./tracked-whatsapp-link";

type MainNavProps = {
  locale: Locale;
  tone?: "dark" | "light";
};

const navLabels: Record<
  Locale,
  {
    areas: string;
    buyingGuide: string;
    contact: string;
    meetMiguel: string;
    menu: string;
    properties: string;
    valuation: string;
  }
> = {
  de: {
    areas: "Gebiete",
    buyingGuide: "Kaufratgeber",
    contact: "Kontakt",
    meetMiguel: "Miguel Zsolt",
    menu: "MENÜ",
    properties: "Immobilien",
    valuation: "Bewertung",
  },
  en: {
    areas: "Areas",
    buyingGuide: "Buying Guide",
    contact: "Contact",
    meetMiguel: "Meet Miguel Zsolt",
    menu: "MENU",
    properties: "Properties",
    valuation: "Valuation",
  },
  es: {
    areas: "Zonas",
    buyingGuide: "Guía de compra",
    contact: "Contacto",
    meetMiguel: "Miguel Zsolt",
    menu: "MENÚ",
    properties: "Propiedades",
    valuation: "Tasación",
  },
  fr: {
    areas: "Secteurs",
    buyingGuide: "Guide d'achat",
    contact: "Contact",
    meetMiguel: "Miguel Zsolt",
    menu: "MENU",
    properties: "Biens",
    valuation: "Estimation",
  },
  hu: {
    areas: "Környékek",
    buyingGuide: "Vásárlási útmutató",
    contact: "Kapcsolat",
    meetMiguel: "Horváth Zsolt",
    menu: "MENÜ",
    properties: "Ingatlanok",
    valuation: "Értékbecslés",
  },
  pl: {
    areas: "Lokalizacje",
    buyingGuide: "Przewodnik zakupu",
    contact: "Kontakt",
    meetMiguel: "Miguel Zsolt",
    menu: "MENU",
    properties: "Nieruchomości",
    valuation: "Wycena",
  },
  ru: {
    areas: "Районы",
    buyingGuide: "Гид покупателя",
    contact: "Контакт",
    meetMiguel: "Miguel Zsolt",
    menu: "МЕНЮ",
    properties: "Недвижимость",
    valuation: "Оценка",
  },
};

function getMeetMiguelHref(locale: Locale) {
  return locale === "hu"
    ? "/hu/horvath-zsolt-marbella"
    : `${getLocaleBasePath(locale)}/meet-miguel`;
}

export function MainNav({ locale, tone = "dark" }: MainNavProps) {
  const basePath = getLocaleBasePath(locale);
  const labels = navLabels[locale];
  const linkClass =
    tone === "light"
      ? "rounded-full px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
      : "rounded-full px-3 py-2 text-sm font-semibold text-[#0f253d] hover:bg-[#f2eadc]";
  const panelClass =
    tone === "light"
      ? "mt-2 grid gap-1 rounded-[8px] bg-[#102b46] p-2 shadow-xl ring-1 ring-white/12"
      : "mt-2 grid gap-1 rounded-[8px] bg-white p-2 shadow-xl ring-1 ring-black/8";
  const menuButtonClass =
    tone === "light"
      ? "cursor-pointer rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white"
      : "cursor-pointer rounded-full border border-[#d7d2c4] px-4 py-2 text-sm font-semibold text-[#0f253d]";

  const navItems = [
    { href: basePath, label: labels.properties },
    { href: `${basePath}/valuation`, label: labels.valuation },
    { href: `${basePath}/areas`, label: labels.areas },
    { href: `${basePath}/buying-guide`, label: labels.buyingGuide },
    { href: getMeetMiguelHref(locale), label: labels.meetMiguel },
    { href: `${basePath}/contact`, label: labels.contact },
  ];

  return (
    <nav aria-label="Main navigation" className="flex items-center gap-2">
      <div className="hidden flex-wrap items-center justify-end gap-1 xl:flex">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={linkClass}>
            {item.label}
          </Link>
        ))}
      </div>
      <details className="relative xl:hidden">
        <summary className={menuButtonClass}>{labels.menu}</summary>
        <div className="absolute right-0 z-50 w-64">
          <div className={panelClass}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </details>
      <TrackedWhatsAppLink
        href={getGeneralWhatsAppUrl()}
        source="main_nav"
        aria-label="WhatsApp"
        title="WhatsApp"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25d366] text-white shadow-sm"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d="M16.01 3.2A12.7 12.7 0 0 0 5.2 22.55L3.6 28.8l6.4-1.56A12.7 12.7 0 1 0 16.01 3.2Zm0 2.55a10.15 10.15 0 0 1 8.56 15.6 10.15 10.15 0 0 1-13.96 3.35l-.44-.26-3.02.74.76-2.94-.28-.46A10.15 10.15 0 0 1 16.01 5.75Zm-4.2 4.55c-.28 0-.72.1-1.1.52-.38.42-1.45 1.42-1.45 3.47s1.49 4.03 1.7 4.3c.2.28 2.88 4.6 7.1 6.25 3.5 1.37 4.22 1.1 4.98 1.03.76-.07 2.45-1 2.8-1.97.35-.97.35-1.8.24-1.97-.1-.18-.38-.28-.8-.49-.42-.2-2.45-1.2-2.83-1.34-.38-.14-.66-.2-.94.2-.28.42-1.08 1.34-1.32 1.62-.24.28-.49.31-.9.1-.42-.2-1.76-.65-3.36-2.07-1.24-1.1-2.08-2.47-2.32-2.88-.24-.42-.03-.64.18-.84.18-.18.42-.49.63-.73.2-.24.28-.42.42-.7.14-.28.07-.52-.03-.73-.1-.2-.94-2.25-1.28-3.08-.34-.8-.68-.7-.94-.72-.24-.02-.52-.02-.8-.02Z" />
        </svg>
      </TrackedWhatsAppLink>
    </nav>
  );
}
