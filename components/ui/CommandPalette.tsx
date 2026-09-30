"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Search } from "lucide-react";
import { navGroups, simpleLinks } from "@/components/layout/navData";

interface Item {
  label: string;
  href: string;
  group: string;
}

const extras: Item[] = [
  { label: "Take the free level test", href: "/level-test", group: "Quick" },
  { label: "Book a free demo class", href: "/free-japanese-demo-class", group: "Quick" },
  { label: "Contact admissions", href: "/contact", group: "Quick" },
  { label: "Success stories", href: "/success-stories", group: "Quick" },
  { label: "Blog", href: "/blog", group: "Quick" },
];

export function openPalette() {
  window.dispatchEvent(new Event("np-open-palette"));
}

export function PaletteButton() {
  return (
    <button
      type="button"
      onClick={openPalette}
      aria-label="Search the site"
      className="hidden lg:flex h-10 items-center gap-2 rounded-full border border-charcoal-100 px-3 text-sm text-charcoal-500 transition-colors hover:border-sun-400 hover:text-sun-500"
    >
      <Search size={16} />
      <span>Search</span>
      <kbd className="rounded border border-charcoal-100 px-1.5 text-[11px] font-semibold">Ctrl K</kbd>
    </button>
  );
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(() => {
    const all: Item[] = [
      ...navGroups.flatMap((g) => g.items.map((i) => ({ label: i.label, href: i.href, group: g.label }))),
      ...simpleLinks.map((l) => ({ label: l.label, href: l.href, group: "Pages" })),
      ...extras,
    ];
    const seen = new Set<string>();
    return all.filter((i) => (seen.has(i.href + i.label) ? false : seen.add(i.href + i.label)));
  }, []);

  const results = useMemo(() => {
    const t = q.toLowerCase().trim();
    if (!t) return items.slice(0, 9);
    return items.filter((i) => `${i.label} ${i.group}`.toLowerCase().includes(t)).slice(0, 9);
  }, [q, items]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setQ("");
        setSel(0);
        setOpen((o) => !o);
      } else if (e.key === "Escape") setOpen(false);
    };
    const show = () => {
      setQ("");
      setSel(0);
      setOpen(true);
    };
    addEventListener("keydown", key);
    addEventListener("np-open-palette", show);
    return () => {
      removeEventListener("keydown", key);
      removeEventListener("np-open-palette", show);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => input.current?.focus(), 30);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search the site">
      <button type="button" aria-label="Close search" className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-charcoal-100 bg-surface shadow-2xl shadow-black/50 pop-in">
        <div className="flex items-center gap-3 border-b border-charcoal-100 px-4">
          <Search size={18} className="text-charcoal-500" />
          <input
            ref={input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSel((s) => Math.min(results.length - 1, s + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSel((s) => Math.max(0, s - 1));
              } else if (e.key === "Enter" && results[sel]) go(results[sel].href);
            }}
            placeholder="Search pages: N5 quiz, batches, hiragana"
            className="h-14 flex-1 bg-transparent text-charcoal-900 placeholder:text-charcoal-500 focus:outline-none"
          />
          <kbd className="rounded border border-charcoal-100 px-1.5 text-[11px] font-semibold text-charcoal-500">Esc</kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {results.length ? (
            results.map((r, i) => (
              <li key={r.href + r.label}>
                <button
                  type="button"
                  onMouseEnter={() => setSel(i)}
                  onClick={() => go(r.href)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left ${i === sel ? "bg-sun-100" : ""}`}
                >
                  <span className="font-semibold text-indigo-950">{r.label}</span>
                  <span className="flex items-center gap-2 text-xs text-charcoal-500">
                    {r.group}
                    {i === sel ? <CornerDownLeft size={14} /> : null}
                  </span>
                </button>
              </li>
            ))
          ) : (
            <li className="px-3 py-6 text-center text-sm text-charcoal-500">Nothing matches. Try another word.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
