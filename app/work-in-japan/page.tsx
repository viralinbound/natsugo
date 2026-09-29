import type { Metadata } from "next";
import { images } from "@/lib/site";
import { PathwayPage } from "@/components/pathways/PathwayPage";

export const metadata: Metadata = {
  title: "Work in Japanese Language | Japanese for Japan Jobs",
  description: "Learn Japanese for working in Japan with Natsugo. Improve speaking, workplace Japanese, JLPT skills and communication for your Japan career goals.",
  keywords: ["Work in Japanese Language", "Japanese for Japan Jobs", "Learn Japanese for Work in Japan", "Japanese Language for Jobs in Japan", "Japanese Speaking for Work", "Workplace Japanese Course", "Japanese Language Course for Work"],
  alternates: { canonical: "/work-in-japan" },
};

export default function Page() {
  return (
    <PathwayPage
      c={{
        slug: "work-in-japan",
        title: "Working in Japan: where Japanese fits in",
        eyebrow: "Work in Japan",
        intro: "Japanese ability can widen the roles open to you and makes daily life and teamwork in Japan much easier. Here's an honest overview.",
        image: images.tokyo,
        sideImage: images.office,
        steps: [
          { title: "Know your target role", body: "IT roles in English-speaking teams may need little Japanese; customer-facing, manufacturing or care roles often need much more." },
          { title: "Build a solid base (N5–N4)", body: "Everyday Japanese helps in interviews and daily life, and is the foundation for everything after." },
          { title: "Aim for workplace Japanese (N3–N2)", body: "Many employers look for N3 or N2 for roles where Japanese is used at work." },
          { title: "Practise speaking and keigo", body: "The JLPT has no speaking section, so interviews test skills the exam doesn't. Our Speaking Lab and Business Japanese courses cover this." },
          { title: "Check official requirements", body: "Visa categories and eligibility are set by the Government of Japan. Confirm details with official sources." },
        ],
        levelGuide: [
          { level: "N5–N4", note: "Daily life, basic workplace interaction, some entry-level programmes" },
          { level: "N3", note: "Roles with regular but simple Japanese communication" },
          { level: "N2", note: "Many roles where Japanese is used for business communication" },
          { level: "N1", note: "Roles needing advanced Japanese, such as translation or client-facing leadership" },
        ],
        links: [
          { label: "JLPT official website", href: "https://www.jlpt.jp/e/" },
          { label: "Ministry of Foreign Affairs of Japan — Visas", href: "https://www.mofa.go.jp/j_info/visit/visa/index.html" },
          { label: "Embassy of Japan in India", href: "https://www.in.emb-japan.go.jp/" },
        ],
        faqs: [
          { question: "Does JLPT N4 or N3 guarantee a job in Japan?", answer: "No. Language level is one factor. Employers also consider skills, experience and interviews, and visa eligibility is decided by the Japanese government." },
          { question: "Do you help with job placement or visas?", answer: "No. We focus on language training. We can help you prepare for Japanese interviews through our speaking courses." },
          { question: "Which course should I start with?", answer: "Take the free level test. Most learners start with JLPT N5 and continue to N4 and N3." },
        ],
      }}
    />
  );
}
