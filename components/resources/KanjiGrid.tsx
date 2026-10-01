"use client";

import { useState } from "react";
import { Loader2, PenLine } from "lucide-react";
import { KanjiPractice } from "@/components/japan/KanjiPractice";

interface Detail {
  reading: string | null;
  meaning: string | null;
  loading: boolean;
}

export function KanjiGrid({ kanji, known }: { kanji: string[]; known: Map<string, { m: string; r: string }> }) {
  const [active, setActive] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, Detail>>({});
  const [open, setOpen] = useState(false);

  async function handleTap(k: string) {
    setActive(k);
    setOpen(true);
    if (details[k] || known.has(k)) return;
    setDetails((d) => ({ ...d, [k]: { reading: null, meaning: null, loading: true } }));
    try {
      const res = await fetch(`/api/kanji-lookup?c=${encodeURIComponent(k)}`);
      const data = await res.json();
      setDetails((d) => ({ ...d, [k]: { reading: data.reading, meaning: data.meaning, loading: false } }));
    } catch {
      setDetails((d) => ({ ...d, [k]: { reading: null, meaning: null, loading: false } }));
    }
  }

  const info = active
    ? known.get(active)
      ? { reading: known.get(active)!.r, meaning: known.get(active)!.m, loading: false }
      : details[active]
    : undefined;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 pb-2 sm:grid-cols-5 sm:gap-5 md:grid-cols-6 lg:grid-cols-8">
        {kanji.map((k, i) => (
          <button
            key={`${k}-${i}`}
            type="button"
            onClick={() => handleTap(k)}
            aria-pressed={active === k}
            className={`wood-block flex flex-col items-center justify-center gap-1 px-2 py-4 sm:py-5 ${active === k ? "is-active" : ""}`}
          >
            <span className="font-jp text-3xl leading-none sm:text-4xl">{k}</span>
            {known.has(k) ? <span className="text-xs font-semibold leading-tight text-charcoal-900">{known.get(k)!.m}</span> : null}
            <PenLine size={14} aria-hidden className="text-sun-500" />
          </button>
        ))}
      </div>

      {active ? (
        <div className="mt-6 card-modern p-5 flex items-center gap-5 sticky bottom-20 sm:bottom-4 bg-surface">
          <span className="font-jp text-5xl text-indigo-950 shrink-0">{active}</span>
          <div className="min-w-0">
            {info?.loading ? (
              <p className="flex items-center gap-2 text-sm text-charcoal-500">
                <Loader2 size={16} className="animate-spin" /> Looking up meaning…
              </p>
            ) : info?.meaning || info?.reading ? (
              <>
                {info.reading ? <p className="font-jp text-lg text-charcoal-700">{info.reading}</p> : null}
                {info.meaning ? <p className="font-semibold text-indigo-950 capitalize">{info.meaning}</p> : null}
              </>
            ) : (
              <p className="text-sm text-charcoal-500">No dictionary entry found for this character.</p>
            )}
          </div>
        </div>
      ) : null}
      {open && active ? (
        <KanjiPractice
          item={{ ch: active, reading: info?.reading?.split(/[、,・ ]/)[0] || undefined, meaning: info?.meaning || undefined }}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
}
