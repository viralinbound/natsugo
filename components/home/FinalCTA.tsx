import { whatsappLink } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden aurora py-16 sm:py-20 text-white">
      <div aria-hidden className="rising-sun absolute -z-10 left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-jp text-sun-300 text-lg mb-3">さあ、始めましょう。</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance">
          Ready to Start Your Japanese Journey?
        </h2>
        <p className="mt-4 text-white/70 max-w-xl mx-auto text-balance">
          Take the first step — find your level, explore a batch, or talk to
          our admissions team.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
          <Button href="/level-test" size="lg">
            Take Free Level Test
          </Button>
          <Button href="/batches" variant="outline-light" size="lg">
            View Upcoming Batches
          </Button>
          <Button href="/free-japanese-demo-class" variant="secondary" size="lg">
            Book Free Demo
          </Button>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md font-bold transition-colors bg-[#25D366] text-white hover:brightness-95 text-base sm:text-lg px-7 py-3.5 min-h-[52px]"
          >
            Talk on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
