import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAdminUser } from "@/lib/supabase/server";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/layout/Logo";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false } };

export default async function AdminLogin() {
  if (await getAdminUser()) redirect("/admin");
  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <Logo />
      <h1 className="mt-5 text-2xl font-extrabold text-indigo-950">Admin sign in</h1>
      <p className="mt-2 text-sm text-charcoal-500">Only emails listed in the <code>admins</code> table can sign in.</p>
      {isSupabaseConfigured ? (
        <div className="mt-6 card-modern p-6">
          <LoginForm />
        </div>
      ) : (
        <p className="mt-4 rounded-md bg-sun-100 p-4 text-sm text-charcoal-800">
          The admin panel needs Supabase. Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your environment.
        </p>
      )}
    </section>
  );
}
