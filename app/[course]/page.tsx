import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarClock, Check, Clock, MonitorPlay } from "lucide-react";
import { courseDetails, getCourse } from "@/lib/courses";
import { getBatches } from "@/lib/repo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { BatchCard } from "@/components/ui/BatchCard";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ViewerCount } from "@/components/live/ViewerCount";

export const dynamicParams = false;

export function generateStaticParams() {
  return courseDetails.map((c) => ({ course: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const { course } = await params;
  const c = getCourse(course);
  if (!c) return {};
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: { canonical: `/${c.slug}` },
    openGraph: { title: c.metaTitle, description: c.metaDescription, images: [`${c.image}?w=1200&h=630&fit=crop`] },
  };
}

export default async function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params;
  const c = getCourse(course);
  if (!c) notFound();

  const isJlpt = c.slug.startsWith("jlpt-");
  const crumbs = isJlpt && c.slug !== "jlpt-japanese-preparation-course"
    ? [{ label: "JLPT", href: "/jlpt-japanese-preparation-course" }, { label: c.navLabel, href: `/${c.slug}` }]
    : [{ label: "Courses", href: "/learn-japanese-language-course" }, { label: c.navLabel, href: `/${c.slug}` }];

  const batches = await getBatches();
  const courseBatches = batches.filter((b) => b.courseSlug === c.slug || (c.level && b.level === c.level));
  const related = c.related.map(getCourse).filter(Boolean);

  return (
    <>
      <PageHero title={c.title} eyebrow={c.eyebrow} intro={c.intro} image={c.image} crumbs={crumbs}>
        <Button href="/level-test" size="lg">Take Free Level Test</Button>
        <Button href="#batches" variant="outline-light" size="lg">See Upcoming Batches</Button>
      </PageHero>

      {c.level ? (
        <div className="bg-indigo-950 text-white">
          <p className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 text-sm flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-bold text-sun-300">Online classroom:</span>
            <span className="text-white/80">{c.level} video lessons, study notes, live classes and recordings.</span>
            <Link href={`/online-classroom/${c.level.toLowerCase()}`} className="font-bold underline underline-offset-4">Open {c.level} classroom →</Link>
          </p>
        </div>
      ) : null}

      {/* Quick facts strip */}
      <section className="bg-sun-100 border-b border-sun-300/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 grid sm:grid-cols-3 gap-4 text-sm">
          <p className="flex items-center gap-2.5 text-charcoal-800"><Clock size={18} className="text-indigo-800 shrink-0" /><span><strong>Duration:</strong> {c.duration}</span></p>
          <p className="flex items-center gap-2.5 text-charcoal-800"><MonitorPlay size={18} className="text-indigo-800 shrink-0" /><span><strong>Format:</strong> {c.format}</span></p>
          <p className="flex items-center gap-2.5 text-charcoal-800"><CalendarClock size={18} className="text-indigo-800 shrink-0" /><span><strong>Schedule:</strong> {c.schedule}</span></p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950">Who is this course for?</h2>
            <ul className="mt-5 space-y-3">
              {c.whoFor.map((w) => (
                <li key={w} className="flex gap-3 text-charcoal-700"><Check size={20} className="text-success shrink-0 mt-0.5" />{w}</li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl sm:text-3xl font-bold text-indigo-950">What you&apos;ll be able to do</h2>
            <ul className="mt-5 grid sm:grid-cols-2 gap-3">
              {c.outcomes.map((o) => (
                <li key={o} className="border-l-4 border-sun-400 bg-surface px-4 py-3 text-charcoal-800">{o}</li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl sm:text-3xl font-bold text-indigo-950">Curriculum</h2>
            <ol className="mt-5 space-y-4">
              {c.curriculum.map((m, i) => (
                <li key={m.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-900 text-sm font-bold text-white">{i + 1}</span>
                  <div className="pb-4 border-b border-charcoal-100 flex-1">
                    <h3 className="font-bold text-indigo-950">{m.title}</h3>
                    <p className="mt-1 text-charcoal-500 font-jp">{m.points.join(" · ")}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:sticky lg:top-28 self-start space-y-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src={`${c.image}?w=900&q=70&auto=format&fit=crop`} alt={`${c.navLabel} class`} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="card-modern p-6">
              <h2 className="font-bold text-indigo-950">Skills covered</h2>
              <dl className="mt-4 divide-y divide-charcoal-100">
                {c.skills.map((s) => (
                  <div key={s.label} className="flex justify-between gap-4 py-2.5 text-sm">
                    <dt className="font-semibold text-charcoal-800">{s.label}</dt>
                    <dd className="text-charcoal-500 text-right">{s.detail}</dd>
                  </div>
                ))}
              </dl>
              <h3 className="mt-6 font-bold text-indigo-950">Study materials</h3>
              <ul className="mt-2 space-y-1 text-sm text-charcoal-700">{c.materials.map((m) => <li key={m}>• {m}</li>)}</ul>
              <h3 className="mt-5 font-bold text-indigo-950">Practice & tests</h3>
              <ul className="mt-2 space-y-1 text-sm text-charcoal-700">{c.practice.map((m) => <li key={m}>• {m}</li>)}</ul>
              <p className="mt-5 text-xs text-charcoal-500">Fee: shared on request — contact admissions for the current fee.</p>
              <div className="mt-5 grid gap-2">
                <Button href={`/free-japanese-demo-class?course=${c.slug}`}>Book Free Demo</Button>
                <Button href="/contact" variant="outline">Ask a Question</Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="batches" className="bg-bg-alt py-14 sm:py-20 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950">Upcoming batches</h2>
              <ViewerCount room={`course-${c.slug}`} className="mt-1 text-sun-500" />
            </div>
            <Link href="/batches" className="inline-block py-2 font-semibold text-indigo-700 underline underline-offset-4">All batches →</Link>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courseBatches.length ? (
              courseBatches.map((b) => <BatchCard key={b.id} batch={b} />)
            ) : (
              <p className="text-charcoal-700">New batches are being scheduled. <Link href="/contact" className="underline">Contact us</Link> to join the waitlist.</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950">Frequently asked questions</h2>
          <div className="mt-8"><FAQAccordion items={c.faqs} /></div>

          {related.length ? (
            <>
              <h2 className="mt-14 text-xl font-bold text-indigo-950">Related courses</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {related.map((r) => (
                  <Link key={r!.slug} href={`/${r!.slug}`} className="rounded-md border border-charcoal-100 bg-surface px-4 py-2.5 font-semibold text-indigo-800 hover:border-indigo-800">
                    {r!.navLabel} →
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>

      <FinalCTA />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: c.title,
          description: c.metaDescription,
          url: `${site.url}/${c.slug}`,
          provider: { "@type": "Organization", name: site.name, url: site.url },
          inLanguage: "ja",
          hasCourseInstance: [{ "@type": "CourseInstance", courseMode: ["Online", "Onsite"], location: "Bengaluru, India" }],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
        }}
      />
    </>
  );
}
