"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PaletteButton } from "@/components/ui/CommandPalette";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { navGroups, primaryLinks, simpleLinks } from "@/components/layout/navData";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close menus after navigating (adjusting state during render, as React recommends).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
  }

  // Stop the page behind the mobile menu from scrolling.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-charcoal-100/70 shadow-[0_4px_20px_-12px_rgba(12,136,255,0.35)]">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex min-h-16 lg:min-h-20 py-2 items-center justify-between gap-4">
          <Logo />

          <ul className="hidden lg:flex items-center gap-1">
            {primaryLinks.map((link) => {
              const active = link.match.some((m) => pathname.startsWith(m));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-block whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${active ? "text-sun-500" : "text-charcoal-700 hover:text-sun-500"}`}
                  >
                    {link.label}
                    {active ? <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-sun-400 to-hanko" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center gap-2">
          <PaletteButton />
          <ThemeToggle />
            <Button href="/level-test" variant="primary" size="sm">
              Take Free Level Test
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
        <ThemeToggle />
            <div className="hidden sm:block">
              <Button href="/level-test" variant="primary" size="sm">
                Take Free Level Test
              </Button>
            </div>
            <button
              className="p-2 -mr-2 rounded-lg text-indigo-950 hover:bg-bg-alt"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen ? (
        <div className="lg:hidden border-t border-charcoal-100 bg-surface max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navGroups.map((group) => (
              <div key={group.label} className="border-b border-charcoal-100 last:border-0">
                <button
                  className="w-full flex items-center justify-between py-3 text-left font-semibold text-charcoal-900"
                  aria-expanded={mobileGroup === group.label}
                  onClick={() =>
                    setMobileGroup(mobileGroup === group.label ? null : group.label)
                  }
                >
                  {group.label}
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${mobileGroup === group.label ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileGroup === group.label ? (
                  <div className="pb-3 flex flex-col gap-0.5">
                    {group.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg px-3 py-2.5 text-sm text-charcoal-700 hover:bg-bg-alt min-h-[44px] flex items-center"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {simpleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 font-semibold text-charcoal-900 border-b border-charcoal-100 last:border-0 min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <Button href="/level-test" variant="primary">
                Take Free Level Test
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
