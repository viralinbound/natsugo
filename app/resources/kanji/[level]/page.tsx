import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { kanjiByLevel, kanjiLevelOrder } from "@/lib/kanjiLevels";
import { kanjiN5 } from "@/lib/learning";
import { PageHero } from "@/components/ui/PageHero";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { Button } from "@/components/ui/Button";
import { KanjiGrid } from "@/components/resources/KanjiGrid";
import { images } from "@/lib/site";
import type { JLPTLevel } from "@/lib/types";

const levelParam = (l: JLPTLevel) => l.toLowerCase();

export const dynamicParams = false;
export const generateStaticParams = () => kanjiLevelOrder.map((l) => ({ level: levelParam(l) }));

function getLevel(param: string): JLPTLevel | undefined {
  return kanjiLevelOrder.find((l) => levelParam(l) === param);
}

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const level = getLevel((await params).level);
  if (!level) return {};
  const count = kanjiByLevel[level].length;
  return {
    title: `JLPT ${level} Kanji List (${count} Kanji) — Free Reference`,
    description: `Browse all ${count} kanji for JLPT ${level}, ordered by frequency. Tap any kanji to hear it read aloud. Free reference from Natsugo.`,
    alternates: { canonical: `/resources/kanji/${levelParam(level)}` },
  };
}

const meaningLookup = new Map(kanjiN5.map((k) => [k.k, { m: k.m, r: k.r }]));

export default async function KanjiLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const level = getLevel((await params).level);
  if (!level) notFound();

  const kanji = kanjiByLevel[level];
  const idx = kanjiLevelOrder.indexOf(level);
  const prev = idx > 0 ? kanjiLevelOrder[idx - 1] : undefined;
  const next = idx < kanjiLevelOrder.length - 1 ? kanjiLevelOrder[idx + 1] : undefined;

  return (
    <>
      <PageHero
        title={`JLPT ${level} Kanji List`}
        eyebrow="Kanji by Level"
        intro={`All ${kanji.length} kanji commonly studied for JLPT ${level}, ordered by frequency of use. Tap any kanji to hear it read aloud.`}
        image={images.books}
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "Kanji", href: "/resources/kanji" }, { label: level, href: `/resources/kanji/${levelParam(level)}` }]}
      >
        <Button href={`/jlpt-${levelParam(level)}`} size="lg">{level} Course & Batches</Button>
        <Button href="/jlpt-quiz" variant="outline-light" size="lg">Practice with a Quiz</Button>
      </PageHero>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {kanjiLevelOrder.map((l) => (
                <Link
                  key={l}
                  href={`/resources/kanji/${levelParam(l)}`}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    l === level ? "bg-indigo-950 text-white" : "bg-bg-alt text-charcoal-700 hover:bg-charcoal-100"
                  }`}
                >
                  {l} ({kanjiByLevel[l].length})
                </Link>
              ))}
            </div>
            <p className="text-sm text-charcoal-500">{kanji.length} kanji &middot; ordered by frequency</p>
          </div>

          <KanjiGrid
            kanji={kanji}
            hints={new Map(kanji.map((k) => [k, meaningLookup.has(k) ? `${meaningLookup.get(k)!.m} (${meaningLookup.get(k)!.r})` : "Tap to hear this kanji"]))}
          />

          <p className="mt-8 text-sm text-charcoal-500 max-w-2xl">
            This list follows the commonly used JLPT {level} kanji grouping. Meanings and readings for
            every kanji are covered lesson-by-lesson in the {level} course and classroom material —{" "}
            <Link href={`/jlpt-${levelParam(level)}`} className="font-semibold text-indigo-800 hover:underline">
              see the {level} course
            </Link>
            . For a fully worked N5 list with meanings and readings, see the{" "}
            <Link href="/resources/kanji" className="font-semibold text-indigo-800 hover:underline">
              N5 kanji reference
            </Link>
            . Tap any kanji above to hear it — most browsers support Japanese text-to-speech, using
            <SpeakButton text="日本語" className="inline-flex mx-1 align-middle" /> as a quick test.
          </p>

          <div className="mt-10 flex items-center justify-between border-t border-charcoal-100 pt-6">
            {prev ? (
              <Link href={`/resources/kanji/${levelParam(prev)}`} className="font-semibold text-indigo-800 hover:underline">
                ← JLPT {prev} kanji
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/resources/kanji/${levelParam(next)}`} className="font-semibold text-indigo-800 hover:underline">
                JLPT {next} kanji →
              </Link>
            ) : <span />}
          </div>
        </div>
      </section>
    </>
  );
}
