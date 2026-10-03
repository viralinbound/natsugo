import { getPublicClient } from "@/lib/supabase/admin";
import { clientIp, forbidden, overLimit, sameOrigin, tooMany } from "@/lib/guard";

const isInt = (n: unknown) => Number.isInteger(n);

export async function POST(request: Request) {
  if (!sameOrigin(request)) return forbidden();
  if (overLimit(`level:${clientIp(request)}`, 30, 3600_000)) return tooMany(3600);
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
