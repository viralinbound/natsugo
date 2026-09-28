import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/config";

// Anonymous server-side client. Reads published rows (RLS) and calls the public write
// functions (submit_lead, submit_review, …). It can never read leads or edit content.
let publicClient: SupabaseClient | null = null;
export function getPublicClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  publicClient ??= createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } });
  return publicClient;
}
