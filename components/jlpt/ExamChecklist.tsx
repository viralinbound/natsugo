"use client";

import { useSyncExternalStore } from "react";
import { Check, RotateCcw } from "lucide-react";

const KEY = "np-exam-checklist";
const EVENT = "np-exam-checklist";

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
const subscribe = (cb: () => void) => {
  addEventListener(EVENT, cb);
  addEventListener("storage", cb);
  return () => {
    removeEventListener(EVENT, cb);
    removeEventListener("storage", cb);
  };
};
// useSyncExternalStore needs a stable snapshot, so compare the raw string and parse on use.
const snapshot = () => localStorage.getItem(KEY) || "[]";

// A bag checklist the learner can tick off. The ticks are remembered on this device.
export function ExamChecklist({ items }: { items: string[] }) {
  const raw = useSyncExternalStore(subscribe, () => { try { return snapshot(); } catch { return "[]"; } }, () => "[]");
  const done = new Set<string>((() => { try { return JSON.parse(raw); } catch { return []; } })());
  const write = (list: string[]) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch {}
    dispatchEvent(new Event(EVENT));
  };
  const toggle = (item: string) => write(done.has(item) ? read().filter((x) => x !== item) : [...read(), item]);
  const count = items.filter((i) => done.has(i)).length;

  return (
    <div className="card-modern p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-sun-500">Pack your bag</p>
          <h3 className="font-display text-xl font-bold text-indigo-950">Exam day checklist</h3>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm font-semibold text-charcoal-700">{count} of {items.length} ready</p>
          <button type="button" onClick={() => write([])} className="inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-charcoal-100 px-3 text-xs font-bold text-indigo-950 hover:border-indigo-700"><RotateCcw size={13} /> Reset</button>
        </div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-bg-alt">
        <div className="h-full rounded-full bg-success transition-all duration-300" style={{ width: `${(count / items.length) * 100}%` }} />
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {items.map((item) => {
          const on = done.has(item);
          return (
            <li key={item}>
              <button
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => toggle(item)}
                className={`flex min-h-[48px] w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${on ? "border-success/40 bg-success/10 text-charcoal-700" : "border-charcoal-100 bg-surface text-charcoal-900 hover:border-indigo-700/40"}`}
              >
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 ${on ? "border-success bg-success text-white" : "border-charcoal-300"}`}>{on ? <Check size={14} strokeWidth={3} /> : null}</span>
                <span className={on ? "line-through decoration-charcoal-300" : ""}>{item}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
