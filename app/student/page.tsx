import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen, Download, PlayCircle, Radio, Video } from "lucide-react";
import { getStudent } from "@/lib/student";
import { fmtIST, getLessons, getLiveSessions } from "@/lib/portalRepo";
import { levelInfo } from "@/lib/curriculum";
import { quizLevels, type QuizLevel } from "@/lib/quizBank";
import { LiveAction, LiveBadge } from "@/components/learn/LiveStatus";
import { StudentLogout } from "@/components/learn/StudentLogin";

export const metadata: Metadata = { title: "My classroom", robots: { index: false } };

export default async function StudentDashboard() {
  const portal = await getStudent();
  if (!portal) redirect("/student/login");
  const levels = portal.student.levels.filter((l): l is QuizLevel => quizLevels.includes(l as QuizLevel));
  // eslint-disable-next-line react-hooks/purity -- request-time split of upcoming vs past classes
  const cutoff = new Date(Date.now() - 3 * 3600_000).toISOString();

  const [upcoming, past, lessonsByLevel] = await Promise.all([
    getLiveSessions({ levels, from: cutoff, limit: 10 }),
    getLiveSessions({ levels, to: cutoff, limit: 20 }),
    Promise.all(levels.map(async (l) => ({ level: l, lessons: await getLessons(l) }))),
  ]);
  const mine = (id: string) => portal.live.get(id);
  const myUpcoming = upcoming.filter((s) => mine(s.id));
  const recordings = past.filter((s) => mine(s.id)?.recording_url);
  const materials = lessonsByLevel.flatMap(({ lessons }) =>
    lessons.map((l) => ({ l, a: portal.assets.get(l.id) })).filter((x) => x.a?.material_url)
  );
  const next = myUpcoming[0];

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-jp text-sun-500 font-bold">おかえりなさい！</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-950">Welcome back, {portal.student.name.split(" ")[0]}</h1>
            <p className="text-sm text-charcoal-500">Enrolled in: {levels.length ? levels.map((l) => `JLPT ${l}`).join(", ") : "no level yet — contact admissions"}</p>
          </div>
          <StudentLogout />
        </div>

        {/* Next class */}
        <div className="mt-6 brand-pattern brand-pattern-light overflow-hidden rounded-xl bg-indigo-950 p-6 sm:p-8 text-white">
          <p className="text-sm font-bold uppercase tracking-wider text-sun-300"><Radio size={14} className="inline -mt-0.5" /> Next live class</p>
          {next ? (
            <div className="mt-2 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2"><LiveBadge startsAt={next.starts_at} durationMin={next.duration_min} /></div>
                <h2 className="mt-2 text-2xl font-bold">{next.title}</h2>
                <p className="text-white/75">{fmtIST(next.starts_at)} IST · {next.duration_min} min · {next.platform}</p>
              </div>
              <div className="[&_span]:text-white/70">
                <LiveAction startsAt={next.starts_at} durationMin={next.duration_min} joinUrl={mine(next.id)?.join_url} recordingUrl={mine(next.id)?.recording_url} enrolled platform={next.platform} />
              </div>
            </div>
          ) : (
            <p className="mt-2 text-white/80">No live classes scheduled right now. Your teacher will publish the timetable here.</p>
          )}
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          {/* Continue learning */}
          <div className="lg:col-span-2 space-y-6">
            {lessonsByLevel.map(({ level, lessons }) => (
              <div key={level} className="card-modern">
                <div className="flex items-center justify-between gap-3 border-b border-charcoal-100 px-5 py-4">
                  <h2 className="font-display font-bold text-indigo-950"><BookOpen size={18} className="inline -mt-0.5 text-sun-400" /> JLPT {level} lessons</h2>
                  <Link href={`/online-classroom/${level.toLowerCase()}`} className="text-sm font-semibold text-indigo-800 underline py-2">Level page</Link>
                </div>
                <ol className="grid sm:grid-cols-2 gap-px bg-charcoal-100">
                  {lessons.slice(0, 6).map((l) => (
                    <li key={l.id} className="bg-surface">
                      <Link href={`/online-classroom/${level.toLowerCase()}/${l.id}`} className="flex items-start gap-2.5 px-5 py-3.5 hover:bg-bg">
                        <PlayCircle size={18} className="mt-0.5 shrink-0 text-sun-400" />
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-charcoal-900 font-jp">{l.title}</span>
                          <span className="block text-xs text-charcoal-500">Unit {l.unit} · {l.duration_min} min</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <p className="px-5 py-3 text-sm text-charcoal-500">{lessons.length} lessons · {levelInfo[level].tagline}</p>
              </div>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="card-modern p-5">
              <h2 className="font-display font-bold text-indigo-950"><Radio size={17} className="inline -mt-0.5 text-sun-400" /> Schedule</h2>
              {myUpcoming.length ? (
                <ul className="mt-3 divide-y divide-charcoal-100">
                  {myUpcoming.map((s) => (
                    <li key={s.id} className="py-2.5">
                      <p className="text-sm font-semibold text-charcoal-900">{s.title}</p>
                      <p className="text-xs text-charcoal-500">{fmtIST(s.starts_at)} · <LiveBadge startsAt={s.starts_at} durationMin={s.duration_min} /></p>
                    </li>
                  ))}
                </ul>
              ) : <p className="mt-2 text-sm text-charcoal-500">Nothing scheduled yet.</p>}
            </div>
            <div className="card-modern p-5">
              <h2 className="font-display font-bold text-indigo-950"><Video size={17} className="inline -mt-0.5 text-sun-400" /> Recordings</h2>
              {recordings.length ? (
                <ul className="mt-3 divide-y divide-charcoal-100">
                  {recordings.map((s) => (
                    <li key={s.id} className="flex items-center justify-between gap-2 py-2.5">
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-charcoal-900">{s.title}</span>
                        <span className="block text-xs text-charcoal-500">{fmtIST(s.starts_at)}</span>
                      </span>
                      <a href={mine(s.id)!.recording_url!} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-md bg-indigo-900 px-3 min-h-[36px] inline-flex items-center text-xs font-bold text-white">Watch</a>
                    </li>
                  ))}
                </ul>
              ) : <p className="mt-2 text-sm text-charcoal-500">Recordings appear after each class.</p>}
            </div>
            <div className="card-modern p-5">
              <h2 className="font-display font-bold text-indigo-950"><Download size={17} className="inline -mt-0.5 text-sun-400" /> Handouts</h2>
              {materials.length ? (
                <ul className="mt-3 space-y-2">
                  {materials.map(({ l, a }) => (
                    <li key={l.id}><a href={a!.material_url!} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-indigo-800 underline">{a!.material_label || l.title}</a></li>
                  ))}
                </ul>
              ) : <p className="mt-2 text-sm text-charcoal-500">Handouts appear here as your teacher uploads them. Lesson notes are on each lesson page.</p>}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
