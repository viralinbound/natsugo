export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href: string;
  items: NavLink[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Learn",
    href: "/learn-japanese-language-course",
    items: [
      { label: "Japanese Courses", href: "/learn-japanese-language-course" },
      { label: "Japanese for Beginners", href: "/japanese-for-beginners" },
      { label: "Japanese Speaking", href: "/speak-japanese" },
      { label: "Japanese Grammar", href: "/japanese-grammar-course" },
      { label: "Japanese Vocabulary", href: "/japanese-vocabulary-course" },
      { label: "Reading & Writing", href: "/japanese-reading-writing-course" },
      { label: "Business Japanese", href: "/business-japanese" },
      { label: "Work in Japan", href: "/work-in-japan" },
      { label: "Study in Japan", href: "/study-in-japan" },
    ],
  },
  {
    label: "JLPT",
    href: "/jlpt-japanese-preparation-course",
    items: [
      { label: "JLPT N5", href: "/jlpt-n5" },
      { label: "JLPT N4", href: "/jlpt-n4" },
      { label: "JLPT N3", href: "/jlpt-n3" },
      { label: "JLPT N2", href: "/jlpt-n2" },
      { label: "JLPT N1", href: "/jlpt-n1" },
      { label: "JLPT Preparation", href: "/jlpt-japanese-preparation-course" },
      { label: "JLPT Quiz (N5–N1)", href: "/jlpt-quiz" },
      { label: "Exam Dates & Fees", href: "/jlpt-exam-info" },
    ],
  },
  {
    label: "Classroom",
    href: "/online-classroom",
    items: [
      { label: "Online Classroom", href: "/online-classroom" },
      { label: "N5 lessons & live classes", href: "/online-classroom/n5" },
      { label: "N4 lessons & live classes", href: "/online-classroom/n4" },
      { label: "N3 lessons & live classes", href: "/online-classroom/n3" },
      { label: "N2 lessons & live classes", href: "/online-classroom/n2" },
      { label: "N1 lessons & live classes", href: "/online-classroom/n1" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    items: [
      { label: "Hiragana", href: "/resources/hiragana" },
      { label: "Katakana", href: "/resources/katakana" },
      { label: "Kanji", href: "/resources/kanji" },
      { label: "Japanese Grammar", href: "/resources/grammar" },
      { label: "Japanese Vocabulary", href: "/resources/vocabulary" },
      { label: "Japanese Phrases", href: "/resources/phrases" },
      { label: "Free JLPT Quizzes", href: "/jlpt-quiz" },
      { label: "Flashcards", href: "/resources/flashcards" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "About",
    href: "/about-us",
    items: [
      { label: "About Us", href: "/about-us" },
      { label: "Teachers", href: "/teachers" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const simpleLinks: NavLink[] = [
  { label: "Batches", href: "/batches" },
];

