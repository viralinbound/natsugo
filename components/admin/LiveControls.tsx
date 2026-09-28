"use client";

import { useState, useTransition } from "react";
import { deleteLiveSession, type ActionResult } from "@/app/admin/actions";
import { Notice } from "@/components/admin/AdminControls";

export function DeleteLiveButton({ id }: { id: string }) {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<ActionResult | null>(null);
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        disabled={pending}
        onClick={() => confirm("Delete this class and its links?") && start(async () => setMsg(await deleteLiveSession(id)))}
        className="rounded border border-red-600 px-3 min-h-[36px] text-sm font-semibold text-red-600 disabled:opacity-50"
      >
        Delete class
      </button>
      <Notice result={msg} />
    </div>
  );
}
