import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SakuraPetals } from "@/components/japan/SakuraPetals";
import { EnsoCircles } from "@/components/japan/EnsoCircles";
import { KanaPlayground } from "@/components/home/KanaPlayground";
import { HeroQuiz } from "@/components/home/HeroQuiz";
import { levelTestQuestions } from "@/lib/learning";
import { Hanko } from "@/components/japan/Hanko";
import { SumiMountains } from "@/components/japan/SumiMountains";

const goals = [
  { label: "Pass the JLPT", href: "/jlpt-japanese-preparation-course" },
  { label: "Speak Japanese", href: "/speak-japanese" },
  { label: "Work in Japan", href: "/work-in-japan" },
  { label: "Study in Japan", href: "/study-in-japan" },
];

export function Hero() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-bg">
        <SakuraPetals />
        <SumiMountains className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 w-full text-indigo-950 sm:h-64" />
        <EnsoCircles className="pointer-events-none absolute -z-10 top-1/2 -right-[38%] w-[min(120vw,760px)] -translate-y-1/2 sm:-right-[22%] lg:-right-[6%] opacity-25 sm:opacity-90" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 animate-fade-up">
              <Hanko text="学" size={32} />
              <p className="font-mincho text-sun-500 text-lg sm:text-xl font-bold">日本語を、あなたのペースで。</p>
            </div>
            <h1 className="mt-5 text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-medium tracking-tight leading-[1.05] text-indigo-950 animate-fade-up">
              Learn Japanese.
              <br />
              Know your level.
              <br />
              <span className="text-gradient-anim">Follow your path.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base sm:text-lg text-charcoal-700 animate-fade-up [animation-delay:100ms]">
              Live online Japanese classes you can join from anywhere in India — with speaking practice, JLPT preparation from N5 to N1, and progress you can actually measure.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 animate-fade-up [animation-delay:200ms]">
              <Button href="/level-test" size="lg">Take Free Level Test</Button>
              <Button href="/batches" variant="outline" size="lg">View Upcoming Batches</Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2 animate-fade-up [animation-delay:250ms]">
              <span className="mr-1 text-sm font-semibold text-charcoal-500">I want to</span>
              {goals.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="rounded-full border border-charcoal-100 bg-surface px-4 py-2 text-sm font-semibold text-indigo-950 transition-colors hover:border-sun-400 hover:text-sun-500"
                >
                  {g.label}
                </Link>
              ))}
            </div>

            <div className="hidden sm:block">
              <KanaPlayground />
            </div>
          </div>
          <div className="animate-fade-up [animation-delay:200ms]">
            <HeroQuiz questions={levelTestQuestions.filter((q) => !q.audio).slice(0, 3)} />
          </div>
        </div>
      </section>
      <div className="gradient-strip text-white">
        <p className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 text-center text-sm sm:text-base font-bold">
          100% live online · Join from anywhere in India · Weekday evening &amp; weekend timings ·{" "}
          <Link href="/free-japanese-demo-class" className="underline underline-offset-4">Try a free demo</Link>
        </p>
      </div>
    </>
  );
}
