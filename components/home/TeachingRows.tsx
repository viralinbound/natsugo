import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/site";

function ProgressMock() {
  const rows = [
    { l: "Vocabulary", v: 78 },
    { l: "Grammar", v: 64 },
    { l: "Listening", v: 54 },
    { l: "Kanji", v: 42 },
  ];
  return (
    <div className="h-full w-full bg-indigo-950 p-6 sm:p-8 flex flex-col justify-center">
      <div className="rounded-lg bg-surface p-5 sm:p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Current course</p>
            <p className="text-lg font-bold text-indigo-950">JLPT N4 · 64% complete</p>
          </div>
          <span className="rounded bg-sun-100 px-2 py-1 text-xs font-bold text-indigo-950">Next class: Tue 7 PM</span>
        </div>
        <div className="mt-5 space-y-3">
          {rows.map((r) => (
            <div key={r.l}>
              <div className="flex justify-between text-sm"><span className="text-charcoal-700">{r.l}</span><span className={`font-bold ${r.v < 50 ? "text-red-600" : "text-indigo-800"}`}>{r.v}%</span></div>
              <div className="mt-1 h-2 rounded-full bg-bg-alt overflow-hidden"><div className={`h-full rounded-full ${r.v < 50 ? "bg-red-500" : "bg-indigo-700"}`} style={{ width: `${r.v}%` }} /></div>
            </div>
          ))}
        </div>
        <p className="mt-5 rounded bg-bg-alt px-3 py-2 text-sm text-charcoal-800">
          <strong>Suggested today:</strong> 10 min N4 kanji review
        </p>
      </div>
      <p className="mt-3 text-center text-xs text-white/60">Student dashboard preview</p>
    </div>
  );
}

const rows = [
  {
    title: "Live classes, online or in Bengaluru",
    body: "Every batch is taught live by a teacher — no pre-recorded videos. Join from anywhere in India, or attend in our Bengaluru classroom. Weekday evening and weekend options suit students and working professionals.",
    link: { href: "/batches", label: "See batch timings" },
    media: <Image src={`${images.online}?w=1100&q=70&auto=format&fit=crop`} alt="Student in a live online Japanese class" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />,
  },
  {
    title: "Speak from the first class",
    body: "The JLPT doesn't test speaking — but real life does. Every class includes conversation, roleplay and pronunciation practice, and our Speaking Lab adds focused sessions for interviews and the workplace.",
    link: { href: "/speaking-japanese", label: "Explore the Speaking Lab" },
    media: <Image src={`${images.onlinePair}?w=1100&q=70&auto=format&fit=crop`} alt="Two learners practising conversation" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />,
  },
  {
    title: "Progress you can see",
    body: "Quizzes, section tests and JLPT mock tests show exactly where you're strong and what to work on next — so you're never guessing whether you're ready.",
    link: { href: "/level-test", label: "Start with your level" },
    media: <ProgressMock />,
  },
];

export function TeachingRows() {
  return (
    <section className="bg-bg-alt py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {rows.map((r, i) => (
          <div key={r.title} className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className={`relative aspect-[4/3] overflow-hidden rounded-lg ${i % 2 ? "lg:order-2" : ""}`}>{r.media}</div>
            <div>
              <p className="font-jp text-5xl font-bold text-sun-400/80">0{i + 1}</p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-indigo-950 tracking-tight">{r.title}</h3>
              <p className="mt-4 text-lg text-charcoal-700 leading-relaxed">{r.body}</p>
              <Link href={r.link.href} className="mt-4 inline-block py-2 font-bold text-indigo-900 hover:underline decoration-sun-400 decoration-2 underline-offset-4">
                {r.link.label} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
