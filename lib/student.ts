import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { getPublicClient } from "@/lib/supabase/admin";

export const STUDENT_COOKIE = "np_student";

export interface PortalAsset {
  lesson_id: string;
  video_url: string | null;
  notes: string | null;
  material_url: string | null;
  material_label: string | null;
}
export interface PortalLive {
  session_id: string;
  join_url: string | null;
  recording_url: string | null;
}
export interface StudentPortal {
  student: { email: string; name: string; levels: string[]; batch_ids: string[] };
  assets: Map<string, PortalAsset>;
  live: Map<string, PortalLive>;
}

const secret = () => process.env.PORTAL_SECRET ?? "";

export async function callPortal<T>(fn: string, args: Record<string, unknown>): Promise<T | null> {
  const sb = getPublicClient();
  if (!sb || !secret()) return null;
  const { data, error } = await sb.rpc(fn, { p_secret: secret(), ...args });
  if (error) {
    if (!/too_many_codes/.test(error.message)) console.error(`${fn} failed`, error.message);
    throw new Error(error.message);
  }
  return data as T;
}

// Signed-in student (via cookie) with the private content they're allowed to see. Cached per request.
export const getStudent = cache(async (): Promise<StudentPortal | null> => {
  const token = (await cookies()).get(STUDENT_COOKIE)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  try {
    const data = await callPortal<{ student: StudentPortal["student"]; assets: PortalAsset[]; live: PortalLive[] }>("srv_student_portal", { p_token: token });
    if (!data) return null;
    return {
      student: data.student,
      assets: new Map(data.assets.map((a) => [a.lesson_id, a])),
      live: new Map(data.live.map((l) => [l.session_id, l])),
    };
  } catch {
    return null;
  }
});
