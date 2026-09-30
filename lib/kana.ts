// Romaji to katakana, good enough for names. Not a full transliteration engine.
const base: Record<string, string> = {
  a: "ア", i: "イ", u: "ウ", e: "エ", o: "オ",
  ka: "カ", ki: "キ", ku: "ク", ke: "ケ", ko: "コ",
  sa: "サ", shi: "シ", si: "シ", su: "ス", se: "セ", so: "ソ",
  ta: "タ", chi: "チ", tsu: "ツ", te: "テ", to: "ト", ti: "ティ", tu: "トゥ",
  na: "ナ", ni: "ニ", nu: "ヌ", ne: "ネ", no: "ノ",
  ha: "ハ", hi: "ヒ", fu: "フ", hu: "フ", he: "ヘ", ho: "ホ",
  fa: "ファ", fi: "フィ", fe: "フェ", fo: "フォ",
  ma: "マ", mi: "ミ", mu: "ム", me: "メ", mo: "モ",
  ya: "ヤ", yu: "ユ", yo: "ヨ", ye: "イェ",
  ra: "ラ", ri: "リ", ru: "ル", re: "レ", ro: "ロ",
  wa: "ワ", wi: "ウィ", we: "ウェ", wo: "ウォ",
  ga: "ガ", gi: "ギ", gu: "グ", ge: "ゲ", go: "ゴ",
  za: "ザ", ji: "ジ", zi: "ジ", zu: "ズ", ze: "ゼ", zo: "ゾ",
  da: "ダ", di: "ディ", du: "ドゥ", de: "デ", do: "ド",
  ba: "バ", bi: "ビ", bu: "ブ", be: "ベ", bo: "ボ",
  pa: "パ", pi: "ピ", pu: "プ", pe: "ペ", po: "ポ",
  sha: "シャ", shu: "シュ", sho: "ショ", she: "シェ",
  cha: "チャ", chu: "チュ", cho: "チョ", che: "チェ",
  ja: "ジャ", ju: "ジュ", jo: "ジョ", je: "ジェ",
  kya: "キャ", kyu: "キュ", kyo: "キョ", nya: "ニャ", nyu: "ニュ", nyo: "ニョ",
  hya: "ヒャ", hyu: "ヒュ", hyo: "ヒョ", mya: "ミャ", myu: "ミュ", myo: "ミョ",
  rya: "リャ", ryu: "リュ", ryo: "リョ", gya: "ギャ", gyu: "ギュ", gyo: "ギョ",
  bya: "ビャ", byu: "ビュ", byo: "ビョ", pya: "ピャ", pyu: "ピュ", pyo: "ピョ",
};

const vowels = "aiueo";
const lastVowel: Record<string, string> = { t: "o", d: "o" };

function normalise(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z\s'-]/g, "")
    .replace(/ph/g, "f")
    .replace(/th/g, "t")
    .replace(/dh/g, "d")
    .replace(/kh/g, "k")
    .replace(/gh/g, "g")
    .replace(/bh/g, "b")
    .replace(/x/g, "ks")
    .replace(/q/g, "k")
    .replace(/c(?=[ei])/g, "s")
    .replace(/c(?!h)/g, "k")
    .replace(/l/g, "r")
    .replace(/v/g, "b");
}

export function toKatakana(input: string): string {
  const s = normalise(input);
  let out = "";
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (ch === " " || ch === "-" || ch === "'") {
      if (out && !out.endsWith("・")) out += "・";
      i++;
      continue;
    }
    if (vowels.includes(ch)) {
      if (i > 0 && s[i - 1] === ch) out += "ー";
      else out += base[ch];
      i++;
      continue;
    }
    if (ch === "n" && (i + 1 >= s.length || !vowels.includes(s[i + 1]) && s[i + 1] !== "y")) {
      out += "ン";
      i++;
      continue;
    }
    if (s[i + 1] === ch && ch !== "n") {
      out += "ッ";
      i++;
      continue;
    }
    const three = s.slice(i, i + 3);
    const two = s.slice(i, i + 2);
    if (base[three]) {
      out += base[three];
      i += 3;
    } else if (base[two]) {
      out += base[two];
      i += 2;
    } else {
      out += base[`${ch}u`] ?? base[`${ch}${lastVowel[ch] ?? "u"}`] ?? "";
      i++;
    }
  }
  return out;
}
