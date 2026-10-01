import type { Metadata, Viewport } from "next";
import { Kaisei_Tokumin, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FunEffects } from "@/components/ui/FunEffects";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/lib/site";
import { getAnnouncement } from "@/lib/repo";
import { ActivityTicker } from "@/components/live/ActivityTicker";

// Type from Japanese foundries so Latin and Japanese text share one voice:
// Kaisei Tokumin for headings (a brush-influenced mincho), Zen Maru Gothic for body and UI (soft, rounded).
const zenGothic = Zen_Maru_Gothic({
  variable: "--font-zen-gothic",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const zenMincho = Kaisei_Tokumin({
  variable: "--font-zen-mincho",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#282828",
  width: "device-width",
  initialScale: 1,
};

const ogImage = { url: "/og-image.png", width: 1200, height: 630, alt: "Natsugo: Learn Japanese Online in India" };

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
      className={`${zenGothic.variable} ${zenMincho.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("np-theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}` }} />
      </head>
      <body className="washi min-h-full flex flex-col bg-bg text-charcoal-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-indigo-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <AnnouncementBar text={announcement.text} enabled={announcement.enabled} />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollReveal />
        <FunEffects />
        <CommandPalette />
        <WhatsAppButton />
        <MobileStickyBar />
        <ActivityTicker />
        <JsonLd data={{ "@context": "https://schema.org", "@type": "EducationalOrganization", name: site.name, url: site.url, areaServed: "IN", address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "IN" } }} />
        <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url }} />
      </body>
    </html>
  );
}
