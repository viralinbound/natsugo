"use client";

import Link from "next/link";
import { useLiveSeats } from "@/components/live/useLiveSeats";

export function LiveSeats({ batchId, initial }: { batchId: string; initial: number }) {
  const { seats, changed } = useLiveSeats(batchId, initial);
  const cls = seats === 0 ? "font-bold text-red-600" : seats <= 5 ? "font-semibold text-red-600" : "";
  return (
    <span aria-live="polite" className={`transition-colors ${changed ? "bg-sun-300 rounded px-1" : ""} ${cls}`}>
      {seats === 0 ? "Batch full — waitlist open" : `${seats} seats left`}
    </span>
  );
}

// Swaps the enrol button for "Join waitlist" once a batch fills up, live.
export function EnrolOrWaitlist({ batchId, initial }: { batchId: string; initial: number }) {
  const { seats } = useLiveSeats(batchId, initial);
  const full = seats === 0;
  return (
    <Link
      href={full ? `/enrol?batch=${batchId}&waitlist=1` : `/enrol?batch=${batchId}`}
      className={`inline-flex items-center justify-center rounded-md font-bold text-sm px-4 min-h-[40px] ${
        full ? "bg-indigo-900 text-white hover:bg-indigo-800" : "bg-sun-400 text-white hover:bg-sun-500 shadow-[0_2px_0_rgba(15,19,41,0.18)]"
      }`}
    >
      {full ? "Join Waitlist" : "Enrol"}
    </Link>
  );
}
