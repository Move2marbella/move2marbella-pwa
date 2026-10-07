"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      className="window-card-print-button"
      onClick={() => window.print()}
      type="button"
    >
      <Printer size={17} />
      Print / save PDF
    </button>
  );
}
