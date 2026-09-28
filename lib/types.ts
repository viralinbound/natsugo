export type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export interface Teacher {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  levels: JLPTLevel[];
  specialization: string;
  photo?: string;
  bio?: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  level: JLPTLevel | "Beginner";
  summary: string;
  outcomes: string[];
  durationHours: number;
  format: "Live Online" | "Offline" | "Hybrid";
}

export interface Batch {
  id: string;
  courseSlug: string;
  startISO: string;
  courseTitle: string;
  level: JLPTLevel | "All Levels";
  mode: "Online" | "Offline";
  days: "Weekday" | "Weekend";
  time: "Morning" | "Afternoon" | "Evening";
  goal: "JLPT" | "Speaking" | "General Japanese";
  startDate: string;
  schedule: string;
  durationHours: number;
  seatsLeft: number;
  seatsTotal?: number;
  priceLabel: string;
  teacherId?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  level: JLPTLevel | "Beginner";
  quote: string;
  verified: boolean;
  isPlaceholder: boolean;
  photo?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  href: string;
}

export interface GoalCardData {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}
