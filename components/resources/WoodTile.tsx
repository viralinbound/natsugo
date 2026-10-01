"use client";

import { HearButton } from "@/components/ui/HearButton";

// A wooden block for a word or phrase, with a speaker in the corner to hear it.
export function WoodTile({ jp, sub, en, speak, className = "" }: { jp: string; sub?: string; en: string; speak?: string; className?: string }) {
  return (
    <div className={`wood-block relative flex flex-col items-center justify-center gap-1 px-3 py-4 pt-6 text-center ${className}`}>
      <HearButton text={speak ?? jp} label={`Hear ${jp}, ${en}`} />
      <span className="font-jp text-2xl font-bold leading-tight break-words">{jp}</span>
      {sub ? <span className="text-xs text-charcoal-700">{sub}</span> : null}
      <span className="text-sm font-semibold text-charcoal-900">{en}</span>
    </div>
  );
}
