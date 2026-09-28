import { getPublicClient } from "@/lib/supabase/admin";

const isInt = (n: unknown) => Number.isInteger(n);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const score = Number(body?.score);
  const total = Number(body?.total);
  if (!isInt(score) || !isInt(total) || total < 1 || total > 50 || score < 0 || score > total) {
    return Response.json({ ok: false }, { status: 422 });
  }
  const sb = getPublicClient();
  if (sb) {
    await sb.rpc("log_level_result", {
      p_score: score,
      p_total: total,
      p_recommended: String(body.recommended ?? "").slice(0, 40),
      p_by_skill: typeof body.bySkill === "object" && body.bySkill ? body.bySkill : {},
    });
  }
  return Response.json({ ok: true });
}
