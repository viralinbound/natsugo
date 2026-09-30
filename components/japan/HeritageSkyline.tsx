// Flat, layered silhouette of traditional Japan: Mt Fuji, a five-storey pagoda, a castle keep,
// a torii gate and cherry trees, in the brand blues with a red sun. Decorative.
function Pagoda({ x, base, s, fill }: { x: number; base: number; s: number; fill: string }) {
  const tiers = [0, 1, 2, 3, 4];
  return (
    <g fill={fill}>
      <rect x={x - 1.5 * s} y={base - 92 * s} width={3 * s} height={16 * s} />
      {tiers.map((i) => {
        const w = (46 - i * 6) * s;
        const y = base - (i + 1) * 15 * s;
        return (
          <g key={i}>
            <rect x={x - (w * 0.5) / 2} y={y} width={w * 0.5} height={11 * s} />
            <path d={`M${x - w / 2} ${y + 2 * s} Q${x} ${y - 6 * s} ${x + w / 2} ${y + 2 * s} L${x + w / 2 - 4 * s} ${y + 4 * s} L${x - w / 2 + 4 * s} ${y + 4 * s} Z`} />
          </g>
        );
      })}
    </g>
  );
}

function Castle({ x, base, s, fill }: { x: number; base: number; s: number; fill: string }) {
  return (
    <g fill={fill}>
      <path d={`M${x - 44 * s} ${base} L${x - 36 * s} ${base - 22 * s} L${x + 36 * s} ${base - 22 * s} L${x + 44 * s} ${base} Z`} />
      <rect x={x - 26 * s} y={base - 40 * s} width={52 * s} height={18 * s} />
      <path d={`M${x - 36 * s} ${base - 38 * s} Q${x} ${base - 50 * s} ${x + 36 * s} ${base - 38 * s} L${x + 30 * s} ${base - 34 * s} L${x - 30 * s} ${base - 34 * s} Z`} />
      <rect x={x - 17 * s} y={base - 60 * s} width={34 * s} height={20 * s} />
      <path d={`M${x - 27 * s} ${base - 58 * s} Q${x} ${base - 70 * s} ${x + 27 * s} ${base - 58 * s} L${x + 22 * s} ${base - 54 * s} L${x - 22 * s} ${base - 54 * s} Z`} />
      <rect x={x - 10 * s} y={base - 76 * s} width={20 * s} height={16 * s} />
      <path d={`M${x - 18 * s} ${base - 74 * s} Q${x} ${base - 86 * s} ${x + 18 * s} ${base - 74 * s} L${x + 14 * s} ${base - 70 * s} L${x - 14 * s} ${base - 70 * s} Z`} />
    </g>
  );
}

function Torii({ x, base, s, fill }: { x: number; base: number; s: number; fill: string }) {
  return (
    <g fill={fill}>
      <path d={`M${x - 30 * s} ${base - 46 * s} Q${x} ${base - 54 * s} ${x + 30 * s} ${base - 46 * s} L${x + 28 * s} ${base - 41 * s} Q${x} ${base - 48 * s} ${x - 28 * s} ${base - 41 * s} Z`} />
      <rect x={x - 22 * s} y={base - 36 * s} width={44 * s} height={4 * s} />
      <rect x={x - 19 * s} y={base - 42 * s} width={4.5 * s} height={42 * s} />
      <rect x={x + 14.5 * s} y={base - 42 * s} width={4.5 * s} height={42 * s} />
    </g>
  );
}

function Sakura({ x, base, s }: { x: number; base: number; s: number }) {
  return (
    <g>
      <path d={`M${x} ${base} L${x - 2 * s} ${base - 22 * s} Q${x - 10 * s} ${base - 30 * s} ${x - 16 * s} ${base - 34 * s} M${x - 2 * s} ${base - 22 * s} Q${x + 8 * s} ${base - 30 * s} ${x + 14 * s} ${base - 36 * s}`} stroke="#0b1b3a" strokeWidth={2.5 * s} fill="none" strokeLinecap="round" />
      <g fill="#ffb7c9">
        <circle cx={x - 16 * s} cy={base - 38 * s} r={11 * s} />
        <circle cx={x - 2 * s} cy={base - 44 * s} r={13 * s} />
        <circle cx={x + 14 * s} cy={base - 40 * s} r={11 * s} />
        <circle cx={x - 6 * s} cy={base - 32 * s} r={9 * s} opacity="0.85" />
      </g>
    </g>
  );
}

export function HeritageSkyline({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden role="presentation" viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice" className={className}>
      <circle cx="1010" cy="92" r="46" fill="#e0344b" opacity="0.9" />
      <path d="M760 260 L960 104 Q980 90 1000 104 L1210 260 Z" fill="#dbeafe" />
      <path d="M936 124 L960 104 Q980 90 1000 104 L1024 124 L1008 120 L992 132 L978 118 L964 130 L952 120 Z" fill="#ffffff" />
      <path d="M0 260 V206 Q180 186 360 204 T720 200 T1080 206 T1440 198 V260 Z" fill="#bfdbfe" />
      <g className="sky-drift">
        <Pagoda x={250} base={214} s={1.25} fill="#7cb7f5" />
        <Castle x={1250} base={210} s={1.15} fill="#7cb7f5" />
      </g>
      <path d="M0 260 V226 Q240 210 480 224 T960 222 T1440 216 V260 Z" fill="#3d9bff" />
      <Torii x={640} base={232} s={1.05} fill="#e0344b" />
      <Sakura x={120} base={236} s={1.1} />
      <Sakura x={470} base={240} s={0.9} />
      <Sakura x={880} base={238} s={1} />
      <Sakura x={1370} base={236} s={1.05} />
      <path d="M0 260 V244 Q360 232 720 242 T1440 240 V260 Z" fill="#0b1b3a" />
    </svg>
  );
}
