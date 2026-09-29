import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { images } from "@/lib/site";
import { SakuraPetals } from "@/components/japan/SakuraPetals";

export function Hero() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-indigo-950 text-white">
        <Image
          src={`${images.groupStudy}?w=2000&q=70&auto=format&fit=crop`}
          alt="Students learning Japanese together"
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-950/92 via-indigo-950/70 to-indigo-900/30" />
        <div aria-hidden className="aurora-overlay absolute inset-0 -z-10" />
        <div aria-hidden className="rising-sun absolute -z-10 right-[8%] top-[12%] h-72 w-72 sm:h-96 sm:w-96" />
        <span aria-hidden className="jp-outline pointer-events-none select-none absolute -z-[5] right-8 lg:right-20 top-1/2 -translate-y-1/2 hidden lg:block text-8xl xl:text-9xl">
          日本語
        </span>
        <SakuraPetals />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="flex items-center gap-2 animate-fade-up">
            <span className="h-px w-8 bg-sun-300" aria-hidden />
            <p className="font-jp text-sun-300 text-lg sm:text-xl font-medium">日本語を、あなたのペースで。</p>
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] animate-fade-up">
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
