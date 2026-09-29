import { requireAdminPage } from "@/lib/supabase/server";
import { courseDetails } from "@/lib/courses";
import { saveBatch } from "@/app/admin/actions";
import { ActionForm, DeleteBatchButton, Field, fieldCls } from "@/components/admin/AdminControls";
import type { BatchRow } from "@/lib/repo";

const opts = {
  level: ["N5", "N4", "N3", "N2", "N1", "All Levels"],
  mode: ["Online"],
  days: ["Weekday", "Weekend"],
  time_of_day: ["Morning", "Afternoon", "Evening"],
  goal: ["JLPT", "Speaking", "General Japanese"],
} as const;

function BatchFields({ b, teachers }: { b?: BatchRow; teachers: { id: string; name: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {b ? <input type="hidden" name="id" value={b.id} /> : null}
      <Field label="Course page">
        <select name="course_slug" defaultValue={b?.course_slug ?? "jlpt-n5"} className={fieldCls}>
          {courseDetails.map((c) => <option key={c.slug} value={c.slug}>{c.navLabel}</option>)}
        </select>
      </Field>
      <Field label="Batch title"><input name="course_title" required defaultValue={b?.course_title} className={fieldCls} /></Field>
      <Field label="Start date"><input name="start_date" type="date" required defaultValue={b?.start_date} className={fieldCls} /></Field>
      <Field label="Schedule"><input name="schedule" required placeholder="Mon • Wed • Fri, 7:00 – 8:30 PM" defaultValue={b?.schedule} className={fieldCls} /></Field>
      {(Object.keys(opts) as (keyof typeof opts)[]).map((k) => (
        <Field key={k} label={k.replace("_", " ")}>
          <select name={k} defaultValue={b?.[k] ?? opts[k][0]} className={fieldCls}>
            {opts[k].map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
      ))}
      <Field label="Hours"><input name="duration_hours" type="number" min={1} defaultValue={b?.duration_hours ?? 60} className={fieldCls} /></Field>
      <Field label="Total seats"><input name="seats_total" type="number" min={1} defaultValue={b?.seats_total ?? 12} className={fieldCls} /></Field>
      <Field label="Seats left"><input name="seats_left" type="number" min={0} defaultValue={b?.seats_left ?? 12} className={fieldCls} /></Field>
      <Field label="Fee label"><input name="price_label" defaultValue={b?.price_label ?? "Fee on request"} className={fieldCls} /></Field>
      <Field label="Teacher">
        <select name="teacher_id" defaultValue={b?.teacher_id ?? ""} className={fieldCls}>
          <option value="">—</option>
          {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </Field>
      <label className="flex items-center gap-2 text-sm font-semibold self-end min-h-[40px]">
        <input type="checkbox" name="published" defaultChecked={b?.published ?? true} className="h-5 w-5 accent-indigo-900" /> Published
      </label>
    </div>
  );
}

export default async function AdminBatches() {
  const sb = await requireAdminPage();
  const [{ data: batches }, { data: teachers }] = await Promise.all([
    sb.from("batches").select("*").order("start_date"),
    sb.from("teachers").select("id,name").order("sort"),
  ]);

  return (
    <div className="space-y-6">
      <details className="rounded-lg border-2 border-dashed border-indigo-900/30 bg-surface p-5" open={!batches?.length}>
        <summary className="cursor-pointer font-bold text-indigo-950">+ Add a new batch</summary>
        <div className="mt-4"><ActionForm action={saveBatch} submitLabel="Create batch"><BatchFields teachers={teachers ?? []} /></ActionForm></div>
      </details>

      {(batches as BatchRow[] | null)?.map((b) => (
        <details key={b.id} className="card-modern p-5">
          <summary className="cursor-pointer flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-bold text-indigo-950">{b.course_title}</span>
            <span className="text-sm text-charcoal-500">{b.start_date} · {b.schedule}</span>
            <span className={`text-sm font-bold ${b.seats_left === 0 ? "text-red-600" : "text-success"}`}>{b.seats_left}/{b.seats_total} seats</span>
            {!b.published ? <span className="rounded bg-charcoal-100 px-2 text-xs font-bold">HIDDEN</span> : null}
          </summary>
          <div className="mt-4 space-y-3">
            <ActionForm action={saveBatch}><BatchFields b={b} teachers={teachers ?? []} /></ActionForm>
            <DeleteBatchButton id={b.id} />
          </div>
        </details>
      ))}
    </div>
  );
}
