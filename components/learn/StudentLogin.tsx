"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail } from "lucide-react";

const input = "w-full min-h-[52px] rounded-md border border-charcoal-300/70 bg-surface px-4 text-base focus:border-sun-400 focus:outline-none focus:ring-2 focus:ring-sun-400/20";

export function StudentLogin() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function post(url: string, body: object) {
    setBusy(true);
    setError("");
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).catch(() => null);
    const data = await res?.json().catch(() => null);
    setBusy(false);
    return { ok: Boolean(res?.ok && data?.ok), error: data?.error as string | undefined };
  }

  async function requestCode(e: FormEvent) {
    e.preventDefault();
    const r = await post("/api/student/request-code", { email });
    if (!r.ok) return setError(r.error ?? "Something went wrong.");
    setInfo(`If ${email} is registered as a student, a 6-digit code is on its way. Check your inbox (and spam).`);
    setStep("code");
  }

  async function verify(e: FormEvent) {
    e.preventDefault();
    const r = await post("/api/student/verify", { email, code });
    if (!r.ok) return setError(r.error ?? "That code didn't work.");
    router.replace("/student");
    router.refresh();
  }

  return step === "email" ? (
    <form onSubmit={requestCode} className="grid gap-4">
      <label className="grid gap-1.5 text-sm font-semibold text-charcoal-800">
        Email you enrolled with
        <input className={input} type="email" inputMode="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </label>
      {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
      <button disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-md bg-sun-400 hover:bg-sun-500 min-h-[52px] font-bold text-white disabled:opacity-60">
        {busy ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />} Email me a sign-in code
      </button>
    </form>
  ) : (
    <form onSubmit={verify} className="grid gap-4">
      <p role="status" className="rounded-md bg-sun-100 px-4 py-3 text-sm text-charcoal-800">{info}</p>
      <label className="grid gap-1.5 text-sm font-semibold text-charcoal-800">
        6-digit code
        <input
          className={`${input} text-center text-2xl font-bold tracking-[0.5em]`}
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{6}"
          maxLength={6}
          required
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
        />
      </label>
      {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
      <button disabled={busy || code.length !== 6} className="inline-flex items-center justify-center gap-2 rounded-md bg-sun-400 hover:bg-sun-500 min-h-[52px] font-bold text-white disabled:opacity-60">
        {busy ? <Loader2 size={18} className="animate-spin" /> : null} Sign in
      </button>
      <button type="button" onClick={() => { setStep("email"); setCode(""); setError(""); }} className="text-sm font-semibold text-charcoal-700 underline underline-offset-4 min-h-[44px]">
        Use a different email
      </button>
    </form>
  );
}

export function StudentLogout() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/student/logout", { method: "POST" }).catch(() => null);
        router.replace("/student/login");
        router.refresh();
      }}
      className="rounded-md border border-charcoal-100 bg-surface px-4 min-h-[40px] text-sm font-semibold text-charcoal-700 hover:border-indigo-800"
    >
      Sign out
    </button>
  );
}
