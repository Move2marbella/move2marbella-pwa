"use client";

import Script from "next/script";
import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const APP_OPEN_SESSION_KEY = "move2marbella:app-open-tracked";

export function Analytics() {
  useEffect(() => {
    if (window.sessionStorage.getItem(APP_OPEN_SESSION_KEY)) {
      return;
    }

    window.sessionStorage.setItem(APP_OPEN_SESSION_KEY, "true");
    trackEvent("app_open", {
      display_mode: window.matchMedia("(display-mode: standalone)").matches
        ? "standalone"
        : "browser",
    });
  }, []);

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="move2marbella-ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
