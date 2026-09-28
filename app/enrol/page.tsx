import type { Metadata } from "next";
import Link from "next/link";
import { getBatch } from "@/lib/repo";
import { getCourse } from "@/lib/courses";
import { images } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { ViewerCount } from "@/components/live/ViewerCount";

export const metadata: Metadata = {
  title: "Enrol in a Japanese Batch",
  description: "Reserve your seat in an upcoming Japanese or JLPT batch.",
  robots: { index: false },
};

export default async function EnrolPage({ searchParams }: { searchParams: Promise<{ batch?: string; waitlist?: string }> }) {
  const { batch: batchId, waitlist } = await searchParams;
  const batch = await getBatch(batchId);
  const course = batch ? getCourse(batch.courseSlug) : undefined;
  const isWaitlist = waitlist === "1" || batch?.seatsLeft === 0;

  return (
    <>
      <PageHero title={isWaitlist ? "Join the waitlist" : "Reserve your seat"} eyebrow={isWaitlist ? "Batch full" : "Enrolment"} intro={isWaitlist ? "This batch is full. Join the waitlist and we'll contact you first if a seat opens or when the next batch is scheduled." : undefined} image={images.groupStudy} crumbs={[{ label: "Batches", href: "/batches" }, { label: "Enrol", href: "/enrol" }]} />
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.3fr] gap-10">
          <div>
            {batch ? (
              <div className="rounded-lg border-2 border-indigo-950 bg-surface p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-sun-500">Selected batch</p>
                <ViewerCount room={`batch-${batch.id}`} className="mt-2 text-sun-500" />
                <h2 className="mt-1 text-xl font-bold text-indigo-950">{batch.courseTitle}</h2>
                <dl className="mt-4 space-y-2 text-sm">
                  {[
                    ["Starts", batch.startDate],
                    ["Schedule", batch.schedule],
                    ["Duration", `${batch.durationHours} hours`],
                    ["Format", batch.mode === "Online" ? "Live online" : "Bengaluru classroom"],
                    ["Seats left", String(batch.seatsLeft)],
                    ["Fee", batch.priceLabel],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-charcoal-100 pb-2">
                      <dt className="text-charcoal-500">{k}</dt>
                      <dd className="font-semibold text-charcoal-900 text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
                {course ? <Link href={`/${course.slug}`} className="mt-3 inline-block py-2 text-sm font-semibold text-indigo-700 underline">View course details</Link> : null}
              </div>
            ) : (
              <div className="card-modern p-6">
                <h2 className="font-bold text-indigo-950">No batch selected</h2>
                <p className="mt-2 text-sm text-charcoal-700">Pick a batch first, or fill the form and we&apos;ll suggest one.</p>
                <Link href="/batches" className="mt-4 inline-block font-semibold text-indigo-700 underline">Browse batches</Link>
              </div>
            )}
            <div className="mt-6 text-sm text-charcoal-700 space-y-2">
              <p className="font-bold text-indigo-950">What happens next</p>
              <p>1. Our admissions team calls you to confirm the batch and share the fee.</p>
              <p>2. You complete payment through the link we send.</p>
              <p>3. You receive the class link / classroom details and study materials.</p>
            </div>
          </div>
          <div className="card-modern p-6 sm:p-8">
            <h2 className="text-xl font-bold text-indigo-950">Your details</h2>
            <div className="mt-5">
              <LeadForm type={isWaitlist ? "waitlist" : "enrol"} submitLabel={isWaitlist ? "Join waitlist" : "Request enrolment"} batchId={batch?.id} defaultInterest={batch && batch.level !== "All Levels" ? `JLPT ${batch.level}` : ""} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
