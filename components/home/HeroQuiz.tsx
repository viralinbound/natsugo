"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import type { Question } from "@/lib/learning";
import { fireConfetti } from "@/lib/confetti";

// Three quick questions right in the hero, as a taster for the full level test.
export function HeroQuiz({ questions }: { questions: Question[] }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = step >= questions.length;
  const q = questions[step];

  const choose = (i: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (picked !== null) return;
    setPicked(i);
    const right = i === q.answer;
    if (right) {
      setScore((s) => s + 1);
      const r = e.currentTarget.getBoundingClientRect();
      fireConfetti({ x: r.left + r.width / 2, y: r.top + r.height / 2, count: 26, spread: 0.6 });
    }
    window.setTimeout(() => {
      setPicked(null);
      setStep((s) => s + 1);
    }, 900);
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setPicked(null);
  };

  return (
    <div className="w-full rounded-3xl border border-charcoal-100 bg-surface/90 p-5 shadow-2xl shadow-indigo-950/10 backdrop-blur-md sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wider text-sun-500">
          Quick check · <span className="font-mincho normal-case tracking-normal">腕試し</span>
        </p>
        <div className="flex gap-1.5" aria-hidden>
          {questions.map((_, i) => (
            <span key={i} className={`h-1.5 w-6 rounded-full transition-colors ${i < step ? "bg-sun-400" : i === step && !done ? "bg-sun-300" : "bg-charcoal-100"}`} />
          ))}
        </div>
      </div>

      {!done ? (
        <div key={q.id} className="pop-in">
          <p className="mt-4 text-sm font-semibold text-charcoal-500">
            Question {step + 1} of {questions.length}
          </p>
          <h2 className="mt-1 font-jp text-xl font-bold text-indigo-950 sm:text-2xl">{q.prompt}</h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {q.options.map((opt, i) => {
              const isRight = picked !== null && i === q.answer;
              const isWrong = picked === i && i !== q.answer;
              return (
                <button
                  key={opt}
                  type="button"
                  disabled={picked !== null}
                  onClick={(e) => choose(i, e)}
                  className={`flex min-h-[52px] items-center justify-between gap-2 rounded-xl border-2 px-4 text-left font-jp font-semibold transition-colors ${
                    isRight
                      ? "border-success bg-success/10 text-success"
                      : isWrong
                        ? "border-red-500 bg-red-500/10 text-red-600"
                        : "border-charcoal-100 bg-bg text-indigo-950 hover:border-sun-400"
                  }`}
                >
                  {opt}
                  {isRight ? <Check size={18} /> : isWrong ? <X size={18} /> : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="pop-in mt-5 text-center">
          <p className="font-display text-5xl font-extrabold text-gradient-anim">
            {score}/{questions.length}
          </p>
          <p className="mt-2 font-semibold text-indigo-950">
            {score === questions.length ? "Great start! You already know some basics." : score > 0 ? "Nice, you know a little Japanese." : "Everyone starts somewhere — N5 is for you."}
          </p>
          <p className="mt-1 text-sm text-charcoal-500">Take the full 12-question test for your exact level.</p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link
              href="/level-test"
              className="btn-shine inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-gradient-to-r from-sun-400 to-cyan-400 px-5 font-bold text-white shadow-lg shadow-sun-400/30"
            >
              Full level test <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md px-4 font-semibold text-charcoal-700 hover:bg-bg-alt"
            >
              <RotateCcw size={16} /> Try again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
