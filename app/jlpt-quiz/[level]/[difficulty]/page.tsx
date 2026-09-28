import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { difficulties, quizLevels, type Difficulty, type QuizLevel } from "@/lib/quizBank";
import { getQuiz } from "@/lib/repo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Quiz } from "@/components/quiz/Quiz";

export const dynamicParams = false;
export const generateStaticParams = () =>
  quizLevels.flatMap((l) => difficulties.map((d) => ({ level: l.toLowerCase(), difficulty: d.id })));

const parse = async (params: Promise<{ level: string; difficulty: string }>) => {
  const p = await params;
  const level = p.level.toUpperCase() as QuizLevel;
  const diff = difficulties.find((d) => d.id === p.difficulty);
  return quizLevels.includes(level) && diff ? { level, diff } : null;
};

export async function generateMetadata({ params }: { params: Promise<{ level: string; difficulty: string }> }): Promise<Metadata> {
  const r = await parse(params);
  if (!r) return {};
  const title = `JLPT ${r.level} Quiz — ${r.diff.label} (10 questions)`;
  return {
    title,
    description: `Free JLPT ${r.level} ${r.diff.label.toLowerCase()} practice: 10 questions on vocabulary, grammar, kanji, reading and listening with explanations.`,
    alternates: { canonical: `/jlpt-quiz/${r.level.toLowerCase()}/${r.diff.id}` },
  };
}

function nextSet(level: QuizLevel, difficulty: Difficulty) {
  const di = difficulties.findIndex((d) => d.id === difficulty);
  if (di < difficulties.length - 1) {
    const d = difficulties[di + 1];
    return { href: `/jlpt-quiz/${level.toLowerCase()}/${d.id}`, label: `Try ${level} ${d.label}` };
  }
  const li = quizLevels.indexOf(level);
  if (li < quizLevels.length - 1) {
    const l = quizLevels[li + 1];
    return { href: `/jlpt-quiz/${l.toLowerCase()}/easy`, label: `Move up to ${l}` };
  }
  return undefined;
}

export default async function QuizSetPage({ params }: { params: Promise<{ level: string; difficulty: string }> }) {
  const r = await parse(params);
  if (!r) notFound();
  const questions = await getQuiz(r.level, r.diff.id);

  return (
    <section className="py-6 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumb items={[{ label: "JLPT Quiz", href: "/jlpt-quiz" }, { label: `${r.level} ${r.diff.label}`, href: `/jlpt-quiz/${r.level.toLowerCase()}/${r.diff.id}` }]} />
        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-950">
            JLPT {r.level} · <span className="font-jp">{r.diff.jp}</span> <span className="text-charcoal-500 text-xl">({r.diff.label})</span>
          </h1>
          <nav aria-label="Difficulty" className="flex gap-1.5">
            {difficulties.map((d) => (
              <Link
                key={d.id}
                href={`/jlpt-quiz/${r.level.toLowerCase()}/${d.id}`}
                aria-current={d.id === r.diff.id ? "page" : undefined}
                className={`rounded-md px-3 min-h-[36px] inline-flex items-center text-sm font-semibold ${d.id === r.diff.id ? "bg-indigo-900 text-white" : "bg-bg-alt text-charcoal-700"}`}
              >
                {d.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-5">
          <Quiz key={`${r.level}-${r.diff.id}`} questions={questions} mode="practice" set={{ level: r.level, difficulty: r.diff.id, next: nextSet(r.level, r.diff.id) }} />
        </div>
      </div>
    </section>
  );
}
