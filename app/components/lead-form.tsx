"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "../lib/analytics";

type LeadFormProps = {
  labels?: {
    email: string;
    leadDefaultMessage: string;
    leadForm: string;
    message: string;
    name: string;
    phone: string;
    requestDetails: string;
    sendEnquiry: string;
  };
  propertyRef: string;
  propertyTitle: string;
  propertyPrice: string;
  propertyLocation: string;
  whatsappUrl: string;
};

export function LeadForm({
  labels = {
    email: "Email",
    leadDefaultMessage: "I would like more information about this property.",
    leadForm: "Lead form",
    message: "Message",
    name: "Name",
    phone: "Phone",
    requestDetails: "Request details",
    sendEnquiry: "Send enquiry",
  },
  propertyRef,
  propertyTitle,
  propertyPrice,
  propertyLocation,
  whatsappUrl,
}: LeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(labels.leadDefaultMessage);

  function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = [
      `Property enquiry: ${propertyRef}`,
      propertyTitle,
      `${propertyPrice} - ${propertyLocation}`,
      "",
      `${labels.name}: ${name || "-"}`,
      `${labels.email}: ${email || "-"}`,
      `${labels.phone}: ${phone || "-"}`,
      "",
      message,
    ].join("\n");
    const url = new URL(whatsappUrl);

    url.searchParams.set("text", text);
    trackEvent("lead_form_submitted", {
      property_reference: propertyRef,
    });
    trackEvent("whatsapp_click", {
      property_reference: propertyRef,
      source: "lead_form",
    });
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  }

  return (
    <section className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
        {labels.leadForm}
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-[#171717]">
        {labels.requestDetails}
      </h2>
      <form onSubmit={submitLead} className="mt-4 grid gap-3">
        <label className="grid gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
            {labels.name}
          </span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-11 rounded-[6px] border border-[#d7d2c4] px-3 text-base outline-none focus:border-[#ba9456]"
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
            {labels.email}
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 rounded-[6px] border border-[#d7d2c4] px-3 text-base outline-none focus:border-[#ba9456]"
            placeholder="name@example.com"
            autoComplete="email"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
            {labels.phone}
          </span>
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="h-11 rounded-[6px] border border-[#d7d2c4] px-3 text-base outline-none focus:border-[#ba9456]"
            placeholder="+34..."
            autoComplete="tel"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
            {labels.message}
          </span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="min-h-28 rounded-[6px] border border-[#d7d2c4] px-3 py-2 text-base outline-none focus:border-[#ba9456]"
          />
        </label>
        <button className="mt-1 h-12 rounded-[6px] bg-[#ba9456] px-5 text-sm font-bold uppercase tracking-wide text-white">
          {labels.sendEnquiry}
        </button>
      </form>
    </section>
  );
}
