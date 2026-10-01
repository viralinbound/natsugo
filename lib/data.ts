import type {
  Batch,
  BlogPost,
  Course,
  FAQItem,
  GoalCardData,
  ResourceItem,
  Teacher,
  Testimonial,
} from "@/lib/types";

export const goalCards: GoalCardData[] = [
  {
    id: "jlpt",
    title: "JLPT",
    description: "Prepare for your target JLPT level with structured practice.",
    href: "/jlpt-japanese-preparation-course",
    icon: "target",
  },
  {
    id: "speaking",
    title: "Speaking",
    description: "Build confidence in real conversations with guided practice.",
    href: "/speak-japanese",
    icon: "mic",
  },
  {
    id: "career",
    title: "Career",
    description: "Develop Japanese skills for professional situations.",
    href: "/blog/japanese-language-career-opportunities",
    icon: "briefcase",
  },
  {
    id: "work-in-japan",
    title: "Work in Japan",
    description: "Understand language pathways and requirements.",
    href: "/work-in-japan",
    icon: "map-pin",
  },
  {
    id: "study-in-japan",
    title: "Study in Japan",
    description: "Prepare for Japanese-language academic goals.",
    href: "/study-in-japan",
    icon: "graduation-cap",
  },
  {
    id: "business",
    title: "Business",
    description: "Japanese for workplace communication.",
    href: "/business-japanese",
    icon: "building",
  },
  {
    id: "travel",
    title: "Travel",
    description: "Learn useful everyday Japanese for your trip.",
    href: "/resources/phrases",
    icon: "plane",
  },
];

export const jlptLevels = [
  {
    level: "N5" as const,
    focus: "Basic greetings, hiragana, katakana, everyday phrases",
    areas: ["Vocabulary (~800)", "Basic grammar", "Simple reading", "Slow listening"],
  },
  {
    level: "N4" as const,
    focus: "Everyday conversation and simple written Japanese",
    areas: ["Vocabulary (~1500)", "Core grammar patterns", "Short passages", "Everyday listening"],
  },
  {
    level: "N3" as const,
    focus: "Bridging basic and intermediate Japanese",
    areas: ["Vocabulary (~3750)", "Intermediate grammar", "Newspaper headlines", "Natural-paced listening"],
  },
  {
    level: "N2" as const,
    focus: "Japanese used in daily life and some professional settings",
    areas: ["Vocabulary (~6000)", "Advanced grammar", "Varied reading material", "Extended listening"],
  },
  {
    level: "N1" as const,
    focus: "Broad and nuanced comprehension in most situations",
    areas: ["Vocabulary (~10000+)", "Complex grammar", "Abstract reading", "Natural, fast listening"],
  },
];

export const courses: Course[] = [
  {
    id: "c-n5",
    slug: "jlpt-n5",
    title: "JLPT N5 Foundation Course",
    level: "N5",
    summary: "Start from zero: hiragana, katakana, and your first everyday conversations.",
    outcomes: [
      "Read and write hiragana and katakana",
      "Use basic greetings and self-introductions",
      "Understand simple sentence structures",
    ],
    durationHours: 60,
    format: "Live Online",
  },
  {
    id: "c-n4",
    slug: "jlpt-n4",
    title: "JLPT N4 Course",
    level: "N4",
    summary: "Build on N5 fundamentals toward everyday conversational fluency.",
    outcomes: [
      "Hold everyday conversations with confidence",
      "Read short passages and notices",
      "Expand core grammar patterns",
    ],
    durationHours: 70,
    format: "Live Online",
  },
  {
    id: "c-n3",
    slug: "jlpt-n3",
    title: "JLPT N3 Course",
    level: "N3",
    summary: "Bridge basic and intermediate Japanese for work and study contexts.",
    outcomes: [
      "Understand newspaper headlines and notices",
      "Communicate on familiar topics in more detail",
      "Prepare for intermediate JLPT sections",
    ],
    durationHours: 80,
    format: "Live Online",
  },
  {
    id: "c-speaking",
    slug: "speak-japanese",
    title: "Japanese Speaking Lab",
    level: "Beginner",
    summary: "Focused conversation and pronunciation practice with live teachers.",
    outcomes: [
      "Practice roleplay and daily situations",
      "Improve pronunciation and listening",
      "Prepare for workplace conversations",
    ],
    durationHours: 40,
    format: "Live Online",
  },
];

export const teachers: Teacher[] = [
  {
    id: "t1",
    name: "Teacher profile pending",
    role: "Japanese Language Instructor",
    experienceYears: 0,
    levels: ["N5", "N4"],
    specialization: "Beginner Japanese & Conversation",
  },
  {
    id: "t2",
    name: "Teacher profile pending",
    role: "Japanese Language Instructor",
    experienceYears: 0,
    levels: ["N3", "N2"],
    specialization: "JLPT Preparation",
  },
  {
    id: "t3",
    name: "Teacher profile pending",
    role: "Japanese Language Instructor",
    experienceYears: 0,
    levels: ["N2", "N1"],
    specialization: "Business Japanese",
  },
];

type BatchSeed = Omit<Batch, "startDate" | "priceLabel" | "seatsLeft"> & { seatsLeft?: number };

export const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

const seed: BatchSeed[] = [
  { id: "b1", courseSlug: "jlpt-n5", startISO: "2026-10-12", courseTitle: "JLPT N5 Foundation", level: "N5", mode: "Online", days: "Weekday", time: "Evening", goal: "JLPT", schedule: "Mon • Wed • Fri, 7:00 – 8:30 PM", durationHours: 60, teacherId: "t1" },
  { id: "b2", courseSlug: "jlpt-n5", startISO: "2026-10-17", courseTitle: "JLPT N5 Weekend", level: "N5", mode: "Online", days: "Weekend", time: "Morning", goal: "JLPT", schedule: "Sat • Sun, 10:00 AM – 12:00 PM", durationHours: 60, teacherId: "t1" },
  { id: "b3", courseSlug: "jlpt-n4", startISO: "2026-10-18", courseTitle: "JLPT N4 Course", level: "N4", mode: "Online", days: "Weekend", time: "Morning", goal: "JLPT", schedule: "Sat • Sun, 10:00 AM – 12:00 PM", durationHours: 70, teacherId: "t2" },
  { id: "b4", courseSlug: "speak-japanese", startISO: "2026-10-20", courseTitle: "Japanese Speaking Lab", level: "All Levels", mode: "Online", days: "Weekday", time: "Evening", goal: "Speaking", schedule: "Tue • Thu, 8:00 – 9:00 PM", durationHours: 40, teacherId: "t3" },
  { id: "b5", courseSlug: "jlpt-n3", startISO: "2026-10-25", courseTitle: "JLPT N3 Course", level: "N3", mode: "Online", days: "Weekend", time: "Afternoon", goal: "JLPT", schedule: "Sat • Sun, 2:00 – 4:00 PM", durationHours: 90, teacherId: "t2" },
  { id: "b6", courseSlug: "japanese-for-beginners", startISO: "2026-11-02", courseTitle: "Japanese for Beginners", level: "N5", mode: "Online", days: "Weekday", time: "Morning", goal: "General Japanese", schedule: "Mon • Wed • Fri, 7:00 – 8:00 AM", durationHours: 60, teacherId: "t1" },
  { id: "b7", courseSlug: "jlpt-n4", startISO: "2026-11-04", courseTitle: "JLPT N4 Evening", level: "N4", mode: "Online", days: "Weekday", time: "Evening", goal: "JLPT", schedule: "Mon • Wed • Fri, 8:00 – 9:30 PM", durationHours: 70, teacherId: "t2" },
  { id: "b8", courseSlug: "business-japanese", startISO: "2026-11-08", courseTitle: "Business Japanese", level: "N3", mode: "Online", days: "Weekend", time: "Evening", goal: "Speaking", schedule: "Sat • Sun, 6:00 – 7:30 PM", durationHours: 50, teacherId: "t3" },
  { id: "b9", courseSlug: "jlpt-n2", startISO: "2026-11-14", courseTitle: "JLPT N2 Course", level: "N2", mode: "Online", days: "Weekend", time: "Afternoon", goal: "JLPT", schedule: "Sat • Sun, 3:00 – 5:00 PM", durationHours: 120, teacherId: "t3" },
  { id: "b10", courseSlug: "jlpt-n1", startISO: "2026-12-05", courseTitle: "JLPT N1 Course", level: "N1", mode: "Online", days: "Weekend", time: "Morning", goal: "JLPT", schedule: "Sat • Sun, 9:00 – 11:00 AM", durationHours: 150, teacherId: "t3" },
];

// Seat counts are placeholders until connected to the enrolment system.
export const batches: Batch[] = seed.map((b, i) => ({
  ...b,
  seatsLeft: b.seatsLeft ?? [12, 8, 10, 15, 6, 12, 9, 10, 8, 10][i],
  startDate: fmtDate(b.startISO),
  priceLabel: "Fee on request",
}));

export const testimonials: Testimonial[] = [
  {
    id: "test1",
    name: "Student name pending",
    course: "N5 Foundation Course",
    level: "N5",
    quote: "Student testimonial will appear here.",
    verified: false,
    isPlaceholder: true,
  },
  {
    id: "test2",
    name: "Student name pending",
    course: "N4 Course",
    level: "N4",
    quote: "Student testimonial will appear here.",
    verified: false,
    isPlaceholder: true,
  },
  {
    id: "test3",
    name: "Student name pending",
    course: "Speaking Lab",
    level: "Beginner",
    quote: "Student testimonial will appear here.",
    verified: false,
    isPlaceholder: true,
  },
];

export const blogPosts: BlogPost[] = [
  { id: "p1", slug: "how-to-learn-japanese-from-scratch", category: "Getting Started", title: "How to Learn Japanese from Scratch", excerpt: "A practical starting point for absolute beginners. Scripts, sounds, and first steps." },
  { id: "p2", slug: "how-long-does-it-take-to-learn-japanese", category: "Getting Started", title: "How Long Does It Take to Learn Japanese?", excerpt: "A realistic look at timelines across JLPT levels and study intensity." },
  { id: "p3", slug: "is-japanese-difficult-to-learn", category: "Getting Started", title: "Is Japanese Difficult to Learn?", excerpt: "What actually makes Japanese challenging, and what makes it easier than expected." },
  { id: "p4", slug: "what-is-jlpt", category: "JLPT", title: "What Is JLPT?", excerpt: "An overview of the Japanese-Language Proficiency Test and its five levels." },
  { id: "p5", slug: "jlpt-n5-preparation-guide", category: "JLPT", title: "JLPT N5 Preparation Guide", excerpt: "What to study, in what order, to prepare for the N5 exam." },
  { id: "p6", slug: "japanese-grammar-for-beginners", category: "Grammar", title: "Japanese Grammar for Beginners", excerpt: "Core sentence structures every beginner should know first." },
  { id: "p7", slug: "japanese-particles-explained", category: "Grammar", title: "Japanese Particles Explained", excerpt: "A clear explanation of は, が, を, に and more." },
  { id: "p8", slug: "japanese-greetings", category: "Vocabulary", title: "Japanese Greetings", excerpt: "Everyday greetings and how to use them appropriately." },
  { id: "p9", slug: "japanese-vocabulary-for-beginners", category: "Vocabulary", title: "Japanese Vocabulary for Beginners", excerpt: "Essential starter vocabulary organized by daily-life topic." },
  { id: "p10", slug: "japanese-language-career-opportunities", category: "Career", title: "Japanese Language Career Opportunities", excerpt: "How Japanese proficiency is used across different career paths." },
];

export const resources: ResourceItem[] = [
  { id: "r1", title: "Hiragana", description: "Learn the hiragana syllabary from scratch.", href: "/resources/hiragana" },
  { id: "r2", title: "Katakana", description: "Master katakana for loanwords and names.", href: "/resources/katakana" },
  { id: "r3", title: "Kanji", description: "Build your kanji foundation step by step.", href: "/resources/kanji" },
  { id: "r4", title: "Grammar", description: "Core Japanese grammar explained simply.", href: "/resources/grammar" },
  { id: "r5", title: "Vocabulary", description: "Everyday vocabulary organized by topic.", href: "/resources/vocabulary" },
  { id: "r6", title: "Phrases", description: "Common Japanese phrases for daily use.", href: "/resources/phrases" },
  { id: "r7", title: "JLPT Quiz", description: "A full test and topic quizzes for every level.", href: "/jlpt-quiz" },
  { id: "r8", title: "Blog", description: "Articles on learning Japanese effectively.", href: "/blog" },
];

export const faqs: FAQItem[] = [
  { question: "Is the course suitable for beginners?", answer: "Yes. Our N5 Foundation course is designed for complete beginners with no prior Japanese knowledge." },
  { question: "Can I learn Japanese online?", answer: "Yes: every Natsugo course is taught as live online classes, so you can join from anywhere." },
  { question: "Which JLPT level should I start with?", answer: "Take our free level test, or start at N5 if you're completely new to Japanese." },
  { question: "Do you provide speaking practice?", answer: "Yes, speaking practice is part of our courses, and we also run a dedicated Speaking Lab." },
  { question: "What are the class timings?", answer: "We offer morning, afternoon, and evening batches on weekdays and weekends. See the Batches page for current schedules." },
  { question: "How long is each course?", answer: "Course duration varies by level, typically ranging from 40 to 80 hours. Check individual course pages for details." },
  { question: "Do you provide study material?", answer: "Study materials are provided as part of enrolled courses." },
  { question: "Are mock tests included?", answer: "Mock tests are part of our JLPT preparation tracks." },
  { question: "Can working professionals join?", answer: "Yes, we offer evening and weekend batches designed for working professionals." },
  { question: "Do you offer a free demo?", answer: "Yes, you can book a free demo class before enrolling." },
  { question: "How does the level test work?", answer: "The free level test assesses your vocabulary, grammar, reading, and listening to recommend a suitable starting level." },
];
