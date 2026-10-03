import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Refund Policy", alternates: { canonical: "/refund-policy" } };

export default function Page() {
  return (
    <LegalPage
      title="Refund Policy"
      slug="refund-policy"
      sections={[
        { h: "Before the batch starts", p: "Refund terms for each batch are confirmed in writing by admissions before you pay. Please ask for them first, and keep that message." },
        { h: "After the batch starts", p: "Whether a fee can be refunded or moved to another batch after classes begin is confirmed by admissions in writing before you pay." },
        { h: "How to request", p: "Contact admissions with your name, batch and payment reference." },
      ]}
    />
  );
}
