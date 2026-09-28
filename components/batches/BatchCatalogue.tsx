"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Batch } from "@/lib/types";
import { BatchCard } from "@/components/ui/BatchCard";
import { EmptyState } from "@/components/ui/EmptyState";

const groups = {
  level: ["N5", "N4", "N3", "N2", "N1", "All Levels"],
  mode: ["Online", "Offline"],
  days: ["Weekday", "Weekend"],
  time: ["Morning", "Afternoon", "Evening"],
  goal: ["JLPT", "Speaking", "General Japanese"],
} as const;

type Key = keyof typeof groups;
const labels: Record<Key, string> = { level: "Level", mode: "Mode", days: "Days", time: "Time", goal: "Goal" };

export function BatchCatalogue({ batches, initialLevel }: { batches: Batch[]; initialLevel?: string }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"date" | "seats" | "duration">("date");
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState<Record<Key, string[]>>({
    level: initialLevel ? [initialLevel] : [],
    mode: [],
    days: [],
    time: [],
    goal: [],
  });

  const toggle = (k: Key, v: string) =>
    setSel((s) => ({ ...s, [k]: s[k].includes(v) ? s[k].filter((x) => x !== v) : [...s[k], v] }));
  const activeCount = Object.values(sel).flat().length;

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return batches
      .filter((b) => (Object.keys(sel) as Key[]).every((k) => !sel[k].length || sel[k].includes(b[k])))
      .filter((b) => !q || `${b.courseTitle} ${b.level} ${b.schedule} ${b.mode}`.toLowerCase().includes(q))
      .sort((a, b) =>
        sort === "date" ? a.startISO.localeCompare(b.startISO) : sort === "seats" ? a.seatsLeft - b.seatsLeft : a.durationHours - b.durationHours
      );
  }, [batches, query, sel, sort]);

  const filterPanel = (
    <div className="space-y-6">
      {(Object.keys(groups) as Key[]).map((k) => (
        <fieldset key={k}>
          <legend className="text-xs font-bold uppercase tracking-wider text-charcoal-500">{labels[k]}</legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {groups[k].map((v) => {
              const on = sel[k].includes(v);
              return (
                <button
                  key={v}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(k, v)}
                  className={`rounded-md border px-3 min-h-[40px] text-sm font-semibold transition-colors ${
                    on ? "border-indigo-900 bg-indigo-900 text-white" : "border-charcoal-100 bg-surface text-charcoal-700 hover:border-indigo-700/50"
                  }`}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
      {activeCount ? (
        <button type="button" onClick={() => setSel({ level: [], mode: [], days: [], time: [], goal: [] })} className="text-sm font-semibold text-sun-500 underline underline-offset-4">
          Clear all filters
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-8">
      <aside className="hidden lg:block lg:sticky lg:top-28 self-start rounded-lg border border-charcoal-100 bg-surface p-5">
        {filterPanel}
      </aside>

      <div>
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="relative flex-1">
            <span className="sr-only">Search batches</span>
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. N4, weekend, speaking"
              className="w-full min-h-[48px] rounded-md border border-charcoal-100 bg-surface pl-10 pr-3 text-[15px] focus:border-indigo-700 focus:outline-none"
            />
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="lg:hidden inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-charcoal-100 bg-surface px-4 min-h-[48px] font-semibold text-charcoal-800"
            >
              <SlidersHorizontal size={16} /> Filters{activeCount ? ` (${activeCount})` : ""}
            </button>
            <label className="flex-1 sm:flex-none">
              <span className="sr-only">Sort batches by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="w-full min-h-[48px] rounded-md border border-charcoal-100 bg-surface px-3 text-sm font-semibold"
              >
                <option value="date">Soonest</option>
                <option value="seats">Fewest seats</option>
                <option value="duration">Shortest</option>
              </select>
            </label>
          </div>
        </div>

        {open ? <div className="lg:hidden mt-4 rounded-lg border border-charcoal-100 bg-surface p-5">{filterPanel}</div> : null}

        <p className="mt-5 text-sm text-charcoal-500" aria-live="polite">
          Showing {list.length} of {batches.length} batches
        </p>

        <div className="mt-4 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {list.length ? list.map((b) => <BatchCard key={b.id} batch={b} />) : <EmptyState />}
        </div>
      </div>
    </div>
  );
}
