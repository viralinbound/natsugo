"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js-reveal");
    const targets = document.querySelectorAll<HTMLElement>("main > section:not(:first-child), main > div > section");
    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        fired = true;
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    targets.forEach((el) => {
      el.classList.add("reveal");
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add("is-visible");
      else observer.observe(el);
    });
    const fallback = window.setTimeout(() => {
      if (!fired) targets.forEach((el) => el.classList.add("is-visible"));
    }, 2500);
    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
