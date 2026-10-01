import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data";
import { articleBodies } from "@/lib/blog";
import { site } from "@/lib/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowRight, BookOpen, CheckCircle2, Sparkles } from "lucide-react";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

export const dynamicParams = false;
export const generateStaticParams = () => blogPosts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = blogPosts.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.excerpt, images: [`${articleBodies[p.slug].image}?w=1200&h=630&fit=crop`] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((x) => x.slug === slug);
  if (!post) notFound();
  const body = articleBodies[post.slug];
  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article>
      <header className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-14">
        <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title, href: `/blog/${post.slug}` }]} />
        <p className="mt-6 text-xs font-bold uppercase tracking-wider text-sun-500">{post.category} · {body.readMinutes} min read</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight text-balance">{post.title}</h1>
        <p className="mt-4 text-lg text-charcoal-700">{post.excerpt}</p>
      </header>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 mt-8">
        <div className="relative aspect-[16/8] overflow-hidden rounded-lg">
          <Image src={`${body.image}?w=1400&q=70&auto=format&fit=crop`} alt="" fill priority sizes="(min-width:896px) 896px, 100vw" className="object-cover" />
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-10">
        <div className="rounded-2xl border border-indigo-700/15 bg-sun-100 p-5 sm:p-6">
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-indigo-800"><Sparkles size={16} /> Key takeaways</p>
          <ul className="mt-3 space-y-2">
            {body.takeaways.map((t) => (
              <li key={t} className="flex gap-2.5 text-charcoal-800">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-success" aria-hidden />
                <span className="font-jp">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="In this article" className="mt-6 text-sm">
          <p className="font-bold text-indigo-950">In this article</p>
          <ol className="mt-2 grid gap-1 sm:grid-cols-2">
            {body.sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#s${i + 1}`} className="text-charcoal-700 hover:text-indigo-700">{i + 1}. {s.heading}</a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 prose-article">
        {body.sections.map((s, i) => (
          <section key={s.heading} id={`s${i + 1}`} className="scroll-mt-24">
            <h2>{s.heading}</h2>
            {s.paragraphs.map((p) => <p key={p} className="font-jp">{p}</p>)}
            {s.list ? <ul>{s.list.map((l) => <li key={l} className="font-jp">{l}</li>)}</ul> : null}
          </section>
        ))}
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-indigo-950">Frequently asked questions</h2>
        <div className="mt-5"><FAQAccordion items={body.faqs.map((f) => ({ question: f.q, answer: f.a }))} /></div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        <div className="relative isolate overflow-hidden rounded-3xl bg-[#0b1b3a] p-6 text-white sm:p-10">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(55%_90%_at_100%_0%,rgb(12_136_255/0.45),transparent_70%),radial-gradient(40%_70%_at_0%_100%,rgb(34_211_238/0.22),transparent_70%)]" />
          <span aria-hidden className="pointer-events-none absolute -bottom-6 right-4 -z-10 font-jp text-[7rem] font-bold leading-none text-white/[0.06] sm:text-[9rem]">練習</span>
          <p className="font-jp text-sm font-bold text-[#7cc4ff]">次の一歩 · Your next step</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Put this article into practice</h2>
          <p className="mt-2 max-w-xl text-white/75">{body.next.line}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link href={body.next.test.href} className="group flex min-h-[64px] items-center justify-between gap-3 rounded-xl bg-[#0c88ff] hover:bg-[#0a6fd1] px-5 font-bold text-white">
              <span className="flex items-center gap-2"><Sparkles size={18} /> {body.next.test.label}</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href={body.next.course.href} className="group flex min-h-[64px] items-center justify-between gap-3 rounded-xl border-2 border-white/25 px-5 font-bold text-white transition-colors hover:border-white">
              <span className="flex items-center gap-2"><BookOpen size={18} /> {body.next.course.label}</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="mt-5 text-sm text-white/60">
            Prefer to talk first? <Link href="/free-japanese-demo-class" className="font-semibold text-white underline underline-offset-4">Book a free demo class</Link>.
          </p>
        </div>
      </div>

      <aside className="bg-bg-alt py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-xl font-bold text-indigo-950">Keep reading</h2>
          <div className="mt-5 grid sm:grid-cols-3 gap-4">
            {more.map((m) => (
              <Link key={m.slug} href={`/blog/${m.slug}`} className="card-modern p-5 hover:border-indigo-800">
                <p className="text-xs font-bold uppercase tracking-wider text-sun-500">{m.category}</p>
                <p className="mt-1 font-bold text-indigo-950">{m.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: `${body.image}?w=1200&h=630&fit=crop`,
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: body.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </article>
  );
}
