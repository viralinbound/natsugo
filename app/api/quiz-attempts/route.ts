import { getPublicClient } from "@/lib/supabase/admin";

const levels = new Set(["N5", "N4", "N3", "N2", "N1"]);
const difficulties = new Set(["easy", "medium", "hard", "vocabulary", "grammar", "kanji", "reading", "listening"]);

export async function POST(request: Request) {
  const b = await request.json().catch(() => null);
  const score = Number(b?.score);
  const total = Number(b?.total);
  if (!levels.has(b?.level) || !difficulties.has(b?.difficulty) || !Number.isInteger(score) || !Number.isInteger(total) || score < 0 || score > total || total > 50) {
    return Response.json({ ok: false }, { status: 422 });
  }
  const sb = getPublicClient();
  if (sb) await sb.rpc("log_quiz_attempt", { p_level: b.level, p_difficulty: b.difficulty, p_score: score, p_total: total });
  return Response.json({ ok: true });
}
