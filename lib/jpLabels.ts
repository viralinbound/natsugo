// Japanese companion word for common section eyebrows — shown as a small label and a large decorative kanji.
const labels: Record<string, string> = {
  admissions: "入学",
  "free demo": "体験",
  blog: "ブログ",
  "upcoming batches": "開講",
  "know your level": "実力",
  "about us": "私たち",
  teachers: "先生",
  "our teachers": "先生",
  "success stories": "体験談",
  "free resources": "教材",
  "kanji by level": "漢字",
  "ai-powered practice": "練習",
  faq: "質問",
  jlpt: "試験",
  "learn by goal": "目標",
  "for professionals": "仕事",
  "for beginners": "初級",
  courses: "講座",
};

export function jpFor(eyebrow?: string): string | undefined {
  if (!eyebrow || /[぀-ヿ一-龯]/.test(eyebrow)) return undefined;
  return labels[eyebrow.trim().toLowerCase()];
}
