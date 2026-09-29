import { images } from "@/lib/site";
import type { FAQItem, JLPTLevel } from "@/lib/types";

export interface CurriculumModule {
  title: string;
  points: string[];
}

export interface CourseDetail {
  slug: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  image: string;
  intro: string;
  level?: JLPTLevel;
  whoFor: string[];
  outcomes: string[];
  curriculum: CurriculumModule[];
  skills: { label: string; detail: string }[];
  duration: string;
  format: string;
  schedule: string;
  materials: string[];
  practice: string[];
  faqs: FAQItem[];
  related: string[];
}

const commonFaqs: FAQItem[] = [
  {
    question: "Is the certificate from this course an official JLPT certificate?",
    answer:
      "No. On completing a course you receive an institute course-completion certificate. The official JLPT certificate is issued only after you sit and pass the JLPT exam, which is conducted by the Japan Foundation and JEES.",
  },
  {
    question: "Can I attend a demo class before enrolling?",
    answer: "Yes. Book a free demo from the Free Demo page and our team will share the next available slot.",
  },
  {
    question: "What if I miss a class?",
    answer:
      "Class recordings and notes policies depend on the batch. Please confirm the current policy with admissions before enrolling.",
  },
];

export const courseDetails: CourseDetail[] = [
  {
    slug: "learn-japanese-language-course",
    navLabel: "Japanese Language Course",
    eyebrow: "All Japanese Courses",
    title: "Japanese Language Course — Online & in Bengaluru",
    metaTitle: "Learn Japanese Language Course | Online & Bengaluru",
    metaDescription:
      "Learn Japanese from N5 to N1 with Natsugo through live online classes, speaking practice, study materials and structured lessons for every level.",
    keywords: ["Learn Japanese Language Course", "Japanese Language Course Online", "Learn Japanese Online", "Japanese Course for Beginners", "Japanese Classes Online", "Japanese Course N5 to N1", "Japanese Language Classes in Bengaluru"],
    image: images.classroom,
    intro:
      "A complete Japanese programme that takes you from your first hiragana to confident, practical Japanese — with live teachers, speaking practice and regular progress checks at every level.",
    whoFor: [
      "Complete beginners with no Japanese knowledge",
      "Students planning higher studies or exchange programmes in Japan",
      "IT and engineering professionals working with Japanese clients",
      "Anyone preparing for a JLPT level",
    ],
    outcomes: [
      "A clear level-by-level path from N5 to N1",
      "Reading and writing hiragana, katakana and kanji for your level",
      "Practical conversation for daily life and the workplace",
      "Readiness to attempt the JLPT at your target level",
    ],
    curriculum: [
      { title: "Foundation (N5)", points: ["Hiragana & katakana", "Basic sentence patterns", "Self-introduction and greetings"] },
      { title: "Elementary (N4)", points: ["Verb forms", "Everyday conversation", "Short reading passages"] },
      { title: "Intermediate (N3)", points: ["Complex sentence structures", "Natural-speed listening", "Workplace basics"] },
      { title: "Upper levels (N2–N1)", points: ["Advanced grammar", "Articles and reports", "Formal and business Japanese"] },
    ],
    skills: [
      { label: "Speaking", detail: "Guided conversation in every class" },
      { label: "Listening", detail: "Audio practice at natural speed" },
      { label: "Reading", detail: "Graded reading at each level" },
      { label: "Writing", detail: "Kana and kanji writing practice" },
    ],
    duration: "Varies by level (indicative 60–150 hours per level)",
    format: "Live online · Offline in Bengaluru",
    schedule: "Weekday evening and weekend batches",
    materials: ["Level-wise textbook guidance", "Class notes and worksheets", "Vocabulary and kanji lists"],
    practice: ["Weekly quizzes", "Speaking tasks", "End-of-level mock test"],
    faqs: commonFaqs,
    related: ["japanese-for-beginners", "jlpt-japanese-preparation-course", "speak-japanese"],
  },
  {
    slug: "japanese-for-beginners",
    navLabel: "Japanese for Beginners",
    eyebrow: "Start from Zero",
    title: "Japanese for Beginners",
    metaTitle: "Japanese for Beginners | Easy Online Course",
    metaDescription:
      "Learn Japanese from zero with Natsugo. Join live online classes, learn hiragana, katakana, basic kanji, speaking and everyday Japanese with a free demo.",
    keywords: ["Japanese for Beginners", "Japanese Course for Beginners", "Learn Japanese Online for Beginners", "Japanese Classes for Beginners", "Beginner Japanese Course Online", "Learn Japanese from Zero", "Basic Japanese Course Online"],
    image: images.writing,
    level: "N5",
    intro:
      "No prior knowledge needed. In your first weeks you'll learn to read both Japanese scripts, introduce yourself and handle simple everyday conversations.",
    whoFor: [
      "Absolute beginners",
      "Anime, culture and travel enthusiasts who want a proper foundation",
      "Students and professionals testing whether Japanese is right for them",
    ],
    outcomes: [
      "Read and write all 46 hiragana and 46 katakana",
      "Introduce yourself and talk about your day",
      "Count, tell the time and ask for directions",
      "A solid base for JLPT N5",
    ],
    curriculum: [
      { title: "Weeks 1–3: Scripts", points: ["Hiragana with stroke order", "Katakana and loanwords", "Pronunciation basics"] },
      { title: "Weeks 4–8: First conversations", points: ["です / ます sentences", "Particles は, が, を, に", "Numbers, time, dates"] },
      { title: "Weeks 9–12: Everyday Japanese", points: ["Shopping and ordering food", "Describing things with adjectives", "First 50 kanji"] },
    ],
    skills: [
      { label: "Kana", detail: "Both scripts mastered in the first month" },
      { label: "Speaking", detail: "Speak from the very first class" },
      { label: "Listening", detail: "Slow, clear classroom audio" },
      { label: "Kanji", detail: "Your first basic kanji" },
    ],
    duration: "Indicative 60 hours",
    format: "Live online · Offline in Bengaluru",
    schedule: "3 classes a week (weekday) or 2 longer classes (weekend)",
    materials: ["Kana charts and practice sheets", "Beginner vocabulary list", "Audio for pronunciation"],
    practice: ["Kana quizzes", "Roleplay activities", "Level check at the end"],
    faqs: [
      { question: "Do I need to know anything before joining?", answer: "No. The beginner course starts from the Japanese writing systems." },
      ...commonFaqs,
    ],
    related: ["jlpt-n5", "speak-japanese", "learn-japanese-language-course"],
  },
  {
    slug: "speak-japanese",
    navLabel: "Japanese Speaking",
    eyebrow: "Speaking Lab",
    title: "Japanese Speaking Course",
    metaTitle: "Speak Japanese Language | Live Speaking Course",
    metaDescription:
      "Speak Japanese with confidence through Natsugo's live online course. Practice real conversations, pronunciation, workplace Japanese and interviews.",
    keywords: ["Speak Japanese Language", "Japanese Speaking Course Online", "Learn to Speak Japanese Online", "Japanese Speaking Classes", "Japanese Conversation Course", "Japanese Speaking Practice", "Live Japanese Speaking Classes"],
    image: images.onlinePair,
    intro:
      "Most learners can read more than they can say. The Speaking Lab closes that gap with focused, teacher-led conversation practice — daily situations, the workplace and interviews.",
    whoFor: [
      "Learners at N5 and above who want to speak more fluently",
      "Professionals preparing for Japanese interviews or client calls",
      "JLPT passers who want practical conversation skills",
    ],
    outcomes: [
      "Hold natural conversations on familiar topics",
      "Clearer pronunciation, pitch and rhythm",
      "Confidence in self-introductions and interviews",
      "Appropriate polite and casual speech",
    ],
    curriculum: [
      { title: "Daily situations", points: ["Restaurants, stations, shops", "Small talk", "Asking for help"] },
      { title: "Workplace Japanese", points: ["Meetings and phone calls", "Keigo basics", "Reporting and requests"] },
      { title: "Interview practice", points: ["自己紹介 (self-introduction)", "Common interview questions", "Mock interviews with feedback"] },
    ],
    skills: [
      { label: "Fluency", detail: "Lots of speaking time per session" },
      { label: "Pronunciation", detail: "Pitch accent and rhythm" },
      { label: "Listening", detail: "Real-speed dialogue" },
      { label: "Keigo", detail: "Polite and business speech" },
    ],
    duration: "Indicative 40 hours",
    format: "Live online",
    schedule: "2 evening sessions per week",
    materials: ["Situation scripts", "Useful-phrase sheets", "Recorded model dialogues"],
    practice: ["Roleplays each class", "Recorded speaking tasks", "Mock interview"],
    faqs: [
      { question: "What level do I need?", answer: "You should be comfortable with hiragana and basic N5 grammar." },
      ...commonFaqs,
    ],
    related: ["business-japanese", "jlpt-n4", "japanese-for-beginners"],
  },
  {
    slug: "business-japanese",
    navLabel: "Business Japanese",
    eyebrow: "For Professionals",
    title: "Business Japanese for Professionals",
    metaTitle: "Business Japanese | Professional Japanese Course",
    metaDescription:
      "Learn Business Japanese with Natsugo. Master keigo, business emails, meetings, calls and workplace etiquette through live online classes for professionals.",
    keywords: ["Business Japanese", "Business Japanese Course", "Business Japanese Course Online", "Japanese for Professionals", "Japanese for Workplace", "Business Japanese Classes Online", "Japanese Keigo Course"],
    image: images.office,
    intro:
      "For professionals who work with Japanese teams or clients. Learn the language and etiquette of the Japanese workplace — from keigo to emails to meetings.",
    whoFor: [
      "IT, engineering and consulting professionals with Japanese clients",
      "Learners at around N4 level or above",
      "Corporate teams (group training available on request)",
    ],
    outcomes: [
      "Use 尊敬語, 謙譲語 and 丁寧語 appropriately",
      "Write clear business emails",
      "Participate in meetings and calls",
      "Understand Japanese workplace etiquette",
    ],
    curriculum: [
      { title: "Keigo", points: ["Respectful and humble forms", "Common business set phrases"] },
      { title: "Written communication", points: ["Email structure", "Reports and chat etiquette"] },
      { title: "Spoken communication", points: ["Phone calls", "Meetings and presentations", "Client interactions"] },
    ],
    skills: [
      { label: "Keigo", detail: "Formal speech in context" },
      { label: "Email", detail: "Real-world templates" },
      { label: "Meetings", detail: "Roleplay practice" },
      { label: "Culture", detail: "Workplace etiquette" },
    ],
    duration: "Indicative 40–60 hours",
    format: "Live online · Corporate on-site on request",
    schedule: "Evening and weekend batches",
    materials: ["Business phrase book", "Email templates", "Case scenarios"],
    practice: ["Email writing tasks", "Meeting roleplays", "Presentation practice"],
    faqs: [
      { question: "Do you offer corporate training?", answer: "Yes — contact us with your team size and goals and we will propose a plan." },
      ...commonFaqs,
    ],
    related: ["speak-japanese", "jlpt-n3", "work-in-japan"],
  },
  {
    slug: "jlpt-japanese-preparation-course",
    navLabel: "JLPT Preparation",
    eyebrow: "JLPT Preparation",
    title: "JLPT Preparation Course (N5 – N1)",
    metaTitle: "JLPT N5-N1 Course Online | Complete Japanese Prep",
    metaDescription:
      "Prepare for JLPT N5 to N1 with Natsugo. Get live online classes, level-wise study plans, mock tests, grammar, kanji, reading and listening practice.",
    keywords: ["JLPT N5-N1 Course Online", "JLPT N5 to N1 Course", "JLPT Preparation Course Online", "Japanese JLPT Course Online", "JLPT N5 N1 Japanese Course", "JLPT Exam Preparation Online", "Online JLPT Classes N5 to N1"],
    image: images.lecture,
    intro:
      "The JLPT is held in India typically twice a year, in July and December. Our preparation tracks combine grammar, vocabulary, kanji, reading and listening with timed mock tests.",
    whoFor: [
      "Learners targeting a specific JLPT level",
      "Students and professionals who need JLPT for study or work",
      "Previous test-takers wanting to improve their score",
    ],
    outcomes: [
      "Coverage of all JLPT sections for your level",
      "Exam technique and time management",
      "Regular mock tests with section-wise feedback",
      "A clear picture of your readiness before exam day",
    ],
    curriculum: [
      { title: "Language knowledge", points: ["Vocabulary", "Kanji", "Grammar"] },
      { title: "Reading", points: ["Short and long passages", "Information retrieval"] },
      { title: "Listening", points: ["Task-based listening", "Quick response"] },
      { title: "Mock tests", points: ["Timed full-length tests", "Section-wise analysis"] },
    ],
    skills: [
      { label: "Vocabulary", detail: "Level-wise word lists" },
      { label: "Grammar", detail: "Pattern-by-pattern" },
      { label: "Reading", detail: "Timed practice" },
      { label: "Listening", detail: "Exam-format audio" },
    ],
    duration: "Varies by level",
    format: "Live online · Offline in Bengaluru",
    schedule: "Weekday and weekend batches",
    materials: ["Level-wise study plans", "Practice worksheets", "Mock test papers"],
    practice: ["Weekly section tests", "Full mock tests", "Error-review sessions"],
    faqs: [
      { question: "Where do I register for the JLPT exam?", answer: "Registration is done through the official JLPT India channels. See jlpt.jp for official information." },
      ...commonFaqs,
    ],
    related: ["jlpt-n5", "jlpt-n4", "jlpt-n3"],
  },
  {
    slug: "japanese-grammar-course",
    navLabel: "Japanese Grammar",
    eyebrow: "Grammar Focus",
    title: "Japanese Grammar Course",
    metaTitle: "Japanese Grammar Course — Sentence Patterns N5 to N2",
    metaDescription:
      "A focused course on Japanese grammar — particles, verb forms and sentence patterns from N5 to N2, with practice sentences in every class.",
    image: images.books,
    intro:
      "Grammar is where most self-learners get stuck. This course goes pattern by pattern — particles, verb conjugation, tenses and sentence structure — with practice sentences in every class, not just rules on a page.",
    whoFor: [
      "Learners who can read kana but find sentence structure confusing",
      "Students preparing for JLPT grammar sections (N5–N2)",
      "Anyone who has studied apps or books but wants grammar explained properly",
    ],
    outcomes: [
      "Use particles (は, が, を, に, で, と) correctly and confidently",
      "Conjugate verbs and adjectives across tenses and forms",
      "Build compound and conditional sentences",
      "Recognise and use common JLPT grammar patterns",
    ],
    curriculum: [
      { title: "Foundations", points: ["Particles and sentence order", "です/ます and plain forms", "Adjective conjugation"] },
      { title: "Verb forms", points: ["て-form and its uses", "Potential, volitional, passive", "Conditionals (と, ば, たら, なら)"] },
      { title: "Sentence building", points: ["Connecting clauses", "Reported speech", "Common N3–N2 grammar patterns"] },
    ],
    skills: [
      { label: "Particles", detail: "Used correctly in context" },
      { label: "Verb forms", detail: "All major conjugations" },
      { label: "Sentence structure", detail: "From simple to compound" },
      { label: "JLPT grammar", detail: "N5–N2 pattern coverage" },
    ],
    duration: "Indicative 50 hours",
    format: "Live online · Offline in Bengaluru",
    schedule: "2 classes a week",
    materials: ["Grammar pattern sheets", "Practice sentence sets", "Reference charts"],
    practice: ["Sentence-building drills each class", "Weekly grammar quizzes", "Error-correction exercises"],
    faqs: [
      { question: "Is this only grammar, with no speaking or vocabulary?", answer: "The focus is grammar, but every class includes speaking practice using the pattern just taught — grammar you can't use in a sentence isn't very useful." },
      ...commonFaqs,
    ],
    related: ["japanese-for-beginners", "japanese-vocabulary-course", "jlpt-japanese-preparation-course"],
  },
  {
    slug: "japanese-vocabulary-course",
    navLabel: "Japanese Vocabulary",
    eyebrow: "Vocabulary Builder",
    title: "Japanese Vocabulary Course",
    metaTitle: "Japanese Vocabulary Course — Words by Topic, N5 to N2",
    metaDescription:
      "Build Japanese vocabulary systematically by topic — daily life, work, travel and JLPT word lists — with spaced-repetition review built in.",
    image: images.classroom,
    intro:
      "Vocabulary is the biggest predictor of how quickly you progress. This course builds your word bank systematically, by topic and by JLPT level, with spaced-repetition review so words actually stick.",
    whoFor: [
      "Learners who know grammar but run out of words in conversation",
      "Students building vocabulary ahead of a specific JLPT level",
      "Anyone who wants a structured alternative to random app-based study",
    ],
    outcomes: [
      "A working vocabulary of 1,500–2,000+ words by topic",
      "Faster recall using spaced-repetition technique",
      "Vocabulary matched to your target JLPT level",
      "Ability to guess meaning from kanji components",
    ],
    curriculum: [
      { title: "Everyday topics", points: ["Home, food and daily routine", "People, family and feelings", "Numbers, time and money"] },
      { title: "Expanding range", points: ["Work and study vocabulary", "Travel and directions", "Kanji-based word building"] },
      { title: "JLPT word lists", points: ["N5–N3 core vocabulary", "Spaced-repetition review sessions", "Self-testing strategy"] },
    ],
    skills: [
      { label: "Word bank", detail: "1,500–2,000+ words by topic" },
      { label: "Recall", detail: "Spaced-repetition practice" },
      { label: "Kanji reading", detail: "Word-building from components" },
      { label: "JLPT vocabulary", detail: "Level-matched word lists" },
    ],
    duration: "Indicative 40 hours",
    format: "Live online · Offline in Bengaluru",
    schedule: "2 classes a week",
    materials: ["Topic-wise word lists", "Flashcard sets", "Kanji component charts"],
    practice: ["In-class recall games", "Flashcard review between classes", "Weekly vocabulary quizzes"],
    faqs: [
      { question: "Do you use flashcards or an app?", answer: "Yes — you'll get topic-wise flashcard sets to review between classes, alongside our free flashcards tool." },
      ...commonFaqs,
    ],
    related: ["japanese-grammar-course", "japanese-for-beginners", "jlpt-japanese-preparation-course"],
  },
  {
    slug: "japanese-reading-writing-course",
    navLabel: "Reading & Writing",
    eyebrow: "Reading & Writing",
    title: "Japanese Reading & Writing Course",
    metaTitle: "Japanese Reading & Writing Course — Hiragana, Katakana & Kanji",
    metaDescription:
      "Learn to read and write Japanese properly — hiragana, katakana and JLPT-level kanji with stroke order, dictation practice and reading passages.",
    image: images.writing,
    intro:
      "A dedicated course for the written language — correct stroke order for hiragana, katakana and kanji, plus graded reading passages so you can actually read real Japanese, not just recognise individual characters.",
    whoFor: [
      "Complete beginners who want to start with correct stroke order",
      "Learners who can speak some Japanese but can't read or write it well",
      "Students preparing for the reading sections of JLPT N5–N3",
    ],
    outcomes: [
      "Write all hiragana and katakana correctly from memory",
      "Read and write 300+ JLPT-level kanji with stroke order",
      "Read graded passages at your level with confidence",
      "Take dictation of spoken Japanese",
    ],
    curriculum: [
      { title: "Kana", points: ["Hiragana with stroke order", "Katakana and loanwords", "Reading speed drills"] },
      { title: "Kanji foundations", points: ["Radicals and components", "N5–N4 kanji with stroke order", "Reading vs. writing recall"] },
      { title: "Reading practice", points: ["Graded short passages", "N3-level kanji introduction", "Dictation exercises"] },
    ],
    skills: [
      { label: "Kana", detail: "Written from memory, correct stroke order" },
      { label: "Kanji", detail: "300+ kanji, N5–N3 level" },
      { label: "Reading", detail: "Graded passages by level" },
      { label: "Dictation", detail: "Writing from spoken Japanese" },
    ],
    duration: "Indicative 45 hours",
    format: "Live online · Offline in Bengaluru",
    schedule: "2 classes a week",
    materials: ["Stroke-order worksheets", "Kanji flashcard sets", "Graded reading passages"],
    practice: ["Writing drills every class", "Weekly dictation exercises", "Reading comprehension checks"],
    faqs: [
      { question: "I already know hiragana and katakana — can I join for kanji only?", answer: "Yes, speak to admissions about joining from the kanji module if you've already covered the kana." },
      ...commonFaqs,
    ],
    related: ["japanese-for-beginners", "japanese-vocabulary-course", "jlpt-n5"],
  },
];

const jlptMeta: Record<
  JLPTLevel,
  { hours: string; vocab: string; kanji: string; desc: string; can: string[]; img: string; metaTitle: string; metaDescription: string; keywords: string[] }
> = {
  N5: {
    hours: "Indicative 60 hours", vocab: "~800 words", kanji: "~100 kanji",
    desc: "The first JLPT level — basic Japanese in hiragana, katakana and simple kanji.",
    can: ["Read simple sentences in kana and basic kanji", "Understand slow, short everyday conversations", "Introduce yourself and talk about daily routines"],
    img: images.writing,
    metaTitle: "JLPT N5 Course Online | Easy Japanese Exam Prep",
    metaDescription: "Prepare for JLPT N5 with Natsugo. Learn Japanese online with live classes, mock tests, study materials, grammar, kanji, reading and listening practice.",
    keywords: ["JLPT N5 Course Online", "JLPT N5 Classes Online", "JLPT N5 Preparation Online", "Japanese N5 Course Online", "JLPT N5 Japanese Course", "Japanese Language Course N5", "JLPT N5 Classes for Beginners", "Online Japanese N5 Classes"],
  },
  N4: {
    hours: "Indicative 70 hours", vocab: "~1,500 words", kanji: "~300 kanji",
    desc: "Everyday Japanese — understand basic conversations and read passages on familiar topics.",
    can: ["Read passages on familiar daily topics", "Follow everyday conversations at a slightly slow pace", "Use verb forms like て-form, potential and volitional"],
    img: images.onlinePair,
    metaTitle: "JLPT N4 Course Online | Easy Japanese Exam Prep",
    metaDescription: "Prepare for JLPT N4 with Natsugo. Learn Japanese online through live classes, mock tests, study materials, grammar, kanji, reading and listening practice.",
    keywords: ["JLPT N4 Course Online", "JLPT N4 Classes Online", "JLPT N4 Preparation Online", "Japanese N4 Course Online", "JLPT N4 Classes for Beginners", "Online Japanese N4 Classes"],
  },
  N3: {
    hours: "Indicative 90 hours", vocab: "~3,750 words", kanji: "~650 kanji",
    desc: "The bridge between basic and advanced — Japanese used in everyday situations to some degree.",
    can: ["Understand newspaper headlines and notices", "Follow near-natural-speed conversations", "Express opinions with more complex grammar"],
    img: images.online,
    metaTitle: "JLPT N3 Course Online | Practical Japanese Exam Prep",
    metaDescription: "Prepare for JLPT N3 with Natsugo through live online classes, mock tests, study materials, grammar, kanji, reading and listening practice.",
    keywords: ["JLPT N3 Course Online", "JLPT N3 Classes Online", "JLPT N3 Preparation Online", "Japanese N3 Course Online", "JLPT N3 Classes for Beginners", "Online Japanese N3 Classes", "JLPT N3 Exam Preparation"],
  },
  N2: {
    hours: "Indicative 120 hours", vocab: "~6,000 words", kanji: "~1,000 kanji",
    desc: "Japanese used in everyday situations and in a variety of broader circumstances.",
    can: ["Read articles and commentary on general topics", "Follow news and conversations at natural speed", "Communicate in many workplace situations"],
    img: images.office,
    metaTitle: "JLPT N2 Course Online | Expert Japanese Exam Prep",
    metaDescription: "Prepare for JLPT N2 with Natsugo through live online classes, mock tests, study materials, grammar, kanji, reading and listening practice.",
    keywords: ["JLPT N2 Course Online", "JLPT N2 Classes Online", "JLPT N2 Preparation Online", "Japanese N2 Course Online", "JLPT N2 Exam Preparation", "Online Japanese N2 Classes", "JLPT N2 Japanese Course"],
  },
  N1: {
    hours: "Indicative 150+ hours", vocab: "~10,000 words", kanji: "~2,000 kanji",
    desc: "The highest JLPT level — understand Japanese in a wide variety of circumstances.",
    can: ["Read complex, abstract writing", "Understand lectures and news in depth", "Grasp nuance, implication and logical structure"],
    img: images.lecture,
    metaTitle: "JLPT N1 Course Online | Advanced Japanese Exam Prep",
    metaDescription: "Prepare for JLPT N1 with Natsugo through live online classes, mock tests, study materials, advanced grammar, kanji, reading and listening practice.",
    keywords: ["JLPT N1 Course Online", "JLPT N1 Classes Online", "JLPT N1 Preparation Online", "Japanese N1 Course Online", "JLPT N1 Exam Preparation", "Online Japanese N1 Classes", "JLPT N1 Japanese Course"],
  },
};

const order: JLPTLevel[] = ["N5", "N4", "N3", "N2", "N1"];

for (const lvl of order) {
  const m = jlptMeta[lvl];
  const idx = order.indexOf(lvl);
  courseDetails.push({
    slug: `jlpt-${lvl.toLowerCase()}`,
    navLabel: `JLPT ${lvl}`,
    eyebrow: `JLPT ${lvl} Course`,
    title: `JLPT ${lvl} Course`,
    metaTitle: m.metaTitle,
    metaDescription: m.metaDescription,
    keywords: m.keywords,
    image: m.img,
    level: lvl,
    intro: `${m.desc} This course covers every section of the ${lvl} exam and builds practical skills alongside test preparation.`,
    whoFor:
      idx === 0
        ? ["Complete beginners", "Learners who know kana but want a structured N5 course"]
        : [`Learners who have completed ${order[idx - 1]} or equivalent`, `Anyone targeting the JLPT ${lvl} exam`],
    outcomes: m.can,
    curriculum: [
      { title: "Vocabulary & Kanji", points: [`${m.vocab} (commonly cited estimate)`, `${m.kanji} (commonly cited estimate)`, "Spaced-repetition review"] },
      { title: "Grammar", points: [`All core ${lvl} grammar patterns`, "Usage in context", "Common mistakes"] },
      { title: "Reading & Listening", points: ["Exam-format passages", "Exam-format audio tasks", "Strategy for each question type"] },
      { title: "Mock Tests", points: ["Section tests", "Full-length timed mock tests", "Personal feedback"] },
    ],
    skills: [
      { label: "Vocabulary", detail: m.vocab },
      { label: "Kanji", detail: m.kanji },
      { label: "Grammar", detail: `${lvl} patterns` },
      { label: "Listening", detail: "Exam-format audio" },
    ],
    duration: m.hours,
    format: "Live online · Offline in Bengaluru",
    schedule: "Weekday evening and weekend batches",
    materials: ["Study plan", "Worksheets and vocabulary lists", "Mock test papers"],
    practice: ["Weekly quizzes", "Speaking tasks", "Full mock tests before exam"],
    faqs: [
      { question: `How long does it take to prepare for JLPT ${lvl}?`, answer: `It depends on your starting point and study time. As a guide, this course is ${m.hours.toLowerCase()} of classes plus self-study.` },
      ...commonFaqs,
    ],
    related: [
      idx > 0 ? `jlpt-${order[idx - 1].toLowerCase()}` : "japanese-for-beginners",
      idx < 4 ? `jlpt-${order[idx + 1].toLowerCase()}` : "business-japanese",
      "jlpt-japanese-preparation-course",
    ],
  });
}

export const getCourse = (slug: string) => courseDetails.find((c) => c.slug === slug);
