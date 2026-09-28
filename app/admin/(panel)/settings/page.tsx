import { requireAdminPage } from "@/lib/supabase/server";
import { saveAnnouncement, saveExamInfo } from "@/app/admin/actions";
import { ActionForm, Field, fieldCls } from "@/components/admin/AdminControls";
import { storageProvider } from "@/lib/storage";
import type { ExamInfo } from "@/lib/repo";

const emptySession = { name: "", examDate: "", registrationWindow: "", resultsDate: "" };

export default async function AdminSettings() {
  const sb = await requireAdminPage();
  const [{ data }, { data: examRow }] = await Promise.all([
    sb.from("settings").select("value").eq("key", "announcement").maybeSingle(),
    sb.from("settings").select("value").eq("key", "exam_info").maybeSingle(),
  ]);
  const a = (data?.value as { text: string; enabled: boolean } | undefined) ?? { text: "", enabled: true };
  const exam = (examRow?.value as ExamInfo | undefined) ?? { officialLink: "https://www.jlpt.jp/e/", sessions: [emptySession], fee: "", centres: [], note: "" };
  const sessions = [...exam.sessions, emptySession, emptySession].slice(0, Math.max(2, exam.sessions.length));

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <section className="card-modern p-5">
        <h2 className="font-bold text-indigo-950">Announcement bar</h2>
        <p className="mt-1 text-sm text-charcoal-500">Shown at the top of every page.</p>
        <div className="mt-4">
          <ActionForm action={saveAnnouncement}>
            <Field label="Text"><input name="text" maxLength={140} defaultValue={a.text} className={fieldCls} /></Field>
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" name="enabled" defaultChecked={a.enabled} className="h-5 w-5 accent-indigo-900" /> Show announcement
            </label>
          </ActionForm>
        </div>
      </section>

      <section className="card-modern p-5 text-sm">
        <h2 className="font-bold text-indigo-950">Connections</h2>
        <dl className="mt-3 space-y-2">
          <div className="flex justify-between"><dt>Database</dt><dd className="font-semibold text-success">Supabase connected</dd></div>
          <div className="flex justify-between"><dt>Image storage</dt><dd className="font-semibold">{storageProvider() === "vercel-blob" ? "Vercel Blob" : "Supabase Storage (add BLOB_READ_WRITE_TOKEN to use Vercel Blob)"}</dd></div>
          <div className="flex justify-between"><dt>Live updates</dt><dd className="font-semibold text-success">Supabase Realtime</dd></div>
        </dl>
      </section>

      <section className="lg:col-span-2 card-modern p-5">
        <h2 className="font-bold text-indigo-950">JLPT exam info</h2>
        <p className="mt-1 text-sm text-charcoal-500">
          Shown on the public <a href="/jlpt-exam-info" target="_blank" className="underline">/jlpt-exam-info</a> page. Update this whenever JEES/the Japan Foundation announces new dates.
        </p>
        <div className="mt-4">
          <ActionForm action={saveExamInfo}>
            <input type="hidden" name="session_count" value={sessions.length} />
            <div className="grid gap-4">
              {sessions.map((s, i) => (
                <fieldset key={i} className="rounded-md border border-charcoal-100 p-3">
                  <legend className="px-1 text-xs font-bold uppercase tracking-wide text-charcoal-500">Session {i + 1}</legend>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Session name (e.g. July 2026)"><input name={`session_${i}_name`} defaultValue={s.name} className={fieldCls} /></Field>
                    <Field label="Exam date"><input name={`session_${i}_examDate`} defaultValue={s.examDate} className={fieldCls} /></Field>
                    <Field label="Registration window"><input name={`session_${i}_registrationWindow`} defaultValue={s.registrationWindow} className={fieldCls} /></Field>
                    <Field label="Results date"><input name={`session_${i}_resultsDate`} defaultValue={s.resultsDate} className={fieldCls} /></Field>
                  </div>
                </fieldset>
              ))}
            </div>
            <Field label="Current fee (India)"><input name="fee" defaultValue={exam.fee} className={fieldCls} /></Field>
            <Field label="Test centres (comma-separated)"><input name="centres" defaultValue={exam.centres.join(", ")} className={fieldCls} /></Field>
            <Field label="Official JLPT link"><input name="officialLink" defaultValue={exam.officialLink} className={fieldCls} /></Field>
            <Field label="Note shown to students"><textarea name="note" rows={2} defaultValue={exam.note} className={`${fieldCls} py-2`} /></Field>
          </ActionForm>
        </div>
        <p className="mt-3 text-xs text-charcoal-500">A session with no name is ignored, so leave extra slots blank if you only need one or two.</p>
      </section>
    </div>
  );
}
