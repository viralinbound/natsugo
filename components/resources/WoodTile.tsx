"use client";

import { Volume2 } from "lucide-react";
import { speakJapanese } from "@/components/ui/SpeakButton";
import { useSelectedCard } from "@/lib/selectedCard";

// A wooden block for a word or phrase. Tap it to hear it; the one you picked stays highlighted in indigo.
export function WoodTile({ jp, sub, en, speak, className = "" }: { jp: string; sub?: string; en: string; speak?: string; className?: string }) {
  const [selected, select] = useSelectedCard(`word-${jp}-${en}`);
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${jp}, ${en}. Tap to hear it`}
      onClick={() => {
        select();
        speakJapanese(speak ?? jp);
      }}
      className={`wood-block flex flex-col items-center justify-center gap-1 px-3 py-4 text-center ${selected ? "is-active" : ""} ${className}`}
    >
      <span className="font-jp text-2xl font-bold leading-tight break-words">{jp}</span>
      {sub ? <span className={`text-xs ${selected ? "text-white/80" : "text-charcoal-700"}`}>{sub}</span> : null}
      <span className={`text-sm font-semibold ${selected ? "text-white" : "text-charcoal-900"}`}>{en}</span>
      <Volume2 size={14} aria-hidden className={selected ? "text-white" : "text-sun-500"} />
    </button>
  );
}
