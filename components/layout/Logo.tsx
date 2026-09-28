import Image from "next/image";
import Link from "next/link";

// Single wordmark asset (transparent background) used everywhere the brand appears —
// header, footer, sign-in pages — so it never drifts into a different treatment.
export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Natsugo home" className={`flex items-center shrink-0 group ${className}`}>
      <Image
        src="/brand/natsugo-wordmark.png"
        alt="Natsugo"
        width={749}
        height={142}
        priority
        className={`h-8 sm:h-9 w-auto transition-opacity ${light ? "brightness-0 invert" : ""} group-hover:opacity-80`}
      />
    </Link>
  );
}
