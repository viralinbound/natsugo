// Seigaiha-style scalloped edge that blends a dark hero into the page background.
export function WaveEdge() {
  return (
    <svg aria-hidden role="presentation" className="pointer-events-none absolute inset-x-0 bottom-0 h-5 w-full text-bg" preserveAspectRatio="none">
      <defs>
        <pattern id="wave-edge" width="40" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 20 A20 20 0 0 1 40 20 Z" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="20" fill="url(#wave-edge)" />
    </svg>
  );
}
