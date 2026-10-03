import { centresSnapshot, fetchIndiaCentres, officialExamLink, upcomingSessions, type ExamCentre } from "@/lib/jlptExam";
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
    const rows = (data as BatchRow[]).map(rowToBatch).filter((b) => b.mode !== "Offline");
    // Until real batches are published, the example batches keep the section filled.
    return rows.length ? rows : sampleBatches;
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
    const rows = data.map((t): Teacher => ({
      id: t.id,
      name: t.name,
      role: t.role,
      experienceYears: t.experience_years ?? 0,
      levels: t.levels,
      specialization: t.specialization,
      photo: t.photo_url ?? undefined,
      bio: t.bio ?? undefined,
    }));
    return rows.length ? rows : sampleTeachers;
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
export interface ExamInfo {
  officialLink: string;
  sessions: (ExamSession & { centres?: string; iso?: string })[];
  fee: string;
  centres: string[];
  centreDetails: ExamCentre[];
  note: string;
  checkedAt?: string;
  generatedAt: string;
}

const DEFAULT_FEE = "The fee is set by each host centre and changes every session. Open your centre's page below for the current amount.";
const DEFAULT_NOTE = "Dates and centres on this page update automatically from the official JLPT website. Always confirm with your host centre before you book travel.";

// Exam dates are computed and the India centres are read from the official site, so this page stays current
// without anyone editing it. Settings saved in the admin panel can still override the fee text and the note.
export async function getExamInfo(): Promise<ExamInfo> {
  const live = await fetchIndiaCentres();
  const centres = live.length ? live : centresSnapshot;
  let override: Partial<ExamInfo> = {};
  const sb = getPublicClient();
  if (sb) {
    override = await safe(async () => {
      const { data, error } = await sb.from("settings").select("value").eq("key", "exam_info").maybeSingle();
      if (error) throw error;
      return (data?.value as Partial<ExamInfo>) ?? {};
    }, {});
  }
  // A fee saved in the admin panel is shown only when it names a real amount; older placeholder text is ignored.
  const customFee = override.fee && /[₹\d]/.test(override.fee) ? override.fee : undefined;
  return {
    officialLink: override.officialLink || officialExamLink,
    sessions: upcomingSessions(centres),
    fee: customFee ?? DEFAULT_FEE,
    centres: centres.map((c) => c.city),
    centreDetails: centres,
    note: DEFAULT_NOTE,
    generatedAt: new Date().toISOString(),
    checkedAt: live.length ? new Date().toISOString() : undefined,
  };
}
