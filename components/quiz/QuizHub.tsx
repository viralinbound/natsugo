"use client";

import Link from "next/link";
import { useState } from "react";
import { Trophy } from "lucide-react";
import { levelQuizSets, quizLevels, quizTopics, type QuizLevel } from "@/lib/quizBank";
import { useHydrated } from "@/lib/useBrowserStore";

const levelInfo: Record<QuizLevel, { jp: string; desc: string }> = {
  N5: { jp: "入門", desc: "Absolute basics — kana, first words, simple sentences" },
  N4: { jp: "初級", desc: "Everyday conversation and core verb forms" },
  N3: { jp: "中級", desc: "The bridge to real-world Japanese" },
  N2: { jp: "中上級", desc: "Workplace and news-level Japanese" },
  N1: { jp: "上級", desc: "Advanced grammar, formal and written Japanese" },
};

function best(level: string, difficulty: string) {
  try {
    const v = localStorage.getItem(`np-quiz-best-${level}-${difficulty}`);
    return v === null ? null : Number(v);
  } catch {
    return null;
  }
}

export function QuizHub({ initial = "N5" }: { initial?: QuizLevel }) {
  const [level, setLevel] = useState<QuizLevel>(initial);
  const hydrated = useHydrated();

  return (
    <div>
      <div role="tablist" aria-label="JLPT level" className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {quizLevels.map((l) => {
          const done = hydrated ? levelQuizSets.filter((d) => (best(l, d.id) ?? -1) >= 7).length : 0;
          return (
            <button
              key={l}
              role="tab"
              aria-selected={level === l}
              onClick={() => setLevel(l)}
              className={`rounded-lg border-2 px-1 sm:px-4 py-2 sm:py-2.5 text-center sm:text-left min-h-[56px] transition-colors ${
                level === l ? "border-indigo-900 bg-indigo-900 text-white" : "border-charcoal-100 bg-surface text-charcoal-800 hover:border-indigo-700/40"
              }`}
            >
              <span className="block text-base sm:text-lg font-extrabold">{l}</span>
              <span className={`block font-jp text-[10px] sm:text-xs leading-tight ${level === l ? "text-sun-300" : "text-charcoal-500"}`}>
                <span className="hidden sm:inline">{levelInfo[l].jp} · </span>{done}/6 ✓
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-charcoal-700">
        <strong className="text-indigo-950">JLPT {level}:</strong> {levelInfo[level].desc}
      </p>

      <div role="tabpanel" className="mt-5">
        {(() => {
          const score = hydrated ? best(level, "full") : null;
          return (
            <Link
              href={`/jlpt-quiz/${level.toLowerCase()}/full`}
              className="group flex flex-col gap-3 rounded-xl border-2 border-indigo-700/30 bg-surface p-5 transition-colors hover:border-indigo-700 sm:flex-row sm:items-center sm:justify-between"
            >
              <span>
                <span className="font-jp text-2xl font-bold text-indigo-950">総合</span>
                <span className="ml-2 text-lg font-bold text-indigo-950">{level} full test</span>
                <span className="mt-1 block text-sm text-charcoal-500">10 questions, two from each topic. A quick check of your whole level.</span>
              </span>
              {score !== null ? (
                <span className={`inline-flex items-center gap-1 font-bold ${score >= 7 ? "text-success" : "text-charcoal-700"}`}><Trophy size={14} /> Best {score}/10</span>
              ) : (
                <span className="font-bold text-indigo-800 group-hover:underline">Start →</span>
              )}
            </Link>
          );
        })()}
      </div>

      <h2 id="topics" className="mt-10 scroll-mt-24 text-xl font-bold text-indigo-950">
        Practise by topic <span className="font-jp text-base text-charcoal-500">· 分野別</span>
      </h2>
      <p className="mt-1 text-sm text-charcoal-700">10 {level}-level questions on one topic, easiest first.</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {quizTopics.map((t) => {
          const score = hydrated ? best(level, t.id) : null;
          return (
            <Link
              key={t.id}
              href={`/jlpt-quiz/${level.toLowerCase()}/${t.id}`}
              className="group flex flex-col rounded-lg border-2 border-charcoal-100 bg-surface p-4 transition-colors hover:border-indigo-700/50"
            >
              <span className="font-jp text-2xl font-bold text-indigo-950">{t.jp}</span>
              <span className="mt-0.5 font-bold text-indigo-950">{t.label}</span>
              <span className="mt-1 text-xs text-charcoal-500">{t.desc}</span>
              <span className="mt-3 text-sm font-bold">
                {score !== null ? (
                  <span className={`inline-flex items-center gap-1 ${score >= 7 ? "text-success" : "text-charcoal-700"}`}>
                    <Trophy size={14} /> {score}/10
                  </span>
                ) : (
                  <span className="text-indigo-800 group-hover:underline">Start →</span>
                )}
              </span>
            </Link>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-charcoal-500">Every quiz has its own questions. Score 7/10 or more to tick a set off. Best scores are saved on this device.</p>
    </div>
  );
}
