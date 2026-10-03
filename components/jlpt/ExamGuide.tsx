import Link from "next/link";
import { AlertTriangle, Check, ExternalLink, X } from "lucide-react";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ExamChecklist } from "@/components/jlpt/ExamChecklist";
import { afterExam, bring, dontBring, examDayPlan, guideFaqs, levelRows, registrationSteps } from "@/lib/examGuide";

const jump = [
  ["levels", "Levels and pass marks"],
  ["steps", "Register step by step"],
  ["exam-day", "Exam day plan"],
  ["bring", "What to bring"],
  ["after", "After the exam"],
  ["faq", "Questions"],
];

export function ExamGuide({ officialLink, next }: { officialLink: string; next?: { name: string; examDate: string } }) {
  return (
    <>
      <section className="bg-bg-alt py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-jp text-sm font-bold text-hanko">申し込みガイド · Complete guide</p>
          <h2 className="mt-1 text-3xl font-bold text-indigo-950 sm:text-4xl">How to register for the JLPT in India, step by step</h2>
          <p className="mt-3 max-w-3xl text-lg text-charcoal-700">
            From choosing a level to walking out of the exam hall. {next ? `The next session is ${next.name}, on ${next.examDate}.` : ""} The rules on sections, times, pass marks, results and phones come from the official JLPT website. Fees, forms and reporting times are set by each host centre, and we say so wherever that matters.
          </p>
          <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
            {jump.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="rounded-full border border-charcoal-100 bg-surface px-4 py-2 text-sm font-semibold text-indigo-950 transition-colors hover:border-indigo-700 hover:text-indigo-700">{label}</a>
            ))}
          </nav>

          <div id="levels" className="mt-14 scroll-mt-24">
            <h3 className="text-2xl font-bold text-indigo-950">1. Choose your level and know the pass marks</h3>
            <p className="mt-2 max-w-3xl text-charcoal-700">Every level is a separate paper with its own sections and timings. You pass by reaching the overall pass mark and the minimum in every section, so one weak section can fail you even with a high total.</p>
            <div className="mt-5 overflow-x-auto rounded-xl border border-charcoal-100 bg-surface">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="bg-indigo-950 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Level</th>
                    <th className="px-4 py-3 font-semibold">Test sections and time</th>
                    <th className="px-4 py-3 font-semibold">Total</th>
                    <th className="px-4 py-3 font-semibold">Pass mark (of 180)</th>
                    <th className="px-4 py-3 font-semibold">Minimum per section</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-100">
                  {levelRows.map((r) => (
                    <tr key={r.level} className="align-top">
                      <td className="px-4 py-3"><p className="font-display text-lg font-bold text-indigo-950">{r.level}</p></td>
                      <td className="px-4 py-3 text-charcoal-800">{r.sections}<p className="mt-1 text-xs text-charcoal-500">{r.who}</p></td>
                      <td className="px-4 py-3 font-semibold text-charcoal-900">{r.total}</td>
                      <td className="px-4 py-3 font-semibold text-charcoal-900">{r.pass}</td>
                      <td className="px-4 py-3 text-charcoal-800">{r.sectional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-charcoal-500">Test time only. Instructions, sign-in and breaks are extra, so plan to be at the venue for most of the day. Source: official JLPT website.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/level-test" className="inline-flex min-h-[44px] items-center rounded-md bg-indigo-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0a6fd1]">Find your level</Link>
              <Link href="/jlpt-quiz" className="inline-flex min-h-[44px] items-center rounded-md border border-charcoal-100 bg-surface px-5 text-sm font-semibold text-indigo-950 transition-colors hover:border-indigo-700">Practice a full test</Link>
            </div>
          </div>

          <div id="steps" className="mt-16 scroll-mt-24">
            <h3 className="text-2xl font-bold text-indigo-950">2. Register, in nine steps</h3>
            <ol className="mt-6 space-y-5">
              {registrationSteps.map((s, i) => (
                <li key={s.title} className="grid gap-4 rounded-2xl border border-charcoal-100 bg-surface p-5 sm:grid-cols-[3.5rem_1fr] sm:p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-indigo-900 font-display text-lg font-bold text-white">{i + 1}</span>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-display text-xl font-bold text-indigo-950">{s.title}</h4>
                      <span className="rounded-full bg-sun-100 px-3 py-1 text-xs font-bold text-indigo-800">{s.when}</span>
                    </div>
                    <p className="mt-2 text-charcoal-700">{s.body}</p>
                    <ul className="mt-3 space-y-1.5">
                      {s.doList.map((d) => (
                        <li key={d} className="flex gap-2 text-sm text-charcoal-800"><Check size={16} className="mt-0.5 shrink-0 text-success" aria-hidden /> {d}</li>
                      ))}
                    </ul>
                    {s.watch ? (
                      <p className="mt-3 flex gap-2 rounded-lg bg-hanko/10 px-3 py-2 text-sm text-charcoal-900"><AlertTriangle size={16} className="mt-0.5 shrink-0 text-hanko" aria-hidden /> <span><strong>Watch out:</strong> {s.watch}</span></p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
            <a href={officialLink} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1.5 font-bold text-indigo-800 underline underline-offset-4">
              Official JLPT website <ExternalLink size={15} />
            </a>
          </div>

          <div id="exam-day" className="mt-16 scroll-mt-24">
            <h3 className="text-2xl font-bold text-indigo-950">3. Exam day, from the week before to the walk home</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {examDayPlan.map((p) => (
                <div key={p.when} className="rounded-2xl border border-charcoal-100 bg-surface p-5">
                  <p className="font-display text-lg font-bold text-indigo-950">{p.when}</p>
                  <ul className="mt-2 space-y-2">
                    {p.items.map((t) => (
                      <li key={t} className="flex gap-2 text-sm text-charcoal-800"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-700" /> {t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div id="bring" className="mt-16 scroll-mt-24">
            <h3 className="text-2xl font-bold text-indigo-950">4. What to bring, and what to leave at home</h3>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-success/30 bg-surface p-5 sm:p-6">
                <p className="flex items-center gap-2 font-display text-lg font-bold text-indigo-950"><span className="grid h-7 w-7 place-items-center rounded-full bg-success text-white"><Check size={16} strokeWidth={3} /></span> Bring</p>
                <ul className="mt-3 space-y-3">
                  {bring.map((b) => (
                    <li key={b.item} className="text-sm">
                      <p className="font-semibold text-charcoal-900">{b.item}</p>
                      {b.note ? <p className="text-charcoal-600">{b.note}</p> : null}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-hanko/30 bg-surface p-5 sm:p-6">
                <p className="flex items-center gap-2 font-display text-lg font-bold text-indigo-950"><span className="grid h-7 w-7 place-items-center rounded-full bg-hanko text-white"><X size={16} strokeWidth={3} /></span> Do not bring, or do not use</p>
                <ul className="mt-3 space-y-3">
                  {dontBring.map((b) => (
                    <li key={b.item} className="text-sm">
                      <p className="font-semibold text-charcoal-900">{b.item}</p>
                      {b.note ? <p className="text-charcoal-600">{b.note}</p> : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-4 flex gap-2 rounded-lg bg-hanko/10 px-4 py-3 text-sm text-charcoal-900"><AlertTriangle size={18} className="mt-0.5 shrink-0 text-hanko" aria-hidden /> <span><strong>Misconduct cancels your result for every section.</strong> That includes a phone or smartwatch that is on, cheating or helping others, using someone else&apos;s identity, ignoring the proctor, taking papers out of the room, and sharing questions or audio online afterwards. Your host centre may add its own rules, so read its notice.</span></p>
            <div className="mt-6">
              <ExamChecklist items={bring.map((b) => b.item.split(",")[0])} />
            </div>
          </div>

          <div id="after" className="mt-16 scroll-mt-24">
            <h3 className="text-2xl font-bold text-indigo-950">5. After the exam: results, pass or fail, retakes</h3>
            <dl className="mt-6 grid gap-4 md:grid-cols-2">
              {afterExam.map((a) => (
                <div key={a.title} className="rounded-2xl border border-charcoal-100 bg-surface p-5">
                  <dt className="font-display text-lg font-bold text-indigo-950">{a.title}</dt>
                  <dd className="mt-1 text-sm text-charcoal-700">{a.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div id="faq" className="mt-16 scroll-mt-24">
            <h3 className="text-2xl font-bold text-indigo-950">Questions people ask</h3>
            <div className="mt-6">
              <FAQAccordion items={guideFaqs.map((f) => ({ question: f.q, answer: f.a }))} />
            </div>
            <p className="mt-6 text-xs text-charcoal-500">Official rules checked on the JLPT website on 3 October 2026. Rules and dates can change, and your host centre may add its own. If this page and your centre disagree, follow your centre.</p>
          </div>
        </div>
      </section>
    </>
  );
}
