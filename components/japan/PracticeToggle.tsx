"use client";

import { useSyncExternalStore } from "react";
import { PenLine } from "lucide-react";

// One switch for the whole site: when on, tapping a kana or kanji opens the writing practice board;
// when off, it just plays the sound. Remembered on this device.
const KEY = "np-practice-mode";
const EVENT = "np-practice-mode";

function read() {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}
function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function usePracticeMode(): [boolean, (on: boolean) => void] {
  const on = useSyncExternalStore(subscribe, read, () => false);
  const set = (v: boolean) => {
    try {
      localStorage.setItem(KEY, v ? "1" : "0");
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  };
  return [on, set];
}

export function PracticeToggle({ className = "" }: { className?: string }) {
  const [on, set] = usePracticeMode();
  return (
    <label className={`inline-flex cursor-pointer select-none items-center gap-2.5 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${on ? "border-indigo-700 bg-sun-100 text-indigo-950" : "border-charcoal-100 bg-surface text-charcoal-700 hover:border-indigo-700/50"} ${className}`}>
      <input type="checkbox" checked={on} onChange={(e) => set(e.target.checked)} className="h-4 w-4 accent-indigo-900" />
      <PenLine size={15} className="text-indigo-700" aria-hidden />
      Writing practice
      <span className="hidden text-xs font-normal text-charcoal-500 sm:inline">{on ? "tap opens the board" : "tap just plays the sound"}</span>
    </label>
  );
}
