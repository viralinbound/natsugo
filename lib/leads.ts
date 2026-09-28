export type LeadType = "demo" | "contact" | "enrol" | "level-test" | "waitlist";

export interface LeadInput {
  type: LeadType;
  name: string;
  phone: string;
  email: string;
  interest: string;
  level: string;
  preferredTime: string;
  message: string;
  batchId?: string;
  company?: string; // honeypot
}

export const interests = [
  "JLPT N5",
  "JLPT N4",
  "JLPT N3",
  "JLPT N2",
  "JLPT N1",
  "Japanese for Beginners",
  "Speaking Japanese",
  "Business Japanese",
  "Work / Study in Japan",
  "Corporate Training",
  "Not sure yet",
];

export const levelsKnown = ["Complete beginner", "Know hiragana/katakana", "Around N5", "Around N4", "N3 or above"];
export const preferredTimes = ["Weekday morning", "Weekday evening", "Weekend morning", "Weekend afternoon", "Flexible"];

export function validateLead(input: Partial<LeadInput>) {
  const errors: Partial<Record<keyof LeadInput, string>> = {};
  const name = (input.name ?? "").trim();
  const phone = (input.phone ?? "").replace(/[\s-]/g, "");
  const email = (input.email ?? "").trim();

  if (name.length < 2) errors.name = "Please enter your full name.";
  if (!/^(\+91)?[6-9]\d{9}$/.test(phone)) errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (!input.interest) errors.interest = "Please choose what you want to learn.";
  if ((input.message ?? "").length > 1000) errors.message = "Message is too long (max 1000 characters).";

  return errors;
}
