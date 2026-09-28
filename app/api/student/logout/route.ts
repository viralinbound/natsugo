import { cookies } from "next/headers";
import { callPortal, STUDENT_COOKIE } from "@/lib/student";

export async function POST() {
  const store = await cookies();
  const token = store.get(STUDENT_COOKIE)?.value;
  if (token) await callPortal("srv_logout", { p_token: token }).catch(() => null);
  store.delete(STUDENT_COOKIE);
  return Response.json({ ok: true });
}
