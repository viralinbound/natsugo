import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface PageQuizSet {
  id: string;
  label: string;
  href: string;
  desc?: string;
}

// End-of-page test launcher: one card per test, each opening the test on its own page.
export function PageQuiz({ title, intro, sets }: { title: string; intro: string; sets: PageQuizSet[] }) {
  return (
    <section id="quiz" className="scroll-mt-24 bg-bg-alt py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="font-jp text-sm font-bold text-hanko">練習クイズ · Free test</p>
        <h2 className="mt-1 text-2xl font-bold text-indigo-950 sm:text-3xl">{title}</h2>
        <p className="mt-2 text-charcoal-700">{intro}</p>
        <div className={`mt-6 grid gap-3 ${sets.length > 3 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : "sm:grid-cols-3"}`}>
          {sets.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              className="group flex flex-col rounded-xl border-2 border-charcoal-100 bg-surface p-4 transition-colors hover:border-indigo-700"
            >
              <span className="text-lg font-semibold text-indigo-950">{s.label}</span>
              {s.desc ? <span className="mt-1 text-xs text-charcoal-500">{s.desc}</span> : null}
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-indigo-800">
                Start test <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
