const facts = [
  { big: "N5→N1", label: "Complete JLPT path" },
  { big: "100%", label: "Live online classes — join from anywhere" },
  { big: "Free", label: "Level test and demo class" },
];

export function Intro() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-950 tracking-tight text-balance">
            Japanese classes built around <span className="underline decoration-sun-400 decoration-[6px] underline-offset-[6px]">where you want to go</span>
          </h2>
          <p className="mt-6 text-lg text-charcoal-700 leading-relaxed">
            Whether you&apos;re preparing for the JLPT, joining a Japanese client project, planning to study in Japan or just love the language — we start by finding your level, then give you a clear path, live teachers and regular practice to get there.
          </p>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-px bg-charcoal-100 rounded-lg overflow-hidden border border-charcoal-100">
          {facts.map((f) => (
            <div key={f.big} className="bg-surface p-6 flex lg:items-center gap-5 flex-col lg:flex-row">
              <dt className="text-3xl sm:text-4xl font-extrabold text-indigo-900 lg:w-40 shrink-0">{f.big}</dt>
              <dd className="text-charcoal-700 font-medium">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
