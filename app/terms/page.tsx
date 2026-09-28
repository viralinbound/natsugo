import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

export default function Page() {
  return (
    <LegalPage
      title="Terms of Use"
      slug="terms"
      sections={[
        { h: "Courses", p: "Course content, schedules and teachers may change. Confirmed details are shared at enrolment." },
        { h: "Certificates", p: "Institute certificates confirm course completion. They are not official JLPT certificates." },
        { h: "No guarantees", p: "We do not guarantee exam results, jobs, visas or admissions." },
        { h: "Website content", p: "Free resources are provided for personal learning and may not be republished without permission." },
      ]}
    />
  );
}
