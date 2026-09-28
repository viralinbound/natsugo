import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data";
import { articleBodies } from "@/lib/blog";
import { site } from "@/lib/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/components/ui/JsonLd";
import { Button } from "@/components/ui/Button";

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
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-indigo-950 tracking-tight text-balance">{post.title}</h1>
        <p className="mt-4 text-lg text-charcoal-700">{post.excerpt}</p>
      </header>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 mt-8">
        <div className="relative aspect-[16/8] overflow-hidden rounded-lg">
          <Image src={`${body.image}?w=1400&q=70&auto=format&fit=crop`} alt="" fill priority sizes="(min-width:896px) 896px, 100vw" className="object-cover" />
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 prose-article">
        {body.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.paragraphs.map((p) => <p key={p} className="font-jp">{p}</p>)}
            {s.list ? <ul>{s.list.map((l) => <li key={l} className="font-jp">{l}</li>)}</ul> : null}
          </section>
        ))}

        <div className="not-prose mt-10 rounded-lg bg-indigo-950 p-6 sm:p-8 text-white">
          <h2 className="!text-white !mt-0 text-xl font-bold">Not sure where to start?</h2>
          <p className="!text-white/80 mt-1">Take the free level test and get a recommended course in 5 minutes.</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Button href="/level-test">Take Free Level Test</Button>
            <Button href="/batches" variant="outline-light">View Batches</Button>
          </div>
        </div>
      </div>

      <aside className="bg-bg-alt py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-xl font-bold text-indigo-950">Keep reading</h2>
          <div className="mt-5 grid sm:grid-cols-3 gap-4">
            {more.map((m) => (
              <Link key={m.slug} href={`/blog/${m.slug}`} className="rounded-lg border border-charcoal-100 bg-surface p-5 hover:border-indigo-800">
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
    </article>
  );
}
