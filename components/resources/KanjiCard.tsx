"use client";

import { useState } from "react";
import { PenLine, Volume2 } from "lucide-react";
import { KanjiPractice } from "@/components/japan/KanjiPractice";
import { usePracticeMode } from "@/components/japan/PracticeToggle";
import { speakJapanese } from "@/components/ui/SpeakButton";
import { useSelectedCard } from "@/lib/selectedCard";

interface Kanji {
  k: string;
  m: string;
  r: string;
}

// A wooden kanji card. Tap it to hear the reading (or open the writing board when writing practice
// is on); the card you picked stays highlighted in indigo.
function KanjiCard({ k, m, r, onPractise }: Kanji & { onPractise: () => void }) {
  const [practice] = usePracticeMode();
  const [selected, select] = useSelectedCard(`kanji-${k}`);
  const Icon = practice ? PenLine : Volume2;
  return (
    <button
      type="button"
      onClick={() => {
        select();
        if (practice) onPractise();
        else speakJapanese(r.split("・")[0]);
      }}
      aria-pressed={selected}
      aria-label={`${k}: ${m}. ${practice ? "Practise writing" : "Listen"}`}
      className={`wood-block group flex h-44 w-full flex-col items-center justify-center p-3 text-center sm:h-48 sm:p-4 ${selected ? "is-active" : ""}`}
    >
      <span className="block font-jp text-5xl">{k}</span>
      <span title={m} className={`mt-2 line-clamp-2 min-h-[2.5em] text-sm font-semibold leading-tight sm:text-base ${selected ? "text-white" : "text-charcoal-900"}`}>{m}</span>
      <span className={`mt-1 flex items-center justify-center gap-1.5 font-jp text-sm ${selected ? "text-white/80" : "text-charcoal-500"}`}>
        {r} <Icon size={15} className={`transition-transform group-hover:scale-125 ${selected ? "text-white" : "text-indigo-700"}`} aria-hidden />
      </span>
    </button>
  );
}

export function KanjiN5Grid({ items }: { items: Kanji[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const cur = open === null ? null : items[open];
  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-5 pb-2 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((k, i) => (
          <KanjiCard key={k.k} {...k} onPractise={() => setOpen(i)} />
        ))}
      </div>
      {cur && open !== null ? (
        <KanjiPractice
          item={{ ch: cur.k, reading: cur.r.split("・")[0], meaning: cur.m }}
          onClose={() => setOpen(null)}
          nav={{ index: open, total: items.length, onPrev: () => setOpen((open + items.length - 1) % items.length), onNext: () => setOpen((open + 1) % items.length) }}
        />
      ) : null}
    </>
  );
}
