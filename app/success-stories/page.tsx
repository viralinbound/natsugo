import type { Metadata } from "next";
import { images } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Testimonials } from "@/components/home/Testimonials";
import { ReviewForm } from "@/components/forms/ReviewForm";

export const metadata: Metadata = {
  title: "Student Success Stories",
  description: "Verified stories from Japanese learners — their level, course and journey.",
  alternates: { canonical: "/success-stories" },
};

export default function SuccessStoriesPage() {
  return (
    <>
      <PageHero title="Student success stories" eyebrow="Success Stories" intro="We only publish verified reviews from real students. Stories will appear here as our learners complete their levels." image={images.groupStudy} crumbs={[{ label: "Success Stories", href: "/success-stories" }]} />
      <Testimonials />
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-indigo-950">Are you one of our students?</h2>
          <p className="mt-1 text-charcoal-700">Share your experience. Reviews are checked by our team before they appear.</p>
          <div className="mt-6 card-modern p-6"><ReviewForm /></div>
        </div>
      </section>
    </>
  );
}
