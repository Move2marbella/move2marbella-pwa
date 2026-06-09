"use client";

export type AnalyticsEventName =
  | "app_open"
  | "favourite_added"
  | "favourite_removed"
  | "favourites_cleared"
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
