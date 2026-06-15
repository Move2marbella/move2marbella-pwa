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
    whatsapp: string;
  }
> = {
  de: {
    areas: "Areas",
    buyingGuide: "Kaufratgeber",
    contact: "Kontakt",
    meetMiguel: "Meet Miguel",
    menu: "Menü",
    properties: "Immobilien",
    valuation: "Bewertung",
    whatsapp: "WhatsApp",
  },
  en: {
    areas: "Areas",
    buyingGuide: "Buying Guide",
    contact: "Contact",
    meetMiguel: "Meet Miguel",
    menu: "Menu",
    properties: "Properties",
    valuation: "Valuation",
    whatsapp: "WhatsApp",
  },
  es: {
    areas: "Zonas",
    buyingGuide: "Guía de compra",
    contact: "Contacto",
    meetMiguel: "Meet Miguel",
    menu: "Menú",
    properties: "Propiedades",
    valuation: "Tasación",
    whatsapp: "WhatsApp",
  },
  fr: {
    areas: "Secteurs",
    buyingGuide: "Guide d'achat",
    contact: "Contact",
    meetMiguel: "Meet Miguel",
    menu: "Menu",
    properties: "Biens",
    valuation: "Estimation",
    whatsapp: "WhatsApp",
  },
  hu: {
    areas: "Környékek",
    buyingGuide: "Vásárlási útmutató",
    contact: "Kapcsolat",
    meetMiguel: "Horváth Zsolt",
    menu: "Menü",
    properties: "Ingatlanok",
    valuation: "Értékbecslés",
    whatsapp: "WhatsApp",
  },
  pl: {
    areas: "Lokalizacje",
    buyingGuide: "Przewodnik zakupu",
    contact: "Kontakt",
    meetMiguel: "Meet Miguel",
    menu: "Menu",
    properties: "Nieruchomości",
    valuation: "Wycena",
    whatsapp: "WhatsApp",
  },
  ru: {
    areas: "Районы",
    buyingGuide: "Гид покупателя",
    contact: "Контакт",
    meetMiguel: "Meet Miguel",
    menu: "Меню",
    properties: "Недвижимость",
    valuation: "Оценка",
    whatsapp: "WhatsApp",
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
        className={
          tone === "light"
            ? "rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f253d] shadow-sm"
            : "rounded-full bg-[#0f253d] px-4 py-2 text-sm font-semibold text-white shadow-sm"
        }
      >
        {labels.whatsapp}
      </TrackedWhatsAppLink>
    </nav>
  );
}
