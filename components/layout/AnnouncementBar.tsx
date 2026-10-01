"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar({ text, enabled = true }: { text: string; enabled?: boolean }) {
  const [visible, setVisible] = useState(true);
  if (!visible || !enabled || !text) return null;

  return (
    <div className="announcement gradient-strip text-white text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
        <p className="truncate">{text}</p>
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/batches" className="rounded-full bg-white/10 px-3 py-1 font-semibold transition-colors hover:bg-white/20">
            View Batches
          </Link>
          <button
            aria-label="Dismiss announcement"
            onClick={() => setVisible(false)}
            className="p-1 rounded hover:bg-white/10 hidden sm:inline-flex"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
