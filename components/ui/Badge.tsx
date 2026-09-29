import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "indigo",
}: {
  children: ReactNode;
  tone?: "indigo" | "red" | "sakura" | "neutral";
}) {
  const tones: Record<string, string> = {
    indigo: "bg-gradient-to-r from-indigo-700/10 to-sun-400/15 text-indigo-800",
    red: "bg-red-600/10 text-red-600",
    sakura: "bg-sakura-100 text-charcoal-700",
    neutral: "bg-charcoal-100 text-charcoal-700",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
