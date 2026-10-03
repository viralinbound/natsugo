import Image from "next/image";
import { getTeachers } from "@/lib/repo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { placeholderPhoto } from "@/lib/site";

export async function TeachersSection() {
  const teachers = await getTeachers();
  if (!teachers.length) {
    return (
      <section className="bg-bg-alt py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <SectionHeading eyebrow="Our Teachers" title="Meet your teacher in a free demo class" />
          <p className="mt-4 text-charcoal-700">We will add each teacher&apos;s profile here once it is confirmed. Until then, book a free demo class and meet the teacher who will take your batch.</p>
          <div className="mt-6 flex justify-center"><Button href="/free-japanese-demo-class">Book a free demo</Button></div>
        </div>
      </section>
    );
  }
  return (
    <section className="bg-bg-alt py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our Teachers" title="Meet Your Japanese Teachers" />
        <div className="swipe-row mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="card-modern teacher-card group overflow-hidden p-6"
            >
              <div className="relative -mx-6 -mt-6 aspect-[4/3]"><Image src={teacher.photo ?? placeholderPhoto(teacher.id, 700)} alt={teacher.name} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 82vw" className="object-cover transition-transform duration-700 group-hover:scale-110" /></div>
              <h3 className="mt-5 font-bold text-indigo-950">{teacher.name}</h3>
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
