import { whatsappLink } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Hanko } from "@/components/japan/Hanko";

const NOREN = ["日", "本", "語", "を", "学", "ぼ", "う"];

// Closing call to action: a wide wooden card with the message and actions on the left
// and a hanging noren curtain reading 日本語を学ぼう on the right.
export function FinalCTA() {
  return (
    <section className="final-cta relative bg-bg-alt pt-14 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="ema-card relative grid overflow-hidden rounded-3xl lg:grid-cols-[1.35fr_1fr]">
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="font-mincho text-lg font-bold text-hanko">さあ、始めましょう。</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance text-indigo-950 sm:text-4xl lg:text-5xl">
              Ready to Start Your Japanese Journey?
            </h2>
            <p className="mt-4 max-w-xl text-base text-charcoal-700 sm:text-lg">
              Take the first step — find your level, explore a batch, or talk to our admissions team.
            </p>
            <div className="mt-8 grid gap-3 sm:max-w-lg sm:grid-cols-2">
              <Button href="/level-test" size="lg">
                Take Free Level Test
              </Button>
              <Button href="/free-japanese-demo-class" variant="secondary" size="lg">
                Book Free Demo
              </Button>
              <Button href="/batches" variant="outline" size="lg">
                View Upcoming Batches
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

          <div aria-hidden className="relative hidden items-start justify-center bg-indigo-950/[0.04] px-8 pb-10 lg:flex">
            <span className="absolute inset-x-8 top-0 h-3 rounded-b-full bg-gradient-to-b from-[#8a5528] to-[#4d2b10]" />
            <div className="mt-3 flex gap-2">
              {NOREN.map((ch, i) => (
                <span
                  key={i}
                  style={{ animationDelay: `${-i * 0.35}s` }}
                  className="noren-panel flex h-56 w-12 justify-center rounded-b-lg bg-indigo-950 pt-5 font-mincho text-3xl font-bold text-[#fff3e0] shadow-lg xl:h-64 xl:w-14"
                >
                  {ch}
                </span>
              ))}
            </div>
            <span className="absolute bottom-8 right-8">
              <Hanko text="願" size={48} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
