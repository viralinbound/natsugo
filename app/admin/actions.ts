"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSessionClient, requireAdminPage } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/storage";
import { sendClassroomWelcome } from "@/lib/email";

// Every action re-checks admin status; the database RLS policies enforce it again.
const requireAdmin = requireAdminPage;

const str = (f: FormData, k: string, max = 200) => String(f.get(k) ?? "").trim().slice(0, max);
const int = (f: FormData, k: string) => Math.max(0, Math.round(Number(f.get(k) ?? 0)) || 0);
const refreshSite = () => revalidatePath("/", "layout");

export type ActionResult = { ok: boolean; message: string };

export async function setLeadStatus(id: string, status: "new" | "contacted" | "confirmed" | "closed"): Promise<ActionResult> {
  const sb = await requireAdmin();
  if (status === "confirmed") {
    const { error } = await sb.rpc("confirm_enrolment", { p_lead: id });
    if (error) return { ok: false, message: error.message };
    // Give the student classroom access for the batch's level.
    const { data: lead } = await sb.from("leads").select("name,email,phone,batch_id,batches(level)").eq("id", id).single();
    const batchLevel = (lead?.batches as { level?: string } | null)?.level;
    let extra = "";
    if (lead?.email) {
      const email = lead.email.trim().toLowerCase();
      const { data: existing } = await sb.from("students").select("levels,batch_ids").eq("email", email).maybeSingle();
      const levels = Array.from(new Set([...(existing?.levels ?? []), ...(batchLevel && batchLevel !== "All Levels" ? [batchLevel] : [])]));
      const batch_ids = Array.from(new Set([...(existing?.batch_ids ?? []), ...(lead.batch_id ? [lead.batch_id] : [])]));
      const { error: sErr } = await sb.from("students").upsert({ email, name: lead.name, phone: lead.phone, levels, batch_ids, active: true });
      if (!sErr) {
        await sendClassroomWelcome(email, lead.name, levels).catch(() => null);
        extra = " Classroom access given and welcome email sent.";
      }
    } else {
      extra = " No email on this enquiry — add the student under Students to give classroom access.";
    }
    refreshSite();
    return { ok: true, message: `Confirmed — seat deducted from the batch.${extra}` };
  }
  const { error } = await sb.from("leads").update({ status }).eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin");
  return { ok: true, message: "Status updated." };
}

export async function saveBatch(_: ActionResult | null, f: FormData): Promise<ActionResult> {
  const sb = await requireAdmin();
  const id = str(f, "id", 20) || `b${Date.now().toString(36)}`;
  const row = {
    id,
    course_slug: str(f, "course_slug", 60),
    course_title: str(f, "course_title", 100),
    level: str(f, "level", 12),
    mode: str(f, "mode", 10),
    days: str(f, "days", 10),
    time_of_day: str(f, "time_of_day", 12),
    goal: str(f, "goal", 20),
    start_date: str(f, "start_date", 10),
    schedule: str(f, "schedule", 120),
    duration_hours: int(f, "duration_hours"),
    seats_total: int(f, "seats_total"),
    seats_left: Math.min(int(f, "seats_left"), int(f, "seats_total")),
    price_label: str(f, "price_label", 60) || "Fee on request",
    teacher_id: str(f, "teacher_id", 20) || null,
    published: f.get("published") === "on",
  };
  if (!row.course_title || !row.start_date || !row.schedule) return { ok: false, message: "Title, start date and schedule are required." };
  const { error } = await sb.from("batches").upsert(row);
  if (error) return { ok: false, message: error.message };
  refreshSite();
  return { ok: true, message: `Saved ${row.course_title}.` };
}

export async function deleteBatch(id: string): Promise<ActionResult> {
  const sb = await requireAdmin();
  const { error } = await sb.from("batches").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  refreshSite();
  return { ok: true, message: "Batch deleted." };
}

export async function moderateReview(id: string, action: "approve" | "verify" | "hide" | "delete"): Promise<ActionResult> {
  const sb = await requireAdmin();
  const q =
    action === "delete"
      ? sb.from("testimonials").delete().eq("id", id)
      : sb.from("testimonials").update(action === "hide" ? { approved: false } : action === "verify" ? { approved: true, verified: true } : { approved: true }).eq("id", id);
  const { error } = await q;
  if (error) return { ok: false, message: error.message };
  refreshSite();
  return { ok: true, message: "Review updated." };
}

export async function saveTeacher(_: ActionResult | null, f: FormData): Promise<ActionResult> {
  const sb = await requireAdmin();
  const id = str(f, "id", 20) || `t${Date.now().toString(36)}`;
  let photo_url: string | null = str(f, "photo_url", 500) || null;
  const file = f.get("photo");
  if (file instanceof File && file.size > 0) {
    try {
      photo_url = await uploadImage(file, "teachers", sb);
    } catch (e) {
      return { ok: false, message: (e as Error).message };
    }
  }
  const row = {
    id,
    name: str(f, "name", 80),
    role: str(f, "role", 80) || "Japanese Language Instructor",
    experience_years: f.get("experience_years") ? int(f, "experience_years") : null,
    levels: String(f.get("levels") ?? "").split(",").map((s) => s.trim().toUpperCase()).filter((s) => /^N[1-5]$/.test(s)),
    specialization: str(f, "specialization", 120),
    bio: str(f, "bio", 600) || null,
    photo_url,
    published: f.get("published") === "on",
    sort: int(f, "sort"),
  };
  if (!row.name) return { ok: false, message: "Name is required." };
  const { error } = await sb.from("teachers").upsert(row);
  if (error) return { ok: false, message: error.message };
  refreshSite();
  return { ok: true, message: `Saved ${row.name}.` };
}

export async function saveExamInfo(_: ActionResult | null, f: FormData): Promise<ActionResult> {
  const sb = await requireAdmin();
  const sessionCount = Math.min(4, int(f, "session_count") || 1);
  const sessions = Array.from({ length: sessionCount }, (_, i) => ({
    name: str(f, `session_${i}_name`, 60),
    examDate: str(f, `session_${i}_examDate`, 120),
    registrationWindow: str(f, `session_${i}_registrationWindow`, 160),
    resultsDate: str(f, `session_${i}_resultsDate`, 120),
  })).filter((s) => s.name);
  const value = {
    officialLink: str(f, "officialLink", 300) || "https://www.jlpt.jp/e/",
    sessions,
    fee: str(f, "fee", 300),
    centres: String(f.get("centres") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
    note: str(f, "note", 500),
  };
  const { error } = await sb.from("settings").upsert({ key: "exam_info", value });
  if (error) return { ok: false, message: error.message };
  refreshSite();
  return { ok: true, message: "Exam info updated." };
}

export async function saveAnnouncement(_: ActionResult | null, f: FormData): Promise<ActionResult> {
  const sb = await requireAdmin();
  const value = { text: str(f, "text", 140), enabled: f.get("enabled") === "on" };
  const { error } = await sb.from("settings").upsert({ key: "announcement", value });
  if (error) return { ok: false, message: error.message };
  refreshSite();
  return { ok: true, message: "Announcement updated." };
}

export async function signOut() {
  const sb = await getSessionClient();
  await sb?.auth.signOut();
  redirect("/admin/login");
}

const levelsFrom = (f: FormData) => f.getAll("levels").map(String).filter((l) => /^N[1-5]$/.test(l));

export async function generateBatchSchedule(_: ActionResult | null, f: FormData): Promise<ActionResult> {
  const sb = await requireAdmin();
  const batchId = str(f, "batch_id", 20);
  const joinUrl = str(f, "join_url", 600);
  const platform = str(f, "platform", 20) || "Zoom";
  if (!batchId) return { ok: false, message: "Choose a batch." };

  const { parseSchedule, nextOccurrences } = await import("@/lib/scheduleGen");
  const { data: batch } = await sb.from("batches").select("*").eq("id", batchId).single();
  if (!batch) return { ok: false, message: "Batch not found." };
  const parsed = parseSchedule(batch.schedule);
  if (!parsed) return { ok: false, message: `Could not read the schedule "${batch.schedule}". Expected e.g. "Mon • Wed • Fri, 7:00 – 8:30 PM".` };

  const { data: lessons } = await sb.from("lessons").select("id,title,unit,sort").eq("level", batch.level).eq("published", true).order("unit").order("sort");
  const count = lessons?.length || 12;
  const startDate = batch.start_date as string;
  const dates = nextOccurrences(parsed, startDate, count);

  const rows = dates.map((d, i) => ({
    level: batch.level,
    batch_id: batch.id,
    title: lessons?.[i] ? `${batch.course_title} — ${lessons[i].title}` : `${batch.course_title} — Class ${i + 1}`,
    starts_at: d.toISOString(),
    duration_min: parsed.durationMin,
    teacher_id: batch.teacher_id,
    platform,
  }));

  const { data: inserted, error } = await sb.from("live_sessions").insert(rows).select("id");
  if (error) return { ok: false, message: error.message };
  if (joinUrl && inserted?.length) {
    const { error: lErr } = await sb.from("live_session_links").insert(inserted.map((r) => ({ session_id: r.id, join_url: joinUrl })));
    if (lErr) return { ok: false, message: lErr.message };
  }
  refreshSite();
  return { ok: true, message: `Created ${rows.length} classes for ${batch.course_title}, starting ${dates[0]?.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}.` };
}

export async function saveLesson(_: ActionResult | null, f: FormData): Promise<ActionResult> {
  const sb = await requireAdmin();
  const id = str(f, "id", 40);
  if (!id) return { ok: false, message: "Missing lesson id." };
  const lesson = {
    title: str(f, "title", 160),
    summary: str(f, "summary", 400),
    duration_min: int(f, "duration_min"),
    is_free: f.get("is_free") === "on",
    published: f.get("published") === "on",
  };
  const asset = {
    lesson_id: id,
    video_url: str(f, "video_url", 600) || null,
    notes: String(f.get("notes") ?? "").slice(0, 20000) || null,
    material_url: str(f, "material_url", 600) || null,
    material_label: str(f, "material_label", 80) || null,
  };
  const [a, b] = await Promise.all([
    sb.from("lessons").update(lesson).eq("id", id),
    sb.from("lesson_assets").upsert(asset),
  ]);
  const error = a.error ?? b.error;
  if (error) return { ok: false, message: error.message };
  refreshSite();
  return { ok: true, message: `Saved “${lesson.title}”.` };
}

export async function saveLiveSession(_: ActionResult | null, f: FormData): Promise<ActionResult> {
  const sb = await requireAdmin();
  const date = str(f, "date", 10);
  const time = str(f, "time", 5);
  if (!date || !time) return { ok: false, message: "Date and time are required." };
  // Inputs are in IST.
  const starts_at = new Date(`${date}T${time}:00+05:30`).toISOString();
  const row = {
    ...(str(f, "id", 40) ? { id: str(f, "id", 40) } : {}),
    level: str(f, "level", 12),
    batch_id: str(f, "batch_id", 20) || null,
    title: str(f, "title", 160),
    description: str(f, "description", 500) || null,
    starts_at,
    duration_min: Math.min(300, Math.max(10, int(f, "duration_min") || 60)),
    teacher_id: str(f, "teacher_id", 20) || null,
    platform: str(f, "platform", 20) || "Zoom",
    cancelled: f.get("cancelled") === "on",
  };
  if (!row.title) return { ok: false, message: "Title is required." };
  const { data, error } = await sb.from("live_sessions").upsert(row).select("id").single();
  if (error) return { ok: false, message: error.message };
  const { error: lErr } = await sb.from("live_session_links").upsert({
    session_id: data.id,
    join_url: str(f, "join_url", 600) || null,
    recording_url: str(f, "recording_url", 600) || null,
  });
  if (lErr) return { ok: false, message: lErr.message };
  refreshSite();
  return { ok: true, message: `Saved “${row.title}”.` };
}

export async function deleteLiveSession(id: string): Promise<ActionResult> {
  const sb = await requireAdmin();
  const { error } = await sb.from("live_sessions").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  refreshSite();
  return { ok: true, message: "Class deleted." };
}

export async function saveStudent(_: ActionResult | null, f: FormData): Promise<ActionResult> {
  const sb = await requireAdmin();
  const email = str(f, "email", 150).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: "Enter a valid email." };
  const isNew = f.get("is_new") === "1";
  const row = {
    email,
    name: str(f, "name", 100),
    phone: str(f, "phone", 20) || null,
    levels: levelsFrom(f),
    batch_ids: String(f.get("batch_ids") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
    active: f.get("active") === "on",
    access_until: str(f, "access_until", 10) || null,
  };
  if (!row.name) return { ok: false, message: "Name is required." };
  const { error } = await sb.from("students").upsert(row);
  if (error) return { ok: false, message: error.message };
  if (isNew && f.get("send_welcome") === "on") await sendClassroomWelcome(email, row.name, row.levels).catch(() => null);
  revalidatePath("/admin/students");
  return { ok: true, message: `Saved ${row.name}${isNew && f.get("send_welcome") === "on" ? " and sent the welcome email" : ""}.` };
}
