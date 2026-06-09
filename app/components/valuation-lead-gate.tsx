"use client";

import { FormEvent, ReactNode, useState } from "react";
import { trackEvent } from "../lib/analytics";

type ValuationLeadGateProps = {
  children: ReactNode;
  estimateSummary: string;
  propertySummary: string;
};

export function ValuationLeadGate({
  children,
  estimateSummary,
  propertySummary,
}: ValuationLeadGateProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappConsent, setWhatsappConsent] = useState(true);

  function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackEvent("valuation_lead_submitted", {
      has_email: Boolean(email),
      has_phone: Boolean(phone),
      whatsapp_consent: whatsappConsent,
    });
    setIsUnlocked(true);
  }

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <section className="grid gap-8 lg:col-span-2 lg:grid-cols-[1fr_0.95fr]">
      <div className="rounded-lg border border-[#ded6c8] bg-white p-5 shadow-sm sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ba9456]">
          Detailed report
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[#0f253d]">
          Send me the detailed valuation
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#5c564d]">
          We will show the source breakdown, Notariado benchmark and comparable
          Move2Marbella listings after the contact details. No hard sell, just
          enough information to follow up properly if the estimate is relevant.
        </p>

        <form onSubmit={submitLead} className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-[#0f253d]">
            Name
            <input
              required
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-12 rounded-md border border-[#d8d0c2] bg-white px-4 text-base text-[#171717] outline-none transition focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20"
              placeholder="Your name"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#0f253d]">
            Phone
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
            Email
            <input
              required
              autoComplete="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 rounded-md border border-[#d8d0c2] bg-white px-4 text-base text-[#171717] outline-none transition focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20"
              placeholder="name@example.com"
            />
          </label>
          <label className="flex items-start gap-3 rounded-md bg-[#f7f2ea] p-3 text-sm leading-5 text-[#5c564d] sm:col-span-2">
            <input
              checked={whatsappConsent}
              onChange={(event) => setWhatsappConsent(event.target.checked)}
              type="checkbox"
              className="mt-1 h-4 w-4 accent-[#ba9456]"
            />
            <span>
              I am happy for Move2Marbella to contact me about this valuation by
              email, phone or WhatsApp.
            </span>
          </label>
          <button className="h-12 rounded-md bg-[#ba9456] px-5 text-base font-semibold text-white shadow-sm transition hover:bg-[#a37f43] sm:col-span-2">
            Show detailed valuation
          </button>
        </form>
      </div>

      <aside className="rounded-lg border border-[#ded6c8] bg-[#0f253d] p-5 text-white shadow-sm sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ba9456]">
          Preview
        </p>
        <h3 className="mt-2 text-2xl font-semibold">{estimateSummary}</h3>
        <p className="mt-4 text-sm leading-6 text-white/72">{propertySummary}</p>
        <div className="mt-6 grid gap-3 text-sm text-white/78">
          <p className="rounded-md bg-white/10 p-3">Source weights</p>
          <p className="rounded-md bg-white/10 p-3">Notariado benchmark details</p>
          <p className="rounded-md bg-white/10 p-3">Comparable active listings</p>
        </div>
      </aside>
    </section>
  );
}
