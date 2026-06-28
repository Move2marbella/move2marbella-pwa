import "server-only";

import localEditableCopy from "../../content/editable-copy.json";
import { areaContent } from "../[locale]/areas/page";
import { buyingGuideContent } from "../[locale]/buying-guide/page";
import { contactContent } from "../[locale]/contact/page";
import { meetContent } from "../[locale]/meet-miguel/page";
import { horvathZsoltContent } from "../[locale]/horvath-zsolt-marbella/page";
import { decisionGuideCopy } from "../data/decision-guide";
import {
  locales,
  translations,
  type Locale,
} from "../i18n/translations";
import {
  editablePageKeys,
  mergeEditableContent,
  type EditableCopy,
  type EditablePageKey,
  type TranslationOverride,
} from "./editable-copy";

const DEFAULT_REPOSITORY = "Move2marbella/move2marbella-pwa";
const DEFAULT_BRANCH = "main";
const DEFAULT_CONTENT_PATH = "content/editable-copy.json";
const MAX_FIELD_LENGTH = 6000;

type GitHubFileResponse = {
  content?: string;
  encoding?: string;
  sha?: string;
};

export type EditableContentSnapshot = {
  pages: Record<EditablePageKey, Partial<Record<Locale, unknown>>>;
  translations: Record<Locale, TranslationOverride>;
};

const pageDefaults: Record<
  EditablePageKey,
  Partial<Record<Locale, unknown>>
> = {
  areas: areaContent,
  buyingGuide: buyingGuideContent,
  contact: contactContent,
  decisionGuide: decisionGuideCopy,
  horvathZsolt: horvathZsoltContent,
  meetMiguel: meetContent,
};

function getGitHubConfig() {
  return {
    branch: process.env.GITHUB_CONTENT_BRANCH?.trim() || DEFAULT_BRANCH,
    path: process.env.GITHUB_CONTENT_PATH?.trim() || DEFAULT_CONTENT_PATH,
    repository: process.env.GITHUB_CONTENT_REPO?.trim() || DEFAULT_REPOSITORY,
    token: process.env.GITHUB_CONTENT_TOKEN?.trim() || "",
  };
}

function getGitHubHeaders(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function getGitHubFileUrl(repository: string, path: string, branch: string) {
  return `https://api.github.com/repos/${repository}/contents/${path}?ref=${encodeURIComponent(branch)}`;
}

function normalizeDocument(value: unknown): EditableCopy {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const input = value as Record<string, unknown>;

  if ("translations" in input || "pages" in input) {
    return input as EditableCopy;
  }

  return { translations: input as Partial<Record<Locale, TranslationOverride>> };
}

function parseGitHubContent(file: GitHubFileResponse): EditableCopy {
  if (!file.content || file.encoding !== "base64") {
    return {};
  }

  return normalizeDocument(
    JSON.parse(Buffer.from(file.content, "base64").toString("utf8")),
  );
}

function getTranslationSnapshot(overrides: EditableCopy) {
  return Object.fromEntries(
    locales.map((locale) => {
      const base = translations[locale];
      const override = overrides.translations?.[locale];

      return [
        locale,
        {
          ...Object.fromEntries(
            Object.entries(base).filter(([, value]) => typeof value === "string"),
          ),
          ...Object.fromEntries(
            Object.entries(override ?? {}).filter(
              ([key, value]) => key !== "valuation" && typeof value === "string",
            ),
          ),
          valuation: {
            ...base.valuation,
            ...override?.valuation,
          },
        },
      ];
    }),
  ) as Record<Locale, TranslationOverride>;
}

export function getEditableSnapshot(overrides: EditableCopy): EditableContentSnapshot {
  const pages = Object.fromEntries(
    editablePageKeys.map((pageKey) => [
      pageKey,
      Object.fromEntries(
        locales.map((locale) => [
          locale,
          pageDefaults[pageKey][locale] === undefined
            ? undefined
            : mergeEditableContent(
                pageDefaults[pageKey][locale],
                overrides.pages?.[pageKey]?.[locale],
              ),
        ]),
      ),
    ]),
  ) as Record<EditablePageKey, Partial<Record<Locale, unknown>>>;

  return {
    pages,
    translations: getTranslationSnapshot(overrides),
  };
}

function sanitizeByTemplate(template: unknown, candidate: unknown): unknown {
  if (typeof template === "string") {
    return typeof candidate === "string"
      ? candidate.slice(0, MAX_FIELD_LENGTH)
      : template;
  }

  if (Array.isArray(template)) {
    const input = Array.isArray(candidate) ? candidate : [];
    return template.map((item, index) => sanitizeByTemplate(item, input[index]));
  }

  if (template && typeof template === "object") {
    const input =
      candidate && typeof candidate === "object" && !Array.isArray(candidate)
        ? (candidate as Record<string, unknown>)
        : {};

    return Object.fromEntries(
      Object.entries(template as Record<string, unknown>).map(([key, value]) => [
        key,
        sanitizeByTemplate(value, input[key]),
      ]),
    );
  }

  return template;
}

export function sanitizeEditableCopy(value: unknown): EditableCopy {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid content payload");
  }

  const input = value as Record<string, unknown>;
  const translationInput =
    input.translations && typeof input.translations === "object"
      ? (input.translations as Record<string, unknown>)
      : {};
  const pageInput =
    input.pages && typeof input.pages === "object"
      ? (input.pages as Record<string, unknown>)
      : {};
  const sanitizedTranslations: Partial<Record<Locale, TranslationOverride>> = {};

  for (const locale of locales) {
    sanitizedTranslations[locale] = sanitizeByTemplate(
      getTranslationSnapshot({})[locale],
      translationInput[locale],
    ) as TranslationOverride;
  }

  const sanitizedPages = Object.fromEntries(
    editablePageKeys.map((pageKey) => {
      const localeInput =
        pageInput[pageKey] && typeof pageInput[pageKey] === "object"
          ? (pageInput[pageKey] as Record<string, unknown>)
          : {};

      return [
        pageKey,
        Object.fromEntries(
          locales
            .filter((locale) => pageDefaults[pageKey][locale] !== undefined)
            .map((locale) => [
              locale,
              sanitizeByTemplate(pageDefaults[pageKey][locale], localeInput[locale]),
            ]),
        ),
      ];
    }),
  );

  return {
    pages: sanitizedPages,
    translations: sanitizedTranslations,
  };
}

export async function readEditableContent() {
  const config = getGitHubConfig();

  if (!config.token) {
    const local = normalizeDocument(localEditableCopy);

    return {
      branch: config.branch,
      canPublish: false,
      content: getEditableSnapshot(local),
      repository: config.repository,
      source: "local" as const,
    };
  }

  const response = await fetch(
    getGitHubFileUrl(config.repository, config.path, config.branch),
    {
      cache: "no-store",
      headers: getGitHubHeaders(config.token),
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub content read failed (${response.status})`);
  }

  const file = (await response.json()) as GitHubFileResponse;

  return {
    branch: config.branch,
    canPublish: true,
    content: getEditableSnapshot(parseGitHubContent(file)),
    repository: config.repository,
    source: "github" as const,
  };
}

export async function publishEditableContent(value: unknown) {
  const config = getGitHubConfig();

  if (!config.token) {
    throw new Error("Missing GITHUB_CONTENT_TOKEN");
  }

  const currentResponse = await fetch(
    getGitHubFileUrl(config.repository, config.path, config.branch),
    {
      cache: "no-store",
      headers: getGitHubHeaders(config.token),
    },
  );

  if (!currentResponse.ok) {
    throw new Error(`GitHub content read failed (${currentResponse.status})`);
  }

  const currentFile = (await currentResponse.json()) as GitHubFileResponse;

  if (!currentFile.sha) {
    throw new Error("GitHub content SHA is missing");
  }

  const content = sanitizeEditableCopy(value);
  const encodedContent = Buffer.from(`${JSON.stringify(content, null, 2)}\n`).toString(
    "base64",
  );
  const publishResponse = await fetch(
    `https://api.github.com/repos/${config.repository}/contents/${config.path}`,
    {
      body: JSON.stringify({
        branch: config.branch,
        content: encodedContent,
        message: "Update app copy from content admin",
        sha: currentFile.sha,
      }),
      headers: {
        ...getGitHubHeaders(config.token),
        "Content-Type": "application/json",
      },
      method: "PUT",
    },
  );

  if (!publishResponse.ok) {
    const detail = await publishResponse.text();
    throw new Error(
      `GitHub publish failed (${publishResponse.status}): ${detail.slice(0, 300)}`,
    );
  }

  const result = (await publishResponse.json()) as {
    commit?: { html_url?: string; sha?: string };
  };

  return {
    commitSha: result.commit?.sha ?? "",
    commitUrl: result.commit?.html_url ?? "",
  };
}
