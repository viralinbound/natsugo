// Small helpers for moving between hiragana, katakana and kanji text. Safe to use on server and client.

const shift = (s: string, from: [number, number], by: number) =>
  [...s].map((c) => {
    const n = c.codePointAt(0)!;
    return n >= from[0] && n <= from[1] ? String.fromCodePoint(n + by) : c;
  }).join("");

// ひらがな → カタカナ (ぁ-ゖ are 0x60 below ァ-ヶ). The long-vowel mark and punctuation are shared.
export const toKatakanaChars = (s: string) => shift(s, [0x3041, 0x3096], 0x60);
export const toHiragana = (s: string) => shift(s, [0x30a1, 0x30f6], -0x60);

export const hasKanji = (s: string) => /[一-鿿々]/.test(s);
export const isAllKatakana = (s: string) => /^[゠-ヿー・]+$/.test(s);
export const hasJapanese = (s: string) => /[぀-ヿ一-鿿]/.test(s);
