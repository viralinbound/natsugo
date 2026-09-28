import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy-policy" } };

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      slug="privacy-policy"
      sections={[
        { h: "What we collect", p: "When you submit a form we collect your name, mobile number, optional email, course interest and any message you write." },
        { h: "How we use it", p: "We use your details only to respond to your enquiry, arrange demo classes and manage enrolment. We do not sell your data." },
        { h: "Level test", p: "Level test answers are processed in your browser and are not stored unless you submit a form." },
        { h: "Your rights", p: "You can ask us to access, correct or delete your data at any time by contacting us." },
      ]}
    />
  );
}
