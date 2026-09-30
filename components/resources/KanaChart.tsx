"use client";

import { useState } from "react";
import type { KanaCell } from "@/lib/learning";
import { Volume2 } from "lucide-react";
import { speakJapanese } from "@/components/ui/SpeakButton";

export function KanaChart({ rows }: { rows: KanaCell[][] }) {
  const [showRomaji, setShowRomaji] = useState(true);
  const [active, setActive] = useState<string | null>(null);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-charcoal-700">Tap any character to hear it.</p>
        <label className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal-800 cursor-pointer">
          <input type="checkbox" checked={showRomaji} onChange={(e) => setShowRomaji(e.target.checked)} className="h-5 w-5 accent-indigo-900" />
          Show romaji
        </label>
      </div>
      <div className="mt-6">
      <div className="grid grid-cols-5 gap-2.5 pb-2 sm:gap-5">
        {rows.flatMap((r) => [...r.filter((c) => c.kana), ...r.filter((c) => !c.kana)]).map((c, i) =>
          c.kana ? (
            <button
              key={i}
              type="button"
              onClick={() => {
                setActive(c.kana);
                speakJapanese(c.kana);
              }}
              aria-label={`${c.kana} (${c.romaji})`}
              className={`wood-block flex flex-col items-center justify-center gap-0.5 px-1 py-3 sm:gap-1 sm:px-3 sm:py-6 ${active === c.kana ? "is-active" : ""}`}
            >
              <span className="font-jp text-3xl leading-none sm:text-5xl">{c.kana}</span>
              {showRomaji ? <span className={`mt-1 text-[11px] sm:text-sm ${active === c.kana ? "text-white/80" : "text-charcoal-700"}`}>{c.romaji}</span> : null}
              <Volume2 size={14} aria-hidden className="hidden text-sun-500 sm:block" />
            </button>
          ) : (
            <span key={i} aria-hidden className="aspect-square" />
          )
        )}
      </div>
      </div>
    </div>
  );
}
