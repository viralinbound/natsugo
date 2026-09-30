import { whatsappLink } from "@/lib/site";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Talk to Admissions on WhatsApp"
      className="hidden lg:flex fixed bottom-6 right-6 z-40 items-center gap-2 rounded-full bg-[#15803d] text-white pl-4 pr-5 py-3.5 font-semibold shadow-lg shadow-[#25D366]/30 hover:brightness-95 transition"
    >
      <MessageCircle size={20} />
      Talk to Admissions
    </a>
  );
}
