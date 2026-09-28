"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

const input = "w-full min-h-[48px] rounded-md border border-charcoal-300/70 bg-surface px-3.5 text-[15px] focus:border-indigo-700 focus:outline-none aria-[invalid=true]:border-red-600";

export function ReviewForm() {
  const [v, setV] = useState({ name: "", course: "", level: "", quote: "", company: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (v.name.trim().length < 2) errs.name = "Please enter your name.";
    if (v.course.trim().length < 2) errs.course = "Which course did you take?";
    if (!v.level) errs.level = "Choose your level.";
    if (v.quote.trim().length < 20) errs.quote = "Please write at least 20 characters.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    const res = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) }).catch(() => null);
    const data = await res?.json().catch(() => null);
    if (res?.ok && data?.ok) return setState("done");
    if (data?.errors) setErrors(data.errors);
    setMsg(data?.error ?? "Something went wrong.");
    setState("error");
  }

  if (state === "done")
    return (
      <div role="status" className="rounded-lg border border-success/30 bg-success/5 p-6 text-center">
        <CheckCircle2 className="mx-auto text-success" size={36} />
        <p className="mt-2 font-bold text-indigo-950">ありがとうございます！ Thank you for your review.</p>
        <p className="text-sm text-charcoal-700">It will appear here once our team has checked it.</p>
      </div>
    );

  const err = (k: string) => (errors[k] ? <p className="text-sm text-red-600">{errors[k]}</p> : null);
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 text-left">
      <input className="hidden" tabIndex={-1} autoComplete="off" aria-hidden value={v.company} onChange={set("company")} />
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="grid gap-1.5 text-sm font-semibold">Your name<input className={input} value={v.name} onChange={set("name")} aria-invalid={!!errors.name} />{err("name")}</label>
        <label className="grid gap-1.5 text-sm font-semibold">Course<input className={input} placeholder="e.g. JLPT N5 Foundation" value={v.course} onChange={set("course")} aria-invalid={!!errors.course} />{err("course")}</label>
        <label className="grid gap-1.5 text-sm font-semibold">Level
          <select className={input} value={v.level} onChange={set("level")} aria-invalid={!!errors.level}>
            <option value="">Select…</option>
            {["Beginner", "N5", "N4", "N3", "N2", "N1"].map((l) => <option key={l}>{l}</option>)}
          </select>{err("level")}
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-semibold">Your experience
        <textarea rows={4} maxLength={800} className={`${input} py-3`} value={v.quote} onChange={set("quote")} aria-invalid={!!errors.quote} />
        {err("quote")}
      </label>
      {state === "error" ? <p role="alert" className="text-sm text-red-600">{msg}</p> : null}
      <button disabled={state === "sending"} className="justify-self-start rounded-md bg-sun-400 hover:bg-sun-500 px-6 min-h-[48px] font-bold text-white disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Submit review"}
      </button>
    </form>
  );
}
