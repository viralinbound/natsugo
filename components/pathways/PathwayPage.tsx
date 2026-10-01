import Image from "next/image";
import { ExternalLink, Info } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import type { FAQItem } from "@/lib/types";

export interface PathwayContent {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  image: string;
  sideImage: string;
  steps: { title: string; body: string }[];
  levelGuide: { level: string; note: string }[];
  links: { label: string; href: string }[];
  faqs: FAQItem[];
}

export function PathwayPage({ c }: { c: PathwayContent }) {
  return (
    <>
      <PageHero title={c.title} eyebrow={c.eyebrow} intro={c.intro} image={c.image} crumbs={[{ label: c.eyebrow, href: `/${c.slug}` }]}>
        <Button href="/free-japanese-demo-class" size="lg">Book a Free Demo</Button>
        <Button href="/contact" variant="outline-light" size="lg">Talk to an Advisor</Button>
      </PageHero>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950">How language fits into the journey</h2>
            <ol className="mt-6 space-y-6">
              {c.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="font-jp text-3xl font-bold text-sun-400 w-10 shrink-0">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-indigo-950">{s.title}</h3>
                    <p className="mt-1 text-charcoal-700">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg hidden lg:block">
            <Image src={`${c.sideImage}?w=900&q=70&auto=format&fit=crop`} alt="" fill sizes="50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-bg-alt py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950">What level is usually expected?</h2>
          <p className="mt-2 text-charcoal-700">A general guide only — every employer, school and programme sets its own requirements.</p>
          <div className="mt-6 overflow-x-auto card-modern">
            <table className="w-full min-w-[480px] text-left">
              <thead className="bg-indigo-950 text-white text-sm"><tr><th className="px-5 py-3 w-32">Level</th><th className="px-5 py-3">Where it commonly helps</th></tr></thead>
              <tbody className="divide-y divide-charcoal-100">
                {c.levelGuide.map((r) => (
                  <tr key={r.level}><td className="px-5 py-3 font-bold text-indigo-950">{r.level}</td><td className="px-5 py-3 text-charcoal-700">{r.note}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex gap-3 rounded-lg border border-sun-400 bg-sun-100 p-5 text-sm text-charcoal-800">
            <Info className="shrink-0 text-indigo-900" size={20} />
            <p>We are a language institute. We do not provide visa, admission or job placement services, and no JLPT level guarantees a visa, admission or job. Always rely on the official sources below.</p>
          </div>
          <h3 className="mt-10 font-bold text-indigo-950">Official resources</h3>
          <ul className="mt-3 grid sm:grid-cols-2 gap-3">
            {c.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-md border border-charcoal-100 bg-surface px-4 py-3 font-semibold text-indigo-800 hover:border-indigo-800">
                  {l.label} <ExternalLink size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950">Questions</h2>
          <div className="mt-6"><FAQAccordion items={c.faqs} /></div>
        </div>
      </section>
    </>
  );
}
