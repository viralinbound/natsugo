// Concentric open circles (ensō) in the brand colours, slowly turning. Decorative only.
const rings = [
  { r: 70, color: "#e0344b", w: 5, dash: "330 110", secs: 24 },
  { r: 110, color: "#f5b942", w: 4, dash: "560 131", secs: 32 },
  { r: 150, color: "#22d3ee", w: 4, dash: "720 222", secs: 40 },
  { r: 190, color: "#0c88ff", w: 4, dash: "900 294", secs: 48 },
  { r: 230, color: "#8a96b2", w: 3, dash: "1100 345", secs: 62 },
  { r: 270, color: "#5b6b8f", w: 3, dash: "1400 296", secs: 76 },
];

export function EnsoCircles({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden role="presentation" viewBox="0 0 600 600" className={className}>
      {rings.map((c, i) => (
        <circle
          key={c.r}
          className="enso-ring"
          cx="300"
          cy="300"
          r={c.r}
          fill="none"
          stroke={c.color}
          strokeWidth={c.w}
          strokeLinecap="round"
          strokeDasharray={c.dash}
          style={{ animationDuration: `${c.secs}s`, animationDirection: i % 2 ? "reverse" : "normal" }}
        />
      ))}
      <circle className="scene-sun" cx="300" cy="300" r="26" fill="#e0344b" />
    </svg>
  );
}
