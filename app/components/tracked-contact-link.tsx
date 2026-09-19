"use client";

import { ComponentPropsWithoutRef } from "react";
import { trackEvent } from "../lib/analytics";

type TrackedContactLinkProps = ComponentPropsWithoutRef<"a"> & {
  contactMethod: "email" | "phone";
  contactName?: string;
  source: string;
};

export function TrackedContactLink({
  children,
  contactMethod,
  contactName,
  onClick,
  source,
  ...props
}: TrackedContactLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent(
          contactMethod === "email"
            ? "contact_email_click"
            : "contact_phone_click",
          {
            contact_name: contactName,
            source,
          },
        );
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
