import type { Metadata } from "next";
import { images } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { QuizHub } from "@/components/quiz/QuizHub";
import { quizLevels, type QuizLevel } from "@/lib/quizBank";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "JLPT Quiz | Free N5-N1 Japanese Practice",
  description: "Practice JLPT N5-N1 with free quizzes on vocabulary, grammar, kanji, reading and listening. Choose your level, test your skills and see answer explanations.",
  keywords: ["JLPT Quiz", "Free JLPT Quiz", "JLPT N5-N1 Quiz", "JLPT Practice Test Online", "Japanese JLPT Practice", "JLPT Quiz Online", "Free Japanese Quiz"],
  alternates: { canonical: "/jlpt-quiz" },
};

export default async function JlptQuizPage({ searchParams }: { searchParams: Promise<{ level?: string }> }) {
  const asked = (await searchParams).level?.toUpperCase() as QuizLevel | undefined;
  const initial = asked && quizLevels.includes(asked) ? asked : "N5";
  return (
    <>
      <PageHero
        title="JLPT quiz: N5 to N1"
        eyebrow="練習クイズ · Free practice"
        intro="Pick your level, then take the full test or a single topic: vocabulary, grammar, kanji, reading or listening. Every quiz has its own 10 questions — with an explanation for each answer."
        image={images.writing}
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "JLPT Quiz", href: "/jlpt-quiz" }]}
      />
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <QuizHub key={initial} initial={initial} />
          <div className="mt-12 rounded-lg bg-sun-100 p-6 sm:flex sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="text-lg font-bold text-indigo-950">Not sure which level to pick?</h2>
              <p className="text-charcoal-700">Take the 5-minute level test first.</p>
            </div>
            <div className="mt-4 sm:mt-0 shrink-0"><Button href="/level-test">Take Level Test</Button></div>
          </div>
        </div>
      </section>
    </>
  );
}
