import { whatsappLink } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Hanko } from "@/components/japan/Hanko";

// Closing call to action: a noren (shop-entrance curtain) reading 日本語を学ぼう over an ema wish plaque.
// Shares the footer's background so the two read as one closing section.
const NOREN = ["日", "本", "語", "を", "学", "ぼ", "う"];

export function FinalCTA() {
  return (
    <section className="final-cta relative bg-bg-alt pb-10 sm:pb-14">
      <div aria-hidden className="noren mx-auto flex max-w-5xl justify-center gap-1.5 px-4 sm:gap-2.5">
        {NOREN.map((ch, i) => (
          <span key={i} style={{ animationDelay: `${-i * 0.35}s` }} className="noren-panel grid h-20 flex-1 max-w-[88px] place-items-center rounded-b-lg bg-indigo-950 pt-3 font-mincho text-2xl font-bold text-[#fff3e0] shadow-lg sm:h-28 sm:text-4xl">
            {ch}
          </span>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-4xl px-4 sm:mt-14 sm:px-6 lg:px-8">
        <div aria-hidden className="mx-auto flex w-40 justify-between">
          <span className="h-10 w-0.5 bg-hanko/70" />
          <span className="h-10 w-0.5 bg-hanko/70" />
        </div>
        <div className="ema-card relative mx-auto px-6 pb-10 pt-16 text-center sm:px-12 sm:pb-12 sm:pt-20">
          <span aria-hidden className="absolute left-1/2 top-5 h-3 w-3 -translate-x-1/2 rounded-full bg-hanko shadow" />
          <span className="absolute bottom-8 right-8 hidden sm:block">
            <Hanko text="願" size={44} />
          </span>
          <p className="font-mincho text-lg font-bold text-hanko">さあ、始めましょう。</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-balance text-indigo-950 sm:text-3xl lg:text-4xl">
            Ready to Start Your Japanese Journey?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-charcoal-700">
            Take the first step — find your level, explore a batch, or talk to our admissions team.
          </p>
          <div className="mt-8 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
            <Button href="/level-test" size="lg">
              Take Free Level Test
            </Button>
            <Button href="/batches" variant="outline" size="lg">
              View Upcoming Batches
            </Button>
            <Button href="/free-japanese-demo-class" variant="secondary" size="lg">
              Book Free Demo
            </Button>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-[#15803d] px-7 py-3.5 text-base font-bold text-white transition-colors hover:brightness-95 sm:text-lg"
            >
              Talk on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
