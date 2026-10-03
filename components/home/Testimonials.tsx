import Image from "next/image";
import { getTestimonials } from "@/lib/repo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BadgeCheck } from "lucide-react";
import { placeholderPhoto } from "@/lib/site";

export async function Testimonials() {
  const testimonials = await getTestimonials();
  return (
    <section className="bg-bg-alt py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Success Stories" title="What Students Say" />
        <div className="swipe-row mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`rounded-lg border bg-surface p-6 ${t.isPlaceholder ? "border-dashed border-charcoal-300" : "border-charcoal-100"}`}
            >
              <div className="flex items-center gap-3">
                <Image src={t.photo ?? placeholderPhoto(t.id, 120)} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover ring-2 ring-sun-100" />
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
