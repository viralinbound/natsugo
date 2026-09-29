import { Button } from "@/components/ui/Button";

const results = [
  { label: "Vocabulary", value: 72 },
  { label: "Grammar", value: 64 },
  { label: "Reading", value: 78 },
  { label: "Listening", value: 52 },
  { label: "Kanji", value: 45 },
];

export function LevelTest() {
  return (
    <section className="overflow-hidden bg-sun-100 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="font-jp text-lg font-bold text-sun-500">レベルチェック</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-indigo-950 tracking-tight text-balance">
            Not sure which Japanese level is right for you?
          </h2>
          <p className="mt-4 text-lg text-charcoal-700 max-w-lg">
            Take our free 12-question test covering vocabulary, grammar, kanji, reading and listening. You&apos;ll get a skill-by-skill breakdown and a recommended starting course in about five minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button href="/level-test" size="lg">Take Free Level Test</Button>
            <Button href="/free-japanese-demo-class" variant="outline" size="lg">Or book a demo</Button>
          </div>
        </div>

        <div className="rounded-lg bg-surface p-6 sm:p-8 shadow-[0_20px_50px_-20px_rgba(15,19,41,0.35)] rotate-0 lg:rotate-1">
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
          <div className="mt-6 flex items-center justify-between rounded-md bg-indigo-950 px-4 py-3 text-white">
            <span className="text-sm text-white/70">Recommended</span>
            <span className="font-bold text-sun-300">JLPT N4 Preparation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
