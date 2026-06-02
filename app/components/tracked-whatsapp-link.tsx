"use client";

import { ComponentPropsWithoutRef } from "react";
import { trackEvent } from "../lib/analytics";

type TrackedWhatsAppLinkProps = ComponentPropsWithoutRef<"a"> & {
  propertyRef?: string;
  source: string;
};

export function TrackedWhatsAppLink({
  children,
  onClick,
  propertyRef,
  source,
  ...props
}: TrackedWhatsAppLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent("whatsapp_click", {
          property_reference: propertyRef,
          source,
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
