import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ClipboardList, ExternalLink, FileText, IndianRupee, MapPin, MessageCircle } from "lucide-react";
import { getExamInfo } from "@/lib/repo";
import { quizLevels } from "@/lib/quizBank";
import { levelInfo } from "@/lib/curriculum";
import { images, whatsappLink } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "JLPT Exam Info | Dates, Fees & Centres in India",
  description: "Get updated JLPT exam info for India, including 2026 dates, registration, fees, test centres and N5-N1 details. Check official information with Natsugo.",
  keywords: ["JLPT Exam Info", "JLPT Exam Dates 2026", "JLPT Exam Fees India", "JLPT Exam Centres in India", "JLPT Registration India", "JLPT N5-N1 Exam", "JLPT Exam Information India"],
  alternates: { canonical: "/jlpt-exam-info" },
};

const steps = [
  { title: "Check the exam window", body: "Confirm which session (July or December) you're aiming for, and note the registration dates below." },
  { title: "Create an account", body: "Register on the official JLPT application portal for your country/region using a valid email and photo ID details." },
  { title: "Choose your level and test centre", body: "Select N5–N1 based on your level test result or course progress, and pick your nearest test centre." },
  { title: "Pay the exam fee", body: "Pay online during registration. Keep the payment confirmation, you'll need it if there's any issue with your application." },
  { title: "Download your admit card", body: "Once registration closes, download and print your admit card / exam voucher before the exam day." },
  { title: "Sit the exam", body: "Arrive early with your admit card and a valid photo ID. Sections are Language Knowledge, Reading and Listening (order varies by level)." },
  { title: "Check your result", body: "Results are published online a couple of months after the exam, with the official certificate posted afterwards." },
];

export default async function ExamInfoPage() {
  const info = await getExamInfo();

  return (
    <>
      <PageHero
        title="JLPT exam info: dates, registration, fees & centres"
        eyebrow="JLPT · 日本語能力試験"
        intro="Everything about sitting the JLPT in India, gathered in one place, kept up to date by our team. Always double-check against the official website before making travel plans."
        image={images.lecture}
        crumbs={[{ label: "JLPT Exam Info", href: "/jlpt-exam-info" }]}
      >
        <Button href={info.officialLink} variant="outline-light" size="lg">Official JLPT website ↗</Button>
      </PageHero>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card-modern overflow-hidden">
            <div className="flex items-center gap-2 border-b border-charcoal-100 bg-indigo-950 px-5 py-3 text-white">
              <CalendarDays size={18} className="text-sun-300" />
              <h2 className="font-display font-bold">Upcoming sessions</h2>
            </div>
            <div className="divide-y divide-charcoal-100">
              {info.sessions.map((s) => (
                <div key={s.name} className="grid sm:grid-cols-3 gap-3 p-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-sun-500">Session</p>
                    <p className="font-display font-bold text-indigo-950">{s.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Exam date</p>
                    <p className="text-charcoal-800">{s.examDate}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Registration</p>
                    <p className="text-charcoal-800">{s.registrationWindow}</p>
                    <p className="mt-1 text-xs text-charcoal-500">Results: {s.resultsDate}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="border-t border-charcoal-100 bg-sun-100 px-5 py-3 text-sm text-charcoal-800">{info.note}</p>
          </div>

          <div className="space-y-4">
            <div className="card-modern p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal-500"><IndianRupee size={14} /> Exam fee</p>
              <p className="mt-1 font-semibold text-charcoal-900">{info.fee}</p>
            </div>
            <div className="card-modern p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal-500"><MapPin size={14} /> Test centres in India</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {info.centres.map((c) => <span key={c} className="rounded bg-bg-alt px-2 py-1 text-sm font-semibold text-charcoal-800">{c}</span>)}
              </div>
            </div>
            <a href={whatsappLink("Hi, I have a question about JLPT registration.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-[#15803d] px-5 py-4 font-bold text-white">
              <MessageCircle size={18} /> Ask admissions on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="bg-bg-alt py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-indigo-950"><ClipboardList size={26} className="text-sun-400" /> How to register: step by step</h2>
          <ol className="mt-8 space-y-6">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-900 text-sm font-bold text-white">{i + 1}</span>
                <div>
                  <h3 className="font-display font-bold text-indigo-950">{s.title}</h3>
                  <p className="mt-1 text-charcoal-700">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <a href={info.officialLink} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-1.5 font-bold text-indigo-800 underline underline-offset-4">
            Start registration on the official JLPT website <ExternalLink size={15} />
          </a>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-indigo-950"><FileText size={26} className="text-sun-400" /> Sample & practice questions by level</h2>
          <p className="mt-2 max-w-2xl text-charcoal-700">
            The JLPT organisers don&apos;t publish full past exam papers, but the official site has sample question formats. Practise with our free quiz sets (a full test and five topic quizzes per level) and our study notes for each unit.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {quizLevels.map((lvl) => (
              <div key={lvl} className="card-modern p-5">
                <p className="font-display text-2xl font-semibold text-sun-400">{lvl}</p>
                <p className="mt-1 text-sm text-charcoal-500 font-jp">{levelInfo[lvl].jp}</p>
                <div className="mt-4 flex flex-col gap-2">
                  <Link href={`/jlpt-quiz/${lvl.toLowerCase()}/full`} className="text-sm font-semibold text-indigo-800 underline underline-offset-4">Practice quiz →</Link>
                  <Link href={`/online-classroom/${lvl.toLowerCase()}`} className="text-sm font-semibold text-indigo-800 underline underline-offset-4">Lessons & notes →</Link>
                  <a href={info.officialLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-charcoal-600 underline underline-offset-4">Official sample format ↗</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
