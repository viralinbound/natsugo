import { NextRequest, NextResponse } from "next/server";

// Looks up a single kanji's reading + English meaning from Jisho's public search API
// (proxied server-side to avoid browser CORS restrictions). Cached for a day since
// dictionary data for a given character doesn't change.
export const revalidate = 86400;

export async function GET(req: NextRequest) {
  const char = req.nextUrl.searchParams.get("c")?.trim();
  if (!char || [...char].length !== 1) {
    return NextResponse.json({ error: "Provide a single character in ?c=" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(char)}`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; NatsugoBot/1.0)" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Jisho responded ${res.status}`);
    const data = await res.json();

    const entry = (data?.data as Array<Record<string, unknown>> | undefined)?.find((d) => {
      const jp = (d.japanese as Array<{ word?: string }> | undefined)?.[0];
      return jp?.word === char;
    }) ?? (data?.data as Array<Record<string, unknown>> | undefined)?.[0];

    if (!entry) return NextResponse.json({ reading: null, meaning: null });

    const reading = (entry.japanese as Array<{ reading?: string }> | undefined)?.[0]?.reading ?? null;
    const senses = entry.senses as Array<{ english_definitions?: string[] }> | undefined;
    const meaning = senses?.[0]?.english_definitions?.slice(0, 3).join(", ") ?? null;

    return NextResponse.json({ reading, meaning });
  } catch {
    return NextResponse.json({ reading: null, meaning: null, error: "lookup_failed" }, { status: 200 });
  }
}
