"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getGeneralWhatsAppUrl } from "../data/properties";
import { locales, type Locale, getLocaleBasePath } from "../i18n/translations";
import { TrackedWhatsAppLink } from "./tracked-whatsapp-link";

const labels: Record<
  Locale,
  {
    properties: string;
    valuation: string;
    whatsapp: string;
  }
> = {
  de: {
    properties: "Immobilien",
    valuation: "Bewertung",
    whatsapp: "WhatsApp",
  },
  en: {
    properties: "Properties",
    valuation: "Valuation",
    whatsapp: "WhatsApp",
  },
  es: {
    properties: "Propiedades",
    valuation: "Tasación",
    whatsapp: "WhatsApp",
  },
  fr: {
    properties: "Biens",
    valuation: "Estimation",
    whatsapp: "WhatsApp",
  },
  hu: {
    properties: "Ingatlanok",
    valuation: "Értékbecslés",
    whatsapp: "WhatsApp",
  },
  pl: {
    properties: "Nieruchomości",
    valuation: "Wycena",
    whatsapp: "WhatsApp",
  },
  ru: {
    properties: "Объекты",
    valuation: "Оценка",
    whatsapp: "WhatsApp",
  },
};

function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];

  return locales.includes(segment as Locale) ? (segment as Locale) : "en";
}

function HouseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M3.5 11.2 12 4l8.5 7.2v8.3a.8.8 0 0 1-.8.8h-5.1v-5.6H9.4v5.6H4.3a.8.8 0 0 1-.8-.8z"
        fill="currentColor"
      />
    </svg>
  );
}

function ValuationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M5 19.5h14v1.7H5zM6.4 10.6h2.4v6.7H6.4zm4.4-5.1h2.4v11.8h-2.4zm4.4 8h2.4v3.8h-2.4z"
        fill="currentColor"
      />
      <path
        d="M6.3 8.1 11.9 3l5.8 5.1-1.1 1.2-4.7-4.1-4.5 4.1z"
        fill="currentColor"
        opacity="0.72"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="h-7 w-7">
      <path
        d="M16.01 3.2A12.7 12.7 0 0 0 5.2 22.55L3.6 28.8l6.4-1.56A12.7 12.7 0 1 0 16.01 3.2Zm0 2.55a10.15 10.15 0 0 1 8.56 15.6 10.15 10.15 0 0 1-13.96 3.35l-.44-.26-3.02.74.76-2.94-.28-.46A10.15 10.15 0 0 1 16.01 5.75Zm-4.2 4.55c-.28 0-.72.1-1.1.52-.38.42-1.45 1.42-1.45 3.47s1.49 4.03 1.7 4.3c.2.28 2.88 4.6 7.1 6.25 3.5 1.37 4.22 1.1 4.98 1.03.76-.07 2.45-1 2.8-1.97.35-.97.35-1.8.24-1.97-.1-.18-.38-.28-.8-.49-.42-.2-2.45-1.2-2.83-1.34-.38-.14-.66-.2-.94.2-.28.42-1.08 1.34-1.32 1.62-.24.28-.49.31-.9.1-.42-.2-1.76-.65-3.36-2.07-1.24-1.1-2.08-2.47-2.32-2.88-.24-.42-.03-.64.18-.84.18-.18.42-.49.63-.73.2-.24.28-.42.42-.7.14-.28.07-.52-.03-.73-.1-.2-.94-2.25-1.28-3.08-.34-.8-.68-.7-.94-.72-.24-.02-.52-.02-.8-.02Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MobileActionBar() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const basePath = getLocaleBasePath(locale);
  const copy = labels[locale];
  const isValuation = pathname === "/valuation" || pathname.startsWith(`${basePath}/valuation`);
  const isProperties =
    pathname === "/" ||
    pathname === basePath ||
    pathname.startsWith(`${basePath}/properties`) ||
    pathname.startsWith("/properties");

  const linkBase =
    "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-[8px] px-2 py-2 text-[11px] font-semibold leading-none transition";
  const activeClass = "bg-[#0f253d] text-white";
  const inactiveClass = "text-[#0f253d] hover:bg-[#f2eadc]";

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-[#ded4c2] bg-[#fbf8f2]/95 px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-[0_-10px_30px_rgba(15,37,61,0.14)] backdrop-blur xl:hidden">
      <nav
        aria-label="Primary mobile actions"
        className="mx-auto flex max-w-md items-center gap-2"
      >
        <Link
          href={basePath}
          aria-current={isProperties ? "page" : undefined}
          className={`${linkBase} ${isProperties ? activeClass : inactiveClass}`}
        >
          <HouseIcon />
          <span className="truncate">{copy.properties}</span>
        </Link>
        <Link
          href={`${basePath}/valuation`}
          aria-current={isValuation ? "page" : undefined}
          className={`${linkBase} ${isValuation ? activeClass : inactiveClass}`}
        >
          <ValuationIcon />
          <span className="truncate">{copy.valuation}</span>
        </Link>
        <TrackedWhatsAppLink
          href={getGeneralWhatsAppUrl()}
          source="mobile_action_bar"
          aria-label={copy.whatsapp}
          className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-[8px] bg-[#25d366] px-2 py-2 text-[11px] font-semibold leading-none text-white transition hover:bg-[#1fb85a]"
        >
          <WhatsAppIcon />
          <span className="truncate">{copy.whatsapp}</span>
        </TrackedWhatsAppLink>
      </nav>
    </div>
  );
}
