import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { difficulties, quizLevels, quizTopics, topicQuiz, type Difficulty, type QuizLevel } from "@/lib/quizBank";
import { getQuiz } from "@/lib/repo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Quiz } from "@/components/quiz/Quiz";

// The second segment is either a difficulty (easy / medium / hard) or a topic (grammar, kanji, ...).
export const dynamicParams = false;
export const generateStaticParams = () =>
  quizLevels.flatMap((l) => [...difficulties, ...quizTopics].map((d) => ({ level: l.toLowerCase(), difficulty: d.id })));

const parse = async (params: Promise<{ level: string; difficulty: string }>) => {
  const p = await params;
  const level = p.level.toUpperCase() as QuizLevel;
  if (!quizLevels.includes(level)) return null;
  const diff = difficulties.find((d) => d.id === p.difficulty);
  if (diff) return { level, set: diff, kind: "difficulty" as const };
  const topic = quizTopics.find((t) => t.id === p.difficulty);
  return topic ? { level, set: topic, kind: "topic" as const } : null;
};

export async function generateMetadata({ params }: { params: Promise<{ level: string; difficulty: string }> }): Promise<Metadata> {
  const r = await parse(params);
  if (!r) return {};
  const about = r.kind === "topic" ? r.set.label.toLowerCase() : "vocabulary, grammar, kanji, reading and listening";
  return {
    title: `JLPT ${r.level} ${r.set.label} Quiz (10 questions)`,
    description: `Free JLPT ${r.level} ${r.set.label.toLowerCase()} practice: 10 ${r.level}-level questions on ${about}, with an explanation for every answer.`,
    alternates: { canonical: `/jlpt-quiz/${r.level.toLowerCase()}/${r.set.id}` },
  };
}

function nextSet(level: QuizLevel, id: string, kind: "difficulty" | "topic") {
  const list = kind === "topic" ? quizTopics : difficulties;
  const i = list.findIndex((d) => d.id === id);
  if (i < list.length - 1) {
    const d = list[i + 1];
    return { href: `/jlpt-quiz/${level.toLowerCase()}/${d.id}`, label: `Try ${level} ${d.label}` };
  }
  const li = quizLevels.indexOf(level);
  if (li < quizLevels.length - 1) {
    const l = quizLevels[li + 1];
    return { href: `/jlpt-quiz/${l.toLowerCase()}/${list[0].id}`, label: `Move up to ${l}` };
  }
  return undefined;
}

export default async function QuizSetPage({ params }: { params: Promise<{ level: string; difficulty: string }> }) {
  const r = await parse(params);
  if (!r) notFound();
  const questions = r.kind === "topic" ? topicQuiz(r.level, r.set.id as (typeof quizTopics)[number]["id"]) : await getQuiz(r.level, r.set.id as Difficulty);
  const siblings = r.kind === "topic" ? quizTopics : difficulties;

  return (
    <section className="py-6 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumb items={[{ label: "JLPT Quiz", href: `/jlpt-quiz?level=${r.level.toLowerCase()}` }, { label: `${r.level} ${r.set.label}`, href: `/jlpt-quiz/${r.level.toLowerCase()}/${r.set.id}` }]} />
        <div className="mt-4 flex flex-col gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-950">
            JLPT {r.level} · <span className="font-jp">{r.set.jp}</span> <span className="text-charcoal-500 text-xl">({r.set.label})</span>
          </h1>
          <nav aria-label={r.kind === "topic" ? "Topic" : "Difficulty"} className="flex flex-wrap gap-1.5">
            {siblings.map((d) => (
              <Link
                key={d.id}
                href={`/jlpt-quiz/${r.level.toLowerCase()}/${d.id}`}
                aria-current={d.id === r.set.id ? "page" : undefined}
                className={`rounded-md px-3 min-h-[36px] inline-flex items-center text-sm font-semibold ${d.id === r.set.id ? "bg-indigo-900 text-white" : "bg-bg-alt text-charcoal-700"}`}
              >
                {d.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-5">
          <Quiz key={`${r.level}-${r.set.id}`} questions={questions} mode="practice" set={{ level: r.level, difficulty: r.set.id, next: nextSet(r.level, r.set.id, r.kind) }} />
        </div>
      </div>
    </section>
  );
}
