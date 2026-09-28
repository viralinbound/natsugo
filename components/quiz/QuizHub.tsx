"use client";

import Link from "next/link";
import { useState } from "react";
import { Trophy } from "lucide-react";
import { difficulties, quizLevels, type QuizLevel } from "@/lib/quizBank";
import { useHydrated } from "@/lib/useBrowserStore";

const levelInfo: Record<QuizLevel, { jp: string; desc: string }> = {
  N5: { jp: "入門", desc: "Absolute basics — kana, first words, simple sentences" },
  N4: { jp: "初級", desc: "Everyday conversation and core verb forms" },
  N3: { jp: "中級", desc: "The bridge to real-world Japanese" },
  N2: { jp: "中上級", desc: "Workplace and news-level Japanese" },
  N1: { jp: "上級", desc: "Advanced grammar, formal and written Japanese" },
};

const tone: Record<string, string> = {
  easy: "border-success/40 hover:border-success",
  medium: "border-sun-400/60 hover:border-sun-500",
  hard: "border-red-600/40 hover:border-red-600",
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
          const done = hydrated ? difficulties.filter((d) => (best(l, d.id) ?? -1) >= 7).length : 0;
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
                <span className="hidden sm:inline">{levelInfo[l].jp} · </span>{done}/3 ✓
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-charcoal-700">
        <strong className="text-indigo-950">JLPT {level}:</strong> {levelInfo[level].desc}
      </p>

      <div role="tabpanel" className="mt-5 grid sm:grid-cols-3 gap-4">
        {difficulties.map((d) => {
          const score = hydrated ? best(level, d.id) : null;
          return (
            <Link
              key={d.id}
              href={`/jlpt-quiz/${level.toLowerCase()}/${d.id}`}
              className={`group flex flex-col rounded-lg border-2 bg-surface p-5 transition-colors ${tone[d.id]}`}
            >
              <span className="font-jp text-2xl font-bold text-indigo-950">{d.jp}</span>
              <span className="mt-0.5 text-lg font-bold text-indigo-950">{d.label}</span>
              <span className="mt-1 text-sm text-charcoal-500">{d.desc}</span>
              <span className="mt-4 flex items-center justify-between text-sm">
                <span className="font-semibold text-charcoal-700">10 questions</span>
                {score !== null ? (
                  <span className={`inline-flex items-center gap-1 font-bold ${score >= 7 ? "text-success" : "text-charcoal-700"}`}>
                    <Trophy size={14} /> Best {score}/10
                  </span>
                ) : (
                  <span className="font-bold text-indigo-800 group-hover:underline">Start →</span>
                )}
              </span>
            </Link>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-charcoal-500">Score 7/10 or more to tick a set off. Best scores are saved on this device.</p>
    </div>
  );
}
