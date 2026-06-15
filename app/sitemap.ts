import type { MetadataRoute } from "next";
import { fetchPropertySitemapEntries } from "./data/properties";
import { locales } from "./i18n/translations";
import { IS_INDEXING_ENABLED, SITE_URL, getLocalizedPath } from "./lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!IS_INDEXING_ENABLED) {
    return [];
  }

  const properties = await fetchPropertySitemapEntries();
  const now = new Date();
  const homePages = locales.map((locale) => ({
    url: `${SITE_URL}${getLocalizedPath(locale)}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: locale === "en" ? 1 : 0.9,
  }));
  const contentPages = [
    ...locales.flatMap((locale) => [
      {
        url: `${SITE_URL}${getLocalizedPath(locale, "/areas")}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.65,
      },
      {
        url: `${SITE_URL}${getLocalizedPath(locale, "/buying-guide")}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.65,
      },
      {
        url: `${SITE_URL}${getLocalizedPath(locale, "/contact")}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.55,
      },
    ]),
    ...locales
      .filter((locale) => locale !== "hu")
      .map((locale) => ({
        url: `${SITE_URL}${getLocalizedPath(locale, "/meet-miguel")}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    {
      url: `${SITE_URL}${getLocalizedPath("hu", "/horvath-zsolt-marbella")}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];
  const propertyPages = properties.map((property) => ({
    url: `${SITE_URL}${getLocalizedPath("en", `/properties/${property.ref}`)}`,
    lastModified: property.modified,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...homePages, ...contentPages, ...propertyPages];
}
