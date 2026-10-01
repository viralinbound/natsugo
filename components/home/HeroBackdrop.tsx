"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { images } from "@/lib/site";

const scenes = [
  { src: images.kyoto, alt: "Kyoto street with a pagoda" },
  { src: images.fuji, alt: "Mount Fuji" },
  { src: images.sakura, alt: "Cherry blossoms" },
  { src: images.tokyoNight, alt: "Tokyo at night" },
];

// Hero background: Japan photos that slowly zoom and cross-fade.
export function HeroBackdrop() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => !document.hidden && setI((n) => (n + 1) % scenes.length), 5000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {scenes.map((s, n) => (
        <Image
          key={s.src}
          src={`${s.src}?w=2000&q=80&auto=format&fit=crop`}
          alt=""
          fill
          priority={n === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-[1200ms] ${n === i ? "opacity-100 hero-kenburns" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/85 via-bg/75 to-bg/90 md:bg-gradient-to-r md:from-bg md:via-bg/75 md:to-bg/5 lg:via-bg/60 lg:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
