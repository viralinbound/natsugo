import Link from "next/link";
import { jlptLevels } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function JLPTRoadmap() {
  return (
    <section className="bg-bg py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading eyebrow="JLPT" title="Your JLPT Journey" />
          <Button href="/jlpt-japanese-preparation-course" variant="outline" size="sm">
            Explore JLPT Courses
          </Button>
        </div>

        <div aria-hidden className="relative mt-8 hidden h-14 lg:block">
          <div className="absolute inset-x-[10%] top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-charcoal-100">
            <div className="gradient-strip h-full w-full" />
          </div>
          <div className="absolute inset-0 grid grid-cols-5">
            {["N5", "N4", "N3", "N2", "N1"].map((l) => (
              <div key={l} className="flex items-center justify-center">
                <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border-2 border-sun-400 bg-surface text-xs font-extrabold text-sun-500 shadow-md">{l}</span>
              </div>
            ))}
          </div>
          <span className="road-walker absolute top-1/2 z-20 h-4 w-4 rounded-full bg-hanko shadow-[0_0_0_4px_rgba(224,52,75,0.25)]" />
        </div>
        <div className="swipe-row mt-8 lg:mt-3 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {jlptLevels.map((item) => (
            <div
              key={item.level}
              className="card-modern p-5 flex flex-col"
            >
              <span className="inline-flex w-fit rounded-full bg-sun-100 text-sun-500 text-xs font-bold px-3 py-1">
                JLPT {item.level}
              </span>
              <p className="mt-3 text-sm font-semibold text-indigo-950">
                {item.focus}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-charcoal-500 flex-1">
                {item.areas.map((area) => (
                  <li key={area} className="flex gap-2">
                    <span className="text-indigo-700">•</span>
                    {area}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href={`/jlpt-${item.level.toLowerCase()}`}
                  className="inline-block py-1.5 text-sm font-semibold text-indigo-800 hover:underline"
                >
                  View Course →
                </Link>
                <Link
                  href={`/jlpt-quiz/${item.level.toLowerCase()}/easy`}
                  className="inline-block py-1.5 text-sm font-semibold text-charcoal-500 hover:underline"
                >
                  Free {item.level} Quiz →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
