"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const KANJI = "和道心夢花桜月山川風空雪光縁静雅侍茶書学友愛美森海星雨虹竹松梅鶴";

interface Item {
  el: HTMLElement;
  cls: string[];
  delay: number;
}

// Sections rise in as they enter from below, and replay each time they come back up into view.
// Every section also gets a few faint drifting kanji in its empty space.
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js-reveal");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 640;

    const all = Array.from(document.querySelectorAll<HTMLElement>("main section"));
    const top = all.filter((el) => !all.some((o) => o !== el && o.contains(el)));
    const targets = top.slice(1);

    // Drifting kanji layer: words wander across the whole section and change over time.
    const layers: HTMLElement[] = [];
    const roamers: HTMLElement[] = [];
    const pick = () => KANJI[Math.floor(Math.random() * KANJI.length)];
    const place = (s: HTMLElement) => {
      s.style.left = `${3 + Math.random() * 84}%`;
      s.style.top = `${4 + Math.random() * 80}%`;
      s.style.setProperty("--kr", `${Math.round((Math.random() - 0.5) * 30)}deg`);
    };
    if (!calm) {
      top.slice(1).forEach((sec) => {
        if (sec.querySelector(":scope > .kanji-layer")) return;
        if (getComputedStyle(sec).position === "static") sec.style.position = "relative";
        sec.style.isolation = "isolate";
        const own = sec.querySelector<HTMLElement>(".jp-watermark")?.textContent?.trim();
        const layer = document.createElement("div");
        layer.className = "kanji-layer";
        layer.setAttribute("aria-hidden", "true");
        const count = small ? 2 : 4;
        for (let i = 0; i < count; i++) {
          const s = document.createElement("span");
          s.textContent = i === 0 && own ? own : pick();
          s.style.fontSize = `${(small ? 2.6 : 3.4) + Math.random() * (small ? 2 : 3.5)}rem`;
          place(s);
          layer.appendChild(s);
          roamers.push(s);
        }
        sec.prepend(layer);
        layers.push(layer);
      });
    }
    const roam = window.setInterval(() => {
      if (document.hidden || !roamers.length) return;
      for (let n = 0; n < Math.max(1, Math.round(roamers.length / 3)); n++) {
        const s = roamers[Math.floor(Math.random() * roamers.length)];
        const r = s.getBoundingClientRect();
        if (r.bottom < -300 || r.top > innerHeight + 300) continue;
        place(s);
        if (Math.random() < 0.6) {
          s.style.opacity = "0";
          window.setTimeout(() => {
            s.textContent = pick();
            s.style.opacity = "";
          }, 1300);
        }
      }
    }, 2600);

    const itemsOf = (section: HTMLElement) => {
      const items: Item[] = [];
      const seen = new Set<HTMLElement>();
      const add = (el: HTMLElement, cls: string[], delay: number) => {
        if (seen.has(el) || [...seen].some((s) => s.contains(el))) return;
        seen.add(el);
        items.push({ el, cls, delay });
      };
      section.querySelectorAll<HTMLElement>("h2, h3.text-2xl, h3.text-3xl").forEach((el) => add(el, ["reveal-item", "from-left"], 80));
      section.querySelectorAll<HTMLElement>("h2 + p, h2 ~ p.text-lg, h2 ~ p.text-base").forEach((el) => add(el, ["reveal-item", "from-fade"], 260));
      section.querySelectorAll<HTMLElement>(":scope .grid, :scope .swipe-row").forEach((box) => {
        if (box.closest("dl, table, details, [role=tablist]")) return;
        Array.from(box.children).slice(0, 12).forEach((c, i) => {
          const el = c as HTMLElement;
          if (el.tagName === "SPAN" || el.classList.contains("sr-only")) return;
          add(el, ["reveal-item"], 200 + i * 110);
        });
      });
      section.querySelectorAll<HTMLElement>("img").forEach((img, i) => {
        const box = img.parentElement as HTMLElement | null;
        if (box && box.getBoundingClientRect().width > 120) add(box, ["reveal-item", "from-zoom"], 220 + (i % 6) * 100);
      });
      return items;
    };

    const arm = (items: Item[]) =>
      items.forEach(({ el, cls, delay }) => {
        el.classList.add(...cls);
        el.style.transitionDelay = `${delay}ms`;
      });
    const timers = new Map<HTMLElement, number>();
    const show = (section: HTMLElement, items: Item[]) => {
      section.classList.add("is-visible");
      window.clearTimeout(timers.get(section));
      timers.set(
        section,
        window.setTimeout(() => {
          items.forEach(({ el, cls }) => {
            el.classList.remove(...cls);
            el.style.transitionDelay = "";
          });
        }, 2600),
      );
    };
    const hide = (section: HTMLElement, items: Item[]) => {
      window.clearTimeout(timers.get(section));
      section.classList.remove("is-visible");
      arm(items);
    };

    const itemMap = new Map<HTMLElement, Item[]>();
    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        fired = true;
        for (const e of entries) {
          const el = e.target as HTMLElement;
          const items = itemMap.get(el) ?? [];
          if (e.isIntersecting) show(el, items);
          else if (e.boundingClientRect.top > 0 && !calm) hide(el, items);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.04 },
    );

    targets.forEach((el) => {
      el.classList.add("reveal");
      const items = itemsOf(el);
      itemMap.set(el, items);
      arm(items);
      if (el.getBoundingClientRect().top < window.innerHeight) show(el, items);
      observer.observe(el);
    });

    const fallback = window.setTimeout(() => {
      if (!fired) targets.forEach((el) => show(el, itemMap.get(el) ?? []));
    }, 2500);
    return () => {
      window.clearTimeout(fallback);
      timers.forEach((t) => window.clearTimeout(t));
      window.clearInterval(roam);
      observer.disconnect();
      layers.forEach((l) => l.remove());
    };
  }, [pathname]);

  return null;
}
