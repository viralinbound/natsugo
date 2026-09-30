import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SakuraPetals } from "@/components/japan/SakuraPetals";
import { JapanScene } from "@/components/japan/JapanScene";
import { KanaPlayground } from "@/components/home/KanaPlayground";

const chips = [
  { label: "N5", pos: "left-[4%] top-[12%]", delay: "0s" },
  { label: "N4", pos: "left-[26%] top-[2%]", delay: "-1.2s" },
  { label: "N3", pos: "right-[6%] top-[42%]", delay: "-2.4s" },
  { label: "N2", pos: "right-[26%] bottom-[8%]", delay: "-3.6s" },
  { label: "N1", pos: "left-[6%] bottom-[10%]", delay: "-4.8s" },
];

export function Hero() {
  return (
    <>
      <section className="aurora relative isolate overflow-hidden text-white">
        <SakuraPetals />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-6 items-center">
          <div>
            <div className="flex items-center gap-2 animate-fade-up">
              <span className="h-px w-8 bg-sun-300" aria-hidden />
              <p className="font-jp text-sun-300 text-lg sm:text-xl font-medium">日本語を、あなたのペースで。</p>
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold tracking-tight leading-[1.05] animate-fade-up">
              Learn Japanese.
              <br />
              Know your level.
              <br />
              <span className="text-gradient-anim">Follow your path.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-white/85 animate-fade-up [animation-delay:100ms]">
              Live online Japanese classes you can join from anywhere in India — with speaking practice, JLPT preparation from N5 to N1, and progress you can actually measure.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up [animation-delay:200ms]">
              <Button href="/level-test" size="lg">Take Free Level Test</Button>
              <Button href="/batches" variant="outline-light" size="lg">View Upcoming Batches</Button>
            </div>
            <KanaPlayground />
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none animate-fade-up [animation-delay:150ms]">
            <JapanScene className="w-full h-auto [mask-image:linear-gradient(to_bottom,black_84%,transparent)]" />
            {chips.map((c) => (
              <span
                key={c.label}
                aria-hidden
                style={{ animationDelay: c.delay }}
                className={`chip-float absolute ${c.pos} rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-sm font-extrabold backdrop-blur-md shadow-lg`}
              >
                {c.label}
              </span>
            ))}
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
