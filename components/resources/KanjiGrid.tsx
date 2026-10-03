"use client";

import { useState } from "react";
import { Loader2, PenLine, Volume2 } from "lucide-react";
import { KanjiPractice } from "@/components/japan/KanjiPractice";
import { PracticeToggle, usePracticeMode } from "@/components/japan/PracticeToggle";
import { speakJapanese } from "@/components/ui/SpeakButton";

interface Detail {
  reading: string | null;
  meaning: string | null;
  loading: boolean;
}

export function KanjiGrid({ kanji, known }: { kanji: string[]; known: Map<string, { m: string; r: string }> }) {
  const [active, setActive] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, Detail>>({});
  const [open, setOpen] = useState(false);
  const [practice] = usePracticeMode();

  async function handleTap(k: string) {
    setActive(k);
    if (practice) setOpen(true);
    else speakJapanese(k);
    if (details[k] || known.has(k)) return;
    setDetails((d) => ({ ...d, [k]: { reading: null, meaning: null, loading: true } }));
    try {
      const res = await fetch(`/api/kanji-lookup?c=${encodeURIComponent(k)}`);
      const data = await res.json();
      setDetails((d) => ({ ...d, [k]: { reading: data.reading, meaning: data.meaning, loading: false } }));
    } catch {
      setDetails((d) => ({ ...d, [k]: { reading: null, meaning: null, loading: false } }));
    }
  }

  const info = active
    ? known.get(active)
      ? { reading: known.get(active)!.r, meaning: known.get(active)!.m, loading: false }
      : details[active]
    : undefined;

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <PracticeToggle />
      </div>
      <div className="grid grid-cols-3 gap-4 pb-2 sm:grid-cols-5 sm:gap-5 md:grid-cols-6 lg:grid-cols-8">
        {kanji.map((k, i) => (
          <div key={`${k}-${i}`} className="relative">
          <button
            type="button"
            onClick={() => handleTap(k)}
            aria-pressed={active === k}
            className={`wood-block flex aspect-square w-full flex-col items-center justify-center gap-1 overflow-hidden px-2 py-2 ${active === k ? "is-active" : ""}`}
          >
            <span className="font-jp text-3xl leading-none sm:text-4xl">{k}</span>
            {known.has(k) ? <span title={known.get(k)!.m} className={`line-clamp-2 text-center text-[11px] font-semibold leading-tight sm:text-xs ${active === k ? "text-white" : "text-charcoal-900"}`}>{known.get(k)!.m}</span> : null}
            {practice ? <PenLine size={14} aria-hidden className={active === k ? "text-white" : "text-sun-500"} /> : <Volume2 size={14} aria-hidden className={active === k ? "text-white" : "text-sun-500"} />}
          </button>
          </div>
        ))}
      </div>

      {active ? (
        <div className="mt-6 card-modern p-5 flex items-center gap-5 sticky bottom-20 sm:bottom-4 bg-surface">
          <span className="font-jp text-5xl text-indigo-950 shrink-0">{active}</span>
          <div className="min-w-0">
            {info?.loading ? (
              <p className="flex items-center gap-2 text-sm text-charcoal-500">
                <Loader2 size={16} className="animate-spin" /> Looking up meaning…
              </p>
            ) : info?.meaning || info?.reading ? (
              <>
                {info.reading ? <p className="font-jp text-lg text-charcoal-700">{info.reading}</p> : null}
                {info.meaning ? <p className="font-semibold text-indigo-950 capitalize">{info.meaning}</p> : null}
              </>
            ) : (
              <p className="text-sm text-charcoal-500">No dictionary entry found for this character.</p>
            )}
          </div>
        </div>
      ) : null}
      {open && active ? (
        <KanjiPractice
          item={{ ch: active, reading: info?.reading?.split(/[、,・ ]/)[0] || undefined, meaning: info?.meaning || undefined }}
          onClose={() => setOpen(false)}
          nav={{
            index: kanji.indexOf(active),
            total: kanji.length,
            onPrev: () => handleTap(kanji[(kanji.indexOf(active) + kanji.length - 1) % kanji.length]),
            onNext: () => handleTap(kanji[(kanji.indexOf(active) + 1) % kanji.length]),
          }}
        />
      ) : null}
    </div>
  );
}
