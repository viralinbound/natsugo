// A single sumi-e ink brush stroke that tapers at both ends, with a small red seal dot. Decorative.
export function BrushStroke({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden role="presentation" viewBox="0 0 1200 60" preserveAspectRatio="none" className={className}>
      <defs>
        <linearGradient id="brush-ink" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="12%" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="55%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="92%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        className="brush-draw"
        fill="url(#brush-ink)"
        d="M10 34 C160 22 320 20 470 26 C640 32 800 24 960 22 C1060 21 1130 26 1190 30 C1120 34 1040 38 950 36 C800 33 650 42 480 40 C320 38 170 40 10 34 Z"
      />
      <circle cx="1150" cy="16" r="9" fill="#e0344b" />
    </svg>
  );
}
