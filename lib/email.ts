import "server-only";
import { site, whatsappLink } from "@/lib/site";

const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const brand = { blue: "#0C88FF", grey: "#282828", bg: "#F7F4ED" };

function layout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:${brand.bg};font-family:Arial,Helvetica,sans-serif;color:${brand.grey}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.bg};padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:10px;overflow:hidden">
<tr><td align="center" style="padding:22px 28px 18px;border-bottom:3px solid ${brand.blue}">
<img src="${site.url}/brand/natsugo-stacked.png" width="60" height="56" alt="Natsugo" style="display:inline-block;height:56px;width:auto">
</td></tr>
<tr><td style="padding:28px">
<h1 style="margin:0 0 16px;font-size:22px;color:${brand.grey}">${esc(title)}</h1>
${body}
</td></tr>
<tr><td style="padding:18px 28px;background:${brand.grey};color:#bbb;font-size:12px">
${esc(site.name)} · Live Online Japanese Classes<br>
<a href="${site.url}" style="color:#8cc6ff">${site.url.replace("https://", "")}</a> · ${esc(site.phoneDisplay)}
</td></tr></table></td></tr></table></body></html>`;
}

const btn = (href: string, label: string, color = brand.blue) =>
  `<a href="${href}" style="display:inline-block;background:${color};color:#fff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:6px;margin:4px 8px 4px 0">${esc(label)}</a>`;

async function send(to: string | string[], subject: string, html: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) return { ok: false, skipped: true };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) console.error("Resend error", res.status, await res.text().catch(() => ""));
  return { ok: res.ok };
}

export interface LeadEmail {
  type: string;
  name: string;
  phone: string;
  email?: string | null;
  interest?: string | null;
  level?: string | null;
  preferred_time?: string | null;
  message?: string | null;
  batchTitle?: string | null;
  source_path?: string | null;
}

const typeLabel: Record<string, string> = {
  demo: "Free demo request",
  enrol: "Enrolment request",
  contact: "Contact enquiry",
  waitlist: "Waitlist sign-up",
  "level-test": "Level test enquiry",
};

const notifyTo = () =>
  (process.env.NOTIFY_EMAIL || site.email).split(",").map((s) => s.trim()).filter(Boolean);

// Alert to the admissions team. Reply-to is the student so you can answer directly.
export function sendLeadAlert(l: LeadEmail) {
  const digits = l.phone.replace(/\D/g, "").slice(-10);
  const rows = [
    ["Name", l.name],
    ["Phone", l.phone],
    ["Email", l.email],
    ["Interested in", l.interest],
    ["Batch", l.batchTitle],
    ["Current level", l.level],
    ["Preferred time", l.preferred_time],
    ["Message", l.message],
    ["Sent from", l.source_path],
  ].filter(([, v]) => v);
  const body = `
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;border-collapse:collapse">
${rows.map(([k, v]) => `<tr><td style="padding:8px 0;color:#6b6b6b;width:130px;vertical-align:top;border-bottom:1px solid #eee">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid #eee;white-space:pre-wrap">${esc(v)}</td></tr>`).join("")}
</table>
<p style="margin:22px 0 0">
${btn(`https://wa.me/91${digits}?text=${encodeURIComponent(`Hi ${l.name}, this is Natsugo admissions. Thanks for your ${typeLabel[l.type]?.toLowerCase() ?? "enquiry"}!`)}`, "Reply on WhatsApp", "#25D366")}
${btn(`tel:+91${digits}`, "Call now", brand.grey)}
${btn(`${site.url}/admin`, "Open admin")}
</p>`;
  return send(notifyTo(), `${typeLabel[l.type] ?? "New enquiry"}: ${l.name}${l.interest ? ` · ${l.interest}` : ""}`, layout(`New ${typeLabel[l.type]?.toLowerCase() ?? "enquiry"}`, body), l.email ?? undefined);
}

const nextSteps: Record<string, string> = {
  demo: "Our admissions team will call or WhatsApp you within one working day to fix a demo slot that suits you.",
  enrol: "Our admissions team will call you to confirm your seat and share the fee and payment details.",
  waitlist: "You're on the waitlist. We'll contact you first if a seat opens or when the next batch is scheduled.",
  contact: "Thanks for getting in touch. We usually reply within one working day.",
  "level-test": "Thanks for getting in touch. We usually reply within one working day.",
};

// Confirmation to the student (only when they gave an email).
export function sendLeadConfirmation(l: LeadEmail) {
  if (!l.email) return Promise.resolve({ ok: false, skipped: true });
  const first = l.name.split(" ")[0];
  const body = `
<p style="font-size:15px;line-height:1.6;margin:0 0 12px">Hi ${esc(first)},</p>
<p style="font-size:15px;line-height:1.6;margin:0 0 12px">${esc(nextSteps[l.type] ?? nextSteps.contact)}</p>
${l.interest || l.batchTitle ? `<p style="font-size:14px;background:${brand.bg};padding:12px 14px;border-radius:6px;margin:0 0 16px"><strong>Your request:</strong> ${esc(l.batchTitle ?? l.interest)}</p>` : ""}
<p style="font-size:15px;line-height:1.6;margin:0 0 6px">While you wait, try these free tools:</p>
<p style="margin:0 0 18px">${btn(`${site.url}/level-test`, "Free level test")}${btn(`${site.url}/jlpt-quiz`, "JLPT quiz", brand.grey)}</p>
<p style="font-size:15px;line-height:1.6;margin:0">Questions? ${btn(whatsappLink(`Hi, I'm ${l.name} and I just sent a request on the website.`), "Chat on WhatsApp", "#25D366")}</p>
<p style="font-size:15px;margin:20px 0 0">よろしくお願いします！<br>Team Natsugo</p>`;
  return send(l.email, `We got your request, ${first}: Natsugo`, layout("Thank you! ありがとうございます", body), notifyTo()[0]);
}

export function sendReviewAlert(r: { name: string; course: string; level: string; quote: string }) {
  const body = `
<p style="font-size:14px;margin:0 0 8px"><strong>${esc(r.name)}</strong> · ${esc(r.course)} · ${esc(r.level)}</p>
<blockquote style="margin:0 0 20px;padding:12px 16px;border-left:4px solid ${brand.blue};background:${brand.bg};font-size:15px;line-height:1.6">${esc(r.quote)}</blockquote>
${btn(`${site.url}/admin/reviews`, "Review and approve")}`;
  return send(notifyTo(), `New student review from ${r.name}`, layout("A student submitted a review", body));
}

export function sendClassroomWelcome(to: string, name: string, levels: string[]) {
  const body = `
<p style="font-size:15px;line-height:1.6;margin:0 0 12px">Hi ${esc(name.split(" ")[0])}, ようこそ！ Your Natsugo online classroom is ready${levels.length ? ` for <strong>${levels.map((l) => `JLPT ${esc(l)}`).join(", ")}</strong>` : ""}.</p>
<p style="font-size:15px;line-height:1.6;margin:0 0 12px">In your classroom you'll find:</p>
<ul style="font-size:15px;line-height:1.8;margin:0 0 18px;padding-left:20px">
<li>Links to join your <strong>live classes</strong></li>
<li><strong>Recordings</strong> of every class</li>
<li>Video lessons, study notes and handouts</li>
</ul>
<p style="margin:0 0 16px">${btn(`${site.url}/online-classroom`, "Open the classroom")}</p>
<p style="font-size:13px;color:#6b6b6b;margin:0">Everything is free and open: no sign-in needed.</p>`;
  return send(to, "Your Natsugo online classroom is ready", layout("Welcome to your classroom", body), notifyTo()[0]);
}
