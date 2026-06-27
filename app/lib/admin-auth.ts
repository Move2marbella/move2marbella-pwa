import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "m2m_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET?.trim() ?? "";
}

function hash(value: string) {
  return createHash("sha256").update(value).digest();
}

function safeEqual(left: string, right: string) {
  return timingSafeEqual(hash(left), hash(right));
}

export function getMissingAdminEnvironmentVariables() {
  return ["ADMIN_PASSWORD", "ADMIN_SESSION_SECRET"].filter(
    (name) => !process.env[name]?.trim(),
  );
}

export function isAdminPasswordValid(password: string) {
  const configuredPassword = process.env.ADMIN_PASSWORD?.trim();

  return Boolean(configuredPassword && safeEqual(password, configuredPassword));
}

export function createAdminSessionToken() {
  const secret = getSessionSecret();

  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET");
  }

  return createHmac("sha256", secret)
    .update("move2marbella-admin-session-v1")
    .digest("hex");
}

export async function isAdminAuthenticated() {
  const session = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  const secret = getSessionSecret();

  if (!session || !secret) {
    return false;
  }

  return safeEqual(session, createAdminSessionToken());
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (!origin || !host) {
    return false;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
