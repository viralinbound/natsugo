import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Download, Lock, PlayCircle, Video } from "lucide-react";
import { quizLevels, type QuizLevel } from "@/lib/quizBank";
import { getPublicAssets, getLessons } from "@/lib/portalRepo";
import { getStudent } from "@/lib/student";
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
    alternates: { canonical: `/learn/${r.level.toLowerCase()}/${r.lesson.id}` },
  };
}

export default async function LessonPage({ params }: P) {
  const r = await load(params);
  if (!r) notFound();
  const { level, lessons, lesson, prev, next } = r;
  const portal = await getStudent();
  const enrolled = Boolean(portal?.student.levels.includes(level));
  const videoUnlocked = lesson.is_free || enrolled;
  const asset = enrolled ? portal!.assets.get(lesson.id) : (await getPublicAssets(lessons)).get(lesson.id);
  const hasRealVideo = videoUnlocked && Boolean(asset?.video_url);
  const base = `/learn/${level.toLowerCase()}`;

  return (
    <section className="py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Online Classroom", href: "/learn" }, { label: `JLPT ${level}`, href: base }, { label: `Unit ${lesson.unit}`, href: `${base}/${lesson.id}` }]} />

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
              {!videoUnlocked ? (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-md bg-sun-100 px-4 py-3 text-sm">
                  <p className="flex items-center gap-2 text-charcoal-800"><Video size={16} className="text-sun-500" /> The teacher-recorded video and downloadable handout for this lesson unlock once you enrol.</p>
                  <div className="flex gap-2 shrink-0">
                    <Button href={`/batches?level=${level}`} size="sm">See {level} batches</Button>
                    <Button href="/student/login" variant="outline" size="sm">Student sign-in</Button>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-indigo-950">Study notes</h2>
                <div className="flex flex-wrap gap-2 print:hidden">
                  {videoUnlocked && asset?.material_url ? (
                    <a href={asset.material_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-indigo-900 px-4 min-h-[40px] text-sm font-bold text-white">
                      <Download size={15} /> {asset.material_label || "Download handout"}
                    </a>
                  ) : null}
                  {asset?.notes ? <PrintButton /> : null}
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-charcoal-100 bg-surface p-5 sm:p-8">
                {asset?.notes ? <Notes text={asset.notes} /> : <p className="text-charcoal-500">Notes for this lesson will be added by your teacher.</p>}
              </div>
              {!enrolled ? (
                <div className="mt-6 rounded-lg bg-sun-100 p-5 sm:flex sm:items-center sm:justify-between gap-4 print:hidden">
                  <p className="text-charcoal-800"><strong>Want the teacher-recorded video, handouts and live classes?</strong> Enrol to unlock all {lessons.length} {level} lessons.</p>
                  <div className="mt-3 sm:mt-0 shrink-0"><Button href={`/free-japanese-demo-class?course=jlpt-${level.toLowerCase()}`}>Book free demo</Button></div>
                </div>
              ) : null}
            </div>

            <nav className="mt-8 flex justify-between gap-3 print:hidden" aria-label="Lesson navigation">
              {prev ? (
                <Link href={`${base}/${prev.id}`} className="inline-flex items-center gap-1.5 rounded-md border border-charcoal-100 bg-surface px-4 min-h-[44px] text-sm font-semibold text-charcoal-800 hover:border-indigo-800"><ArrowLeft size={15} /> Previous</Link>
              ) : <span />}
              {next ? (
                <Link href={`${base}/${next.id}`} className="inline-flex items-center gap-1.5 rounded-md bg-sun-400 px-4 min-h-[44px] text-sm font-bold text-white hover:bg-sun-500">Next lesson <ArrowRight size={15} /></Link>
              ) : (
                <Link href={`/jlpt-quiz/${level.toLowerCase()}/medium`} className="inline-flex items-center gap-1.5 rounded-md bg-sun-400 px-4 min-h-[44px] text-sm font-bold text-white">Take the {level} quiz <ArrowRight size={15} /></Link>
              )}
            </nav>
          </div>

          <aside className="lg:sticky lg:top-24 rounded-lg border border-charcoal-100 bg-surface print:hidden">
            <p className="border-b border-charcoal-100 px-4 py-3 font-display font-bold text-indigo-950">{level} lessons</p>
            <p className="border-b border-charcoal-100 px-4 py-2 text-xs text-charcoal-500">Notes and audio lectures are open for every lesson. <Lock size={11} className="inline -mt-0.5" /> = teacher video for enrolled students.</p>
            <ol className="max-h-[60vh] overflow-y-auto divide-y divide-charcoal-100">
              {lessons.map((l, i) => {
                const open = l.is_free || enrolled;
                const current = l.id === lesson.id;
                return (
                  <li key={l.id}>
                    <Link href={`${base}/${l.id}`} aria-current={current ? "page" : undefined} className={`flex items-start gap-2.5 px-4 py-3 text-sm ${current ? "bg-sun-100" : "hover:bg-bg"}`}>
                      <span className="mt-0.5 w-5 shrink-0 text-xs font-bold text-charcoal-500">{i + 1}</span>
                      <span className="flex-1 min-w-0 font-jp text-charcoal-900">{l.title}</span>
                      {open ? <PlayCircle size={15} className="mt-0.5 shrink-0 text-sun-400" /> : <Lock size={14} className="mt-0.5 shrink-0 text-charcoal-300" />}
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
