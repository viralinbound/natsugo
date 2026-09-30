"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};
const isLight = () => document.documentElement.getAttribute("data-theme") === "light";

export function ThemeToggle() {
  const light = useSyncExternalStore(subscribe, isLight, () => false);

  const toggle = () => {
    const next = !light;
    if (next) document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.setItem("np-theme", next ? "light" : "dark");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className="grid h-10 w-10 place-items-center rounded-full border border-charcoal-100 text-charcoal-700 transition-colors hover:border-sun-400 hover:text-sun-500"
    >
      {light ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
