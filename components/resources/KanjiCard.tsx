"use client";

import { useState } from "react";
import { PenLine } from "lucide-react";
import { KanjiPractice } from "@/components/japan/KanjiPractice";

// A whole wooden kanji card is the tap target: it opens the stroke-order and writing practice popup.
export function KanjiCard({ k, m, r }: { k: string; m: string; r: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={`${k}: ${m}. Hear it and practise writing`} className="wood-block group w-full p-4 text-center">
        <span className="block font-jp text-5xl">{k}</span>
        <span className="mt-2 block font-semibold text-charcoal-900">{m}</span>
        <span className="mt-1 flex items-center justify-center gap-1.5 font-jp text-sm text-charcoal-500">
          {r} <PenLine size={15} className="text-indigo-700 transition-transform group-hover:scale-125" aria-hidden />
        </span>
      </button>
      {open ? <KanjiPractice item={{ ch: k, reading: r.split("・")[0], meaning: m }} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
