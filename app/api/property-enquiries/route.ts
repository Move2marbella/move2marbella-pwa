import { NextRequest, NextResponse } from "next/server";

type PropertyEnquiryRequest = {
  company?: string;
  email?: string;
  language?: string;
  message?: string;
  name?: string;
  pageUrl?: string;
  phone?: string;
  propertyLocation?: string;
  propertyPrice?: string;
  propertyReference?: string;
  propertyTitle?: string;
};

const DEFAULT_CRM_WEBHOOK_URL =
  "https://agent.move2marbella.com/api/webhooks/houzez";

function clean(value?: string) {
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized || undefined;
}

export async function POST(request: NextRequest) {
  let enquiry: PropertyEnquiryRequest;

  try {
    enquiry = (await request.json()) as PropertyEnquiryRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Quietly accept bots that fill the hidden honeypot field.
  if (clean(enquiry.company)) {
    return NextResponse.json({ accepted: true });
  }

  const name = clean(enquiry.name);
  const email = clean(enquiry.email);
  const phone = clean(enquiry.phone);
  const propertyReference = clean(enquiry.propertyReference);

  if (!name || (!email && !phone) || !propertyReference) {
    return NextResponse.json(
      { error: "Name, property reference, and email or phone are required." },
      { status: 400 },
    );
  }

  const webhookUrl =
    clean(process.env.AGENT_CRM_WEBHOOK_URL) ?? DEFAULT_CRM_WEBHOOK_URL;
  const webhookSecret = clean(process.env.AGENT_CRM_WEBHOOK_SECRET);

  try {
    const response = await fetch(webhookUrl, {
      body: JSON.stringify({
        email,
        formType: "property_inquiry",
        language: clean(enquiry.language) ?? "en",
        location: clean(enquiry.propertyLocation),
        message: clean(enquiry.message),
        name,
        pageUrl: clean(enquiry.pageUrl),
        phone,
        propertyReference,
        propertyTitle: clean(enquiry.propertyTitle),
        sourceUrl: clean(enquiry.pageUrl),
        utm: {
          campaign: propertyReference,
          medium: "property_enquiry",
          source: "move2marbella_app",
        },
      }),
      headers: {
        "content-type": "application/json",
        "x-m2m-app-source": "move2marbella-pwa",
        ...(webhookSecret ? { "x-agent-crm-secret": webhookSecret } : {}),
      },
      method: "POST",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("Agent CRM property enquiry webhook failed", response.status, body);
      return NextResponse.json(
        { error: "The enquiry could not be saved." },
        { status: 502 },
      );
    }

    return NextResponse.json({ accepted: true });
  } catch (error) {
    console.error("Agent CRM property enquiry webhook failed", error);
    return NextResponse.json(
      { error: "The enquiry could not be saved." },
      { status: 502 },
    );
  }
}
