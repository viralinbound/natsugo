"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useLocalStorage } from "@/lib/useBrowserStore";

interface Saved {
  score: number;
  total: number;
  recommended: string;
  slug: string;
  at: number;
}

export function LastResult() {
  const raw = useLocalStorage("np-level-result");
  const r = useMemo<Saved | null>(() => {
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, [raw]);
  if (!r) return null;
  const when = new Date(r.at).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  return (
    <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-sun-400 bg-sun-100 px-5 py-4">
      <p className="text-charcoal-800">
        <span className="font-jp font-bold">おかえり！</span> Welcome back — on {when} you scored <strong>{r.score}/{r.total}</strong> and we suggested <strong>{r.recommended}</strong>.
      </p>
      <Link href={`/${r.slug}`} className="shrink-0 font-bold text-indigo-900 underline underline-offset-4">View that course</Link>
    </div>
  );
}
