import { callPortal } from "@/lib/student";
import { sendLoginCode } from "@/lib/email";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  if (!emailRe.test(email) || email.length > 150) {
    return Response.json({ ok: false, error: "Enter a valid email address." }, { status: 422 });
  }
  try {
    const code = await callPortal<string | null>("srv_create_login_code", { p_email: email });
    // Same response whether or not the email is enrolled, so addresses can't be probed.
    if (code) await sendLoginCode(email, null, code);
    return Response.json({ ok: true });
  } catch (e) {
    const tooMany = /too_many_codes/.test((e as Error).message);
    return Response.json(
      { ok: false, error: tooMany ? "Too many codes requested. Please wait an hour and try again." : "Could not send a code right now." },
      { status: tooMany ? 429 : 500 }
    );
  }
}
