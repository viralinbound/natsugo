import type { NextConfig } from "next";

// Where the site is allowed to load things from. Next.js needs inline scripts for hydration, so script-src keeps
// 'unsafe-inline' (and 'unsafe-eval' only in development). Everything else is locked to the sources we actually use.
const isDev = process.env.NODE_ENV !== "production";
const blob = "https://*.public.blob.vercel-storage.com";
const supabase = "https://*.supabase.co";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://images.unsplash.com ${blob} ${supabase}`,
  `media-src 'self' blob: ${blob} ${supabase}`,
  "font-src 'self' data:",
  `connect-src 'self' ${supabase} wss://*.supabase.co https://cdn.jsdelivr.net https://blob.vercel-storage.com https://*.blob.vercel-storage.com${isDev ? " ws: http://localhost:*" : ""}`,
  "frame-src https://www.youtube-nocookie.com https://player.vimeo.com https://drive.google.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Teacher photo uploads go through a Server Action (4 MB image limit + multipart overhead).
  experimental: { serverActions: { bodySizeLimit: "5mb" } },
  // Keyword-variant URLs from the SEO sitemap that map to an existing page, so both
  // resolve instead of duplicating content under a second URL.
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/japanese-course-for-beginners", destination: "/japanese-for-beginners", permanent: true },
      { source: "/japanese-language-classes", destination: "/learn-japanese-language-course", permanent: true },
      { source: "/japanese-speaking-course", destination: "/speak-japanese", permanent: true },
      { source: "/jlpt-n5-course", destination: "/jlpt-n5", permanent: true },
      { source: "/jlpt-n4-course", destination: "/jlpt-n4", permanent: true },
      { source: "/jlpt-n3-course", destination: "/jlpt-n3", permanent: true },
      { source: "/jlpt-n2-course", destination: "/jlpt-n2", permanent: true },
      { source: "/jlpt-n1-course", destination: "/jlpt-n1", permanent: true },
      { source: "/resources/japanese-vocabulary", destination: "/resources/vocabulary", permanent: true },
      { source: "/resources/japanese-grammar", destination: "/resources/grammar", permanent: true },
      { source: "/resources/japanese-phrases", destination: "/resources/phrases", permanent: true },

      // Renamed course/section URLs, per the on-page SEO sheet — old URLs 301 to the new ones.
      { source: "/japanese-language-course", destination: "/learn-japanese-language-course", permanent: true },
      { source: "/speaking-japanese", destination: "/speak-japanese", permanent: true },
      { source: "/jlpt-japanese-course", destination: "/jlpt-japanese-preparation-course", permanent: true },
      { source: "/learn", destination: "/online-classroom", permanent: true },
      { source: "/learn/:path*", destination: "/online-classroom/:path*", permanent: true },
      { source: "/business-japanese-for-professional", destination: "/business-japanese", permanent: true },
      { source: "/student", destination: "/online-classroom", permanent: true },
      { source: "/student/:path*", destination: "/online-classroom", permanent: true },
      { source: "/resources/jlpt-practice", destination: "/jlpt-quiz", permanent: true },
      { source: "/jlpt-quiz/:level/:set(easy|medium|hard)", destination: "/jlpt-quiz/:level/full", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com", pathname: "/**" },
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
};

export default nextConfig;
