import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { images, site, whatsappLink } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Contact Us — Japanese Classes in Bengaluru & Online",
  description: "Talk to our admissions team about Japanese courses, JLPT batches, fees and schedules. Call, WhatsApp or send us a message.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const rows = [
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with admissions", href: whatsappLink() },
    { icon: Phone, label: "Phone", value: site.phoneDisplay, href: `tel:+${site.whatsappNumber}` },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Classroom", value: `${site.city} — address to be added` },
    { icon: Clock, label: "Hours", value: site.hours },
  ];
  return (
    <>
      <PageHero title="Contact us" eyebrow="Admissions" intro="Questions about levels, batches or fees? We usually reply within one working day." image={images.office} crumbs={[{ label: "Contact", href: "/contact" }]} />
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
          <ul className="divide-y divide-charcoal-100 rounded-lg border border-charcoal-100 bg-surface">
            {rows.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-sun-100 text-indigo-900"><Icon size={18} /></span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500">{label}</p>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-semibold text-indigo-800 break-words hover:underline">{value}</a>
                  ) : (
                    <p className="font-semibold text-charcoal-900">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="rounded-lg border border-charcoal-100 bg-surface p-6 sm:p-8">
            <h2 className="text-xl font-bold text-indigo-950">Send us a message</h2>
            <div className="mt-5"><LeadForm type="contact" submitLabel="Send message" /></div>
          </div>
        </div>
      </section>
    </>
  );
}
