import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Teacher photo uploads go through a Server Action (4 MB image limit + multipart overhead).
  experimental: { serverActions: { bodySizeLimit: "5mb" } },
  // Keyword-variant URLs from the SEO sitemap that map to an existing page, so both
  // resolve instead of duplicating content under a second URL.
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
