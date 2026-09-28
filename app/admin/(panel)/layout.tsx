import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/supabase/server";
import { signOut } from "@/app/admin/actions";
import { storageProvider } from "@/lib/storage";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

const tabs = [
  { href: "/admin", label: "Leads" },
  { href: "/admin/batches", label: "Batches" },
  { href: "/admin/students", label: "Students" },
  { href: "/admin/live", label: "Live classes" },
  { href: "/admin/lessons", label: "Lessons" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/teachers", label: "Teachers" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-sun-500">Admin</p>
          <p className="text-sm text-charcoal-500">
            {user.email} · Images: {storageProvider() === "vercel-blob" ? "Vercel Blob" : "Supabase Storage"}
          </p>
        </div>
        <form action={signOut}>
          <button className="rounded-md border border-charcoal-100 px-3 min-h-[40px] text-sm font-semibold hover:bg-bg-alt">Sign out</button>
        </form>
      </div>
      <nav className="mt-5 flex gap-1 overflow-x-auto border-b border-charcoal-100" aria-label="Admin sections">
        {tabs.map((t) => (
          <Link key={t.href} href={t.href} className="whitespace-nowrap px-4 py-2.5 text-sm font-semibold text-charcoal-700 hover:text-indigo-900">
            {t.label}
          </Link>
        ))}
      </nav>
      <div className="mt-6">{children}</div>
    </div>
  );
}
