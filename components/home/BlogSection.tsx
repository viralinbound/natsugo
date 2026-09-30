import { blogPosts } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function BlogSection() {
  return (
    <section className="bg-bg-alt py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading eyebrow="Blog" title="Learn About Japanese, JLPT & Careers" />
          <Button href="/blog" variant="outline" size="sm">
            View All Articles
          </Button>
        </div>
        <div className="swipe-row mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogPosts.slice(0, 6).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="card-modern p-6 hover:shadow-lg hover:shadow-indigo-950/5 transition-shadow flex flex-col"
            >
              <Badge tone="indigo">{post.category}</Badge>
              <h3 className="mt-4 font-bold text-indigo-950 text-balance">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-charcoal-500 flex-1">
                {post.excerpt}
              </p>
              <span className="mt-4 text-sm font-semibold text-indigo-700">
                Read Article →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
