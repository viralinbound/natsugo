import type { Skill } from "@/lib/learning";
import { hiragana, katakana } from "@/lib/learning";
import { kanaQuiz, shuffleOptions, type QuizQuestion } from "@/lib/quizBank";
import { courseBanks } from "@/lib/courseTests";

// Tests that are not part of the JLPT topic bank: speaking situations by level, and the beginner course parts.
type Row = [Skill, string, string[], number, string, string?];

const speaking: Record<string, Row[]> = {
  n5: [
    ["Speaking", "You meet someone for the first time. What do you say?", ["はじめまして", "おやすみなさい", "いただきます", "ごちそうさま"], 0, "はじめまして = nice to meet you, said at a first meeting."],
    ["Speaking", "You want to say your name is Riya.", ["リヤです", "リヤが ください", "リヤに います", "リヤを します"], 0, "〜です is the simplest way to give your name."],
    ["Speaking", "A friend gives you a gift. What do you say?", ["ありがとう", "すみません、いりません", "またね", "いってきます"], 0, "ありがとう = thank you."],
    ["Speaking", "You bump into someone on the train.", ["すみません", "いただきます", "ただいま", "おめでとう"], 0, "すみません = excuse me / sorry."],
    ["Speaking", "You are about to eat. What do you say?", ["いただきます", "ごちそうさまでした", "おかえりなさい", "さようなら"], 0, "いただきます is said before eating; ごちそうさま after."],
    ["Speaking", "You want to ask the price of something.", ["これは いくらですか", "これは なんですか", "これは だれですか", "これは どこですか"], 0, "いくら = how much."],
    ["Speaking", "Listen and choose the best reply.", ["げんきです", "さようなら", "いただきます", "はい、ください"], 0, "おげんきですか (How are you?) → げんきです (I'm fine).", "おげんきですか"],
    ["Speaking", "You didn't catch what someone said. Ask them to repeat.", ["もう いちど おねがいします", "また あした", "わかりました", "おさきに"], 0, "もう一度お願いします = once more, please."],
    ["Speaking", "Listen and choose the best reply.", ["インドから きました", "７じです", "コーヒーを ください", "はい、すきです"], 0, "どこから きましたか = where are you from?", "どこから きましたか"],
    ["Speaking", "You leave the house. What do you say to your family?", ["いってきます", "ただいま", "いらっしゃいませ", "おやすみ"], 0, "いってきます = I'm off (and I'll be back)."],
  ],
  n4: [
    ["Speaking", "You want to ask if you may sit here.", ["ここに すわっても いいですか", "ここに すわって ください", "ここに すわりません", "ここに すわりたいです か"], 0, "〜てもいいですか = may I …?"],
    ["Speaking", "Invite a friend to see a film together.", ["いっしょに えいがを 見ませんか", "えいがを 見ました", "えいがを 見ないで ください", "えいがは 見られません"], 0, "〜ませんか = won't you …? (an invitation)."],
    ["Speaking", "Listen and choose the best reply.", ["いいですね。行きましょう", "すみません、わかりません", "ごちそうさまでした", "はじめまして"], 0, "A suggestion to go together → いいですね = sounds good.", "週末、海へ 行きませんか"],
    ["Speaking", "You are late. Apologise politely.", ["おそく なって すみません", "はやく きました", "また きます", "おつかれさまです"], 0, "おそくなってすみません = sorry I'm late."],
    ["Speaking", "Ask a shop staff member for a bigger size.", ["もう すこし 大きいのは ありますか", "これは 大きすぎます か", "大きく なりました", "大きいのを かいました"], 0, "もう少し大きいのはありますか = do you have a slightly bigger one?"],
    ["Speaking", "Say you have a headache, so you'll go home.", ["あたまが いたいので、かえります", "あたまが いいので、かえります", "かえったら、あたまが いたいです", "あたまを あらいます"], 0, "〜ので = because."],
    ["Speaking", "Listen and choose the best reply.", ["はい、少し 話せます", "いいえ、食べません", "駅の 前です", "三時に 来ます"], 0, "日本語が話せますか = can you speak Japanese?", "日本語が 話せますか"],
    ["Speaking", "Ask the way to the station.", ["駅へは どう 行けば いいですか", "駅は いつですか", "駅に いました", "駅を 作ります"], 0, "どう行けばいいですか = how should I go?"],
    ["Speaking", "Say you have been to Japan once.", ["日本へ 一回 行った ことが あります", "日本へ 行きたく ないです", "日本へ 行って います", "日本へ 行く つもりでした"], 0, "〜たことがある = have done before."],
    ["Speaking", "A colleague finishes work. What do you say?", ["おつかれさまでした", "いただきます", "いってきます", "おじゃまします"], 0, "おつかれさまでした thanks someone for their work."],
  ],
  n3: [
    ["Speaking", "Politely ask your manager if you may leave early today.", ["今日は 早めに 帰らせて いただけませんか", "今日は 早く 帰りなさい", "今日は 早く 帰る べきです", "今日は 帰らなくても いいです"], 0, "〜させていただけませんか = could you let me …?"],
    ["Speaking", "Listen and choose the best reply.", ["それは 大変でしたね", "おめでとうございます", "いただきます", "よろしく お願いします"], 0, "Sympathising with bad news: 大変でしたね.", "昨日、財布を 落として しまったんです"],
    ["Speaking", "Turn down an invitation softly.", ["すみません、その日は ちょっと…", "行きません", "いやです", "だめです"], 0, "ちょっと… trailing off is the polite way to decline."],
    ["Speaking", "Say you'll check and get back to them.", ["確認して、また ご連絡します", "確認しないで ください", "連絡は いりません", "もう 確認しました から"], 0, "確認してまたご連絡します = I'll check and contact you again."],
    ["Speaking", "Ask a friend for advice on what to bring.", ["何を 持って いったら いいと 思う？", "何を 持って いったの？", "何も 持って いかないで", "持って いく ことに した"], 0, "〜たらいいと思う？ = what do you think I should …?"],
    ["Speaking", "Listen and choose the best reply.", ["はい、かしこまりました", "いいえ、知りません", "そうですか、残念", "またね"], 0, "A customer request in a shop → かしこまりました (certainly).", "これを 包んで もらえますか"],
    ["Speaking", "Say it looks like it will rain, so take an umbrella.", ["雨が 降りそうだから、かさを 持って いって", "雨が 降ったから、かさを 買った", "雨の ように かさを 持つ", "雨が 降れば かさが いらない"], 0, "〜そう = looks like."],
    ["Speaking", "Compliment someone's Japanese, then they reply modestly. Their reply is:", ["いえいえ、まだまだです", "はい、とても 上手です", "ありがとう、完璧です", "そうでしょう"], 0, "まだまだです = I still have a long way to go (modest reply)."],
    ["Speaking", "Ask what time the meeting starts.", ["会議は 何時から ですか", "会議は どこ ですか", "会議に 出ました か", "会議を 始めました"], 0, "何時から = from what time."],
    ["Speaking", "Say you were made to wait for an hour.", ["一時間も 待たされました", "一時間 待たせました", "一時間 待って あげました", "一時間 待つ ことが できます"], 0, "Causative-passive 待たされる = was made to wait."],
  ],
  n2: [
    ["Speaking", "Begin a polite request to a client.", ["お忙しい ところ 恐れ入りますが", "早く して ください", "ちょっと 来て", "どう する？"], 0, "お忙しいところ恐れ入りますが = sorry to trouble you when you're busy."],
    ["Speaking", "Listen and choose the best reply.", ["承知いたしました。すぐ 対応します", "それは 知りません", "また 今度ね", "いいえ、結構です"], 0, "Accepting an instruction at work: 承知いたしました.", "この 資料、今日中に 直して もらえますか"],
    ["Speaking", "Express a different opinion without sounding rude.", ["おっしゃる ことも 分かりますが、私は 少し 違う 考えです", "それは 間違って います", "あなたは 分かって いない", "反対です"], 0, "Acknowledge first, then disagree softly."],
    ["Speaking", "Say the plan was cancelled because of the weather.", ["天候の 関係で、計画は 中止に なりました", "天気が いい から 中止しました", "計画を 天候に しました", "中止の 天候です"], 0, "〜の関係で = owing to."],
    ["Speaking", "Ask if you could reschedule a meeting.", ["会議の 日程を 変更して いただく ことは 可能でしょうか", "会議を 変えろ", "会議は もう いい", "会議を 変更した かな"], 0, "〜ことは可能でしょうか = would it be possible to …?"],
    ["Speaking", "Listen and choose the best reply.", ["お気遣い ありがとう ございます", "はい、そうです", "いただきます", "失礼しました"], 0, "Thanks for someone's concern: お気遣いありがとうございます.", "体調は もう 大丈夫ですか"],
    ["Speaking", "Explain you couldn't finish despite trying.", ["努力した ものの、間に合いませんでした", "努力した から 間に合いました", "努力しないで 終わりました", "努力する ために 遅れました"], 0, "〜ものの = although."],
    ["Speaking", "Recommend something to a colleague.", ["一度 試して みる 価値は あると 思いますよ", "試す べきでは ない", "試しても 無駄です", "試した ことが ない"], 0, "〜価値はある = it's worth …"],
    ["Speaking", "Politely interrupt a meeting to ask a question.", ["お話の 途中 すみません、一つ よろしいでしょうか", "ちょっと 待って", "うるさい です", "質問が ない"], 0, "お話の途中すみません = sorry to interrupt."],
    ["Speaking", "Say you are partly responsible.", ["私にも 責任の 一端が あります", "私は 関係 ありません", "責任は ない はずです", "全部 あなたの せいです"], 0, "責任の一端 = a share of the responsibility."],
  ],
  n1: [
    ["Speaking", "Formally apologise for an inconvenience to a client.", ["多大な ご迷惑を おかけし、誠に 申し訳 ございません", "迷惑だった かな", "ごめんね", "気に しないで"], 0, "多大なご迷惑をおかけし = we have caused great inconvenience."],
    ["Speaking", "Listen and choose the best reply.", ["身に 余る お言葉、恐縮です", "そうですね、当然です", "いえ、別に", "ありがとね"], 0, "A humble reply to high praise.", "今回の ご活躍は 本当に 見事でした"],
    ["Speaking", "Decline a proposal with the utmost politeness.", ["誠に 恐縮ですが、今回は 見送らせて いただきます", "やりません", "無理です", "いらない"], 0, "見送らせていただきます = we will pass this time."],
    ["Speaking", "State that a decision cannot be made right away.", ["即答 いたしかねますので、持ち帰って 検討します", "今 決めます", "決めない", "どちらでも いい"], 0, "〜いたしかねます = I'm unable to …"],
    ["Speaking", "Open a formal speech.", ["本日は ご多忙の 中、お集まり いただき 誠に ありがとう ございます", "みんな、来て くれて ありがとう", "はい、始めます", "どうも"], 0, "Standard formal opening."],
    ["Speaking", "Listen and choose the best reply.", ["では、その 方向で 進めさせて いただきます", "知らなかった", "また 今度", "いや です"], 0, "Agreeing to proceed formally.", "その 案で 問題ないと 思います"],
    ["Speaking", "Say the situation leaves no room for optimism.", ["楽観視 できる 状況では ありません", "とても 楽しい です", "安心して ください", "問題 ありません"], 0, "楽観視 = optimistic view."],
    ["Speaking", "Express gratitude for long-standing support.", ["平素より 格別の ご高配を 賜り、厚く 御礼 申し上げます", "いつも ありがとう", "どうも です", "サンキュー"], 0, "Formal business gratitude."],
    ["Speaking", "Concede a point before arguing.", ["確かに 一理 ありますが、別の 見方も できるかと 存じます", "それは 違う", "知りません", "賛成です"], 0, "一理ある = has a point."],
    ["Speaking", "Ask someone to accept a small gift humbly.", ["心ばかりの 品ですが、お納め ください", "これ、あげる", "高い ものです", "早く 受け取って"], 0, "心ばかりの品 = a small token."],
  ],
};

const beginner: Record<string, Row[]> = {
  greetings: [
    ["Speaking", "「おはようございます」 is said:", ["In the morning", "At night", "Before eating", "When leaving"], 0, "おはようございます = good morning."],
    ["Speaking", "「こんにちは」 means:", ["Hello / good afternoon", "Goodbye", "Thank you", "Sorry"], 0, "こんにちは = hello."],
    ["Speaking", "「さようなら」 means:", ["Goodbye", "Hello", "Please", "Yes"], 0, "さようなら = goodbye."],
    ["Speaking", "How do you say “Thank you very much”?", ["ありがとうございます", "すみません", "おねがいします", "はじめまして"], 0, "ありがとうございます = thank you (polite)."],
    ["Speaking", "「はい」 means:", ["Yes", "No", "Maybe", "Hello"], 0, "はい = yes. いいえ = no."],
    ["Speaking", "「おやすみなさい」 is said:", ["Before sleeping", "In the morning", "When eating", "On the phone"], 0, "おやすみなさい = good night."],
    ["Speaking", "「おねがいします」 means:", ["Please", "Sorry", "Welcome", "Cheers"], 0, "おねがいします = please (a request)."],
    ["Listening", "Listen and choose the meaning.", ["Please come in", "Good night", "Thank you", "Excuse me"], 0, "どうぞ = please (go ahead / come in).", "どうぞ"],
    ["Listening", "Listen and choose the meaning.", ["Welcome home", "Good morning", "Welcome (shop)", "Goodbye"], 0, "おかえりなさい = welcome home.", "おかえりなさい"],
    ["Speaking", "「いいえ」 means:", ["No", "Yes", "Good", "Bad"], 0, "いいえ = no."],
  ],
  numbers: [
    ["Vocabulary", "「いち」 is:", ["1", "2", "7", "10"], 0, "いち = 1."],
    ["Vocabulary", "「さん」 is:", ["3", "4", "8", "6"], 0, "さん = 3."],
    ["Vocabulary", "「ご」 is:", ["5", "9", "2", "4"], 0, "ご = 5."],
    ["Vocabulary", "「じゅう」 is:", ["10", "100", "1", "1,000"], 0, "じゅう = 10."],
    ["Vocabulary", "How do you say 8?", ["はち", "ろく", "きゅう", "なな"], 0, "はち = 8."],
    ["Vocabulary", "「にじゅう」 is:", ["20", "12", "2", "200"], 0, "に (2) × じゅう (10) = 20."],
    ["Vocabulary", "「ひゃく」 is:", ["100", "10", "1,000", "1"], 0, "ひゃく = 100."],
    ["Vocabulary", "「さんじ」 means:", ["3 o'clock", "3 minutes", "3 people", "3 days"], 0, "〜じ = o'clock."],
    ["Listening", "Listen. Which number?", ["4", "7", "9", "6"], 0, "よん = 4.", "よん"],
    ["Listening", "Listen. What time is it?", ["10:00", "2:00", "6:00", "8:00"], 0, "じゅうじ = 10 o'clock.", "じゅうじです"],
  ],
};

export interface FreeTestPart {
  id: string;
  label: string;
  questions: QuizQuestion[];
}
export interface FreeTest {
  id: string;
  title: string;
  jp: string;
  desc: string;
  backHref: string;
  backLabel: string;
  parts: FreeTestPart[];
}

const build = (test: string, part: string, level: string, rows: Row[]): QuizQuestion[] =>
  rows.map(([skill, prompt, options, answer, explanation, audio], i) =>
    shuffleOptions({ id: `${test}-${part}-${i + 1}`, level: level as QuizQuestion["level"], difficulty: "medium", skill, prompt, audio, options, answer, explanation }),
  );

export const freeTests: FreeTest[] = [
  {
    id: "speaking",
    title: "Japanese speaking test",
    jp: "会話",
    desc: "Real situations: choose what you would say, or listen and pick the best reply.",
    backHref: "/speak-japanese",
    backLabel: "Japanese Speaking",
    parts: Object.entries(speaking).map(([lvl, rows]) => ({ id: lvl, label: lvl.toUpperCase(), questions: build("speaking", lvl, lvl.toUpperCase(), rows) })),
  },
  {
    id: "beginner",
    title: "Japanese beginner test",
    jp: "入門",
    desc: "For your first weeks: first words, greetings and numbers.",
    backHref: "/japanese-for-beginners",
    backLabel: "Japanese for Beginners",
    parts: [
      { id: "words", label: "First words", questions: build("beginner", "words", "N5", courseBanks.beginner.words) },
      { id: "greetings", label: "Greetings", questions: build("beginner", "greetings", "N5", beginner.greetings) },
      { id: "numbers", label: "Numbers & time", questions: build("beginner", "numbers", "N5", beginner.numbers) },
    ],
  },
  {
    id: "japanese",
    title: "Japanese test",
    jp: "日本語",
    desc: "Everyday Japanese for new learners: words, particles, signs and listening.",
    backHref: "/learn-japanese-language-course",
    backLabel: "Japanese Courses",
    parts: [
      { id: "starter", label: "Starter", questions: build("japanese", "starter", "N5", courseBanks.japanese.starter) },
      { id: "next", label: "Next step", questions: build("japanese", "next", "N4", courseBanks.japanese.next) },
    ],
  },
  {
    id: "grammar",
    title: "Grammar test",
    jp: "文法",
    desc: "Particles, verb forms and sentence patterns.",
    backHref: "/japanese-grammar-course",
    backLabel: "Japanese Grammar",
    parts: [
      { id: "basic", label: "Basic", questions: build("grammar", "basic", "N5", courseBanks.grammar.basic) },
      { id: "intermediate", label: "Intermediate", questions: build("grammar", "intermediate", "N3", courseBanks.grammar.intermediate) },
    ],
  },
  {
    id: "vocabulary",
    title: "Vocabulary test",
    jp: "語彙",
    desc: "Word meanings, from everyday words to useful intermediate ones.",
    backHref: "/japanese-vocabulary-course",
    backLabel: "Japanese Vocabulary",
    parts: [
      { id: "basic", label: "Basic", questions: build("vocabulary", "basic", "N5", courseBanks.vocabulary.basic) },
      { id: "intermediate", label: "Intermediate", questions: build("vocabulary", "intermediate", "N3", courseBanks.vocabulary.intermediate) },
    ],
  },
  {
    id: "reading",
    title: "Reading & writing test",
    jp: "読み書き",
    desc: "Kana, kanji, signs and short real-world texts.",
    backHref: "/japanese-reading-writing-course",
    backLabel: "Reading & Writing",
    parts: [
      { id: "basic", label: "Basic", questions: build("reading", "basic", "N5", courseBanks.reading.basic) },
      { id: "intermediate", label: "Intermediate", questions: build("reading", "intermediate", "N3", courseBanks.reading.intermediate) },
    ],
  },
  {
    id: "business",
    title: "Business Japanese test",
    jp: "ビジネス",
    desc: "Keigo, phone calls, emails and office words.",
    backHref: "/business-japanese",
    backLabel: "Business Japanese",
    parts: [
      { id: "keigo", label: "Keigo & office", questions: build("business", "keigo", "N3", courseBanks.business.keigo) },
    ],
  },
  {
    id: "work",
    title: "Work in Japan test",
    jp: "仕事",
    desc: "Interviews, documents and everyday workplace Japanese.",
    backHref: "/work-in-japan",
    backLabel: "Work in Japan",
    parts: [
      { id: "workplace", label: "Workplace", questions: build("work", "workplace", "N4", courseBanks.work.workplace) },
    ],
  },
  {
    id: "study",
    title: "Study in Japan test",
    jp: "留学",
    desc: "Campus life, fees and talking to teachers and classmates.",
    backHref: "/study-in-japan",
    backLabel: "Study in Japan",
    parts: [
      { id: "campus", label: "Campus life", questions: build("study", "campus", "N4", courseBanks.study.campus) },
    ],
  },
  {
    id: "phrases",
    title: "Everyday phrases test",
    jp: "フレーズ",
    desc: "The phrases you hear every day in Japan.",
    backHref: "/resources/phrases",
    backLabel: "Japanese Phrases",
    parts: [
      { id: "everyday", label: "Everyday", questions: build("phrases", "everyday", "N5", courseBanks.phrases.everyday) },
    ],
  },
  {
    id: "kana",
    title: "Kana reading test",
    jp: "かな",
    desc: "Read the character, then find it from its sound.",
    backHref: "/resources/hiragana",
    backLabel: "Hiragana",
    parts: [
      { id: "hiragana", label: "Hiragana", questions: kanaQuiz("hiragana", hiragana) },
      { id: "katakana", label: "Katakana", questions: kanaQuiz("katakana", katakana) },
    ],
  },
];

export const getFreeTest = (id: string) => freeTests.find((t) => t.id === id);
