import Image from "next/image";
import { placeholderPhoto } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { getBatches, getTeachers } from "@/lib/repo";
import { images } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Japanese Teachers",
  description: "Meet the Japanese teachers behind our live online classes, levels taught and areas of specialisation.",
  alternates: { canonical: "/teachers" },
};

export default async function TeachersPage() {
  const [teachers, batches] = await Promise.all([getTeachers(), getBatches()]);
  return (
    <>
      <PageHero title="Meet your Japanese teachers" eyebrow="Teachers" intro="Every batch is taught live. Teacher profiles will be published here with verified qualifications." image={images.lecture} crumbs={[{ label: "Teachers", href: "/teachers" }]} />
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((t) => {
              const count = batches.filter((b) => b.teacherId === t.id).length;
              return (
                <article key={t.id} id={t.id} className="card-modern overflow-hidden scroll-mt-28">
                  <div className="relative aspect-[4/3]">
                    <Image src={t.photo ?? placeholderPhoto(t.id, 800)} alt={t.name} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-bold text-indigo-950">{t.name}</h2>
                    <p className="text-sm text-charcoal-500">{t.role}</p>
                    <dl className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between gap-3"><dt className="text-charcoal-500">Teaches</dt><dd className="font-semibold">{t.levels.join(", ")}</dd></div>
                      <div className="flex justify-between gap-3"><dt className="text-charcoal-500">Focus</dt><dd className="font-semibold text-right">{t.specialization}</dd></div>
                      <div className="flex justify-between gap-3"><dt className="text-charcoal-500">Experience</dt><dd className="font-semibold">{t.experienceYears ? `${t.experienceYears} years` : "To be added"}</dd></div>
                      <div className="flex justify-between gap-3"><dt className="text-charcoal-500">Upcoming batches</dt><dd className="font-semibold">{count}</dd></div>
                    </dl>
                    {t.bio ? <p className="mt-4 text-sm text-charcoal-700">{t.bio}</p> : null}
                    <div className="mt-5"><Button href={`/batches?level=${t.levels[0]}`} variant="outline" size="sm">View Classes</Button></div>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-8 text-sm text-charcoal-500">Want to teach with us? <Link href="/contact" className="underline">Get in touch</Link>.</p>
        </div>
      </section>
    </>
  );
}
