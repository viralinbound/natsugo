import type { Metadata } from "next";
import { levelTestQuestions } from "@/lib/learning";
import { images } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Quiz } from "@/components/quiz/Quiz";
import { LastResult } from "@/components/quiz/LastResult";

export const metadata: Metadata = {
  title: "Free Japanese Level Test, Find Your JLPT Level",
  description: "Take a free 12-question Japanese level test covering vocabulary, grammar, kanji, reading and listening. Get a recommended starting level instantly.",
  alternates: { canonical: "/level-test" },
};

export default function LevelTestPage() {
  return (
    <>
      <PageHero title="Free Japanese level test" eyebrow="Know Your Level" intro="12 quick questions. Instant skill-by-skill result and a recommended starting course." image={images.writing} crumbs={[{ label: "Level Test", href: "/level-test" }]} />
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <LastResult />
          <Quiz questions={levelTestQuestions} mode="level-test" />
        </div>
      </section>
    </>
  );
}
