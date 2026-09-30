"use client";

const COLORS = ["#0c88ff", "#22d3ee", "#ff8fa8", "#e0344b", "#ffd166", "#ffffff"];

export function fireConfetti(opts: { x?: number; y?: number; count?: number; spread?: number } = {}) {
  if (typeof document === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const { x = window.innerWidth / 2, y = window.innerHeight * 0.4, count = 90, spread = 1 } = opts;
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999";
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas.remove();
  ctx.scale(dpr, dpr);

  const parts = Array.from({ length: count }, () => {
    const a = Math.random() * Math.PI * 2;
    const v = (4 + Math.random() * 9) * spread;
    return { x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 5, w: 6 + Math.random() * 6, h: 4 + Math.random() * 5, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: COLORS[(Math.random() * COLORS.length) | 0], petal: Math.random() < 0.35 };
  });
  const start = performance.now();
  const tick = (now: number) => {
    const t = now - start;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const p of parts) {
      p.vy += 0.28;
      p.vx *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - t / 2200);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.c;
      if (p.petal) {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.w / 1.6, p.h / 2.4, 0, 0, Math.PI * 2);
        ctx.fill();
      } else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (t < 2200) requestAnimationFrame(tick);
    else canvas.remove();
  };
  requestAnimationFrame(tick);
}
