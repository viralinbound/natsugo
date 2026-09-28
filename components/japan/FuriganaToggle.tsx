"use client";

import { useEffect } from "react";
import { useLocalStorage, writeLocal } from "@/lib/useBrowserStore";

const KEY = "np-furigana";

// Furigana = small reading hints above kanji. Preference is remembered per browser.
export function FuriganaToggle({ className = "" }: { className?: string }) {
  const on = useLocalStorage(KEY) !== "off";

  useEffect(() => {
    document.documentElement.dataset.furigana = on ? "on" : "off";
  }, [on]);

  return (
    <button
      type="button"
      onClick={() => writeLocal(KEY, on ? "off" : "on")}
      aria-pressed={on}
      className={`inline-flex items-center gap-2 rounded-md border px-3 min-h-[36px] text-sm font-semibold transition-colors ${
        on ? "border-indigo-900 bg-indigo-900 text-white" : "border-charcoal-100 bg-surface text-charcoal-700"
      } ${className}`}
    >
      <ruby className="font-jp">
        漢<rt>かん</rt>
      </ruby>
      Furigana {on ? "on" : "off"}
    </button>
  );
}
