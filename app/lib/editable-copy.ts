import editableCopyJson from "../../content/editable-copy.json";
import type { Locale, Translation } from "../i18n/translations";

export type TranslationOverride = Partial<
  Omit<Translation, "searchExamples" | "valuation">
> & {
  valuation?: Partial<Translation["valuation"]>;
};

export type EditableCopy = Partial<Record<Locale, TranslationOverride>>;

export const editableCopy = editableCopyJson as EditableCopy;

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
