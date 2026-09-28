import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "@/lib/supabase/config";

// Cookie-aware client for the signed-in admin session.
export async function getSessionClient() {
  if (!isSupabaseConfigured) return null;
  const store = await cookies();
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Called from a Server Component where cookies are read-only; the proxy refreshes them.
        }
      },
    },
  });
}

// Signed-in user whose email is in public.admins (checked by the database, not the app).
export async function getAdminUser() {
  const supabase = await getSessionClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  const { data: ok } = await supabase.rpc("is_admin");
  return ok ? data.user : null;
}

// For admin pages and actions: redirects unless an admin is signed in, then returns their session client.
export async function requireAdminPage() {
  const user = await getAdminUser();
  const sb = user ? await getSessionClient() : null;
  if (!user || !sb) redirect("/admin/login");
  return sb;
}
