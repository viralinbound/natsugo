import { jlptLevels } from "@/lib/data";
import { levelInfo } from "@/lib/curriculum";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { RoadmapTabs } from "@/components/home/RoadmapTabs";

export function JLPTRoadmap() {
  const levels = jlptLevels.map((l) => ({
    level: l.level,
    tagline: levelInfo[l.level].tagline,
    focus: l.focus,
    areas: l.areas,
    vocab: levelInfo[l.level].vocab,
    kanji: levelInfo[l.level].kanji,
    hours: levelInfo[l.level].studyHours,
  }));

  return (
    <section className="bg-bg py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="JLPT" title="Your JLPT Journey" description="Tap a level to see what it covers." />
          <Button href="/jlpt-japanese-preparation-course" variant="outline" size="sm">
            Explore JLPT Courses
          </Button>
        </div>
        <RoadmapTabs levels={levels} />
      </div>
    </section>
  );
}
