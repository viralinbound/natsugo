"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Languages } from "lucide-react";

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
export function RoadmapTabs({ levels }: { levels: RoadmapLevel[] }) {
  const [sel, setSel] = useState(0);
  const cur = levels[sel];
  const pct = (sel / (levels.length - 1)) * 100;

  return (
    <div className="mt-10">
      <div className="relative mx-auto max-w-3xl px-2">
        <div aria-hidden className="absolute inset-x-[10%] top-1/2 h-1 -translate-y-1/2 rounded-full bg-charcoal-100">
          <div className="gradient-strip h-full rounded-full transition-[width] duration-500" style={{ width: `${pct}%` }} />
        </div>
        <div role="tablist" aria-label="JLPT levels" className="relative grid grid-cols-5">
          {levels.map((l, i) => (
            <div key={l.level} className="flex justify-center">
              <button
                type="button"
                role="tab"
                aria-selected={i === sel}
                aria-controls="roadmap-panel"
                onClick={() => setSel(i)}
                className={`grid h-12 w-12 place-items-center rounded-full border-2 text-sm font-extrabold transition-all sm:h-14 sm:w-14 ${
                  i === sel
                    ? "scale-110 border-transparent bg-gradient-to-br from-sun-400 to-cyan-400 text-white shadow-lg shadow-sun-400/40"
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

      <div id="roadmap-panel" role="tabpanel" key={cur.level} className="pop-in mx-auto mt-8 max-w-4xl rounded-3xl border border-charcoal-100 bg-surface p-6 shadow-xl shadow-indigo-950/5 sm:p-8">
        <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:gap-10">
          <div>
            <span className="inline-flex rounded-full bg-sun-100 px-3 py-1 text-xs font-bold text-sun-500">JLPT {cur.level}</span>
            <h3 className="mt-3 text-2xl font-bold text-indigo-950">{cur.tagline}</h3>
            <p className="mt-2 text-charcoal-700">{cur.focus}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cur.areas.map((a) => (
                <span key={a} className="rounded-full border border-charcoal-100 px-3 py-1 text-sm text-charcoal-700">
                  {a}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-3 md:grid-cols-1">
              {[
                { icon: Languages, k: "Vocabulary", v: cur.vocab },
                { icon: BookOpen, k: "Kanji", v: cur.kanji },
                { icon: Clock, k: "Study time", v: cur.hours },
              ].map(({ icon: Icon, k, v }) => (
                <div key={k} className="flex items-center gap-3 rounded-xl bg-bg-alt px-3 py-2.5">
                  <Icon size={17} className="shrink-0 text-sun-500" />
                  <div>
                    <dt className="text-xs text-charcoal-500">{k}</dt>
                    <dd className="font-semibold text-indigo-950">{v}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-1 flex flex-col gap-2 sm:flex-row md:flex-col">
              <Link
                href={`/jlpt-${cur.level.toLowerCase()}`}
                className="btn-shine inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-sun-400 to-cyan-400 px-4 font-bold text-white"
              >
                View {cur.level} course <ArrowRight size={16} />
              </Link>
              <Link
                href={`/jlpt-quiz/${cur.level.toLowerCase()}/easy`}
                className="inline-flex min-h-[46px] flex-1 items-center justify-center rounded-md border-2 border-charcoal-300 px-4 font-bold text-indigo-950 hover:border-sun-400 hover:text-sun-500"
              >
                Free {cur.level} quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
