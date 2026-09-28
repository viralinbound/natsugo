import Link from "next/link";
import { resources } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight } from "lucide-react";

export function FreeResources() {
  return (
    <section className="bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free Resources"
          title="Start Learning Japanese for Free"
        />
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {resources.map((r) => (
            <Link
              key={r.id}
              href={r.href}
              className="group rounded-lg border border-charcoal-100 bg-surface p-5 hover:border-indigo-800/30 hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-indigo-950">{r.title}</h3>
              <p className="mt-1.5 text-sm text-charcoal-500">{r.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-indigo-700 group-hover:gap-2 transition-all">
                Start <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
