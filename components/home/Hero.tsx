import Link from "next/link";
import { ArrowRight, Check, Radio, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroStudio } from "@/components/home/HeroStudio";
import { HeroBackdrop } from "@/components/home/HeroBackdrop";

const goals = [
  { label: "Pass the JLPT", href: "/jlpt-japanese-preparation-course" },
  { label: "Speak Japanese", href: "/speak-japanese" },
  { label: "Work in Japan", href: "/work-in-japan" },
  { label: "Study in Japan", href: "/study-in-japan" },
];


const proof = ["Live online classes", "N5 to N1 in one path", "Free quizzes & resources"];

// Home hero in the Natsugo brand: navy type, blue accents, a clean "your JLPT path" panel on the right.
export function Hero() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-bg">
        <HeroBackdrop />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-20 lg:pb-24">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-indigo-700/20 bg-sun-100 px-3.5 py-1.5 text-xs font-bold text-indigo-800 sm:text-sm animate-fade-up">
              <Radio size={14} className="text-hanko" /> New batches open · 100% live online
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-indigo-950 sm:text-6xl animate-fade-up">
              Learn Japanese
              <br />
              <span className="text-gradient-anim">the structured way.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-charcoal-700 sm:text-lg animate-fade-up [animation-delay:100ms]">
              Live classes with real teachers, a clear path from N5 to N1, and practice you can measure. Join from anywhere in India.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-up [animation-delay:200ms]">
              <Button href="/level-test" size="lg">
                Take Free Level Test <ArrowRight size={18} />
              </Button>
              <Button href="/free-japanese-demo-class" variant="outline" size="lg">
                Book a Free Demo
              </Button>
            </div>
            <ul className="mt-7 flex flex-col gap-2 text-sm font-semibold text-charcoal-700 sm:flex-row sm:flex-wrap sm:gap-x-6 animate-fade-up [animation-delay:250ms]">
              {proof.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-success/15 text-success"><Check size={13} strokeWidth={3} /></span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-2 animate-fade-up [animation-delay:300ms]">
              <span className="mr-1 text-sm font-semibold text-charcoal-500">I want to</span>
              {goals.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="rounded-full border border-charcoal-100 bg-surface px-4 py-2 text-sm font-semibold text-indigo-950 transition-colors hover:border-indigo-700 hover:text-indigo-700"
                >
                  {g.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:200ms]">
            <HeroStudio />
          </div>
        </div>
      </section>
      <div className="gradient-strip text-white">
        <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-3.5 text-center text-sm font-bold sm:px-6 sm:text-base lg:px-8">
          <Sparkles size={16} className="hidden shrink-0 sm:block" />
          Weekday evening &amp; weekend timings ·{" "}
          <Link href="/free-japanese-demo-class" className="underline underline-offset-4">Try a free demo</Link>
        </p>
      </div>
    </>
  );
}
