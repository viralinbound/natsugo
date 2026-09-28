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
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-950/90 via-indigo-950/65 to-indigo-950/25" />
        <SakuraPetals />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <p className="font-jp text-sun-300 text-lg sm:text-xl font-medium animate-fade-up">日本語を、あなたのペースで。</p>
          <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] animate-fade-up">
            Learn Japanese.
            <br />
            Know your level.
            <br />
            <span className="text-sun-400">Follow your path.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-white/85 animate-fade-up [animation-delay:100ms]">
            Live Japanese classes online across India and in Bengaluru — with speaking practice, JLPT preparation from N5 to N1, and progress you can actually measure.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up [animation-delay:200ms]">
            <Button href="/level-test" size="lg">Take Free Level Test</Button>
            <Button href="/batches" variant="outline-light" size="lg">View Upcoming Batches</Button>
          </div>
        </div>
      </section>
      <div className="bg-sun-400 text-white">
        <p className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 text-center text-sm sm:text-base font-bold">
          Live online across India · Classroom batches in Bengaluru · Weekday evening &amp; weekend timings ·{" "}
          <Link href="/free-japanese-demo-class" className="underline underline-offset-4">Try a free demo</Link>
        </p>
      </div>
    </>
  );
}
