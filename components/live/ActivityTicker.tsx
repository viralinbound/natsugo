"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getBrowserClient } from "@/lib/supabase/browser";

interface Item {
  id: number;
  message: string;
  created_at: string;
}

const ago = (iso: string) => {
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  return `${h} hour${h > 1 ? "s" : ""} ago`;
};

// Anonymised real events only (from the `activity` table). Shows nothing if there is no recent activity.
export function ActivityTicker() {
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return Boolean(sessionStorage.getItem("np-ticker-off"));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (dismissed) return;
    const sb = getBrowserClient();
    if (!sb) return;
    const since = new Date(Date.now() - 24 * 3600_000).toISOString();
    sb.from("activity").select("*").gte("created_at", since).order("created_at", { ascending: false }).limit(8)
      .then(({ data }) => data && setItems(data as Item[]));
    const ch = sb.channel("public:activity")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "activity" }, (p) => {
        setItems((list) => [p.new as Item, ...list].slice(0, 8));
        setIndex(0);
        setVisible(true);
      })
      .subscribe();
    return () => {
      sb.removeChannel(ch);
    };
  }, [dismissed]);

  useEffect(() => {
    if (!items.length || dismissed) return;
    const show = setTimeout(() => setVisible(true), 6000);
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % items.length);
        setVisible(true);
      }, 600);
    }, 9000);
    return () => {
      clearTimeout(show);
      clearInterval(cycle);
    };
  }, [items.length, dismissed]);

  if (dismissed || !items.length) return null;
  const item = items[index % items.length];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed left-4 bottom-20 lg:bottom-6 z-40 max-w-[calc(100vw-2rem)] sm:max-w-sm flex items-start gap-3 rounded-lg border border-charcoal-100 bg-surface px-4 py-3 shadow-xl transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"
      }`}
    >
      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-success" aria-hidden />
      <div className="text-sm">
        <p className="font-semibold text-charcoal-900">{item.message}</p>
        <p className="text-xs text-charcoal-500">{ago(item.created_at)}</p>
      </div>
      <button
        aria-label="Hide activity notifications"
        onClick={() => {
          setDismissed(true);
          try {
            sessionStorage.setItem("np-ticker-off", "1");
          } catch {}
        }}
        className="-mr-1 p-1 text-charcoal-500 hover:text-charcoal-900"
      >
        <X size={14} />
      </button>
    </div>
  );
}
