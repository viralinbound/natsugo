export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// When unset, the site runs on the built-in sample data in lib/data.ts.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
