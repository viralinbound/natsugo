import "server-only";

// Small abuse guards for the public API routes: who is calling, did the request come from our own pages,
// and a per-caller rate limit. The limiter keeps its counts in memory, so on serverless hosting each running
// instance counts separately. That still stops a script hammering one instance, and the database validates
// every write again, but a determined attacker spreading load across instances needs a shared store to stop.

const hits = new Map<string, number[]>();
let lastSweep = 0;

export function clientIp(req: Request): string {
  const h = req.headers;
  const raw = h.get("x-vercel-forwarded-for") ?? h.get("x-real-ip") ?? h.get("x-forwarded-for") ?? "unknown";
  return raw.split(",")[0].trim().slice(0, 64) || "unknown";
}

// Browsers always send Origin on a POST. If it is present it must be this site (or localhost while developing).
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const o = new URL(origin);
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
    return o.host === host || o.hostname === "localhost" || o.hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

// True when `key` has already used up `max` calls in the last `windowMs`.
export function overLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  if (now - lastSweep > 60_000) {
    lastSweep = now;
    for (const [k, list] of hits) {
      const fresh = list.filter((t) => now - t < 24 * 3600 * 1000);
      if (fresh.length) hits.set(k, fresh);
      else hits.delete(k);
    }
  }
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

export const tooMany = (retryAfterSeconds = 600) =>
  Response.json({ ok: false, error: "Too many requests. Please try again a little later." }, { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } });

export const forbidden = () => Response.json({ ok: false, error: "Request not allowed." }, { status: 403 });

// The same email address gets at most one confirmation message an hour, so the form cannot be used to flood someone.
export function alreadyConfirmed(email: string): boolean {
  return overLimit(`confirm:${email.toLowerCase()}`, 1, 3600_000);
}
