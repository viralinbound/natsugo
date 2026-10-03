import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { validateLead, type LeadInput } from "@/lib/leads";
import { after } from "next/server";
import { getPublicClient } from "@/lib/supabase/admin";
import { getBatch } from "@/lib/repo";
import { sendLeadAlert, sendLeadConfirmation } from "@/lib/email";
import { alreadyConfirmed, clientIp, forbidden, overLimit, sameOrigin, tooMany } from "@/lib/guard";

const allowedTypes = new Set(["demo", "contact", "enrol", "level-test", "waitlist"]);
const clip = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : "");

export async function POST(request: Request) {
  if (!sameOrigin(request)) return forbidden();
  const ip = clientIp(request);
  // 5 forms an hour and 20 a day from one address is plenty for a real person.
  if (overLimit(`lead-h:${ip}`, 5, 3600_000) || overLimit(`lead-d:${ip}`, 20, 24 * 3600_000)) return tooMany(3600);
  let body: Partial<LeadInput>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields; pretend success.
  if (body.company) return Response.json({ ok: true });

  const errors = validateLead(body);
  if (Object.keys(errors).length || !allowedTypes.has(String(body.type))) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const lead = {
    type: String(body.type),
    name: clip(body.name, 100).trim(),
    phone: clip(body.phone, 20).trim(),
    email: clip(body.email, 150).trim() || null,
    interest: clip(body.interest, 60) || null,
    level: clip(body.level, 60) || null,
    preferred_time: clip(body.preferredTime, 60) || null,
    batch_id: clip(body.batchId, 20) || null,
    message: clip(body.message, 1000) || null,
    source_path: clip(request.headers.get("referer") ?? "", 300) || null,
  };

  const sb = getPublicClient();
  if (sb) {
    // submit_lead validates again in the database and writes the anonymous activity line.
    const { data, error } = await sb.rpc("submit_lead", {
      p_type: lead.type,
      p_name: lead.name,
      p_phone: lead.phone,
      p_email: lead.email ?? "",
      p_interest: lead.interest ?? "",
      p_level: lead.level ?? "",
      p_preferred_time: lead.preferred_time ?? "",
      p_message: lead.message ?? "",
      p_batch_id: lead.batch_id ?? "",
      p_source_path: lead.source_path ?? "",
    });
    if (error) {
      console.error("Lead insert failed", error);
      return Response.json({ ok: false, error: "Could not save. Please WhatsApp us." }, { status: 500 });
    }
    after(async () => {
      const batch = lead.batch_id ? await getBatch(lead.batch_id) : undefined;
      const mail = { ...lead, batchTitle: batch ? `${batch.courseTitle} — starts ${batch.startDate}, ${batch.schedule}` : null };
      // The confirmation goes to an address typed into a public form, so each address gets one an hour at most.
      const confirm = lead.email && alreadyConfirmed(lead.email) ? Promise.resolve() : sendLeadConfirmation(mail);
      const results = await Promise.allSettled([sendLeadAlert(mail), confirm]);
      results.forEach((r) => r.status === "rejected" && console.error("Lead email failed", r.reason));
    });
    return Response.json({ ok: true, id: data });
  }

  // No Supabase configured (local development): append to a file.
  const id = crypto.randomUUID();
  try {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify({ id, createdAt: new Date().toISOString(), ...lead }) + "\n", "utf8");
  } catch (err) {
    console.error("Lead storage failed", err);
  }
  return Response.json({ ok: true, id });
}
