import { Breadcrumb } from "@/components/ui/Breadcrumb";

export function LegalPage({ title, slug, sections }: { title: string; slug: string; sections: { h: string; p: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
      <Breadcrumb items={[{ label: title, href: `/${slug}` }]} />
      <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-indigo-950">{title}</h1>
      <p className="mt-3 rounded bg-sun-100 px-3 py-2 text-sm text-charcoal-800">
        Template text — must be reviewed and finalised by the business before launch.
      </p>
      <div className="prose-article mt-6">
        {sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            <p>{s.p}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
