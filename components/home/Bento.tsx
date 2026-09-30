import { Button } from "@/components/ui/Button";
import { WordOfDay } from "@/components/home/WordOfDay";
import { Hanko } from "@/components/japan/Hanko";

const facts = [
  { big: "N5→N1", label: "Complete JLPT path" },
  { big: "100%", label: "Live online classes — join from anywhere" },
  { big: "Free", label: "Level test and demo class" },
];

const results = [
  { label: "Vocabulary", value: 72 },
  { label: "Grammar", value: 64 },
  { label: "Reading", value: 78 },
  { label: "Listening", value: 52 },
  { label: "Kanji", value: 45 },
];

export function Bento() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="bento-tile aurora relative overflow-hidden rounded-3xl p-7 sm:p-10 text-white md:col-span-2 lg:row-span-2 flex flex-col justify-center">
          <span aria-hidden className="jp-outline pointer-events-none select-none absolute right-5 top-5 text-6xl sm:text-7xl">道</span>
          <h2 className="relative text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
            Japanese classes built around <span className="text-gradient-anim">where you want to go</span>
          </h2>
          <p className="relative mt-6 text-lg text-white/80 leading-relaxed">
            Whether you&apos;re preparing for the JLPT, joining a Japanese client project, planning to study in Japan or just love the language — we start by finding your level, then give you a clear path, live teachers and regular practice to get there.
          </p>
        </div>

        <WordOfDay embedded className="md:col-span-2" />

        <dl className="bento-tile md:col-span-2 grid grid-cols-3 divide-x divide-charcoal-100 rounded-3xl border border-charcoal-100 bg-gradient-to-br from-sun-100 to-surface">
          {facts.map((f) => (
            <div key={f.big} className="flex flex-col justify-center p-4 sm:p-6">
              <dt className="text-2xl sm:text-3xl font-extrabold text-gradient-anim">{f.big}</dt>
              <dd className="mt-2 text-xs sm:text-sm font-medium text-charcoal-700">{f.label}</dd>
            </div>
          ))}
        </dl>

        <div className="bento-tile md:col-span-2 rounded-3xl bg-sun-100 p-7 sm:p-10">
          <Hanko text="無料" size={52} className="absolute right-6 top-6" />
          <p className="font-mincho text-lg font-bold text-sun-500">レベルチェック</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-indigo-950 tracking-tight text-balance">
            Not sure which Japanese level is right for you?
          </h2>
          <p className="mt-4 text-charcoal-700">
            Take our free 12-question test covering vocabulary, grammar, kanji, reading and listening. You&apos;ll get a skill-by-skill breakdown and a recommended starting course in about five minutes.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button href="/level-test" size="lg">Take Free Level Test</Button>
            <Button href="/free-japanese-demo-class" variant="outline" size="lg">Or book a demo</Button>
          </div>
        </div>

        <div className="bento-tile md:col-span-2 rounded-3xl border border-charcoal-100 bg-surface p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <p className="font-bold text-indigo-950">Sample result</p>
            <span className="text-xs text-charcoal-500">Illustration</span>
          </div>
          <div className="mt-5 space-y-4">
            {results.map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-charcoal-700">{r.label}</span>
                  <span className="font-bold text-indigo-900">{r.value}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-bg-alt overflow-hidden">
                  <div className={`h-full rounded-full animate-grow-bar ${r.value < 50 ? "bg-red-500" : "bg-indigo-700"}`} style={{ width: `${r.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between rounded-xl bg-indigo-950 px-4 py-3 text-white">
            <span className="text-sm text-white/70">Recommended</span>
            <span className="font-bold text-sun-300">JLPT N4 Preparation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
