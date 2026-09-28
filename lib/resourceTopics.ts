import { images } from "@/lib/site";

export const resourceTopics = [
  { slug: "hiragana", title: "Hiragana Chart", short: "Hiragana", jp: "ひらがな", desc: "All 46 basic hiragana with sound. The first script every learner needs.", image: images.writing },
  { slug: "katakana", title: "Katakana Chart", short: "Katakana", jp: "カタカナ", desc: "All 46 katakana — used for foreign words, names and emphasis.", image: images.tokyo },
  { slug: "kanji", title: "Basic Kanji for JLPT N5", short: "Kanji", jp: "漢字", desc: "30 essential N5 kanji with meanings and readings.", image: images.books },
  { slug: "grammar", title: "Beginner Japanese Grammar", short: "Grammar", jp: "文法", desc: "Core sentence patterns with example sentences.", image: images.lecture },
  { slug: "vocabulary", title: "Japanese Vocabulary by Topic", short: "Vocabulary", jp: "語彙", desc: "Everyday words grouped by daily life, people, work and food.", image: images.groupStudy },
  { slug: "phrases", title: "Useful Japanese Phrases", short: "Phrases", jp: "フレーズ", desc: "Greetings and survival phrases with pronunciation.", image: images.sakura },
  { slug: "flashcards", title: "Daily Japanese Flashcards", short: "Flashcards", jp: "単語カード", desc: "Spaced-repetition flashcards for kana, kanji and vocabulary — build a daily streak.", image: images.writing },
  { slug: "jlpt-practice", title: "Free JLPT Quiz: N5 to N1", short: "JLPT Quiz", jp: "練習", desc: "150 questions — N5 to N1, each with easy, medium and hard sets of 10.", image: images.online },
] as const;

export type ResourceSlug = (typeof resourceTopics)[number]["slug"];
