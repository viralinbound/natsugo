import Link from "next/link";
import { CalendarDays, MessageCircle, Sparkles } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export function MobileStickyBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-charcoal-100 shadow-[0_-4px_16px_rgba(15,19,41,0.08)] pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3">
        <Link
          href="/level-test"
          className="flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] text-indigo-800 font-semibold text-xs"
        >
          <Sparkles size={18} />
          Level Test
        </Link>
        <Link
          href="/batches"
          className="flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] text-charcoal-700 font-semibold text-xs border-x border-charcoal-100"
        >
          <CalendarDays size={18} />
          View Batches
        </Link>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] text-[#1fa855] font-semibold text-xs"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
