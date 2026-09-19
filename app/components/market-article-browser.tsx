"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

type MarketArticleBrowserProps = {
  articles: Array<{
    bullets: string[];
    category: string;
    slug: string;
    title: string;
  }>;
  basePath: string;
  locale: string;
  readMore: string;
};

const searchCopy: Record<string, { label: string; noResults: string; placeholder: string }> = {
  de: { label: "Artikel durchsuchen", noResults: "Keine passenden Artikel gefunden.", placeholder: "Thema, Region oder Stichwort" },
  en: { label: "Search articles", noResults: "No matching articles found.", placeholder: "Topic, region or keyword" },
  es: { label: "Buscar artículos", noResults: "No se encontraron artículos.", placeholder: "Tema, región o palabra clave" },
  fr: { label: "Rechercher des articles", noResults: "Aucun article correspondant.", placeholder: "Sujet, région ou mot-clé" },
  hu: { label: "Cikkek keresése", noResults: "Nincs a keresésnek megfelelő cikk.", placeholder: "Téma, régió vagy kulcsszó" },
  pl: { label: "Szukaj artykułów", noResults: "Nie znaleziono pasujących artykułów.", placeholder: "Temat, region lub słowo kluczowe" },
  ru: { label: "Поиск статей", noResults: "Подходящие статьи не найдены.", placeholder: "Тема, регион или ключевое слово" },
};

export function MarketArticleBrowser({
  articles,
  basePath,
  locale,
  readMore,
}: MarketArticleBrowserProps) {
  const [query, setQuery] = useState("");
  const copy = searchCopy[locale] ?? searchCopy.en;
  const visibleArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(locale);
    if (!normalizedQuery) return articles;

    return articles.filter((article) =>
      [article.category, article.title, ...article.bullets]
        .join(" ")
        .toLocaleLowerCase(locale)
        .includes(normalizedQuery),
    );
  }, [articles, locale, query]);

  return (
    <>
      <label className="relative block max-w-3xl">
        <span className="sr-only">{copy.label}</span>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9a7a3a]"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.placeholder}
          className="h-14 w-full rounded-[6px] border border-[#cfc5b4] bg-white pl-12 pr-4 text-base text-[#171717] shadow-sm outline-none transition placeholder:text-[#817b71] focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20"
        />
      </label>

      {visibleArticles.length ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {visibleArticles.map((article) => (
            <article
              key={article.slug}
              className="grid rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9a7a3a]">
                {article.category}
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#0f253d]">
                {article.title}
              </h3>
              <ul className="mt-4 grid gap-2 text-base leading-7 text-[#55514a]">
                {article.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ba9456]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`${basePath}/trends/${article.slug}`}
                className="mt-5 inline-flex w-fit rounded-full bg-[#0f253d] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#173b60] focus:outline-none focus:ring-4 focus:ring-[#ba9456]/30"
              >
                {readMore}
              </a>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-[6px] border border-[#d8d0c2] bg-white p-5 text-base text-[#55514a]">
          {copy.noResults}
        </p>
      )}
    </>
  );
}
