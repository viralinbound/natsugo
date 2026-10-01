import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { freeTests, getFreeTest } from "@/lib/freeTests";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Quiz } from "@/components/quiz/Quiz";

type P = { params: Promise<{ test: string; part: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => freeTests.flatMap((t) => t.parts.map((p) => ({ test: t.id, part: p.id })));

const parse = async (params: P["params"]) => {
  const { test, part } = await params;
  const t = getFreeTest(test);
  const p = t?.parts.find((x) => x.id === part);
  return t && p ? { t, p } : null;
};

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const r = await parse(params);
  if (!r) return {};
  return {
    title: `${r.t.title}: ${r.p.label} (free)`,
    description: `${r.t.desc} ${r.p.questions.length} questions with an explanation for every answer.`,
    alternates: { canonical: `/free-test/${r.t.id}/${r.p.id}` },
  };
}

export default async function FreeTestPage({ params }: P) {
  const r = await parse(params);
  if (!r) notFound();
  const { t, p } = r;
  const next = t.parts[t.parts.indexOf(p) + 1];

  return (
    <section className="py-6 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumb items={[{ label: t.backLabel, href: t.backHref }, { label: `${t.title}: ${p.label}`, href: `/free-test/${t.id}/${p.id}` }]} />
        <div className="mt-4 flex flex-col gap-3">
          <h1 className="text-2xl font-semibold text-indigo-950 sm:text-3xl">
            {t.title} · <span className="font-jp">{t.jp}</span> <span className="text-xl text-charcoal-500">({p.label})</span>
          </h1>
          <p className="text-charcoal-700">{t.desc}</p>
          {t.parts.length > 1 ? (
            <nav aria-label="Part" className="flex flex-wrap gap-1.5">
              {t.parts.map((x) => (
                <Link
                  key={x.id}
                  href={`/free-test/${t.id}/${x.id}`}
                  aria-current={x.id === p.id ? "page" : undefined}
                  className={`inline-flex min-h-[36px] items-center rounded-md px-3 text-sm font-semibold ${x.id === p.id ? "bg-indigo-900 text-white" : "bg-bg-alt text-charcoal-700"}`}
                >
                  {x.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
        <div className="mt-5">
          <Quiz
            key={`${t.id}-${p.id}`}
            questions={p.questions}
            mode="practice"
            set={{ level: t.id, difficulty: p.id, next: next ? { href: `/free-test/${t.id}/${next.id}`, label: `Next: ${next.label}` } : undefined }}
          />
        </div>
      </div>
    </section>
  );
}
