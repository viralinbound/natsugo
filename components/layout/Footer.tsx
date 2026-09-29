import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { TokyoClock } from "@/components/japan/TokyoClock";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Courses",
    links: [
      { label: "Japanese for Beginners", href: "/japanese-for-beginners" },
      { label: "Japanese Language Course", href: "/japanese-language-course" },
      { label: "Speaking Japanese", href: "/speaking-japanese" },
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
      { label: "Student login", href: "/student" },
      { label: "Online Classroom", href: "/learn" },
      { label: "Contact", href: "/contact" },
      { label: "Free Demo", href: "/free-japanese-demo-class" },
      { label: "Batches", href: "/batches" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="brand-pattern brand-pattern-light bg-indigo-950 text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 min-w-0">
            <Logo light />
            <p className="mt-4 text-sm text-white/60 max-w-xs">
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
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <SocialIcon name={name} size={16} />
                  </a>
                )
              )}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white mb-4">
                {col.title}
              </h3>
              <ul className="space-y-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-1 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-xs text-white/50">
          <div className="space-y-1">
            <TokyoClock />
            <p>© {new Date().getFullYear()} Natsugo · <a href={`tel:+${site.whatsappNumber}`} className="hover:text-white/80">{site.phoneDisplay}</a> · <a href={`mailto:${site.email}`} className="hover:text-white/80">{site.email}</a></p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-white/80">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/80">
              Terms
            </Link>
            <Link href="/refund-policy" className="hover:text-white/80">
              Refund Policy
            </Link>
            <Link href="/contact" className="hover:text-white/80">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
