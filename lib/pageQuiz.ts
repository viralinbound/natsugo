import { quizLevels, quizTopics, type QuizLevel, type QuizTopic } from "@/lib/quizBank";
import { getFreeTest } from "@/lib/freeTests";
import type { PageQuizSet } from "@/components/quiz/PageQuiz";

const lc = (l: string) => l.toLowerCase();

// One card per topic, all at the given level.
export const levelSets = (level: QuizLevel): PageQuizSet[] =>
  quizTopics.map((t) => ({ id: t.id, label: t.label, desc: `10 ${level} ${t.label.toLowerCase()} questions`, href: `/jlpt-quiz/${lc(level)}/${t.id}` }));

// One card per level, all on the given topic.
export const topicSets = (topic: QuizTopic): PageQuizSet[] =>
  quizLevels.map((l) => ({ id: l, label: l, desc: `10 ${l} ${topic} questions`, href: `/jlpt-quiz/${lc(l)}/${topic}` }));

// One card per level for a difficulty set that mixes every topic.
export const difficultySets = (difficulty: "easy" | "hard", desc: string): PageQuizSet[] =>
  quizLevels.map((l) => ({ id: l, label: l, desc, href: `/jlpt-quiz/${lc(l)}/${difficulty}` }));

// Cards for one of the stand-alone tests (speaking, beginner, kana).
export const freeTestSets = (test: string, only?: string[]): PageQuizSet[] => {
  const t = getFreeTest(test)!;
  return t.parts
    .filter((p) => !only || only.includes(p.id))
    .map((p) => ({ id: p.id, label: p.label, desc: `${p.questions.length} questions`, href: `/free-test/${t.id}/${p.id}` }));
};

export interface CourseQuiz {
  name: string;
  title: string;
  intro: string;
  sets: () => PageQuizSet[];
}

// Every page in the Learn menu has its own test with questions used nowhere else.
const own = (test: string, name: string, title: string, intro: string): CourseQuiz => ({ name, title, intro, sets: () => freeTestSets(test) });
export const courseQuiz: Record<string, CourseQuiz> = {
  "learn-japanese-language-course": own("japanese", "Japanese", "Free Japanese test", "Everyday Japanese for new learners. Start with Starter, then try Next step."),
  "japanese-for-beginners": own("beginner", "Beginner", "Free beginner test", "Made for your first weeks: first words, greetings, numbers and time."),
  "speak-japanese": own("speaking", "Speaking", "Free speaking test", "Choose what you would say in real situations, or listen and pick the best reply."),
  "japanese-grammar-course": own("grammar", "Grammar", "Free grammar test", "Particles, verb forms and sentence patterns."),
  "japanese-vocabulary-course": own("vocabulary", "Vocabulary", "Free vocabulary test", "Everyday words first, then useful intermediate ones."),
  "japanese-reading-writing-course": own("reading", "Reading", "Free reading & writing test", "Kana, kanji, signs and short real-world texts."),
  "business-japanese": own("business", "Business Japanese", "Free business Japanese test", "Keigo, phone calls, emails and office vocabulary."),
  "work-in-japan": own("work", "Work in Japan", "Free work-in-Japan test", "Interviews, documents and everyday workplace Japanese."),
  "jlpt-japanese-preparation-course": { name: "JLPT", title: "Free JLPT mock test", intro: "Exam-level questions across every section. Pick your level.", sets: () => difficultySets("hard", "Exam-level mixed questions") },
  "study-in-japan": own("study", "Study in Japan", "Free study-in-Japan test", "Campus life, fees and talking to teachers and classmates."),
};
