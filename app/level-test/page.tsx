import type { Metadata } from "next";
import { levelTestQuestions } from "@/lib/learning";
import { images } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Quiz } from "@/components/quiz/Quiz";
import { LastResult } from "@/components/quiz/LastResult";

export const metadata: Metadata = {
  title: "Free Japanese Level Test, Find Your JLPT Level",
  description: "Take a free 25-question Japanese level test: 5 questions for each level from N5 to N1. Your answers decide which level you should start learning from.",
  alternates: { canonical: "/level-test" },
};

export default function LevelTestPage() {
  return (
    <>
      <PageHero title="Free Japanese level test" eyebrow="Know Your Level" intro="25 questions, 5 for each level from N5 to N1. Your answers decide where you start learning." image={images.writing} crumbs={[{ label: "Level Test", href: "/level-test" }]} />
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <LastResult />
          <Quiz questions={levelTestQuestions} mode="level-test" />
        </div>
      </section>
    </>
  );
}
