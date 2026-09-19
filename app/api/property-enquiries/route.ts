import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

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

function normalizeEmail(value: string) {
  return value.trim().replaceAll(",", ".");
}

function requireEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}

function getFromAddress() {
  const from = process.env.LEAD_NOTIFY_FROM?.trim();
  const smtpUser = requireEnv("SMTP_USER");

  if (from?.includes("@")) {
    return normalizeEmail(from);
  }

  return `Move2Marbella Property Enquiry <${normalizeEmail(smtpUser)}>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | undefined) {
  return `${label}: ${value || "-"}`;
}

function htmlRow(label: string, value: string | undefined) {
  return `<tr><td style="padding:8px 12px;color:#5c564d;border-bottom:1px solid #ece5d8;">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#0f253d;font-weight:600;border-bottom:1px solid #ece5d8;">${escapeHtml(
    value || "-",
  )}</td></tr>`;
}

function buildEmail(
  enquiry: Required<Pick<PropertyEnquiryRequest, "name" | "propertyReference">> &
    PropertyEnquiryRequest,
) {
  const lines = [
    "New Move2Marbella property enquiry",
    "",
    row("Name", enquiry.name),
    row("Email", enquiry.email),
    row("Phone", enquiry.phone),
    row("Language", enquiry.language),
    row("Page", enquiry.pageUrl),
    "",
    row("Property reference", enquiry.propertyReference),
    row("Property title", enquiry.propertyTitle),
    row("Property location", enquiry.propertyLocation),
    row("Property price", enquiry.propertyPrice),
    "",
    "Message:",
    enquiry.message || "-",
  ];

  const htmlRows = [
    htmlRow("Name", enquiry.name),
    htmlRow("Email", enquiry.email),
    htmlRow("Phone", enquiry.phone),
    htmlRow("Language", enquiry.language),
    htmlRow("Page", enquiry.pageUrl),
    htmlRow("Property reference", enquiry.propertyReference),
    htmlRow("Property title", enquiry.propertyTitle),
    htmlRow("Property location", enquiry.propertyLocation),
    htmlRow("Property price", enquiry.propertyPrice),
    htmlRow("Message", enquiry.message),
  ].join("");

  return {
    html: `<div style="font-family:Arial,sans-serif;background:#f7f2ea;padding:24px;"><div style="max-width:720px;background:#fff;border:1px solid #ded6c8;border-radius:8px;overflow:hidden;"><div style="background:#0f253d;color:#fff;padding:20px 24px;"><p style="margin:0;color:#ba9456;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Move2Marbella</p><h1 style="margin:8px 0 0;font-size:24px;">New property enquiry</h1></div><table style="width:100%;border-collapse:collapse;font-size:14px;">${htmlRows}</table></div></div>`,
    text: lines.join("\n"),
  };
}

async function sendPropertyEnquiryEmail(
  enquiry: Required<Pick<PropertyEnquiryRequest, "name" | "propertyReference">> &
    PropertyEnquiryRequest,
) {
  const smtpPort = Number(process.env.SMTP_PORT ?? 465);
  const smtpUser = requireEnv("SMTP_USER");
  const notifyTo = normalizeEmail(requireEnv("LEAD_NOTIFY_TO"));
  const { html, text } = buildEmail(enquiry);

  const transporter = nodemailer.createTransport({
    auth: {
      pass: requireEnv("SMTP_PASS"),
      user: smtpUser,
    },
    host: requireEnv("SMTP_HOST"),
    port: smtpPort,
    secure: process.env.SMTP_SECURE !== "false" && smtpPort === 465,
  });

  await transporter.sendMail({
    from: getFromAddress(),
    html,
    replyTo: enquiry.email,
    subject: `New property enquiry: ${enquiry.propertyReference}`,
    text,
    to: notifyTo,
  });
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
  const normalizedEnquiry = {
    ...enquiry,
    email,
    name,
    phone,
    propertyReference,
  };

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
      await sendPropertyEnquiryEmail(normalizedEnquiry);

      return NextResponse.json({
        accepted: true,
        crmSaved: false,
        emailFallback: true,
      });
    }

    try {
      await sendPropertyEnquiryEmail(normalizedEnquiry);
    } catch (emailError) {
      console.error("Property enquiry notification email failed", emailError);
    }

    return NextResponse.json({ accepted: true });
  } catch (error) {
    console.error("Agent CRM property enquiry webhook failed", error);

    try {
      await sendPropertyEnquiryEmail(normalizedEnquiry);

      return NextResponse.json({
        accepted: true,
        crmSaved: false,
        emailFallback: true,
      });
    } catch (emailError) {
      console.error("Property enquiry fallback email failed", emailError);

      return NextResponse.json(
        { error: "The enquiry could not be saved." },
        { status: 502 },
      );
    }
  }
}
