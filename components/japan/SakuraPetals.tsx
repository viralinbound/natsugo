// Pure-CSS falling petals. Decorative only; hidden for reduced-motion users.
const petals = [
  { left: "6%", delay: "0s", dur: "13s", size: 12 },
  { left: "18%", delay: "4s", dur: "16s", size: 9 },
  { left: "31%", delay: "8s", dur: "14s", size: 11 },
  { left: "47%", delay: "2s", dur: "18s", size: 8 },
  { left: "62%", delay: "6s", dur: "15s", size: 13 },
  { left: "74%", delay: "10s", dur: "17s", size: 9 },
  { left: "86%", delay: "3s", dur: "14s", size: 11 },
  { left: "94%", delay: "9s", dur: "19s", size: 8 },
];

export function SakuraPetals() {
  return (
    <div aria-hidden className="sakura pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur, width: p.size, height: p.size * 0.8 }}
        />
      ))}
    </div>
  );
}
