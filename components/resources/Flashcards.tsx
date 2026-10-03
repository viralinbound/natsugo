"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, Check, Flame, RotateCcw, Shuffle, Star, Volume2 } from "lucide-react";
import { speakJapanese } from "@/components/ui/SpeakButton";
import { useClock, useHydrated, useLocalStorage, writeLocal } from "@/lib/useBrowserStore";
import { groups, type Card } from "@/lib/flashcardDecks";

export type { Card };

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

const hash = (t: string) => {
  let h = 2166136261;
  for (const c of t) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
};

export function Flashcards({ cards }: { cards: Card[] }) {
  const [group, setGroup] = useState<string>(groups[0]);
  const [deck, setDeck] = useState<string>("");
  const [reverse, setReverse] = useState(false);
  const [seed, setSeed] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [meanings, setMeanings] = useState<Record<string, { m: string | null; r: string | null }>>({});
  const raw = useLocalStorage(KEY);
  const p = useMemo(() => parse(raw), [raw]);
  const ready = useHydrated();
  const now = useClock();
  const todayCount = p.lastDay === dayOf(now) ? p.todayCount : 0;

  const decksInGroup = useMemo(() => {
    const seen = new Set<string>();
    for (const c of cards) if (c.group === group) seen.add(c.deck);
    return [...seen];
  }, [cards, group]);
  const activeDeck = decksInGroup.includes(deck) ? deck : decksInGroup[0];

  const stats = useMemo(() => {
    const out: Record<string, { total: number; due: number; learned: number }> = {};
    for (const c of cards) {
      const s = (out[c.deck] ??= { total: 0, due: 0, learned: 0 });
      s.total++;
      const st = p.cards[c.id];
      if ((st?.due ?? 0) <= now) s.due++;
      if (st && st.box >= 3) s.learned++;
    }
    return out;
  }, [cards, p.cards, now]);

  const queue = useMemo(() => {
    const pool = cards.filter((c) => c.deck === activeDeck);
    const due = pool.filter((c) => (p.cards[c.id]?.due ?? 0) <= now);
    const order = (list: Card[]) => (seed ? [...list].sort((a, b) => hash(a.id + seed) - hash(b.id + seed)) : list);
    // Reviews that are due first, then cards never seen.
    return [...order(due.filter((c) => p.cards[c.id])), ...order(due.filter((c) => !p.cards[c.id]))];
  }, [cards, activeDeck, p.cards, now, seed]);

  const card = queue[0];
  const looked = card?.lookup ? meanings[card.front] : undefined;

  // Kanji from the bigger lists carry no stored meaning, so fetch it as soon as the card is on screen.
  useEffect(() => {
    if (!card?.lookup || meanings[card.front]) return;
    const ch = card.front;
    let alive = true;
    fetch(`/api/kanji-lookup?c=${encodeURIComponent(ch)}`)
      .then((r) => r.json())
      .then((d) => alive && setMeanings((m) => ({ ...m, [ch]: { m: d.meaning ?? null, r: d.reading ?? null } })))
      .catch(() => alive && setMeanings((m) => ({ ...m, [ch]: { m: null, r: null } })));
    return () => {
      alive = false;
    };
  }, [card, meanings]);

  const back = card ? (card.lookup ? (looked ? looked.m ?? "Meaning not available" : "Looking it up…") : card.back) : "";
  const reading = card ? (card.lookup ? looked?.r ?? undefined : card.reading) : undefined;
  // Kana and kanji cards are about the character itself, so reversing only helps cards that have a real English side.
  const canReverse = !!card && !card.lookup && card.group !== "Scripts" && card.deck !== "Katakana words";
  const showReverse = reverse && canReverse;

  const grade = useCallback(
    (knewIt: boolean) => {
      if (!card) return;
      const at = Date.now();
      const cur = p.cards[card.id] ?? { box: 0, due: 0 };
      const box = knewIt ? Math.min(cur.box + 1, intervals.length - 1) : 0;
      const t = dayOf(at);
      const isNewDay = p.lastDay !== t;
      const streak = isNewDay ? (p.lastDay === dayOf(at - DAY) ? p.streak + 1 : 1) : p.streak || 1;
      const next: Progress = {
        // Missed cards come back in a minute; known cards move up a box and wait longer.
        cards: { ...p.cards, [card.id]: { box, due: knewIt ? at + intervals[box] * DAY : at + 60_000 } },
        streak,
        lastDay: t,
        xp: p.xp + (knewIt ? 10 : 2),
        todayCount: (isNewDay ? 0 : p.todayCount) + 1,
      };
      writeLocal(KEY, JSON.stringify(next));
      setFlipped(false);
    },
    [card, p],
  );

  const hear = useCallback(() => {
    if (card) speakJapanese(card.reading?.split("・")[0] ?? card.front);
  }, [card]);

  const flip = useCallback(() => {
    if (!card) return;
    setFlipped((f) => !f);
    if (!flipped) hear();
  }, [card, flipped, hear]);

  // Keyboard: space flips, left or 1 means not yet, right or 2 means known.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.key === " " && el?.tagName !== "BUTTON") {
        e.preventDefault();
        flip();
      } else if (flipped && (e.key === "ArrowLeft" || e.key === "1")) grade(false);
      else if (flipped && (e.key === "ArrowRight" || e.key === "2")) grade(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flip, flipped, grade]);

  function resetDeck() {
    if (!activeDeck || !window.confirm(`Start "${activeDeck}" again from the beginning?`)) return;
    const keep = { ...p.cards };
    for (const c of cards) if (c.deck === activeDeck) delete keep[c.id];
    writeLocal(KEY, JSON.stringify({ ...p, cards: keep }));
    setFlipped(false);
  }

  const learned = Object.values(p.cards).filter((c) => c.box >= 3).length;
  const goalPct = Math.min(100, Math.round((todayCount / DAILY_GOAL) * 100));
  const ds = stats[activeDeck] ?? { total: 0, due: 0, learned: 0 };
  const deckPct = ds.total ? Math.round((ds.learned / ds.total) * 100) : 0;

  const front = card ? (showReverse ? back : card.front) : "";
  const frontIsJapanese = !showReverse;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="min-w-0">
        <div role="tablist" aria-label="Kind of cards" className="grid grid-cols-2 gap-1 rounded-xl border border-charcoal-100 bg-bg-alt p-1 sm:grid-cols-4">
          {groups.map((g) => (
            <button
              key={g}
              role="tab"
              type="button"
              aria-selected={group === g}
              onClick={() => {
                setGroup(g);
                setFlipped(false);
              }}
              className={`min-h-[40px] rounded-lg px-2 text-sm font-bold transition-colors ${group === g ? "bg-indigo-900 text-white shadow-sm" : "text-charcoal-700 hover:bg-surface"}`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Choose a deck">
          {decksInGroup.map((d) => {
            const s = stats[d];
            return (
              <button
                key={d}
                type="button"
                aria-pressed={activeDeck === d}
                onClick={() => {
                  setDeck(d);
                  setFlipped(false);
                }}
                className={`inline-flex min-h-[40px] items-center gap-2 rounded-md border px-3 text-sm font-semibold ${activeDeck === d ? "border-indigo-900 bg-indigo-900 text-white" : "border-charcoal-100 bg-surface text-charcoal-700 hover:border-indigo-700"}`}
              >
                {d}
                <span className={`rounded-full px-1.5 text-xs ${activeDeck === d ? "bg-white/20" : "bg-bg-alt text-charcoal-500"}`}>{ready ? s?.due : s?.total}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setReverse((r) => !r);
              setFlipped(false);
            }}
            aria-pressed={reverse}
            className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3 text-xs font-bold ${reverse ? "bg-indigo-900 text-white" : "bg-bg-alt text-charcoal-700"}`}
          >
            <ArrowLeftRight size={14} aria-hidden /> {reverse ? "English to Japanese" : "Japanese to English"}
          </button>
          <button type="button" onClick={() => { setSeed(Date.now() % 100000 || 1); setFlipped(false); }} className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-bg-alt px-3 text-xs font-bold text-charcoal-700 hover:text-indigo-950">
            <Shuffle size={14} aria-hidden /> Shuffle
          </button>
          <button type="button" onClick={resetDeck} className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-bg-alt px-3 text-xs font-bold text-charcoal-700 hover:text-indigo-950">
            <RotateCcw size={14} aria-hidden /> Restart deck
          </button>
          <span className="ml-auto text-xs font-semibold text-charcoal-500">{ready ? `${ds.learned} of ${ds.total} learned` : ""}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-alt" aria-hidden>
          <div className="h-full rounded-full bg-indigo-700 transition-all" style={{ width: `${deckPct}%` }} />
        </div>

        <div className="mt-5">
          {!ready ? (
            <div className="h-72 animate-pulse rounded-xl bg-bg-alt" />
          ) : card ? (
            <div className="relative">
              <button
                type="button"
                onClick={flip}
                className="washi group relative flex h-80 w-full flex-col items-center justify-center overflow-y-auto rounded-xl border-2 border-charcoal-100 bg-surface p-6 text-center transition-colors hover:border-sun-400 sm:h-96"
                aria-label={flipped ? `Answer: ${showReverse ? card.front : back}. Tap to flip back.` : `Card: ${front}. Tap to reveal the answer.`}
              >
                <span className="absolute left-4 top-3 text-xs font-bold uppercase tracking-wider text-charcoal-500">{card.deck}</span>
                <span className={`${frontIsJapanese ? "font-jp text-6xl sm:text-7xl" : "text-3xl sm:text-4xl"} max-w-full break-words font-bold text-indigo-950`}>{front}</span>
                {flipped ? (
                  <span className="mt-4 block animate-fade-up">
                    {showReverse ? (
                      <>
                        <span className="block font-jp text-4xl font-bold text-indigo-950">{card.front}</span>
                        {card.reading ? <span className="mt-1 block font-jp text-lg text-sun-500">{card.reading}</span> : null}
                      </>
                    ) : (
                      <>
                        {reading ? <span className="block font-jp text-xl text-sun-500">{reading}</span> : null}
                        <span className="mt-1 block text-xl font-semibold text-charcoal-800">{back}</span>
                      </>
                    )}
                    {card.note ? <span className="mx-auto mt-3 block max-w-md font-jp text-sm leading-relaxed text-charcoal-600">{card.note}</span> : null}
                  </span>
                ) : (
                  <span className="mt-5 text-sm text-charcoal-500">Tap or press space to reveal</span>
                )}
              </button>
              <button type="button" onClick={hear} aria-label="Hear it" className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-bg-alt text-indigo-950 hover:bg-indigo-900 hover:text-white">
                <Volume2 size={17} />
              </button>
            </div>
          ) : (
            <div className="flex h-72 flex-col items-center justify-center rounded-xl border-2 border-dashed border-success/40 bg-success/5 p-6 text-center">
              <p className="font-jp text-4xl text-success">よくできました！</p>
              <p className="mt-2 font-semibold text-charcoal-800">All caught up in this deck. Try another deck, or come back tomorrow to keep your streak.</p>
            </div>
          )}
        </div>

        {card && flipped ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => grade(false)}
              className="group flex min-h-[60px] flex-col items-center justify-center rounded-xl border border-[#e6d3ae] bg-[#fbf4e6] px-3 py-2 text-[#7a4f17] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d6b77d] hover:shadow-sm"
            >
              <span className="flex items-center gap-2 font-bold">
                <RotateCcw size={16} className="transition-transform duration-300 group-hover:-rotate-90" aria-hidden />
                <span className="font-jp">もう一度</span> · Not yet
              </span>
              <span className="text-xs font-medium text-[#9a7038]">I&apos;ll see it again soon</span>
            </button>
            <button
              type="button"
              onClick={() => grade(true)}
              className="flex min-h-[60px] flex-col items-center justify-center rounded-xl bg-indigo-900 px-3 py-2 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-800 hover:shadow-md"
            >
              <span className="flex items-center gap-2 font-bold">
                <Check size={17} strokeWidth={2.5} aria-hidden />
                <span className="font-jp">覚えた</span> · I know it
              </span>
              <span className="text-xs font-medium text-white/70">Show it less often</span>
            </button>
          </div>
        ) : null}
        <p className="mt-3 text-xs text-charcoal-500">
          {queue.length} card{queue.length === 1 ? "" : "s"} due in this deck. Cards you know come back later; cards you miss come back soon. On a keyboard: space to flip, 1 or left arrow for not yet, 2 or right arrow for I know it.
        </p>
      </div>

      <aside className="card-modern space-y-5 p-5">
        <div className="flex items-center gap-3">
          <Flame className={p.streak ? "text-red-500" : "text-charcoal-300"} size={32} />
          <div>
            <p className="text-2xl font-semibold text-indigo-950">{p.streak} day{p.streak === 1 ? "" : "s"}</p>
            <p className="text-xs text-charcoal-500">Practice streak</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm"><span className="font-semibold">Today&apos;s goal</span><span>{Math.min(todayCount, DAILY_GOAL)}/{DAILY_GOAL}</span></div>
          <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-bg-alt"><div className="h-full rounded-full bg-sun-400 transition-all" style={{ width: `${goalPct}%` }} /></div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="rounded-md bg-bg-alt p-3"><p className="text-xl font-semibold text-indigo-950">{p.xp}</p><p className="text-xs text-charcoal-500"><Star size={11} className="-mt-0.5 inline" /> XP</p></div>
          <div className="rounded-md bg-bg-alt p-3"><p className="text-xl font-semibold text-indigo-950">{learned}</p><p className="text-xs text-charcoal-500">Learned</p></div>
        </div>
        <p className="text-xs text-charcoal-500">Progress is saved on this device. The number on each deck is how many cards are due now.</p>
      </aside>
    </div>
  );
}
