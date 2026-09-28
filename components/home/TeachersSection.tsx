import Image from "next/image";
import { getTeachers } from "@/lib/repo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { UserRound } from "lucide-react";

export async function TeachersSection() {
  const teachers = await getTeachers();
  return (
    <section className="bg-bg-alt py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our Teachers" title="Meet Your Japanese Teachers" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="rounded-lg border border-charcoal-100 bg-surface p-6"
            >
              {teacher.photo ? (
                <Image src={teacher.photo} alt={teacher.name} width={64} height={64} className="h-16 w-16 rounded-full object-cover" />
              ) : (
                <div className="h-16 w-16 rounded-full bg-indigo-800/8 text-indigo-800 flex items-center justify-center">
                  <UserRound size={28} />
                </div>
              )}
              <h3 className="mt-4 font-bold text-indigo-950">{teacher.name}</h3>
              <p className="text-sm text-charcoal-500">{teacher.role}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {teacher.levels.map((lvl) => (
                  <Badge key={lvl} tone="neutral">
                    {lvl}
                  </Badge>
                ))}
              </div>
              <p className="mt-3 text-sm text-charcoal-700">
                {teacher.specialization}
              </p>
              <div className="mt-5 flex gap-2">
                <Button href="/teachers" variant="outline" size="sm">
                  View Profile
                </Button>
                <Button href="/batches" variant="ghost" size="sm">
                  View Classes
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
