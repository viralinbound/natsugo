// Layered ukiyo-e style waves with curling crests and foam dots, in the brand blues. Decorative.
export function UkiyoeWaves({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden role="presentation" viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" className={className}>
      <g className="wave-sway">
        <path
          fill="#cfe7ff"
          d="M0 220V120c60-10 110-50 180-50 50 0 80 30 60 55-15 18-45 10-45-8 0-14 20-18 28-6 70-40 170-30 240 10 60 34 130 30 190-6 60-36 150-40 210 6 55 42 130 44 190 6 58-36 150-44 212 4 50 38 110 38 175 0v109Z"
        />
      </g>
      <g className="wave-sway wave-sway-b">
        <path
          fill="#7cc4ff"
          opacity="0.75"
          d="M0 220V160c80 4 130-40 210-40 60 0 96 36 72 64-18 22-54 12-54-10 0-16 24-20 34-6 60-30 150-26 214 8 66 34 140 30 204-4 66-34 150-34 214 4 64 38 140 38 206 2 64-34 146-36 206 4 44 28 90 30 130 12v66Z"
        />
      </g>
      <path fill="#0c88ff" opacity="0.9" d="M0 220v-34c120 26 240-26 360-6s240 34 360 6 240-30 360-4 240 22 360-2v40Z" />
      <g fill="#ffffff" opacity="0.9">
        <circle cx="236" cy="118" r="4" />
        <circle cx="252" cy="108" r="3" />
        <circle cx="268" cy="114" r="2.5" />
        <circle cx="296" cy="168" r="3.5" />
        <circle cx="312" cy="158" r="2.5" />
        <circle cx="1030" cy="126" r="3" />
        <circle cx="1046" cy="118" r="2.5" />
        <circle cx="880" cy="170" r="3" />
      </g>
      <circle cx="1200" cy="70" r="40" fill="#e0344b" opacity="0.85" />
    </svg>
  );
}
