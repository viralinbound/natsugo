"use client";

import { useEffect, useState } from "react";

const fmt = (tz: string) =>
  new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: tz }).format(new Date());

export function TokyoClock() {
  const [times, setTimes] = useState<{ tokyo: string; india: string } | null>(null);

  useEffect(() => {
    const tick = () => setTimes({ tokyo: fmt("Asia/Tokyo"), india: fmt("Asia/Kolkata") });
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!times) return <p className="h-5" aria-hidden />;
  return (
    <p className="text-sm text-white/70">
      <span className="font-jp text-sun-300">東京</span> {times.tokyo}
      <span className="mx-2 text-white/30">·</span>
      Bengaluru {times.india}
      <span className="ml-2 text-white/40">(Japan is 3½ hrs ahead)</span>
    </p>
  );
}
