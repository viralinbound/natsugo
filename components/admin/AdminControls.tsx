"use client";

import { useActionState, useState, useTransition, type ReactNode } from "react";
import { deleteBatch, moderateReview, setLeadStatus, type ActionResult } from "@/app/admin/actions";

export function Notice({ result }: { result: ActionResult | null }) {
  if (!result) return null;
  return (
    <p role="status" className={`text-sm font-semibold ${result.ok ? "text-success" : "text-red-600"}`}>
      {result.message}
    </p>
  );
}

export function LeadStatus({ id, status }: { id: string; status: string }) {
  const [value, setValue] = useState(status);
  const [msg, setMsg] = useState<ActionResult | null>(null);
  const [pending, start] = useTransition();
  return (
    <div className="flex flex-col gap-1">
      <select
        aria-label="Lead status"
        value={value}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value as "new" | "contacted" | "confirmed" | "closed";
          start(async () => {
            const r = await setLeadStatus(id, next);
            setMsg(r);
            if (r.ok) setValue(next);
          });
        }}
        className="min-h-[36px] rounded border border-charcoal-100 bg-surface px-2 text-sm"
      >
        {["new", "contacted", "confirmed", "closed"].map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      {msg && !msg.ok ? <span className="text-xs text-red-600">{msg.message}</span> : null}
    </div>
  );
}

export function ReviewButtons({ id, approved }: { id: string; approved: boolean }) {
  const [msg, setMsg] = useState<ActionResult | null>(null);
  const [pending, start] = useTransition();
  const run = (a: "approve" | "verify" | "hide" | "delete") => () => {
    if (a === "delete" && !confirm("Delete this review permanently?")) return;
    start(async () => setMsg(await moderateReview(id, a)));
  };
  const btn = "rounded border px-3 min-h-[36px] text-sm font-semibold disabled:opacity-50";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {approved ? (
        <button disabled={pending} onClick={run("hide")} className={`${btn} border-charcoal-100`}>Hide</button>
      ) : (
        <button disabled={pending} onClick={run("approve")} className={`${btn} border-success text-success`}>Approve</button>
      )}
      <button disabled={pending} onClick={run("verify")} className={`${btn} border-indigo-800 text-indigo-800`}>Approve + mark verified</button>
      <button disabled={pending} onClick={run("delete")} className={`${btn} border-red-600 text-red-600`}>Delete</button>
      <Notice result={msg} />
    </div>
  );
}

export function DeleteBatchButton({ id }: { id: string }) {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<ActionResult | null>(null);
  return (
    <>
      <button
        type="button"
        disabled={pending}
        onClick={() => confirm("Delete this batch?") && start(async () => setMsg(await deleteBatch(id)))}
        className="rounded border border-red-600 px-3 min-h-[36px] text-sm font-semibold text-red-600 disabled:opacity-50"
      >
        Delete
      </button>
      <Notice result={msg} />
    </>
  );
}

export function ActionForm({
  action,
  children,
  submitLabel = "Save",
  className = "",
}: {
  action: (prev: ActionResult | null, f: FormData) => Promise<ActionResult>;
  children: ReactNode;
  submitLabel?: string;
  className?: string;
}) {
  const [result, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className={`grid gap-3 ${className}`}>
      {children}
      <div className="flex items-center gap-3">
        <button disabled={pending} className="rounded-md bg-sun-400 px-5 min-h-[44px] font-bold text-white hover:bg-sun-500 disabled:opacity-60">
          {pending ? "Saving…" : submitLabel}
        </button>
        <Notice result={result} />
      </div>
    </form>
  );
}

export const fieldCls = "w-full min-h-[40px] rounded border border-charcoal-300/70 bg-surface px-3 text-sm focus:border-indigo-700 focus:outline-none";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-1 text-xs font-bold uppercase tracking-wide text-charcoal-500">
      {label}
      {children}
    </label>
  );
}
