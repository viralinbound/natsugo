import Link from "next/link";
import { ArrowRight, CalendarDays, Check, Headphones, Radio, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

const goals = [
  { label: "Pass the JLPT", href: "/jlpt-japanese-preparation-course" },
  { label: "Speak Japanese", href: "/speak-japanese" },
  { label: "Work in Japan", href: "/work-in-japan" },
  { label: "Study in Japan", href: "/study-in-japan" },
];

const path = [
  { level: "N5", name: "Beginner", done: true },
  { level: "N4", name: "Elementary", done: true },
  { level: "N3", name: "Intermediate", now: true },
  { level: "N2", name: "Upper-intermediate" },
  { level: "N1", name: "Advanced" },
];

const proof = ["Live online classes", "N5 to N1 in one path", "Free quizzes & resources"];

// Home hero in the Natsugo brand: navy type, blue accents, a clean "your JLPT path" panel on the right.
export function Hero() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-bg">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_20%,rgb(12_136_255/0.14),transparent_70%),radial-gradient(40%_50%_at_0%_100%,rgb(34_211_238/0.10),transparent_70%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(to_right,var(--color-charcoal-100)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-charcoal-100)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />

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

          <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:200ms] lg:max-w-none">
            <span aria-hidden className="pointer-events-none absolute -right-4 -top-10 font-jp text-[9rem] font-bold leading-none text-indigo-700/[0.07] sm:text-[11rem]">日本語</span>
            <div className="relative rounded-3xl border border-charcoal-100 bg-surface p-5 shadow-[0_30px_80px_-30px_rgb(11_27_58/0.35)] sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Your JLPT path</p>
                  <p className="mt-1 text-lg font-extrabold text-indigo-950">Currently on N3</p>
                </div>
                <span className="rounded-full bg-sun-100 px-3 py-1 text-xs font-bold text-indigo-800">60% done</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-bg-alt">
                <div className="gradient-strip h-full w-3/5 rounded-full" />
              </div>
              <ol className="mt-5 space-y-2">
                {path.map((p) => (
                  <li
                    key={p.level}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${p.now ? "bg-indigo-900 text-white" : "bg-bg-alt"}`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-extrabold ${
                        p.done ? "bg-success text-white" : p.now ? "bg-white text-indigo-900" : "border-2 border-charcoal-100 text-charcoal-500"
                      }`}
                    >
                      {p.done ? <Check size={16} strokeWidth={3} /> : p.level}
                    </span>
                    <span className={`text-sm font-bold ${p.now ? "text-white" : "text-indigo-950"}`}>{p.level} · {p.name}</span>
                    {p.now ? <span className="ml-auto text-xs font-bold text-sun-300">In progress</span> : null}
                  </li>
                ))}
              </ol>
            </div>

            <div className="absolute -left-3 -bottom-8 hidden w-56 rounded-2xl border border-charcoal-100 bg-surface p-4 shadow-xl sm:block lg:-left-10 hero-float">
              <p className="flex items-center gap-2 text-xs font-bold text-charcoal-500"><CalendarDays size={14} className="text-indigo-700" /> Next live class</p>
              <p className="mt-1 font-bold text-indigo-950">Conversation · N3</p>
              <p className="text-sm text-charcoal-500">Today, 7:30 PM IST</p>
            </div>
            <div className="absolute -right-3 -top-6 hidden rounded-2xl border border-charcoal-100 bg-surface px-4 py-3 shadow-xl sm:flex sm:items-center sm:gap-3 hero-float [animation-delay:-2s]">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-sun-100 text-indigo-700"><Headphones size={17} /></span>
              <div>
                <p className="font-jp text-lg font-bold leading-tight text-indigo-950">ありがとう</p>
                <p className="text-xs text-charcoal-500">arigatō · thank you</p>
              </div>
            </div>
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
