"use client";

// Stroke-order data for kanji and kana from KanjiVG (CC BY-SA 3.0, https://kanjivg.tagaini.net),
// fetched on demand and cached for the session. Each stroke is an SVG path in a 109 × 109 box.

export const STROKE_BOX = 109;
const cache = new Map<string, Promise<string[]>>();

const file = (ch: string) => `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${ch.codePointAt(0)!.toString(16).padStart(5, "0")}.svg`;

export function loadStrokes(ch: string): Promise<string[]> {
  if (!cache.has(ch)) {
    cache.set(
      ch,
      fetch(file(ch))
        .then((r) => (r.ok ? r.text() : ""))
        .then((svg) => [...svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]))
        .catch(() => []),
    );
  }
  return cache.get(ch)!;
}
