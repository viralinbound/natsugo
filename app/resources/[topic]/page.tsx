import { WoodTile } from "@/components/resources/WoodTile";
import { KanjiCard } from "@/components/resources/KanjiCard";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resourceTopics } from "@/lib/resourceTopics";
import { grammarPoints, hiragana, kanjiN5, katakana, phrases, vocabulary } from "@/lib/learning";
import { PageHero } from "@/components/ui/PageHero";
import { KanaChart } from "@/components/resources/KanaChart";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { QuizHub } from "@/components/quiz/QuizHub";
import { PageQuiz, type PageQuizSet } from "@/components/quiz/PageQuiz";
import { freeTestSets, topicSets } from "@/lib/pageQuiz";
import { Flashcards, type Card } from "@/components/resources/Flashcards";
import { words } from "@/lib/words";
import { Button } from "@/components/ui/Button";
import { kanjiByLevel, kanjiLevelOrder } from "@/lib/kanjiLevels";

export const dynamicParams = false;
export const generateStaticParams = () => resourceTopics.map((t) => ({ topic: t.slug }));

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const t = resourceTopics.find((x) => x.slug === topic);
  if (!t) return {};
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: [...t.keywords],
    alternates: { canonical: `/resources/${t.slug}` },
  };
}

const flashcards: Card[] = [
  ...hiragana.flat().filter((c) => c.kana).map((c) => ({ id: `h-${c.kana}`, front: c.kana, back: c.romaji, deck: "Hiragana" })),
  ...katakana.flat().filter((c) => c.kana).map((c) => ({ id: `k-${c.kana}`, front: c.kana, back: c.romaji, deck: "Katakana" })),
  ...kanjiN5.map((k) => ({ id: `kj-${k.k}`, front: k.k, reading: k.r.split("・")[0], back: k.m, deck: "N5 Kanji" })),
  ...vocabulary.flatMap((v) => v.words.map((w) => ({ id: `v-${w.jp}`, front: w.jp, back: w.en, deck: "Vocabulary" }))),
  ...words.map((w) => ({ id: `w-${w.jp}`, front: w.jp, reading: w.reading, back: w.meaning, deck: "Useful words" })),
];

function Content({ slug }: { slug: string }) {
  switch (slug) {
    case "hiragana":
      return <KanaChart rows={hiragana} />;
    case "katakana":
      return <KanaChart rows={katakana} />;
    case "kanji":
      return (
        <>
          <h2 className="text-2xl font-extrabold text-indigo-950 tracking-tight">Choose your JLPT level</h2>
          <p className="mt-2 text-charcoal-700 max-w-2xl">
            The full kanji list for every level, ordered by frequency of use — {kanjiLevelOrder.map((l) => kanjiByLevel[l].length).reduce((a, b) => a + b, 0)} kanji in total.
          </p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
            {kanjiLevelOrder.map((l) => (
              <Link key={l} href={`/resources/kanji/${l.toLowerCase()}`} className="card-modern p-5 text-center hover:border-sun-400 transition-colors">
                <p className="font-jp text-3xl text-indigo-950">{kanjiByLevel[l].slice(0, 3).join("")}</p>
                <p className="mt-2 text-xl font-extrabold text-indigo-950">{l}</p>
                <p className="text-sm text-charcoal-500">{kanjiByLevel[l].length} kanji →</p>
              </Link>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-extrabold text-indigo-950 tracking-tight">Start here: 30 N5 kanji</h2>
          <p className="mt-2 text-charcoal-700">Tap a card to hear it.</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 pb-2">
            {kanjiN5.map((k) => (
              <KanjiCard key={k.k} {...k} />
            ))}
          </div>
        </>
      );
    case "grammar":
      return (
        <div className="paper-scroll divide-y divide-charcoal-100">
          {grammarPoints.map((g) => (
            <div key={g.pattern} className="py-4 first:pt-0 last:pb-0 sm:flex sm:items-center sm:gap-6">
              <div className="sm:w-56 shrink-0">
                <p className="font-jp text-xl font-bold text-indigo-950">{g.pattern}</p>
                <p className="text-sm text-sun-500 font-semibold">{g.meaning}</p>
              </div>
              <div className="mt-3 sm:mt-0 flex-1 flex items-center justify-between gap-3">
                <div>
                  <p className="font-jp text-charcoal-900">{g.example}</p>
                  <p className="text-sm text-charcoal-500">{g.translation}</p>
                </div>
                <SpeakButton text={g.example} />
              </div>
            </div>
          ))}
        </div>
      );
    case "vocabulary":
      return (
        <div className="grid gap-10 md:grid-cols-2">
          {vocabulary.map((v) => (
            <div key={v.topic}>
              <h2 className="mb-3 text-lg font-bold text-indigo-950">{v.topic}</h2>
              <div className="wood-tray">
                <div className="grid grid-cols-2 gap-3.5">
                  {v.words.map((w) => (
                    <WoodTile key={w.jp} jp={w.jp} en={w.en} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    case "phrases":
      return (
        <div className="wood-tray">
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {phrases.map((p) => (
              <WoodTile key={p.jp} jp={p.jp} sub={p.romaji} en={p.en} />
            ))}
          </div>
        </div>
      );
    case "flashcards":
      return <Flashcards cards={flashcards} />;
    case "jlpt-practice":
      return <QuizHub />;
    default:
      return null;
  }
}

function quizFor(slug: string, name: string): { title: string; intro: string; sets: PageQuizSet[] } | null {
  if (slug === "hiragana" || slug === "katakana") {
    return { title: `Free ${name.toLowerCase()} test`, intro: `Read the ${name.toLowerCase()}, then find it from its sound.`, sets: freeTestSets("kana", [slug]) };
  }
  if (slug === "kanji" || slug === "grammar" || slug === "vocabulary") {
    return { title: `Free ${name.toLowerCase()} test`, intro: `Pick your level: 10 ${name.toLowerCase()} questions, each with an explanation.`, sets: topicSets(slug) };
  }
  if (slug === "phrases") {
    return { title: "Free phrases test", intro: "Choose what you would say in everyday situations.", sets: freeTestSets("phrases") };
  }
  return null;
}

export default async function ResourceTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const t = resourceTopics.find((x) => x.slug === topic);
  if (!t) notFound();
  const others = resourceTopics.filter((x) => x.slug !== t.slug);
  const quiz = quizFor(t.slug, t.short);

  return (
    <>
      <PageHero title={t.title} eyebrow={t.jp} intro={t.desc} image={t.image} crumbs={[{ label: "Resources", href: "/resources" }, { label: t.short, href: `/resources/${t.slug}` }]} />
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Content slug={t.slug} />
          <p className="mt-6 text-xs text-charcoal-500">Audio uses your device&apos;s built-in Japanese voice; quality varies by browser.</p>

          <div className="mt-12 rounded-lg bg-sun-100 p-6 sm:p-8 sm:flex sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-indigo-950">Want a teacher to guide you?</h2>
              <p className="mt-1 text-charcoal-700">Find your level and join a live batch.</p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3 shrink-0">
              <Button href="/level-test">Take Level Test</Button>
              <Button href="/batches" variant="outline">View Batches</Button>
            </div>
          </div>

          <h2 className="mt-12 text-lg font-bold text-indigo-950">More free resources</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/resources/${o.slug}`} className="rounded-md border border-charcoal-100 bg-surface px-4 py-2 text-sm font-semibold text-indigo-800 hover:border-indigo-800">{o.short}</Link>
            ))}
          </div>
        </div>
      </section>
      {quiz ? <PageQuiz {...quiz} /> : null}
    </>
  );
}
