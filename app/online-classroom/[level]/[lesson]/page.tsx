import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Download, PlayCircle } from "lucide-react";
import { quizLevels, type QuizLevel } from "@/lib/quizBank";
import { getPublicAssets, getLessons } from "@/lib/portalRepo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { VideoPlayer } from "@/components/learn/VideoPlayer";
import { AutoLecture } from "@/components/learn/AutoLecture";
import { Notes } from "@/components/learn/Notes";
import { PrintButton } from "@/components/learn/PrintButton";

type P = { params: Promise<{ level: string; lesson: string }> };

async function load(params: P["params"]) {
  const p = await params;
  const level = p.level.toUpperCase() as QuizLevel;
  if (!quizLevels.includes(level)) return null;
  const lessons = await getLessons(level);
  const i = lessons.findIndex((l) => l.id === p.lesson);
  if (i < 0) return null;
  return { level, lessons, lesson: lessons[i], prev: lessons[i - 1], next: lessons[i + 1] };
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const r = await load(params);
  if (!r) return {};
  return {
    title: `${r.lesson.title} — JLPT ${r.level} Lesson`,
    description: r.lesson.summary,
    alternates: { canonical: `/online-classroom/${r.level.toLowerCase()}/${r.lesson.id}` },
  };
}

export default async function LessonPage({ params }: P) {
  const r = await load(params);
  if (!r) notFound();
  const { level, lessons, lesson, prev, next } = r;
  const asset = (await getPublicAssets(lessons)).get(lesson.id);
  const hasRealVideo = Boolean(asset?.video_url);
  const base = `/online-classroom/${level.toLowerCase()}`;

  return (
    <section className="py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Online Classroom", href: "/online-classroom" }, { label: `JLPT ${level}`, href: base }, { label: `Unit ${lesson.unit}`, href: `${base}/${lesson.id}` }]} />

        <div className="mt-5 grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-sun-500">JLPT {level} · Unit {lesson.unit}: {lesson.unit_title}</p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-indigo-950 font-jp">{lesson.title}</h1>
            <p className="mt-2 text-charcoal-700">{lesson.summary} · {lesson.duration_min} min</p>

            <div className="mt-6">
              {hasRealVideo ? (
                <VideoPlayer url={asset?.video_url} title={lesson.title} />
              ) : asset?.notes ? (
                <AutoLecture title={lesson.title} notes={asset.notes} />
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-lg bg-bg-alt text-charcoal-500">Lecture coming soon</div>
              )}
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-indigo-950">Study notes</h2>
                <div className="flex flex-wrap gap-2 print:hidden">
                  {asset?.material_url ? (
                    <a href={asset.material_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-indigo-900 px-4 min-h-[40px] text-sm font-bold text-white">
                      <Download size={15} /> {asset.material_label || "Download handout"}
                    </a>
                  ) : null}
                  {asset?.notes ? <PrintButton /> : null}
                </div>
              </div>
              <div className="mt-4 card-modern p-5 sm:p-8">
                {asset?.notes ? <Notes text={asset.notes} /> : <p className="text-charcoal-500">Notes for this lesson will be added by your teacher.</p>}
              </div>
              <div className="mt-6 rounded-lg bg-sun-100 p-5 sm:flex sm:items-center sm:justify-between gap-4 print:hidden">
                <p className="text-charcoal-800"><strong>Every lesson is free.</strong> Want a teacher to guide you? Join a live {level} batch.</p>
                <div className="mt-3 sm:mt-0 shrink-0"><Button href={`/batches?level=${level}`}>See {level} batches</Button></div>
              </div>
            </div>

            <nav className="mt-8 flex justify-between gap-3 print:hidden" aria-label="Lesson navigation">
              {prev ? (
                <Link href={`${base}/${prev.id}`} className="inline-flex items-center gap-1.5 rounded-md border border-charcoal-100 bg-surface px-4 min-h-[44px] text-sm font-semibold text-charcoal-800 hover:border-indigo-800"><ArrowLeft size={15} /> Previous</Link>
              ) : <span />}
              {next ? (
                <Link href={`${base}/${next.id}`} className="inline-flex items-center gap-1.5 rounded-md bg-sun-400 px-4 min-h-[44px] text-sm font-bold text-white hover:bg-sun-500">Next lesson <ArrowRight size={15} /></Link>
              ) : (
                <Link href={`/jlpt-quiz/${level.toLowerCase()}/full`} className="inline-flex items-center gap-1.5 rounded-md bg-sun-400 px-4 min-h-[44px] text-sm font-bold text-white">Take the {level} quiz <ArrowRight size={15} /></Link>
              )}
            </nav>
          </div>

          <aside className="lg:sticky lg:top-24 card-modern print:hidden">
            <p className="border-b border-charcoal-100 px-4 py-3 font-display font-bold text-indigo-950">{level} lessons</p>
            <p className="border-b border-charcoal-100 px-4 py-2 text-xs text-charcoal-500">All lessons are free — video, notes and handouts.</p>
            <ol className="max-h-[60vh] overflow-y-auto divide-y divide-charcoal-100">
              {lessons.map((l, i) => {
                const current = l.id === lesson.id;
                return (
                  <li key={l.id}>
                    <Link href={`${base}/${l.id}`} aria-current={current ? "page" : undefined} className={`flex items-start gap-2.5 px-4 py-3 text-sm ${current ? "bg-sun-100" : "hover:bg-bg"}`}>
                      <span className="mt-0.5 w-5 shrink-0 text-xs font-bold text-charcoal-500">{i + 1}</span>
                      <span className="flex-1 min-w-0 font-jp text-charcoal-900">{l.title}</span>
                      <PlayCircle size={15} className="mt-0.5 shrink-0 text-sun-400" />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}
