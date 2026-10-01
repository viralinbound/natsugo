"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronDown, Clock, Languages } from "lucide-react";

export interface RoadmapLevel {
  level: string;
  tagline: string;
  focus: string;
  areas: string[];
  vocab: string;
  kanji: string;
  hours: string;
}

// N5 to N1 as a clickable path; the chosen level's details show underneath.
const NUMERALS = ["五", "四", "三", "二", "一"];

export function RoadmapTabs({ levels }: { levels: RoadmapLevel[] }) {
  const [sel, setSel] = useState(0);
  const [pct, setPct] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const cur = levels[sel];
  const n = levels.length;

  // Scrolling through the tall wrapper walks the path from N5 to N1 while the panel stays pinned.
  useEffect(() => {
    const onScroll = () => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const range = r.height - innerHeight;
      if (range <= 0) return;
      const p = Math.min(1, Math.max(0, -r.top / range));
      setPct(p * 100);
      setSel(Math.min(n - 1, Math.floor(p * n)));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, [n]);

  const jump = (i: number) => {
    const el = wrap.current;
    if (!el) return setSel(i);
    const range = el.offsetHeight - innerHeight;
    const top = el.getBoundingClientRect().top + scrollY + range * ((i + 0.5) / n);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div ref={wrap} className="relative mt-6" style={{ height: `calc(100vh + ${n * 55}vh)` }}>
    <div className="sticky isolate top-16 flex min-h-[calc(100dvh-8.5rem)] flex-col justify-center pt-4 lg:top-24 lg:min-h-[calc(100dvh-7rem)]">
      <span aria-hidden key={`num-${cur.level}`} className="pop-in pointer-events-none absolute bottom-0 right-0 -z-10 select-none font-mincho text-[9rem] font-bold leading-none text-sun-400/15 sm:text-[13rem] lg:text-[15rem]">
        {NUMERALS[sel]}
      </span>
      <div className="relative mx-auto w-full max-w-3xl px-2">
        <div aria-hidden className="absolute inset-x-[10%] top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-charcoal-100">
          <div className="gradient-strip h-full rounded-full shadow-[0_0_12px_rgba(34,211,238,0.6)] transition-[width] duration-150" style={{ width: `${pct}%` }} />
          <span className="road-comet absolute top-1/2 h-8 w-16 -translate-y-1/2 transition-[left] duration-150" style={{ left: `calc(${pct}% - 4rem)` }} />
          <span className="road-dot absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-hanko transition-[left] duration-150" style={{ left: `${pct}%` }} />
        </div>
        <div role="tablist" aria-label="JLPT levels" className="relative z-10 grid grid-cols-5">
          {levels.map((l, i) => (
            <div key={l.level} className="flex justify-center">
              <button
                type="button"
                role="tab"
                aria-selected={i === sel}
                aria-controls="roadmap-panel"
                onClick={() => jump(i)}
                className={`grid h-9 w-9 place-items-center rounded-full border-2 text-[11px] font-semibold transition-all sm:h-14 sm:w-14 sm:text-sm ${
                  i === sel
                    ? "scale-110 border-transparent bg-indigo-700 text-white shadow-sm"
                    : i < sel
                      ? "border-sun-400 bg-sun-100 text-sun-500"
                      : "border-charcoal-100 bg-surface text-charcoal-500 hover:border-sun-400"
                }`}
              >
                {l.level}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div id="roadmap-panel" role="tabpanel" key={cur.level} className="pop-in mx-auto mt-6 w-full max-w-4xl rounded-3xl border border-charcoal-100 bg-surface p-5 shadow-xl shadow-indigo-950/5 sm:mt-8 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
          <div>
            <span className="inline-flex rounded-full bg-sun-100 px-3 py-1 text-xs font-bold text-sun-500">JLPT {cur.level}</span>
            <h3 className="mt-3 text-xl font-bold text-indigo-950 sm:text-2xl">{cur.tagline}</h3>
            <p className="mt-2 text-sm text-charcoal-700 sm:text-base">{cur.focus}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cur.areas.map((a) => (
                <span key={a} className="rounded-full border border-charcoal-100 px-3 py-1 text-sm text-charcoal-700">
                  {a}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <dl className="grid grid-cols-3 gap-2 text-sm lg:grid-cols-1">
              {[
                { icon: Languages, k: "Vocabulary", v: cur.vocab },
                { icon: BookOpen, k: "Kanji", v: cur.kanji },
                { icon: Clock, k: "Study time", v: cur.hours },
              ].map(({ icon: Icon, k, v }) => (
                <div key={k} className="flex items-center gap-3 rounded-xl bg-bg-alt px-3 py-2.5">
                  <Icon size={17} className="hidden shrink-0 text-sun-500 sm:block" />
                  <div>
                    <dt className="text-xs text-charcoal-500">{k}</dt>
                    <dd className="text-xs font-semibold text-indigo-950 sm:text-sm">{v}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-1 flex flex-row gap-2 lg:flex-col">
              <Link
                href={`/jlpt-${cur.level.toLowerCase()}`}
                className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-md bg-indigo-700 hover:bg-[#0a6fd1] px-4 font-bold text-white"
              >
                {cur.level} course <ArrowRight size={16} />
              </Link>
              <Link
                href={`/jlpt-quiz?level=${cur.level.toLowerCase()}#topics`}
                className="inline-flex min-h-[46px] flex-1 items-center justify-center rounded-md border-2 border-charcoal-300 px-4 font-bold text-indigo-950 hover:border-sun-400 hover:text-sun-500"
              >
                Free quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-3 text-sm font-semibold text-charcoal-500">
        <span>Level {sel + 1} of {n}</span>
        <span aria-hidden className="h-1 w-1 rounded-full bg-charcoal-300" />
        <span className="flex items-center gap-1.5 text-sun-500">
          {sel < n - 1 ? <>Scroll for {levels[sel + 1].level} <ChevronDown size={16} className="animate-bounce" /></> : "You reached N1 · 完了"}
        </span>
      </div>
    </div>
    </div>
  );
}
