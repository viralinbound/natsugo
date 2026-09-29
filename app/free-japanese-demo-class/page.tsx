import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { getBatch } from "@/lib/repo";
import { getCourse } from "@/lib/courses";
import { images } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Book a Free Japanese Demo Class",
  description: "Try a free live Japanese demo class online. Meet a teacher, check your level and find the right batch.",
  alternates: { canonical: "/free-japanese-demo-class" },
};

export default async function DemoPage({ searchParams }: { searchParams: Promise<{ course?: string; batch?: string }> }) {
  const sp = await searchParams;
  const batch = await getBatch(sp.batch);
  const course = getCourse(sp.course ?? batch?.courseSlug ?? "");
  const interest = course?.level ? `JLPT ${course.level}` : course?.slug === "speak-japanese" ? "Speaking Japanese" : course?.slug === "business-japanese" ? "Business Japanese" : "";

  return (
    <>
      <PageHero title="Book a free demo class" eyebrow="Free Demo" intro="Sit in on a live class, meet a teacher and ask anything about levels, schedules and fees — no commitment." image={images.onlinePair} crumbs={[{ label: "Free Demo", href: "/free-japanese-demo-class" }]} />
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold text-indigo-950">In your demo you will</h2>
            <ul className="mt-5 space-y-3">
              {["Experience a real class with a teacher", "Get a quick verbal level check", "Understand the course path from N5 to N1", "See batch timings and ask about fees"].map((t) => (
                <li key={t} className="flex gap-3 text-charcoal-700"><Check className="text-success shrink-0" size={20} />{t}</li>
              ))}
            </ul>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-lg">
              <Image src={`${images.online}?w=900&q=70&auto=format&fit=crop`} alt="Student attending an online Japanese class" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <p className="mt-6 text-sm text-charcoal-700">
              Want to check your level first? <Link href="/level-test" className="font-semibold text-indigo-700 underline">Take the free level test</Link>.
            </p>
          </div>
          <div className="card-modern p-6 sm:p-8">
            {batch ? <p className="mb-4 rounded bg-sun-100 px-3 py-2 text-sm">Demo for: <strong>{batch.courseTitle}</strong> (starts {batch.startDate})</p> : null}
            <LeadForm type="demo" submitLabel="Book my free demo" defaultInterest={interest} batchId={batch?.id} />
          </div>
        </div>
      </section>
    </>
  );
}
