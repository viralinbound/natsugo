"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 rounded-md border border-charcoal-100 bg-surface px-4 min-h-[40px] text-sm font-semibold text-charcoal-800 hover:border-indigo-800"
    >
      <Printer size={15} /> Print / save as PDF
    </button>
  );
}
