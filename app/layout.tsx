import type { Metadata, Viewport } from "next";
import { Fira_Sans, Montserrat, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/lib/site";
import { getAnnouncement } from "@/lib/repo";
import { ActivityTicker } from "@/components/live/ActivityTicker";

const fira = Fira_Sans({
  variable: "--font-fira",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const notoJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const viewport: Viewport = {
  themeColor: "#282828",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Natsugo | Learn Japanese Online in India — JLPT, Speaking, Career",
    template: "%s | Natsugo",
  },
  description:
    "Learn Japanese online with a structured path: free level test, live classes, JLPT preparation (N5–N1), speaking practice and progress tracking. Built for students and professionals in Bengaluru and across India.",
  openGraph: {
    title: "Natsugo | Learn Japanese. Know Your Level. Follow Your Path.",
    description:
      "A complete Japanese learning journey — level test, live classes, JLPT prep, speaking practice and progress tracking.",
    url: site.url,
    siteName: "Natsugo",
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

// Public pages are static and re-read Supabase at most once a minute (admin edits refresh instantly).
export const revalidate = 60;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const announcement = await getAnnouncement();
  return (
    <html
      lang="en"
      className={`${fira.variable} ${montserrat.variable} ${notoJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-charcoal-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-indigo-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <AnnouncementBar text={announcement.text} enabled={announcement.enabled} />
        <Navbar />
        <main id="main-content" className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <MobileStickyBar />
        <ActivityTicker />
        <JsonLd data={{ "@context": "https://schema.org", "@type": "EducationalOrganization", name: site.name, url: site.url, areaServed: "IN", address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "IN" } }} />
      </body>
    </html>
  );
}
