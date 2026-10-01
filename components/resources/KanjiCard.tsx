"use client";

import { useState } from "react";
import { PenLine } from "lucide-react";
import { KanjiPractice } from "@/components/japan/KanjiPractice";
import { usePracticeMode } from "@/components/japan/PracticeToggle";
import { HearButton } from "@/components/ui/HearButton";

// A wooden kanji card. The corner speaker plays the reading; with writing practice on, tapping the
// card opens the writing board.
export function KanjiCard({ k, m, r }: { k: string; m: string; r: string }) {
  const [open, setOpen] = useState(false);
  const [practice] = usePracticeMode();
  const reading = r.split("・")[0];
  return (
    <div className="relative">
      <HearButton text={reading} label={`Hear ${k}`} />
      <button
        type="button"
        onClick={() => practice && setOpen(true)}
        aria-label={`${k}: ${m}. ${practice ? "Practise writing" : "Show"}`}
        className={`wood-block group w-full p-4 text-center ${practice ? "" : "cursor-default"}`}
      >
        <span className="block font-jp text-5xl">{k}</span>
        <span className="mt-2 block font-semibold text-charcoal-900">{m}</span>
        <span className="mt-1 flex items-center justify-center gap-1.5 font-jp text-sm text-charcoal-500">
          {r}
          {practice ? <PenLine size={15} className="text-indigo-700 transition-transform group-hover:scale-125" aria-hidden /> : null}
        </span>
      </button>
      {open ? <KanjiPractice item={{ ch: k, reading, meaning: m }} onClose={() => setOpen(false)} /> : null}
    </div>
  );
}
