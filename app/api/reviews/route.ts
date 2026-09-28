import { after } from "next/server";
import { getPublicClient } from "@/lib/supabase/admin";
import { sendReviewAlert } from "@/lib/email";

const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");
const levels = new Set(["Beginner", "N5", "N4", "N3", "N2", "N1"]);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  if (body.company) return Response.json({ ok: true });

  const review = {
    name: clip(body.name, 80),
    course: clip(body.course, 80),
    level: clip(body.level, 10),
    quote: clip(body.quote, 800),
  };
  const errors: Record<string, string> = {};
  if (review.name.length < 2) errors.name = "Please enter your name.";
  if (review.course.length < 2) errors.course = "Which course did you take?";
  if (!levels.has(review.level)) errors.level = "Choose your level.";
  if (review.quote.length < 20) errors.quote = "Please write at least 20 characters.";
  if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 422 });

  const sb = getPublicClient();
  if (!sb) return Response.json({ ok: false, error: "Reviews open once the database is connected." }, { status: 503 });

  const { error } = await sb.rpc("submit_review", { p_name: review.name, p_course: review.course, p_level: review.level, p_quote: review.quote });
  if (error) {
    console.error("Review insert failed", error);
    return Response.json({ ok: false, error: "Could not save your review." }, { status: 500 });
  }
  after(() => sendReviewAlert(review).catch((e) => console.error("Review email failed", e)));
  return Response.json({ ok: true });
}
