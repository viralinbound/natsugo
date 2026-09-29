"use client";

import { ExternalLink, PlayCircle, Radio } from "lucide-react";
import { useClock, useHydrated } from "@/lib/useBrowserStore";

const JOIN_EARLY_MIN = 15;

export function liveState(startsAt: string, durationMin: number, now: number) {
  const start = new Date(startsAt).getTime();
  const end = start + durationMin * 60_000;
  if (now >= start && now < end) return "live" as const;
  if (now >= end) return "ended" as const;
  if (now >= start - JOIN_EARLY_MIN * 60_000) return "soon" as const;
  return "upcoming" as const;
}

const until = (ms: number) => {
  const m = Math.round(ms / 60000);
  if (m < 60) return `in ${m} min`;
  const h = Math.round(m / 60);
  if (h < 48) return `in ${h} hr${h > 1 ? "s" : ""}`;
  return `in ${Math.round(h / 24)} days`;
};

export function LiveBadge({ startsAt, durationMin }: { startsAt: string; durationMin: number }) {
  const now = useClock();
  const hydrated = useHydrated();
  if (!hydrated) return null;
  const s = liveState(startsAt, durationMin, now);
  if (s === "live")
    return (
      <span className="inline-flex items-center gap-1.5 rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> LIVE NOW
      </span>
    );
  if (s === "soon") return <span className="rounded bg-sun-100 px-2 py-0.5 text-xs font-bold text-sun-500">Starting soon</span>;
  if (s === "ended") return <span className="rounded bg-bg-alt px-2 py-0.5 text-xs font-bold text-charcoal-500">Ended</span>;
  return <span className="rounded bg-bg-alt px-2 py-0.5 text-xs font-semibold text-charcoal-700">{until(new Date(startsAt).getTime() - now)}</span>;
}

// What anyone can do right now: join (15 min before → end), or watch the recording afterwards.
export function LiveAction({
  startsAt,
  durationMin,
  joinUrl,
  recordingUrl,
  platform,
}: {
  startsAt: string;
  durationMin: number;
  joinUrl?: string | null;
  recordingUrl?: string | null;
  platform: string;
}) {
  const now = useClock();
  const hydrated = useHydrated();
  if (!hydrated) return <span className="h-10 w-28" />;
  const s = liveState(startsAt, durationMin, now);
  const cls = "inline-flex items-center justify-center gap-1.5 rounded-md px-4 min-h-[40px] text-sm font-bold";

  if (s === "ended")
    return recordingUrl ? (
      <a href={recordingUrl} target="_blank" rel="noopener noreferrer" className={`${cls} bg-indigo-900 text-white hover:bg-indigo-800`}>
        <PlayCircle size={16} /> Watch recording
      </a>
    ) : (
      <span className="text-sm text-charcoal-500">Recording coming soon</span>
    );
  if ((s === "live" || s === "soon") && joinUrl)
    return (
      <a href={joinUrl} target="_blank" rel="noopener noreferrer" className={`${cls} ${s === "live" ? "bg-red-600 hover:bg-red-500" : "bg-sun-400 hover:bg-sun-500"} text-white`}>
        <Radio size={16} /> Join on {platform} <ExternalLink size={13} />
      </a>
    );
  return <span className="text-sm text-charcoal-500">Join link opens 15 min before class</span>;
}
