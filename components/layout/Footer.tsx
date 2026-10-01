import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { TokyoClock } from "@/components/japan/TokyoClock";
import { Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Courses",
    links: [
      { label: "Japanese for Beginners", href: "/japanese-for-beginners" },
      { label: "Japanese Language Course", href: "/learn-japanese-language-course" },
      { label: "Speaking Japanese", href: "/speak-japanese" },
      { label: "Business Japanese", href: "/business-japanese" },
    ],
  },
  {
    title: "JLPT",
    links: [
      { label: "JLPT N5", href: "/jlpt-n5" },
      { label: "JLPT N4", href: "/jlpt-n4" },
      { label: "JLPT N3", href: "/jlpt-n3" },
      { label: "JLPT N2", href: "/jlpt-n2" },
      { label: "JLPT N1", href: "/jlpt-n1" },
      { label: "Exam Dates & Fees", href: "/jlpt-exam-info" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Hiragana", href: "/resources/hiragana" },
      { label: "Katakana", href: "/resources/katakana" },
      { label: "Kanji", href: "/resources/kanji" },
      { label: "JLPT Quiz", href: "/jlpt-quiz" },
      { label: "Flashcards", href: "/resources/flashcards" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Japan Pathways",
    links: [
      { label: "Work in Japan", href: "/work-in-japan" },
      { label: "Study in Japan", href: "/study-in-japan" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Teachers", href: "/teachers" },
      { label: "Success Stories", href: "/success-stories" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Online Classroom", href: "/online-classroom" },
      { label: "Contact", href: "/contact" },
      { label: "Free Demo", href: "/free-japanese-demo-class" },
      { label: "Batches", href: "/batches" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#0b1b3a] pb-[calc(4.75rem+env(safe-area-inset-bottom))] text-white/70 lg:pb-0">
      <span aria-hidden className="gradient-strip absolute inset-x-0 top-0 h-1" />
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2.9fr] lg:gap-16">
          <div className="min-w-0">
            <Logo light />
            <p className="mt-4 max-w-xs text-sm">
              Structured Japanese for students and professionals across India. Live online classes, N5 to N1.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone size={15} className="text-[#7cc4ff]" /><a href={`tel:+${site.whatsappNumber}`} className="hover:text-white">{site.phoneDisplay}</a></li>
              <li className="flex items-center gap-2"><Mail size={15} className="text-[#7cc4ff]" /><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            </ul>
            <div className="mt-5 flex gap-2.5">
              {(["instagram", "facebook", "linkedin", "youtube"] as const).map((name) => (
                <a
                  key={name}
                  href="#"
                  aria-label={`${name} link`}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#1e90ff]"
                >
                  <SocialIcon name={name} size={16} />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-sm font-bold text-white">{col.title}</h3>
                <ul className="space-y-1">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-block py-1 text-sm transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <div className="space-y-1 [&_p]:text-white/60 [&_span]:text-white/40">
            <TokyoClock />
            <p>© {new Date().getFullYear()} Natsugo · 日本語を、あなたのペースで。</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/refund-policy" className="hover:text-white">Refund Policy</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
