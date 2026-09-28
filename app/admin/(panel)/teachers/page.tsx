/* eslint-disable @next/next/no-img-element -- admin thumbnails from arbitrary storage URLs */
import { requireAdminPage } from "@/lib/supabase/server";
import { saveTeacher } from "@/app/admin/actions";
import { ActionForm, Field, fieldCls } from "@/components/admin/AdminControls";

type Row = {
  id: string; name: string; role: string; experience_years: number | null; levels: string[];
  specialization: string; bio: string | null; photo_url: string | null; published: boolean; sort: number;
};

function TeacherFields({ t }: { t?: Row }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {t ? <input type="hidden" name="id" value={t.id} /> : null}
      <input type="hidden" name="photo_url" value={t?.photo_url ?? ""} />
      <Field label="Name"><input name="name" required defaultValue={t?.name} className={fieldCls} /></Field>
      <Field label="Role"><input name="role" defaultValue={t?.role ?? "Japanese Language Instructor"} className={fieldCls} /></Field>
      <Field label="Years of experience"><input name="experience_years" type="number" min={0} defaultValue={t?.experience_years ?? ""} className={fieldCls} /></Field>
      <Field label="Levels taught (e.g. N5, N4)"><input name="levels" defaultValue={t?.levels.join(", ")} className={fieldCls} /></Field>
      <Field label="Specialisation"><input name="specialization" defaultValue={t?.specialization} className={fieldCls} /></Field>
      <Field label="Display order"><input name="sort" type="number" defaultValue={t?.sort ?? 0} className={fieldCls} /></Field>
      <div className="sm:col-span-2 lg:col-span-3">
        <Field label="Short bio (only verified facts)"><textarea name="bio" rows={3} defaultValue={t?.bio ?? ""} className={`${fieldCls} py-2`} /></Field>
      </div>
      <Field label="Photo (JPG/PNG/WebP, max 4 MB)"><input name="photo" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="text-sm" /></Field>
      <label className="flex items-center gap-2 text-sm font-semibold self-end min-h-[40px]">
        <input type="checkbox" name="published" defaultChecked={t?.published ?? true} className="h-5 w-5 accent-indigo-900" /> Published
      </label>
    </div>
  );
}

export default async function AdminTeachers() {
  const sb = await requireAdminPage();
  const { data } = await sb.from("teachers").select("*").order("sort");

  return (
    <div className="space-y-6">
      <details className="rounded-lg border-2 border-dashed border-indigo-900/30 bg-surface p-5">
        <summary className="cursor-pointer font-bold text-indigo-950">+ Add a teacher</summary>
        <div className="mt-4"><ActionForm action={saveTeacher} submitLabel="Add teacher"><TeacherFields /></ActionForm></div>
      </details>
      {(data as Row[] | null)?.map((t) => (
        <details key={t.id} className="card-modern p-5">
          <summary className="cursor-pointer flex items-center gap-3">
            {t.photo_url ? <img src={t.photo_url} alt="" className="h-10 w-10 rounded-full object-cover" /> : <span className="h-10 w-10 rounded-full bg-bg-alt" />}
            <span className="font-bold text-indigo-950">{t.name}</span>
            <span className="text-sm text-charcoal-500">{t.levels.join(", ")} · {t.specialization}</span>
          </summary>
          <div className="mt-4"><ActionForm action={saveTeacher}><TeacherFields t={t} /></ActionForm></div>
        </details>
      ))}
    </div>
  );
}
