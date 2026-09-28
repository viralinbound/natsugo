"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { getBrowserClient } from "@/lib/supabase/browser";

// Supabase Presence: how many people currently have this page open. Hidden unless 2+.
export function ViewerCount({ room, className = "" }: { room: string; className?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sb = getBrowserClient();
    if (!sb) return;
    const channel = sb.channel(`presence:${room}`, { config: { presence: { key: crypto.randomUUID() } } });
    channel
      .on("presence", { event: "sync" }, () => setCount(Object.keys(channel.presenceState()).length))
      .subscribe((status) => {
        if (status === "SUBSCRIBED") channel.track({ at: Date.now() });
      });
    return () => {
      sb.removeChannel(channel);
    };
  }, [room]);

  if (count < 2) return null;
  return (
    <p className={`inline-flex items-center gap-1.5 text-sm font-semibold ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </span>
      <Eye size={15} aria-hidden /> {count} people viewing this right now
    </p>
  );
}
