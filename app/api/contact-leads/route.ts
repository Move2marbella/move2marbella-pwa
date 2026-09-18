import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactLeadRequest = {
  company?: string;
  email?: string;
  language?: string;
  message?: string;
  name?: string;
  pageUrl?: string;
  phone?: string;
};

function requireEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}

function clean(value?: string) {
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized || undefined;
}

function normalizeEmail(value: string) {
  return value.trim().replaceAll(",", ".");
}

function getFromAddress() {
  const from = process.env.LEAD_NOTIFY_FROM?.trim();
  const smtpUser = requireEnv("SMTP_USER");

  if (from?.includes("@")) {
    return normalizeEmail(from);
  }

  return `Move2Marbella Contact <${normalizeEmail(smtpUser)}>`;
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

function buildEmail(lead: Required<Pick<ContactLeadRequest, "message" | "name">> & ContactLeadRequest) {
  const lines = [
    "New Move2Marbella contact lead",
    "",
    row("Name", lead.name),
    row("Email", lead.email),
    row("Phone", lead.phone),
    row("Language", lead.language),
    row("Page", lead.pageUrl),
    "",
    "Message:",
    lead.message,
  ];

  const htmlRows = [
    htmlRow("Name", lead.name),
    htmlRow("Email", lead.email),
    htmlRow("Phone", lead.phone),
    htmlRow("Language", lead.language),
    htmlRow("Page", lead.pageUrl),
    htmlRow("Message", lead.message),
  ].join("");

  return {
    html: `<div style="font-family:Arial,sans-serif;background:#f7f2ea;padding:24px;"><div style="max-width:720px;background:#fff;border:1px solid #ded6c8;border-radius:8px;overflow:hidden;"><div style="background:#0f253d;color:#fff;padding:20px 24px;"><p style="margin:0;color:#ba9456;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Move2Marbella</p><h1 style="margin:8px 0 0;font-size:24px;">New contact lead</h1></div><table style="width:100%;border-collapse:collapse;font-size:14px;">${htmlRows}</table></div></div>`,
    text: lines.join("\n"),
  };
}

export async function POST(request: Request) {
  let lead: ContactLeadRequest;

  try {
    lead = (await request.json()) as ContactLeadRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (clean(lead.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(lead.name);
  const email = clean(lead.email);
  const phone = clean(lead.phone);
  const message = clean(lead.message);

  if (!name || (!email && !phone) || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const smtpPort = Number(process.env.SMTP_PORT ?? 465);
    const smtpUser = requireEnv("SMTP_USER");
    const notifyTo = normalizeEmail(requireEnv("LEAD_NOTIFY_TO"));
    const { html, text } = buildEmail({
      ...lead,
      email,
      message,
      name,
      phone,
    });

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
      replyTo: email,
      subject: `New contact lead: ${name}`,
      text,
      to: notifyTo,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact lead email failed", error);

    return NextResponse.json(
      { error: "Could not send contact lead" },
      { status: 500 },
    );
  }
}
