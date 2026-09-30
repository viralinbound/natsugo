import { faqs } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

export function FAQSection() {
  return (
    <section className="bg-bg py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          align="center"
        />
        <div className="mt-10">
          <FAQAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
