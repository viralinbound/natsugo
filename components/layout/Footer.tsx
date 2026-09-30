import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { TokyoClock } from "@/components/japan/TokyoClock";
import { UkiyoeWaves } from "@/components/japan/UkiyoeWaves";
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
    <footer className="relative isolate overflow-hidden bg-bg-alt pb-[calc(4.75rem+env(safe-area-inset-bottom))] text-charcoal-700 lg:pb-0">
      <UkiyoeWaves className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-16 w-full opacity-60 sm:h-24" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 min-w-0">
            <Logo />
            <p className="mt-4 text-sm text-charcoal-500 max-w-xs">
              A structured Japanese learning platform for students and
              professionals across India.
            </p>
            <div className="flex gap-3 mt-5">
              {(["instagram", "facebook", "linkedin", "youtube"] as const).map(
                (name) => (
                  <a
                    key={name}
                    href="#"
                    aria-label={`${name} link`}
                    className="h-9 w-9 flex items-center justify-center rounded-full border border-charcoal-100 bg-surface text-charcoal-700 hover:border-sun-400 hover:text-sun-500 transition-colors"
                  >
                    <SocialIcon name={name} size={16} />
                  </a>
                )
              )}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold text-indigo-950 mb-4">
                {col.title}
              </h3>
              <ul className="space-y-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-1 text-sm hover:text-sun-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-charcoal-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-xs text-charcoal-500">
          <div className="space-y-1">
            <TokyoClock />
            <p>© {new Date().getFullYear()} Natsugo · <a href={`tel:+${site.whatsappNumber}`} className="hover:text-sun-500">{site.phoneDisplay}</a> · <a href={`mailto:${site.email}`} className="hover:text-sun-500">{site.email}</a></p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-sun-500">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-sun-500">
              Terms
            </Link>
            <Link href="/refund-policy" className="hover:text-sun-500">
              Refund Policy
            </Link>
            <Link href="/contact" className="hover:text-sun-500">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
