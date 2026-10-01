"use client";

import Link from "next/link";
import { useState } from "react";
import { Quiz } from "@/components/quiz/Quiz";
import type { QuizQuestion } from "@/lib/quizBank";

export interface PageQuizSet {
  id: string;
  label: string;
  questions: QuizQuestion[];
  // When set, scores are saved under the same key as the matching /jlpt-quiz page.
  save?: { level: string; difficulty: string };
}

// A quiz section placed at the end of a learning page, with a tab per level or topic.
export function PageQuiz({ title, intro, sets, initial }: { title: string; intro: string; sets: PageQuizSet[]; initial?: string }) {
  const [id, setId] = useState(initial && sets.some((s) => s.id === initial) ? initial : sets[0].id);
  const cur = sets.find((s) => s.id === id)!;

  return (
    <section id="quiz" className="scroll-mt-24 bg-bg-alt py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="font-jp text-sm font-bold text-hanko">練習クイズ · Quick quiz</p>
        <h2 className="mt-1 text-2xl font-bold text-indigo-950 sm:text-3xl">{title}</h2>
        <p className="mt-2 text-charcoal-700">{intro}</p>
        {sets.length > 1 ? (
          <div role="tablist" aria-label="Quiz set" className="mt-5 flex flex-wrap gap-1.5">
            {sets.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={s.id === id}
                onClick={() => setId(s.id)}
                className={`min-h-[40px] rounded-md px-4 text-sm font-bold transition-colors ${s.id === id ? "bg-indigo-900 text-white" : "border border-charcoal-100 bg-surface text-charcoal-700 hover:border-indigo-700/50"}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        ) : null}
        <div className="mt-5">
          <Quiz key={cur.id} questions={cur.questions} mode="practice" set={cur.save} />
        </div>
        <p className="mt-4 text-sm text-charcoal-500">
          Want more? <Link href="/jlpt-quiz" className="font-semibold text-indigo-800 underline underline-offset-4">See every JLPT quiz</Link>.
        </p>
      </div>
    </section>
  );
}
