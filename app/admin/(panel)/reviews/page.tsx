import { requireAdminPage } from "@/lib/supabase/server";
import { ReviewButtons } from "@/components/admin/AdminControls";

export default async function AdminReviews() {
  const sb = await requireAdminPage();
  const { data } = await sb.from("testimonials").select("*").order("approved").order("created_at", { ascending: false });

  return (
    <div className="space-y-4">
      <p className="text-sm text-charcoal-500">Students submit reviews from the Success Stories page. Only approved reviews appear on the site.</p>
      {data?.map((r) => (
        <article key={r.id} className={`rounded-lg border bg-surface p-5 ${r.approved ? "border-charcoal-100" : "border-sun-400"}`}>
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-bold text-indigo-950">{r.name}</p>
            <p className="text-sm text-charcoal-500">{r.course} · {r.level}</p>
            <span className={`rounded px-2 py-0.5 text-xs font-bold ${r.approved ? "bg-success/10 text-success" : "bg-sun-100 text-indigo-950"}`}>
              {r.approved ? (r.verified ? "PUBLISHED · VERIFIED" : "PUBLISHED") : "PENDING"}
            </span>
          </div>
          <p className="mt-3 text-charcoal-800">&ldquo;{r.quote}&rdquo;</p>
          <div className="mt-4"><ReviewButtons id={r.id} approved={r.approved} /></div>
        </article>
      ))}
      {!data?.length ? <p className="py-10 text-center text-charcoal-500">No reviews submitted yet.</p> : null}
    </div>
  );
}
