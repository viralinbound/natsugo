// Verifies that every quiz on the site has its own questions: no question appears in two quizzes.
// Run with: npx tsx scripts/check-quizzes.ts
import { fullQuiz, quizLevels, quizTopics, topicQuiz } from "../lib/quizBank";
import { freeTests } from "../lib/freeTests";
import { levelTestQuestions } from "../lib/learning";

const quizzes: [string, { prompt: string; audio?: string; options: string[]; answer: number }[]][] = [
  ["level-test", levelTestQuestions],
  ...quizLevels.flatMap((l) => [
    [`jlpt ${l} full`, fullQuiz(l)] as [string, ReturnType<typeof fullQuiz>],
    ...quizTopics.map((t) => [`jlpt ${l} ${t.id}`, topicQuiz(l, t.id)] as [string, ReturnType<typeof topicQuiz>]),
  ]),
  ...freeTests.flatMap((t) => t.parts.map((p) => [`${t.id} ${p.id}`, p.questions] as [string, typeof p.questions])),
];

const owner = new Map<string, string>();
let dups = 0;
let short = 0;
for (const [name, qs] of quizzes) {
  if (qs.length < 10) {
    short++;
    console.log(`SHORT: ${name} has ${qs.length} questions`);
  }
  for (const q of qs) {
    const key = `${q.prompt}|${q.audio ?? ""}|${q.options[q.answer]}`;
    if (owner.has(key)) {
      dups++;
      console.log(`DUP: "${q.prompt.slice(0, 60)}" in ${owner.get(key)} and ${name}`);
    } else owner.set(key, name);
  }
}
console.log(`${quizzes.length} quizzes, ${owner.size} unique questions, ${dups} duplicates, ${short} short quizzes`);
process.exit(dups || short ? 1 : 0);
