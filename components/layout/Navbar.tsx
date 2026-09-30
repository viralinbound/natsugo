"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PaletteButton } from "@/components/ui/CommandPalette";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { navGroups, simpleLinks } from "@/components/layout/navData";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close menus after navigating (adjusting state during render, as React recommends).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenGroup(null);
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
        <div className="flex min-h-16 xl:min-h-20 py-2 items-center justify-between gap-4">
          <Logo />

          <ul className="hidden xl:flex items-center gap-0.5">
            {navGroups.map((group) => {
              const active = group.items.some((it) => pathname === it.href || pathname.startsWith(`${it.href}/`));
              return (
                <li
                  key={group.label}
                  className="relative"
                  onPointerEnter={(e) => e.pointerType === "mouse" && setOpenGroup(group.label)}
                  onPointerLeave={(e) => e.pointerType === "mouse" && setOpenGroup(null)}
                  onKeyDown={(e) => e.key === "Escape" && setOpenGroup(null)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenGroup(null);
                  }}
                >
                  <button
                    className={`relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${active || openGroup === group.label ? "text-sun-500" : "text-charcoal-700 hover:text-sun-500"}`}
                    aria-expanded={openGroup === group.label}
                    onClick={(e) =>
                      // detail === 0 means keyboard activation: toggle. Pointer clicks only open (hover may have opened it already).
                      setOpenGroup(e.detail === 0 && openGroup === group.label ? null : group.label)
                    }
                  >
                    {group.label}
                    <ChevronDown size={15} className={`transition-transform ${openGroup === group.label ? "rotate-180" : ""}`} />
                    {active ? <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-sun-400 to-hanko" /> : null}
                  </button>
                  {openGroup === group.label ? (
                    <div className="absolute left-0 top-full w-64 pt-2">
                      <div className="card-modern p-2 shadow-xl shadow-black/10">
                        {group.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal-700 transition-colors hover:bg-bg-alt hover:text-sun-500"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
            {simpleLinks.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${active ? "text-sun-500" : "text-charcoal-700 hover:text-sun-500"}`}
                  >
                    {link.label}
                    {active ? <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-sun-400 to-hanko" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden xl:flex items-center gap-2">
          <PaletteButton />
          <ThemeToggle />
            <Button href="/level-test" variant="primary" size="sm">
              Take Free Level Test
            </Button>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
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

      {mobileOpen
        ? createPortal(
            <div className="fixed inset-0 z-[90] xl:hidden" role="dialog" aria-modal="true" aria-label="Menu">
              <button type="button" aria-label="Close menu" className="drawer-backdrop absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
              <div className="drawer-panel absolute right-0 top-0 flex h-dvh w-[min(88vw,380px)] flex-col bg-surface shadow-2xl shadow-black/40">
                <div className="flex items-center justify-between border-b border-charcoal-100 px-5 py-4">
                  <span className="font-mincho text-lg font-bold text-indigo-950">
                    メニュー <span className="font-sans text-sm font-semibold text-charcoal-500">· Menu</span>
                  </span>
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setMobileOpen(false)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-charcoal-100 text-charcoal-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-2">
                  {navGroups.map((group) => (
                    <div key={group.label} className="border-b border-charcoal-100">
                      <button
                        className="flex w-full items-center justify-between py-3.5 text-left font-semibold text-charcoal-900"
                        aria-expanded={mobileGroup === group.label}
                        onClick={() => setMobileGroup(mobileGroup === group.label ? null : group.label)}
                      >
                        {group.label}
                        <ChevronDown size={18} className={`transition-transform ${mobileGroup === group.label ? "rotate-180" : ""}`} />
                      </button>
                      {mobileGroup === group.label ? (
                        <div className="flex flex-col gap-0.5 pb-3">
                          {group.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-sm text-charcoal-700 hover:bg-bg-alt"
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
                      className="flex min-h-[44px] items-center border-b border-charcoal-100 py-3.5 font-semibold text-charcoal-900"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-charcoal-100 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                  <Button href="/level-test" variant="primary" className="w-full">
                    Take Free Level Test
                  </Button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
