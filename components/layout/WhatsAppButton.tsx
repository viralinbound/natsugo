import { whatsappLink } from "@/lib/site";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Talk to Admissions on WhatsApp"
      title="Talk to Admissions"
      className="hidden lg:grid fixed bottom-6 right-6 z-40 h-12 w-12 place-items-center rounded-full bg-[#15803d] text-white shadow-lg shadow-[#25D366]/30 transition hover:scale-105 hover:brightness-95"
    >
      <MessageCircle size={22} />
    </a>
  );
}
