import { NextResponse, type NextRequest } from "next/server";

const BLOCKED_BOT_PATTERNS = [
  /ahrefsbot/i,
  /amazonbot/i,
  /anthropic-ai/i,
  /applebot-extended/i,
  /baiduspider/i,
  /bytespider/i,
  /ccbot/i,
  /chatgpt-user/i,
  /claudebot/i,
  /dataforseobot/i,
  /facebookexternalhit/i,
  /gptbot/i,
  /mj12bot/i,
  /oai-searchbot/i,
  /perplexitybot/i,
  /petalbot/i,
  /semrushbot/i,
];

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";

  if (BLOCKED_BOT_PATTERNS.some((pattern) => pattern.test(userAgent))) {
    return new NextResponse("Blocked", {
      status: 403,
      headers: {
        "x-robots-tag": "noindex, nofollow",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|manifest.json|sw.js|.*\\.(?:png|jpg|jpeg|webp|svg|ico|css|js|woff2?)$).*)",
  ],
};
