"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Copy, PenLine, RotateCcw, Share2, Volume2 } from "lucide-react";
import { StrokeOrder } from "@/components/japan/StrokeOrder";
import { KanjiPractice } from "@/components/japan/KanjiPractice";
import { speakJapanese } from "@/components/ui/SpeakButton";
import { toKatakana } from "@/lib/katakana";
import { site } from "@/lib/site";

const kanji = [
  { k: "学", r: "まなぶ", romaji: "manabu", m: "to learn" },
  { k: "夢", r: "ゆめ", romaji: "yume", m: "dream" },
  { k: "話", r: "はなす", romaji: "hanasu", m: "to speak" },
  { k: "道", r: "みち", romaji: "michi", m: "the way, path" },
  { k: "友", r: "とも", romaji: "tomo", m: "friend" },
];

// Hero card with two tabs: write your name in katakana, or watch a kanji being brushed.
export function HeroStudio() {
  const [tab, setTab] = useState<"name" | "kanji">("name");
  const [name, setName] = useState("");
  const [pick, setPick] = useState(0);
  const [copied, setCopied] = useState(false);
  const [speed, setSpeed] = useState(0.6);
  const [replay, setReplay] = useState(0);
  const [practise, setPractise] = useState(false);
  const kana = toKatakana(name);
  const k = kanji[pick];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(kana);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-[30rem]">
      <div className="rounded-3xl border border-white/60 bg-surface p-5 shadow-[0_24px_60px_-28px_rgb(11_27_58/0.35)] sm:p-6">
        <div role="tablist" aria-label="Try Japanese" className="grid grid-cols-2 gap-1 rounded-xl bg-bg-alt p-1">
          {([
            ["name", "名前", "Your name"],
            ["kanji", "書道", "Brush kanji"],
          ] as const).map(([id, jp, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`flex min-h-[44px] items-center justify-center gap-2 rounded-lg text-sm font-bold transition-colors ${tab === id ? "bg-surface text-indigo-950 shadow" : "text-charcoal-500 hover:text-indigo-950"}`}
            >
              <span className="font-jp">{jp}</span> {label}
            </button>
          ))}
        </div>

        {tab === "name" ? (
          <div role="tabpanel" className="pop-in mt-5">
            <label htmlFor="hero-name" className="text-sm font-bold text-indigo-950">See your name in Japanese</label>
            <input
              id="hero-name"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 24))}
              placeholder="Type your name, e.g. Priya"
              autoComplete="off"
              className="mt-2 w-full rounded-xl border-2 border-charcoal-100 bg-surface px-4 py-3 text-base text-indigo-950 outline-none transition-colors focus:border-indigo-700"
            />
            <div className="mt-4 flex min-h-[120px] flex-col items-center justify-center rounded-2xl bg-bg-alt px-4 py-5 text-center">
              {kana ? (
                <>
                  <button type="button" key={kana} onClick={() => speakJapanese(kana)} aria-label={`Hear ${kana}`} className="pop-in break-all font-jp text-5xl font-bold leading-tight text-indigo-950 transition-transform hover:scale-105 sm:text-6xl">{kana}</button>
                  <p className="mt-2 text-xs text-charcoal-500">Written in katakana, the script Japan uses for foreign names</p>
                </>
              ) : (
                <>
                  <button type="button" onClick={() => speakJapanese("なまえ")} aria-label="Hear namae" className="font-jp text-5xl font-bold text-charcoal-300">ナマエ</button>
                  <p className="mt-2 text-xs text-charcoal-500">“namae” means name</p>
                </>
              )}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button type="button" disabled={!kana} onClick={() => speakJapanese(kana)} className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border border-charcoal-100 text-sm font-bold text-indigo-950 transition-colors hover:border-indigo-700 disabled:opacity-40">
                <Volume2 size={16} /> Hear
              </button>
              <button type="button" disabled={!kana} onClick={copy} className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border border-charcoal-100 text-sm font-bold text-indigo-950 transition-colors hover:border-indigo-700 disabled:opacity-40">
                {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />} {copied ? "Copied" : "Copy"}
              </button>
              <a
                href={kana ? `https://wa.me/?text=${encodeURIComponent(`My name in Japanese is ${kana}! Find yours at ${site.url}`)}` : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!kana}
                className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg bg-[#15803d] text-sm font-bold text-white ${kana ? "" : "pointer-events-none opacity-40"}`}
              >
                <Share2 size={16} /> Share
              </a>
            </div>
          </div>
        ) : (
          <div role="tabpanel" className="mt-5">
            <div className="flex items-center gap-4 rounded-2xl bg-bg-alt p-4">
              <button type="button" onClick={() => speakJapanese(k.r)} aria-label={`Hear ${k.k}`} className="relative h-32 w-32 shrink-0 rounded-xl border-2 border-dashed border-hanko/30 bg-surface text-indigo-950 sm:h-36 sm:w-36">
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
            {practise ? <KanjiPractice item={{ ch: k.k, reading: k.r, meaning: k.m }} onClose={() => setPractise(false)} /> : null}
          </div>
        )}

        <Link href="/resources/kanji" className="mt-5 flex min-h-[44px] items-center justify-between rounded-xl bg-indigo-900 px-4 text-sm font-bold text-white transition-colors hover:bg-indigo-700">
          Start learning kana and kanji free <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
