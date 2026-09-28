import Image from "next/image";
import { getTestimonials } from "@/lib/repo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { UserRound, BadgeCheck } from "lucide-react";

export async function Testimonials() {
  const testimonials = await getTestimonials();
  return (
    <section className="bg-bg-alt py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Success Stories" title="What Students Say" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`rounded-lg border bg-surface p-6 ${t.isPlaceholder ? "border-dashed border-charcoal-300" : "border-charcoal-100"}`}
            >
              <div className="flex items-center gap-3">
                {t.photo ? (
                  <Image src={t.photo} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-bg-alt text-charcoal-500 flex items-center justify-center">
                    <UserRound size={22} />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-charcoal-800 text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-charcoal-500">
                    {t.course} · {t.level}
                  </p>
                </div>
              </div>
              <p className={`mt-4 text-sm ${t.isPlaceholder ? "italic text-charcoal-500" : "text-charcoal-800"}`}>
                &ldquo;{t.quote}&rdquo;
              </p>
              {t.verified ? (
                <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-success">
                  <BadgeCheck size={14} /> Verified Review
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
