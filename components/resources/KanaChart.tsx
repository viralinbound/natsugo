"use client";

import { useState } from "react";
import type { KanaCell } from "@/lib/learning";
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
      <div className="wood-tray mt-5 max-w-2xl">
      <div className="grid grid-cols-5 gap-2.5 sm:gap-3.5">
        {rows.flat().map((c, i) =>
          c.kana ? (
            <button
              key={i}
              type="button"
              onClick={() => {
                setActive(c.kana);
                speakJapanese(c.kana);
              }}
              aria-label={`${c.kana} (${c.romaji})`}
              className={`wood-block aspect-square flex flex-col items-center justify-center ${active === c.kana ? "is-active" : ""}`}
            >
              <span className="font-jp text-2xl sm:text-4xl leading-none">{c.kana}</span>
              {showRomaji ? <span className={`mt-1 text-[11px] sm:text-sm ${active === c.kana ? "text-white/80" : "text-charcoal-700"}`}>{c.romaji}</span> : null}
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
