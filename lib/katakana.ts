// Turns a name typed in English letters into katakana, the way Japanese write foreign names.
// It follows the sound of the spelling, so results are a good guide rather than an official transcription.

const table: Record<string, string> = {
  kya: "キャ", kyu: "キュ", kyo: "キョ", sha: "シャ", shu: "シュ", sho: "ショ", she: "シェ", shi: "シ",
  cha: "チャ", chu: "チュ", cho: "チョ", che: "チェ", chi: "チ", tsu: "ツ", nya: "ニャ", nyu: "ニュ", nyo: "ニョ",
  hya: "ヒャ", hyu: "ヒュ", hyo: "ヒョ", mya: "ミャ", myu: "ミュ", myo: "ミョ", rya: "リャ", ryu: "リュ", ryo: "リョ",
  gya: "ギャ", gyu: "ギュ", gyo: "ギョ", bya: "ビャ", byu: "ビュ", byo: "ビョ", pya: "ピャ", pyu: "ピュ", pyo: "ピョ",
  ja: "ジャ", ju: "ジュ", jo: "ジョ", je: "ジェ", ji: "ジ", thi: "ティ", ti: "ティ", di: "ディ", tu: "トゥ", du: "ドゥ",
  fa: "ファ", fi: "フィ", fu: "フ", fe: "フェ", fo: "フォ", va: "ヴァ", vi: "ヴィ", vu: "ヴ", ve: "ヴェ", vo: "ヴォ",
  wa: "ワ", wi: "ウィ", we: "ウェ", wo: "ウォ", ya: "ヤ", yu: "ユ", ye: "イェ", yo: "ヨ",
  ka: "カ", ki: "キ", ku: "ク", ke: "ケ", ko: "コ", ga: "ガ", gi: "ギ", gu: "グ", ge: "ゲ", go: "ゴ",
  sa: "サ", si: "シ", su: "ス", se: "セ", so: "ソ", za: "ザ", zi: "ジ", zu: "ズ", ze: "ゼ", zo: "ゾ",
  ta: "タ", te: "テ", to: "ト", da: "ダ", de: "デ", do: "ド",
  na: "ナ", ni: "ニ", nu: "ヌ", ne: "ネ", no: "ノ", ha: "ハ", hi: "ヒ", hu: "フ", he: "ヘ", ho: "ホ",
  ba: "バ", bi: "ビ", bu: "ブ", be: "ベ", bo: "ボ", pa: "パ", pi: "ピ", pu: "プ", pe: "ペ", po: "ポ",
  ma: "マ", mi: "ミ", mu: "ム", me: "メ", mo: "モ", ra: "ラ", ri: "リ", ru: "ル", re: "レ", ro: "ロ",
  la: "ラ", li: "リ", lu: "ル", le: "レ", lo: "ロ", ca: "カ", ci: "シ", cu: "ク", ce: "セ", co: "コ",
  qa: "カ", qi: "キ", qu: "ク", qe: "ケ", qo: "コ", xa: "クサ", xi: "クシ", xu: "クス", xe: "クセ", xo: "クソ",
  a: "ア", i: "イ", u: "ウ", e: "エ", o: "オ",
};

// A consonant left on its own (no vowel after it) gets the closest "u" or "o" sound.
const lone: Record<string, string> = {
  k: "ク", g: "グ", s: "ス", z: "ズ", t: "ト", d: "ド", h: "", b: "ブ", p: "プ", m: "ム", r: "ル", l: "ル",
  f: "フ", v: "ヴ", j: "ジ", c: "ク", q: "ク", x: "クス", w: "ウ", y: "イ", n: "ン",
};

function word(w: string): string {
  let out = "";
  let i = 0;
  const s = w.replace(/ph/g, "f").replace(/([kgbdj])h/g, "$1").replace(/th/g, "t").replace(/ee/g, "ii").replace(/oo/g, "uu").replace(/ph/g, "f").replace(/ck/g, "k").replace(/sh(?![aeiou])/g, "shu");
  while (i < s.length) {
    const c = s[i];
    // Long vowels: a repeated vowel becomes ー.
    if ("aiueo".includes(c) && i > 0 && s[i - 1] === c) {
      out += "ー";
      i++;
      continue;
    }
    // Double consonant (except n) becomes small ッ.
    if (c === s[i + 1] && !"aiueon".includes(c)) {
      out += "ッ";
      i++;
      continue;
    }
    // n before a consonant or at the end is ン.
    if (c === "n" && (i + 1 === s.length || !"aiueoy".includes(s[i + 1]))) {
      out += "ン";
      i++;
      continue;
    }
    const hit = [3, 2, 1].map((n) => s.slice(i, i + n)).find((k) => table[k]);
    if (hit) {
      out += table[hit];
      i += hit.length;
      continue;
    }
    out += lone[c] ?? "";
    i++;
  }
  return out;
}

export function toKatakana(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z\s-]/g, "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .map(word)
    .join("・");
}
