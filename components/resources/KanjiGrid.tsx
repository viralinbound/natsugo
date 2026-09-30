"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { speakJapanese } from "@/components/ui/SpeakButton";

interface Detail {
  reading: string | null;
  meaning: string | null;
  loading: boolean;
}

export function KanjiGrid({ kanji, known }: { kanji: string[]; known: Map<string, { m: string; r: string }> }) {
  const [active, setActive] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, Detail>>({});

  async function handleTap(k: string) {
    speakJapanese(k);
    setActive(k);
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
      <div className="wood-tray"><div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 sm:gap-3.5">
        {kanji.map((k, i) => (
          <button
            key={`${k}-${i}`}
            type="button"
            onClick={() => handleTap(k)}
            aria-pressed={active === k}
            className={`wood-block aspect-square flex items-center justify-center ${active === k ? "is-active" : ""}`}
          >
            <span className="font-jp text-2xl sm:text-3xl">{k}</span>
          </button>
        ))}
      </div></div>

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
    </div>
  );
}
