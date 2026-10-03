"use client";

import { useState } from "react";
import { PenLine, RotateCcw, Volume2 } from "lucide-react";
import { StrokeOrder } from "@/components/japan/StrokeOrder";
import { KanjiPractice } from "@/components/japan/KanjiPractice";
import { speakJapanese } from "@/components/ui/SpeakButton";
import { TranslateCard } from "@/components/home/TranslateCard";

const kanji = [
  { k: "学", r: "まなぶ", romaji: "manabu", m: "to learn" },
  { k: "夢", r: "ゆめ", romaji: "yume", m: "dream" },
  { k: "話", r: "はなす", romaji: "hanasu", m: "to speak" },
  { k: "道", r: "みち", romaji: "michi", m: "the way, path" },
  { k: "友", r: "とも", romaji: "tomo", m: "friend" },
];

// Hero card with two tabs: translate a name or word into hiragana, kanji and katakana, or watch a kanji being brushed.
export function HeroStudio() {
  const [tab, setTab] = useState<"name" | "kanji">("name");
  const [pick, setPick] = useState(0);
  const [speed, setSpeed] = useState(0.6);
  const [replay, setReplay] = useState(0);
  const [practise, setPractise] = useState(false);
  const k = kanji[pick];

  return (
    <div className="relative mx-auto w-full max-w-sm md:ml-auto md:max-w-none lg:max-w-[22rem]">
      <div className="rounded-3xl border border-white/60 bg-surface p-4 shadow-[0_24px_60px_-28px_rgb(11_27_58/0.35)] sm:p-5">
        <div role="tablist" aria-label="Try Japanese" className="grid grid-cols-2 gap-1 rounded-xl border border-charcoal-100 bg-bg-alt p-1">
          {([
            ["name", "翻訳", "Translate"],
            ["kanji", "書道", "Brush kanji"],
          ] as const).map(([id, jp, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`flex min-h-[38px] items-center justify-center gap-1.5 rounded-lg text-[13px] font-bold transition-colors duration-200 ${tab === id ? "bg-[#0a6fd1] text-white shadow-sm" : "text-charcoal-700 hover:bg-surface hover:text-indigo-600"}`}
            >
              <span className="font-jp">{jp}</span> {label}
            </button>
          ))}
        </div>

        {tab === "name" ? (
          <TranslateCard />
        ) : (
          <div role="tabpanel" className="mt-4">
            <div className="flex items-center gap-4 rounded-2xl bg-bg-alt p-4">
              <button type="button" onClick={() => speakJapanese(k.r)} aria-label={`Hear ${k.k}`} className="relative h-28 w-28 shrink-0 rounded-xl border-2 border-dashed border-hanko/30 bg-surface text-indigo-950 ">
                <span aria-hidden className="absolute inset-x-0 top-1/2 border-t border-dashed border-hanko/20" />
                <span aria-hidden className="absolute inset-y-0 left-1/2 border-l border-dashed border-hanko/20" />
                <StrokeOrder ch={k.k} speed={speed} replay={replay} className="relative h-full w-full p-2" />
              </button>
              <div className="min-w-0">
                <button type="button" onClick={() => speakJapanese(k.r)} className="font-jp text-2xl font-bold text-indigo-950 hover:text-indigo-700">{k.r}</button>
                <p className="text-sm text-charcoal-500">{k.romaji}</p>
                <p className="mt-1 font-bold text-indigo-950">{k.m}</p>
                <button type="button" onClick={() => speakJapanese(k.r)} className="mt-2 inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-charcoal-100 px-3 text-sm font-bold text-indigo-950 hover:border-indigo-700">
                  <Volume2 size={15} /> Hear it
                </button>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-charcoal-500">Speed</span>
              {([[0.35, "Very slow"], [0.6, "Slow"], [1, "Normal"]] as const).map(([v, l]) => (
                <button key={v} type="button" onClick={() => setSpeed(v)} aria-pressed={speed === v} className={`min-h-[32px] rounded-full px-3 text-xs font-bold ${speed === v ? "bg-indigo-900 text-white" : "bg-bg-alt text-charcoal-700"}`}>{l}</button>
              ))}
              <button type="button" onClick={() => setReplay((r) => r + 1)} className="ml-auto inline-flex min-h-[32px] items-center gap-1 rounded-full bg-bg-alt px-3 text-xs font-bold text-indigo-950"><RotateCcw size={13} /> Replay</button>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm font-bold text-indigo-950"><PenLine size={15} className="text-hanko" /> Pick a kanji, then practise writing it</p>
            <div className="mt-2 grid grid-cols-5 gap-2">
              {kanji.map((x, i) => (
                <button
                  key={x.k}
                  type="button"
                  onClick={() => {
                    setPick(i);
                    speakJapanese(x.r);
                  }}
                  aria-label={`${x.k}: ${x.m}`}
                  className={`aspect-square rounded-xl border-2 font-mincho text-2xl font-bold transition-colors ${i === pick ? "border-indigo-900 bg-indigo-900 text-white" : "border-charcoal-100 bg-surface text-indigo-950 hover:border-indigo-700"}`}
                >
                  {x.k}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setPractise(true)} className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border-2 border-indigo-900 text-sm font-bold text-indigo-950 transition-colors hover:bg-indigo-900 hover:text-white">
              <PenLine size={16} /> Practise writing {k.k} on the board
            </button>
            {practise ? <KanjiPractice item={{ ch: k.k, reading: k.r, meaning: k.m }} onClose={() => setPractise(false)} nav={{ index: pick, total: kanji.length, onPrev: () => setPick((pick + kanji.length - 1) % kanji.length), onNext: () => setPick((pick + 1) % kanji.length) }} /> : null}
          </div>
        )}

      </div>
    </div>
  );
}
