import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getStudent } from "@/lib/student";
import { StudentLogin } from "@/components/learn/StudentLogin";
import { Logo } from "@/components/layout/Logo";

export const metadata: Metadata = { title: "Student sign-in", robots: { index: false } };

export default async function StudentLoginPage() {
  if (await getStudent()) redirect("/student");
  return (
    <section className="brand-pattern overflow-hidden py-12 sm:py-20">
      <div className="mx-auto max-w-md px-4">
        <div className="rounded-xl border border-charcoal-100 bg-surface p-6 sm:p-8 shadow-[0_20px_50px_-25px_rgba(40,40,40,0.35)]">
          <Logo />
          <h1 className="mt-5 text-2xl font-extrabold text-indigo-950">Student sign-in</h1>
          <p className="mt-1 text-charcoal-700">Access your live classes, recordings, lessons and study materials. No password needed.</p>
          <div className="mt-6"><StudentLogin /></div>
        </div>
        <p className="mt-6 text-center text-sm text-charcoal-700">
          Not a student yet? <Link href="/batches" className="font-semibold text-indigo-800 underline">See batches</Link> or{" "}
          <Link href="/learn/n5/n5-u1-l1" className="font-semibold text-indigo-800 underline">try a free lesson</Link>.
        </p>
      </div>
    </section>
  );
}
