// Live JLPT exam info for India, worked out automatically:
//  - exam dates follow the JLPT's fixed rule (first Sunday of July and of December), so they are computed;
//  - the India test centres, which of them hold July / December, and their host organisers come from the
//    official JLPT website (www.jlpt.jp), read and cached for six hours.
// Anything the official site does not publish in one place (fees, exact registration windows) is not guessed:
// the page points to each host centre instead.

export interface ExamCentre {
  city: string;
  organiser: string;
  site?: string;
  july: boolean;
  december: boolean;
}

export interface LiveSession {
  name: string;
  examDate: string;
  registrationWindow: string;
  resultsDate: string;
  centres: string;
}

const OFFICIAL = "https://www.jlpt.jp/e/";
const CENTRE_LIST = "https://www.jlpt.jp/e/application/overseas_list.html";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function firstSunday(year: number, month: number) {
  const d = new Date(Date.UTC(year, month, 1));
  d.setUTCDate(1 + ((7 - d.getUTCDay()) % 7));
  return d;
}

const monthName = (m: number) => MONTHS[((m % 12) + 12) % 12];

// The next `count` July / December sessions, counting a session until its exam day is over.
export function upcomingSessions(centres: ExamCentre[], now = new Date(), count = 2): LiveSession[] {
  const out: LiveSession[] = [];
  for (let y = now.getUTCFullYear(); out.length < count && y < now.getUTCFullYear() + 3; y++) {
    for (const month of [6, 11]) {
      const date = firstSunday(y, month);
      if (date.getTime() + 24 * 3600 * 1000 <= now.getTime() || out.length >= count) continue;
      const holding = centres.filter((c) => (month === 6 ? c.july : c.december));
      out.push({
        name: `${monthName(month)} ${y}`,
        examDate: date.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
        registrationWindow: `Usually opens around ${monthName(month - 4)}${month - 4 < 0 ? ` ${y - 1}` : ""}. Exact dates come from your host centre.`,
        resultsDate: `usually about 2 months after the exam, around ${monthName(month + 2)}`,
        centres: centres.length ? `${holding.length} of ${centres.length} India centres hold this session` : "",
      });
    }
  }
  return out;
}

const text = (s: string) =>
  s
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#?\w+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Reads the INDIA block of the official overseas test-site table. Returns [] if the page changes shape.
export async function fetchIndiaCentres(): Promise<ExamCentre[]> {
  try {
    // The official site can be slow from some regions, so allow time and try twice.
    let html = "";
    for (let attempt = 0; attempt < 2 && !html; attempt++) {
      try {
        const res = await fetch(CENTRE_LIST, { next: { revalidate: 6 * 3600 }, headers: { "user-agent": "Mozilla/5.0 (compatible; NatsugoBot)" }, signal: AbortSignal.timeout(30000) });
        if (res.ok) html = await res.text();
      } catch {}
    }
    if (!html) return [];
    const start = html.search(/<td[^>]*rowspan="\d+"[^>]*>\s*INDIA\s*<\/td>/i);
    if (start < 0) return [];
    const span = Number(/rowspan="(\d+)"/i.exec(html.slice(start, start + 60))?.[1] ?? 0);
    const rows = html.slice(start).split(/<tr[^>]*>/i).slice(0, Math.max(span, 1));
    const centres: ExamCentre[] = [];
    rows.forEach((row, i) => {
      // The first chunk is the rest of the INDIA row itself; later chunks are the following rows.
      const tds = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => m[1]);
      const cells = i === 0 ? tds.slice(1) : tds;
      if (cells.length < 4) return;
      const city = text(cells[0]);
      const organiser = text(cells[1]);
      const site = /href="(https?:[^"]+)"/i.exec(cells[1])?.[1];
      if (!city || !organiser) return;
      centres.push({ city, organiser, site, july: cells[2].includes("○"), december: cells[3].includes("○") });
    });
    return centres;
  } catch {
    return [];
  }
}

export const officialExamLink = OFFICIAL;

// The official India list as last read on 3 Oct 2026. Used only when the official site does not answer, so the
// page never goes empty; the live read replaces it as soon as the site responds.
export const centresSnapshot: ExamCentre[] = [
  { city: "New Delhi", organiser: "Mombusho Scholars Association of India (MOSAI)", site: "http://www.mosai.org.in/", july: true, december: true },
  { city: "Pune", organiser: "Japanese Language Teachers' Association, PUNE (JALTAP)", site: "http://www.jaltap.org.in", july: true, december: true },
  { city: "Kolkata", organiser: "The Indo-Japan Welfare and Cultural Association", site: "http://www.ijwca.org/", july: true, december: true },
  { city: "Chennai", organiser: "ABK-AOTS DOSOKAI, Tamilnadu Centre, Chennai", site: "http://abkaotschennai.com/", july: true, december: true },
  { city: "Bengaluru", organiser: "Bangalore Nihongo Kyooshi-kai (BNK)", site: "http://bnkindia.in/category/exams/", july: true, december: true },
  { city: "Mumbai", organiser: "Japanese Language Teachers' Association, PUNE (JALTAP)", site: "http://www.jaltap.org.in", july: true, december: true },
  { city: "Santiniketan", organiser: "Visva-Bharati", site: "http://www.visvabharati.ac.in/", july: true, december: false },
  { city: "Karur", organiser: "Japanese Language Teachers Association", site: "http://jaltra.org/", july: true, december: true },
];
