"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Volume2, X } from "lucide-react";
import type { Question, Skill } from "@/lib/learning";
import { recommendLevel } from "@/lib/learning";
import { speakJapanese } from "@/components/ui/SpeakButton";

export interface QuizSet {
  level: string;
  difficulty: string;
  next?: { href: string; label: string };
}

export function Quiz({ questions, mode, set }: { questions: Question[]; mode: "level-test" | "practice"; set?: QuizSet }) {
  const [started, setStarted] = useState(mode === "practice");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [finished, setFinished] = useState(false);

  const q = questions[index];
  const chosen = answers[index];
  const reveal = mode === "practice" && chosen !== null;

  const result = useMemo(() => {
    const bySkill = new Map<Skill, { right: number; total: number }>();
    let score = 0;
    questions.forEach((qq, i) => {
      const s = bySkill.get(qq.skill) ?? { right: 0, total: 0 };
      s.total++;
      if (answers[i] === qq.answer) {
        s.right++;
        score++;
      }
      bySkill.set(qq.skill, s);
    });
    return { score, bySkill: [...bySkill.entries()], rec: recommendLevel(score, questions.length) };
  }, [answers, questions]);

  useEffect(() => {
    if (!finished || mode !== "level-test") return;
    const bySkill = Object.fromEntries(result.bySkill.map(([k, v]) => [k, Math.round((v.right / v.total) * 100)]));
    const saved = { score: result.score, total: questions.length, recommended: result.rec.label, slug: result.rec.slug, bySkill, at: Date.now() };
    try {
      localStorage.setItem("np-level-result", JSON.stringify(saved));
    } catch {}
    fetch("/api/level-results", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(saved) }).catch(() => {});
  }, [finished, mode, result, questions.length]);

  useEffect(() => {
    if (!finished || !set) return;
    const key = `np-quiz-best-${set.level}-${set.difficulty}`;
    try {
      const best = Number(localStorage.getItem(key) ?? -1);
      if (result.score > best) localStorage.setItem(key, String(result.score));
    } catch {}
    fetch("/api/quiz-attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level: set.level, difficulty: set.difficulty, score: result.score, total: questions.length }),
    }).catch(() => {});
  }, [finished, set, result.score, questions.length]);

  const restart = () => {
    setAnswers(questions.map(() => null));
    setIndex(0);
    setFinished(false);
  };

  if (!started) {
    return (
      <div className="rounded-xl border border-charcoal-100 bg-surface p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-white">Before you start</h2>
        <ul className="mt-4 space-y-2 text-charcoal-700">
          <li>• {questions.length} questions across vocabulary, grammar, kanji, reading and listening</li>
          <li>• Takes about 5–7 minutes · No sign-up needed</li>
          <li>• Listening questions play audio — turn your sound on</li>
          <li>• Skip anything you don&apos;t know; guessing makes the result less accurate</li>
        </ul>
        <button
          onClick={() => setStarted(true)}
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-sun-400 hover:bg-sun-500 px-6 min-h-[52px] font-bold text-white"
        >
          Start the test <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="rounded-xl border border-charcoal-100 bg-surface p-6 sm:p-10" role="status">
        <p className="text-sm font-bold uppercase tracking-wider text-sun-500">Your result</p>
        <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
          {result.score} / {questions.length} correct
        </h2>
        {set ? (
          <p className="mt-2 font-jp text-lg font-bold text-sun-500">
            {result.score === questions.length ? "満点！ Perfect score!" : result.score >= questions.length * 0.7 ? "よくできました！ Well done!" : "がんばって！ Keep going!"}
          </p>
        ) : null}
        {mode === "level-test" ? (
          <p className="mt-2 text-lg text-charcoal-700">
            Recommended starting point: <strong className="text-indigo-800">{result.rec.label}</strong>
          </p>
        ) : null}

        <div className="mt-7 space-y-4 max-w-xl">
          {result.bySkill.map(([skill, s]) => {
            const pct = Math.round((s.right / s.total) * 100);
            return (
              <div key={skill}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-semibold text-charcoal-800">{skill}</span>
                  <span className="font-bold text-indigo-800">{pct}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-bg-alt overflow-hidden">
                  <div className={`h-full rounded-full animate-grow-bar ${pct < 50 ? "bg-red-500" : "bg-indigo-700"}`} style={{ width: `${Math.max(pct, 3)}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-charcoal-500 max-w-xl">
          This is a quick indicative check, not an official JLPT score. A teacher can confirm your level in a free demo class.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          {mode === "level-test" ? (
            <Link href={`/${result.rec.slug}`} className="inline-flex items-center justify-center rounded-md bg-sun-400 hover:bg-sun-500 px-6 min-h-[48px] font-bold text-white">
              View {result.rec.level} course
            </Link>
          ) : null}
          <Link href="/free-japanese-demo-class" className="inline-flex items-center justify-center rounded-md border-2 border-indigo-950 px-6 min-h-[48px] font-bold text-white hover:bg-indigo-950 hover:text-white">
            Book a free demo
          </Link>
          {set?.next ? (
            <Link href={set.next.href} className="inline-flex items-center justify-center rounded-md bg-sun-400 hover:bg-sun-500 px-6 min-h-[48px] font-bold text-white">
              {set.next.label} →
            </Link>
          ) : null}
          <button onClick={restart} className="inline-flex items-center justify-center gap-2 rounded-md px-4 min-h-[48px] font-semibold text-charcoal-700 hover:bg-bg-alt">
            <RotateCcw size={16} /> Retake
          </button>
        </div>
      </div>
    );
  }

  const answered = answers.filter((a) => a !== null).length;

  return (
    <div className="rounded-xl border border-charcoal-100 bg-surface p-5 sm:p-8">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-charcoal-700">
          Question {index + 1} of {questions.length}
        </span>
        <span className="rounded bg-bg-alt px-2 py-0.5 text-xs font-bold text-charcoal-700">
          {q.skill} · {q.level}
        </span>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-bg-alt overflow-hidden" aria-hidden>
        <div className="h-full bg-sun-400 transition-all" style={{ width: `${(answered / questions.length) * 100}%` }} />
      </div>

      <h2 className="mt-6 text-lg sm:text-xl font-bold text-indigo-950 font-jp leading-relaxed">{q.prompt}</h2>
      {q.audio ? (
        <button
          type="button"
          onClick={() => speakJapanese(q.audio!)}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-indigo-900 px-4 min-h-[44px] font-semibold text-white hover:bg-indigo-800"
        >
          <Volume2 size={18} /> Play audio
        </button>
      ) : null}

      <fieldset className="mt-6">
        <legend className="sr-only">Choose an answer</legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {q.options.map((opt, i) => {
            const isChosen = chosen === i;
            const isRight = reveal && i === q.answer;
            const isWrong = reveal && isChosen && i !== q.answer;
            return (
              <button
                key={opt}
                type="button"
                aria-pressed={isChosen}
                disabled={reveal}
                onClick={() => setAnswers((a) => a.map((v, j) => (j === index ? i : v)))}
                className={`flex items-center justify-between gap-3 text-left rounded-md border-2 px-4 min-h-[56px] font-jp font-medium transition-colors ${
                  isRight
                    ? "border-success bg-success/10 text-success"
                    : isWrong
                      ? "border-red-600 bg-red-600/10 text-red-600"
                      : isChosen
                        ? "border-indigo-800 bg-indigo-800/5 text-indigo-950"
                        : "border-charcoal-100 hover:border-indigo-700/40 text-charcoal-800"
                }`}
              >
                <span>{opt}</span>
                {isRight ? <Check size={18} /> : isWrong ? <X size={18} /> : null}
              </button>
            );
          })}
        </div>
      </fieldset>

      {reveal ? (
        <div role="status" className={`mt-4 rounded-md px-4 py-3 text-sm animate-fade-up ${chosen === q.answer ? "bg-success/10 text-charcoal-800" : "bg-red-600/5 text-charcoal-800"}`}>
          <p className={`font-bold ${chosen === q.answer ? "text-success" : "text-red-600"}`}>
            {chosen === q.answer ? "正解！ Correct" : `Not quite — the answer is “${q.options[q.answer]}”`}
          </p>
          {q.explanation ? <p className="mt-1 font-jp">{q.explanation}</p> : null}
        </div>
      ) : null}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="inline-flex items-center gap-1.5 rounded-md px-3 min-h-[44px] font-semibold text-charcoal-700 hover:bg-bg-alt disabled:opacity-40"
        >
          <ArrowLeft size={16} /> Back
        </button>
        {index < questions.length - 1 ? (
          <button
            type="button"
            onClick={() => setIndex((i) => i + 1)}
            className="inline-flex items-center gap-1.5 rounded-md bg-indigo-900 px-5 min-h-[44px] font-bold text-white hover:bg-indigo-800"
          >
            {chosen === null ? "Skip" : "Next"} <ArrowRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setFinished(true)}
            className="inline-flex items-center gap-1.5 rounded-md bg-sun-400 px-5 min-h-[44px] font-bold text-white hover:bg-sun-500"
          >
            See my result
          </button>
        )}
      </div>
    </div>
  );
}
