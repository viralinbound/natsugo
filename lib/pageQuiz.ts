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

// Which test a course page shows. `null` means the page has no test.
export const courseQuiz: Record<string, CourseQuiz | null> = {
  "japanese-grammar-course": { name: "Grammar", title: "Free grammar test", intro: "Particles, verb forms and patterns. Pick your level.", sets: () => topicSets("grammar") },
  "japanese-vocabulary-course": { name: "Vocabulary", title: "Free vocabulary test", intro: "Word meanings for each JLPT level. Pick your level.", sets: () => topicSets("vocabulary") },
  "japanese-reading-writing-course": { name: "Reading", title: "Free reading test", intro: "Short texts, signs and notices. Pick your level.", sets: () => topicSets("reading") },
  "speak-japanese": { name: "Speaking", title: "Free speaking test", intro: "Choose what you would say in real situations, or listen and pick the best reply.", sets: () => freeTestSets("speaking") },
  "japanese-for-beginners": { name: "Beginner", title: "Free beginner test", intro: "Made for your first weeks: hiragana, greetings, numbers and time.", sets: () => freeTestSets("beginner") },
  "jlpt-japanese-preparation-course": { name: "JLPT", title: "Free JLPT mock test", intro: "Exam-level questions across every section. Pick your level.", sets: () => difficultySets("hard", "Exam-level mixed questions") },
  "learn-japanese-language-course": { name: "Japanese", title: "Free Japanese test", intro: "Everyday Japanese across vocabulary, grammar, kanji, reading and listening.", sets: () => difficultySets("easy", "Everyday mixed questions") },
  "business-japanese": null,
};
