"use client";

import { useMemo, useState } from "react";
import type { Batch } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FilterBar, type FilterConfig } from "@/components/ui/FilterBar";
import { BatchCard } from "@/components/ui/BatchCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

const filters: FilterConfig[] = [
  { key: "level", label: "Level", options: ["All", "N5", "N4", "N3", "N2", "N1"] },
  { key: "days", label: "Days", options: ["All", "Weekday", "Weekend"] },
  {
    key: "time",
    label: "Time",
    options: ["All", "Morning", "Afternoon", "Evening"],
  },
  {
    key: "goal",
    label: "Goal",
    options: ["All", "JLPT", "Speaking", "General Japanese"],
  },
];

export function BatchesSection({ batches }: { batches: Batch[] }) {
  const [active, setActive] = useState<Record<string, string>>({
    level: "All",
    mode: "All",
    days: "All",
    time: "All",
    goal: "All",
  });

  const filtered = useMemo(() => {
    return batches.filter((b) => {
      if (active.level !== "All" && b.level !== active.level) return false;
      if (active.mode !== "All" && b.mode !== active.mode) return false;
      if (active.days !== "All" && b.days !== active.days) return false;
      if (active.time !== "All" && b.time !== active.time) return false;
      if (active.goal !== "All" && b.goal !== active.goal) return false;
      return true;
    });
  }, [active, batches]);

  return (
    <section className="bg-bg-alt py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeading
            eyebrow="Upcoming Batches"
            title="Find a Batch That Fits Your Schedule"
          />
          <Button href="/batches" variant="outline" size="sm">
            View All Batches
          </Button>
        </div>

        <div className="mt-8 rounded-lg bg-surface border border-charcoal-100 p-4 sm:p-5">
          <FilterBar
            filters={filters}
            active={active}
            onChange={(key, value) =>
              setActive((prev) => ({ ...prev, [key]: value }))
            }
          />
        </div>

        <div className="swipe-row mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.length ? (
            filtered.slice(0, 4).map((batch) => <BatchCard key={batch.id} batch={batch} />)
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </section>
  );
}
