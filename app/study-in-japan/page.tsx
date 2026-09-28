import type { Metadata } from "next";
import { images } from "@/lib/site";
import { PathwayPage } from "@/components/pathways/PathwayPage";

export const metadata: Metadata = {
  title: "Study in Japan — Japanese Language Preparation",
  description: "Preparing to study in Japan? Learn how Japanese language requirements typically work for language schools, universities and exchange programmes.",
  alternates: { canonical: "/study-in-japan" },
};

export default function Page() {
  return (
    <PathwayPage
      c={{
        slug: "study-in-japan",
        title: "Studying in Japan: preparing your Japanese",
        eyebrow: "Study in Japan",
        intro: "From language schools to degree programmes, Japanese requirements vary widely. Start early and aim a level above the minimum.",
        image: images.kyoto,
        sideImage: images.groupStudy,
        steps: [
          { title: "Choose your programme type", body: "Japanese language schools, English-taught degrees and Japanese-taught degrees all have very different language expectations." },
          { title: "Check each institution's requirement", body: "Universities may ask for a JLPT level or the EJU (Examination for Japanese University Admission)." },
          { title: "Plan your timeline backwards", body: "The JLPT is held in India typically in July and December — plan which session you need results from." },
          { title: "Build real communication skills", body: "Lectures, group work and part-time life need listening and speaking beyond exam practice." },
        ],
        levelGuide: [
          { level: "N5–N4", note: "Often a starting point for Japanese language schools" },
          { level: "N3", note: "Helpful for vocational schools and daily student life" },
          { level: "N2–N1", note: "Commonly required for Japanese-taught university programmes" },
        ],
        links: [
          { label: "Study in Japan (JASSO) — official guide", href: "https://www.studyinjapan.go.jp/en/" },
          { label: "JLPT official website", href: "https://www.jlpt.jp/e/" },
          { label: "Embassy of Japan in India", href: "https://www.in.emb-japan.go.jp/" },
        ],
        faqs: [
          { question: "Do you arrange admissions to Japanese universities?", answer: "No. We are a language institute and do not provide admission services. We help you reach the Japanese level you need." },
          { question: "Is the JLPT enough for university admission?", answer: "It depends on the institution. Some also require the EJU or their own tests. Always check the official admission guidelines." },
          { question: "How long will it take to reach N2?", answer: "For most learners, several years of consistent study. Starting early makes a big difference." },
        ],
      }}
    />
  );
}
