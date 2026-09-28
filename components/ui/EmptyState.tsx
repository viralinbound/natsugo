import type { ReactNode } from "react";
import { SearchX } from "lucide-react";

export function EmptyState({
  title = "No results found",
  description = "Try adjusting your filters to see more batches.",
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center py-16 px-4 rounded-lg border border-dashed border-charcoal-100">
      <div className="h-12 w-12 rounded-full bg-bg-alt flex items-center justify-center text-charcoal-500">
        <SearchX size={22} />
      </div>
      <h3 className="mt-4 font-bold text-indigo-950">{title}</h3>
      <p className="mt-1.5 text-sm text-charcoal-500 max-w-sm">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
