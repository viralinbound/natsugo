"use client";

import { useEffect, useRef, useState } from "react";
import { loadStrokes, STROKE_BOX } from "@/lib/strokes";

// Draws a kanji or kana stroke by stroke in its real stroke order. `speed` 1 is normal; lower is slower.
// Changing `speed` or `replay` restarts the animation. Falls back to the plain character if no data loads.
export function StrokeOrder({ ch, speed = 1, replay = 0, className = "", onStroke }: { ch: string; speed?: number; replay?: number; className?: string; onStroke?: (n: number, total: number) => void }) {
  const [data, setData] = useState<{ ch: string; strokes: string[] } | null>(null);
  const strokes = data?.ch === ch ? data.strokes : null;
  const svg = useRef<SVGSVGElement>(null);
  const report = useRef(onStroke);
  useEffect(() => {
    report.current = onStroke;
  });

  useEffect(() => {
    let live = true;
    loadStrokes(ch).then((s) => live && setData({ ch, strokes: s }));
    return () => {
      live = false;
    };
  }, [ch]);

  useEffect(() => {
    const paths = svg.current ? [...svg.current.querySelectorAll<SVGPathElement>("path.ink")] : [];
    if (!paths.length) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lens = paths.map((p) => p.getTotalLength());
    paths.forEach((p, i) => {
      p.style.strokeDasharray = `${lens[i]}`;
      p.style.strokeDashoffset = calm ? "0" : `${lens[i]}`;
    });
    if (calm) {
      report.current?.(paths.length, paths.length);
      return;
    }
    // Each stroke takes time in proportion to its length, with a short pause between strokes.
    const perUnit = 9 / speed;
    const pause = 260 / speed;
    let i = 0;
    let start = performance.now();
    let raf = 0;
    report.current?.(0, paths.length);
    const tick = (now: number) => {
      const dur = lens[i] * perUnit;
      const t = Math.min(1, (now - start) / dur);
      paths[i].style.strokeDashoffset = `${lens[i] * (1 - t)}`;
      if (t >= 1) {
        report.current?.(i + 1, paths.length);
        i++;
        if (i >= paths.length) return;
        start = now + pause;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame((now) => {
      start = now;
      tick(now);
    });
    return () => cancelAnimationFrame(raf);
  }, [strokes, speed, replay]);

  if (strokes && !strokes.length) {
    return (
      <svg viewBox={`0 0 ${STROKE_BOX} ${STROKE_BOX}`} className={className} role="img" aria-label={ch}>
        <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" fontSize="88" className="brush-kanji font-mincho" fill="currentColor">{ch}</text>
      </svg>
    );
  }

  return (
    <svg ref={svg} viewBox={`0 0 ${STROKE_BOX} ${STROKE_BOX}`} className={className} role="img" aria-label={`${ch} stroke order`}>
      {(strokes ?? []).map((d, i) => (
        <path key={`g${i}`} d={d} fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {(strokes ?? []).map((d, i) => (
        <path key={`i${i}`} className="ink" d={d} fill="none" stroke="currentColor" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}
