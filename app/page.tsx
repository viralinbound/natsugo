import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Bento } from "@/components/home/Bento";
import { ToriiDivider } from "@/components/japan/ToriiDivider";
import { CoursesShowcase } from "@/components/home/CoursesShowcase";
import { TeachingRows } from "@/components/home/TeachingRows";
import { JLPTRoadmap } from "@/components/home/JLPTRoadmap";
import { BatchesSection } from "@/components/home/BatchesSection";
import { TeachersSection } from "@/components/home/TeachersSection";
import { Testimonials } from "@/components/home/Testimonials";
import { FreeResources } from "@/components/home/FreeResources";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqs } from "@/lib/data";
import { getBatches } from "@/lib/repo";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  const batches = await getBatches();
  return (
    <>
      <Hero />
      <Bento />
      <ToriiDivider />
      <CoursesShowcase />
      <TeachingRows />
      <ToriiDivider />
      <JLPTRoadmap />
      <BatchesSection batches={batches} />
      <TeachersSection />
      <Testimonials />
      <FreeResources />
      <ToriiDivider />
      <FAQSection />
      <FinalCTA />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
        }}
      />
    </>
  );
}
