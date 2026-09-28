import { requireAdminPage } from "@/lib/supabase/server";
import { saveLiveSession, generateBatchSchedule } from "@/app/admin/actions";
import { ActionForm, Field, fieldCls } from "@/components/admin/AdminControls";
import { DeleteLiveButton } from "@/components/admin/LiveControls";
import { UrlOrUpload } from "@/components/admin/FileUpload";

type Session = {
  id: string; level: string; batch_id: string | null; title: string; description: string | null; starts_at: string;
  duration_min: number; teacher_id: string | null; platform: string; cancelled: boolean;
  live_session_links: { join_url: string | null; recording_url: string | null } | null;
};

const levels = ["N5", "N4", "N3", "N2", "N1", "All Levels"];
const platforms = ["Zoom", "Google Meet", "YouTube Live", "Microsoft Teams", "Other"];

const ist = (iso: string) => {
  const d = new Date(new Date(iso).getTime() + 5.5 * 3600_000).toISOString();
  return { date: d.slice(0, 10), time: d.slice(11, 16) };
};

function Fields({ s, batches, teachers, blob }: { s?: Session; batches: { id: string; course_title: string }[]; teachers: { id: string; name: string }[]; blob: boolean }) {
  const t = s ? ist(s.starts_at) : { date: "", time: "19:00" };
  return (
    <div className="grid gap-3">
      {s ? <input type="hidden" name="id" value={s.id} /> : null}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Field label="Title"><input name="title" required defaultValue={s?.title} placeholder="N5 · Lesson 4 — Particles" className={fieldCls} /></Field>
        <Field label="Date (IST)"><input name="date" type="date" required defaultValue={t.date} className={fieldCls} /></Field>
        <Field label="Start time (IST)"><input name="time" type="time" required defaultValue={t.time} className={fieldCls} /></Field>
        <Field label="Minutes"><input name="duration_min" type="number" min={10} max={300} defaultValue={s?.duration_min ?? 60} className={fieldCls} /></Field>
        <Field label="Level"><select name="level" defaultValue={s?.level ?? "N5"} className={fieldCls}>{levels.map((l) => <option key={l}>{l}</option>)}</select></Field>
        <Field label="Batch (optional)">
          <select name="batch_id" defaultValue={s?.batch_id ?? ""} className={fieldCls}>
            <option value="">All students of the level</option>
            {batches.map((b) => <option key={b.id} value={b.id}>{b.course_title}</option>)}
          </select>
        </Field>
        <Field label="Teacher">
          <select name="teacher_id" defaultValue={s?.teacher_id ?? ""} className={fieldCls}>
            <option value="">—</option>
            {teachers.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
          </select>
        </Field>
        <Field label="Platform"><select name="platform" defaultValue={s?.platform ?? "Zoom"} className={fieldCls}>{platforms.map((p) => <option key={p}>{p}</option>)}</select></Field>
      </div>
      <Field label="Join link (only enrolled students see it, from 15 min before)"><input name="join_url" defaultValue={s?.live_session_links?.join_url ?? ""} placeholder="https://zoom.us/j/…" className={fieldCls} /></Field>
      <Field label="Recording (add after class — link or upload)">
        <UrlOrUpload name="recording_url" defaultValue={s?.live_session_links?.recording_url} folder="recordings" accept="video/mp4,video/webm,video/quicktime" placeholder="https://youtu.be/… or Zoom cloud link" blobEnabled={blob} />
      </Field>
      <Field label="Description (optional)"><input name="description" defaultValue={s?.description ?? ""} className={fieldCls} /></Field>
      {s ? <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="cancelled" defaultChecked={s.cancelled} className="h-5 w-5 accent-red-600" /> Cancelled</label> : null}
    </div>
  );
}

export default async function AdminLive() {
  const sb = await requireAdminPage();
  const [{ data: sessions }, { data: batches }, { data: teachers }] = await Promise.all([
    sb.from("live_sessions").select("*, live_session_links(*)").order("starts_at", { ascending: false }).limit(100),
    sb.from("batches").select("id,course_title,schedule,start_date").order("start_date"),
    sb.from("teachers").select("id,name").order("sort"),
  ]);
  const blob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  const fmt = (iso: string) => new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });

  return (
    <div className="space-y-5">
      <details className="rounded-lg border-2 border-dashed border-success/40 bg-success/5 p-5" open={!sessions?.length}>
        <summary className="cursor-pointer font-bold text-indigo-950">⚡ Auto-generate a batch&apos;s whole timetable</summary>
        <p className="mt-2 text-sm text-charcoal-700">Reads the batch&apos;s schedule (e.g. &ldquo;Mon • Wed • Fri, 7:00 – 8:30 PM&rdquo;) and creates one live class per lesson, all using the same join link — the fastest way to get a real class calendar running.</p>
        <div className="mt-4">
          <ActionForm action={generateBatchSchedule} submitLabel="Generate classes">
            <div className="grid sm:grid-cols-3 gap-3">
              <Field label="Batch">
                <select name="batch_id" required className={fieldCls}>
                  <option value="">Choose a batch…</option>
                  {(batches ?? []).map((b) => <option key={b.id} value={b.id}>{b.course_title} — {b.schedule}</option>)}
                </select>
              </Field>
              <Field label="Join link (used for every class)"><input name="join_url" placeholder="https://zoom.us/j/…" className={fieldCls} /></Field>
              <Field label="Platform">
                <select name="platform" defaultValue="Zoom" className={fieldCls}>
                  {["Zoom", "Google Meet", "YouTube Live", "Microsoft Teams", "Other"].map((p) => <option key={p}>{p}</option>)}
                </select>
              </Field>
            </div>
          </ActionForm>
        </div>
      </details>

      <details className="rounded-lg border-2 border-dashed border-indigo-900/30 bg-surface p-5">
        <summary className="cursor-pointer font-bold text-indigo-950">+ Schedule a single class</summary>
        <div className="mt-4"><ActionForm action={saveLiveSession} submitLabel="Schedule class"><Fields batches={batches ?? []} teachers={teachers ?? []} blob={blob} /></ActionForm></div>
      </details>
      {(sessions as Session[] | null)?.map((s) => (
        <details key={s.id} className="card-modern p-5">
          <summary className="cursor-pointer flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-bold text-indigo-950">{s.title}</span>
            <span className="text-sm text-charcoal-500">{fmt(s.starts_at)} · {s.level} · {s.platform}</span>
            {s.cancelled ? <span className="rounded bg-red-600/10 px-2 text-xs font-bold text-red-600">CANCELLED</span> : null}
            {s.live_session_links?.recording_url ? <span className="rounded bg-success/10 px-2 text-xs font-bold text-success">RECORDING</span> : null}
            {!s.live_session_links?.join_url ? <span className="rounded bg-sun-100 px-2 text-xs font-bold text-sun-500">NO JOIN LINK</span> : null}
          </summary>
          <div className="mt-4 space-y-3">
            <ActionForm action={saveLiveSession}><Fields s={s} batches={batches ?? []} teachers={teachers ?? []} blob={blob} /></ActionForm>
            <DeleteLiveButton id={s.id} />
          </div>
        </details>
      ))}
    </div>
  );
}
