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

// Hero background: Japan photos that cross-fade, revealed by paper shoji doors sliding open on load.
export function HeroBackdrop() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => !document.hidden && setI((n) => (n + 1) % scenes.length), 6000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {scenes.map((s, n) => (
        <Image
          key={s.src}
          src={`${s.src}?w=1800&q=70&auto=format&fit=crop`}
          alt=""
          fill
          priority={n === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-[1600ms] ${n === i ? "opacity-100 hero-kenburns" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-bg/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-bg lg:via-bg/85 lg:to-bg/10" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
      <div className="shoji shoji-left" />
      <div className="shoji shoji-right" />
    </div>
  );
}
