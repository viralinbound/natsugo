import { images } from "@/lib/site";

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface ArticleBody {
  image: string;
  readMinutes: number;
  sections: ArticleSection[];
}

export const articleBodies: Record<string, ArticleBody> = {
  "how-to-learn-japanese-from-scratch": {
    image: images.writing,
    readMinutes: 5,
    sections: [
      { heading: "Start with the sounds and the scripts", paragraphs: ["Japanese has only five vowel sounds, and almost every syllable is a consonant plus a vowel. That makes pronunciation friendlier than many learners expect.", "Learn hiragana first, then katakana. Together they are 92 basic characters, and most learners can read both within three to four weeks of steady practice."] },
      { heading: "Build sentences early", paragraphs: ["Don't wait until you 'know enough'. Simple patterns like 〜は〜です (X is Y) let you start speaking in your first week."], list: ["わたしは がくせい です。— I am a student.", "これは ほん です。— This is a book."] },
      { heading: "Add kanji gradually", paragraphs: ["Kanji look intimidating, but you only need around 100 for JLPT N5. Learn them with vocabulary, not in isolation."] },
      { heading: "Get feedback", paragraphs: ["Self-study apps are useful for vocabulary, but speaking and grammar improve fastest with a teacher who can correct you. A level test is a good first step to find where to begin."] },
    ],
  },
  "how-long-does-it-take-to-learn-japanese": {
    image: images.books,
    readMinutes: 4,
    sections: [
      { heading: "It depends on your goal", paragraphs: ["'Learning Japanese' can mean ordering food on holiday or reading a contract. Define your goal first — a JLPT level is a helpful yardstick."] },
      { heading: "Rough timelines", paragraphs: ["These are broad guides that vary a lot with study hours, prior language experience and consistency:"], list: ["N5: a few months of regular study", "N4: roughly another 4–6 months", "N3: often 1–1.5 years from zero", "N2 and N1: several years of sustained study"] },
      { heading: "Consistency beats intensity", paragraphs: ["Thirty minutes a day beats five hours once a week. Short daily review of vocabulary and kanji is the single biggest accelerator."] },
    ],
  },
  "is-japanese-difficult-to-learn": {
    image: images.kyoto,
    readMinutes: 4,
    sections: [
      { heading: "What's easier than you think", paragraphs: ["Pronunciation is simple and regular. There are no grammatical genders, no plural forms for most nouns, and verbs don't change for 'I/you/he'."] },
      { heading: "What takes time", paragraphs: ["Kanji and the different levels of politeness (keigo) take the longest. Word order (subject–object–verb) also takes some getting used to."] },
      { heading: "An advantage for Indian learners", paragraphs: ["Many Indian languages also place the verb at the end of the sentence and use postpositions, much like Japanese particles. Many learners find Japanese sentence structure feels surprisingly familiar."] },
    ],
  },
  "what-is-jlpt": {
    image: images.lecture,
    readMinutes: 5,
    sections: [
      { heading: "The Japanese-Language Proficiency Test", paragraphs: ["The JLPT is a standardised test for non-native speakers, run by the Japan Foundation and Japan Educational Exchanges and Services (JEES). It has five levels from N5 (easiest) to N1 (hardest)."] },
      { heading: "What it tests", paragraphs: ["The JLPT tests language knowledge (vocabulary, kanji, grammar), reading and listening. It does not include a speaking or writing section — which is why separate speaking practice matters."] },
      { heading: "When is it held in India?", paragraphs: ["In India the JLPT is typically held twice a year, in July and December, in several cities. Always check the official JLPT website for current dates and registration."] },
      { heading: "Why take it", paragraphs: ["JLPT results are widely used by universities, employers and some immigration programmes as evidence of Japanese ability. Requirements vary, so check with the specific institution."] },
    ],
  },
  "jlpt-n5-preparation-guide": {
    image: images.writing,
    readMinutes: 6,
    sections: [
      { heading: "What N5 covers", paragraphs: ["N5 tests basic Japanese: hiragana, katakana, around 100 kanji, roughly 800 words and core grammar like です/ます, particles and basic verb forms."] },
      { heading: "A simple study order", paragraphs: [], list: ["Weeks 1–4: hiragana and katakana", "Weeks 5–10: grammar patterns and core vocabulary", "Weeks 11–14: kanji and reading practice", "Final weeks: listening practice and timed mock tests"] },
      { heading: "Don't skip listening", paragraphs: ["Many learners focus on reading and lose marks in listening. Practise with exam-format audio from the start."] },
    ],
  },
  "japanese-grammar-for-beginners": {
    image: images.books,
    readMinutes: 5,
    sections: [
      { heading: "Word order: verb last", paragraphs: ["Japanese sentences usually end with the verb: わたしは りんごを たべます (I apple eat)."] },
      { heading: "Particles do the heavy lifting", paragraphs: ["Small words after nouns show their role in the sentence — は marks the topic, を the object, に the destination or time."] },
      { heading: "Polite form first", paragraphs: ["Beginners learn the polite ます form first because it's safe in almost every situation. Casual forms come later."] },
    ],
  },
  "japanese-particles-explained": {
    image: images.online,
    readMinutes: 6,
    sections: [
      { heading: "は (wa) — the topic", paragraphs: ["は tells the listener what you're talking about: わたしは インド人です — As for me, I'm Indian."] },
      { heading: "が (ga) — the subject", paragraphs: ["が highlights the subject, often new information: だれが きましたか — Who came?"] },
      { heading: "を (o) — the object", paragraphs: ["を marks what the action is done to: コーヒーを のみます — I drink coffee."] },
      { heading: "に and で", paragraphs: ["に marks time, destination or location of existence. で marks where an action happens or the means: バスで いきます — I go by bus."] },
    ],
  },
  "japanese-greetings": {
    image: images.sakura,
    readMinutes: 3,
    sections: [
      { heading: "Everyday greetings", paragraphs: [], list: ["おはようございます — Good morning", "こんにちは — Hello / Good afternoon", "こんばんは — Good evening", "おやすみなさい — Good night", "ありがとうございます — Thank you", "すみません — Excuse me / Sorry"] },
      { heading: "Meeting someone new", paragraphs: ["はじめまして。〇〇です。よろしくおねがいします。— Nice to meet you. I'm ___. I look forward to working with you."] },
    ],
  },
  "japanese-vocabulary-for-beginners": {
    image: images.writing,
    readMinutes: 4,
    sections: [
      { heading: "Learn by topic", paragraphs: ["Group words by situations you actually face — food, family, time, work — so you can use them straight away."] },
      { heading: "Starter words", paragraphs: [], list: ["みず — water", "たべもの — food", "いえ — house", "しごと — work", "ともだち — friend", "でんしゃ — train"] },
      { heading: "Use spaced repetition", paragraphs: ["Review new words after one day, three days, a week and a month. This dramatically improves long-term memory."] },
    ],
  },
  "japanese-language-career-opportunities": {
    image: images.office,
    readMinutes: 5,
    sections: [
      { heading: "Where Japanese is used in India", paragraphs: ["Japanese companies operate across India in automotive, electronics, IT services and manufacturing. Indian IT firms also serve many Japanese clients."] },
      { heading: "Common roles", paragraphs: [], list: ["Bilingual IT engineer or bridge engineer", "Translator or interpreter", "Customer support and operations for Japanese clients", "Teaching Japanese"] },
      { heading: "A realistic note", paragraphs: ["Language skill is one factor among many — employers also look at technical skills and experience. A JLPT level does not guarantee a job, but it can make your profile stronger for roles that need Japanese."] },
    ],
  },
};
