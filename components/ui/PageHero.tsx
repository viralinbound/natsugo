import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";
import { SakuraPetals } from "@/components/japan/SakuraPetals";

export function PageHero({
  title,
  eyebrow,
  intro,
  image,
  crumbs,
  children,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  image: string;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="brand-pattern brand-pattern-light relative isolate overflow-hidden bg-indigo-950 text-white">
      <Image
        src={`${image}?w=1800&q=70&auto=format&fit=crop`}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10 opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-950/95 via-indigo-950/70 to-indigo-950/30" />
      <SakuraPetals />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <Breadcrumb items={crumbs} light />
        {eyebrow ? (
          <p className="mt-6 text-sm font-bold uppercase tracking-wider text-sun-300">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl text-balance">
          {title}
        </h1>
        {intro ? <p className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl">{intro}</p> : null}
        {children ? <div className="mt-7 flex flex-col sm:flex-row gap-3">{children}</div> : null}
      </div>
    </section>
  );
}
