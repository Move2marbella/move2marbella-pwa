"use client";

export type AnalyticsEventName =
  | "app_open"
  | "contact_form_submitted"
  | "decision_guide_completed"
  | "decision_guide_started"
  | "favourite_added"
  | "favourite_removed"
  | "favourites_cleared"
  | "generate_lead"
  | "contact_email_click"
  | "contact_phone_click"
  | "lead_form_submitted"
  | "pwa_install_accepted"
  | "pwa_install_clicked"
  | "pwa_install_dismissed"
  | "pwa_install_prompt_shown"
  | "valuation_lead_submitted"
  | "whatsapp_click";

type AnalyticsEventParams = Record<
  string,
  boolean | number | string | undefined
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsEventParams = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  window.gtag("event", eventName, params);
}

export function trackLeadConversion(
  leadType: "contact" | "property_enquiry" | "valuation",
  params: AnalyticsEventParams = {},
) {
  trackEvent("generate_lead", {
    currency: "EUR",
    lead_type: leadType,
    value: 1,
    ...params,
  });
}
