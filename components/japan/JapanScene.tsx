// Decorative hero illustration: rising sun, Mt Fuji, torii gate and a sakura branch. Purely visual.
export function JapanScene({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 480 420" className={className} role="presentation">
      <defs>
        <radialGradient id="js-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="70%" stopColor="#e0344b" />
          <stop offset="100%" stopColor="#e0344b" stopOpacity="0.15" />
        </radialGradient>
        <linearGradient id="js-fuji" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3da0ff" />
          <stop offset="100%" stopColor="#123c8a" />
        </linearGradient>
        <linearGradient id="js-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d2a66" />
          <stop offset="100%" stopColor="#081430" />
        </linearGradient>
      </defs>

      <circle className="scene-sun" cx="300" cy="150" r="96" fill="url(#js-sun)" />

      <g className="scene-cloud" fill="#ffffff" opacity="0.22">
        <ellipse cx="90" cy="110" rx="52" ry="12" />
        <ellipse cx="128" cy="100" rx="34" ry="10" />
      </g>
      <g className="scene-cloud scene-cloud-b" fill="#ffffff" opacity="0.18">
        <ellipse cx="380" cy="70" rx="46" ry="10" />
        <ellipse cx="410" cy="62" rx="28" ry="8" />
      </g>

      <path d="M40 340 L215 118 L390 340 Z" fill="url(#js-fuji)" />
      <path d="M180 162 L215 118 L250 162 L232 155 L215 172 L198 155 Z" fill="#ffffff" opacity="0.92" />
      <path d="M0 350 Q90 300 190 336 T380 330 T480 340 V420 H0 Z" fill="url(#js-hill)" />
      <path d="M0 384 Q120 350 240 380 T480 372 V420 H0 Z" fill="#050d22" />

      <g fill="#e0344b">
        <rect x="78" y="262" width="13" height="112" rx="2" />
        <rect x="178" y="262" width="13" height="112" rx="2" />
        <path d="M58 258 Q134 236 210 258 L206 274 Q134 254 62 274 Z" />
        <rect x="80" y="292" width="110" height="9" rx="2" />
      </g>
      <rect x="126" y="252" width="16" height="22" fill="#b8243a" />

      <g fill="none" stroke="#7a3f52" strokeWidth="3" strokeLinecap="round">
        <path d="M480 20 Q400 34 350 78 T250 96" />
        <path d="M410 36 Q400 60 384 74" />
      </g>
      <g fill="#ffb3c6">
        <circle cx="352" cy="76" r="8" />
        <circle cx="384" cy="72" r="7" />
        <circle cx="420" cy="38" r="8" />
        <circle cx="300" cy="90" r="7" />
        <circle cx="262" cy="96" r="6" />
        <circle cx="450" cy="28" r="6" />
      </g>
      <g fill="#ff8fa8">
        <circle cx="352" cy="76" r="3" />
        <circle cx="420" cy="38" r="3" />
        <circle cx="300" cy="90" r="2.5" />
      </g>
    </svg>
  );
}
