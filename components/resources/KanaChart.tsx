"use client";

import { useState } from "react";
import type { KanaCell } from "@/lib/learning";
import { KanjiPractice } from "@/components/japan/KanjiPractice";
import { PracticeToggle, usePracticeMode } from "@/components/japan/PracticeToggle";
import { HearButton } from "@/components/ui/HearButton";

export function KanaChart({ rows }: { rows: KanaCell[][] }) {
  const [showRomaji, setShowRomaji] = useState(true);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [practice] = usePracticeMode();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-charcoal-700">Press the speaker on a card to hear it.</p>
          <PracticeToggle />
        </div>
        <label className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal-800 cursor-pointer">
          <input type="checkbox" checked={showRomaji} onChange={(e) => setShowRomaji(e.target.checked)} className="h-5 w-5 accent-indigo-900" />
          Show romaji
        </label>
      </div>
      <div className="mt-6">
      <div className="grid grid-cols-5 gap-2.5 pb-2 sm:gap-5">
        {rows.flat().map((c, i) =>
          c.kana ? (
            <div key={i} className="relative">
            <HearButton text={c.kana} label={`Hear ${c.kana} (${c.romaji})`} className="h-7 w-7 sm:h-8 sm:w-8" />
            <button
              type="button"
              onClick={() => {
                setActive(c.kana);
                if (practice) setOpen(true);
              }}
              aria-label={`${c.kana} (${c.romaji})`}
              className={`wood-block flex w-full flex-col items-center justify-center gap-0.5 px-1 py-3 sm:gap-1 sm:px-3 sm:py-6 ${active === c.kana ? "is-active" : ""}`}
            >
              <span className="font-jp text-3xl leading-none sm:text-5xl">{c.kana}</span>
              {showRomaji ? <span className={`mt-1 text-[11px] sm:text-sm ${active === c.kana ? "text-white/80" : "text-charcoal-700"}`}>{c.romaji}</span> : null}
            </button>
            </div>
          ) : (
            <span key={i} aria-hidden className="aspect-square" />
          )
        )}
      </div>
      </div>
      {open && active ? <KanjiPractice item={{ ch: active, meaning: rows.flat().find((c) => c.kana === active)?.romaji }} onClose={() => setOpen(false)} /> : null}
    </div>
  );
}
