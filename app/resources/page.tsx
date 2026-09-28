import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { resourceTopics } from "@/lib/resourceTopics";
import { images } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Free Japanese Learning Resources — Hiragana, Kanji, Grammar",
  description: "Free Japanese resources: interactive hiragana and katakana charts with audio, N5 kanji, grammar patterns, vocabulary, phrases and JLPT practice.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero title="Start learning Japanese for free" eyebrow="Free Resources" intro="Interactive charts with audio, beginner kanji, grammar and practice questions — use them alongside your classes or on their own." image={images.books} crumbs={[{ label: "Resources", href: "/resources" }]} />
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourceTopics.map((t) => (
            <Link key={t.slug} href={`/resources/${t.slug}`} className="group overflow-hidden card-modern">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={`${t.image}?w=700&q=65&auto=format&fit=crop`} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute bottom-3 left-3 rounded bg-indigo-950/85 px-2.5 py-1 font-jp text-lg font-bold text-white">{t.jp}</span>
              </div>
              <div className="p-5">
                <h2 className="text-lg font-bold text-indigo-950 group-hover:underline underline-offset-4">{t.title}</h2>
                <p className="mt-1.5 text-sm text-charcoal-700">{t.desc}</p>
              </div>
            </Link>
          ))}
          <Link href="/blog" className="flex flex-col justify-center rounded-lg bg-indigo-950 p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-wider text-sun-300">Blog</p>
            <h2 className="mt-2 text-2xl font-bold">Guides on JLPT, grammar and careers →</h2>
          </Link>
        </div>
      </section>
    </>
  );
}
