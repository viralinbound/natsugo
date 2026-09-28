"use client";

export interface FilterConfig {
  key: string;
  label: string;
  options: string[];
}

export function FilterBar({
  filters,
  active,
  onChange,
}: {
  filters: FilterConfig[];
  active: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4">
      {filters.map((filter) => (
        <div key={filter.key} className="flex flex-col gap-1.5">
          <label
            htmlFor={`filter-${filter.key}`}
            className="text-xs font-semibold uppercase tracking-wide text-charcoal-500"
          >
            {filter.label}
          </label>
          <select
            id={`filter-${filter.key}`}
            value={active[filter.key]}
            onChange={(e) => onChange(filter.key, e.target.value)}
            className="min-h-[44px] rounded-xl border border-charcoal-100 bg-surface px-3 text-sm font-medium text-charcoal-800 focus:border-indigo-600"
          >
            {filter.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
