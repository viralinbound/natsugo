import "server-only";
import { batches as sampleBatches, fmtDate, teachers as sampleTeachers, testimonials as sampleTestimonials } from "@/lib/data";
import { getPublicClient } from "@/lib/supabase/admin";
import { words as sampleWords, wordForDate, type Word } from "@/lib/words";
import type { Batch, Teacher, Testimonial } from "@/lib/types";
import { quizBank, type Difficulty, type QuizLevel, type QuizQuestion } from "@/lib/quizBank";

export interface BatchRow {
  id: string;
  course_slug: string;
  course_title: string;
  level: Batch["level"];
  mode: Batch["mode"];
  days: Batch["days"];
  time_of_day: Batch["time"];
  goal: Batch["goal"];
  start_date: string;
  schedule: string;
  duration_hours: number;
  seats_total: number;
  seats_left: number;
  price_label: string;
  teacher_id: string | null;
  published: boolean;
}

export const rowToBatch = (r: BatchRow): Batch => ({
  id: r.id,
  courseSlug: r.course_slug,
  courseTitle: r.course_title,
  level: r.level,
  mode: r.mode,
  days: r.days,
  time: r.time_of_day,
  goal: r.goal,
  startISO: r.start_date,
  startDate: fmtDate(r.start_date),
  schedule: r.schedule,
  durationHours: r.duration_hours,
  seatsLeft: r.seats_left,
  seatsTotal: r.seats_total,
  priceLabel: r.price_label,
  teacherId: r.teacher_id ?? undefined,
});

export const batchToRow = (b: Batch): Omit<BatchRow, "published"> => ({
  id: b.id,
  course_slug: b.courseSlug,
  course_title: b.courseTitle,
  level: b.level,
  mode: b.mode,
  days: b.days,
  time_of_day: b.time,
  goal: b.goal,
  start_date: b.startISO,
  schedule: b.schedule,
  duration_hours: b.durationHours,
  seats_total: b.seatsTotal ?? b.seatsLeft,
  seats_left: b.seatsLeft,
  price_label: b.priceLabel,
  teacher_id: b.teacherId ?? null,
});

async function safe<T>(fn: () => Promise<T | null>, fallback: T): Promise<T> {
  try {
    return (await fn()) ?? fallback;
  } catch (err) {
    console.error("Supabase read failed; using sample data", err);
    return fallback;
  }
}

export async function getBatches(): Promise<Batch[]> {
  const sb = getPublicClient();
  if (!sb) return sampleBatches;
  return safe(async () => {
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await sb.from("batches").select("*").gte("start_date", today).order("start_date");
    if (error) throw error;
    return (data as BatchRow[]).map(rowToBatch).filter((b) => b.mode !== "Offline");
  }, sampleBatches);
}

export async function getBatch(id: string | undefined) {
  if (!id) return undefined;
  return (await getBatches()).find((b) => b.id === id);
}

export async function getTeachers(): Promise<Teacher[]> {
  const sb = getPublicClient();
  if (!sb) return sampleTeachers;
  return safe(async () => {
    const { data, error } = await sb.from("teachers").select("*").order("sort");
    if (error) throw error;
    return data.map((t): Teacher => ({
      id: t.id,
      name: t.name,
      role: t.role,
      experienceYears: t.experience_years ?? 0,
      levels: t.levels,
      specialization: t.specialization,
      photo: t.photo_url ?? undefined,
      bio: t.bio ?? undefined,
    }));
  }, sampleTeachers);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const sb = getPublicClient();
  if (!sb) return sampleTestimonials;
  return safe(async () => {
    const { data, error } = await sb.from("testimonials").select("*").order("created_at", { ascending: false }).limit(12);
    if (error) throw error;
    if (!data.length) return sampleTestimonials;
    return data.map((t): Testimonial => ({
      id: t.id,
      name: t.name,
      course: t.course,
      level: t.level,
      quote: t.quote,
      verified: t.verified,
      isPlaceholder: false,
      photo: t.photo_url ?? undefined,
    }));
  }, sampleTestimonials);
}

export async function getWordOfDay(): Promise<Word> {
  const sb = getPublicClient();
  const fallback = wordForDate(sampleWords);
  if (!sb) return fallback;
  return safe(async () => {
    const { data, error } = await sb.from("words").select("jp,reading,romaji,meaning,example_jp,example_en,level").order("id");
    if (error) throw error;
    return data.length ? wordForDate(data as Word[]) : fallback;
  }, fallback);
}

export async function getAnnouncement(): Promise<{ text: string; enabled: boolean }> {
  const fallback = { text: "New Japanese batches starting soon • Take your free level test", enabled: true };
  const sb = getPublicClient();
  if (!sb) return fallback;
  return safe(async () => {
    const { data } = await sb.from("settings").select("value").eq("key", "announcement").maybeSingle();
    return (data?.value as typeof fallback) ?? fallback;
  }, fallback);
}

export async function getQuiz(level: QuizLevel, difficulty: Difficulty): Promise<QuizQuestion[]> {
  const fallback = quizBank.filter((q) => q.level === level && q.difficulty === difficulty);
  const sb = getPublicClient();
  if (!sb) return fallback;
  return safe(async () => {
    const { data, error } = await sb
      .from("quiz_questions")
      .select("id,level,difficulty,skill,prompt,audio,options,answer,explanation")
      .eq("level", level)
      .eq("difficulty", difficulty)
      .order("sort");
    if (error) throw error;
    if (!data.length) return fallback;
    return data.map((q) => ({ ...q, audio: q.audio ?? undefined, explanation: q.explanation ?? "" })) as QuizQuestion[];
  }, fallback);
}

export interface ExamSession { name: string; examDate: string; registrationWindow: string; resultsDate: string }
export interface ExamInfo { officialLink: string; sessions: ExamSession[]; fee: string; centres: string[]; note: string }

const fallbackExamInfo: ExamInfo = {
  officialLink: "https://www.jlpt.jp/e/",
  sessions: [
    { name: "Upcoming session", examDate: "See official JLPT website", registrationWindow: "See official JLPT website", resultsDate: "See official JLPT website" },
  ],
  fee: "Check the official JLPT India notification for the current fee.",
  centres: ["Bengaluru", "Chennai", "Delhi", "Hyderabad", "Kolkata", "Mumbai", "Pune"],
  note: "Always confirm dates, fees and centres on the official JLPT website before making plans.",
};

export async function getExamInfo(): Promise<ExamInfo> {
  const sb = getPublicClient();
  if (!sb) return fallbackExamInfo;
  return safe(async () => {
    const { data, error } = await sb.from("settings").select("value").eq("key", "exam_info").maybeSingle();
    if (error) throw error;
    return (data?.value as ExamInfo) ?? fallbackExamInfo;
  }, fallbackExamInfo);
}
