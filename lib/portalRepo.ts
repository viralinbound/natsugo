import "server-only";
import { getPublicClient } from "@/lib/supabase/admin";
import { lessonSeeds } from "@/lib/curriculum";
import type { QuizLevel } from "@/lib/quizBank";

export interface Lesson {
  id: string;
  level: QuizLevel;
  unit: number;
  unit_title: string;
  sort: number;
  title: string;
  summary: string;
  duration_min: number;
  is_free: boolean;
}

export interface FreeAsset {
  lesson_id: string;
  video_url: string | null;
  notes: string | null;
  material_url: string | null;
  material_label: string | null;
}

export interface LiveSession {
  id: string;
  level: string;
  batch_id: string | null;
  title: string;
  description: string | null;
  starts_at: string;
  duration_min: number;
  teacher_id: string | null;
  platform: string;
  cancelled: boolean;
  has_recording: boolean;
}

const fallbackLessons: Lesson[] = lessonSeeds.map((l) => ({
  id: l.id, level: l.level, unit: l.unit, unit_title: l.unitTitle, sort: l.sort, title: l.title,
  summary: l.summary, duration_min: l.durationMin, is_free: l.isFree,
}));

export async function getLessons(level: QuizLevel): Promise<Lesson[]> {
  const sb = getPublicClient();
  const fb = fallbackLessons.filter((l) => l.level === level);
  if (!sb) return fb;
  const { data, error } = await sb.from("lessons").select("*").eq("level", level).order("unit").order("sort");
  if (error || !data?.length) return fb;
  return data as Lesson[];
}

// Every lesson's video, notes and handout are free for everyone.
export async function getPublicAssets(lessons: Lesson[]): Promise<Map<string, FreeAsset>> {
  const lessonIds = lessons.map((l) => l.id);
  const sb = getPublicClient();
  if (!sb || !lessonIds.length) {
    const m = new Map<string, FreeAsset>();
    lessonSeeds.filter((l) => l.notes && lessonIds.includes(l.id)).forEach((l) =>
      m.set(l.id, { lesson_id: l.id, video_url: null, notes: l.notes!, material_url: null, material_label: null })
    );
    return m;
  }
  const { data } = await sb.from("lesson_assets").select("*").in("lesson_id", lessonIds);
  return new Map((data ?? []).map((a) => [a.lesson_id, a as FreeAsset]));
}

export interface LiveLink {
  session_id: string;
  join_url: string | null;
  recording_url: string | null;
}

export async function getLiveLinks(sessionIds: string[]): Promise<Map<string, LiveLink>> {
  const sb = getPublicClient();
  if (!sb || !sessionIds.length) return new Map();
  const { data } = await sb.from("live_session_links").select("session_id, join_url, recording_url").in("session_id", sessionIds);
  return new Map((data ?? []).map((l) => [l.session_id, l as LiveLink]));
}

export async function getLiveSessions(opts: { level?: string; levels?: string[]; from?: string; to?: string; limit?: number }): Promise<LiveSession[]> {
  const sb = getPublicClient();
  if (!sb) return [];
  let q = sb.from("live_sessions").select("*").eq("cancelled", false).order("starts_at", { ascending: !opts.to });
  if (opts.level) q = q.in("level", [opts.level, "All Levels"]);
  if (opts.levels?.length) q = q.in("level", [...opts.levels, "All Levels"]);
  if (opts.from) q = q.gte("starts_at", opts.from);
  if (opts.to) q = q.lt("starts_at", opts.to);
  const { data } = await q.limit(opts.limit ?? 20);
  return (data ?? []) as LiveSession[];
}

export function groupByUnit(lessons: Lesson[]) {
  const units = new Map<number, { title: string; lessons: Lesson[] }>();
  for (const l of lessons) {
    const u = units.get(l.unit) ?? { title: l.unit_title, lessons: [] };
    u.lessons.push(l);
    units.set(l.unit, u);
  }
  return [...units.entries()].sort((a, b) => a[0] - b[0]).map(([n, u]) => ({ n, ...u }));
}

// Turn a YouTube / Vimeo / Google Drive link into an embeddable player URL; direct files play in <video>.
export function toEmbed(url: string | null | undefined): { kind: "iframe" | "video"; src: string } | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}?rel=0` };
    if (host.endsWith("youtube.com")) {
      const id = u.searchParams.get("v") ?? u.pathname.match(/\/(embed|live|shorts)\/([^/?]+)/)?.[2];
      if (id) return { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${id}?rel=0` };
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = u.pathname.match(/(\d+)/)?.[1];
      if (id) return { kind: "iframe", src: `https://player.vimeo.com/video/${id}` };
    }
    if (host === "drive.google.com") {
      const id = u.pathname.match(/\/file\/d\/([^/]+)/)?.[1];
      if (id) return { kind: "iframe", src: `https://drive.google.com/file/d/${id}/preview` };
    }
    if (/\.(mp4|webm|mov|m4v)$/i.test(u.pathname) || host.endsWith("blob.vercel-storage.com")) return { kind: "video", src: url };
    return null;
  } catch {
    return null;
  }
}

export const fmtIST = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
