import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

// Closing call to action: a navy brand banner that sits directly above the footer.
export function FinalCTA() {
  return (
    <section className="final-cta relative bg-bg py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-3xl bg-[#0b1b3a] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_80%_at_100%_0%,rgb(12_136_255/0.45),transparent_70%),radial-gradient(40%_70%_at_0%_100%,rgb(34_211_238/0.25),transparent_70%)]" />
          <span aria-hidden className="pointer-events-none absolute -bottom-10 right-4 -z-10 font-jp text-[8rem] font-bold leading-none text-white/[0.06] sm:text-[12rem]">始めよう</span>
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="font-jp text-base font-bold text-[#7cc4ff]">さあ、始めましょう。</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                Ready to start your Japanese journey?
              </h2>
              <p className="mt-3 max-w-xl text-white/75 sm:text-lg">
                Find your level in five minutes, then join a live batch that fits your schedule.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/level-test" className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-md bg-[#0c88ff] hover:bg-[#0a6fd1] px-6 font-bold text-white">
                Take Free Level Test <ArrowRight size={18} />
              </Link>
              <Link href="/batches" className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-md border-2 border-white/30 px-6 font-bold text-white transition-colors hover:border-white">
                View Upcoming Batches
              </Link>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center justify-center gap-2 text-sm font-bold text-white/80 hover:text-white">
                <MessageCircle size={16} /> Or talk to us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
