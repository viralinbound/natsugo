"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Copy, PenLine, Share2, Volume2 } from "lucide-react";
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
      <div className="rounded-3xl border border-white/60 bg-surface/90 p-5 shadow-[0_30px_80px_-30px_rgb(11_27_58/0.45)] backdrop-blur-md sm:p-6">
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
                  <p key={kana} className="pop-in break-all font-jp text-5xl font-bold leading-tight text-indigo-950 sm:text-6xl">{kana}</p>
                  <p className="mt-2 text-xs text-charcoal-500">Written in katakana, the script Japan uses for foreign names</p>
                </>
              ) : (
                <>
                  <p className="font-jp text-5xl font-bold text-charcoal-300">ナマエ</p>
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
              <svg key={k.k} viewBox="0 0 120 120" className="h-32 w-32 shrink-0 sm:h-36 sm:w-36" aria-label={`${k.k}: ${k.m}`}>
                <rect x="4" y="4" width="112" height="112" rx="10" fill="none" stroke="currentColor" className="text-hanko/30" strokeDasharray="4 4" />
                <line x1="60" y1="8" x2="60" y2="112" stroke="currentColor" className="text-hanko/20" strokeDasharray="3 5" />
                <line x1="8" y1="60" x2="112" y2="60" stroke="currentColor" className="text-hanko/20" strokeDasharray="3 5" />
                <text x="60" y="64" textAnchor="middle" dominantBaseline="middle" className="brush-kanji font-mincho text-indigo-950" fontSize="92" fontWeight="700">
                  {k.k}
                </text>
              </svg>
              <div className="min-w-0">
                <p className="font-jp text-2xl font-bold text-indigo-950">{k.r}</p>
                <p className="text-sm text-charcoal-500">{k.romaji}</p>
                <p className="mt-1 font-bold text-indigo-950">{k.m}</p>
                <button type="button" onClick={() => speakJapanese(k.r)} className="mt-2 inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-charcoal-100 px-3 text-sm font-bold text-indigo-950 hover:border-indigo-700">
                  <Volume2 size={15} /> Hear it
                </button>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm font-bold text-indigo-950"><PenLine size={15} className="text-hanko" /> Pick a kanji to paint</p>
            <div className="mt-2 grid grid-cols-5 gap-2">
              {kanji.map((x, i) => (
                <button
                  key={x.k}
                  type="button"
                  onClick={() => setPick(i)}
                  aria-label={`${x.k}: ${x.m}`}
                  className={`aspect-square rounded-xl border-2 font-mincho text-2xl font-bold transition-colors ${i === pick ? "border-indigo-900 bg-indigo-900 text-white" : "border-charcoal-100 bg-surface text-indigo-950 hover:border-indigo-700"}`}
                >
                  {x.k}
                </button>
              ))}
            </div>
          </div>
        )}

        <Link href="/resources/kanji" className="mt-5 flex min-h-[44px] items-center justify-between rounded-xl bg-indigo-900 px-4 text-sm font-bold text-white transition-colors hover:bg-indigo-700">
          Start learning kana and kanji free <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
