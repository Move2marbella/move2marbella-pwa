import "server-only";

import localEditableCopy from "../../content/editable-copy.json";
import {
  locales,
  translations,
  type Locale,
  type Translation,
} from "../i18n/translations";
import type { EditableCopy, TranslationOverride } from "./editable-copy";

const DEFAULT_REPOSITORY = "Move2marbella/move2marbella-pwa";
const DEFAULT_BRANCH = "main";
const DEFAULT_CONTENT_PATH = "content/editable-copy.json";
const MAX_FIELD_LENGTH = 6000;

type GitHubFileResponse = {
  content?: string;
  encoding?: string;
  sha?: string;
};

function getGitHubConfig() {
  return {
    branch: process.env.GITHUB_CONTENT_BRANCH?.trim() || DEFAULT_BRANCH,
    path: process.env.GITHUB_CONTENT_PATH?.trim() || DEFAULT_CONTENT_PATH,
    repository:
      process.env.GITHUB_CONTENT_REPO?.trim() || DEFAULT_REPOSITORY,
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

function parseGitHubContent(file: GitHubFileResponse): EditableCopy {
  if (!file.content || file.encoding !== "base64") {
    return {};
  }

  return JSON.parse(Buffer.from(file.content, "base64").toString("utf8")) as EditableCopy;
}

export function getEditableSnapshot(overrides: EditableCopy) {
  return Object.fromEntries(
    locales.map((locale) => {
      const base = translations[locale];
      const override = overrides[locale];

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

export function sanitizeEditableCopy(value: unknown): EditableCopy {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid content payload");
  }

  const input = value as Record<string, unknown>;
  const sanitized: EditableCopy = {};

  for (const locale of locales) {
    const localeInput = input[locale];

    if (!localeInput || typeof localeInput !== "object" || Array.isArray(localeInput)) {
      continue;
    }

    const source = localeInput as Record<string, unknown>;
    const target: TranslationOverride = {};

    for (const [key, defaultValue] of Object.entries(translations[locale])) {
      if (key === "valuation" || key === "searchExamples" || typeof defaultValue !== "string") {
        continue;
      }

      const candidate = source[key];

      if (typeof candidate === "string") {
        (target as Record<string, unknown>)[key] = candidate.slice(0, MAX_FIELD_LENGTH);
      }
    }

    const valuationInput = source.valuation;

    if (valuationInput && typeof valuationInput === "object" && !Array.isArray(valuationInput)) {
      const valuationTarget: Record<string, string> = {};

      for (const key of Object.keys(translations[locale].valuation)) {
        const candidate = (valuationInput as Record<string, unknown>)[key];

        if (typeof candidate === "string") {
          valuationTarget[key] = candidate.slice(0, MAX_FIELD_LENGTH);
        }
      }

      target.valuation = valuationTarget as Partial<Translation["valuation"]>;
    }

    sanitized[locale] = target;
  }

  return sanitized;
}

export async function readEditableContent() {
  const config = getGitHubConfig();

  if (!config.token) {
    const local = localEditableCopy as EditableCopy;

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
    throw new Error(`GitHub publish failed (${publishResponse.status}): ${detail.slice(0, 300)}`);
  }

  const result = (await publishResponse.json()) as {
    commit?: { html_url?: string; sha?: string };
  };

  return {
    commitSha: result.commit?.sha ?? "",
    commitUrl: result.commit?.html_url ?? "",
  };
}
