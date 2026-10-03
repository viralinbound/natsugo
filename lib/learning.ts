export interface KanaCell {
  kana: string;
  romaji: string;
}

const hiraRows: [string, string][][] = [
  [["あ", "a"], ["い", "i"], ["う", "u"], ["え", "e"], ["お", "o"]],
  [["か", "ka"], ["き", "ki"], ["く", "ku"], ["け", "ke"], ["こ", "ko"]],
  [["さ", "sa"], ["し", "shi"], ["す", "su"], ["せ", "se"], ["そ", "so"]],
  [["た", "ta"], ["ち", "chi"], ["つ", "tsu"], ["て", "te"], ["と", "to"]],
  [["な", "na"], ["に", "ni"], ["ぬ", "nu"], ["ね", "ne"], ["の", "no"]],
  [["は", "ha"], ["ひ", "hi"], ["ふ", "fu"], ["へ", "he"], ["ほ", "ho"]],
  [["ま", "ma"], ["み", "mi"], ["む", "mu"], ["め", "me"], ["も", "mo"]],
  [["や", "ya"], ["", ""], ["ゆ", "yu"], ["", ""], ["よ", "yo"]],
  [["ら", "ra"], ["り", "ri"], ["る", "ru"], ["れ", "re"], ["ろ", "ro"]],
  [["わ", "wa"], ["", ""], ["", ""], ["", ""], ["を", "wo"]],
  [["", ""], ["", ""], ["ん", "n"], ["", ""], ["", ""]],
];

const toKatakana = (s: string) =>
  s.replace(/[ぁ-ゖ]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60));

export const hiragana: KanaCell[][] = hiraRows.map((r) =>
  r.map(([kana, romaji]) => ({ kana, romaji }))
);
export const katakana: KanaCell[][] = hiraRows.map((r) =>
  r.map(([kana, romaji]) => ({ kana: toKatakana(kana), romaji }))
);

export const kanjiN5 = [
  { k: "日", m: "sun, day", r: "にち・ひ" },
  { k: "月", m: "moon, month", r: "げつ・つき" },
  { k: "火", m: "fire", r: "か・ひ" },
  { k: "水", m: "water", r: "すい・みず" },
  { k: "木", m: "tree", r: "もく・き" },
  { k: "金", m: "gold, money", r: "きん・かね" },
  { k: "土", m: "earth", r: "ど・つち" },
  { k: "山", m: "mountain", r: "さん・やま" },
  { k: "川", m: "river", r: "せん・かわ" },
  { k: "人", m: "person", r: "じん・ひと" },
  { k: "口", m: "mouth", r: "こう・くち" },
  { k: "目", m: "eye", r: "もく・め" },
  { k: "手", m: "hand", r: "しゅ・て" },
  { k: "大", m: "big", r: "だい・おお" },
  { k: "小", m: "small", r: "しょう・ちい" },
  { k: "上", m: "up, above", r: "じょう・うえ" },
  { k: "下", m: "down, below", r: "か・した" },
  { k: "中", m: "middle", r: "ちゅう・なか" },
  { k: "一", m: "one", r: "いち" },
  { k: "二", m: "two", r: "に" },
  { k: "三", m: "three", r: "さん" },
  { k: "十", m: "ten", r: "じゅう" },
  { k: "百", m: "hundred", r: "ひゃく" },
  { k: "年", m: "year", r: "ねん・とし" },
  { k: "学", m: "study", r: "がく・まな" },
  { k: "生", m: "life, birth", r: "せい・い" },
  { k: "先", m: "ahead, previous", r: "せん・さき" },
  { k: "本", m: "book, origin", r: "ほん・もと" },
  { k: "名", m: "name", r: "めい・な" },
  { k: "語", m: "language", r: "ご" },
];

export const grammarPoints = [
  { pattern: "〜は〜です", meaning: "X is Y", example: "わたしは がくせいです。", translation: "I am a student." },
  { pattern: "〜は〜じゃありません", meaning: "X is not Y", example: "これは ペンじゃありません。", translation: "This is not a pen." },
  { pattern: "〜を〜ます", meaning: "Do [verb] to X", example: "コーヒーを のみます。", translation: "I drink coffee." },
  { pattern: "〜に いきます", meaning: "Go to X", example: "がっこうに いきます。", translation: "I go to school." },
  { pattern: "〜で〜ます", meaning: "Do at / by means of X", example: "バスで いきます。", translation: "I go by bus." },
  { pattern: "〜たいです", meaning: "Want to do", example: "にほんに いきたいです。", translation: "I want to go to Japan." },
  { pattern: "〜てください", meaning: "Please do", example: "ゆっくり はなしてください。", translation: "Please speak slowly." },
  { pattern: "〜が すきです", meaning: "Like X", example: "すしが すきです。", translation: "I like sushi." },
];

export const vocabulary: { topic: string; words: { jp: string; en: string }[] }[] = [
  { topic: "Daily life", words: [{ jp: "みず", en: "water" }, { jp: "ごはん", en: "rice / meal" }, { jp: "いえ", en: "house" }, { jp: "でんしゃ", en: "train" }, { jp: "おかね", en: "money" }, { jp: "じかん", en: "time" }] },
  { topic: "People", words: [{ jp: "ともだち", en: "friend" }, { jp: "かぞく", en: "family" }, { jp: "せんせい", en: "teacher" }, { jp: "がくせい", en: "student" }, { jp: "かいしゃいん", en: "company employee" }, { jp: "こども", en: "child" }] },
  { topic: "Work", words: [{ jp: "しごと", en: "work" }, { jp: "かいぎ", en: "meeting" }, { jp: "メール", en: "email" }, { jp: "でんわ", en: "phone" }, { jp: "しりょう", en: "documents" }, { jp: "やすみ", en: "day off" }] },
  { topic: "Food", words: [{ jp: "やさい", en: "vegetables" }, { jp: "くだもの", en: "fruit" }, { jp: "おちゃ", en: "tea" }, { jp: "パン", en: "bread" }, { jp: "たまご", en: "egg" }, { jp: "さかな", en: "fish" }] },
];

export const phrases = [
  { jp: "おはようございます", romaji: "ohayō gozaimasu", en: "Good morning (polite)" },
  { jp: "こんにちは", romaji: "konnichiwa", en: "Hello" },
  { jp: "ありがとうございます", romaji: "arigatō gozaimasu", en: "Thank you (polite)" },
  { jp: "すみません", romaji: "sumimasen", en: "Excuse me / Sorry" },
  { jp: "はじめまして", romaji: "hajimemashite", en: "Nice to meet you" },
  { jp: "よろしくおねがいします", romaji: "yoroshiku onegai shimasu", en: "Please treat me well / Looking forward to working with you" },
  { jp: "わかりません", romaji: "wakarimasen", en: "I don't understand" },
  { jp: "もういちど おねがいします", romaji: "mō ichido onegai shimasu", en: "One more time, please" },
  { jp: "これは いくらですか", romaji: "kore wa ikura desu ka", en: "How much is this?" },
  { jp: "トイレは どこですか", romaji: "toire wa doko desu ka", en: "Where is the toilet?" },
];

export type Skill = "Vocabulary" | "Grammar" | "Reading" | "Listening" | "Kanji" | "Speaking";

export interface Question {
  id: string;
  skill: Skill;
  level: string;
  prompt: string;
  audio?: string;
  options: string[];
  answer: number;
  explanation?: string;
}

export const levelTestQuestions: Question[] = [
  { id: "q1", skill: "Vocabulary", level: "N5", prompt: "「たまご」 means:", options: ["Egg", "Milk", "Bread", "Salt"], answer: 0 },
  { id: "q2", skill: "Grammar", level: "N5", prompt: "ともだち ___ えいがを みます。", options: ["と", "を", "で", "が"], answer: 0 },
  { id: "q3", skill: "Kanji", level: "N5", prompt: "「火」 means:", options: ["Fire", "Water", "Tree", "Gold"], answer: 0 },
  { id: "q4", skill: "Listening", level: "N5", prompt: "Listen. What is being asked?", audio: "いま なんじですか", options: ["What time is it now?", "Where is it?", "Who is it?", "How old are you?"], answer: 0 },
  { id: "q5", skill: "Reading", level: "N5", prompt: "「わたしの いえは えきから ちかいです。」 What does the writer say?", options: ["My house is near the station", "My house is far from the station", "My house is next to a school", "My house has no station"], answer: 0 },
  { id: "q6", skill: "Vocabulary", level: "N4", prompt: "「けんぶつ」 means:", options: ["Sightseeing", "Shopping", "Cooking", "Exercise"], answer: 0 },
  { id: "q7", skill: "Grammar", level: "N4", prompt: "しゅくだいを ___ から、あそびに いきます。", options: ["して", "した", "する", "しない"], answer: 0 },
  { id: "q8", skill: "Kanji", level: "N4", prompt: "How is 「旅館」 read?", options: ["りょかん", "りょうかん", "たびかん", "りょけん"], answer: 0 },
  { id: "q9", skill: "Listening", level: "N4", prompt: "Listen. What does the speaker say?", audio: "すみません、ちょっと おくれます", options: ["I'll be a little late", "I'm leaving early", "I'm feeling sick", "I'll arrive first"], answer: 0 },
  { id: "q10", skill: "Reading", level: "N4", prompt: "「この くすりは あさと よる、1じょうずつ のんで ください。」 How should you take it?", options: ["Once in the morning and once at night", "Only in the morning", "Three times a day", "Before meals only"], answer: 0 },
  { id: "q11", skill: "Vocabulary", level: "N3", prompt: "「めずらしい」 means:", options: ["Rare", "Common", "Noisy", "Heavy"], answer: 0 },
  { id: "q12", skill: "Grammar", level: "N3", prompt: "この 会社では 毎朝 ミーティングを する ___ なっている。", options: ["こと", "よう", "ため", "つもり"], answer: 0 },
  { id: "q13", skill: "Kanji", level: "N3", prompt: "How is 「準備」 read?", options: ["じゅんび", "しゅんび", "じゅんぴ", "ちゅんび"], answer: 0 },
  { id: "q14", skill: "Listening", level: "N3", prompt: "Listen. What is the speaker asking?", audio: "すみません、この 荷物を 預かって もらえませんか", options: ["Could you hold this luggage for me?", "Where is the luggage?", "I lost my luggage", "Please carry it to my room"], answer: 0 },
  { id: "q15", skill: "Reading", level: "N3", prompt: "「当店は 午後 9時が ラストオーダーです。」 What does this mean?", options: ["Last order is at 9 p.m.", "The shop opens at 9 p.m.", "The shop closes at noon", "Reservations only after 9"], answer: 0 },
  { id: "q16", skill: "Vocabulary", level: "N2", prompt: "「抜群」 means:", options: ["Outstanding", "Average", "Dangerous", "Tiring"], answer: 0 },
  { id: "q17", skill: "Grammar", level: "N2", prompt: "新製品の 発売 ___、記者会見が 開かれた。", options: ["に先立ち", "に加えて", "に対して", "に関して"], answer: 0 },
  { id: "q18", skill: "Kanji", level: "N2", prompt: "How is 「維持」 read?", options: ["いじ", "ゆうじ", "いし", "ついじ"], answer: 0 },
  { id: "q19", skill: "Listening", level: "N2", prompt: "Listen. What is the speaker requesting?", audio: "お手数ですが、こちらの 書類に ご署名 いただけますか", options: ["Please sign this document", "Please copy this document", "Please throw it away", "Please keep it safe"], answer: 0 },
  { id: "q20", skill: "Reading", level: "N2", prompt: "「新規 契約の 場合に 限り、初月の 利用料は 無料と なります。」 When is the first month free?", options: ["Only for new contracts", "For every customer", "Only on renewal", "Never"], answer: 0 },
  { id: "q21", skill: "Vocabulary", level: "N1", prompt: "「紛らわしい」 means:", options: ["Confusing", "Cheerful", "Thick", "Honest"], answer: 0 },
  { id: "q22", skill: "Grammar", level: "N1", prompt: "彼が 辞任する ___ 、組織は 混乱するに 違いない。", options: ["暁には", "ものの", "ばかりに", "ゆえに"], answer: 0 },
  { id: "q23", skill: "Kanji", level: "N1", prompt: "How is 「蓄積」 read?", options: ["ちくせき", "ちょせき", "たくせき", "ちくしゃく"], answer: 0 },
  { id: "q24", skill: "Listening", level: "N1", prompt: "Listen. What does the speaker promise?", audio: "その 件に つきましては、改めて ご連絡 差し上げます", options: ["To contact you again about the matter", "To cancel the matter", "To ask you to contact them", "That they already did"], answer: 0 },
  { id: "q25", skill: "Reading", level: "N1", prompt: "「違約金は 契約 解除の 時期を 問わず 発生 いたします。」 What does this say?", options: ["A penalty applies whenever you cancel", "No penalty after one year", "A penalty only in the first month", "You are never charged"], answer: 0 },
];

export const levelOrder = ["N5", "N4", "N3", "N2", "N1"] as const;
export const PASS_MARK = 3; // right answers out of 5 needed to count a level as known

const courseFor = (level: string) => ({ level, slug: `jlpt-${level.toLowerCase()}` });

// You start at the first level you did not pass: pass N5 and N4 but miss N3, and you start at N3.
// Passing all five levels means N1 (advanced practice).
export const recommendStart = (byLevel: Record<string, { right: number; total: number }>) => {
  const failed = levelOrder.find((l) => (byLevel[l]?.right ?? 0) < PASS_MARK);
  const level = failed ?? "N1";
  const label = !failed
    ? "JLPT N1, advanced practice"
    : failed === "N5"
      ? "JLPT N5, start from the beginning"
      : `JLPT ${failed}, you've got ${levelOrder[levelOrder.indexOf(failed) - 1]} covered`;
  return { ...courseFor(level), label };
};
