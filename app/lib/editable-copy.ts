import editableCopyJson from "../../content/editable-copy.json";
import type { Locale, Translation } from "../i18n/translations";

export const editablePageKeys = [
  "areas",
  "buyingGuide",
  "contact",
  "meetMiguel",
  "decisionGuide",
  "horvathZsolt",
] as const;

export type EditablePageKey = (typeof editablePageKeys)[number];

export type TranslationOverride = Partial<
  Omit<Translation, "searchExamples" | "valuation">
> & {
  valuation?: Partial<Translation["valuation"]>;
};

export type EditablePageOverrides = Partial<
  Record<EditablePageKey, Partial<Record<Locale, unknown>>>
>;

export type EditableCopy = {
  pages?: EditablePageOverrides;
  translations?: Partial<Record<Locale, TranslationOverride>>;
};

function normalizeEditableCopy(value: unknown): EditableCopy {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const document = value as Record<string, unknown>;

  if ("translations" in document || "pages" in document) {
    return document as EditableCopy;
  }

  // Backwards compatibility with the original locale-at-root format.
  return { translations: document as Partial<Record<Locale, TranslationOverride>> };
}

export const editableCopy = normalizeEditableCopy(editableCopyJson);

export function mergeTranslation(
  base: Translation,
  override?: TranslationOverride,
): Translation {
  if (!override) {
    return base;
  }

  return {
    ...base,
    ...override,
    searchExamples: base.searchExamples,
    valuation: {
      ...base.valuation,
      ...override.valuation,
    },
  };
}

export function mergeEditableContent<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) {
    return base;
  }

  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T;
  }

  if (typeof base !== "object" || base === null) {
    return (typeof override === typeof base ? override : base) as T;
  }

  if (typeof override !== "object" || Array.isArray(override)) {
    return base;
  }

  const source = override as Record<string, unknown>;
  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };

  for (const [key, value] of Object.entries(base as Record<string, unknown>)) {
    result[key] = mergeEditableContent(value, source[key]);
  }

  return result as T;
}

export function getEditablePageContent<T>(
  page: EditablePageKey,
  locale: Locale,
  base: T,
): T {
  return mergeEditableContent(base, editableCopy.pages?.[page]?.[locale]);
}
