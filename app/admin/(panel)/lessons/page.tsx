import Link from "next/link";
import { requireAdminPage } from "@/lib/supabase/server";
import { saveLesson } from "@/app/admin/actions";
import { ActionForm, Field, fieldCls } from "@/components/admin/AdminControls";
import { UrlOrUpload } from "@/components/admin/FileUpload";
import { quizLevels } from "@/lib/quizBank";

type Row = {
  id: string; level: string; unit: number; unit_title: string; sort: number; title: string; summary: string;
  duration_min: number; is_free: boolean; published: boolean;
  lesson_assets: { video_url: string | null; notes: string | null; material_url: string | null; material_label: string | null } | null;
};

export default async function AdminLessons({ searchParams }: { searchParams: Promise<{ level?: string }> }) {
  const sb = await requireAdminPage();
  const level = ((await searchParams).level ?? "N5").toUpperCase();
  const { data } = await sb.from("lessons").select("*, lesson_assets(*)").eq("level", level).order("unit").order("sort");
  const blob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <div>
      <p className="text-sm text-charcoal-500">
        Paste a YouTube (unlisted is fine), Vimeo or Google Drive link, or upload a video/PDF{blob ? " straight to Vercel Blob" : ""}. Free lessons are visible to everyone; the rest only to enrolled students.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {quizLevels.map((l) => (
          <Link key={l} href={`/admin/lessons?level=${l}`} className={`rounded-md px-4 min-h-[40px] inline-flex items-center text-sm font-bold ${l === level ? "bg-indigo-900 text-white" : "bg-bg-alt text-charcoal-700"}`}>{l}</Link>
        ))}
      </div>
      <div className="mt-5 space-y-3">
        {(data as Row[] | null)?.map((l) => {
          const a = l.lesson_assets;
          const status = [a?.video_url ? "video" : null, a?.notes ? "notes" : null, a?.material_url ? "handout" : null].filter(Boolean).join(" · ");
          return (
            <details key={l.id} className="rounded-lg border border-charcoal-100 bg-surface p-4">
              <summary className="cursor-pointer flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-xs font-bold text-sun-500">U{l.unit}.{l.sort + 1}</span>
                <span className="font-semibold text-indigo-950 font-jp">{l.title}</span>
                {l.is_free ? <span className="rounded bg-success/10 px-1.5 text-xs font-bold text-success">FREE</span> : null}
                <span className="text-xs text-charcoal-500">{status || "no content yet"}</span>
              </summary>
              <div className="mt-4">
                <ActionForm action={saveLesson}>
                  <input type="hidden" name="id" value={l.id} />
                  <div className="grid sm:grid-cols-[1fr_120px] gap-3">
                    <Field label="Title"><input name="title" defaultValue={l.title} className={fieldCls} /></Field>
                    <Field label="Minutes"><input name="duration_min" type="number" min={0} defaultValue={l.duration_min} className={fieldCls} /></Field>
                  </div>
                  <Field label="Summary"><input name="summary" defaultValue={l.summary} className={fieldCls} /></Field>
                  <Field label="Video lecture (YouTube / Vimeo / Drive link or upload)">
                    <UrlOrUpload name="video_url" defaultValue={a?.video_url} folder="lessons" accept="video/mp4,video/webm,video/quicktime" placeholder="https://youtu.be/…" blobEnabled={blob} />
                  </Field>
                  <div className="grid sm:grid-cols-[1fr_220px] gap-3">
                    <Field label="Handout / material (PDF link or upload)">
                      <UrlOrUpload name="material_url" defaultValue={a?.material_url} folder="materials" accept="application/pdf" placeholder="https://…pdf" blobEnabled={blob} />
                    </Field>
                    <Field label="Handout label"><input name="material_label" defaultValue={a?.material_label ?? ""} placeholder="Worksheet 1 (PDF)" className={fieldCls} /></Field>
                  </div>
                  <Field label="Study notes (## heading, - list, **bold**)">
                    <textarea name="notes" rows={8} defaultValue={a?.notes ?? ""} className={`${fieldCls} py-2 font-mono text-xs`} />
                  </Field>
                  <div className="flex flex-wrap gap-5">
                    <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="is_free" defaultChecked={l.is_free} className="h-5 w-5 accent-indigo-900" /> Free preview</label>
                    <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="published" defaultChecked={l.published} className="h-5 w-5 accent-indigo-900" /> Published</label>
                    <Link href={`/learn/${l.level.toLowerCase()}/${l.id}`} target="_blank" className="text-sm font-semibold text-indigo-800 underline">View lesson ↗</Link>
                  </div>
                </ActionForm>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
