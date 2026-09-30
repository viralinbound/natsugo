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
  let h = 7;
  for (const c of `${eyebrow}${typeof title === "string" ? title : ""}`) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const r = (n: number, span: number) => ((h >> (n * 3)) % (span * 2 + 1)) - span;
  const drift = {
    "--wd": `${7 + (h % 6)}s`,
    "--wdl": `-${h % 7}s`,
    "--wx1": `${r(1, 70)}px`, "--wy1": `${r(2, 30)}px`, "--wr1": `${r(3, 8)}deg`,
    "--wx2": `${r(4, 70)}px`, "--wy2": `${r(5, 30)}px`, "--wr2": `${r(6, 8)}deg`,
    "--wx3": `${r(7, 60)}px`, "--wy3": `${r(8, 25)}px`,
  } as React.CSSProperties;
  return (
    <div className={`relative isolate max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <span aria-hidden className={`section-blob pointer-events-none absolute -top-24 ${centered ? "left-1/2 -translate-x-1/2" : "-left-24"}`} />
      {jp ? (
        <span
          aria-hidden
          style={drift}
          className={`jp-watermark pointer-events-none select-none absolute -top-8 ${centered ? "left-1/2 -translate-x-1/2" : "-left-2"}`}
        >
          {jp}
        </span>
      ) : null}
      {eyebrow ? (
        <p className={`relative mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-sun-500 ${centered ? "justify-center" : ""}`}>
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-hanko" />
          {eyebrow}
          {jp ? <span className="font-mincho font-bold normal-case tracking-normal text-hanko">· {jp}</span> : null}
        </p>
      ) : null}
      <h2 className="relative text-2xl sm:text-3xl lg:text-5xl font-semibold text-indigo-950 tracking-tight text-balance">
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
