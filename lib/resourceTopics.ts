import { images } from "@/lib/site";

export const resourceTopics = [
  {
    slug: "hiragana", title: "Hiragana Chart", short: "Hiragana", jp: "ひらがな",
    desc: "All 46 basic hiragana with sound. The first script every learner needs.", image: images.writing,
    metaTitle: "Japanese Hiragana | Free Chart, Sounds & Practice",
    metaDescription: "Learn Japanese Hiragana with Natsugo's free interactive chart. Practice all 46 basic characters, hear their sounds and learn with romaji support.",
    keywords: ["Japanese Hiragana", "Hiragana Chart", "Japanese Hiragana Chart", "Learn Hiragana Online", "Hiragana Characters", "Hiragana Pronunciation", "Hiragana Practice", "Hiragana Chart with Romaji"],
  },
  {
    slug: "katakana", title: "Katakana Chart", short: "Katakana", jp: "カタカナ",
    desc: "All 46 katakana: used for foreign words, names and emphasis.", image: images.tokyo,
    metaTitle: "Japanese Katakana | Free Chart, Sounds & Practice",
    metaDescription: "Learn Japanese Katakana with Natsugo's free interactive chart. Practice all 46 characters, hear pronunciation and use romaji support for easy learning.",
    keywords: ["Japanese Katakana", "Katakana Chart", "Japanese Katakana Chart", "Learn Katakana Online", "Katakana Characters", "Katakana Pronunciation", "Katakana Practice", "Katakana Chart with Romaji"],
  },
  {
    slug: "kanji", title: "Basic Kanji for JLPT N5", short: "Kanji", jp: "漢字",
    desc: "30 essential N5 kanji with meanings and readings.", image: images.books,
    metaTitle: "Japanese Kanji | JLPT N5-N1 Kanji List & Meanings",
    metaDescription: "Learn Japanese Kanji with Natsugo. Explore JLPT N5-N1 kanji with meanings, readings and easy practice to build your Japanese vocabulary and skills.",
    keywords: ["Japanese Kanji", "Japanese Kanji List", "JLPT Kanji List", "JLPT N5 Kanji", "Japanese Kanji with Meanings", "Learn Japanese Kanji", "Kanji Reading Practice", "JLPT N5-N1 Kanji"],
  },
  {
    slug: "grammar", title: "Beginner Japanese Grammar", short: "Grammar", jp: "文法",
    desc: "Core sentence patterns with example sentences.", image: images.lecture,
    metaTitle: "Japanese Grammar | Easy Lessons & Examples",
    metaDescription: "Learn Japanese grammar with easy sentence patterns and examples. Practice essential grammar with Natsugo and build a strong foundation in Japanese.",
    keywords: ["Japanese Grammar", "Japanese Grammar for Beginners", "Learn Japanese Grammar", "Japanese Grammar Lessons", "Basic Japanese Grammar", "Japanese Grammar Examples", "Japanese Grammar Online"],
  },
  {
    slug: "vocabulary", title: "Japanese Vocabulary by Topic", short: "Vocabulary", jp: "語彙",
    desc: "Everyday words grouped by daily life, people, work and food.", image: images.groupStudy,
    metaTitle: "Japanese Vocabulary | Words by Topic & Meaning",
    metaDescription: "Learn Japanese vocabulary by topic with Natsugo. Explore everyday words for daily life, people, work and food with Japanese terms and meanings.",
    keywords: ["Japanese Vocabulary", "Japanese Vocabulary Words", "Japanese Words with Meaning", "Learn Japanese Vocabulary", "Basic Japanese Vocabulary", "Japanese Vocabulary for Beginners", "Japanese Words for Daily Life", "Japanese Vocabulary by Topic"],
  },
  {
    slug: "phrases", title: "Useful Japanese Phrases", short: "Phrases", jp: "フレーズ",
    desc: "Greetings and survival phrases with pronunciation.", image: images.sakura,
    metaTitle: "Japanese Phrases | Useful Words & Sentences",
    metaDescription: "Learn useful Japanese phrases for daily conversations, travel and everyday situations. Explore easy Japanese sentences and meanings with Natsugo.",
    keywords: ["Japanese Phrases", "Japanese Phrases for Beginners", "Useful Japanese Phrases", "Japanese Phrases with Meaning", "Japanese Sentences for Beginners", "Learn Japanese Phrases", "Japanese Phrases for Daily Conversation"],
  },
  {
    slug: "flashcards", title: "Daily Japanese Flashcards", short: "Flashcards", jp: "単語カード",
    desc: "Spaced-repetition flashcards for kana, kanji and vocabulary. Build a daily streak.", image: images.writing,
    metaTitle: "Japanese Flashcards | Free Daily Practice",
    metaDescription: "Learn Japanese with free daily flashcards for Hiragana, Katakana, N5 Kanji and vocabulary. Practice with spaced repetition and build your skills with Natsugo.",
    keywords: ["Japanese Flashcards", "Japanese Flashcards Online", "Free Japanese Flashcards", "Japanese Vocabulary Flashcards", "Japanese Kanji Flashcards", "Hiragana Flashcards", "Katakana Flashcards", "N5 Japanese Flashcards"],
  },
] as const;

export type ResourceSlug = (typeof resourceTopics)[number]["slug"];
