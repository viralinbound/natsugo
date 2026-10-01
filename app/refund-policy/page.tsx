import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Refund Policy", alternates: { canonical: "/refund-policy" } };

export default function Page() {
  return (
    <LegalPage
      title="Refund Policy"
      slug="refund-policy"
      sections={[
        { h: "Before the batch starts", p: "[To be defined by the business, e.g. refund window and any processing fee.]" },
        { h: "After the batch starts", p: "[To be defined by the business, e.g. batch transfer options.]" },
        { h: "How to request", p: "Contact admissions with your name, batch and payment reference." },
      ]}
    />
  );
}
