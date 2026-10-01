import { quizBank, quizLevels, quizTopics, topicQuiz, type QuizLevel, type QuizTopic } from "@/lib/quizBank";
import type { PageQuizSet } from "@/components/quiz/PageQuiz";

// One tab per topic, all at the given level.
export const levelSets = (level: QuizLevel): PageQuizSet[] =>
  quizTopics.map((t) => ({ id: t.id, label: t.label, questions: topicQuiz(level, t.id), save: { level, difficulty: t.id } }));

// One tab per level, all on the given topic.
export const topicSets = (topic: QuizTopic): PageQuizSet[] =>
  quizLevels.map((l) => ({ id: l, label: l, questions: topicQuiz(l, topic), save: { level: l, difficulty: topic } }));

// Which quiz a course page shows, and the name used on its test button. `null` means no quiz.
export const courseQuiz: Record<string, { topic?: QuizTopic; label: string } | null> = {
  "japanese-grammar-course": { topic: "grammar", label: "Grammar" },
  "japanese-vocabulary-course": { topic: "vocabulary", label: "Vocabulary" },
  "japanese-reading-writing-course": { topic: "reading", label: "Reading" },
  "speak-japanese": { topic: "listening", label: "Speaking" },
  "japanese-for-beginners": { label: "Beginner" },
  "jlpt-japanese-preparation-course": { label: "JLPT" },
  "learn-japanese-language-course": { label: "Japanese" },
  "business-japanese": null,
};

// One tab per level, mixing every topic (the medium set).
export const mixedSets = (): PageQuizSet[] =>
  quizLevels.map((l) => ({ id: l, label: l, questions: quizBank.filter((q) => q.level === l && q.difficulty === "medium"), save: { level: l, difficulty: "medium" } }));
