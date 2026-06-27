import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
  getMissingAdminEnvironmentVariables,
  isAdminPasswordValid,
  isSameOrigin,
} from "../../../lib/admin-auth";

export async function POST(request: Request) {
  const adminUrl = new URL("/admin", request.url);

  if (!isSameOrigin(request)) {
    adminUrl.searchParams.set("error", "origin");
    return NextResponse.redirect(adminUrl, 303);
  }

  if (getMissingAdminEnvironmentVariables().length > 0) {
    adminUrl.searchParams.set("error", "config");
    return NextResponse.redirect(adminUrl, 303);
  }

  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");

  if (!isAdminPasswordValid(password)) {
    adminUrl.searchParams.set("error", "invalid");
    return NextResponse.redirect(adminUrl, 303);
  }

  const response = NextResponse.redirect(adminUrl, 303);
  response.cookies.set(ADMIN_COOKIE_NAME, createAdminSessionToken(), {
    httpOnly: true,
    maxAge: ADMIN_SESSION_MAX_AGE,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
