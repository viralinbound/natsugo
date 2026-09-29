import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/site";

const pathways = [
  { title: "Work in Japan", href: "/work-in-japan", desc: "How language fits into working in Japan", img: images.tokyo, alt: "Tokyo skyline at dusk", big: true },
  { title: "Study in Japan", href: "/study-in-japan", desc: "Language requirements for schools and universities", img: images.kyoto, alt: "Traditional temple grounds in Kyoto", big: true },
  { title: "Business Japanese", href: "/business-japanese", desc: "Keigo, emails and meetings", img: images.office, alt: "Professionals in a business meeting" },
  { title: "Japanese Career in India", href: "/blog/japanese-language-career-opportunities", desc: "Roles that use Japanese", img: images.shibuya, alt: "Shibuya crossing in Tokyo" },
  { title: "Travel", href: "/resources/phrases", desc: "Phrases for your trip", img: images.sakura, alt: "Cherry blossoms in bloom" },
  { title: "Culture & Language", href: "/resources", desc: "Free resources to explore", img: images.pagoda, alt: "A traditional Japanese pagoda" },
];

export function JapanPathways() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wider text-sun-500">Pathways</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-indigo-950 tracking-tight">Where can Japanese take you?</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {pathways.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className={`group relative overflow-hidden rounded-lg ${p.big ? "col-span-2 aspect-[16/10] lg:aspect-auto lg:row-span-2 lg:min-h-[420px]" : "aspect-square sm:aspect-[4/3]"}`}
            >
              <Image src={`${p.img}?w=${p.big ? 1000 : 600}&q=65&auto=format&fit=crop`} alt={p.alt} fill sizes={p.big ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 50vw"} className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
                <h3 className={`font-extrabold ${p.big ? "text-xl sm:text-3xl" : "text-base sm:text-lg"}`}>{p.title}</h3>
                <p className="mt-1 text-xs sm:text-sm text-white/80">{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm text-charcoal-500 max-w-3xl">
          Language ability is one factor among many for jobs, visas and admissions — we don&apos;t guarantee any of them. Our pathway pages link to official sources.
        </p>
      </div>
    </section>
  );
}
