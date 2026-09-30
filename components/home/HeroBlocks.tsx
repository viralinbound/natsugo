"use client";

import { useState } from "react";
import { speakJapanese } from "@/components/ui/SpeakButton";

const blocks = [
  { k: "日", r: "に", m: "sun", cls: "-rotate-6 translate-y-6", delay: "0s" },
  { k: "本", r: "ほん", m: "origin", cls: "rotate-3 -translate-y-4", delay: "-2s" },
  { k: "語", r: "ご", m: "language", cls: "-rotate-2 translate-y-8", delay: "-4s" },
];

// Hanging-scroll panel with three tappable wooden kanji blocks spelling 日本語.
export function HeroBlocks() {
  const [on, setOn] = useState<string | null>(null);

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="relative rounded-[2rem] border border-charcoal-100 bg-gradient-to-b from-surface to-bg-alt px-6 pb-10 pt-12 shadow-2xl shadow-indigo-950/10">
        <span aria-hidden className="absolute inset-x-8 -top-2 h-4 rounded-full bg-gradient-to-b from-[#8a5528] to-[#4d2b10] shadow-md" />
        <div className="flex items-start justify-center gap-4 sm:gap-5">
          {blocks.map((b) => (
            <button
              key={b.k}
              type="button"
              aria-label={`${b.k} (${b.r}) means ${b.m}. Tap to hear it`}
              onClick={() => {
                setOn(b.k);
                speakJapanese(b.k === "日" ? "にほんご" : b.r);
                window.setTimeout(() => setOn(null), 900);
              }}
              style={{ animationDelay: b.delay }}
              className={`hero-float ${b.cls}`}
            >
              <span className={`wood-block flex h-24 w-20 flex-col items-center justify-center gap-1 sm:h-32 sm:w-24 ${on === b.k ? "is-active" : ""}`}>
                <span className="font-mincho text-5xl font-bold leading-none sm:text-6xl">{b.k}</span>
                <span className="text-xs font-semibold text-charcoal-700">{b.m}</span>
              </span>
            </button>
          ))}
        </div>
        <p className="mt-10 text-center font-mincho text-2xl font-bold text-indigo-950">
          日本語 <span className="font-sans text-base font-semibold text-charcoal-500">· nihongo</span>
        </p>
        <p className="mt-1 text-center text-sm text-charcoal-500">Tap a block to hear it</p>
        <span aria-hidden className="hanko-seal absolute bottom-5 right-6 grid h-10 w-10 place-items-center font-mincho text-lg font-bold text-[#fff3e0]">夏</span>
      </div>
    </div>
  );
}
