"use client";

// Picks the gentlest voice the device has, for every sound on the site (lessons, quizzes, kana, kanji).
// Soft female voices come first, natural/neural voices next; harsh desktop and male voices are skipped.
const female: Record<"en" | "ja", RegExp> = {
  en: /neerja|heera|veena|aria|jenny|sonia|libby|ava|emma|michelle|natasha|clara|samantha|karen|moira|tessa|serena|hazel|susan|catherine|linda|female/i,
  ja: /nanami|aoi|mayu|shiori|haruka|ayumi|kyoko|o-ren|google 日本語/i,
};
const harsh =
  /david|mark|zira|guy|ravi|prabhat|george|ryan|eric|roger|steffan|william|christopher|brian|andrew|thomas|keita|ichiro|daichi|naoki|otoya|male|espeak|novelty|whisper|bad news|bells|boing|bubbles|cellos|jester|organ|trinoids|zarvox|albert|fred|junior|ralph/i;

let cache: SpeechSynthesisVoice[] = [];
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  const load = () => (cache = window.speechSynthesis.getVoices());
  load();
  window.speechSynthesis.addEventListener?.("voiceschanged", load);
}

function score(v: SpeechSynthesisVoice, lang: "en" | "ja") {
  let s = 0;
  if (female[lang].test(v.name)) s += 4;
  if (/natural|neural|online|google/i.test(v.name)) s += 2;
  if (lang === "en" && /en-(in|gb)/i.test(v.lang)) s += 1;
  if (/female/i.test(v.name) && /\bmale\b/i.test(v.name)) s -= 4;
  return s;
}

export function pickVoice(lang: "en" | "ja"): SpeechSynthesisVoice | undefined {
  const all = cache.length ? cache : window.speechSynthesis.getVoices();
  const same = all.filter((v) => v.lang.toLowerCase().startsWith(lang));
  const gentle = same.filter((v) => female[lang].test(v.name) || !harsh.test(v.name));
  const pool = gentle.length ? gentle : same;
  return [...pool].sort((a, b) => score(b, lang) - score(a, lang))[0];
}

// Shared settings: a calm pace, a slightly lighter pitch and a softer volume, the same everywhere.
export function tune(u: SpeechSynthesisUtterance, lang: "en" | "ja", rate = 1) {
  u.lang = lang === "ja" ? "ja-JP" : "en-IN";
  const v = pickVoice(lang);
  if (v) {
    u.voice = v;
    u.lang = v.lang;
  }
  u.rate = rate * (lang === "ja" ? 0.78 : 0.88);
  // A higher pitch gives the Japanese voice a bright, cute and polite young-teacher feel; English stays gentler.
  u.pitch = lang === "ja" ? 1.3 : 1.12;
  u.volume = 0.85;
}
