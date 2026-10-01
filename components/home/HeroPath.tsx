"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CalendarDays, Clock, Headphones, Languages } from "lucide-react";
import { speakJapanese } from "@/components/ui/SpeakButton";

const levels = [
  { level: "N5", name: "Beginner", jp: "入門", kanji: "~100 kanji", hours: "~150 hrs", can: "Introduce yourself, read hiragana & katakana, order food." },
  { level: "N4", name: "Elementary", jp: "初級", kanji: "~300 kanji", hours: "~300 hrs", can: "Talk about your day, make plans, follow slow conversations." },
  { level: "N3", name: "Intermediate", jp: "中級", kanji: "~650 kanji", hours: "~450 hrs", can: "Handle everyday life in Japan and read simple articles." },
  { level: "N2", name: "Upper-intermediate", jp: "中上級", kanji: "~1,000 kanji", hours: "~600 hrs", can: "Work in a Japanese office and follow the news." },
  { level: "N1", name: "Advanced", jp: "上級", kanji: "~2,000 kanji", hours: "~900 hrs", can: "Read formal texts and discuss complex topics fluently." },
];

// Interactive hero panel: tap a level to see what it means and jump to its course.
export function HeroPath() {
  const [sel, setSel] = useState(0);
  const cur = levels[sel];

  return (
    <div className="relative mx-auto w-full max-w-md pt-6 lg:max-w-[30rem]">
      <span aria-hidden className="pointer-events-none absolute -right-2 -top-6 font-jp text-[8rem] font-bold leading-none text-indigo-700/[0.07] sm:text-[10rem]">日本語</span>

      <button
        type="button"
        onClick={() => speakJapanese("ありがとう")}
        className="hero-float absolute -left-3 top-0 z-10 hidden items-center gap-3 rounded-2xl border border-charcoal-100 bg-surface px-4 py-2.5 text-left shadow-xl transition-transform hover:scale-105 sm:flex lg:-left-10"
        aria-label="Listen: arigatō, thank you"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-sun-100 text-indigo-700"><Headphones size={17} /></span>
        <span>
          <span className="block font-jp text-lg font-bold leading-tight text-indigo-950">ありがとう</span>
          <span className="block text-xs text-charcoal-500">Tap to hear · thank you</span>
        </span>
      </button>

      <div className="relative rounded-3xl border border-charcoal-100 bg-surface p-5 pt-8 shadow-[0_30px_80px_-30px_rgb(11_27_58/0.35)] sm:p-6 sm:pt-14">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Your path to fluency</p>
            <p className="mt-1 text-lg font-extrabold text-indigo-950">Tap a level to explore</p>
          </div>
          <span className="font-jp text-3xl font-bold text-indigo-700/80">{cur.jp}</span>
        </div>

        <div role="tablist" aria-label="JLPT levels" className="relative mt-5 grid grid-cols-5 gap-2">
          <span aria-hidden className="absolute left-[10%] right-[10%] top-1/2 h-1 -translate-y-1/2 rounded-full bg-bg-alt" />
          <span aria-hidden className="gradient-strip absolute left-[10%] top-1/2 h-1 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: `${(sel / 4) * 80}%` }} />
          {levels.map((l, i) => (
            <button
              key={l.level}
              role="tab"
              aria-selected={sel === i}
              onClick={() => setSel(i)}
              className={`relative z-10 mx-auto grid h-12 w-12 place-items-center rounded-full border-2 text-sm font-extrabold transition-all ${
                i === sel
                  ? "scale-110 border-indigo-900 bg-indigo-900 text-white shadow-lg"
                  : i < sel
                    ? "border-indigo-700 bg-sun-100 text-indigo-800"
                    : "border-charcoal-100 bg-surface text-charcoal-500 hover:border-indigo-700/50"
              }`}
            >
              {l.level}
            </button>
          ))}
        </div>

        <div key={cur.level} role="tabpanel" className="pop-in mt-5 rounded-2xl bg-bg-alt p-4">
          <p className="font-bold text-indigo-950">{cur.level} · {cur.name}</p>
          <p className="mt-1 text-sm text-charcoal-700">{cur.can}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-charcoal-700">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1"><Languages size={13} className="text-indigo-700" /> {cur.kanji}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1"><Clock size={13} className="text-indigo-700" /> {cur.hours} of study</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm text-charcoal-500">
            <CalendarDays size={15} className="text-indigo-700" /> Live batches every week
          </p>
          <Link href={`/jlpt-${cur.level.toLowerCase()}`} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md bg-indigo-900 px-4 text-sm font-bold text-white transition-colors hover:bg-indigo-700">
            Explore {cur.level} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
