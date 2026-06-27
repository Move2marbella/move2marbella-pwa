"use client";

import { ExternalLink, LogOut, RefreshCw, Save, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Locale } from "../i18n/translations";
import type { TranslationOverride } from "../lib/editable-copy";

type EditableSnapshot = Record<Locale, TranslationOverride>;

type ContentResponse = {
  branch: string;
  canPublish: boolean;
  content: EditableSnapshot;
  repository: string;
  source: "github" | "local";
};

const localeOptions: Array<{ code: Locale; label: string }> = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "ru", label: "Русский" },
  { code: "pl", label: "Polski" },
  { code: "hu", label: "Magyar" },
];

function humanizeKey(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (character) => character.toUpperCase());
}

function getRows(value: string) {
  if (value.length > 240) return 7;
  if (value.length > 120) return 5;
  if (value.length > 60) return 3;
  return 2;
}

async function fetchContent() {
  const response = await fetch("/api/admin/content", { cache: "no-store" });
  const body = (await response.json()) as ContentResponse & { error?: string };

  if (!response.ok) {
    throw new Error(body.error || "Could not load content");
  }

  return body;
}

export function AdminEditor() {
  const [data, setData] = useState<ContentResponse | null>(null);
  const [original, setOriginal] = useState("");
  const [locale, setLocale] = useState<Locale>("en");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadContent = useCallback(async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const body = await fetchContent();

      setData(body);
      setOriginal(JSON.stringify(body.content));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load content");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    void fetchContent()
      .then((body) => {
        if (cancelled) return;
        setData(body);
        setOriginal(JSON.stringify(body.content));
      })
      .catch((loadError: unknown) => {
        if (cancelled) return;
        setError(loadError instanceof Error ? loadError.message : "Could not load content");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const dirty = Boolean(data && JSON.stringify(data.content) !== original);
  const normalizedQuery = query.trim().toLowerCase();
  const selectedContent = data?.content[locale];
  const generalFields = useMemo(
    () =>
      Object.entries(selectedContent ?? {})
        .filter(([key, value]) => key !== "valuation" && typeof value === "string")
        .filter(([key, value]) =>
          normalizedQuery
            ? `${key} ${value}`.toLowerCase().includes(normalizedQuery)
            : true,
        ) as Array<[string, string]>,
    [normalizedQuery, selectedContent],
  );
  const valuationFields = useMemo(
    () =>
      Object.entries(selectedContent?.valuation ?? {}).filter(([key, value]) =>
        normalizedQuery
          ? `${key} ${value}`.toLowerCase().includes(normalizedQuery)
          : true,
      ) as Array<[string, string]>,
    [normalizedQuery, selectedContent],
  );

  function updateField(section: "general" | "valuation", key: string, value: string) {
    setData((current) => {
      if (!current) return current;

      const currentLocale = current.content[locale] ?? {};
      const nextLocale =
        section === "valuation"
          ? {
              ...currentLocale,
              valuation: { ...currentLocale.valuation, [key]: value },
            }
          : { ...currentLocale, [key]: value };

      return {
        ...current,
        content: { ...current.content, [locale]: nextLocale },
      };
    });
    setMessage("");
  }

  async function publish() {
    if (!data || !dirty || !data.canPublish) return;

    setPublishing(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/admin/content", {
        body: JSON.stringify({ content: data.content }),
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      });
      const body = (await response.json()) as {
        commitSha?: string;
        commitUrl?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(body.error || "Publish failed");
      }

      setOriginal(JSON.stringify(data.content));
      setMessage(
        `Published${body.commitSha ? ` (${body.commitSha.slice(0, 7)})` : ""}. Vercel deployment has started.`,
      );
    } catch (publishError) {
      setError(publishError instanceof Error ? publishError.message : "Publish failed");
    } finally {
      setPublishing(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f3f0e9] text-[#172033]">
      <header className="border-b border-[#d8d2c7] bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#aa8447]">
              Move2Marbella
            </p>
            <h1 className="mt-1 text-xl font-semibold text-[#0f253d]">Content Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/en"
              target="_blank"
              className="inline-flex h-10 items-center gap-2 rounded-[6px] border border-[#ccd2d8] bg-white px-3 text-sm font-semibold text-[#0f253d]"
            >
              <ExternalLink className="h-4 w-4" />
              Open app
            </a>
            <form action="/api/admin/logout" method="post">
              <button className="inline-flex h-10 items-center gap-2 rounded-[6px] bg-[#0f253d] px-3 text-sm font-semibold text-white">
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-0 px-5 py-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
        <aside className="border-b border-[#d8d2c7] pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6f6a61]">
            Languages
          </p>
          <nav className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
            {localeOptions.map((option) => (
              <button
                key={option.code}
                type="button"
                onClick={() => setLocale(option.code)}
                className={
                  locale === option.code
                    ? "flex h-10 items-center justify-between rounded-[6px] bg-[#0f253d] px-3 text-left text-sm font-semibold text-white"
                    : "flex h-10 items-center justify-between rounded-[6px] px-3 text-left text-sm font-semibold text-[#334155] hover:bg-white"
                }
              >
                <span>{option.label}</span>
                <span className="uppercase opacity-60">{option.code}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 pt-6 lg:pl-8 lg:pt-0">
          <div className="sticky top-0 z-10 border-b border-[#d8d2c7] bg-[#f3f0e9]/95 pb-4 backdrop-blur">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#6f6a61]">
                  {data?.repository ?? "Move2marbella/move2marbella-pwa"} · {data?.branch ?? "main"}
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-[#0f253d]">
                  {localeOptions.find((option) => option.code === locale)?.label} copy
                </h2>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="relative min-w-0 sm:w-80">
                  <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#6f6a61]" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search field or text"
                    className="h-10 w-full rounded-[6px] border border-[#ccd2d8] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#ba9456]"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => void loadContent()}
                  disabled={loading || publishing}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-[6px] border border-[#ccd2d8] bg-white px-3 text-sm font-semibold text-[#0f253d] disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                  Reload
                </button>
                <button
                  type="button"
                  onClick={() => void publish()}
                  disabled={!dirty || publishing || !data?.canPublish}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-[6px] bg-[#ba9456] px-4 text-sm font-bold uppercase tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <Save className="h-4 w-4" />
                  {publishing ? "Publishing..." : "Save & Publish"}
                </button>
              </div>
            </div>
            {dirty ? <p className="mt-2 text-sm font-semibold text-[#9a5b22]">Unsaved changes</p> : null}
            {message ? <p className="mt-2 text-sm font-semibold text-[#23734d]">{message}</p> : null}
            {error ? <p className="mt-2 text-sm font-semibold text-[#a2362d]">{error}</p> : null}
            {data && !data.canPublish ? (
              <p className="mt-2 text-sm font-semibold text-[#a2362d]">
                Read-only mode: add GITHUB_CONTENT_TOKEN in Vercel to enable publishing.
              </p>
            ) : null}
          </div>

          {loading ? (
            <div className="py-20 text-center text-sm font-semibold text-[#6f6a61]">
              Loading content...
            </div>
          ) : (
            <div className="space-y-8 py-6">
              <EditorSection
                title="General interface"
                fields={generalFields}
                onChange={(key, value) => updateField("general", key, value)}
              />
              <EditorSection
                title="Valuation"
                fields={valuationFields}
                onChange={(key, value) => updateField("valuation", key, value)}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function EditorSection({
  fields,
  onChange,
  title,
}: {
  fields: Array<[string, string]>;
  onChange: (key: string, value: string) => void;
  title: string;
}) {
  if (fields.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-between border-b border-[#d8d2c7] pb-2">
        <h3 className="text-lg font-semibold text-[#0f253d]">{title}</h3>
        <span className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
          {fields.length} fields
        </span>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        {fields.map(([key, value]) => (
          <label key={key} className="grid content-start gap-2 rounded-[8px] border border-[#ddd7cc] bg-white p-4">
            <span className="text-sm font-semibold text-[#0f253d]">{humanizeKey(key)}</span>
            <span className="font-mono text-[11px] text-[#8a857c]">{key}</span>
            <textarea
              value={value}
              rows={getRows(value)}
              onChange={(event) => onChange(key, event.target.value)}
              className="min-h-20 resize-y rounded-[6px] border border-[#d7d2c4] bg-[#fffefa] px-3 py-2 text-sm leading-6 outline-none focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/15"
            />
          </label>
        ))}
      </div>
    </section>
  );
}
