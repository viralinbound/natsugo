"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Gauge, GraduationCap, Pause, Play, RotateCcw, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { notesToSlides } from "@/lib/slides";

const RATES = [0.85, 1, 1.25];

// A real, playable lecture for every lesson, narrated by the browser's own voices —
// available immediately, before a teacher has recorded a video for this lesson.
export function AutoLecture({ title, notes }: { title: string; notes: string }) {
  const slides = useMemo(() => notesToSlides(title, notes), [title, notes]);
  const [i, setI] = useState(0);
  const [line, setLine] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const stopRef = useRef(false);
  const ready = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    return () => {
      stopRef.current = true;
      if (typeof window !== "undefined") window.speechSynthesis.cancel();
    };
  }, []);

  const slide = slides[i];

  function speak(text: string, lang: "en" | "ja", onEnd: () => void) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "ja" ? "ja-JP" : "en-IN";
    u.rate = rate;
    const voice = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith(lang === "ja" ? "ja" : "en"));
    if (voice) u.voice = voice;
    u.onend = () => !stopRef.current && onEnd();
    u.onerror = () => !stopRef.current && onEnd();
    window.speechSynthesis.speak(u);
  }

  function playFrom(slideIndex: number, lineIndex: number) {
    stopRef.current = false;
    setPlaying(true);
    setI(slideIndex);
    setLine(lineIndex);
    const run = (si: number, li: number) => {
      const s = slides[si];
      if (!s) return setPlaying(false);
      if (li >= s.lines.length) {
        if (si + 1 >= slides.length) return setPlaying(false);
        setI(si + 1);
        setLine(0);
        return run(si + 1, 0);
      }
      setI(si);
      setLine(li);
      speak(s.lines[li].text, s.lines[li].lang, () => !stopRef.current && run(si, li + 1));
    };
    run(slideIndex, lineIndex);
  }

  function stop() {
    stopRef.current = true;
    window.speechSynthesis.cancel();
    setPlaying(false);
  }

  const jump = (delta: number) => {
    stop();
    const next = Math.min(slides.length - 1, Math.max(0, i + delta));
    setI(next);
    setLine(0);
  };

  if (!ready)
    return (
      <div className="rounded-lg border border-charcoal-100 bg-surface p-6 text-sm text-charcoal-500">
        Audio lecture needs a browser with speech support. Read the study notes below instead.
      </div>
    );

  return (
    <div className="brand-pattern overflow-hidden rounded-lg border-2 border-charcoal-100 bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-charcoal-100 bg-bg-alt px-4 py-2.5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal-500">
          <GraduationCap size={14} className="text-sun-400" /> Auto-narrated lecture · slide {i + 1}/{slides.length}
        </p>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-700">
          <Gauge size={13} />
          <select value={rate} onChange={(e) => setRate(Number(e.target.value))} className="rounded border border-charcoal-100 bg-surface py-0.5 text-xs">
            {RATES.map((r) => <option key={r} value={r}>{r}×</option>)}
          </select>
        </label>
      </div>

      <div className="min-h-[220px] p-6 sm:p-8">
        <h3 className="font-display text-lg font-bold text-indigo-950">{slide?.heading}</h3>
        <div className="mt-4 space-y-2">
          {slide?.lines.map((l, li) => (
            <p
              key={li}
              className={`rounded-md px-3 py-2 transition-colors ${l.lang === "ja" ? "font-jp text-lg" : "text-charcoal-800"} ${
                playing && li === line ? "bg-sun-100 text-indigo-950 font-semibold" : "text-charcoal-700"
              }`}
            >
              {l.lang === "ja" ? <Volume2 size={14} className="inline mr-1.5 -mt-0.5 text-sun-500" aria-hidden /> : null}
              {l.text}
            </p>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 border-t border-charcoal-100 px-4 py-3">
        <button type="button" onClick={() => jump(-1)} disabled={i === 0} className="rounded-md p-2 text-charcoal-700 hover:bg-bg-alt disabled:opacity-30" aria-label="Previous slide"><SkipBack size={18} /></button>
        <button
          type="button"
          onClick={() => (playing ? stop() : playFrom(i, line))}
          className="inline-flex items-center gap-2 rounded-md bg-sun-400 hover:bg-sun-500 px-5 min-h-[44px] font-bold text-white"
        >
          {playing ? <Pause size={18} /> : <Play size={18} />} {playing ? "Pause" : i === 0 && line === 0 ? "Play lecture" : "Resume"}
        </button>
        <button type="button" onClick={() => jump(1)} disabled={i === slides.length - 1} className="rounded-md p-2 text-charcoal-700 hover:bg-bg-alt disabled:opacity-30" aria-label="Next slide"><SkipForward size={18} /></button>
        <button type="button" onClick={() => { stop(); setI(0); setLine(0); }} className="rounded-md p-2 text-charcoal-500 hover:bg-bg-alt" aria-label="Restart"><RotateCcw size={16} /></button>
      </div>
      <p className="border-t border-charcoal-100 px-4 py-2 text-center text-xs text-charcoal-500">
        Auto-narrated from the lesson notes using your device&apos;s voices — not a recorded teacher video.
      </p>
    </div>
  );
}
