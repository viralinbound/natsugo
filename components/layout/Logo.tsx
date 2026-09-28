import Image from "next/image";
import Link from "next/link";

// The one registered Natsugo mark (icon stacked above the wordmark, transparent background) —
// used everywhere the brand appears: header, footer, sign-in pages, emails. Never a different treatment.
export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Natsugo home" className={`flex items-center shrink-0 min-w-0 max-w-[160px] group ${className}`}>
      <Image
        src="/brand/natsugo-stacked.png"
        alt="Natsugo"
        width={749}
        height={701}
        priority
        className={`h-12 sm:h-14 w-auto max-w-full transition-opacity ${light ? "brightness-0 invert" : ""} group-hover:opacity-80`}
      />
    </Link>
  );
}
