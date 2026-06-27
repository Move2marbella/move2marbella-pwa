import { NextResponse } from "next/server";
import { isAdminAuthenticated, isSameOrigin } from "../../../lib/admin-auth";
import {
  publishEditableContent,
  readEditableContent,
} from "../../../lib/admin-content";

export const runtime = "nodejs";

function noStoreJson(body: unknown, init?: ResponseInit) {
  const response = NextResponse.json(body, init);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return noStoreJson({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return noStoreJson(await readEditableContent());
  } catch (error) {
    console.error("Admin content read failed", error);
    return noStoreJson(
      { error: error instanceof Error ? error.message : "Content read failed" },
      { status: 502 },
    );
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return noStoreJson({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSameOrigin(request)) {
    return noStoreJson({ error: "Invalid origin" }, { status: 403 });
  }

  try {
    const payload = (await request.json()) as { content?: unknown };
    const result = await publishEditableContent(payload.content);

    return noStoreJson({ ok: true, ...result });
  } catch (error) {
    console.error("Admin content publish failed", error);
    return noStoreJson(
      { error: error instanceof Error ? error.message : "Publish failed" },
      { status: 502 },
    );
  }
}
