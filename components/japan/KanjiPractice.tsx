"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Download, Eraser, Eye, EyeOff, Gauge, Pencil, Redo2, RotateCcw, Send, Trash2, Undo2, Volume2, X } from "lucide-react";
import { StrokeOrder } from "@/components/japan/StrokeOrder";
import { speakJapanese } from "@/components/ui/SpeakButton";
import { loadStrokes, STROKE_BOX } from "@/lib/strokes";

export interface PracticeItem {
  ch: string;
  reading?: string;
  meaning?: string;
}

const SIZE = 300;
const SPEEDS = [
  { v: 0.35, label: "Very slow" },
  { v: 0.6, label: "Slow" },
  { v: 1, label: "Normal" },
  { v: 1.6, label: "Fast" },
];

type Pt = [number, number];
interface Ink {
  pts: Pt[];
  erase: boolean;
}

const PEN = 12;
const RUBBER = 34;

// Compares the drawing with the real strokes: how much ink landed on the character (precision)
// and how much of the character was covered (recall), with a little tolerance for wobble.
async function scoreDrawing(ch: string, inks: Ink[]): Promise<number | null> {
  const lines = inks.filter((i) => !i.erase);
  const strokes = await loadStrokes(ch);
  if (!strokes.length || !lines.length) return null;
  const k = SIZE / STROKE_BOX;
  const draw = (width: number, paint: (c: CanvasRenderingContext2D) => void) => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = SIZE;
    const c = cv.getContext("2d")!;
    c.lineCap = c.lineJoin = "round";
    c.lineWidth = width;
    c.strokeStyle = "#000";
    paint(c);
    return c.getImageData(0, 0, SIZE, SIZE).data;
  };
  const target = (w: number) =>
    draw(w, (c) => {
      c.scale(k, k);
      c.lineWidth = w / k;
      strokes.forEach((d) => c.stroke(new Path2D(d)));
    });
  const user = (w: number) =>
    draw(w, (c) => {
      // Replay in order so erased parts really disappear, then judge what is left.
      inks.forEach((ink) => {
        c.globalCompositeOperation = ink.erase ? "destination-out" : "source-over";
        c.lineWidth = ink.erase ? RUBBER : w;
        c.beginPath();
        ink.pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
        if (ink.pts.length === 1) c.lineTo(ink.pts[0][0] + 0.1, ink.pts[0][1]);
        c.stroke();
      });
    });
  const tThin = target(12), tWide = target(34), uThin = user(12), uWide = user(34);
  let ink = 0, inkOn = 0, shape = 0, shapeHit = 0;
  for (let i = 3; i < tThin.length; i += 4) {
    if (uThin[i]) {
      ink++;
      if (tWide[i]) inkOn++;
    }
    if (tThin[i]) {
      shape++;
      if (uWide[i]) shapeHit++;
    }
  }
  if (!ink || !shape) return 0;
  const p = inkOn / ink, r = shapeHit / shape;
  const f = (2 * p * r) / (p + r || 1);
  // Stroke count matters too: drawing the right number of strokes is part of writing it correctly.
  const countFactor = Math.max(0.6, 1 - Math.abs(lines.length - strokes.length) * 0.08);
  return Math.round(Math.min(1, f * 1.08) * countFactor * 100);
}

function verdict(s: number) {
  if (s >= 85) return { jp: "素晴らしい！", en: "Excellent: that's very close.", tone: "text-success" };
  if (s >= 65) return { jp: "いいね！", en: "Good. Check the stroke order and try once more.", tone: "text-indigo-700" };
  if (s >= 40) return { jp: "もう少し", en: "Getting there. Watch the animation again, slowly.", tone: "text-sun-500" };
  return { jp: "がんばって", en: "Keep going: trace it with the guide on first.", tone: "text-hanko" };
}

export interface PracticeNav {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

// The board restarts cleanly for each character: the key resets drawing, undo history and score.
export function KanjiPractice({ item, onClose, nav }: { item: PracticeItem; onClose: () => void; nav?: PracticeNav }) {
  return <PracticeBoard key={item.ch} item={item} onClose={onClose} nav={nav} />;
}

function PracticeBoard({ item, onClose, nav }: { item: PracticeItem; onClose: () => void; nav?: PracticeNav }) {
  const [speed, setSpeed] = useState(0.6);
  const [replay, setReplay] = useState(0);
  const [step, setStep] = useState<[number, number]>([0, 0]);
  const [guide, setGuide] = useState(true);
  const [inks, setInks] = useState<Ink[]>([]);
  const [undone, setUndone] = useState<Ink[]>([]);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [score, setScore] = useState<number | null | undefined>(undefined);
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef<Ink | null>(null);

  useEffect(() => {
    speakJapanese(item.reading || item.ch);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [item.ch, item.reading, onClose]);

  // Redraw the board whenever the strokes change. The eraser cuts through earlier ink.
  useEffect(() => {
    const c = canvas.current?.getContext("2d");
    if (!c) return;
    c.clearRect(0, 0, SIZE, SIZE);
    c.lineCap = c.lineJoin = "round";
    c.strokeStyle = getComputedStyle(canvas.current!).color;
    inks.forEach((ink) => {
      c.globalCompositeOperation = ink.erase ? "destination-out" : "source-over";
      c.lineWidth = ink.erase ? RUBBER : PEN;
      c.beginPath();
      ink.pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
      if (ink.pts.length === 1) c.lineTo(ink.pts[0][0] + 0.1, ink.pts[0][1]);
      c.stroke();
    });
    c.globalCompositeOperation = "source-over";
  }, [inks]);

  const point = (e: React.PointerEvent): Pt => {
    const r = canvas.current!.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * SIZE, ((e.clientY - r.top) / r.height) * SIZE];
  };
  const down = (e: React.PointerEvent) => {
    try {
      canvas.current!.setPointerCapture(e.pointerId);
    } catch {}
    const ink: Ink = { pts: [point(e)], erase: tool === "eraser" };
    drawing.current = ink;
    setInks((l) => [...l, ink]);
    setUndone([]);
    setScore(undefined);
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    drawing.current.pts.push(point(e));
    const ink: Ink = { pts: [...drawing.current.pts], erase: drawing.current.erase };
    setInks((l) => [...l.slice(0, -1), ink]);
  };
  const up = () => (drawing.current = null);

  const undo = () => {
    if (!inks.length) return;
    setUndone((u) => [...u, inks[inks.length - 1]]);
    setInks(inks.slice(0, -1));
    setScore(undefined);
  };
  const redo = () => {
    if (!undone.length) return;
    setInks((l) => [...l, undone[undone.length - 1]]);
    setUndone(undone.slice(0, -1));
    setScore(undefined);
  };
  const clearAll = () => {
    setInks([]);
    setUndone([]);
    setScore(undefined);
  };
  const lines = inks.filter((i) => !i.erase);

  const save = () => {
    const out = document.createElement("canvas");
    out.width = out.height = SIZE;
    const c = out.getContext("2d")!;
    c.fillStyle = "#ffffff";
    c.fillRect(0, 0, SIZE, SIZE);
    c.drawImage(canvas.current!, 0, 0);
    const a = document.createElement("a");
    a.href = out.toDataURL("image/png");
    a.download = `natsugo-${item.ch}.png`;
    a.click();
  };

  const submit = async () => setScore(await scoreDrawing(item.ch, inks));
  const v = typeof score === "number" ? verdict(score) : null;

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={`Practise ${item.ch}`} className="fixed inset-0 z-[80] flex items-end justify-center bg-indigo-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div className="pop-in max-h-[100dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-surface p-5 shadow-2xl sm:rounded-3xl sm:p-7" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Learn to write</p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-3 text-indigo-950">
              <span className="font-jp text-3xl font-bold">{item.ch}</span>
              {item.reading ? <span className="font-jp text-lg">{item.reading}</span> : null}
              {item.meaning ? <span className="text-charcoal-700">{item.meaning}</span> : null}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full bg-bg-alt text-indigo-950 hover:bg-charcoal-100"><X size={18} /></button>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <p className="mb-2 flex items-center justify-between text-sm font-bold text-indigo-950">
              <span>1. Watch the stroke order</span>
              <span className="text-xs font-semibold text-charcoal-500">{step[1] ? `Stroke ${step[0]} of ${step[1]}` : "Loading…"}</span>
            </p>
            <button type="button" onClick={() => speakJapanese(item.reading || item.ch)} aria-label={`Hear ${item.ch}`} className="relative block aspect-square w-full rounded-2xl border-2 border-dashed border-hanko/30 bg-bg-alt text-indigo-950">
              <span aria-hidden className="absolute inset-x-0 top-1/2 border-t border-dashed border-hanko/20" />
              <span aria-hidden className="absolute inset-y-0 left-1/2 border-l border-dashed border-hanko/20" />
              <StrokeOrder ch={item.ch} speed={speed} replay={replay} onStroke={(n, t) => setStep([n, t])} className="relative h-full w-full p-4" />
            </button>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-charcoal-500"><Gauge size={14} /> Speed</span>
              {SPEEDS.map((s) => (
                <button key={s.v} type="button" onClick={() => setSpeed(s.v)} aria-pressed={speed === s.v} className={`min-h-[34px] rounded-full px-3 text-xs font-bold transition-colors ${speed === s.v ? "bg-indigo-900 text-white" : "bg-bg-alt text-charcoal-700 hover:text-indigo-950"}`}>
                  {s.label}
                </button>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <button type="button" onClick={() => setReplay((r) => r + 1)} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-charcoal-100 px-3 text-sm font-bold text-indigo-950 hover:border-indigo-700"><RotateCcw size={15} /> Replay</button>
              <button type="button" onClick={() => speakJapanese(item.reading || item.ch)} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-charcoal-100 px-3 text-sm font-bold text-indigo-950 hover:border-indigo-700"><Volume2 size={15} /> Hear</button>
            </div>
          </div>

          <div>
            <p className="mb-2 flex items-center justify-between text-sm font-bold text-indigo-950">
              <span>2. Now you write it</span>
              <button type="button" onClick={() => setGuide((g) => !g)} className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-700">
                {guide ? <EyeOff size={14} /> : <Eye size={14} />} {guide ? "Hide guide" : "Show guide"}
              </button>
            </p>
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-charcoal-100 bg-white">
              <span aria-hidden className="absolute inset-x-0 top-1/2 border-t border-dashed border-charcoal-100" />
              <span aria-hidden className="absolute inset-y-0 left-1/2 border-l border-dashed border-charcoal-100" />
              {guide ? <span aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center font-jp text-[11rem] leading-none text-[#0b1b3a]/[0.07] sm:text-[12rem]">{item.ch}</span> : null}
              <canvas
                ref={canvas}
                width={SIZE}
                height={SIZE}
                onPointerDown={down}
                onPointerMove={move}
                onPointerUp={up}
                onPointerCancel={up}
                aria-label="Drawing board"
                className={`${tool === "pen" ? "pencil-cursor" : "eraser-cursor"} relative h-full w-full touch-none text-[#0b1b3a]`}
              />
              {!inks.length ? <span className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-xs text-charcoal-500">Draw here with your finger, mouse or pen</span> : null}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2" role="toolbar" aria-label="Drawing tools">
              <div className="inline-flex overflow-hidden rounded-md border border-charcoal-100">
                <button type="button" onClick={() => setTool("pen")} aria-pressed={tool === "pen"} className={`inline-flex min-h-[40px] items-center gap-1.5 px-3 text-sm font-bold transition-colors ${tool === "pen" ? "bg-indigo-900 text-white" : "bg-surface text-indigo-950 hover:bg-bg-alt"}`}><Pencil size={15} /> Pen</button>
                <button type="button" onClick={() => setTool("eraser")} aria-pressed={tool === "eraser"} className={`inline-flex min-h-[40px] items-center gap-1.5 px-3 text-sm font-bold transition-colors ${tool === "eraser" ? "bg-indigo-900 text-white" : "bg-surface text-indigo-950 hover:bg-bg-alt"}`}><Eraser size={15} /> Eraser</button>
              </div>
              <button type="button" onClick={undo} disabled={!inks.length} aria-label="Undo" className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-charcoal-100 px-3 text-sm font-bold text-indigo-950 hover:border-indigo-700 disabled:opacity-40"><Undo2 size={15} /> Undo</button>
              <button type="button" onClick={redo} disabled={!undone.length} aria-label="Redo" className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-charcoal-100 px-3 text-sm font-bold text-indigo-950 hover:border-indigo-700 disabled:opacity-40"><Redo2 size={15} /> Redo</button>
              <button type="button" onClick={clearAll} disabled={!inks.length} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-charcoal-100 px-3 text-sm font-bold text-indigo-950 hover:border-indigo-700 disabled:opacity-40"><Trash2 size={15} /> Clear all</button>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button type="button" onClick={save} disabled={!lines.length} className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md border border-charcoal-100 text-sm font-bold text-indigo-950 hover:border-indigo-700 disabled:opacity-40"><Download size={15} /> Save</button>
              <button type="button" onClick={submit} disabled={!lines.length} className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md bg-indigo-900 text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-40"><Send size={15} /> Submit</button>
            </div>
            {score === null ? <p className="mt-3 text-sm text-charcoal-500">Couldn&apos;t load the strokes to check this one. Try again in a moment.</p> : null}
            {v && typeof score === "number" ? (
              <div className="pop-in mt-3 rounded-xl bg-bg-alt p-4" role="status">
                <div className="flex items-center justify-between">
                  <p className={`font-jp text-lg font-bold ${v.tone}`}>{v.jp}</p>
                  <p className="text-2xl font-semibold text-indigo-950">{score}%</p>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface"><div className="gradient-strip h-full rounded-full" style={{ width: `${score}%` }} /></div>
                <p className="mt-2 text-sm text-charcoal-700">{v.en} You drew {lines.length} stroke{lines.length === 1 ? "" : "s"}{step[1] ? `; ${item.ch} has ${step[1]}` : ""}.</p>
              </div>
            ) : null}
          </div>
        </div>
        {nav ? (
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-charcoal-100 pt-4">
            <button type="button" onClick={nav.onPrev} className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-charcoal-100 px-4 text-sm font-bold text-indigo-950 transition-colors hover:border-indigo-700"><ChevronLeft size={16} /> Previous</button>
            <span className="text-sm font-semibold text-charcoal-500">{nav.index + 1} of {nav.total}</span>
            <button type="button" onClick={nav.onNext} className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-md px-5 text-sm font-bold text-white transition-colors ${typeof score === "number" ? "bg-[#0a6fd1] hover:bg-indigo-900" : "bg-indigo-900 hover:bg-indigo-700"}`}>Next <ChevronRight size={16} /></button>
          </div>
        ) : null}
        <p className="mt-5 text-[11px] text-charcoal-500">Stroke order data: KanjiVG (CC BY-SA 3.0). Accuracy is an automatic estimate of shape and stroke count.</p>
      </div>
    </div>,
    document.body,
  );
}
