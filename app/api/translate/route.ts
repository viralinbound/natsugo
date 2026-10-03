import { NextRequest, NextResponse } from "next/server";
import { clientIp, overLimit, tooMany } from "@/lib/guard";
import { hasJapanese, hasKanji, isAllKatakana, toHiragana, toKatakanaChars } from "@/lib/kanaConvert";
import { toKatakana } from "@/lib/katakana";

// English word (or Japanese text) to hiragana, kanji and katakana, using Jisho's public dictionary
// (the same source as the kanji lookup). Names are not in a dictionary; for those the page falls back to
// a sound-based katakana spelling. Results are cached for a day.

interface Entry {
  japanese: { word?: string; reading?: string }[];
  senses: { english_definitions: string[] }[];
  is_common?: boolean;
}

export interface Match {
  kanji: string | null;
  hiragana: string;
  katakana: string;
  loan: boolean;
  meaning: string;
}

// "water (esp. cool or cold)" -> "water", "to learn" -> "learn"
const core = (d: string) => {
  let t = d.toLowerCase();
  // Brackets can be nested: "dog (Canis (lupus) familiaris)".
  for (let i = 0; i < 4 && /\(/.test(t); i++) t = t.replace(/\([^()]*\)/g, "");
  return t.replace(/^to /, "").replace(/\s+/g, " ").trim();
};

async function jisho(keyword: string, page: number): Promise<Entry[]> {
  try {
    const res = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(keyword)}&page=${page}`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; NatsugoBot/1.0)" },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return [];
    return ((await res.json())?.data as Entry[]) ?? [];
  } catch {
    return [];
  }
}

// Beginner words where the dictionary's first pick is a formal or literary variant: use the everyday word.
const PREFER: Record<string, string> = {
  friend: "友達", teacher: "先生", student: "学生", school: "学校", book: "本", car: "車", name: "名前", child: "子供",
  mother: "母", father: "父", family: "家族", country: "国", train: "電車", station: "駅", money: "お金", time: "時間",
  "thank you": "有難う", "good morning": "お早う", hello: "今日は", goodbye: "さようなら", food: "食べ物", person: "人",
  water: "水", fire: "火", tree: "木", mountain: "山", river: "川", house: "家", dog: "犬", cat: "猫",
};

const exact = (e: Entry, q: string) => e.senses.some((s) => s.english_definitions.some((d) => core(d) === q));
const firstExact = (e: Entry, q: string) => e.senses[0]?.english_definitions.some((d) => core(d) === q) ?? false;
const surface = (e: Entry) => e.japanese[0]?.word ?? e.japanese[0]?.reading ?? "";

export async function GET(req: NextRequest) {
  if (overLimit(`translate:${clientIp(req)}`, 60, 60_000)) return tooMany(60);
  const raw = (req.nextUrl.searchParams.get("q") ?? "").trim().replace(/\s+/g, " ");
  if (!raw || raw.length > 40 || !/^[\p{L}\p{M}\s'’.\-・ー]+$/u.test(raw)) {
    return NextResponse.json({ error: "Type a word or a name (up to 40 letters)." }, { status: 400 });
  }
  const q = raw.toLowerCase();
  const japaneseInput = hasJapanese(raw);

  // Three pages in parallel: the plain loanword (ウォーター) is often lower down than kanji compounds (水分).
  const pages = japaneseInput ? [await jisho(raw, 1)] : await Promise.all([jisho(q, 1), jisho(q, 2), jisho(q, 3)]);
  const entries = pages.flat().filter((e) => e.japanese[0] && (e.japanese[0].reading || e.japanese[0].word));

  // The plain loanword (ウォーター, タクシー): prefer one whose first meaning is the word, then a common one.
  const loans = japaneseInput ? [] : entries.filter((e) => isAllKatakana(surface(e)) && exact(e, q));
  const loanEntry = [...loans].sort((a, b) => Number(firstExact(b, q)) * 2 + Number(!!b.is_common) - (Number(firstExact(a, q)) * 2 + Number(!!a.is_common)))[0];
  // Everyday dictionary words only: skip slang forms that mix kanji and katakana (円タク).
  const native = japaneseInput
    ? entries.slice(0, 6)
    : entries.filter((e) => {
        const w = e.japanese[0].word ?? "";
        const r = e.japanese[0].reading ?? "";
        // Real words only: no mixed kanji-katakana slang (円タク) or Latin-letter titles (TAXi). A katakana
        // reading is fine, since 珈琲 is read コーヒー.
        return exact(e, q) && !isAllKatakana(surface(e)) && !/[゠-ヿA-Za-z]/.test(w) && !/[A-Za-z]/.test(r);
      });
  const pool = !japaneseInput && native.some((e) => e.is_common) ? native.filter((e) => e.is_common) : native;

  const scored = pool
    .map((e, i) => {
      const w = e.japanese[0].word ?? "";
      const score = (firstExact(e, q) ? 60 : 0) + (e.is_common ? 25 : 0) + (hasKanji(w) ? 10 : 0) - w.length * 2 - i * 0.1 + (PREFER[q] === w ? 100 : 0);
      return { e, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((x) => x.e);

  const toMatch = (e: Entry, primary: boolean): Match => {
    const j = e.japanese[0];
    const word = j.word ?? "";
    const meaning = e.senses[0]?.english_definitions.slice(0, 3).join(", ") ?? "";
    // Names such as 田中 come without a reading, so read them from the romaji the learner typed.
    if (!j.reading && hasKanji(word)) {
      const kata = toKatakana(raw);
      return { kanji: word, hiragana: toHiragana(kata), katakana: kata, loan: false, meaning };
    }
    const reading = j.reading ?? word;
    const readingIsKatakana = isAllKatakana(reading);
    const loanWord = primary && loanEntry ? surface(loanEntry) : null;
    return {
      kanji: hasKanji(word) ? word : null,
      hiragana: toHiragana(reading),
      katakana: readingIsKatakana ? reading : loanWord ?? toKatakanaChars(reading),
      loan: readingIsKatakana || Boolean(loanWord),
      meaning,
    };
  };

  const seen = new Set<string>();
  const matches: Match[] = [];
  for (const e of scored) {
    const m = toMatch(e, matches.length === 0);
    const key = `${m.kanji ?? ""}|${m.hiragana}`;
    if (seen.has(key)) continue;
    seen.add(key);
    matches.push(m);
    if (matches.length >= 4) break;
  }
  // A loanword with no other entry for the same meaning (taxi) becomes the match itself. So does a common one
  // that Japanese really uses for the word (computer: コンピュータ), with the kanji words as alternatives.
  // Skip it when the best dictionary entry already reads as the loanword (珈琲 is read コーヒー).
  const loanLeads = loanEntry && loanEntry.is_common && firstExact(loanEntry, q) && !scored[0]?.is_common && !scored.some((e) => isAllKatakana(e.japanese[0].reading ?? ""));
  if (loanEntry && (!matches.length || loanLeads)) {
    const lead = toMatch(loanEntry, true);
    if (loanLeads) {
      matches.forEach((m, i) => {
        if (m.loan && m.kanji === null) matches.splice(i, 1);
      });
    }
    matches.unshift(lead);
    matches.splice(4);
  }

  return NextResponse.json(
    { q: raw, mode: matches.length ? "word" : "name", matches },
    { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } },
  );
}
