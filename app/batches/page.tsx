import type { Metadata } from "next";
import { getBatches } from "@/lib/repo";
import { images } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { BatchCatalogue } from "@/components/batches/BatchCatalogue";

export const metadata: Metadata = {
  title: "Upcoming Japanese Batches — Online & Bengaluru",
  description: "Browse upcoming Japanese and JLPT N5–N1 batches. Filter by level, weekday or weekend, morning or evening, online or Bengaluru classroom.",
  alternates: { canonical: "/batches" },
};

export default async function BatchesPage({ searchParams }: { searchParams: Promise<{ level?: string }> }) {
  const { level } = await searchParams;
  const batches = await getBatches();
  return (
    <>
      <PageHero
        title="Find a batch that fits your schedule"
        eyebrow="Upcoming Batches"
        intro="New batches start every month. Filter by level, timing and format — every batch lists its schedule, duration and seats up front."
        image={images.classroom}
        crumbs={[{ label: "Batches", href: "/batches" }]}
      />
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BatchCatalogue batches={batches} initialLevel={level?.toUpperCase()} />
        </div>
      </section>
    </>
  );
}
