import Image from "next/image";
import Link from "next/link";
import { getCourse } from "@/lib/courses";
import { Button } from "@/components/ui/Button";

const picks = [
  { slug: "japanese-for-beginners", bestFor: "Complete beginners starting from hiragana" },
  { slug: "jlpt-japanese-preparation-course", bestFor: "Learners working towards a JLPT level, N5 to N1" },
  { slug: "speak-japanese", bestFor: "Anyone who reads Japanese but freezes when speaking" },
  { slug: "business-japanese", bestFor: "IT and working professionals with Japanese clients" },
];

export function CoursesShowcase() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-sun-500">Courses</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-indigo-950 tracking-tight">Explore our Japanese courses</h2>
          </div>
          <Button href="/learn-japanese-language-course" variant="outline">Browse all courses</Button>
        </div>
        <div className="swipe-row mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {picks.map((p) => {
            const c = getCourse(p.slug)!;
            return (
              <Link key={p.slug} href={`/${c.slug}`} className="group flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image src={`${c.image}?w=700&q=65&auto=format&fit=crop`} alt={`${c.navLabel} course`} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-indigo-950 group-hover:underline underline-offset-4">{c.navLabel}</h3>
                <p className="mt-1.5 text-charcoal-700">{p.bestFor}</p>
                <p className="mt-3 border-t border-charcoal-100 pt-3 text-sm text-charcoal-500">
                  <span className="font-semibold text-charcoal-800">Schedule:</span> {c.schedule}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
