import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, CheckCircle2, Clock, FileText, PlayCircle, Radio, Video } from "lucide-react";
import { quizLevels, difficulties, type QuizLevel } from "@/lib/quizBank";
import { levelInfo } from "@/lib/curriculum";
import { fmtIST, getLessons, getLiveLinks, getLiveSessions, groupByUnit } from "@/lib/portalRepo";
import { getBatches, getTeachers } from "@/lib/repo";
import { images } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { BatchCard } from "@/components/ui/BatchCard";
import { LiveAction, LiveBadge } from "@/components/learn/LiveStatus";

const heroImg: Record<QuizLevel, string> = { N5: images.writing, N4: images.onlinePair, N3: images.online, N2: images.office, N1: images.lecture };

export const generateStaticParams = () => quizLevels.map((l) => ({ level: l.toLowerCase() }));

const parseLevel = async (p: Promise<{ level: string }>) => {
  const l = (await p).level.toUpperCase() as QuizLevel;
  return quizLevels.includes(l) ? l : null;
};

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const level = await parseLevel(params);
  if (!level) return {};
  const info = levelInfo[level];
  return {
    title: `JLPT ${level} Online Classroom — Lessons, Live Classes & Recordings`,
    description: `${info.tagline}. Full JLPT ${level} syllabus with video lessons, study notes, live online classes, recordings, exam format and practice quizzes.`,
    alternates: { canonical: `/online-classroom/${level.toLowerCase()}` },
  };
}

export default async function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  const level = await parseLevel(params);
  if (!level) notFound();
  const info = levelInfo[level];
  // eslint-disable-next-line react-hooks/purity -- request-time split of upcoming vs past classes
  const nowIso = new Date(Date.now() - 3 * 3600_000).toISOString();

  const [lessons, upcoming, past, batches, teachers] = await Promise.all([
    getLessons(level),
    getLiveSessions({ level, from: nowIso, limit: 8 }),
    getLiveSessions({ level, to: nowIso, limit: 12 }),
    getBatches(),
    getTeachers(),
  ]);
  const links = await getLiveLinks([...upcoming, ...past].map((s) => s.id));
  const units = groupByUnit(lessons);
  const totalMin = lessons.reduce((a, l) => a + l.duration_min, 0);
  const recordings = past.filter((s) => s.has_recording);
  const levelBatches = batches.filter((b) => b.level === level);
  const teacherName = (id: string | null) => teachers.find((t) => t.id === id)?.name;
  const firstLesson = lessons[0];

  return (
    <>
      <PageHero
        title={`JLPT ${level} — ${info.tagline}`}
        eyebrow={`Online classroom · ${info.jp}`}
        intro={info.overview}
        image={heroImg[level]}
        crumbs={[{ label: "Online Classroom", href: "/online-classroom" }, { label: `JLPT ${level}`, href: `/online-classroom/${level.toLowerCase()}` }]}
      >
        {firstLesson ? <Button href={`/online-classroom/${level.toLowerCase()}/${firstLesson.id}`} size="lg">Start learning free</Button> : null}
        <Button href={`/jlpt-${level.toLowerCase()}`} variant="outline-light" size="lg">About the {level} course</Button>
      </PageHero>

      {/* Key facts */}
      <section className="border-b border-charcoal-100 bg-surface">
        <dl className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-charcoal-100">
          {[
            ["Lessons", `${lessons.length} in ${units.length} units`],
            ["Video content", `${Math.round(totalMin / 6) / 10} hours`],
            ["Vocabulary", info.vocab],
            ["Kanji", info.kanji],
            ["Study time", info.studyHours],
          ].map(([k, v]) => (
            <div key={k} className="px-4 py-4">
              <dt className="text-xs font-bold uppercase tracking-wider text-charcoal-500">{k}</dt>
              <dd className="mt-0.5 font-display font-bold text-indigo-950">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.5fr_1fr] gap-10">
          {/* Syllabus */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950">Syllabus</h2>
            <p className="mt-1 text-charcoal-700">Every lesson is free — video, study notes, audio lecture and handout. No sign-in needed.</p>
            <div className="mt-6 space-y-4">
              {units.map((u) => (
                <details key={u.n} open={u.n === 1} className="group card-modern overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 min-h-[56px]">
                    <span>
                      <span className="text-xs font-bold uppercase tracking-wider text-sun-500">Unit {u.n}</span>
                      <span className="block font-display font-bold text-indigo-950">{u.title}</span>
                    </span>
                    <span className="shrink-0 text-sm text-charcoal-500">{u.lessons.length} lessons</span>
                  </summary>
                  <ol className="divide-y divide-charcoal-100 border-t border-charcoal-100">
                    {u.lessons.map((l) => {
                      return (
                        <li key={l.id}>
                          <Link href={`/online-classroom/${level.toLowerCase()}/${l.id}`} className="flex items-start gap-3 px-5 py-3.5 hover:bg-bg">
                            <PlayCircle size={20} className="mt-0.5 shrink-0 text-sun-400" />
                            <span className="flex-1 min-w-0">
                              <span className="block font-semibold text-charcoal-900 font-jp">{l.title}</span>
                              <span className="block text-sm text-charcoal-500">{l.summary}</span>
                            </span>
                            <span className="shrink-0 text-right text-xs">
                              <span className="block rounded bg-success/10 px-1.5 py-0.5 font-bold text-success">FREE</span>
                              <span className="mt-1 block text-charcoal-500">{l.duration_min} min</span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                </details>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="card-modern p-6">
              <h2 className="font-bold text-indigo-950">After {level} you can</h2>
              <ul className="mt-3 space-y-2">
                {info.canDo.map((c) => (
                  <li key={c} className="flex gap-2 text-sm text-charcoal-700"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-success" />{c}</li>
                ))}
              </ul>
            </div>
            <div className="card-modern p-6">
              <h2 className="font-bold text-indigo-950">JLPT {level} exam format</h2>
              <table className="mt-3 w-full text-sm">
                <tbody className="divide-y divide-charcoal-100">
                  {info.exam.map((e) => (
                    <tr key={e.section}>
                      <td className="py-2 pr-3 text-charcoal-700">{e.section}</td>
                      <td className="py-2 text-right font-semibold whitespace-nowrap">{e.minutes} min</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-sm"><span className="font-semibold">Pass mark:</span> {info.passMark}</p>
              <p className="mt-2 text-xs text-charcoal-500">Held in India typically in July and December. Always confirm current details on <a className="underline" href="https://www.jlpt.jp/e/" target="_blank" rel="noopener noreferrer">jlpt.jp</a>.</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Live classes */}
      <section className="bg-indigo-950 py-16 sm:py-24 text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-sun-300"><Radio size={14} className="inline -mt-0.5" /> Live online classes</p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold">Upcoming {level} live classes</h2>
            </div>
          </div>
          {upcoming.length ? (
            <ul className="mt-6 grid md:grid-cols-2 gap-4">
              {upcoming.map((s) => {
                const link = links.get(s.id);
                return (
                  <li key={s.id} className="rounded-lg bg-surface p-5 text-charcoal-900">
                    <div className="flex items-center justify-between gap-2">
                      <LiveBadge startsAt={s.starts_at} durationMin={s.duration_min} />
                      <span className="text-xs text-charcoal-500">{s.platform} · {s.duration_min} min</span>
                    </div>
                    <h3 className="mt-2 font-display font-bold text-indigo-950">{s.title}</h3>
                    <p className="text-sm text-charcoal-700">{fmtIST(s.starts_at)} IST{teacherName(s.teacher_id) ? ` · ${teacherName(s.teacher_id)}` : ""}</p>
                    {s.description ? <p className="mt-1 text-sm text-charcoal-500">{s.description}</p> : null}
                    <div className="mt-4">
                      <LiveAction startsAt={s.starts_at} durationMin={s.duration_min} joinUrl={link?.join_url} recordingUrl={link?.recording_url} platform={s.platform} />
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-6 rounded-lg bg-white/10 p-5 text-white/80">
              The live class timetable is published when the next {level} batch starts. <Link href={`/batches?level=${level}`} className="underline text-sun-300">See upcoming batches</Link>.
            </p>
          )}
        </div>
      </section>

      {/* Recordings + materials */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-indigo-950"><Video size={22} className="inline -mt-1 text-sun-400" /> Class recordings</h2>
            <p className="mt-1 text-charcoal-700">Missed a class? Every live class is recorded and free to watch.</p>
            {recordings.length ? (
              <ul className="mt-5 divide-y divide-charcoal-100 card-modern">
                {recordings.map((s) => {
                  const link = links.get(s.id);
                  return (
                    <li key={s.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                      <span className="min-w-0">
                        <span className="block font-semibold text-charcoal-900 truncate">{s.title}</span>
                        <span className="block text-xs text-charcoal-500">{fmtIST(s.starts_at)} · {s.duration_min} min</span>
                      </span>
                      {link?.recording_url ? (
                        <a href={link.recording_url} target="_blank" rel="noopener noreferrer" className="shrink-0 inline-flex items-center gap-1 rounded-md bg-indigo-900 px-3 min-h-[40px] text-sm font-bold text-white"><PlayCircle size={15} /> Watch</a>
                      ) : (
                        <span className="shrink-0 text-sm text-charcoal-500">Coming soon</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-5 rounded-lg border border-dashed border-charcoal-300 p-5 text-sm text-charcoal-500">Recordings appear here after each live class.</p>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-indigo-950"><BookOpen size={22} className="inline -mt-1 text-sun-400" /> Study materials</h2>
            <p className="mt-1 text-charcoal-700">Free tools and handouts for everyone.</p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-3">
              {info.materials.map((m) => (
                <li key={m.title}>
                  <Link href={m.href} className="flex h-full gap-3 card-modern p-4 hover:border-sun-400">
                    <FileText size={20} className="shrink-0 text-sun-400" />
                    <span>
                      <span className="block font-semibold text-charcoal-900">{m.title}</span>
                      <span className="block text-xs text-charcoal-500">{m.desc}</span>
                      <span className="mt-1 inline-block text-[11px] font-bold text-success">FREE</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-bold text-indigo-950">Practice quizzes</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {difficulties.map((d) => (
                <Link key={d.id} href={`/jlpt-quiz/${level.toLowerCase()}/${d.id}`} className="rounded-md border border-charcoal-100 bg-surface px-4 min-h-[44px] inline-flex items-center text-sm font-semibold text-indigo-800 hover:border-sun-400">
                  {level} {d.label} · 10 Qs
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Batches */}
      <section className="bg-bg-alt py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950">Join a {level} batch</h2>
            <span className="inline-flex items-center gap-1.5 text-sm text-charcoal-700"><Clock size={15} /> Live teacher-led classes, 100% online</span>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {levelBatches.length ? levelBatches.map((b) => <BatchCard key={b.id} batch={b} />) : (
              <p className="text-charcoal-700">New {level} batches are being scheduled. <Link href="/contact" className="underline">Join the waitlist</Link>.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
