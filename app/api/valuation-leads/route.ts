import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type LeadRequest = {
  email?: string;
  estimateSummary?: string;
  leadContext?: {
    adjustments?: Record<string, number>;
    estimate?: Record<string, number | string>;
    input?: Record<string, number | string | undefined>;
    locale?: string;
    sources?: {
      notariado?: {
        benchmark?: Record<string, number | string | boolean | null> | null;
        weight?: number;
      };
      ownListings?: {
        averagePricePerSquareMetre?: number | null;
        count?: number;
        weight?: number;
      };
      realadvisor?: {
        averagePricePerSquareMetre?: number | null;
        weight?: number;
      };
    };
  };
  name?: string;
  pageUrl?: string;
  phone?: string;
  propertySummary?: string;
  whatsappConsent?: boolean;
};

function requireEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
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

  return `Move2Marbella Valuation <${normalizeEmail(smtpUser)}>`;
}

function formatEuro(value?: number | null) {
  if (!value) {
    return "-";
  }

  return new Intl.NumberFormat("en-GB", {
    currency: "EUR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

function formatNumber(value?: number | null) {
  if (value === null || value === undefined) {
    return "-";
  }

  return new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value?: number | null) {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${Math.round(value * 100)}%`;
}

function formatNotariadoGeography(value?: string | number | boolean | null) {
  const labels: Record<string, string> = {
    municipality: "municipality",
    nearestMunicipality: "nearest municipality",
    nearestPostalCode: "nearest postal code",
    postalCode: "postal code",
  };

  if (!value) {
    return "-";
  }

  return labels[String(value)] ?? String(value);
}

function formatNotariadoArea(
  notariado?: Record<string, number | string | boolean | null> | null,
) {
  if (!notariado) {
    return "-";
  }

  return `${notariado.label ?? "-"} (${formatNotariadoGeography(
    notariado.geography,
  )})`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | number | boolean | undefined | null) {
  return `${label}: ${value === undefined || value === null || value === "" ? "-" : value}`;
}

function htmlRow(label: string, value: string | number | boolean | undefined | null) {
  return `<tr><td style="padding:8px 12px;color:#5c564d;border-bottom:1px solid #ece5d8;">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#0f253d;font-weight:600;border-bottom:1px solid #ece5d8;">${escapeHtml(
    String(value === undefined || value === null || value === "" ? "-" : value),
  )}</td></tr>`;
}

function buildEmail(lead: Required<Pick<LeadRequest, "email" | "name" | "phone">> & LeadRequest) {
  const context = lead.leadContext;
  const input = context?.input ?? {};
  const estimate = context?.estimate ?? {};
  const sources = context?.sources;
  const notariado = sources?.notariado?.benchmark;

  const lines = [
    "New Move2Marbella valuation lead",
    "",
    row("Name", lead.name),
    row("Email", lead.email),
    row("Phone", lead.phone),
    row("WhatsApp consent", lead.whatsappConsent ? "yes" : "no"),
    row("Page", lead.pageUrl),
    "",
    row("Property summary", lead.propertySummary),
    row("Estimate range", lead.estimateSummary),
    row("Midpoint", formatEuro(Number(estimate.mid))),
    row("Price per m2", formatEuro(Number(estimate.pricePerSquareMetre))),
    row("Confidence", String(estimate.confidence ?? "-")),
    "",
    row("Municipality", input.municipality),
    row("Area", input.area),
    row("Postal code", input.postalCode),
    row("Property type", input.propertyType),
    row("Built area", input.builtArea ? `${input.builtArea} m2` : "-"),
    row("Bedrooms", input.bedrooms),
    row("Condition", input.condition),
    row("Outdoor space", input.outdoorSpace),
    row("Parking", input.parking),
    "",
    row("Own listing comps", sources?.ownListings?.count),
    row(
      "Own listing avg / m2",
      formatEuro(sources?.ownListings?.averagePricePerSquareMetre),
    ),
    row("Own listing weight", formatPercent(sources?.ownListings?.weight)),
    row("Notariado area", formatNotariadoArea(notariado)),
    row("Notariado / m2", formatEuro(Number(notariado?.pricePerSquareMetre))),
    row("Notariado transactions", formatNumber(Number(notariado?.sales))),
    row("Notariado weight", formatPercent(sources?.notariado?.weight)),
    row(
      "Market benchmark / m2",
      formatEuro(sources?.realadvisor?.averagePricePerSquareMetre),
    ),
    row("Market benchmark weight", formatPercent(sources?.realadvisor?.weight)),
  ];

  const htmlRows = [
    htmlRow("Name", lead.name),
    htmlRow("Email", lead.email),
    htmlRow("Phone", lead.phone),
    htmlRow("WhatsApp consent", lead.whatsappConsent ? "yes" : "no"),
    htmlRow("Page", lead.pageUrl),
    htmlRow("Property summary", lead.propertySummary),
    htmlRow("Estimate range", lead.estimateSummary),
    htmlRow("Midpoint", formatEuro(Number(estimate.mid))),
    htmlRow("Price per m2", formatEuro(Number(estimate.pricePerSquareMetre))),
    htmlRow("Confidence", String(estimate.confidence ?? "-")),
    htmlRow("Municipality", input.municipality),
    htmlRow("Area", input.area),
    htmlRow("Postal code", input.postalCode),
    htmlRow("Property type", input.propertyType),
    htmlRow("Built area", input.builtArea ? `${input.builtArea} m2` : "-"),
    htmlRow("Bedrooms", input.bedrooms),
    htmlRow("Condition", input.condition),
    htmlRow("Outdoor space", input.outdoorSpace),
    htmlRow("Parking", input.parking),
    htmlRow("Own listing comps", sources?.ownListings?.count),
    htmlRow(
      "Own listing avg / m2",
      formatEuro(sources?.ownListings?.averagePricePerSquareMetre),
    ),
    htmlRow("Own listing weight", formatPercent(sources?.ownListings?.weight)),
    htmlRow(
      "Notariado area",
      formatNotariadoArea(notariado),
    ),
    htmlRow("Notariado / m2", formatEuro(Number(notariado?.pricePerSquareMetre))),
    htmlRow("Notariado transactions", formatNumber(Number(notariado?.sales))),
    htmlRow("Notariado weight", formatPercent(sources?.notariado?.weight)),
    htmlRow(
      "Market benchmark / m2",
      formatEuro(sources?.realadvisor?.averagePricePerSquareMetre),
    ),
    htmlRow("Market benchmark weight", formatPercent(sources?.realadvisor?.weight)),
  ].join("");

  return {
    html: `<div style="font-family:Arial,sans-serif;background:#f7f2ea;padding:24px;"><div style="max-width:720px;background:#fff;border:1px solid #ded6c8;border-radius:8px;overflow:hidden;"><div style="background:#0f253d;color:#fff;padding:20px 24px;"><p style="margin:0;color:#ba9456;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Move2Marbella</p><h1 style="margin:8px 0 0;font-size:24px;">New valuation lead</h1></div><table style="width:100%;border-collapse:collapse;font-size:14px;">${htmlRows}</table></div></div>`,
    text: lines.join("\n"),
  };
}

export async function POST(request: Request) {
  let lead: LeadRequest;

  try {
    lead = (await request.json()) as LeadRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = lead.name?.trim();
  const email = lead.email?.trim();
  const phone = lead.phone?.trim();

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const smtpPort = Number(process.env.SMTP_PORT ?? 465);
    const smtpUser = requireEnv("SMTP_USER");
    const notifyTo = normalizeEmail(requireEnv("LEAD_NOTIFY_TO"));
    const { html, text } = buildEmail({
      ...lead,
      email,
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
      subject: `New valuation lead: ${name}`,
      text,
      to: notifyTo,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Valuation lead email failed", error);

    return NextResponse.json(
      { error: "Could not send valuation lead" },
      { status: 500 },
    );
  }
}
