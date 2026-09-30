// Thin rule with a small torii gate in the middle, used to separate major home sections. Decorative.
export function ToriiDivider() {
  return (
    <div aria-hidden className="mx-auto flex max-w-5xl items-center gap-5 px-6 py-0">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-charcoal-300/60" />
      <svg viewBox="0 0 48 40" className="h-9 w-11 text-hanko" fill="currentColor">
        <path d="M2 8Q24 0 46 8L44 14Q24 8 4 14Z" />
        <rect x="8" y="16" width="32" height="4" rx="1" />
        <rect x="11" y="14" width="4" height="26" rx="1" />
        <rect x="33" y="14" width="4" height="26" rx="1" />
        <rect x="22" y="9" width="4" height="8" opacity="0.85" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-charcoal-300/60" />
    </div>
  );
}
