"use client";

import { FormEvent, ReactNode, useState } from "react";
import { trackEvent } from "../lib/analytics";

type ValuationLeadContext = {
  adjustments: Record<string, number>;
  estimate: Record<string, number | string>;
  input: Record<string, number | string | undefined>;
  locale: string;
  sources: {
    notariado: {
      benchmark: Record<string, number | string | boolean | null> | null;
      weight: number;
    };
    ownListings: {
      averagePricePerSquareMetre: number | null;
      count: number;
      weight: number;
    };
    realadvisor: {
      averagePricePerSquareMetre: number | null;
      weight: number;
    };
  };
};

type ValuationLeadGateProps = {
  children: ReactNode;
  estimateSummary: string;
  leadContext: ValuationLeadContext;
  labels: {
    comparableActiveListings: string;
    consent: string;
    detailedReport: string;
    email: string;
    emailPlaceholder: string;
    leadBody: string;
    leadSubmitError: string;
    leadSubmitting: string;
    leadTitle: string;
    name: string;
    notariadoBenchmark: string;
    phone: string;
    preview: string;
    showDetailedValuation: string;
    sourceWeights: string;
  };
  propertySummary: string;
};

export function ValuationLeadGate({
  children,
  estimateSummary,
  leadContext,
  labels,
  propertySummary,
}: ValuationLeadGateProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappConsent, setWhatsappConsent] = useState(true);

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/valuation-leads", {
        body: JSON.stringify({
          email,
          estimateSummary,
          leadContext,
          name,
          pageUrl: window.location.href,
          phone,
          propertySummary,
          whatsappConsent,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Could not submit valuation lead");
      }

      trackEvent("valuation_lead_submitted", {
        has_email: Boolean(email),
        has_phone: Boolean(phone),
        whatsapp_consent: whatsappConsent,
      });
      setIsUnlocked(true);
    } catch {
      setSubmitError(labels.leadSubmitError);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <section className="grid gap-8 lg:col-span-2 lg:grid-cols-[1fr_0.95fr]">
      <div className="rounded-lg border border-[#ded6c8] bg-white p-5 shadow-sm sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ba9456]">
          {labels.detailedReport}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[#0f253d]">
          {labels.leadTitle}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#5c564d]">
          {labels.leadBody}
        </p>

        <form onSubmit={submitLead} className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-[#0f253d]">
            {labels.name}
            <input
              required
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-12 rounded-md border border-[#d8d0c2] bg-white px-4 text-base text-[#171717] outline-none transition focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20"
              placeholder={labels.name}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#0f253d]">
            {labels.phone}
            <input
              required
              autoComplete="tel"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="h-12 rounded-md border border-[#d8d0c2] bg-white px-4 text-base text-[#171717] outline-none transition focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20"
              placeholder="+34..."
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#0f253d] sm:col-span-2">
            {labels.email}
            <input
              required
              autoComplete="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 rounded-md border border-[#d8d0c2] bg-white px-4 text-base text-[#171717] outline-none transition focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20"
              placeholder={labels.emailPlaceholder}
            />
          </label>
          <label className="flex items-start gap-3 rounded-md bg-[#f7f2ea] p-3 text-sm leading-5 text-[#5c564d] sm:col-span-2">
            <input
              checked={whatsappConsent}
              onChange={(event) => setWhatsappConsent(event.target.checked)}
              type="checkbox"
              className="mt-1 h-4 w-4 accent-[#ba9456]"
            />
            <span>{labels.consent}</span>
          </label>
          {submitError ? (
            <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700 sm:col-span-2">
              {submitError}
            </p>
          ) : null}
          <button
            disabled={isSubmitting}
            className="h-12 rounded-md bg-[#ba9456] px-5 text-base font-semibold text-white shadow-sm transition hover:bg-[#a37f43] disabled:cursor-wait disabled:bg-[#b8a27b] sm:col-span-2"
          >
            {isSubmitting ? labels.leadSubmitting : labels.showDetailedValuation}
          </button>
        </form>
      </div>

      <aside className="rounded-lg border border-[#ded6c8] bg-[#0f253d] p-5 text-white shadow-sm sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ba9456]">
          {labels.preview}
        </p>
        <h3 className="mt-2 text-2xl font-semibold">{estimateSummary}</h3>
        <p className="mt-4 text-sm leading-6 text-white/72">{propertySummary}</p>
        <div className="mt-6 grid gap-3 text-sm text-white/78">
          <p className="rounded-md bg-white/10 p-3">{labels.sourceWeights}</p>
          <p className="rounded-md bg-white/10 p-3">{labels.notariadoBenchmark}</p>
          <p className="rounded-md bg-white/10 p-3">
            {labels.comparableActiveListings}
          </p>
        </div>
      </aside>
    </section>
  );
}
