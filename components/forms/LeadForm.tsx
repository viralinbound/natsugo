"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  interests,
  levelsKnown,
  preferredTimes,
  validateLead,
  type LeadInput,
  type LeadType,
} from "@/lib/leads";
import { whatsappLink } from "@/lib/site";

type Errors = Partial<Record<keyof LeadInput, string>>;

const inputCls =
  "w-full min-h-[48px] rounded-md border border-charcoal-300/70 bg-surface px-3.5 text-[15px] text-charcoal-900 placeholder:text-charcoal-300 focus:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700/15 aria-[invalid=true]:border-red-600";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-charcoal-800">
        {label} {optional ? <span className="font-normal text-charcoal-500">(optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function LeadForm({
  type,
  submitLabel = "Submit",
  defaultInterest = "",
  batchId,
  compact = false,
}: {
  type: LeadType;
  submitLabel?: string;
  defaultInterest?: string;
  batchId?: string;
  compact?: boolean;
}) {
  const [values, setValues] = useState<Partial<LeadInput>>({
    type,
    name: "",
    phone: "",
    email: "",
    interest: defaultInterest,
    level: "",
    preferredTime: "",
    message: "",
    batchId,
    company: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: keyof LeadInput) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validateLead(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`lead-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-lg border border-success/30 bg-success/5 p-6 sm:p-8 text-center">
        <CheckCircle2 className="mx-auto text-success" size={40} />
        <h3 className="mt-3 text-xl font-bold text-indigo-950">Thank you, {values.name?.split(" ")[0]}!</h3>
        <p className="mt-2 text-charcoal-700">
          Our admissions team will contact you on {values.phone} shortly.
        </p>
        <a
          href={whatsappLink(`Hi, I just submitted a ${type} request on the website. My name is ${values.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center rounded-md bg-[#15803d] px-5 min-h-[44px] font-bold text-white"
        >
          Message us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="lead-company">Company</label>
        <input id="lead-company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set("company")} />
      </div>

      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field id="lead-name" label="Full name" error={errors.name}>
          <input id="lead-name" className={inputCls} autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "lead-name-error" : undefined} />
        </Field>
        <Field id="lead-phone" label="Mobile number" error={errors.phone}>
          <input id="lead-phone" type="tel" inputMode="tel" placeholder="98XXXXXXXX" className={inputCls} autoComplete="tel" value={values.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "lead-phone-error" : undefined} />
        </Field>
        <Field id="lead-email" label="Email" optional error={errors.email}>
          <input id="lead-email" type="email" className={inputCls} autoComplete="email" value={values.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "lead-email-error" : undefined} />
        </Field>
        <Field id="lead-interest" label="I want to learn" error={errors.interest}>
          <select id="lead-interest" className={inputCls} value={values.interest} onChange={set("interest")} aria-invalid={!!errors.interest} aria-describedby={errors.interest ? "lead-interest-error" : undefined}>
            <option value="">Select…</option>
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </Field>
        {compact ? null : (
          <>
            <Field id="lead-level" label="Current level" optional>
              <select id="lead-level" className={inputCls} value={values.level} onChange={set("level")}>
                <option value="">Select…</option>
                {levelsKnown.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </Field>
            <Field id="lead-preferredTime" label="Preferred class time" optional>
              <select id="lead-preferredTime" className={inputCls} value={values.preferredTime} onChange={set("preferredTime")}>
                <option value="">Select…</option>
                {preferredTimes.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </Field>
          </>
        )}
      </div>

      {compact ? null : (
        <Field id="lead-message" label="Message" optional error={errors.message}>
          <textarea id="lead-message" rows={4} className={`${inputCls} py-3`} value={values.message} onChange={set("message")} aria-invalid={!!errors.message} />
        </Field>
      )}

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-600">
          Something went wrong. Please check the form or message us on WhatsApp.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-sun-400 hover:bg-sun-500 text-white font-bold min-h-[52px] px-6 disabled:opacity-60 shadow-[0_2px_0_rgba(15,19,41,0.18)]"
      >
        {status === "sending" ? <Loader2 className="animate-spin" size={18} /> : null}
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
      <p className="text-xs text-charcoal-500">
        We&apos;ll only use your details to respond to this enquiry. See our{" "}
        <Link href="/privacy-policy" className="underline">privacy policy</Link>.
      </p>
    </form>
  );
}
