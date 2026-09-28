import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resourceTopics } from "@/lib/resourceTopics";
import { grammarPoints, hiragana, kanjiN5, katakana, phrases, vocabulary } from "@/lib/learning";
import { PageHero } from "@/components/ui/PageHero";
import { KanaChart } from "@/components/resources/KanaChart";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { QuizHub } from "@/components/quiz/QuizHub";
import { Flashcards, type Card } from "@/components/resources/Flashcards";
import { words } from "@/lib/words";
import { Button } from "@/components/ui/Button";

export const dynamicParams = false;
export const generateStaticParams = () => resourceTopics.map((t) => ({ topic: t.slug }));

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const t = resourceTopics.find((x) => x.slug === topic);
  if (!t) return {};
  return { title: `${t.title} — Free Japanese Resource`, description: t.desc, alternates: { canonical: `/resources/${t.slug}` } };
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {kanjiN5.map((k) => (
            <div key={k.k} className="card-modern p-4 text-center">
              <p className="font-jp text-5xl text-indigo-950">{k.k}</p>
              <p className="mt-2 font-semibold text-charcoal-800">{k.m}</p>
              <div className="mt-1 flex items-center justify-center gap-1">
                <p className="font-jp text-sm text-charcoal-500">{k.r}</p>
                <SpeakButton text={k.r.split("・")[0]} />
              </div>
            </div>
          ))}
        </div>
      );
    case "grammar":
      return (
        <div className="space-y-4">
          {grammarPoints.map((g) => (
            <div key={g.pattern} className="card-modern p-5 sm:flex sm:items-center sm:gap-6">
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
        <div className="grid md:grid-cols-2 gap-6">
          {vocabulary.map((v) => (
            <div key={v.topic} className="card-modern overflow-hidden">
              <h2 className="bg-indigo-950 px-5 py-3 font-bold text-white">{v.topic}</h2>
              <ul className="divide-y divide-charcoal-100">
                {v.words.map((w) => (
                  <li key={w.jp} className="flex items-center justify-between gap-3 px-5 py-2.5">
                    <span className="font-jp text-lg text-indigo-950">{w.jp}</span>
                    <span className="flex items-center gap-1 text-sm text-charcoal-700">{w.en}<SpeakButton text={w.jp} /></span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "phrases":
      return (
        <>
        <ul className="sm:hidden space-y-3">
          {phrases.map((p) => (
            <li key={p.jp} className="flex items-start justify-between gap-3 card-modern p-4">
              <div className="min-w-0">
                <p className="font-jp text-lg text-indigo-950 break-words">{p.jp}</p>
                <p className="text-sm text-charcoal-500">{p.romaji}</p>
                <p className="mt-1 text-sm text-charcoal-800">{p.en}</p>
              </div>
              <SpeakButton text={p.jp} />
            </li>
          ))}
        </ul>
        <div className="hidden sm:block overflow-x-auto card-modern">
          <table className="w-full text-left">
            <thead className="bg-bg-alt text-xs uppercase tracking-wider text-charcoal-500">
              <tr><th className="px-5 py-3">Japanese</th><th className="px-5 py-3">Romaji</th><th className="px-5 py-3">Meaning</th><th className="px-5 py-3"><span className="sr-only">Listen</span></th></tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100">
              {phrases.map((p) => (
                <tr key={p.jp}>
                  <td className="px-5 py-3 font-jp text-lg text-indigo-950">{p.jp}</td>
                  <td className="px-5 py-3 text-sm text-charcoal-500">{p.romaji}</td>
                  <td className="px-5 py-3 text-sm text-charcoal-800">{p.en}</td>
                  <td className="px-3 py-3"><SpeakButton text={p.jp} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      );
    case "flashcards":
      return <Flashcards cards={flashcards} />;
    case "jlpt-practice":
      return <QuizHub />;
    default:
      return null;
  }
}

export default async function ResourceTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const t = resourceTopics.find((x) => x.slug === topic);
  if (!t) notFound();
  const others = resourceTopics.filter((x) => x.slug !== t.slug);

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
    </>
  );
}
