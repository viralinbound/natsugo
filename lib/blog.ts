import { images } from "@/lib/site";

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface ArticleBody {
  image: string;
  readMinutes: number;
  takeaways: string[];
  sections: ArticleSection[];
  faqs: { q: string; a: string }[];
  // The test and course the end-of-article panel points to.
  next: { test: { label: string; href: string }; course: { label: string; href: string }; line: string };
}

type Draft = Omit<ArticleBody, "readMinutes">;

const drafts: Record<string, Draft> = {
  "how-to-learn-japanese-from-scratch": {
    image: images.writing,
    takeaways: [
      "Learn hiragana and katakana first — most learners manage both in three to four weeks.",
      "Start making simple sentences in week one instead of waiting to “know enough”.",
      "Learn kanji inside words you already know, not as isolated characters.",
      "Short daily practice and regular feedback from a teacher matter more than long weekend sessions.",
    ],
    sections: [
      { heading: "Start with the sounds", paragraphs: ["Japanese has only five vowel sounds — a, i, u, e, o — and almost every syllable is a consonant followed by one of them. Once you can say か き く け こ (ka ki ku ke ko), you can already pronounce a large part of the language.", "There are a few sounds to listen for: the small っ that doubles a consonant (きって, kitte = stamp), long vowels (おばさん aunt vs おばあさん grandmother), and the ん sound. Getting these right early saves you from habits that are hard to fix later."] },
      { heading: "Learn the two kana scripts", paragraphs: ["Hiragana (46 basic characters) is used for native words and grammar endings. Katakana (another 46) is used for loanwords such as コーヒー (coffee) and テレビ (television). Together they let you read everything in a beginner textbook.", "Learn them a row at a time — the あ row, the か row and so on — and read real words straight away rather than drilling characters alone."], list: ["Week 1: hiragana あ to な rows", "Week 2: hiragana は to ん rows, plus voiced sounds (が, ざ, だ, ば, ぱ)", "Week 3: katakana, using loanwords you already know", "Week 4: reading short sentences in both scripts"] },
      { heading: "Build sentences early", paragraphs: ["Don't wait until you have memorised hundreds of words. A handful of patterns lets you start speaking in your first week, and using words in sentences is what makes them stick."], list: ["わたしは がくせいです。— I am a student.", "これは ほんです。— This is a book.", "コーヒーを のみます。— I drink coffee.", "えきは どこですか。— Where is the station?"] },
      { heading: "Pick up particles one at a time", paragraphs: ["Particles are short words that mark the role of each part of a sentence. は marks the topic, を the object, に the time or destination, and で the place where something happens. Learn each one with two or three example sentences and you will recognise the pattern quickly."] },
      { heading: "Add kanji gradually", paragraphs: ["Kanji look intimidating, but JLPT N5 needs only around 100 of them. Learn each kanji as part of a word — 日 in 日本 (Japan) and 日曜日 (Sunday) — so you learn reading, meaning and use together.", "Five new kanji a day, reviewed the next day and again a week later, will cover N5 in about a month."] },
      { heading: "Make a simple daily routine", paragraphs: ["Consistency beats intensity. Thirty minutes every day is far more effective than three hours once a week, because memory is built through repeated review."], list: ["10 minutes: review yesterday's words with flashcards", "10 minutes: one grammar point with example sentences", "5 minutes: listen to a short audio clip and repeat it aloud", "5 minutes: write three sentences about your day"] },
      { heading: "Get feedback early", paragraphs: ["Apps are good for vocabulary, but speaking and grammar improve fastest with someone who can correct you. A live class gives you a reason to speak, a teacher who hears your mistakes, and classmates at the same level.", "A level test is a quick way to find where to start, so you don't repeat what you already know or skip something important."] },
    ],
    faqs: [
      { q: "Should I learn romaji first?", a: "Use romaji only for the first few days to get the sounds. Move to hiragana quickly — relying on romaji slows your reading later." },
      { q: "Can I learn Japanese without a teacher?", a: "You can learn to read and build vocabulary alone, but most learners need a teacher for speaking practice and to catch grammar mistakes." },
    ],
    next: { test: { label: "Take the beginner test", href: "/free-test/beginner/words" }, course: { label: "Japanese for Beginners", href: "/japanese-for-beginners" }, line: "Check what you already know in five minutes, then start from the right place." },
  },
  "how-long-does-it-take-to-learn-japanese": {
    image: images.books,
    takeaways: [
      "Your goal decides the timeline — travel basics take weeks, business Japanese takes years.",
      "JLPT levels are a useful yardstick: N5 in a few months, N3 in about one to one and a half years.",
      "Daily study hours matter more than the total number of months.",
      "Plan for plateaus around N4 and N2; they are normal, not a sign you are failing.",
    ],
    sections: [
      { heading: "It depends on your goal", paragraphs: ["“Learning Japanese” can mean ordering food on holiday, passing a job interview, or reading a contract. Each needs a very different amount of time, so define your goal first.", "A JLPT level gives you a clear target. Many employers and universities ask for N3 or N2, while N5 and N4 are enough for everyday travel and basic conversation."] },
      { heading: "Rough timelines by level", paragraphs: ["These are broad guides for a learner studying regularly. They vary a lot with study hours, prior language experience and consistency:"], list: ["N5: about 3–5 months", "N4: another 4–6 months", "N3: about 1–1.5 years from zero", "N2: about 2–3 years from zero", "N1: often 3–5 years or more"] },
      { heading: "Hours matter more than months", paragraphs: ["A learner doing one hour a day will move roughly twice as fast as someone doing three hours a week. If you can only study on weekends, split it into several short sessions rather than one long block.", "Time spent using the language — speaking in class, reading short texts, listening — counts for more than time spent only re-reading notes."] },
      { heading: "What speeds you up", paragraphs: [], list: ["Daily vocabulary review with spaced repetition", "Speaking practice from the first month, not after grammar is “finished”", "Learning kanji inside words rather than as single characters", "Regular mock tests so you know exactly what to work on", "A teacher or study group that keeps you accountable"] },
      { heading: "What slows you down", paragraphs: [], list: ["Long gaps between study sessions", "Switching textbooks or apps every few weeks", "Avoiding listening because it feels hard", "Only reading romaji instead of kana"] },
      { heading: "Expect plateaus", paragraphs: ["Most learners hit a plateau around N4, when the easy wins run out and grammar gets more nuanced, and again around N2, when vocabulary needs grow quickly. Changing how you practise — more reading, more speaking, new topics — usually breaks the plateau."] },
    ],
    faqs: [
      { q: "Can I reach N5 in three months?", a: "Yes, with about an hour of focused study a day. A structured course with weekly classes makes this much easier to keep up." },
      { q: "Is N3 enough to work in Japan?", a: "Some roles accept N3, especially technical ones, but many employers prefer N2. Check the requirements for the specific job or visa programme." },
    ],
    next: { test: { label: "Take the free level test", href: "/level-test" }, course: { label: "JLPT Preparation", href: "/jlpt-japanese-preparation-course" }, line: "Find your level now and see how far you are from your target." },
  },
  "is-japanese-difficult-to-learn": {
    image: images.kyoto,
    takeaways: [
      "Pronunciation and basic grammar are easier than most people expect.",
      "Kanji and politeness levels (keigo) take the most time.",
      "Sentence order in Japanese is close to Hindi and many other Indian languages.",
      "With a clear plan, most learners can hold simple conversations within a few months.",
    ],
    sections: [
      { heading: "What's easier than you think", paragraphs: ["Japanese pronunciation is regular: words are read the way they are written in kana, and there are only five vowels. There is no grammatical gender, most nouns have no plural form, and verbs don't change for I, you or he.", "Numbers, dates and counting follow simple, logical patterns once you learn the base words."] },
      { heading: "What takes time", paragraphs: ["Kanji are the biggest investment. Each has a meaning and usually two or more readings, and a fluent reader knows around 2,000.", "Keigo — the polite and humble forms used at work and with strangers — also takes practice, because you choose different verbs depending on who you are talking to."] },
      { heading: "An advantage for Indian learners", paragraphs: ["Japanese puts the verb at the end of the sentence, just like Hindi, Marathi, Tamil, Bengali and many other Indian languages. It also uses particles after words, much like postpositions such as को, में and से.", "Compare: 私は 学校に 行きます (watashi wa gakkō ni ikimasu) and मैं स्कूल को जाता हूँ — the order is almost identical. Many Indian learners find Japanese sentences feel surprisingly natural."] },
      { heading: "Common myths", paragraphs: [], list: ["“You need to know all the kanji to read anything.” — Beginner materials use kana with a small set of kanji.", "“Japanese grammar is chaotic.” — Verb conjugation is very regular; there are only two truly irregular verbs, する and くる.", "“You must live in Japan to become fluent.” — Many learners reach N2 or N1 from India with consistent study and practice."] },
      { heading: "How to make it easier", paragraphs: [], list: ["Learn kana properly before moving on", "Study kanji in words you already use", "Practise speaking from the first weeks", "Use short daily sessions instead of occasional long ones", "Get regular correction from a teacher"] },
    ],
    faqs: [
      { q: "Is Japanese harder than Chinese?", a: "Japanese has more grammar endings, while Chinese has tones. Most learners find Japanese pronunciation easier and its writing system harder." },
      { q: "Is Japanese harder than English for Indian students?", a: "It is different rather than harder. The script takes time, but sentence order is often easier for speakers of Indian languages." },
    ],
    next: { test: { label: "Try the free Japanese test", href: "/free-test/japanese/starter" }, course: { label: "Japanese Courses", href: "/learn-japanese-language-course" }, line: "See for yourself — ten quick questions for complete beginners." },
  },
  "what-is-jlpt": {
    image: images.lecture,
    takeaways: [
      "The JLPT is the main Japanese test for non-native speakers, with five levels from N5 to N1.",
      "It tests vocabulary, kanji, grammar, reading and listening — not speaking or writing.",
      "In India it is usually held twice a year, in July and December.",
      "Employers, universities and some visa programmes use JLPT results as evidence of ability.",
    ],
    sections: [
      { heading: "The Japanese-Language Proficiency Test", paragraphs: ["The JLPT is a standardised test for non-native speakers, run by the Japan Foundation and Japan Educational Exchanges and Services (JEES). It is taken by over a million people each year around the world.", "There are five levels. N5 is the easiest and covers basic everyday Japanese; N1 is the hardest and covers the language of newspapers, academic texts and business."] },
      { heading: "The five levels at a glance", paragraphs: [], list: ["N5 — basic phrases, hiragana, katakana and about 100 kanji", "N4 — everyday conversations and about 300 kanji", "N3 — the bridge to real-world Japanese, about 650 kanji", "N2 — workplace and news-level Japanese, about 1,000 kanji", "N1 — advanced and formal Japanese, about 2,000 kanji"] },
      { heading: "What it tests", paragraphs: ["Every level has three parts: language knowledge (vocabulary, kanji and grammar), reading, and listening. All questions are multiple choice.", "The JLPT does not test speaking or writing. That is why separate speaking practice matters — many learners pass N3 but still find conversation difficult."] },
      { heading: "Scoring and passing", paragraphs: ["You need both an overall pass mark and a minimum score in each section. A very strong reading score cannot make up for a very weak listening score, so prepare all sections evenly."] },
      { heading: "When is it held in India?", paragraphs: ["In India the JLPT is usually held twice a year, on the first Sunday of July and December, in several cities including New Delhi, Mumbai, Bengaluru, Chennai, Kolkata and Pune. Registration typically opens a few months before each test.", "Always check the official JLPT website and the local organiser for current dates, fees and centres."] },
      { heading: "Why take it", paragraphs: ["JLPT results are widely used by universities, employers and some immigration programmes as evidence of Japanese ability. N2 is often requested for office jobs in Japan, and some scholarships ask for N3 or above. Requirements vary, so check with the specific institution."] },
    ],
    faqs: [
      { q: "Do I have to take N5 before N4?", a: "No. You can register for any level directly. Choose the level that matches your current ability." },
      { q: "Does the JLPT certificate expire?", a: "No, it does not expire, although some employers prefer a recent result." },
    ],
    next: { test: { label: "Take a JLPT practice quiz", href: "/jlpt-quiz" }, course: { label: "JLPT Preparation", href: "/jlpt-japanese-preparation-course" }, line: "Practise with exam-style questions for every level, N5 to N1." },
  },
  "jlpt-n5-preparation-guide": {
    image: images.writing,
    takeaways: [
      "N5 covers kana, about 100 kanji, roughly 800 words and core grammar.",
      "A focused learner can prepare in three to four months.",
      "Listening is where most N5 candidates lose marks — practise it from the start.",
      "Take at least two timed mock tests before the exam.",
    ],
    sections: [
      { heading: "What N5 covers", paragraphs: ["N5 tests basic Japanese: hiragana, katakana, around 100 kanji, roughly 800 words, and core grammar such as です and ます forms, the main particles, and basic verb and adjective forms.", "You should be able to read short, simple texts about daily life and understand slow, clear conversations in familiar situations."] },
      { heading: "A 14-week study plan", paragraphs: [], list: ["Weeks 1–3: hiragana and katakana until you can read both fluently", "Weeks 4–6: です/ます sentences, the particles は, が, を, に, で, and numbers", "Weeks 7–9: verb groups, て-form, past and negative forms", "Weeks 10–11: the N5 kanji list, learned inside vocabulary", "Weeks 12–13: reading practice with short notices and messages", "Week 14: two timed mock tests and a final review of weak areas"] },
      { heading: "Vocabulary that comes up again and again", paragraphs: ["Focus on everyday topics: family, food, time and dates, transport, shopping, weather and school. Learn words in small groups — days of the week together, family members together — so they support each other."] },
      { heading: "Don't skip listening", paragraphs: ["Many learners focus on reading and lose marks in listening. Practise with exam-format audio from the start: listen once without the script, then again with it, then shadow it aloud.", "In the exam you hear each item only once, so practise making a choice quickly and moving on."] },
      { heading: "On exam day", paragraphs: [], list: ["Bring your admission voucher, photo ID and HB pencils", "Answer every question — there is no penalty for guessing", "Don't spend too long on one reading question; come back to it", "In listening, read the answer choices before the audio starts when you can"] },
    ],
    faqs: [
      { q: "How many hours do I need for N5?", a: "Most learners need around 150 hours of study, which is about one hour a day for five months." },
      { q: "Is N5 useful on its own?", a: "N5 shows you have a solid foundation. It is a great first goal and the base for N4 and N3, which carry more weight with employers." },
    ],
    next: { test: { label: "Take the free N5 test", href: "/jlpt-quiz/n5/full" }, course: { label: "JLPT N5 course", href: "/jlpt-n5" }, line: "Ten exam-style N5 questions with an explanation for every answer." },
  },
  "japanese-grammar-for-beginners": {
    image: images.books,
    takeaways: [
      "The basic Japanese sentence order is subject – object – verb.",
      "です and ます make sentences polite and are the forms beginners learn first.",
      "Verbs fall into three groups, and only する and くる are irregular.",
      "Learn each pattern with two or three example sentences you can say aloud.",
    ],
    sections: [
      { heading: "Sentence order: the verb comes last", paragraphs: ["In Japanese the verb goes at the end: 私は りんごを 食べます (I apple eat). Words before the verb can move around because particles show what each word is doing.", "This is very close to the order of Hindi and many other Indian languages, which gives Indian learners a head start."] },
      { heading: "X は Y です — the first pattern", paragraphs: ["This pattern means “X is Y” and covers a surprising amount of everyday talk."], list: ["私は インド人です。— I am Indian.", "これは 私の かばんです。— This is my bag.", "今日は 月曜日です。— Today is Monday.", "Negative: 私は 先生では ありません。— I am not a teacher."] },
      { heading: "Polite verbs with ます", paragraphs: ["Beginners learn the polite ます form first because it is safe to use with anyone. It changes in a regular way:"], list: ["食べます — eat / will eat", "食べません — don't eat", "食べました — ate", "食べませんでした — didn't eat", "食べましょう — let's eat"] },
      { heading: "The three verb groups", paragraphs: ["Group 1 (u-verbs) like 書く and 飲む change their last sound. Group 2 (ru-verbs) like 食べる and 見る simply drop る. Group 3 has only two verbs: する (do) and くる (come). Knowing the group tells you how every form is made."] },
      { heading: "Two kinds of adjectives", paragraphs: ["い-adjectives end in い and change form themselves: 高い (expensive) → 高くない (not expensive) → 高かった (was expensive). な-adjectives work more like nouns: 静かな 部屋 (a quiet room), 静かでした (was quiet)."] },
      { heading: "Asking questions", paragraphs: ["Add か to the end of a polite sentence to make a question: 学生ですか (Are you a student?). Question words go where the answer would go: これは 何ですか (What is this?), 駅は どこですか (Where is the station?)."] },
      { heading: "The て-form", paragraphs: ["The て-form is the most useful verb form after ます. It joins actions (起きて、食べて、出かけます — I get up, eat and go out), makes requests (見て ください — please look) and builds the progressive (読んで います — I am reading)."] },
    ],
    faqs: [
      { q: "Should I learn plain forms or polite forms first?", a: "Start with polite forms (です and ます) so you can speak to anyone, then add plain forms around the N4 level." },
      { q: "How many grammar points are on N5?", a: "Around 80–100 patterns. Many are small variations of the core forms in this article." },
    ],
    next: { test: { label: "Take the grammar test", href: "/free-test/grammar/basic" }, course: { label: "Japanese Grammar course", href: "/japanese-grammar-course" }, line: "Ten grammar questions on the patterns in this article." },
  },
  "japanese-particles-explained": {
    image: images.online,
    takeaways: [
      "Particles come after a word and show its role in the sentence.",
      "は marks the topic, が often marks new information or the subject.",
      "を marks the object; に marks time, destination and existence; で marks where an action happens.",
      "Learn particles through example sentences, not as rules alone.",
    ],
    sections: [
      { heading: "What particles do", paragraphs: ["Particles are short words placed after a noun to show its role. They work much like the postpositions को, में and से in Hindi. Because particles carry the meaning, word order in Japanese can be flexible."] },
      { heading: "は — the topic", paragraphs: ["は (pronounced “wa”) sets the topic: “as for X …”. 私は 学生です — As for me, I am a student. It also shows contrast: 肉は 食べますが、魚は 食べません — I eat meat, but (as for fish) I don't eat fish."] },
      { heading: "が — the subject and new information", paragraphs: ["が marks the subject, often when the information is new or is the focus. 誰が 来ましたか — Who came? 田中さんが 来ました — Tanaka-san came. It is also used with words like 好き, 分かる and ある: 猫が 好きです — I like cats."] },
      { heading: "を — the object", paragraphs: ["を (pronounced “o”) marks the direct object of an action. 本を 読みます — I read a book. コーヒーを 飲みます — I drink coffee."] },
      { heading: "に — time, destination, existence", paragraphs: [], list: ["Time: 7時に 起きます — I get up at 7.", "Destination: 学校に 行きます — I go to school.", "Existence: 部屋に 猫が います — There is a cat in the room.", "Recipient: 友達に 手紙を 書きます — I write a letter to a friend."] },
      { heading: "で — place of action and means", paragraphs: ["で marks where an action happens and the means of doing it. 図書館で 勉強します — I study at the library. バスで 行きます — I go by bus. 日本語で 話します — I speak in Japanese."] },
      { heading: "Other particles you will meet early", paragraphs: [], list: ["の — possession: 私の 本 (my book)", "と — and / with: 友達と 行きます (go with a friend)", "も — also: 私も 学生です (I'm a student too)", "へ — direction: 日本へ 行きます (go towards Japan)", "から / まで — from / until: 9時から 5時まで"] },
      { heading: "Common mix-ups", paragraphs: ["に vs で: に is where something exists or where you go; で is where you do something. 公園に います (I'm in the park) but 公園で 遊びます (I play in the park).", "は vs が: start with the rule “は for the topic, が for the new information”, and refine it with lots of reading."] },
    ],
    faqs: [
      { q: "Why is は pronounced “wa”?", a: "It is a historical spelling. When は is used as a particle it is read “wa”; everywhere else it is “ha”." },
      { q: "Can I leave particles out?", a: "In casual speech people often drop は and を, but keep them in writing and polite speech until you are confident." },
    ],
    next: { test: { label: "Take the grammar test", href: "/free-test/grammar/basic" }, course: { label: "Japanese Grammar course", href: "/japanese-grammar-course" }, line: "Practise particles in real sentences, with explanations." },
  },
  "japanese-greetings": {
    image: images.sakura,
    takeaways: [
      "おはようございます, こんにちは and こんばんは cover morning, day and evening.",
      "Japanese has set phrases for leaving, coming home, eating and finishing work.",
      "Add ございます or です to sound more polite.",
      "A small bow usually goes with a greeting.",
    ],
    sections: [
      { heading: "Greetings through the day", paragraphs: [], list: ["おはようございます (ohayō gozaimasu) — good morning; with friends, just おはよう", "こんにちは (konnichiwa) — hello / good afternoon", "こんばんは (konbanwa) — good evening", "おやすみなさい (oyasuminasai) — good night, said before sleeping"] },
      { heading: "Meeting someone new", paragraphs: ["The standard self-introduction has three parts: はじめまして (nice to meet you), your name with です, and よろしく お願いします (please treat me kindly)."], list: ["はじめまして。リヤです。インドから 来ました。よろしく お願いします。", "— Nice to meet you. I'm Riya. I'm from India. Pleased to meet you."] },
      { heading: "Saying goodbye", paragraphs: ["さようなら is a fairly formal goodbye, often used when you won't see someone for a while. With friends, people say じゃあね or またね (see you). At work, you say お先に 失礼します when you leave before others."] },
      { heading: "Leaving and coming home", paragraphs: [], list: ["いってきます — I'm off (said by the person leaving)", "いってらっしゃい — see you later (said by the person staying)", "ただいま — I'm home", "おかえりなさい — welcome home"] },
      { heading: "At meals", paragraphs: ["Before eating, people say いただきます (I humbly receive). After the meal, ごちそうさまでした thanks the cook or host. Both are used at home, with friends and in restaurants."] },
      { heading: "Thanks and apologies", paragraphs: ["ありがとう is thank you; ありがとうございます is more polite. すみません means both “excuse me” and “I'm sorry”, and is one of the most useful words in Japan — use it to call a waiter, get past someone, or apologise for small things."] },
      { heading: "Bowing", paragraphs: ["A greeting usually comes with a small bow from the waist. A slight nod is fine with friends; a deeper bow shows more respect, for example when meeting a client or apologising."] },
    ],
    faqs: [
      { q: "Is こんにちは used in the morning?", a: "Not usually. Until around 10 or 11 a.m. people say おはようございます; after that, こんにちは." },
      { q: "Do Japanese people say さようなら to friends?", a: "Rarely. It sounds a bit final. Friends say じゃあね, またね or またあした." },
    ],
    next: { test: { label: "Take the greetings test", href: "/free-test/beginner/greetings" }, course: { label: "Japanese Speaking course", href: "/speak-japanese" }, line: "Ten quick questions on the greetings in this article." },
  },
  "japanese-vocabulary-for-beginners": {
    image: images.writing,
    takeaways: [
      "Start with high-frequency words grouped by everyday topic.",
      "Learn each word with an example sentence and its kanji when it's simple.",
      "Spaced-repetition review keeps words from slipping away.",
      "About 800 words is enough for JLPT N5.",
    ],
    sections: [
      { heading: "Start with the words you'll use most", paragraphs: ["A small number of words covers a large share of everyday Japanese. Begin with greetings, numbers, family, food, time and places — the topics you'll use in your first conversations."] },
      { heading: "People and family", paragraphs: [], list: ["わたし — I / me", "ともだち (友達) — friend", "せんせい (先生) — teacher", "かぞく (家族) — family", "ちち / はは — (my) father / mother", "おとうさん / おかあさん — (someone's) father / mother"] },
      { heading: "Food and drink", paragraphs: [], list: ["ごはん — rice / a meal", "みず (水) — water", "おちゃ (お茶) — tea", "パン — bread", "やさい (野菜) — vegetables", "くだもの (果物) — fruit"] },
      { heading: "Time and days", paragraphs: [], list: ["きょう (今日) — today", "あした (明日) — tomorrow", "きのう (昨日) — yesterday", "まいにち (毎日) — every day", "いま (今) — now", "げつようび (月曜日) — Monday"] },
      { heading: "Places", paragraphs: [], list: ["いえ (家) — house / home", "がっこう (学校) — school", "えき (駅) — station", "みせ (店) — shop", "びょういん (病院) — hospital", "トイレ — toilet"] },
      { heading: "Useful verbs", paragraphs: [], list: ["いきます (行きます) — go", "きます (来ます) — come", "たべます (食べます) — eat", "のみます (飲みます) — drink", "みます (見ます) — see / watch", "します — do"] },
      { heading: "How to make words stick", paragraphs: ["Review new words the next day, again after three days, and again after a week. Flashcard apps with spaced repetition do this for you.", "Always learn a word in a short sentence — みずを のみます (I drink water) — and say it aloud. You'll remember it faster and use it correctly."] },
    ],
    faqs: [
      { q: "How many words should I learn a day?", a: "Ten new words a day, with daily review, adds up to N5 vocabulary in about three months." },
      { q: "Should I learn kanji with vocabulary?", a: "Yes for simple, common kanji like 水 and 学校. For harder ones, learn the word in kana first and add the kanji later." },
    ],
    next: { test: { label: "Take the vocabulary test", href: "/free-test/vocabulary/basic" }, course: { label: "Japanese Vocabulary course", href: "/japanese-vocabulary-course" }, line: "Check how many everyday words you already know." },
  },
  "japanese-language-career-opportunities": {
    image: images.office,
    takeaways: [
      "Japanese is valued in IT, engineering, translation, tourism and customer support.",
      "Japanese companies in India hire for bilingual roles at many levels.",
      "N3 opens some doors; N2 and above opens most office roles.",
      "Pair Japanese with a technical or business skill for the strongest prospects.",
    ],
    sections: [
      { heading: "Why Japanese skills are in demand", paragraphs: ["Japan is one of India's largest investors, and hundreds of Japanese companies operate in India in automotive, electronics, IT and manufacturing. They need people who can work between Indian and Japanese teams.", "Japan also faces a shortage of workers in several industries and has programmes that welcome skilled foreign workers who speak Japanese."] },
      { heading: "Career paths", paragraphs: [], list: ["IT and software — bridge engineers and project coordinators between Indian and Japanese teams", "Engineering and manufacturing — technical communication at plants and with suppliers", "Translation and interpretation — documents, meetings, subtitles and manuals", "Tourism and hospitality — guides, hotel staff and travel desks", "Customer support — bilingual support for Japanese clients", "Teaching — Japanese language instruction in India"] },
      { heading: "Which JLPT level do employers ask for?", paragraphs: ["Requirements vary, but as a rough guide: N4–N3 for entry-level support and some technical roles, N2 for most office and bridge roles, and N1 for translation, interpretation and client-facing senior positions. A strong speaking ability matters as much as the certificate in interviews."] },
      { heading: "Working in Japan", paragraphs: ["Visa routes such as the Specified Skilled Worker programme and the Engineer/Specialist in Humanities visa allow foreign workers to live and work in Japan. Several of these require a minimum Japanese level, often N4 or above, and an industry skills test. Always check the current official requirements."] },
      { heading: "Skills that make you stand out", paragraphs: [], list: ["Business Japanese and keigo for emails and meetings", "Understanding of Japanese work culture: punctuality, reporting (報連相) and teamwork", "A technical skill — coding, engineering, accounting — combined with Japanese", "Confident speaking, not only a certificate"] },
    ],
    faqs: [
      { q: "Can I get a job with N5?", a: "N5 alone is rarely enough for a job, but it shows commitment. Most roles start from N4 or N3." },
      { q: "Do I need to move to Japan?", a: "No. Many roles are with Japanese companies in India, especially in Bengaluru, Chennai, Pune, Gurugram and Mumbai." },
    ],
    next: { test: { label: "Take the work-in-Japan test", href: "/free-test/work/workplace" }, course: { label: "Work in Japan", href: "/work-in-japan" }, line: "Ten questions on the Japanese you'll need at work." },
  },
};

// Reading time from the actual text, at about 200 words a minute.
const minutes = (d: Draft) => {
  const text = [...d.takeaways, ...d.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.list ?? [])]), ...d.faqs.flatMap((f) => [f.q, f.a])].join(" ");
  return Math.max(3, Math.round(text.split(/\s+/).length / 200));
};

export const articleBodies: Record<string, ArticleBody> = Object.fromEntries(
  Object.entries(drafts).map(([slug, d]) => [slug, { ...d, readMinutes: minutes(d) }]),
);
