"use client";

import { useMemo, useState } from "react";
import { Flame, RotateCcw, Star } from "lucide-react";
import { speakJapanese } from "@/components/ui/SpeakButton";
import { useClock, useHydrated, useLocalStorage, writeLocal } from "@/lib/useBrowserStore";

export interface Card {
  id: string;
  front: string;
  reading?: string;
  back: string;
  deck: string;
}

interface CardState {
  box: number;
  due: number;
}
interface Progress {
  cards: Record<string, CardState>;
  streak: number;
  lastDay: string;
  xp: number;
  todayCount: number;
}

const KEY = "np-flashcards-v1";
const DAY = 86_400_000;
// Leitner boxes: how many days until the card comes back.
const intervals = [0, 1, 2, 4, 7, 15, 30];
const DAILY_GOAL = 10;
const dayOf = (ms: number) => new Date(ms).toLocaleDateString("en-CA");

const empty: Progress = { cards: {}, streak: 0, lastDay: "", xp: 0, todayCount: 0 };

function parse(raw: string | null): Progress {
  try {
    return raw ? (JSON.parse(raw) as Progress) : empty;
  } catch {
    return empty;
  }
}

export function Flashcards({ cards }: { cards: Card[] }) {
  const decks = useMemo(() => ["All", ...Array.from(new Set(cards.map((c) => c.deck)))], [cards]);
  const [deck, setDeck] = useState("All");
  const raw = useLocalStorage(KEY);
  const p = useMemo(() => parse(raw), [raw]);
  const ready = useHydrated();
  const now = useClock();
  const [flipped, setFlipped] = useState(false);
  const todayCount = p.lastDay === dayOf(now) ? p.todayCount : 0;

  const queue = useMemo(() => {
    const pool = cards.filter((c) => deck === "All" || c.deck === deck);
    const due = pool.filter((c) => (p.cards[c.id]?.due ?? 0) <= now);
    // New cards (never seen) after reviews that are due.
    return [...due.filter((c) => p.cards[c.id]), ...due.filter((c) => !p.cards[c.id])];
  }, [cards, deck, p.cards, now]);

  const card = queue[0];

  function grade(knewIt: boolean) {
    if (!card) return;
    const prev = p;
    const at = Date.now();
    const cur = prev.cards[card.id] ?? { box: 0, due: 0 };
    const box = knewIt ? Math.min(cur.box + 1, intervals.length - 1) : 0;
    const t = dayOf(at);
    const isNewDay = prev.lastDay !== t;
    const streak = isNewDay ? (prev.lastDay === dayOf(at - DAY) ? prev.streak + 1 : 1) : prev.streak || 1;
    const next: Progress = {
      // Missed cards come back in a minute; known cards move up a box and wait longer.
      cards: { ...prev.cards, [card.id]: { box, due: knewIt ? at + intervals[box] * DAY : at + 60_000 } },
      streak,
      lastDay: t,
      xp: prev.xp + (knewIt ? 10 : 2),
      todayCount: (isNewDay ? 0 : prev.todayCount) + 1,
    };
    writeLocal(KEY, JSON.stringify(next));
    setFlipped(false);
  }

  const learned = Object.values(p.cards).filter((c) => c.box >= 3).length;
  const goalPct = Math.min(100, Math.round((todayCount / DAILY_GOAL) * 100));

  return (
    <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-start">
      <div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a deck">
          {decks.map((d) => (
            <button key={d} type="button" aria-pressed={deck === d} onClick={() => { setDeck(d); setFlipped(false); }}
              className={`rounded-md border px-3 min-h-[40px] text-sm font-semibold ${deck === d ? "border-indigo-900 bg-indigo-900 text-white" : "border-charcoal-100 bg-surface text-charcoal-700"}`}>
              {d}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {!ready ? (
            <div className="h-72 rounded-xl bg-bg-alt animate-pulse" />
          ) : card ? (
            <button
              type="button"
              onClick={() => { setFlipped((f) => !f); if (!flipped) speakJapanese(card.reading ?? card.front); }}
              className="washi group relative w-full h-72 sm:h-80 rounded-xl border-2 border-charcoal-100 bg-surface flex flex-col items-center justify-center p-6 text-center hover:border-sun-400 transition-colors"
              aria-label={flipped ? `Answer: ${card.back}. Tap to flip back.` : `Card: ${card.front}. Tap to reveal the meaning.`}
            >
              <span className="absolute left-4 top-3 text-xs font-bold uppercase tracking-wider text-charcoal-500">{card.deck}</span>
              <span className="font-jp text-6xl sm:text-7xl font-bold text-white">{card.front}</span>
              {flipped ? (
                <span className="mt-4 animate-fade-up">
                  {card.reading ? <span className="block font-jp text-xl text-sun-500">{card.reading}</span> : null}
                  <span className="mt-1 block text-xl font-semibold text-charcoal-800">{card.back}</span>
                </span>
              ) : (
                <span className="mt-5 text-sm text-charcoal-500">Tap to reveal · plays audio</span>
              )}
            </button>
          ) : (
            <div className="h-72 rounded-xl border-2 border-dashed border-success/40 bg-success/5 flex flex-col items-center justify-center text-center p-6">
              <p className="font-jp text-4xl text-success">よくできました！</p>
              <p className="mt-2 font-semibold text-charcoal-800">All caught up for now. Come back tomorrow to keep your streak.</p>
            </div>
          )}
        </div>

        {card && flipped ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => grade(false)} className="min-h-[52px] rounded-md border-2 border-red-600 font-bold text-red-600 hover:bg-red-600/5">
              <RotateCcw size={16} className="inline -mt-0.5 mr-1" /> Again
            </button>
            <button type="button" onClick={() => grade(true)} className="min-h-[52px] rounded-md bg-success font-bold text-white hover:brightness-110">
              I knew it ✓
            </button>
          </div>
        ) : null}
        <p className="mt-3 text-xs text-charcoal-500">{queue.length} card{queue.length === 1 ? "" : "s"} due in this deck. Cards you know come back later; cards you miss come back soon.</p>
      </div>

      <aside className="card-modern p-5 space-y-5">
        <div className="flex items-center gap-3">
          <Flame className={p.streak ? "text-red-500" : "text-charcoal-300"} size={32} />
          <div>
            <p className="text-2xl font-semibold text-white">{p.streak} day{p.streak === 1 ? "" : "s"}</p>
            <p className="text-xs text-charcoal-500">Practice streak</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm"><span className="font-semibold">Today&apos;s goal</span><span>{Math.min(todayCount, DAILY_GOAL)}/{DAILY_GOAL}</span></div>
          <div className="mt-1.5 h-2.5 rounded-full bg-bg-alt overflow-hidden"><div className="h-full rounded-full bg-sun-400 transition-all" style={{ width: `${goalPct}%` }} /></div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="rounded-md bg-bg-alt p-3"><p className="text-xl font-semibold text-indigo-950">{p.xp}</p><p className="text-xs text-charcoal-500"><Star size={11} className="inline -mt-0.5" /> XP</p></div>
          <div className="rounded-md bg-bg-alt p-3"><p className="text-xl font-semibold text-indigo-950">{learned}</p><p className="text-xs text-charcoal-500">Learned</p></div>
        </div>
        <p className="text-xs text-charcoal-500">Progress is saved on this device.</p>
      </aside>
    </div>
  );
}
