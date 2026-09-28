import { requireAdminPage } from "@/lib/supabase/server";
import { LeadStatus } from "@/components/admin/AdminControls";

const types = ["all", "demo", "enrol", "contact", "waitlist"];

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type = "all" } = await searchParams;
  const sb = await requireAdminPage();

  let q = sb.from("leads").select("*, batches(course_title)").order("created_at", { ascending: false }).limit(200);
  if (type !== "all") q = q.eq("type", type);
  // eslint-disable-next-line react-hooks/purity -- per-request server render; "last 7 days" is meant to be computed now
  const since = new Date(Date.now() - 7 * 86400_000).toISOString();

  const [{ data: leads }, week, fresh, tests, quizzes] = await Promise.all([
    q,
    sb.from("leads").select("id", { count: "exact", head: true }).gte("created_at", since),
    sb.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
    sb.from("level_results").select("id", { count: "exact", head: true }).gte("created_at", since),
    sb.from("quiz_attempts").select("id", { count: "exact", head: true }).gte("created_at", since),
  ]);

  const stats = [
    { label: "Leads (7 days)", value: week.count ?? 0 },
    { label: "Awaiting contact", value: fresh.count ?? 0 },
    { label: "Level tests (7 days)", value: tests.count ?? 0 },
    { label: "Quiz sets played (7 days)", value: quizzes.count ?? 0 },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-charcoal-100 bg-surface p-4">
            <p className="text-2xl font-extrabold text-indigo-950">{s.value}</p>
            <p className="text-xs text-charcoal-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {types.map((t) => (
          <a key={t} href={t === "all" ? "/admin" : `/admin?type=${t}`} className={`rounded-md px-3 py-1.5 text-sm font-semibold ${t === type ? "bg-indigo-900 text-white" : "bg-bg-alt text-charcoal-700"}`}>
            {t}
          </a>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-charcoal-100 bg-surface">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-bg-alt text-xs uppercase tracking-wide text-charcoal-500">
            <tr>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Name / contact</th>
              <th className="px-4 py-3">Interest</th>
              <th className="px-4 py-3">Batch</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-100">
            {(leads ?? []).map((l) => (
              <tr key={l.id} className="align-top">
                <td className="px-4 py-3 whitespace-nowrap text-charcoal-500">{new Date(l.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" })}</td>
                <td className="px-4 py-3 font-semibold">{l.type}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-charcoal-900">{l.name}</p>
                  <a href={`https://wa.me/91${l.phone.replace(/\D/g, "").slice(-10)}`} target="_blank" rel="noopener noreferrer" className="text-indigo-700 underline">{l.phone}</a>
                  {l.email ? <p className="text-charcoal-500">{l.email}</p> : null}
                </td>
                <td className="px-4 py-3">{l.interest}<p className="text-charcoal-500">{[l.level, l.preferred_time].filter(Boolean).join(" · ")}</p></td>
                <td className="px-4 py-3">{l.batches?.course_title ?? "—"}</td>
                <td className="px-4 py-3 max-w-xs text-charcoal-700">{l.message}</td>
                <td className="px-4 py-3"><LeadStatus id={l.id} status={l.status} /></td>
              </tr>
            ))}
            {!leads?.length ? (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-charcoal-500">No leads yet.</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
