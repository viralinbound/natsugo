import type { Metadata } from "next";
import Image from "next/image";
import { images } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us: Online Japanese Learning Platform",
  description: "Natsugo is a Japanese language institute and learning platform for Indian students and professionals, live classes, JLPT preparation and speaking practice.",
  alternates: { canonical: "/about-us" },
};

const principles = [
  { jp: "測", title: "Measure first", body: "Every learner starts with a level check so you never repeat what you know or skip what you don't." },
  { jp: "話", title: "Speak from day one", body: "Exams matter, but conversation is the point. Every class includes speaking time." },
  { jp: "道", title: "A clear path", body: "N5 to N1, with checkpoints, mock tests and progress you can see." },
  { jp: "誠", title: "Honest guidance", body: "No guaranteed jobs, visas or scores, just good teaching and straight answers." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="Learn Japanese. Know your level. Follow your path." eyebrow="About Us" intro="We're building a complete Japanese learning journey for Indian learners, from first hiragana to confident professional Japanese." image={images.groupStudy} crumbs={[{ label: "About", href: "/about-us" }]} />

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950">Why we started</h2>
            <div className="mt-5 space-y-4 text-charcoal-700 leading-relaxed">
              <p>Most Japanese learners in India face the same problem: they don&apos;t know their real level, which course to choose, or how their progress is measured. Many end up with exam knowledge but little confidence speaking.</p>
              <p>Natsugo combines live classes with a structured learning system, a level test, clear course paths, regular practice, mock tests and progress tracking, so every learner knows exactly where they stand and what comes next.</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src={`${images.classroom}?w=1000&q=70&auto=format&fit=crop`} alt="Students in a Japanese class" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-indigo-950 py-14 sm:py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold">How we teach</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {principles.map((p) => (
              <div key={p.title} className="border-t border-white/20 pt-5">
                <p className="font-jp text-4xl text-sun-300">{p.jp}</p>
                <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-white/75">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-indigo-950">Certificates: what you receive</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-5">
            <div className="card-modern p-6">
              <h3 className="font-bold text-indigo-950">Institute course certificate</h3>
              <p className="mt-2 text-sm text-charcoal-700">Issued by Natsugo when you complete a course. It shows the course and hours completed.</p>
            </div>
            <div className="card-modern p-6">
              <h3 className="font-bold text-indigo-950">Official JLPT certificate</h3>
              <p className="mt-2 text-sm text-charcoal-700">Issued only by the JLPT organisers after you sit and pass the official exam. We prepare you for it; we don&apos;t issue it.</p>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Button href="/level-test">Take Free Level Test</Button>
            <Button href="/teachers" variant="outline">Meet the Teachers</Button>
          </div>
        </div>
      </section>
    </>
  );
}
