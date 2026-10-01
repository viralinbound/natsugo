import Link from "next/link";
import { blogPosts, resources } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight } from "lucide-react";

export function FreeResources() {
  return (
    <section className="bg-bg py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free Resources"
          title="Start Learning Japanese for Free"
          description="Charts, kanji, quizzes and guides, free for everyone."
        />
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {resources.map((r) => (
            <Link
              key={r.id}
              href={r.href}
              className="group card-modern p-5 hover:border-indigo-800/30 hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-indigo-950">{r.title}</h3>
              <p className="mt-1.5 text-sm text-charcoal-500">{r.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-indigo-700 group-hover:gap-2 transition-all">
                Start <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-12 rounded-3xl border border-charcoal-100 bg-surface p-5 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-bold text-indigo-950">Latest from the blog</h3>
            <Link href="/blog" className="text-sm font-semibold text-sun-500 hover:underline">
              All articles →
            </Link>
          </div>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((p) => (
              <li key={p.id}>
                <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col rounded-2xl bg-bg-alt p-4 transition-colors hover:bg-sun-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-sun-500">{p.category}</span>
                  <span className="mt-1.5 font-semibold text-indigo-950 group-hover:underline">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
