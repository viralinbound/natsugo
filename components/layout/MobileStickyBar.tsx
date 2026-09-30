"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CalendarDays, House, MessageCircle, Sparkles } from "lucide-react";
import { whatsappLink } from "@/lib/site";

const tabs = [
  { href: "/", label: "Home", icon: House, primary: false },
  { href: "/learn-japanese-language-course", label: "Courses", icon: BookOpen, primary: false },
  { href: "/level-test", label: "Test", icon: Sparkles, primary: true },
  { href: "/batches", label: "Batches", icon: CalendarDays, primary: false },
];

export function MobileStickyBar() {
  const path = usePathname();
  const active = (href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`));
  const base = "flex flex-col items-center justify-center gap-1 pt-2 pb-1.5 min-h-[60px] text-[11px] font-semibold transition-colors";

  return (
    <nav aria-label="Quick navigation" className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-lg border-t border-charcoal-100 shadow-[0_-6px_24px_rgba(11,27,58,0.10)] pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5">
        {tabs.map(({ href, label, icon: Icon, primary }) =>
          primary ? (
            <Link key={href} href={href} className="flex flex-col items-center justify-end gap-1 pb-1.5 text-[11px] font-bold text-sun-500">
              <span className="btn-shine -mt-6 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-sun-400 to-cyan-400 text-white shadow-lg shadow-sun-400/40 ring-4 ring-surface">
                <Icon size={22} />
              </span>
              {label}
            </Link>
          ) : (
            <Link key={href} href={href} aria-current={active(href) ? "page" : undefined} className={`${base} ${active(href) ? "text-sun-500" : "text-charcoal-500"}`}>
              <span className={`grid h-7 w-12 place-items-center rounded-full transition-colors ${active(href) ? "bg-sun-100" : ""}`}>
                <Icon size={19} />
              </span>
              {label}
            </Link>
          ),
        )}
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${base} text-[#1fa855]`}>
          <span className="grid h-7 w-12 place-items-center">
            <MessageCircle size={19} />
          </span>
          Chat
        </a>
      </div>
    </nav>
  );
}
