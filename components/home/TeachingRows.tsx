import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/site";

const rows = [
  {
    title: "Live classes, 100% online",
    body: "Every batch is taught live by a teacher on Zoom or Google Meet — no pre-recorded videos. Join from anywhere in India. Weekday evening and weekend options suit students and working professionals.",
    link: { href: "/batches", label: "See batch timings" },
    media: <Image src={`${images.online}?w=1100&q=70&auto=format&fit=crop`} alt="Student in a live online Japanese class" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />,
  },
  {
    title: "Speak from the first class",
    body: "The JLPT doesn't test speaking — but real life does. Every class includes conversation, roleplay and pronunciation practice, and our Speaking Lab adds focused sessions for interviews and the workplace.",
    link: { href: "/speak-japanese", label: "Explore the Speaking Lab" },
    media: <Image src={`${images.onlinePair}?w=1100&q=70&auto=format&fit=crop`} alt="Two learners practising conversation" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />,
  },
  {
    title: "Progress you can see",
    body: "Quizzes, section tests and JLPT mock tests show exactly where you're strong and what to work on next — so you're never guessing whether you're ready.",
    link: { href: "/jlpt-quiz", label: "Try a free JLPT quiz" },
    media: <Image src={`${images.writing}?w=1100&q=70&auto=format&fit=crop`} alt="Learner writing Japanese practice notes" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />,
  },
];

export function TeachingRows() {
  return (
    <section className="bg-bg-alt py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
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
