"use client";

import { useEffect, useState } from "react";
import { getBrowserClient } from "@/lib/supabase/browser";

type Listener = (seats: number) => void;
const listeners = new Map<string, Set<Listener>>();
let subscribed = false;

function ensureChannel() {
  const sb = getBrowserClient();
  if (!sb || subscribed) return;
  subscribed = true;
  sb.channel("public:batches")
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "batches" }, (payload) => {
      const row = payload.new as { id: string; seats_left: number };
      listeners.get(row.id)?.forEach((fn) => fn(row.seats_left));
    })
    .subscribe();
}

// Seat count that updates instantly for every visitor when an enrolment is confirmed.
export function useLiveSeats(batchId: string, initial: number) {
  const [seats, setSeats] = useState(initial);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    ensureChannel();
    const fn: Listener = (n) => {
      setSeats(n);
      setChanged(true);
      setTimeout(() => setChanged(false), 2500);
    };
    const set = listeners.get(batchId) ?? new Set();
    set.add(fn);
    listeners.set(batchId, set);
    return () => {
      set.delete(fn);
    };
  }, [batchId]);

  return { seats, changed };
}
