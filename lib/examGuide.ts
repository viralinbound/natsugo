// Content for the JLPT registration and exam-day guide. Facts about sections, times, pass marks, results and
// the device rules come from the official JLPT website (www.jlpt.jp/e, read on 3 Oct 2026). Anything that depends
// on the host centre (fees, forms, photo size, reporting time) is marked as "confirm with your centre".

export const levelRows = [
  { level: "N5", sections: "Vocabulary 20 min, Grammar and Reading 40 min, Listening 30 min", total: "90 min", pass: 80, sectional: "38 of 120 (language and reading), 19 of 60 (listening)", who: "Basic Japanese: hiragana, katakana, simple kanji and everyday phrases." },
  { level: "N4", sections: "Vocabulary 25 min, Grammar and Reading 55 min, Listening 35 min", total: "115 min", pass: 90, sectional: "38 of 120 (language and reading), 19 of 60 (listening)", who: "Everyday conversations and simple texts you can follow slowly." },
  { level: "N3", sections: "Vocabulary 30 min, Grammar and Reading 70 min, Listening 40 min", total: "140 min", pass: 95, sectional: "19 of 60 in each of the three sections", who: "The bridge to real-world Japanese: news headlines, daily life, workplace basics." },
  { level: "N2", sections: "Vocabulary, Grammar and Reading 105 min, Listening 50 min", total: "155 min", pass: 90, sectional: "19 of 60 in each of the three sections", who: "Newspapers, work emails and conversations at natural speed." },
  { level: "N1", sections: "Vocabulary, Grammar and Reading 110 min, Listening 55 min", total: "165 min", pass: 100, sectional: "19 of 60 in each of the three sections", who: "Formal, abstract and specialist Japanese, as used at university and in senior roles." },
];

export interface GuideStep {
  title: string;
  when: string;
  body: string;
  doList: string[];
  watch?: string;
}

export const registrationSteps: GuideStep[] = [
  {
    title: "Check that you can sit the test",
    when: "Months before",
    body: "The JLPT is for people whose first language is not Japanese. There is no age limit, and you do not need any prior certificate. Holders of Japanese citizenship can also sit it. Some host centres add their own conditions, so read theirs before you pay anything.",
    doList: ["Read the eligibility notes on your host centre's page", "Make sure your name is spelled the same on your passport or ID and on your application"],
    watch: "You must take every section. You cannot register for only the sections you want.",
  },
  {
    title: "Pick your level honestly",
    when: "Months before",
    body: "Each level is a separate paper, and you choose one level per session. Questions differ by level, so a higher level is not simply a harder version of the same test. Take our level test and a full practice quiz at the level you are considering. If you pass three out of five on each level's questions, that level is a safe choice.",
    doList: ["Take the free level test", "Do the full test for your target level", "Read the pass marks in the table above"],
  },
  {
    title: "Choose your session and your centre",
    when: "About 5 to 6 months before",
    body: "The JLPT is held twice a year, on the first Sunday of July and of December. Outside Japan, a city may hold only one of the two, so check the Jul and Dec marks next to each centre above. Pick the nearest centre that runs the session you want.",
    doList: ["Compare the centres above", "Open your host centre's website from the link beside its name", "Note its registration dates and method"],
    watch: "Registration method and dates are set by each host centre, so Delhi, Pune and Chennai can all differ.",
  },
  {
    title: "Get your documents ready",
    when: "Before registration opens",
    body: "Most centres ask for a recent passport-size photo, your full name and date of birth as on your ID, your nationality, your contact details and your mother tongue. Keep a clear scan of your photo and your ID ready so the form takes ten minutes, not an evening.",
    doList: ["A recent passport-size photo (confirm size and background with your centre)", "A scan or photo of your ID", "An email address you check every day", "A phone number that is reachable"],
    watch: "Photo size and format differ between centres. A wrong photo is the most common reason for a form being sent back.",
  },
  {
    title: "Fill in the registration form",
    when: "When your centre opens registration",
    body: "Registration usually opens about four months before the exam, but the exact days come from your centre. Go to the centre's registration page, create your account or fill in the form, and choose the level and the session. Read the declaration carefully before you tick it.",
    doList: ["Use your name exactly as on your ID", "Choose the right level and session before you submit", "Save or screenshot the confirmation page"],
    watch: "Do not wait for the last day. Centres set a closing date, and late applications are usually not accepted.",
  },
  {
    title: "Pay the exam fee",
    when: "During registration",
    body: "The fee is set by each host centre and changes from session to session, which is why we do not print a single amount. Payment may be online, by bank transfer or at the centre. Pay only through the method your centre lists on its own site.",
    doList: ["Check the current fee on your centre's page", "Pay by the listed method only", "Keep the receipt and the transaction number"],
    watch: "Ask your centre about its refund and transfer rules before you pay. Many centres do not refund fees.",
  },
  {
    title: "Ask for special arrangements if you need them",
    when: "At registration",
    body: "If you need support because of a disability or a health condition, tell your host centre when you register, not on exam day. The official JLPT website has a page on Special Testing Accommodations that explains how requests work.",
    doList: ["Tell your centre what you need", "Ask what proof they want", "Get their reply in writing"],
  },
  {
    title: "Check that your registration went through",
    when: "A few days after paying",
    body: "Look for a confirmation email or a status page from your centre. If you hear nothing in a week, write to them and attach your payment receipt. Check your spam folder too.",
    doList: ["Look in your inbox and spam folder", "Email the centre with your receipt if nothing arrives", "Note your registration or application number"],
  },
  {
    title: "Collect your test voucher",
    when: "A few weeks before the exam",
    body: "Your host centre issues your test voucher (also called an admission card). It carries your examinee number, level, test site and the reporting time. Print it, stick your photo on if the voucher asks for one, and read the venue address and time at once, not the night before.",
    doList: ["Print the voucher on paper, in colour if you can", "Stick your photo where it asks", "Check your name, level and room", "Look up the route to the venue and how long it takes"],
    watch: "If any detail on the voucher is wrong, tell your centre straight away. Fixing it on exam day is not possible.",
  },
];

export const examDayPlan = [
  { when: "The week before", items: ["Stop learning new material. Re-read your notes and redo mistakes from practice tests.", "Do one full timed paper at your level, with the listening audio.", "Check the voucher, the venue address and how you will travel."] },
  { when: "The night before", items: ["Pack your bag (checklist below) and put your voucher and ID on top.", "Switch off and pack your phone and any smartwatch tomorrow, before you leave.", "Sleep early. Do not study late."] },
  { when: "Morning of the exam", items: ["Eat a proper breakfast and drink water.", "Leave early, with a buffer for traffic. Arrive before the reporting time on your voucher.", "Turn your phone completely OFF, not on silent, and keep it in your bag."] },
  { when: "At the venue", items: ["Find your room using your examinee number.", "Show your voucher and ID when asked. Your identity is checked.", "Listen to the proctor's instructions. Fill in your name and number on the answer sheet exactly as told."] },
  { when: "During the test", items: ["Answers go on a computer-marked sheet. Fill each bubble fully and darkly, and erase changes cleanly.", "Most questions have four choices. A few listening questions have three.", "Work through each section in the time given. If a question stumps you, mark it and move on.", "Do not turn your phone on, even in the break."] },
  { when: "After the test", items: ["Do not take question booklets or answer sheets out of the room.", "Do not share questions, answers or audio with anyone, online or in person, even after the exam.", "Then relax. Results come by post through your centre."] },
];

export const bring = [
  { item: "Your test voucher (admission card), printed, with your photo stuck on", note: "Without it you are very unlikely to be admitted." },
  { item: "Original photo ID, the same one you used to register", note: "Your name must match. Ask your centre which IDs it accepts." },
  { item: "Two or three sharpened HB or No. 2 pencils", note: "The answer sheet is read by computer, so a soft dark pencil matters. Ask whether mechanical pencils are allowed." },
  { item: "A good soft eraser and a sharpener", note: "Smudged answer sheets can be misread." },
  { item: "An analogue wrist watch (not a smartwatch)", note: "Keep time on your own. Some rooms have a clock, but not always where you can see it." },
  { item: "Water in a clear bottle, if your centre allows it", note: "Confirm with your centre." },
  { item: "A light snack for the break, if allowed", note: "Long levels run for hours." },
  { item: "A sweater or shawl", note: "Exam halls are often cold from the air conditioning." },
  { item: "A copy of the venue address and your registration number", note: "Handy if your phone is off and in your bag." },
  { item: "Cash or a card for travel", note: "" },
];

export const dontBring = [
  { item: "A mobile phone that is switched on", note: "Official rule: phones must be OFF until the end of the test, including breaks. Some centres collect them. Turning one on in a break counts as misconduct." },
  { item: "A smartwatch or any device with a camera or communication function", note: "Even a vibrating alarm during the test can invalidate your result." },
  { item: "Earphones or earbuds", note: "Listed in the official cheating rules." },
  { item: "Dictionaries, textbooks, reference books or notes", note: "No crib sheets of any kind, and do not write answers on your desk, hand or pencil case." },
  { item: "Someone else's ID, or an altered ID", note: "Taking the test for someone else, or using a fraudulent ID, invalidates your result." },
  { item: "Big bags and valuables", note: "Space in the room is limited. Leave anything you cannot afford to lose at home." },
  { item: "A calculator", note: "Not needed for any section." },
];

export const afterExam = [
  { title: "When results arrive", body: "Outside Japan, score reports are sent through your host centre: July test results around early October, December test results around early March. You cannot get results by phone or email. If your report has not arrived by the end of that month, contact the centre where you sat the test." },
  { title: "How pass or fail is decided", body: "You pass when your total score reaches the overall pass mark and every scoring section reaches its sectional pass mark. One section below the mark means a fail, however high the total. The marks are in the table above." },
  { title: "If you miss a section", body: "Missing a required section fails the test, and the score report will show no section scores at all." },
  { title: "Retaking", body: "A result is decided only when you take all sections in one sitting. You cannot retake only the section you missed. Sit the whole test again in a later session." },
  { title: "Does the certificate expire?", body: "No. The JLPT certificate does not expire, though some companies and universities prefer a recent result. Ask the one you are applying to." },
  { title: "Lost your certificate?", body: "A duplicate can be issued for a fee. The official JLPT site explains how to apply." },
];

export const guideFaqs = [
  { q: "Can I take only some sections?", a: "No. You must take all sections of your level in the same sitting. If you miss one, you fail." },
  { q: "Can I choose a different level on exam day?", a: "No. Your level is fixed when you register, and your voucher shows it." },
  { q: "Is there an age limit or a qualification needed?", a: "No age limit and no prior qualification. The test is for people whose first language is not Japanese, and some host centres add conditions of their own." },
  { q: "Can I keep my phone in my bag if it is off?", a: "Switched fully off and in your bag is the rule. Some centres collect phones at the door. Turning it on, even in a break, can cancel your result." },
  { q: "What if I am late?", a: "Rules differ by centre and you may not be admitted. Arrive before the reporting time on your voucher and plan for traffic." },
  { q: "What happens if I am sick on exam day?", a: "Tell your host centre as early as you can. Whether your fee can be moved to another session depends on that centre." },
  { q: "Are answers marked by a person?", a: "No. Answer sheets are multiple choice and scored by computer, so mark them clearly and completely." },
  { q: "Where can I see official sample questions?", a: "The JLPT website has sample questions, and the official guidebooks have full format guides for each level." },
];
