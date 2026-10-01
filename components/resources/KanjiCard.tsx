"use client";

import { Volume2 } from "lucide-react";
import { speakJapanese } from "@/components/ui/SpeakButton";

// A whole wooden kanji card is the tap target: it reads the kanji aloud.
export function KanjiCard({ k, m, r }: { k: string; m: string; r: string }) {
  return (
    <button type="button" onClick={() => speakJapanese(r.split("・")[0])} aria-label={`${k}: ${m}. Listen`} className="wood-block group w-full p-4 text-center">
      <span className="block font-jp text-5xl">{k}</span>
      <span className="mt-2 block font-semibold text-charcoal-900">{m}</span>
      <span className="mt-1 flex items-center justify-center gap-1.5 font-jp text-sm text-charcoal-500">
        {r} <Volume2 size={15} className="text-indigo-700 transition-transform group-hover:scale-125" aria-hidden />
      </span>
    </button>
  );
}
