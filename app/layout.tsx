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

const ogImage = { url: "/og-image.png", width: 1200, height: 630, alt: "Natsugo — Learn Japanese Online in India" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Japanese Language Course Online | Learn Japanese Easily",
    template: "%s | Natsugo",
  },
  description:
    "Learn Japanese online with easy, structured lessons for beginners. Build speaking, reading, writing and grammar skills with Natsugo.",
  keywords: [
    "Best Japanese Language Course Online",
    "Easy Japanese Course Online",
    "Japanese Online Course for Beginners",
    "Learn Japanese Fast Online",
    "Japanese Speaking Classes Online",
    "Japanese Conversation Course Online",
    "Japanese Course Online with Certificate",
    "Affordable Japanese Course Online",
    "Japanese Classes Online for Beginners",
    "Learn Japanese from Home",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Japanese Language Course Online | Learn Japanese Easily",
    description:
      "Learn Japanese online with easy, structured lessons for beginners. Build speaking, reading, writing and grammar skills with Natsugo.",
    url: site.url,
    siteName: "Natsugo",
    locale: "en_IN",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Japanese Language Course Online | Learn Japanese Easily",
    description:
      "Learn Japanese online with easy, structured lessons for beginners. Build speaking, reading, writing and grammar skills with Natsugo.",
    images: [ogImage.url],
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
      <body className="washi min-h-full flex flex-col bg-bg text-charcoal-900">
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
        <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url }} />
      </body>
    </html>
  );
}
