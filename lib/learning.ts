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
  { id: "q1", skill: "Vocabulary", level: "N5", prompt: "What does 「そら」 mean?", options: ["Sea", "Sky", "Road", "Flower"], answer: 1 },
  { id: "q2", skill: "Kanji", level: "N5", prompt: "How is 「木」 read on its own?", options: ["もく", "き", "ほん", "はやし"], answer: 1 },
  { id: "q3", skill: "Grammar", level: "N5", prompt: "あなた ___ なまえは なんですか。", options: ["を", "に", "の", "で"], answer: 2 },
  { id: "q4", skill: "Listening", level: "N5", prompt: "Listen and choose the meaning.", audio: "ありがとうございます", options: ["Good morning", "Thank you", "Excuse me", "Goodbye"], answer: 1 },
  { id: "q5", skill: "Reading", level: "N5", prompt: "「きのう、ともだちと えいがを みました。」 What did the writer do yesterday?", options: ["Ate with family", "Watched a movie with a friend", "Went to school", "Bought a book"], answer: 1 },
  { id: "q6", skill: "Grammar", level: "N4", prompt: "まどを ___ もいいですか。", options: ["あける", "あけて", "あけた", "あけ"], answer: 1 },
  { id: "q7", skill: "Vocabulary", level: "N4", prompt: "Choose the best word: かいぎの ___ を コピーしてください。", options: ["しりょう", "でんしゃ", "てんき", "やさい"], answer: 0 },
  { id: "q8", skill: "Kanji", level: "N4", prompt: "What is the reading of 「学校」?", options: ["がっこう", "がくせい", "がっき", "こうこう"], answer: 0 },
  { id: "q9", skill: "Listening", level: "N4", prompt: "Listen and choose the meaning.", audio: "あしたは あめが ふるかもしれません", options: ["It rained yesterday", "It might rain tomorrow", "It is sunny today", "It will snow tonight"], answer: 1 },
  { id: "q10", skill: "Reading", level: "N4", prompt: "「この エレベーターは 5かいまでです。」 What does this notice say?", options: ["It goes to the 5th floor", "It only goes up to the 5th floor", "It holds 5 people", "It opens at 5"], answer: 1 },
  { id: "q11", skill: "Grammar", level: "N3", prompt: "日本に 来た ___、毎日 日本語を 使っています。", options: ["ばかり", "以来", "ところ", "うちに"], answer: 1 },
  { id: "q12", skill: "Vocabulary", level: "N3", prompt: "「予約」 is closest in meaning to:", options: ["Reservation", "Discount", "Receipt", "Delivery"], answer: 0 },
];

export const recommendLevel = (score: number, total: number) => {
  const pct = (score / total) * 100;
  if (pct < 35) return { level: "N5", label: "JLPT N5 / Beginner", slug: "jlpt-n5" };
  if (pct < 60) return { level: "N5", label: "JLPT N5 (fast-track)", slug: "jlpt-n5" };
  if (pct < 85) return { level: "N4", label: "JLPT N4 Preparation", slug: "jlpt-n4" };
  return { level: "N3", label: "JLPT N3 Preparation", slug: "jlpt-n3" };
};
