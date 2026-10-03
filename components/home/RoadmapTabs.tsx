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
  const target = useRef(0);
  const shown = useRef(0);
  const raf = useRef(0);
  const cur = levels[sel];
  const n = levels.length;

  // Scrolling through the tall wrapper walks the path from N5 to N1 while the panel stays pinned.
  // The crest and the line ease towards the scroll position, so they glide instead of jumping,
  // and the level card changes exactly when the crest is closest to the next circle.
  useEffect(() => {
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = () => {
      const diff = target.current - shown.current;
      shown.current = Math.abs(diff) < 0.05 || calm ? target.current : shown.current + diff * 0.2;
      setPct(shown.current);
      setSel(Math.min(n - 1, Math.round((shown.current / 100) * (n - 1))));
      raf.current = Math.abs(target.current - shown.current) > 0.05 ? requestAnimationFrame(step) : 0;
    };
    const onScroll = () => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const range = r.height - innerHeight;
      if (range <= 0) return;
      target.current = Math.min(1, Math.max(0, -r.top / range)) * 100;
      if (!raf.current) raf.current = requestAnimationFrame(step);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [n]);

  // Glide to a level with an eased scroll. The crest follows the page, so it travels along the line
  // in time with the scroll, and tapping a circle or "Scroll for N3" goes straight there.
  const jump = (i: number) => {
    const el = wrap.current;
    if (!el) return setSel(i);
    const range = el.offsetHeight - innerHeight;
    const to = el.getBoundingClientRect().top + scrollY + range * (i / (n - 1)) + 1;
    const from = scrollY;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return window.scrollTo({ top: to, behavior: "instant" });
    const dur = Math.min(1600, 700 + Math.abs(to - from) * 0.35);
    let t0 = -1;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const tick = (now: number) => {
      if (t0 < 0) t0 = now;
      const t = Math.min(1, (now - t0) / dur);
      // `instant` so the page-wide smooth scrolling doesn't fight this eased animation.
      window.scrollTo({ top: from + (to - from) * ease(t), behavior: "instant" });
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return (
    <div ref={wrap} className="relative mt-6" style={{ height: `calc(100vh + ${n * 55}vh)` }}>
    <div className="sticky isolate top-16 flex min-h-[calc(100dvh-8.5rem)] flex-col justify-center pt-4 lg:top-24 lg:min-h-[calc(100dvh-7rem)]">
      <span aria-hidden key={`num-${cur.level}`} className="pop-in pointer-events-none absolute bottom-0 right-0 -z-10 select-none font-mincho text-[9rem] font-bold leading-none text-sun-400/15 sm:text-[13rem] lg:text-[15rem]">
        {NUMERALS[sel]}
      </span>
      <div className="relative mx-auto w-full max-w-3xl px-2">
        <div aria-hidden className="absolute inset-x-[10%] top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-charcoal-100">
          <div className="gradient-strip h-full rounded-full" style={{ width: `${pct}%` }} />
          {/* A sakura crest (kamon) rides the line and turns as you scroll. */}
          <span aria-hidden className="road-sakura absolute top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-surface ring-2 ring-indigo-700" style={{ left: `${pct}%` }}>
            <svg viewBox="-12 -12 24 24" className="h-6 w-6" style={{ transform: `rotate(${pct * 3.6}deg)` }}>
              {[0, 72, 144, 216, 288].map((a) => (
                <path key={a} transform={`rotate(${a})`} d="M0 -1.5 C -4.6 -4 -5 -9 -2.2 -10.6 L 0 -9 L 2.2 -10.6 C 5 -9 4.6 -4 0 -1.5 Z" className="fill-indigo-700" />
              ))}
              <circle r="1.9" className="fill-surface" />
            </svg>
          </span>
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
        {sel < n - 1 ? (
          <button type="button" onClick={() => jump(sel + 1)} className="group inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3 text-sun-500 transition-colors hover:bg-sun-100">
            Scroll for {levels[sel + 1].level} <ChevronDown size={16} className="animate-bounce group-hover:animate-none" />
          </button>
        ) : (
          <button type="button" onClick={() => jump(0)} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3 text-sun-500 transition-colors hover:bg-sun-100">
            You reached N1 · 完了 · back to N5
          </button>
        )}
      </div>
    </div>
    </div>
  );
}
