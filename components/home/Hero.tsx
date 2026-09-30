import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SakuraPetals } from "@/components/japan/SakuraPetals";
import { KanaPlayground } from "@/components/home/KanaPlayground";
import { HeroBlocks } from "@/components/home/HeroBlocks";
import { Hanko } from "@/components/japan/Hanko";
import { BrushStroke } from "@/components/japan/BrushStroke";

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
        <BrushStroke className="pointer-events-none absolute bottom-4 left-1/2 -z-10 h-8 w-[92%] max-w-6xl -translate-x-1/2 text-indigo-950 sm:bottom-6 sm:h-12" />
        <p aria-hidden data-parallax="0.1" className="tategaki pointer-events-none absolute left-3 top-24 hidden text-lg font-bold text-hanko/70 xl:block 2xl:left-10">
          一期一会 · 日本語の道
        </p>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-8 lg:pt-20 lg:pb-24">
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
            <HeroBlocks />
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
