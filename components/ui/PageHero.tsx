import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";
import { jpFor } from "@/lib/jpLabels";

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
  const jp = jpFor(eyebrow);
  return (
    <section className="relative isolate overflow-hidden bg-indigo-950 text-white">
      <Image
        src={`${image}?w=1800&q=70&auto=format&fit=crop`}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-indigo-950/60 sm:hidden" />
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-indigo-950/85 via-indigo-950/45 to-transparent sm:block" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <Breadcrumb items={crumbs} light />
        {eyebrow ? (
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sun-300 backdrop-blur">
            <span aria-hidden className="h-2 w-2 rounded-full bg-hanko" />
            {eyebrow}
            {jp ? <span className="font-mincho normal-case tracking-normal text-white/75">· {jp}</span> : null}
          </p>
        ) : null}
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {intro ? <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">{intro}</p> : null}
        {children ? <div className="mt-7 flex flex-col gap-3 sm:flex-row">{children}</div> : null}
      </div>
      <div aria-hidden className="gradient-strip absolute inset-x-0 bottom-0 h-px" />
    </section>
  );
}
