import type { QuizLevel } from "@/lib/quizBank";

export interface LessonSeed {
  id: string;
  level: QuizLevel;
  unit: number;
  unitTitle: string;
  sort: number;
  title: string;
  summary: string;
  durationMin: number;
  isFree: boolean;
  notes?: string;
}

export interface LevelInfo {
  level: QuizLevel;
  jp: string;
  tagline: string;
  overview: string;
  canDo: string[];
  vocab: string;
  kanji: string;
  studyHours: string;
  exam: { section: string; minutes: number }[];
  passMark: string;
  materials: { title: string; desc: string; href: string; kind: "free" | "enrolled" }[];
}

const commonMaterials = (lvl: QuizLevel): LevelInfo["materials"] => [
  { title: `${lvl} quiz sets`, desc: "Easy, medium and hard — 10 questions each with explanations", href: `/jlpt-quiz/${lvl.toLowerCase()}/easy`, kind: "free" },
  { title: "Flashcards", desc: "Spaced-repetition practice with a daily streak", href: "/resources/flashcards", kind: "free" },
  { title: "Lesson handouts (PDF)", desc: "Printable notes and worksheets for every lesson", href: `/online-classroom/${lvl.toLowerCase()}`, kind: "free" },
  { title: "Class recordings", desc: "Watch any live class again, as many times as you like", href: `/online-classroom/${lvl.toLowerCase()}`, kind: "free" },
];

export const levelInfo: Record<QuizLevel, LevelInfo> = {
  N5: {
    level: "N5",
    jp: "入門",
    tagline: "Your first step into Japanese",
    overview:
      "N5 is the starting line. You'll learn both kana scripts, your first kanji and the sentence patterns that everything else is built on — and you'll be having simple conversations within weeks.",
    canDo: ["Read and write hiragana and katakana", "Introduce yourself and talk about your day", "Understand slow, simple everyday conversations", "Read short sentences with basic kanji"],
    vocab: "~800 words",
    kanji: "~100 kanji",
    studyHours: "Indicative 60 class hours + self-study",
    exam: [
      { section: "Language Knowledge (Vocabulary)", minutes: 20 },
      { section: "Language Knowledge (Grammar) · Reading", minutes: 40 },
      { section: "Listening", minutes: 30 },
    ],
    passMark: "80 / 180 overall, with minimum section scores",
    materials: [
      { title: "Hiragana chart with audio", desc: "Tap any character to hear it", href: "/resources/hiragana", kind: "free" },
      { title: "Katakana chart with audio", desc: "All 46 katakana", href: "/resources/katakana", kind: "free" },
      { title: "N5 kanji list", desc: "30 essential kanji with readings", href: "/resources/kanji", kind: "free" },
      ...commonMaterials("N5"),
    ],
  },
  N4: {
    level: "N4",
    jp: "初級",
    tagline: "Everyday Japanese with confidence",
    overview:
      "N4 turns the basics into real communication. You'll master verb forms, give reasons and opinions, and handle most everyday situations in Japan.",
    canDo: ["Hold everyday conversations at a slightly slow pace", "Use て-form, potential, volitional and conditional forms", "Read passages on familiar daily topics", "Understand simple instructions and notices"],
    vocab: "~1,500 words",
    kanji: "~300 kanji",
    studyHours: "Indicative 70 class hours + self-study",
    exam: [
      { section: "Language Knowledge (Vocabulary)", minutes: 25 },
      { section: "Language Knowledge (Grammar) · Reading", minutes: 55 },
      { section: "Listening", minutes: 35 },
    ],
    passMark: "90 / 180 overall, with minimum section scores",
    materials: [
      { title: "Grammar patterns", desc: "Core patterns with examples and audio", href: "/resources/grammar", kind: "free" },
      { title: "Vocabulary by topic", desc: "Daily life, people, work, food", href: "/resources/vocabulary", kind: "free" },
      ...commonMaterials("N4"),
    ],
  },
  N3: {
    level: "N3",
    jp: "中級",
    tagline: "The bridge to real-world Japanese",
    overview:
      "N3 is where Japanese starts to feel natural. You'll follow near-natural speech, read notices and short articles, and express opinions with more complex grammar — a key level for work and study goals.",
    canDo: ["Follow conversations at near-natural speed", "Read newspaper headlines and simple articles", "Explain opinions and reasons in detail", "Use casual and polite speech appropriately"],
    vocab: "~3,750 words",
    kanji: "~650 kanji",
    studyHours: "Indicative 90 class hours + self-study",
    exam: [
      { section: "Language Knowledge (Vocabulary)", minutes: 30 },
      { section: "Language Knowledge (Grammar) · Reading", minutes: 70 },
      { section: "Listening", minutes: 40 },
    ],
    passMark: "95 / 180 overall, with minimum section scores",
    materials: [{ title: "Useful phrases", desc: "Polite and everyday expressions with audio", href: "/resources/phrases", kind: "free" }, ...commonMaterials("N3")],
  },
  N2: {
    level: "N2",
    jp: "中上級",
    tagline: "Japanese for work and study",
    overview:
      "N2 is the level many employers and universities look for. You'll read articles and reports, follow news and meetings, and communicate in a wide range of workplace situations.",
    canDo: ["Read articles, reports and commentary on general topics", "Follow news and conversations at natural speed", "Participate in meetings and business conversations", "Write clear emails and short reports"],
    vocab: "~6,000 words",
    kanji: "~1,000 kanji",
    studyHours: "Indicative 120 class hours + self-study",
    exam: [
      { section: "Language Knowledge (Vocabulary · Grammar) · Reading", minutes: 105 },
      { section: "Listening", minutes: 50 },
    ],
    passMark: "90 / 180 overall, with minimum section scores",
    materials: [{ title: "Business Japanese course", desc: "Keigo, emails and meetings", href: "/business-japanese", kind: "free" }, ...commonMaterials("N2")],
  },
  N1: {
    level: "N1",
    jp: "上級",
    tagline: "Advanced, nuanced Japanese",
    overview:
      "N1 is the highest JLPT level. You'll understand complex, abstract writing and fast natural speech, and grasp nuance, implication and formal register.",
    canDo: ["Read complex editorials and academic writing", "Understand lectures, news and debates in depth", "Grasp nuance, implication and logical structure", "Use formal and written Japanese accurately"],
    vocab: "~10,000 words",
    kanji: "~2,000 kanji",
    studyHours: "Indicative 150+ class hours + self-study",
    exam: [
      { section: "Language Knowledge (Vocabulary · Grammar) · Reading", minutes: 110 },
      { section: "Listening", minutes: 55 },
    ],
    passMark: "100 / 180 overall, with minimum section scores",
    materials: commonMaterials("N1"),
  },
};

type U = [string, [string, string, number][]];

const syllabus: Record<QuizLevel, U[]> = {
  N5: [
    ["Scripts & sounds", [["Hiragana part 1: あ–な rows", "The first 25 hiragana, vowel sounds and how Japanese syllables work.", 25], ["Hiragana part 2 & special sounds", "The remaining hiragana, dakuten (が), small っ and long vowels.", 30], ["Katakana & loanwords", "All katakana and how English words become Japanese.", 30]]],
    ["First conversations", [["はじめまして — self-introduction", "Introduce yourself: name, country, job, with です.", 25], ["これ・それ・あれ — this and that", "Pointing words, の for possession, asking “what is this?”.", 25], ["Numbers, time and prices", "Counting, telling the time and asking いくらですか.", 30]]],
    ["Daily life verbs", [["ます-form verbs", "Present, past and negative polite verbs for daily routines.", 30], ["Particles を・に・で・へ", "Objects, destinations, places of action and means.", 30], ["Adjectives い and な", "Describing people and things, positive and negative.", 25]]],
    ["Getting around", [["あります・います — existence", "Saying where things and people are.", 25], ["〜たいです and invitations", "Wanting to do things and inviting friends.", 25], ["N5 review & mock test", "Timed practice across vocabulary, grammar, reading and listening.", 45]]],
  ],
  N4: [
    ["Verb forms", [["て-form mastery", "Building て-form and using it to connect actions.", 30], ["Plain (dictionary) form", "Casual speech and the plain forms of verbs and adjectives.", 30], ["Potential form", "Saying what you can and can't do.", 25]]],
    ["Giving reasons & opinions", [["から・ので — because", "Giving reasons politely and casually.", 25], ["〜と思います", "Sharing opinions and guesses.", 25], ["〜たことがあります", "Talking about experiences.", 25]]],
    ["Requests & permission", [["〜てもいいですか・〜てはいけません", "Asking and giving permission.", 25], ["〜なければなりません", "Obligation and things you must do.", 25], ["Giving & receiving: あげる・もらう・くれる", "Who gives what to whom.", 30]]],
    ["Conditionals & review", [["〜たら・〜ば・〜と", "The three main conditionals and when to use each.", 35], ["Passive and causative basics", "Being done to, and making someone do something.", 35], ["N4 review & mock test", "Timed practice across all sections.", 50]]],
  ],
  N3: [
    ["Nuance in grammar", [["〜ように・〜ために", "Purpose with volitional and non-volitional verbs.", 30], ["〜ばかり・〜ところ", "Just did, about to do, only doing.", 30], ["〜せいで・〜おかげで", "Positive and negative causes.", 25]]],
    ["Reading real Japanese", [["Notices and signs", "Understanding everyday written information.", 30], ["Short articles", "Skimming and scanning newspaper-style texts.", 35], ["Emails and messages", "Reading and replying to polite messages.", 30]]],
    ["Listening at natural speed", [["Task-based listening", "Getting the key information from conversations.", 30], ["Casual speech patterns", "Contractions and how Japanese is really spoken.", 30], ["Keigo in listening", "Recognising respectful and humble speech.", 30]]],
    ["Exam strategy", [["Vocabulary in context", "Choosing words by nuance and collocation.", 30], ["Timed reading strategy", "Managing time across reading tasks.", 35], ["N3 review & mock test", "Full timed practice with feedback.", 55]]],
  ],
  N2: [
    ["Advanced grammar", [["〜にわたって・〜をめぐって", "Formal grammar for scope and dispute.", 30], ["〜に反して・〜に基づいて", "Contrast and basis in formal writing.", 30], ["〜からすれば・〜にしろ", "Viewpoint and concession patterns.", 30]]],
    ["Workplace Japanese", [["Business keigo", "尊敬語 and 謙譲語 in real workplace situations.", 35], ["Emails and reports", "Structure and set phrases for business writing.", 35], ["Meetings and calls", "Participating, agreeing and disagreeing politely.", 35]]],
    ["Reading & listening", [["Opinion articles", "Following an argument and the writer's view.", 35], ["News listening", "Understanding news at natural speed.", 35], ["Integrated comprehension", "Comparing two texts on the same topic.", 35]]],
    ["Exam preparation", [["Kanji and vocabulary drills", "High-frequency N2 kanji compounds.", 30], ["Timed full sections", "Section-by-section timed practice.", 45], ["N2 review & mock test", "Full mock test with analysis.", 60]]],
  ],
  N1: [
    ["Literary & formal grammar", [["〜をよそに・〜を皮切りに", "Advanced connective expressions.", 35], ["〜といえども・〜ならでは", "Concession and uniqueness.", 35], ["〜をもって・〜なくしては", "Means, timing and necessity.", 35]]],
    ["Complex reading", [["Editorials and essays", "Abstract argument and implication.", 40], ["Academic texts", "Logical structure and technical vocabulary.", 40], ["Literature excerpts", "Nuance, style and register.", 40]]],
    ["Advanced listening", [["Lectures and talks", "Note-taking and main-point extraction.", 40], ["Debates and discussions", "Following multiple speakers and positions.", 40], ["Implied meaning", "What speakers mean but don't say.", 35]]],
    ["Exam mastery", [["N1 vocabulary nuance", "Near-synonyms and formal expressions.", 35], ["Speed reading strategy", "Finishing long passages in time.", 40], ["N1 review & mock test", "Full mock test with detailed feedback.", 70]]],
  ],
};

const freeNotes: Record<QuizLevel, string> = {
  N5: `## What you'll learn
The first five rows of hiragana (25 characters) and the five vowel sounds that every Japanese syllable is built on.

## The five vowels
あ (a) · い (i) · う (u) · え (e) · お (o) — short and clear, like "ah, ee, oo, eh, oh".

## Rows in this lesson
- あ row: あ い う え お
- か row: か き く け こ
- さ row: さ し す せ そ (note: し = shi)
- た row: た ち つ て と (note: ち = chi, つ = tsu)
- な row: な に ぬ ね の

## Practice
1. Write each row five times, saying it aloud.
2. Read these words: あい (love), いえ (house), かさ (umbrella), ねこ (cat), すし (sushi).
3. Use the hiragana chart on this site and tap each character to check your pronunciation.

## Tip
Learn one row a day and review the previous rows before starting a new one.`,
  N4: `## What you'll learn
How to make the て-form of any verb and use it to connect actions: "I woke up, ate breakfast and went to work."

## The rules
- う・つ・る verbs → って: かう → かって, まつ → まって, とる → とって
- む・ぶ・ぬ verbs → んで: のむ → のんで, あそぶ → あそんで
- く → いて, ぐ → いで: かく → かいて, およぐ → およいで
- す → して: はなす → はなして
- る-verbs → drop る + て: たべる → たべて
- Irregular: する → して, くる → きて, いく → いって

## Connecting actions
あさ おきて、ごはんを たべて、かいしゃへ いきました。
(I got up in the morning, ate, and went to the office.)

## Practice
Make the て-form: よむ, まつ, みる, いく, べんきょうする.`,
  N3: `## What you'll learn
The difference between 〜ように and 〜ために — both mean "so that / in order to".

## The key rule
- ために: the verb is something you **control** (volitional).
  日本で働くために、日本語を勉強しています。
- ように: the verb is something you **can't directly control** (non-volitional, potential, negative).
  日本語が話せるように、毎日練習しています。
  忘れないように、メモします。

## Quick check
- 上手に なる → ように (you can't force "becoming good")
- 留学する → ために (a deliberate action)

## Practice
Choose ように or ために:
1. 試験に合格する___、毎日勉強する。
2. 風邪をひかない___、手を洗う。`,
  N2: `## What you'll learn
Two formal grammar patterns common in news and reports: 〜にわたって (over a span) and 〜をめぐって (concerning / over a dispute).

## 〜にわたって
Used with time or space to show the whole extent.
3日間にわたって会議が行われた。 — The meeting was held over three days.

## 〜をめぐって
Used when there is debate or conflict about something.
新しい法律をめぐって、議論が続いている。 — Debate continues over the new law.

## Common mistakes
Don't use をめぐって for simple "about" — use について there.

## Practice
Complete: 全国___、雨が降った。 / 予算___、意見が分かれた。`,
  N1: `## What you'll learn
〜をよそに (ignoring, in disregard of) and 〜を皮切りに (starting with) — two expressions you'll meet in N1 reading.

## 〜をよそに
Doing something while ignoring others' feelings or a situation.
親の心配をよそに、彼は一人で旅に出た。

## 〜を皮切りに
The first in a series of events.
東京公演を皮切りに、全国ツアーが始まる。

## Nuance
をよそに has a slightly critical tone; を皮切りに is neutral and common in news.

## Practice
Write one sentence with each pattern about your own life or work.`,
};

// Every lesson gets real study notes: the 5 unit-opener lessons have hand-written notes above;
// every other lesson gets notes built from its own title and summary, so nothing is empty.
function autoNotes(level: QuizLevel, unitTitle: string, title: string, summary: string): string {
  const hasJp = /[぀-ヿ一-龯]/.test(title);
  return `## What this lesson covers
${summary}

## Focus point
${hasJp ? `**${title}**` : title} — part of *${unitTitle}* in the JLPT ${level} syllabus.

## How to study this lesson
1. Listen to the lecture above (or read this page) once all the way through without pausing.
2. Go through it again, saying each Japanese example out loud.
3. Close the page and try to explain the point in your own words.
4. Test yourself with the ${level} practice quiz for this unit.

## Practice
Write two of your own example sentences using today's point, then check them with your teacher in the next live class or the Speaking Lab.`;
}

export const lessonSeeds: LessonSeed[] = (Object.keys(syllabus) as QuizLevel[]).flatMap((level) =>
  syllabus[level].flatMap(([unitTitle, lessons], ui) =>
    lessons.map(([title, summary, durationMin], li) => {
      const first = ui === 0 && li === 0;
      return {
        id: `${level.toLowerCase()}-u${ui + 1}-l${li + 1}`,
        level,
        unit: ui + 1,
        unitTitle,
        sort: li,
        title,
        summary,
        durationMin,
        isFree: first,
        notes: first ? freeNotes[level] : autoNotes(level, unitTitle, title, summary),
      };
    })
  )
);
