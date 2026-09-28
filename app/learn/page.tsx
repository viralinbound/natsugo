import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, MonitorPlay, Radio, Video } from "lucide-react";
import { quizLevels } from "@/lib/quizBank";
import { levelInfo, lessonSeeds } from "@/lib/curriculum";
import { images } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Online Classroom — JLPT N5 to N1 Lessons, Live Classes & Recordings",
  description: "Study Japanese online with Natsugo: video lessons, study notes and handouts, live teacher-led classes and class recordings for every JLPT level from N5 to N1.",
  alternates: { canonical: "/learn" },
};

const features = [
  { icon: Radio, title: "Live online classes", body: "Teacher-led classes on Zoom or Google Meet, on weekday evenings and weekends." },
  { icon: Video, title: "Class recordings", body: "Every live class is recorded, so you can rewatch anything you missed." },
  { icon: MonitorPlay, title: "Video lessons", body: "Short, focused lectures for every lesson in the syllabus." },
  { icon: FileText, title: "Notes & handouts", body: "Clear study notes and printable worksheets for each lesson." },
];

export default function LearnPage() {
  return (
    <>
      <PageHero
        title="Your Japanese classroom, online"
        eyebrow="Online classroom · オンライン教室"
        intro="Live classes with real teachers, recordings of every session, and a structured library of video lessons and study materials — from your first hiragana to JLPT N1."
        image={images.online}
        crumbs={[{ label: "Online Classroom", href: "/learn" }]}
      >
        <Button href="/learn/n5/n5-u1-l1" size="lg">Try a free lesson</Button>
        <Button href="/student/login" variant="outline-light" size="lg">Student sign-in</Button>
      </PageHero>

      <section className="border-b border-charcoal-100 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-3 border-b sm:border-b-0 sm:odd:border-r lg:border-r last:border-r-0 border-charcoal-100 px-2 py-6 sm:px-5">
              <Icon size={22} className="mt-0.5 shrink-0 text-sun-400" />
              <div>
                <h2 className="font-display font-bold text-indigo-950">{title}</h2>
                <p className="mt-1 text-sm text-charcoal-700">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950">Choose your level</h2>
          <p className="mt-1 text-charcoal-700">Not sure? <Link href="/level-test" className="font-semibold text-indigo-800 underline">Take the free level test</Link>.</p>
          <div className="mt-8 grid gap-4">
            {quizLevels.map((lvl, i) => {
              const info = levelInfo[lvl];
              const count = lessonSeeds.filter((l) => l.level === lvl).length;
              return (
                <Link key={lvl} href={`/learn/${lvl.toLowerCase()}`} className="group grid sm:grid-cols-[120px_1fr_auto] items-center gap-4 sm:gap-6 rounded-lg border border-charcoal-100 bg-surface p-5 sm:p-6 hover:border-sun-400 transition-colors">
                  <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0">
                    <span className="font-display text-4xl font-extrabold text-sun-400">{lvl}</span>
                    <span className="font-jp text-sm text-charcoal-500">{info.jp} · Step {i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-indigo-950">{info.tagline}</h3>
                    <p className="mt-1 text-sm text-charcoal-700">{info.overview}</p>
                    <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-charcoal-500">
                      <span><BookOpen size={13} className="inline -mt-0.5" /> {count} lessons</span>
                      <span>{info.vocab}</span>
                      <span>{info.kanji}</span>
                      <span>{info.studyHours}</span>
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 font-bold text-indigo-800 group-hover:gap-2 transition-all">Open {lvl} <ArrowRight size={16} /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
