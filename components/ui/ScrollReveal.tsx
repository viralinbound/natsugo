"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Simple scroll animation: every section fades up as it enters the screen, and the cards inside it follow one by one.
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js-reveal");

    const all = Array.from(document.querySelectorAll<HTMLElement>("main section"));
    const targets = all.filter((el, i) => i > 0 && !all.some((o) => o !== el && o.contains(el)));

    const itemsOf = (section: HTMLElement) => {
      const items: HTMLElement[] = [];
      section.querySelectorAll<HTMLElement>(":scope .grid, :scope .swipe-row").forEach((box) => {
        if (box.closest("dl, table, details")) return;
        Array.from(box.children).slice(0, 12).forEach((c, i) => {
          const el = c as HTMLElement;
          if (el.tagName === "SPAN" || el.classList.contains("sr-only")) return;
          el.classList.add("reveal-item");
          el.style.transitionDelay = `${120 + i * 70}ms`;
          items.push(el);
        });
      });
      const tag = (el: HTMLElement, cls: string, delay: number) => {
        if (el.classList.contains("reveal-item") || el.closest(".reveal-item")) return;
        el.classList.add("reveal-item", cls);
        el.style.transitionDelay = `${delay}ms`;
        items.push(el);
      };
      section.querySelectorAll<HTMLElement>("h2, h3.text-2xl, h3.text-3xl").forEach((el) => tag(el, "from-left", 60));
      section.querySelectorAll<HTMLElement>("h2 + p, h2 ~ p.text-lg, h2 ~ p.text-base").forEach((el) => tag(el, "from-fade", 200));
      section.querySelectorAll<HTMLElement>("img").forEach((img, i) => {
        const box = img.parentElement as HTMLElement | null;
        if (box && box.getBoundingClientRect().width > 120) tag(box, "from-zoom", 150 + (i % 6) * 70);
      });
      return items;
    };

    const show = (section: HTMLElement, items: HTMLElement[]) => {
      section.classList.add("is-visible");
      window.setTimeout(() => {
        items.forEach((el) => {
          el.classList.remove("reveal-item", "from-left", "from-fade", "from-zoom");
          el.style.transitionDelay = "";
        });
      }, 1800);
    };

    const itemMap = new Map<HTMLElement, HTMLElement[]>();
    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        fired = true;
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            show(el, itemMap.get(el) ?? []);
            observer.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    targets.forEach((el) => {
      el.classList.add("reveal");
      itemMap.set(el, itemsOf(el));
      if (el.getBoundingClientRect().top < window.innerHeight) show(el, itemMap.get(el) ?? []);
      else observer.observe(el);
    });

    const fallback = window.setTimeout(() => {
      if (!fired) targets.forEach((el) => show(el, itemMap.get(el) ?? []));
    }, 2500);
    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
