import { Locale, locales } from "../i18n/translations";

export const PRODUCTION_SITE_URL = "https://move2marbella.com";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://move2marbella-pwa.vercel.app"
).replace(/\/$/, "");
export const IS_INDEXING_ENABLED = SITE_URL === PRODUCTION_SITE_URL;

export function getLocalizedPath(locale: Locale, path = "") {
  return `/${locale}${path}`;
}

export function getLanguageAlternates(path = "") {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, getLocalizedPath(locale, path)]),
    ),
    "x-default": getLocalizedPath("en", path),
  };
}

export function getPageRobots() {
  return IS_INDEXING_ENABLED
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large" as const,
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : {
        index: false,
        follow: false,
      };
}
