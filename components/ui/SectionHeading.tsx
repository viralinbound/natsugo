import type { ReactNode } from "react";
import { jpFor } from "@/lib/jpLabels";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  const jp = jpFor(eyebrow);
  const centered = align === "center";
  return (
    <div className={`relative isolate max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <span aria-hidden className={`section-blob pointer-events-none absolute -top-24 ${centered ? "left-1/2 -translate-x-1/2" : "-left-24"}`} />
      {jp ? (
        <span
          aria-hidden
          className={`jp-watermark pointer-events-none select-none absolute -top-10 ${centered ? "left-1/2 -translate-x-1/2" : "-left-2"}`}
        >
          {jp}
        </span>
      ) : null}
      {eyebrow ? (
        <p className={`relative mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-sun-500 ${centered ? "justify-center" : ""}`}>
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-hanko" />
          {eyebrow}
          {jp ? <span className="font-jp normal-case tracking-normal text-hanko">· {jp}</span> : null}
        </p>
      ) : null}
      <h2 className="relative text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-950 tracking-tight text-balance">
        {title}
      </h2>
      <span
        aria-hidden
        className={`relative mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-sun-400 to-hanko ${centered ? "mx-auto" : ""}`}
      />
      {description ? (
        <p className="relative mt-4 text-base sm:text-lg text-charcoal-500 text-balance">{description}</p>
      ) : null}
    </div>
  );
}
