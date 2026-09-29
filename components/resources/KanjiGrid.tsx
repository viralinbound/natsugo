"use client";

import { speakJapanese } from "@/components/ui/SpeakButton";

export function KanjiGrid({ kanji, hints }: { kanji: string[]; hints: Map<string, string> }) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3">
      {kanji.map((k, i) => (
        <button
          key={`${k}-${i}`}
          type="button"
          onClick={() => speakJapanese(k)}
          title={hints.get(k) ?? "Tap to hear this kanji"}
          className="card-modern group aspect-square flex items-center justify-center hover:border-sun-400 transition-colors"
        >
          <span className="font-jp text-2xl sm:text-3xl text-indigo-950 group-hover:text-sun-500">{k}</span>
        </button>
      ))}
    </div>
  );
}
