// Turns a batch's plain-English schedule ("Mon • Wed • Fri, 7:00 – 8:30 PM") into real
// weekly class slots, so live classes don't have to be typed in one by one.
const dayMap: Record<string, number> = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };

export interface ParsedSchedule {
  weekdays: number[]; // 0 = Sunday
  startMin: number; // minutes after midnight, IST wall clock
  durationMin: number;
}

function toMinutes(h: number, m: number, period?: string) {
  let hour = h % 12;
  if (period?.toUpperCase() === "PM") hour += 12;
  return hour * 60 + m;
}

export function parseSchedule(schedule: string): ParsedSchedule | null {
  const [dayPart, timePart] = schedule.split(",").map((s) => s.trim());
  if (!dayPart || !timePart) return null;

  const weekdays = dayPart
    .split(/[•,]/)
    .map((d) => dayMap[d.trim().slice(0, 3).toLowerCase()])
    .filter((d) => d !== undefined);
  if (!weekdays.length) return null;

  const tokens = [...timePart.matchAll(/(\d{1,2}):(\d{2})\s*(AM|PM)?/gi)];
  if (tokens.length < 2) return null;
  const [, h1, m1, p1] = tokens[0];
  const [, h2, m2, p2] = tokens[1];
  const endMin = toMinutes(Number(h2), Number(m2), p2);

  let startMin: number;
  if (p1) {
    startMin = toMinutes(Number(h1), Number(m1), p1);
  } else {
    // Missing AM/PM on the start time: pick whichever period gives a sane class length.
    const asAM = toMinutes(Number(h1), Number(m1), "AM");
    const asPM = toMinutes(Number(h1), Number(m1), "PM");
    const lenPM = (endMin - asPM + 1440) % 1440;
    startMin = lenPM > 0 && lenPM <= 240 ? asPM : asAM;
  }
  const durationMin = ((endMin - startMin + 1440) % 1440) || 60;
  return { weekdays, startMin, durationMin: Math.min(durationMin, 240) };
}

const pad = (n: number) => String(n).padStart(2, "0");

// Next N occurrences of the schedule on/after `fromISODate` (an IST calendar date, "YYYY-MM-DD").
// Calendar arithmetic runs on a neutral UTC-epoch calendar (no real timezone involved) purely to
// walk day by day; each resulting date is then anchored to IST when building the final instant.
export function nextOccurrences(schedule: ParsedSchedule, fromISODate: string, count: number): Date[] {
  const out: Date[] = [];
  const [y0, m0, d0] = fromISODate.split("-").map(Number);
  const cursor = new Date(Date.UTC(y0, m0 - 1, d0));
  for (let guard = 0; out.length < count && guard < count * 14 + 60; guard++) {
    if (schedule.weekdays.includes(cursor.getUTCDay())) {
      const hh = Math.floor(schedule.startMin / 60);
      const mm = schedule.startMin % 60;
      const iso = `${cursor.getUTCFullYear()}-${pad(cursor.getUTCMonth() + 1)}-${pad(cursor.getUTCDate())}T${pad(hh)}:${pad(mm)}:00+05:30`;
      out.push(new Date(iso));
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return out;
}
