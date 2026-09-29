import type { MetadataRoute } from "next";
import { courseDetails } from "@/lib/courses";
import { blogPosts } from "@/lib/data";
import { resourceTopics } from "@/lib/resourceTopics";
import { site } from "@/lib/site";
import { difficulties, quizLevels } from "@/lib/quizBank";
import { lessonSeeds } from "@/lib/curriculum";
import { kanjiLevelOrder } from "@/lib/kanjiLevels";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/batches",
    "/level-test",
    "/free-japanese-demo-class",
    "/resources",
    "/blog",
    "/about-us",
    "/contact",
    "/teachers",
    "/success-stories",
    "/work-in-japan",
    "/study-in-japan",
  ];
  const paths = [
    ...staticPaths,
    ...courseDetails.map((c) => `/${c.slug}`),
    ...resourceTopics.map((t) => `/resources/${t.slug}`),
    ...kanjiLevelOrder.map((l) => `/resources/kanji/${l.toLowerCase()}`),
    ...blogPosts.map((p) => `/blog/${p.slug}`),
    "/jlpt-quiz",
    "/jlpt-exam-info",
    "/online-classroom",
    ...quizLevels.map((l) => `/online-classroom/${l.toLowerCase()}`),
    ...lessonSeeds.filter((l) => l.isFree).map((l) => `/online-classroom/${l.level.toLowerCase()}/${l.id}`),
    ...quizLevels.flatMap((l) => difficulties.map((d) => `/jlpt-quiz/${l.toLowerCase()}/${d.id}`)),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
