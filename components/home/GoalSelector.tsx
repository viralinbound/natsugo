import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { goalCards } from "@/lib/data";

const jp: Record<string, string> = {
  jlpt: "試験",
  speaking: "会話",
  career: "仕事",
  "work-in-japan": "就職",
  "study-in-japan": "留学",
  business: "ビジネス",
  travel: "旅行",
};

export function GoalSelector() {
  return (
    <section className="overflow-hidden bg-indigo-950 py-16 sm:py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-sun-300">Learn by goal</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">What are you learning Japanese for?</h2>
          <p className="mt-4 text-white/70">Pick your goal and we&apos;ll show you the right course, level and next step.</p>
        </div>
        <ul className="grid sm:grid-cols-2 border-t border-white/15">
          {goalCards.map((g) => (
            <li key={g.id} className="border-b border-white/15 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6">
              <Link href={g.href} className="group flex items-center gap-4 py-5">
                <span className="font-jp w-20 shrink-0 text-base sm:text-lg text-sun-300 whitespace-nowrap">{jp[g.id]}</span>
                <span className="flex-1">
                  <span className="block text-lg font-bold group-hover:text-sun-300 transition-colors">{g.title}</span>
                  <span className="block text-sm text-white/65">{g.description}</span>
                </span>
                <ArrowUpRight size={20} className="shrink-0 text-white/40 group-hover:text-sun-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
