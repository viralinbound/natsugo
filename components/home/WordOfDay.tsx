import Link from "next/link";
import { getWordOfDay } from "@/lib/repo";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { FuriganaToggle } from "@/components/japan/FuriganaToggle";

export async function WordOfDay({ embedded = false, className = "" }: { embedded?: boolean; className?: string }) {
  const w = await getWordOfDay();
  const hasKanji = /[一-龯]/.test(w.jp);

  const card = (
    <div className={`relative overflow-hidden ${embedded ? "bento-tile rounded-3xl" : "rounded-xl"} border border-charcoal-100 bg-surface washi ${className}`}>
      <span aria-hidden className="pointer-events-none absolute -right-6 -top-10 font-jp text-[11rem] leading-none text-sun-100 select-none">言</span>
      <div className={`relative grid ${embedded ? "" : "md:grid-cols-[auto_1fr]"} gap-6 md:gap-10 p-6 sm:p-10 items-center h-full`}>
        <div className="text-center md:text-left">
          <p id="wotd" className="text-xs font-bold uppercase tracking-wider text-sun-500">
            Word of the day · <span className="font-jp">今日の言葉</span>
          </p>
          <p className="mt-3 font-jp text-6xl sm:text-7xl font-bold text-indigo-950 leading-tight">
            {hasKanji ? (
              <ruby>
                {w.jp}
                <rt className="text-base font-medium text-sun-500">{w.reading}</rt>
              </ruby>
            ) : (
              w.jp
            )}
          </p>
          <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
            <span className="text-charcoal-500">{w.romaji}</span>
            <SpeakButton text={w.reading} label={`Listen to ${w.romaji}`} />
            <span className="rounded bg-bg-alt px-2 py-0.5 text-xs font-bold text-charcoal-700">{w.level}</span>
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-indigo-950">{w.meaning}</p>
          <div className="mt-4 flex items-start gap-2 rounded-md bg-bg-alt px-4 py-3">
            <div className="flex-1">
              <p className="font-jp text-lg text-charcoal-900">{w.example_jp}</p>
              <p className="text-sm text-charcoal-500">{w.example_en}</p>
            </div>
            <SpeakButton text={w.example_jp} label="Listen to the example sentence" />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {hasKanji ? <FuriganaToggle /> : null}
            <Link href="/resources/flashcards" className="inline-block py-2 font-bold text-indigo-900 underline decoration-sun-400 decoration-2 underline-offset-4">
              Practise with daily flashcards →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  if (embedded) return card;
  return (
    <section className="py-12 sm:py-16" aria-labelledby="wotd">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">{card}</div>
    </section>
  );
}
