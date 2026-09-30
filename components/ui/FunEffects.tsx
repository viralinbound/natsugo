"use client";

import { useEffect, useRef } from "react";
import { fireConfetti } from "@/lib/confetti";

const PETALS = ["#ffd1dc", "#ff9fb5", "#ffc2d1", "#bfe3ff"];

function spawnPetal(x: number, y: number, burst = false) {
  const el = document.createElement("span");
  const size = 7 + Math.random() * 8;
  const dx = (Math.random() - 0.5) * (burst ? 150 : 60);
  const dy = burst ? -30 - Math.random() * 90 : 30 + Math.random() * 50;
  el.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:${size}px;height:${size * 0.7}px;border-radius:150% 0 150% 0;background:${PETALS[(Math.random() * PETALS.length) | 0]};pointer-events:none;z-index:9998;opacity:.9`;
  document.body.appendChild(el);
  el.animate(
    [
      { transform: "translate(0,0) rotate(0deg)", opacity: 0.9 },
      { transform: `translate(${dx}px,${dy}px) rotate(${(Math.random() - 0.5) * 540}deg)`, opacity: 0 },
    ],
    { duration: burst ? 800 : 1100, easing: "cubic-bezier(.2,.7,.3,1)" },
  ).onfinish = () => el.remove();
}

export function FunEffects() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const progress = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`;
    };
    progress();
    addEventListener("scroll", progress, { passive: true });
    addEventListener("resize", progress);
    if (calm) return () => { removeEventListener("scroll", progress); removeEventListener("resize", progress); };

    let last = 0;
    let tilted: HTMLElement | null = null;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const now = performance.now();
      if (now - last > 70) {
        last = now;
        spawnPetal(e.clientX, e.clientY);
      }
      const card = (e.target as HTMLElement | null)?.closest?.<HTMLElement>(".card-modern");
      if (tilted && tilted !== card) {
        tilted.style.removeProperty("--rx");
        tilted.style.removeProperty("--ry");
        tilted = null;
      }
      if (card && card.offsetWidth < 520) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
        card.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 8}deg`);
        tilted = card;
      }
    };
    const click = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement | null)?.closest?.(".btn-shine");
      if (btn) for (let i = 0; i < 10; i++) spawnPetal(e.clientX, e.clientY, true);
    };
    if (fine) addEventListener("pointermove", move, { passive: true });
    addEventListener("click", click);
    return () => {
      removeEventListener("scroll", progress);
      removeEventListener("resize", progress);
      removeEventListener("pointermove", move);
      removeEventListener("click", click);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1">
      <div ref={bar} className="gradient-strip h-full origin-left" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

export { fireConfetti };
