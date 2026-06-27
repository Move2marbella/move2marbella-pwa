import Link from "next/link";
import { getLocaleBasePath, locales, type Locale } from "../i18n/translations";

type LanguageSwitcherProps = {
  className?: string;
  currentLocale: Locale;
  getHref?: (locale: Locale) => string;
  path?: string;
  query?: Record<string, string | string[] | undefined>;
};

function buildQueryString(query?: LanguageSwitcherProps["query"]) {
  if (!query) {
    return "";
  }

  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
      return;
    }

    if (value) {
      params.set(key, value);
    }
  });

  const queryString = params.toString();

  return queryString ? `?${queryString}` : "";
}

export function LanguageSwitcher({
  className = "",
  currentLocale,
  getHref,
  path = "",
  query,
}: LanguageSwitcherProps) {
  const queryString = buildQueryString(query);

  return (
    <nav
      aria-label="Language selector"
      className={`flex flex-wrap gap-2 pb-1 ${className}`}
    >
      {locales.map((locale) => {
        const href =
          getHref?.(locale) ??
          `${getLocaleBasePath(locale)}${path}${queryString}`;
        const isActive = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={href}
            aria-current={isActive ? "page" : undefined}
            aria-label={locale.toUpperCase()}
            className={`shrink-0 rounded-full border px-3 py-2 text-sm font-semibold ${
              isActive
                ? "border-[#ba9456] bg-[#ba9456] text-white"
                : "border-[#ded4c2] bg-white text-[#242424]"
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
