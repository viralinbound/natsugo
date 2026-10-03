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

// Kana to Hepburn romaji, so a learner can see how a word is said. Handles small ゃゅょ, small っ, the long-vowel
// mark ー (shown with a macron: コーヒー is kōhī) and the extended katakana used for loanwords (ウォ, ファ, ティ).
const BASE: Record<string, string> = {
  あ: "a", い: "i", う: "u", え: "e", お: "o", か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko", が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go",
  さ: "sa", し: "shi", す: "su", せ: "se", そ: "so", ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo", た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
  だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do", な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no", は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
  ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo", ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po", ま: "ma", み: "mi", む: "mu", め: "me", も: "mo",
  や: "ya", ゆ: "yu", よ: "yo", ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro", わ: "wa", ゐ: "i", ゑ: "e", を: "o", ん: "n", ゔ: "vu",
};
const SMALL_Y: Record<string, string> = { ゃ: "a", ゅ: "u", ょ: "o" };
const SMALL_V: Record<string, string> = { ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o" };
const MACRON: Record<string, string> = { a: "ā", i: "ī", u: "ū", e: "ē", o: "ō" };

export function toRomaji(input: string): string {
  const s = [...toHiragana(input)];
  let out = "";
  let doubled = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const next = s[i + 1];
    if (c === "っ") {
      doubled = true;
      continue;
    }
    if (c === "ー") {
      const last = out.slice(-1);
      if (MACRON[last]) out = out.slice(0, -1) + MACRON[last];
      continue;
    }
    let r = BASE[c];
    if (r === undefined) {
      out += c;
      doubled = false;
      continue;
    }
    if (next && SMALL_Y[next] && r.endsWith("i")) {
      const stem = r.slice(0, -1);
      r = (/(sh|ch|j)$/.test(stem) ? stem : `${stem}y`) + SMALL_Y[next];
      i++;
    } else if (next && SMALL_V[next]) {
      r = (c === "う" ? "w" : r.slice(0, -1)) + SMALL_V[next];
      i++;
    }
    if (c === "ん") {
      const n = BASE[s[i + 1]] ?? "";
      r = /^[aiueoy]/.test(n) ? "n'" : "n";
    }
    if (doubled) r = (r.startsWith("ch") ? "t" : r[0]) + r;
    doubled = false;
    out += r;
  }
  return out;
}
