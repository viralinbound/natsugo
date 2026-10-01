"use client";

// Picks the softest-sounding voice the device has. Neural / "Natural" / Google voices sound far less
// robotic than the old desktop defaults (Microsoft David, eSpeak), so they are tried first.
const prefer: Record<"en" | "ja", RegExp[]> = {
  en: [/natural|neural|online/i, /neerja|aria|jenny|sonia|libby|ava|emma/i, /google (uk english female|us english)/i, /samantha|karen|moira|tessa|serena|veena/i, /heera|hazel|susan|catherine|linda/i, /female/i],
  ja: [/natural|neural|online/i, /nanami|aoi|mayu/i, /google 日本語/i, /kyoko|o-ren|otoya/i],
};
const avoid = /david|mark|zira|espeak|novelty|whisper|bad news|bells|boing|bubbles|cellos|jester|organ|trinoids|zarvox|albert|fred|junior|ralph/i;

let cache: SpeechSynthesisVoice[] = [];
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  const load = () => (cache = window.speechSynthesis.getVoices());
  load();
  window.speechSynthesis.addEventListener?.("voiceschanged", load);
}

export function pickVoice(lang: "en" | "ja"): SpeechSynthesisVoice | undefined {
  const all = cache.length ? cache : window.speechSynthesis.getVoices();
  const pool = all.filter((v) => v.lang.toLowerCase().startsWith(lang) && !avoid.test(v.name));
  for (const re of prefer[lang]) {
    const hit = pool.filter((v) => re.test(v.name));
    if (hit.length) return lang === "en" ? hit.find((v) => /en-(in|gb)/i.test(v.lang)) ?? hit[0] : hit[0];
  }
  return pool.find((v) => !v.localService) ?? pool[0] ?? all.find((v) => v.lang.toLowerCase().startsWith(lang));
}

// Shared settings so every narrated line sounds the same across the site.
export function tune(u: SpeechSynthesisUtterance, lang: "en" | "ja", rate = 1) {
  u.lang = lang === "ja" ? "ja-JP" : "en-IN";
  const v = pickVoice(lang);
  if (v) {
    u.voice = v;
    u.lang = v.lang;
  }
  u.rate = rate * (lang === "ja" ? 0.85 : 0.92);
  u.pitch = 1;
  u.volume = 0.9;
}
