"use client";

import { useState } from "react";
import { PenLine, Volume2 } from "lucide-react";
import { KanjiPractice } from "@/components/japan/KanjiPractice";
import { usePracticeMode } from "@/components/japan/PracticeToggle";
import { speakJapanese } from "@/components/ui/SpeakButton";

// A whole wooden kanji card is the tap target: it plays the reading, or opens the writing board
// when writing practice is switched on.
export function KanjiCard({ k, m, r }: { k: string; m: string; r: string }) {
  const [open, setOpen] = useState(false);
  const [practice] = usePracticeMode();
  const reading = r.split("・")[0];
  return (
    <>
      <button
        type="button"
        onClick={() => (practice ? setOpen(true) : speakJapanese(reading))}
        aria-label={`${k}: ${m}. ${practice ? "Practise writing" : "Listen"}`}
        className="wood-block group w-full p-4 text-center"
      >
        <span className="block font-jp text-5xl">{k}</span>
        <span className="mt-2 block font-semibold text-charcoal-900">{m}</span>
        <span className="mt-1 flex items-center justify-center gap-1.5 font-jp text-sm text-charcoal-500">
          {r}
          {practice ? (
            <PenLine size={15} className="text-indigo-700 transition-transform group-hover:scale-125" aria-hidden />
          ) : (
            <Volume2 size={15} className="text-indigo-700 transition-transform group-hover:scale-125" aria-hidden />
          )}
        </span>
      </button>
      {open ? <KanjiPractice item={{ ch: k, reading, meaning: m }} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
