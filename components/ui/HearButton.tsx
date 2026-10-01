"use client";

import { Volume2 } from "lucide-react";
import { speakJapanese } from "@/components/ui/SpeakButton";

// Small round speaker in the corner of a card. Sound only plays from here, never from tapping the card.
export function HearButton({ text, label, className = "" }: { text: string; label?: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speakJapanese(text);
      }}
      aria-label={label ?? `Hear ${text}`}
      className={`absolute right-1.5 top-1.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-surface/90 text-indigo-700 shadow-sm ring-1 ring-charcoal-100 transition-all duration-200 hover:scale-110 hover:bg-surface hover:text-indigo-900 ${className}`}
    >
      <Volume2 size={15} aria-hidden />
    </button>
  );
}
