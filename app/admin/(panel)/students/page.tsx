import { requireAdminPage } from "@/lib/supabase/server";
import { saveStudent } from "@/app/admin/actions";
import { ActionForm, Field, fieldCls } from "@/components/admin/AdminControls";

type Student = { email: string; name: string; phone: string | null; levels: string[]; batch_ids: string[]; active: boolean; access_until: string | null };
const levels = ["N5", "N4", "N3", "N2", "N1"];

function Fields({ s }: { s?: Student }) {
  return (
    <div className="grid gap-3">
      {s ? <input type="hidden" name="email" value={s.email} /> : <input type="hidden" name="is_new" value="1" />}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {s ? null : <Field label="Email"><input name="email" type="email" required className={fieldCls} /></Field>}
        <Field label="Name"><input name="name" required defaultValue={s?.name} className={fieldCls} /></Field>
        <Field label="Phone"><input name="phone" defaultValue={s?.phone ?? ""} className={fieldCls} /></Field>
        <Field label="Access until (optional)"><input name="access_until" type="date" defaultValue={s?.access_until ?? ""} className={fieldCls} /></Field>
      </div>
      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Levels unlocked</legend>
        <div className="mt-1.5 flex flex-wrap gap-4">
          {levels.map((l) => (
            <label key={l} className="flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" name="levels" value={l} defaultChecked={s?.levels.includes(l)} className="h-5 w-5 accent-indigo-900" /> {l}
            </label>
          ))}
        </div>
      </fieldset>
      <Field label="Batch IDs (comma-separated, optional)"><input name="batch_ids" defaultValue={s?.batch_ids.join(", ")} placeholder="b1, b3" className={fieldCls} /></Field>
      <div className="flex flex-wrap gap-5">
        <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="active" defaultChecked={s?.active ?? true} className="h-5 w-5 accent-indigo-900" /> Active</label>
        {s ? null : <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="send_welcome" defaultChecked className="h-5 w-5 accent-indigo-900" /> Email them a welcome with sign-in instructions</label>}
      </div>
    </div>
  );
}

export default async function AdminStudents() {
  const sb = await requireAdminPage();
  const { data } = await sb.from("students").select("*").order("created_at", { ascending: false });

  return (
    <div className="space-y-4">
      <p className="text-sm text-charcoal-500">Students sign in at /student/login with their email and a 6-digit code. Confirming an enrolment in Leads adds them here automatically.</p>
      <details className="rounded-lg border-2 border-dashed border-indigo-900/30 bg-surface p-5" open={!data?.length}>
        <summary className="cursor-pointer font-bold text-indigo-950">+ Add a student</summary>
        <div className="mt-4"><ActionForm action={saveStudent} submitLabel="Add student"><Fields /></ActionForm></div>
      </details>
      {(data as Student[] | null)?.map((s) => (
        <details key={s.email} className="card-modern p-5">
          <summary className="cursor-pointer flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-bold text-indigo-950">{s.name}</span>
            <span className="text-sm text-charcoal-500 break-all">{s.email}</span>
            <span className="text-sm font-semibold">{s.levels.join(", ") || "no levels"}</span>
            {!s.active ? <span className="rounded bg-charcoal-100 px-2 text-xs font-bold">INACTIVE</span> : null}
          </summary>
          <div className="mt-4"><ActionForm action={saveStudent}><Fields s={s} /></ActionForm></div>
        </details>
      ))}
    </div>
  );
}
