"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { toKatakana } from "@/lib/kana";
import { speakJapanese } from "@/components/ui/SpeakButton";
import { fireConfetti } from "@/lib/confetti";

export function KanaPlayground() {
  const [name, setName] = useState("");
  const kana = toKatakana(name || "Natsugo");

  return (
    <div className="mt-8 max-w-xl rounded-2xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur-md animate-fade-up [animation-delay:300ms]">
      <label htmlFor="kana-name" className="text-xs font-bold uppercase tracking-wider text-sun-300">
        Try it: your name in katakana
      </label>
      <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          id="kana-name"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 24))}
          placeholder="Type your name"
          autoComplete="off"
          className="min-h-[46px] flex-1 rounded-lg border border-white/20 bg-black/20 px-3.5 text-white placeholder:text-white/40 focus:border-sun-300 focus:outline-none"
        />
        <div className="flex items-center gap-3">
          <p key={kana} aria-live="polite" className="pop-in min-w-[3ch] font-jp text-3xl font-bold text-gradient-anim">
            {kana}
          </p>
          <button
            type="button"
            aria-label="Hear it"
            onClick={(e) => {
              speakJapanese(kana);
              const r = e.currentTarget.getBoundingClientRect();
              fireConfetti({ x: r.left + r.width / 2, y: r.top + r.height / 2, count: 34, spread: 0.7 });
            }}
            className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-sun-400 to-cyan-400 text-white shadow-lg shadow-sun-400/30"
          >
            <Volume2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
