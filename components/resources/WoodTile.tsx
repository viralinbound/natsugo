"use client";

import { useState } from "react";
import { speakJapanese } from "@/components/ui/SpeakButton";

// A wooden block for a word or phrase. Tap it to hear it; it presses down and turns lacquer red for a moment.
export function WoodTile({ jp, sub, en, speak, className = "" }: { jp: string; sub?: string; en: string; speak?: string; className?: string }) {
  const [on, setOn] = useState(false);

  return (
    <button
      type="button"
      aria-label={`${jp}, ${en}. Tap to hear it`}
      onClick={() => {
        setOn(true);
        speakJapanese(speak ?? jp);
        window.setTimeout(() => setOn(false), 900);
      }}
      className={`wood-block flex flex-col items-center justify-center gap-1 px-3 py-4 text-center ${on ? "is-active" : ""} ${className}`}
    >
      <span className="font-jp text-2xl font-bold leading-tight break-words">{jp}</span>
      {sub ? <span className="text-xs text-charcoal-700">{sub}</span> : null}
      <span className="text-sm font-semibold text-charcoal-900">{en}</span>
    </button>
  );
}
