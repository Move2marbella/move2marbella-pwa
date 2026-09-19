"use client";

import { FormEvent, useState } from "react";
import { trackEvent, trackLeadConversion } from "../lib/analytics";

type ContactLeadFormLabels = {
  body: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  name: string;
  phone: string;
  send: string;
  sending: string;
  submitError: string;
  success: string;
  title: string;
};

type ContactLeadFormProps = {
  labels: ContactLeadFormLabels;
  locale: string;
};

export function ContactLeadForm({ labels, locale }: ContactLeadFormProps) {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  async function submitContactLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || (!email.trim() && !phone.trim()) || !message.trim()) {
      setSubmitError(labels.submitError);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/contact-leads", {
        body: JSON.stringify({
          company,
          email,
          language: locale,
          message,
          name,
          pageUrl: window.location.href,
          phone,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Could not submit contact lead");
      }

      trackEvent("contact_form_submitted", {
        has_email: Boolean(email),
        has_phone: Boolean(phone),
        locale,
      });
      trackLeadConversion("contact", {
        has_email: Boolean(email),
        has_phone: Boolean(phone),
        locale,
      });
      setSubmitSuccess(true);
      setEmail("");
      setMessage("");
      setName("");
      setPhone("");
    } catch {
      setSubmitError(labels.submitError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <div className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-7">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-[#102844]">
            {labels.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-[#4b4740]">
            {labels.body}
          </p>
        </div>

        {submitSuccess ? (
          <div
            className="mt-6 rounded-[8px] border border-emerald-200 bg-emerald-50 p-5 text-emerald-900"
            role="status"
            aria-live="polite"
          >
            <p className="text-lg font-semibold">{labels.success}</p>
          </div>
        ) : (
        <form onSubmit={submitContactLead} className="mt-6 grid gap-4 md:grid-cols-3">
          <label className="hidden" aria-hidden="true">
            Company
            <input
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              autoComplete="off"
              tabIndex={-1}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#102844]">
            {labels.name}
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              className="h-12 rounded-[6px] border border-[#d8d0c2] bg-white px-4 text-base text-[#171717] outline-none transition focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20"
              placeholder={labels.name}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#102844]">
            {labels.email}
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              className="h-12 rounded-[6px] border border-[#d8d0c2] bg-white px-4 text-base text-[#171717] outline-none transition focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20"
              placeholder={labels.emailPlaceholder}
              type="email"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#102844]">
            {labels.phone}
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              autoComplete="tel"
              className="h-12 rounded-[6px] border border-[#d8d0c2] bg-white px-4 text-base text-[#171717] outline-none transition focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20"
              placeholder="+34..."
              type="tel"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#102844] md:col-span-3">
            {labels.message}
            <textarea
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="min-h-36 rounded-[6px] border border-[#d8d0c2] bg-white px-4 py-3 text-base text-[#171717] outline-none transition focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20"
              placeholder={labels.messagePlaceholder}
            />
          </label>
          {submitError ? (
            <p className="rounded-[6px] border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700 md:col-span-3">
              {submitError}
            </p>
          ) : null}
          <button
            disabled={isSubmitting}
            className="h-12 rounded-[6px] bg-[#ba9456] px-5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#a37f43] disabled:cursor-wait disabled:bg-[#b8a27b] md:col-span-3"
          >
            {isSubmitting ? labels.sending : labels.send}
          </button>
        </form>
        )}
      </div>
    </section>
  );
}
