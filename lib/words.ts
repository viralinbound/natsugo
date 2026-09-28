export interface Word {
  jp: string;
  reading: string;
  romaji: string;
  meaning: string;
  example_jp: string;
  example_en: string;
  level: string;
}

export const words: Word[] = [
  { jp: "頑張る", reading: "がんばる", romaji: "ganbaru", meaning: "to do one's best, to hang in there", example_jp: "試験、頑張ってください！", example_en: "Good luck with your exam!", level: "N4" },
  { jp: "桜", reading: "さくら", romaji: "sakura", meaning: "cherry blossom", example_jp: "桜がきれいです。", example_en: "The cherry blossoms are beautiful.", level: "N5" },
  { jp: "勉強", reading: "べんきょう", romaji: "benkyō", meaning: "study", example_jp: "毎日日本語を勉強します。", example_en: "I study Japanese every day.", level: "N5" },
  { jp: "友達", reading: "ともだち", romaji: "tomodachi", meaning: "friend", example_jp: "友達と映画を見ました。", example_en: "I watched a movie with a friend.", level: "N5" },
  { jp: "約束", reading: "やくそく", romaji: "yakusoku", meaning: "promise, appointment", example_jp: "約束を守ります。", example_en: "I keep my promises.", level: "N4" },
  { jp: "木漏れ日", reading: "こもれび", romaji: "komorebi", meaning: "sunlight filtering through trees", example_jp: "木漏れ日が気持ちいい。", example_en: "The sunlight through the trees feels nice.", level: "N2" },
  { jp: "美味しい", reading: "おいしい", romaji: "oishii", meaning: "delicious", example_jp: "このカレーは美味しいです。", example_en: "This curry is delicious.", level: "N5" },
  { jp: "仕事", reading: "しごと", romaji: "shigoto", meaning: "work, job", example_jp: "今日は仕事が忙しいです。", example_en: "Work is busy today.", level: "N5" },
  { jp: "練習", reading: "れんしゅう", romaji: "renshū", meaning: "practice", example_jp: "会話の練習をしましょう。", example_en: "Let's practise conversation.", level: "N4" },
  { jp: "夢", reading: "ゆめ", romaji: "yume", meaning: "dream", example_jp: "日本で働くのが夢です。", example_en: "My dream is to work in Japan.", level: "N4" },
  { jp: "一期一会", reading: "いちごいちえ", romaji: "ichigo ichie", meaning: "a once-in-a-lifetime encounter", example_jp: "一期一会を大切にします。", example_en: "I treasure every encounter.", level: "N1" },
  { jp: "旅行", reading: "りょこう", romaji: "ryokō", meaning: "travel, trip", example_jp: "来年、日本へ旅行します。", example_en: "I'll travel to Japan next year.", level: "N5" },
  { jp: "大丈夫", reading: "だいじょうぶ", romaji: "daijōbu", meaning: "okay, all right", example_jp: "大丈夫ですか。", example_en: "Are you okay?", level: "N5" },
  { jp: "経験", reading: "けいけん", romaji: "keiken", meaning: "experience", example_jp: "いい経験になりました。", example_en: "It was a good experience.", level: "N3" },
];

// Same word for everyone on a given IST date.
export function wordForDate(list: Word[], date = new Date()) {
  const ist = new Date(date.getTime() + 5.5 * 3600_000);
  const day = Math.floor(ist.getTime() / 86_400_000);
  return list[day % list.length];
}
