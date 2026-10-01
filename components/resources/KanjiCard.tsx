"use client";

import { useState } from "react";
import { PenLine, Volume2 } from "lucide-react";
import { KanjiPractice } from "@/components/japan/KanjiPractice";
import { usePracticeMode } from "@/components/japan/PracticeToggle";
import { speakJapanese } from "@/components/ui/SpeakButton";
import { useSelectedCard } from "@/lib/selectedCard";

// A wooden kanji card. Tap it to hear the reading (or open the writing board when writing practice
// is on); the card you picked stays highlighted in indigo.
export function KanjiCard({ k, m, r }: { k: string; m: string; r: string }) {
  const [open, setOpen] = useState(false);
  const [practice] = usePracticeMode();
  const [selected, select] = useSelectedCard(`kanji-${k}`);
  const reading = r.split("・")[0];
  const Icon = practice ? PenLine : Volume2;
  return (
    <>
      <button
        type="button"
        onClick={() => {
          select();
          if (practice) setOpen(true);
          else speakJapanese(reading);
        }}
        aria-pressed={selected}
        aria-label={`${k}: ${m}. ${practice ? "Practise writing" : "Listen"}`}
        className={`wood-block group w-full p-4 text-center ${selected ? "is-active" : ""}`}
      >
        <span className="block font-jp text-5xl">{k}</span>
        <span className={`mt-2 block font-semibold ${selected ? "text-white" : "text-charcoal-900"}`}>{m}</span>
        <span className={`mt-1 flex items-center justify-center gap-1.5 font-jp text-sm ${selected ? "text-white/80" : "text-charcoal-500"}`}>
          {r} <Icon size={15} className={`transition-transform group-hover:scale-125 ${selected ? "text-white" : "text-indigo-700"}`} aria-hidden />
        </span>
      </button>
      {open ? <KanjiPractice item={{ ch: k, reading, meaning: m }} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
