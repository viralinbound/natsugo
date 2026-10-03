// Live "after the exam" facts, read from the official JLPT FAQ (www.jlpt.jp/e/faq) every six hours:
// when score reports arrive outside Japan, the pass marks, how pass or fail is decided, whether the certificate
// expires and the retake rule. If the page cannot be read, the built-in text from lib/examGuide.ts is used.

import { afterExam, levelRows } from "@/lib/examGuide";

const FAQ = "https://www.jlpt.jp/e/faq/index.html";

export interface PassMark {
  level: string;
  overall: number;
  sectional: string;
}

export interface OfficialAfter {
  live: boolean;
  checkedAt?: string;
  items: { title: string; body: string }[];
  resultMonths: { july: string; december: string };
  passMarks: PassMark[];
}

const clean = (html: string) =>
  html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(td|th)>/gi, " | ")
    .replace(/<\/(p|div|li|tr|dd|dt|h\d)>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#?\w+;/g, " ")
    .replace(/[ \t　]+/g, " ")
    .replace(/\n\s*\n+/g, "\n");

// The answer that follows the second occurrence of a question (the first is the table of contents).
function answer(text: string, question: string, length = 900): string {
  const idx: number[] = [];
  let from = 0;
  for (;;) {
    const i = text.indexOf(question, from);
    if (i < 0) break;
    idx.push(i);
    from = i + question.length;
  }
  const at = idx.length > 1 ? idx[1] : idx[0];
  if (at === undefined) return "";
  const raw = text.slice(at + question.length, at + question.length + length);
  // Stop at the next question, which ends with a question mark on its own line.
  const cut = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  const out: string[] = [];
  for (const line of cut) {
    if (/\?\s*$/.test(line) && out.length) break;
    out.push(line);
  }
  return out.join(" ").replace(/\s+/g, " ").trim();
}

function parsePassMarks(text: string): PassMark[] {
  const start = text.lastIndexOf("Overall pass marks and sectional pass marks");
  if (start < 0) return [];
  const block = text.slice(start, start + 2500);
  const marks: PassMark[] = [];
  for (const lvl of ["N1", "N2", "N3", "N4", "N5"]) {
    const m = new RegExp(`\\n\\s*${lvl}\\s*\\|\\s*\\n?\\s*0～180\\s*points?\\s*\\|\\s*\\n?\\s*(\\d+)\\s*points?([\\s\\S]*?)(?=\\n\\s*N\\d\\s*\\||\\u203B|$)`).exec(block);
    if (!m) continue;
    // After the overall mark come pairs of "range | sectional mark"; the sectional marks are every second number.
    const nums = [...m[2].matchAll(/(\d+)\s*points?/g)].map((x) => Number(x[1]));
    const sectional = nums.filter((_, i) => i % 2 === 1);
    marks.push({ level: lvl, overall: Number(m[1]), sectional: sectional.join(" / ") });
  }
  return marks.length === 5 ? marks.sort((a, b) => b.level.localeCompare(a.level)).reverse() : [];
}

async function readFaq(): Promise<string> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(FAQ, { next: { revalidate: 6 * 3600 }, headers: { "user-agent": "Mozilla/5.0 (compatible; NatsugoBot)" }, signal: AbortSignal.timeout(30000) });
      if (res.ok) return clean(await res.text());
    } catch {}
  }
  return "";
}

export async function getOfficialAfter(): Promise<OfficialAfter> {
  const staticItems = afterExam;
  const fallback: OfficialAfter = {
    live: false,
    items: staticItems,
    resultMonths: { july: "early October", december: "early March" },
    passMarks: levelRows.map((r) => ({ level: r.level, overall: r.pass, sectional: r.sectional })),
  };
  const text = await readFaq();
  if (!text) return fallback;

  const results = answer(text, "When and how do I receive test results?");
  const pass = answer(text, "How is pass or fail determined? How many scores do I need to pass?", 700).split(" Scoring sections of")[0];
  const expire = answer(text, "Does the JLPT certificate expire at some point?", 500);
  const miss = answer(text, "What will happen if I don't take a test section?", 400);
  const retake = answer(text, "If my score does not reach the minimum required in a Scoring Section, can I take only that section again and pass the JLPT if I get an acceptable score?", 600);
  const lost = answer(text, "I have lost my Score Report/Certificate of Proficiency.", 300);

  // "...a report for the July test in early October and a report for the December test in early March."
  const months = /report for the July test in ([A-Za-z ]+?) and a report for the December test in ([A-Za-z ]+?)\./i.exec(results);
  const resultMonths = months ? { july: months[1].trim(), december: months[2].trim() } : fallback.resultMonths;
  const marks = parsePassMarks(text);

  const pick = (live: string, i: number) => ({ title: staticItems[i].title, body: live.length > 40 ? live : staticItems[i].body });
  const items = [
    pick(results, 0),
    pick(pass, 1),
    pick(miss, 2),
    pick(retake, 3),
    pick(expire.split(" I have lost")[0], 4),
    pick(lost, 5),
  ];
  const gotAny = [results, pass, miss, retake, expire, lost].some((x) => x.length > 40) || marks.length === 5;
  return {
    live: gotAny,
    checkedAt: gotAny ? new Date().toISOString() : undefined,
    items,
    resultMonths,
    passMarks: marks.length === 5 ? marks : fallback.passMarks,
  };
}

// Where the learner stands for the latest exam that has happened and the next one coming.
export interface ResultsStatus {
  session: string;
  examDate: string;
  state: "upcoming" | "waiting" | "due" | "overdue";
  headline: string;
  detail: string;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const firstSunday = (y: number, m: number) => {
  const d = new Date(Date.UTC(y, m, 1));
  d.setUTCDate(1 + ((7 - d.getUTCDay()) % 7));
  return d;
};
const longDate = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// "early October" -> that month; the report is expected during it (early in the month, with the whole month as the limit).
function monthOf(phrase: string, examMonth: number, examYear: number) {
  const idx = MONTHS.findIndex((m) => phrase.toLowerCase().includes(m.toLowerCase()));
  if (idx < 0) return null;
  const year = idx < examMonth ? examYear + 1 : examYear;
  return { idx, year, early: /early/i.test(phrase) };
}

export function resultsTracker(now: Date, marks: { july: string; december: string }): ResultsStatus[] {
  const y = now.getUTCFullYear();
  const all: { month: number; year: number }[] = [];
  for (const yy of [y - 1, y, y + 1]) all.push({ month: 6, year: yy }, { month: 11, year: yy });
  const withDates = all.map((s) => ({ ...s, date: firstSunday(s.year, s.month) })).sort((a, b) => a.date.getTime() - b.date.getTime());
  const done = [...withDates].reverse().find((s) => s.date.getTime() + 864e5 <= now.getTime());
  const coming = withDates.find((s) => s.date.getTime() + 864e5 > now.getTime());
  const out: ResultsStatus[] = [];
  for (const s of [done, coming]) {
    if (!s) continue;
    const name = `${MONTHS[s.month]} ${s.year}`;
    const phrase = s.month === 6 ? marks.july : marks.december;
    const when = monthOf(phrase, s.month, s.year);
    const resultsLabel = when ? `${phrase} ${when.year}` : phrase;
    const examPassed = s.date.getTime() + 864e5 <= now.getTime();
    if (!examPassed) {
      const days = Math.max(0, Math.ceil((s.date.getTime() - now.getTime()) / 864e5));
      out.push({ session: name, examDate: longDate(s.date), state: "upcoming", headline: `${name} exam: ${days} days to go`, detail: `Score reports for this session are expected ${resultsLabel}, sent through your host centre.` });
      continue;
    }
    const end = when ? Date.UTC(when.year, when.idx + 1, 1) : 0;
    const start = when ? Date.UTC(when.year, when.idx, 1) : 0;
    if (!when) out.push({ session: name, examDate: longDate(s.date), state: "waiting", headline: `${name} exam is done`, detail: `Score reports are expected ${phrase}, through your host centre.` });
    else if (now.getTime() < start) {
      const days = Math.ceil((start - now.getTime()) / 864e5);
      out.push({ session: name, examDate: longDate(s.date), state: "waiting", headline: `${name} results: about ${days} days to go`, detail: `Reports are expected ${resultsLabel}. Your host centre sends them to you.` });
    } else if (now.getTime() < end) {
      out.push({ session: name, examDate: longDate(s.date), state: "due", headline: `${name} results are due this month`, detail: `Reports are expected ${resultsLabel}. Contact your host centre if yours has not reached you by the end of the month.` });
    } else {
      out.push({ session: name, examDate: longDate(s.date), state: "overdue", headline: `${name} results should have reached you`, detail: `They were expected ${resultsLabel}. If you have not received yours, contact the host centre where you sat the test.` });
    }
  }
  return out;
}
