// Turns a lesson's notes markdown into narrated slides: one per heading/paragraph,
// with any Japanese lines split out so they can be read with the Japanese voice.
export interface Slide {
  heading: string;
  lines: { text: string; lang: "en" | "ja" }[];
}

const isJa = (s: string) => /[぀-ヿ一-龯]/.test(s);

export function notesToSlides(title: string, notes: string): Slide[] {
  const slides: Slide[] = [{ heading: title, lines: [{ text: title, lang: isJa(title) ? "ja" : "en" }] }];
  let current: Slide | null = null;

  for (const raw of notes.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("## ") || line.startsWith("### ")) {
      current = { heading: line.replace(/^#{2,3}\s*/, ""), lines: [] };
      slides.push(current);
      continue;
    }
    if (!current) {
      current = { heading: "Overview", lines: [] };
      slides.push(current);
    }
    const clean = line.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "").replace(/\*\*/g, "");
    if (!clean) continue;
    // A line that's mostly Japanese and one that's mostly English (e.g. a translation) are split
    // so each can be spoken in the right voice.
    const parts = clean.split(/\s+—\s+|\s+\(([^)]+)\)$/).filter(Boolean);
    for (const p of parts) current.lines.push({ text: p.trim(), lang: isJa(p) ? "ja" : "en" });
  }
  return slides.filter((s) => s.lines.length);
}
