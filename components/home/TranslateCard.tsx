"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Loader2, Share2, Volume2 } from "lucide-react";
import { speakJapanese } from "@/components/ui/SpeakButton";
import { toKatakana } from "@/lib/katakana";
import { toRomaji } from "@/lib/kanaConvert";
import { toHiragana } from "@/lib/kanaConvert";
import { site } from "@/lib/site";

interface Match {
  kanji: string | null;
  hiragana: string;
  katakana: string;
  loan: boolean;
  meaning: string;
}

interface Result {
  q: string;
  mode: "word" | "name" | "offline";
  matches: Match[];
}

const examples = ["water", "Priya", "thank you", "friend"];

// Type a name or an English word and see it in hiragana, kanji and katakana.
// Words come from a dictionary; names are spelled by sound in katakana.
export function TranslateCard() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [pick, setPick] = useState(0);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const abort = useRef<AbortController | null>(null);

  useEffect(() => {
    const q = text.trim();
    abort.current?.abort();
    if (!q) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResult(null);
      setBusy(false);
      return;
    }
    const ctl = new AbortController();
    abort.current = ctl;
    setBusy(true);
    const t = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/translate?q=${encodeURIComponent(q)}`, { signal: ctl.signal });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "failed");
        setResult({ q, mode: data.mode, matches: data.matches });
        setPick(0);
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        // Dictionary not reachable: still give a sound-based katakana spelling.
        setResult({ q, mode: "offline", matches: [] });
      } finally {
        if (!ctl.signal.aborted) setBusy(false);
      }
    }, 450);
    return () => {
      window.clearTimeout(t);
      ctl.abort();
    };
  }, [text]);

  const nameKana = result && result.mode !== "word" ? toKatakana(result.q) : "";
  const m: Match | null = result?.mode === "word" ? result.matches[pick] ?? null : nameKana ? { kanji: null, hiragana: toHiragana(nameKana), katakana: nameKana, loan: false, meaning: "" } : null;

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), 1400);
    } catch {}
  };

  const rows: { id: string; jp: string; en: string; value: string | null; note?: string; hear: string; say?: string }[] = m
    ? [
        { id: "hira", jp: "ひらがな", en: "Hiragana", value: m.hiragana, hear: m.hiragana, say: toRomaji(m.hiragana) },
        {
          id: "kanji",
          jp: "漢字",
          en: "Kanji",
          value: m.kanji,
          hear: m.hiragana,
          say: m.kanji ? toRomaji(m.hiragana) : undefined,
          note: m.kanji ? undefined : result?.mode === "word" ? "This word is written without kanji" : "Foreign names have no kanji. Japanese names do, so try Tanaka or Yamada.",
        },
        {
          id: "kata",
          jp: "カタカナ",
          en: "Katakana",
          value: m.katakana,
          // The loanword says its own katakana (ウォーター), which is not the same sound as the kanji word (みず).
          hear: m.katakana,
          say: toRomaji(m.katakana),
          note: result?.mode === "word" ? (m.loan ? (toRomaji(m.katakana) !== toRomaji(m.hiragana) ? "A different word: the loanword Japanese also uses, so it sounds different" : "The loanword Japanese uses") : "Same reading, written in katakana") : "Sound-based, how Japan writes foreign names",
        },
      ]
    : [];

  return (
    <div role="tabpanel" className="pop-in mt-4">
      <label htmlFor="hero-name" className="text-sm font-bold text-indigo-950">Type a name or an English word</label>
      <div className="relative mt-2">
        <input
          id="hero-name"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 40))}
          placeholder="e.g. Priya, water, thank you"
          autoComplete="off"
          className="w-full rounded-xl border-2 border-charcoal-100 bg-surface px-3.5 py-2.5 pr-10 text-base text-indigo-950 outline-none transition-colors focus:border-indigo-700"
        />
        {busy ? <Loader2 size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin text-charcoal-500" aria-label="Looking up" /> : null}
      </div>

      {!text.trim() ? (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-charcoal-500">Try</span>
          {examples.map((x) => (
            <button key={x} type="button" onClick={() => setText(x)} className="min-h-[32px] rounded-full bg-bg-alt px-3 text-xs font-bold text-indigo-950 transition-colors hover:bg-sun-100">{x}</button>
          ))}
        </div>
      ) : null}

      <div className="mt-3 divide-y divide-charcoal-100 overflow-hidden rounded-2xl border border-charcoal-100 bg-bg-alt">
        {(rows.length ? rows : [
          { id: "hira", jp: "ひらがな", en: "Hiragana", value: null, hear: "" },
          { id: "kanji", jp: "漢字", en: "Kanji", value: null, hear: "" },
          { id: "kata", jp: "カタカナ", en: "Katakana", value: null, hear: "" },
        ] as typeof rows).map((r) => (
          <div key={r.id} className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-[4.2rem] shrink-0">
              <p className="font-jp text-[13px] font-bold leading-tight text-indigo-950">{r.jp}</p>
              <p className="text-[11px] text-charcoal-500">{r.en}</p>
            </div>
            <div className="min-w-0 flex-1">
              {r.value ? (
                <button type="button" onClick={() => speakJapanese(r.hear)} aria-label={`Hear ${r.value}`} className="pop-in max-w-full break-all text-left font-jp text-2xl font-bold leading-tight text-indigo-950 transition-colors hover:text-indigo-700" key={r.value}>{r.value}</button>
              ) : (
                <p className="font-jp text-2xl font-bold leading-tight text-charcoal-300">{rows.length ? "—" : r.id === "hira" ? "ひらがな" : r.id === "kanji" ? "漢字" : "カタカナ"}</p>
              )}
              {r.say && rows.length ? <p className="mt-0.5 text-[13px] font-semibold tracking-wide text-indigo-700">{r.say}</p> : null}
              {r.note && rows.length ? <p className="mt-0.5 text-[11px] leading-snug text-charcoal-500">{r.note}</p> : null}
            </div>
            {r.value ? (
              <div className="flex shrink-0 gap-1">
                <button type="button" onClick={() => speakJapanese(r.hear)} aria-label={`Hear ${r.value}`} className="grid h-8 w-8 place-items-center rounded-md text-indigo-700 transition-colors hover:bg-surface"><Volume2 size={15} /></button>
                <button type="button" onClick={() => copy(r.value!)} aria-label={`Copy ${r.value}`} className="grid h-8 w-8 place-items-center rounded-md text-indigo-700 transition-colors hover:bg-surface">{copied === r.value ? <Check size={15} className="text-success" /> : <Copy size={15} />}</button>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {result?.mode === "word" && result.matches.length > 1 ? (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-charcoal-500">Other meanings</span>
          {result.matches.map((x, i) => (
            <button key={`${x.kanji}-${x.hiragana}`} type="button" onClick={() => setPick(i)} aria-pressed={i === pick} className={`min-h-[30px] rounded-full px-2.5 font-jp text-xs font-bold transition-colors ${i === pick ? "bg-indigo-900 text-white" : "bg-bg-alt text-indigo-950 hover:bg-sun-100"}`}>{x.kanji ? `${x.kanji} ${x.hiragana}` : x.hiragana}</button>
          ))}
        </div>
      ) : null}
      {m?.meaning ? <p className="mt-2 text-xs text-charcoal-500">Meaning: {m.meaning}</p> : null}
      {result?.mode === "offline" ? <p className="mt-2 text-xs text-charcoal-500">The dictionary could not be reached, so this is a sound-based spelling only.</p> : null}

      <a
        href={m ? `https://wa.me/?text=${encodeURIComponent(`${result?.q} in Japanese: ${m.kanji ? `${m.kanji} / ` : ""}${m.hiragana} / ${m.katakana}. Try yours at ${site.url}`)}` : undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!m}
        className={`mt-3 flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg bg-[#15803d] text-sm font-bold text-white ${m ? "" : "pointer-events-none opacity-40"}`}
      >
        <Share2 size={15} /> Share on WhatsApp
      </a>
    </div>
  );
}
