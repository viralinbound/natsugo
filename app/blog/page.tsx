import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { articleBodies } from "@/lib/blog";
import { images } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Japanese Learning Blog — JLPT, Grammar, Careers",
  description: "Practical guides on learning Japanese from scratch, JLPT preparation, grammar, vocabulary and Japanese language careers in India.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;
  const fb = articleBodies[featured.slug];
  return (
    <>
      <PageHero title="The Natsugo blog" eyebrow="Blog" intro="Straightforward guides for Indian learners — no hype, just what helps." image={images.kyoto} crumbs={[{ label: "Blog", href: "/blog" }]} />
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href={`/blog/${featured.slug}`} className="group grid md:grid-cols-2 overflow-hidden card-modern">
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
              <Image src={`${fb.image}?w=1000&q=70&auto=format&fit=crop`} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" priority />
            </div>
            <div className="p-6 sm:p-10 flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-wider text-sun-500">{featured.category} · {fb.readMinutes} min read</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-indigo-950 group-hover:underline underline-offset-4">{featured.title}</h2>
              <p className="mt-3 text-charcoal-700">{featured.excerpt}</p>
              <span className="mt-5 font-bold text-indigo-800">Read article →</span>
            </div>
          </Link>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p) => {
              const b = articleBodies[p.slug];
              return (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group overflow-hidden card-modern flex flex-col">
                  <div className="relative aspect-[16/9]">
                    <Image src={`${b.image}?w=600&q=65&auto=format&fit=crop`} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <div className="p-5 flex flex-1 flex-col">
                    <p className="text-xs font-bold uppercase tracking-wider text-sun-500">{p.category} · {b.readMinutes} min</p>
                    <h2 className="mt-2 text-lg font-bold text-indigo-950 group-hover:underline underline-offset-4">{p.title}</h2>
                    <p className="mt-2 text-sm text-charcoal-700 flex-1">{p.excerpt}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
