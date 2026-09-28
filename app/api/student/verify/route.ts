import { cookies } from "next/headers";
import { callPortal, STUDENT_COOKIE } from "@/lib/student";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const code = String(body?.code ?? "").replace(/\D/g, "");
  if (!email || code.length !== 6) return Response.json({ ok: false, error: "Enter the 6-digit code." }, { status: 422 });

  const token = await callPortal<string | null>("srv_verify_login_code", { p_email: email, p_code: code }).catch(() => null);
  if (!token) return Response.json({ ok: false, error: "That code is wrong or has expired." }, { status: 401 });

  (await cookies()).set(STUDENT_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return Response.json({ ok: true });
}
