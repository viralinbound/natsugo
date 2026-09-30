// Layered ink-wash (sumi-e) mountain ridges. Colour comes from the parent's text colour. Decorative.
export function SumiMountains({ className = "", sun = false }: { className?: string; sun?: boolean }) {
  return (
    <svg aria-hidden role="presentation" viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice" className={className}>
      {sun ? <circle cx="1080" cy="110" r="74" fill="#e0344b" opacity="0.2" /> : null}
      <path
        fill="currentColor"
        opacity="0.07"
        d="M0 240V150L120 110L220 150L340 78L470 140L600 58L720 130L860 88L980 150L1100 68L1230 130L1340 98L1440 140V240Z"
      />
      <path
        fill="currentColor"
        opacity="0.12"
        d="M0 240V190L90 160L200 200L330 140L440 190L560 118L690 190L820 148L950 205L1080 148L1200 200L1320 164L1440 195V240Z"
      />
      <path fill="currentColor" opacity="0.2" d="M0 240V212Q120 178 240 210T480 204T720 216T960 200T1200 212T1440 204V240Z" />
    </svg>
  );
}
