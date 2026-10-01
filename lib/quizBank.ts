import type { Skill } from "@/lib/learning";
import { topicExtras } from "@/lib/quizTopicExtras";

export type QuizLevel = "N5" | "N4" | "N3" | "N2" | "N1";
export type Difficulty = "easy" | "medium" | "hard";

export interface QuizQuestion {
  id: string;
  level: QuizLevel;
  difficulty: Difficulty;
  skill: Skill;
  prompt: string;
  audio?: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizLevels: QuizLevel[] = ["N5", "N4", "N3", "N2", "N1"];
export const difficulties: { id: Difficulty; label: string; jp: string; desc: string }[] = [
  { id: "easy", label: "Easy", jp: "やさしい", desc: "Core words and basic patterns" },
  { id: "medium", label: "Medium", jp: "ふつう", desc: "Typical exam-level questions" },
  { id: "hard", label: "Hard", jp: "むずかしい", desc: "Tricky grammar and nuance" },
];

type Row = [Skill, string, string[], number, string, string?];

const bank: Record<QuizLevel, Record<Difficulty, Row[]>> = {
  N5: {
    easy: [
      ["Vocabulary", "「いぬ」 means:", ["Cat", "Dog", "Bird", "Fish"], 1, "いぬ (犬) = dog. Cat is ねこ."],
      ["Vocabulary", "「みず」 means:", ["Water", "Fire", "Rice", "Tea"], 0, "みず (水) = water."],
      ["Kanji", "How is 「一」 read when counting?", ["いち", "に", "さん", "よん"], 0, "一 = いち (one). 二 = に, 三 = さん."],
      ["Kanji", "「日」 means:", ["Moon", "Sun / day", "Tree", "Fire"], 1, "日 = sun or day, as in 日本 (Japan) and 日曜日 (Sunday)."],
      ["Vocabulary", "How do you say “Good morning” politely?", ["こんばんは", "おはようございます", "さようなら", "いただきます"], 1, "おはようございます is the polite morning greeting."],
      ["Grammar", "わたし ___ がくせいです。", ["を", "は", "に", "で"], 1, "は marks the topic: “As for me, I am a student.”"],
      ["Vocabulary", "「ありがとう」 means:", ["Sorry", "Thank you", "Hello", "Goodbye"], 1, "ありがとう = thank you."],
      ["Listening", "Listen and choose the meaning.", ["Good morning", "Thank you", "Goodbye", "Excuse me"], 2, "さようなら = goodbye.", "さようなら"],
      ["Vocabulary", "Katakana 「コーヒー」 means:", ["Coffee", "Cookie", "Copy", "Coat"], 0, "コーヒー = coffee. Katakana is used for loanwords."],
      ["Vocabulary", "「ななじゅう」 is which number?", ["17", "70", "7", "700"], 1, "なな (7) + じゅう (10) = 70."],
    ],
    medium: [
      ["Grammar", "これ ___ わたしの ほんです。", ["は", "を", "へ", "で"], 0, "は marks the topic: “This is my book.”"],
      ["Grammar", "がっこう ___ いきます。", ["を", "に", "が", "の"], 1, "に marks the destination of movement (へ also works)."],
      ["Grammar", "バス ___ かいしゃへ いきます。", ["で", "を", "に", "が"], 0, "で marks the means: “I go to the office by bus.”"],
      ["Kanji", "How is 「山」 read in 「やまのぼり」 (mountain climbing)?", ["やま", "かわ", "さん", "た"], 0, "山 is read やま on its own and さん in names like ふじさん."],
      ["Vocabulary", "「きのう」 means:", ["Today", "Tomorrow", "Yesterday", "Every day"], 2, "きのう = yesterday, きょう = today, あした = tomorrow."],
      ["Grammar", "すし ___ すきです。", ["を", "が", "で", "に"], 1, "すき (like) takes が: すしが すきです."],
      ["Reading", "「わたしは まいあさ 7じに おきます。」 When does the writer get up?", ["6:00", "7:00", "8:00", "7:30"], 1, "7じ = 7 o'clock. おきます = get up."],
      ["Kanji", "「金よう日」 is:", ["Monday", "Wednesday", "Friday", "Sunday"], 2, "金曜日 = Friday. 月 = Monday, 水 = Wednesday, 日 = Sunday."],
      ["Listening", "Listen and choose the meaning.", ["Where is it?", "How much is it?", "What time is it?", "Who is it?"], 1, "いくらですか = How much is it?", "いくらですか"],
      ["Grammar", "きのう えいがを ___。", ["みます", "みました", "みません", "みて"], 1, "きのう (yesterday) needs the past tense: みました."],
    ],
    hard: [
      ["Grammar", "つくえの うえ ___ ねこが います。", ["で", "を", "に", "へ"], 2, "に marks where something exists (with います / あります)."],
      ["Grammar", "あした ともだちと こうえん ___ あそびます。", ["に", "で", "を", "が"], 1, "で marks where an action happens: play at the park."],
      ["Grammar", "にほんごは むずかしい ___、おもしろいです。", ["から", "ですが", "ので", "と"], 1, "ですが = but: “Japanese is difficult, but interesting.”"],
      ["Kanji", "How is 「先生」 read?", ["せんせい", "がくせい", "せんしゅう", "さきせい"], 0, "先生 = せんせい (teacher). 学生 = がくせい (student)."],
      ["Grammar", "ここで しゃしんを とって ___ ですか。", ["もいい", "はいけない", "ください", "ほしい"], 0, "〜てもいいですか = May I …? “May I take a photo here?”"],
      ["Reading", "「たなかさんは 3にん きょうだいです。おにいさんと いもうとが います。」 How many siblings does Tanaka-san have?", ["1", "2", "3", "4"], 1, "3にんきょうだい counts Tanaka-san too: an older brother and a younger sister = 2 siblings."],
      ["Vocabulary", "The opposite of 「たかい」 (expensive) is:", ["やすい", "ひくい", "おおきい", "ながい"], 0, "たかい (expensive) ↔ やすい (cheap). For height, the opposite is ひくい."],
      ["Listening", "Listen. What is the person doing?", ["Asking the time", "Asking where the station is", "Buying a ticket", "Apologising for being late"], 1, "えきは どこですか = Where is the station?", "すみません、えきは どこですか"],
      ["Grammar", "The polite past negative of のみます is:", ["のみませんでした", "のみました", "のみません", "のまない"], 0, "〜ませんでした = didn't (polite past negative)."],
      ["Kanji", "「来週」 means:", ["Last week", "This week", "Next week", "Every week"], 2, "来週 = next week. 先週 = last week, 今週 = this week."],
    ],
  },
  N4: {
    easy: [
      ["Vocabulary", "「しゅくだい」 means:", ["Homework", "Holiday", "Lunch", "Test"], 0, "しゅくだい (宿題) = homework."],
      ["Grammar", "The て-form of かく (to write) is:", ["かいて", "かって", "かきて", "かいで"], 0, "〜く verbs change to 〜いて: かく → かいて."],
      ["Kanji", "How is 「会社」 read?", ["かいしゃ", "がっこう", "しゃかい", "かいぎ"], 0, "会社 = かいしゃ (company). 社会 = しゃかい (society)."],
      ["Vocabulary", "「やくそく」 means:", ["Promise / appointment", "Medicine", "Station", "Weather"], 0, "やくそく (約束) = a promise or appointment."],
      ["Grammar", "まどを あけて ___。 (Please open the window.)", ["ください", "ます", "です", "ました"], 0, "〜てください = please do …"],
      ["Listening", "Listen and choose the meaning.", ["It rained yesterday", "It will probably rain tomorrow", "It is sunny today", "It is snowing now"], 1, "ふるでしょう = will probably fall.", "あしたは あめが ふるでしょう"],
      ["Kanji", "「肉」 means:", ["Fish", "Meat", "Vegetables", "Rice"], 1, "肉 (にく) = meat. 魚 (さかな) = fish."],
      ["Vocabulary", "「いそがしい」 means:", ["Busy", "Boring", "Easy", "Kind"], 0, "いそがしい (忙しい) = busy."],
      ["Grammar", "The potential form of たべる (can eat) is:", ["たべられる", "たべさせる", "たべたい", "たべよう"], 0, "る-verbs: drop る, add られる."],
      ["Reading", "「ここで たばこを すわないで ください。」 What does this sign say?", ["Please smoke here", "Please don't smoke here", "The smoking area is outside", "You may smoke"], 1, "〜ないでください = please don't …"],
    ],
    medium: [
      ["Grammar", "日本語が 少し 話せる ___ なりました。", ["ように", "ために", "ことに", "そうに"], 0, "〜ようになる = come to be able to …"],
      ["Grammar", "空が 暗いですね。雨が 降り ___ です。", ["そう", "よう", "らしい", "みたい"], 0, "Verb stem + そうだ = looks like it's about to …"],
      ["Grammar", "I borrowed a book from a friend: 友だちに 本を ___ました。", ["かり", "かし", "あげ", "くれ"], 0, "かりる = borrow; かす = lend."],
      ["Kanji", "How is 「料理」 read?", ["りょうり", "りょこう", "りょうきん", "りゆう"], 0, "料理 = りょうり (cooking). 旅行 = りょこう (travel)."],
      ["Vocabulary", "「けいけん」 means:", ["Experience", "Economy", "Police", "Plan"], 0, "けいけん (経験) = experience."],
      ["Grammar", "日本へ 行った ___ が あります。", ["こと", "もの", "ところ", "ほう"], 0, "〜たことがある = have done … before."],
      ["Reading", "「昨日は 頭が 痛かったので、学校を 休みました。」 Why was the writer absent?", ["They had a headache", "They were busy", "They overslept", "They went on a trip"], 0, "頭が痛かった = had a headache. ので = because."],
      ["Listening", "Listen. What is the speaker asking?", ["To repeat something", "For directions", "Forgiveness for being late", "The price"], 0, "もう一度 言って いただけませんか = Could you say that once more?", "すみません、もう一度 言って いただけませんか"],
      ["Grammar", "ドアが ___ います。 (The door is open.)", ["あいて", "あけて", "あく", "あけ"], 0, "Intransitive あく + ている describes a state: the door is open."],
      ["Kanji", "「急行」 on a train timetable means:", ["Express train", "Local train", "Airport", "Hurry up"], 0, "急行 (きゅうこう) = express. 各駅停車 = local (stops at every station)."],
    ],
    hard: [
      ["Grammar", "母に 部屋を そうじ ___ました。 (I was made to clean.)", ["させられ", "され", "させ", "して"], 0, "Causative-passive 〜させられる = be made to do."],
      ["Grammar", "明日は 早く 起き ___ なりません。", ["なければ", "たら", "ても", "れば"], 0, "〜なければならない = must."],
      ["Grammar", "先生が 教室に ___。 (honorific)", ["いらっしゃいました", "まいりました", "おりました", "いたしました"], 0, "いらっしゃる is the respectful form of いる/来る. まいる and おる are humble."],
      ["Grammar", "Humble: 私が 先生の かばんを お持ち ___。", ["します", "になります", "なさいます", "くださいます"], 0, "お + stem + する is humble (my action). お〜になる is respectful."],
      ["Kanji", "How is 「説明」 read?", ["せつめい", "せいめい", "せつめん", "ぜつめい"], 0, "説明 = せつめい (explanation)."],
      ["Vocabulary", "「ようやく」 is closest to:", ["Finally / at last", "Suddenly", "Never", "Always"], 0, "ようやく = finally, after a long time."],
      ["Reading", "「この 薬は 食後に 飲んで ください。1日 3回です。」 How should you take it?", ["Before meals, 3 times a day", "After meals, 3 times a day", "Once a day after dinner", "Only when you feel sick"], 1, "食後 = after meals; 1日3回 = three times a day."],
      ["Listening", "Listen. What changed?", ["The meeting was cancelled", "The meeting moved from 3 to 4 o'clock", "The meeting lasts 3–4 hours", "The meeting starts at 3"], 1, "3時から4時に変更 = changed from 3 to 4 o'clock.", "会議は 3時から 4時に 変更に なりました"],
      ["Grammar", "窓を 開けた ___ 寝て しまった。 (left it open)", ["まま", "ながら", "あいだ", "うちに"], 0, "〜たまま = with … still in that state."],
      ["Vocabulary", "「かならず」 means:", ["Without fail", "Maybe", "Sometimes", "Rarely"], 0, "かならず (必ず) = surely, without fail."],
    ],
  },
  N3: {
    easy: [
      ["Vocabulary", "「締め切り」 means:", ["Deadline", "Holiday", "Contract", "Salary"], 0, "締め切り (しめきり) = deadline."],
      ["Grammar", "雨が 降った ___、試合は 中止に なった。", ["せいで", "おかげで", "くせに", "わりに"], 0, "せいで = because of (a negative result). おかげで is for positive results."],
      ["Kanji", "How is 「経験」 read?", ["けいけん", "きょうけん", "けいげん", "けいかん"], 0, "経験 = けいけん (experience)."],
      ["Vocabulary", "「あきらめる」 means:", ["To give up", "To remember", "To decide", "To hurry"], 0, "あきらめる (諦める) = to give up."],
      ["Grammar", "日本に 来て ___、毎日 日本語を 使っています。", ["以来", "ばかり", "ところ", "うちに"], 0, "〜て以来 = ever since …"],
      ["Listening", "Listen. What is the restaurant saying?", ["Sorry, we're full right now", "We're closed today", "Please wait outside", "Your table is ready"], 0, "満席 (まんせき) = all seats taken.", "申し訳ございません、ただいま 満席です"],
      ["Kanji", "「募集」 on a poster means:", ["Recruiting / wanted", "Resignation", "Holiday", "Promotion"], 0, "募集 (ぼしゅう) = recruitment, as in アルバイト募集."],
      ["Grammar", "忙しい ___、手伝って くれて ありがとう。", ["のに", "ので", "から", "ため"], 0, "のに = even though: “Thanks for helping even though you're busy.”"],
      ["Vocabulary", "「ぎりぎり」 means:", ["Just barely / at the last moment", "Very slowly", "Completely", "Quietly"], 0, "ぎりぎり間に合った = made it just in time."],
      ["Reading", "「本日は 定休日の ため、営業して おりません。」 What does this notice say?", ["Open today", "Closed today: regular holiday", "Closing early", "Under renovation"], 1, "定休日 = regular closing day."],
    ],
    medium: [
      ["Grammar", "この 本は 読めば 読む ___ おもしろく なる。", ["ほど", "だけ", "ばかり", "まで"], 0, "〜ば〜ほど = the more …, the more …"],
      ["Grammar", "彼は 知っている ___、何も 言わなかった。", ["くせに", "おかげで", "ために", "ように"], 0, "くせに = even though (with criticism)."],
      ["Grammar", "日本語が 上手に なる ___、毎日 練習して います。", ["ように", "ために", "ことに", "までに"], 0, "なる is non-volitional, so use ように (so that). ために needs a volitional verb."],
      ["Kanji", "How is 「営業」 read?", ["えいぎょう", "えいごう", "けいぎょう", "えいぎょ"], 0, "営業 = えいぎょう (business, sales)."],
      ["Vocabulary", "「延期」 means:", ["Postponement", "Cancellation", "Early start", "Rehearsal"], 0, "延期 (えんき) = postponement."],
      ["Reading", "「参加を ご希望の 方は、今月 20日までに メールで お申し込み ください。」 What should you do?", ["Apply by email by the 20th", "Apply in person on the 20th", "Just come on the 20th", "No application needed"], 0, "20日までに = by the 20th; メールで = by email."],
      ["Listening", "Listen. What is the speaker saying?", ["I'll be a little late. The train is delayed", "The train was cancelled", "I'm already at the station", "I'll arrive early"], 0, "電車が遅れている = the train is running late.", "電車が 遅れて いる ので、少し 遅く なります"],
      ["Grammar", "彼の 話に よると、明日は 休み ___。", ["だそうです", "らしくない", "ようにする", "べきです"], 0, "〜によると…そうです = according to …, I hear that …"],
      ["Vocabulary", "「思わず」 means:", ["Without thinking", "Certainly", "Deliberately", "Regularly"], 0, "思わず笑った = laughed in spite of myself."],
      ["Kanji", "How is 「確認」 read?", ["かくにん", "かくにち", "かくじん", "がくにん"], 0, "確認 = かくにん (confirmation)."],
    ],
    hard: [
      ["Grammar", "忙しい ___、彼は 毎日 ジムに 通って いる。", ["にもかかわらず", "によって", "に対して", "にとって"], 0, "にもかかわらず = despite."],
      ["Grammar", "子ども ___、この 問題は 難しすぎる。", ["にとって", "について", "によって", "に対して"], 0, "にとって = for, from the point of view of."],
      ["Grammar", "彼女は 今にも 泣き ___ 顔を して いた。", ["そうな", "ような", "らしい", "みたいな"], 0, "今にも + stem + そうな = looking as if about to …"],
      ["Grammar", "彼の 意見に ___、私は 反対です。", ["対して", "よって", "とって", "ついて"], 0, "〜に対して = towards, against."],
      ["Kanji", "How is 「規則」 read?", ["きそく", "きぞく", "きそ", "ぎそく"], 0, "規則 = きそく (rule). 貴族 = きぞく (nobility)."],
      ["Vocabulary", "「さっぱり わからない」 means:", ["Don't understand at all", "Understand a little", "Understand perfectly", "Almost understand"], 0, "さっぱり + negative = not at all."],
      ["Reading", "「当店では、お客様の 安全の ため、店内での 撮影を ご遠慮 いただいて おります。」 What is the rule?", ["Please don't take photos inside", "Photos are welcome", "Safety equipment is required", "The store is closed for safety"], 0, "撮影をご遠慮ください = please refrain from taking photos."],
      ["Listening", "Listen. What will the company do?", ["Contact you again later about this", "Close the matter", "Ask you to call now", "Nothing: they already contacted you"], 0, "後ほど改めてご連絡いたします = we will contact you again later.", "この 件に ついては、後ほど 改めて ご連絡 いたします"],
      ["Vocabulary", "「油断」 means:", ["Carelessness", "Oil price", "Decision", "Patience"], 0, "油断 (ゆだん) = letting your guard down. 油断大敵 = carelessness is the greatest enemy."],
      ["Kanji", "「貯金」 means:", ["Savings", "Loan", "Salary", "Tax"], 0, "貯金 (ちょきん) = savings."],
    ],
  },
  N2: {
    easy: [
      ["Vocabulary", "「把握」 means:", ["Grasp / understand", "Delay", "Estimate", "Refuse"], 0, "把握 (はあく) = grasp, as in 状況を把握する."],
      ["Grammar", "彼の 努力 ___、プロジェクトは 成功した。", ["のおかげで", "のせいで", "のくせに", "のわりに"], 0, "おかげで = thanks to (a positive result)."],
      ["Kanji", "How is 「傾向」 read?", ["けいこう", "けいきょう", "けいこ", "きょうこう"], 0, "傾向 = けいこう (tendency)."],
      ["Grammar", "学生 ___、よく 勉強しなさい。", ["である以上", "であるにしても", "であるものの", "であるくせに"], 0, "〜以上 = since / as long as (you are …)."],
      ["Vocabulary", "「妥協」 means:", ["Compromise", "Victory", "Refusal", "Promotion"], 0, "妥協 (だきょう) = compromise."],
      ["Listening", "Listen. What is being asked?", ["Could you please wait a moment?", "We're closed, sorry", "Please come back tomorrow", "Sorry for the wait"], 0, "少々お待ちいただけますか = could you wait a moment?", "恐れ入りますが、少々 お待ち いただけますか"],
      ["Grammar", "雨が 降る ___ 降らない ___、イベントは 行います。", ["にしろ / にしろ", "から / から", "ので / ので", "のに / のに"], 0, "AにしろBにしろ = whether A or B."],
      ["Kanji", "How is 「著しい」 read?", ["いちじるしい", "いちじるい", "ちょしい", "あらわしい"], 0, "著しい = いちじるしい (remarkable)."],
      ["Vocabulary", "「いきなり」 means:", ["Suddenly", "Gradually", "Carefully", "Eventually"], 0, "いきなり = suddenly, without warning."],
      ["Reading", "「本製品は、高温多湿を 避けて 保管して ください。」 How should it be stored?", ["Away from heat and humidity", "In a warm place", "In the fridge", "Use within a day"], 0, "高温多湿を避けて = avoiding high temperature and humidity."],
    ],
    medium: [
      ["Grammar", "彼は 医者 ___、患者の 気持ちが わからない。", ["のくせに", "のおかげで", "にとって", "について"], 0, "のくせに = even though he is (critical)."],
      ["Grammar", "この 仕事は 経験が ない 人 ___ 無理だ。", ["には", "では", "にも", "とは"], 0, "〜には無理だ = impossible for …"],
      ["Grammar", "年を とる ___、体力が 落ちて くる。", ["につれて", "によって", "にとって", "に対して"], 0, "につれて = as … goes on."],
      ["Kanji", "How is 「矛盾」 read?", ["むじゅん", "ほこじゅん", "むしゅん", "ぼうじゅん"], 0, "矛盾 = むじゅん (contradiction)."],
      ["Vocabulary", "「おおざっぱ」 means:", ["Rough, not detailed", "Very generous", "Extremely careful", "Quiet"], 0, "おおざっぱ (大雑把) = rough, broad-brush."],
      ["Reading", "「新製品の 発売は、部品の 供給が 遅れて いる ため、来月に 延期されました。」 What happened?", ["Launch postponed to next month: parts delay", "Launched early due to demand", "Product cancelled", "Price increased"], 0, "供給が遅れている = supply is delayed; 延期 = postponed."],
      ["Listening", "Listen. What should you do?", ["Fill in this form", "Nothing: the form is done", "Sign later", "Bring documents next time"], 0, "書類にご記入ください = please fill in the form.", "お手数ですが、こちらの 書類に ご記入 ください"],
      ["Grammar", "いくら 頼まれ ___、その 仕事は 引き受けられない。", ["ても", "たら", "ば", "なら"], 0, "いくら〜ても = no matter how much …"],
      ["Vocabulary", "「見直す」 means:", ["To review / reconsider", "To look down on", "To overlook", "To look forward to"], 0, "見直す = look at again, reconsider (also: think better of)."],
      ["Kanji", "How is 「携帯」 read?", ["けいたい", "けいだい", "きょうたい", "けたい"], 0, "携帯 = けいたい, as in 携帯電話 (mobile phone)."],
    ],
    hard: [
      ["Grammar", "彼の 実力 ___、優勝は 間違いない。", ["からすれば", "にかけては", "に反して", "をめぐって"], 0, "からすれば = judging from."],
      ["Grammar", "予想 ___、試験は とても 簡単だった。", ["に反して", "に沿って", "に基づいて", "に応じて"], 0, "に反して = contrary to."],
      ["Grammar", "この 問題 ___、会議で 激しい 議論が あった。", ["をめぐって", "に際して", "にわたって", "につき"], 0, "をめぐって = over, concerning (a dispute)."],
      ["Grammar", "3日間 ___、会議が 行われた。", ["にわたって", "をめぐって", "に反して", "に沿って"], 0, "にわたって = over a span of (time/space)."],
      ["Kanji", "How is 「潔い」 read?", ["いさぎよい", "きよい", "けがらわしい", "こころよい"], 0, "潔い = いさぎよい (graceful, manly in accepting)."],
      ["Vocabulary", "「ひたすら」 means:", ["Single-mindedly", "Occasionally", "Reluctantly", "Casually"], 0, "ひたすら = earnestly, with total focus."],
      ["Reading", "「弊社は、お客様の 個人情報を 法令に 基づき 適切に 管理いたします。」 What does the company promise?", ["To manage personal data properly under the law", "To sell personal data", "Not to collect personal data", "To delete it every day"], 0, "法令に基づき = in accordance with laws; 適切に管理 = manage properly."],
      ["Listening", "Listen. What is the speaker saying?", ["We're very sorry we couldn't meet your expectations", "Thank you for your expectations", "We exceeded expectations", "Please wait for our reply"], 0, "ご期待に添えず = failing to meet your expectations.", "ご期待に 添えず、誠に 申し訳ございません"],
      ["Vocabulary", "「根回し」 in business means:", ["Building consensus behind the scenes", "Gardening", "The final decision", "A public announcement"], 0, "根回し (ねまわし) = laying the groundwork before a formal decision."],
      ["Kanji", "How is 「漸く」 read?", ["ようやく", "しばらく", "ぜんく", "すばやく"], 0, "漸く = ようやく (finally)."],
    ],
  },
  N1: {
    easy: [
      ["Vocabulary", "「懸念」 means:", ["Concern / worry", "Celebration", "Contract", "Achievement"], 0, "懸念 (けねん) = concern."],
      ["Grammar", "彼は 挨拶 ___、黙って 帰って しまった。", ["もせずに", "もしながら", "をしつつ", "ばかりに"], 0, "〜もせずに = without even doing …"],
      ["Kanji", "How is 「曖昧」 read?", ["あいまい", "あいまつ", "えいまい", "あいみ"], 0, "曖昧 = あいまい (vague)."],
      ["Vocabulary", "「おろそか」 means:", ["Neglectful", "Careful", "Generous", "Fast"], 0, "おろそかにする = neglect."],
      ["Grammar", "社長 ___、社員全員が 反対した。", ["をはじめ", "をもって", "をよそに", "をおいて"], 0, "をはじめ = starting with, including."],
      ["Listening", "Listen. What is being requested?", ["Your attendance, kindly", "Sorry: it's cancelled", "Reply by email", "Attendance is optional"], 0, "ご出席のほどよろしくお願い申し上げます = we kindly request your attendance.", "つきましては、ご出席の ほど よろしく お願い 申し上げます"],
      ["Kanji", "How is 「顕著」 read?", ["けんちょ", "けんしょ", "けんじょ", "げんちょ"], 0, "顕著 = けんちょ (remarkable, notable)."],
      ["Grammar", "彼の 助け ___、この 成功は なかった だろう。", ["なくしては", "をよそに", "ともなると", "にかこつけて"], 0, "〜なくしては = without …"],
      ["Vocabulary", "「目処が 立つ」 means:", ["To have an outlook in sight", "To stand up", "To lose hope", "To look away"], 0, "目処 (めど) が立つ = a prospect of completion is in sight."],
      ["Reading", "「本件に 関しては、関係各所と 協議の 上、追って ご報告 いたします。」 What will happen?", ["A report later, after consulting the relevant parties", "It has already been reported", "It has been cancelled", "No report is needed"], 0, "協議の上 = after discussion; 追って = later."],
    ],
    medium: [
      ["Grammar", "親の 心配 ___、彼は 危険な 旅に 出た。", ["をよそに", "をもって", "をおいて", "を皮切りに"], 0, "をよそに = ignoring, in disregard of."],
      ["Grammar", "東京 ___、全国 各地で コンサートが 開かれる。", ["を皮切りに", "をよそに", "をもって", "にひきかえ"], 0, "を皮切りに = starting with."],
      ["Grammar", "兄 ___、弟は とても 真面目だ。", ["にひきかえ", "をよそに", "を皮切りに", "をおいて"], 0, "にひきかえ = in contrast to."],
      ["Kanji", "How is 「覆す」 read?", ["くつがえす", "おおす", "ふくがえす", "ひるがえす"], 0, "覆す = くつがえす (overturn)."],
      ["Vocabulary", "「しがらみ」 means:", ["Ties and obligations that bind you", "Sudden luck", "Deep regret", "Silent anger"], 0, "しがらみ = binding social ties."],
      ["Reading", "「当該 規約に 違反した 場合、事前の 通知 なく アカウントを 停止する ことが あります。」 What can happen?", ["Suspension without prior notice for violations", "A one-week notice first", "Only a warning", "Deletion after a month"], 0, "事前の通知なく = without prior notice."],
      ["Listening", "Listen. What is the shop announcing?", ["It is closing permanently as of today", "It is opening today", "It is closed only today", "It is moving tomorrow"], 0, "本日をもちまして閉店 = closing as of today.", "誠に 勝手ながら、本日を もちまして 閉店 させて いただきます"],
      ["Grammar", "彼の 実力 ___、この 試験に 落ちる はずが ない。", ["をもってすれば", "をよそに", "にひきかえ", "を皮切りに"], 0, "をもってすれば = with (that ability)."],
      ["Vocabulary", "「いたたまれない」 means:", ["Unbearable, can't stay put", "Very comfortable", "Impossible to hear", "Unforgettable"], 0, "いたたまれない = so uncomfortable you can't stay."],
      ["Kanji", "How is 「懐柔」 read?", ["かいじゅう", "ふところじゅう", "かいにゅう", "えいじゅう"], 0, "懐柔 = かいじゅう (winning over)."],
    ],
    hard: [
      ["Grammar", "彼は 優秀な 研究者で ある ___、優れた 教育者でも ある。", ["と同時に", "にもまして", "をおいて", "といえども"], 0, "と同時に = at the same time, as well as."],
      ["Grammar", "子ども ___、そんな 言い訳は 通用しない。", ["といえども", "をおいて", "ともなると", "ならでは"], 0, "といえども = even if (someone is) …"],
      ["Grammar", "この 仕事を 任せられるのは、彼 ___ ほかに いない。", ["をおいて", "をよそに", "ならでは", "といえども"], 0, "をおいてほかにない = no one other than."],
      ["Grammar", "京都 ___ の 美しい 景色。", ["ならでは", "をおいて", "ともなると", "といえども"], 0, "ならでは = unique to."],
      ["Kanji", "How is 「遡る」 read?", ["さかのぼる", "そうる", "さからう", "のぼる"], 0, "遡る = さかのぼる (go back, trace back)."],
      ["Vocabulary", "「おこがましい」 means:", ["Presumptuous", "Humble", "Delicious", "Nostalgic"], 0, "おこがましい = presumptuous, impertinent."],
      ["Reading", "「前述の 通り、本研究の 結果は 限定的な 条件下で 得られた もので あり、一般化には 慎重を 期す 必要が ある。」 What is the point?", ["Results came from limited conditions: generalise with care", "Results apply everywhere", "The research was cancelled", "Conditions were unlimited"], 0, "一般化には慎重を期す = be cautious about generalising."],
      ["Listening", "Listen. What is the speaker's position?", ["Sorry to contradict, but I can't agree with that plan", "I fully agree", "Please repeat that", "I'll think about it later"], 0, "賛成しかねます = I'm unable to agree (polite refusal).", "お言葉を 返す ようですが、その 案には 賛成 しかねます"],
      ["Vocabulary", "「やぶさかでない」 means:", ["Willing, not reluctant", "Unwilling", "Impossible", "Forbidden"], 0, "〜にやぶさかでない = willing to …"],
      ["Kanji", "How is 「杜撰」 read?", ["ずさん", "とせん", "もりせん", "ずせん"], 0, "杜撰 = ずさん (sloppy)."],
    ],
  },
};

export const quizBank: QuizQuestion[] = quizLevels.flatMap((level) =>
  difficulties.flatMap(({ id: difficulty }) =>
    bank[level][difficulty].map(([skill, prompt, options, answer, explanation, audio], i) => ({
      id: `${level}-${difficulty}-${String(i + 1).padStart(2, "0")}`.toLowerCase(),
      level,
      difficulty,
      skill,
      prompt,
      audio,
      options,
      answer,
      explanation,
    }))
  )
);

export type QuizTopic = "vocabulary" | "grammar" | "kanji" | "reading" | "listening";
export const quizTopics: { id: QuizTopic; skill: Skill; label: string; jp: string; desc: string }[] = [
  { id: "vocabulary", skill: "Vocabulary", label: "Vocabulary", jp: "語彙", desc: "Word meanings for this level" },
  { id: "grammar", skill: "Grammar", label: "Grammar", jp: "文法", desc: "Particles, forms and patterns" },
  { id: "kanji", skill: "Kanji", label: "Kanji", jp: "漢字", desc: "Readings and meanings" },
  { id: "reading", skill: "Reading", label: "Reading", jp: "読解", desc: "Short texts and notices" },
  { id: "listening", skill: "Listening", label: "Listening", jp: "聴解", desc: "Hear it, then choose" },
];

const order: Record<Difficulty, number> = { easy: 0, medium: 1, hard: 2 };

// Small deterministic hash so option order is shuffled the same way on every render.
const hash = (s: string) => {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  h = Math.imul(h ^ (h >>> 15), 2246822507);
  return (h ^ (h >>> 13)) >>> 0;
};

export function shuffleOptions(q: QuizQuestion): QuizQuestion {
  const idx = q.options.map((_, i) => i).sort((a, b) => hash(`${q.id}${a}`) - hash(`${q.id}${b}`));
  return { ...q, options: idx.map((i) => q.options[i]), answer: idx.indexOf(q.answer) };
}

// Every question for one level and skill, easiest first. Each question is used by exactly one quiz:
// the first ten make the topic quiz, the next two go into the level's full test.
function pool(level: QuizLevel, skill: Skill): QuizQuestion[] {
  const base = quizBank.filter((q) => q.level === level && q.skill === skill).sort((a, b) => order[a.difficulty] - order[b.difficulty]);
  const extra = topicExtras[level]
    .filter((r) => r[0] === skill)
    .map(([s, prompt, options, answer, explanation, audio], i): QuizQuestion => ({
      id: `${level}-${skill}-x${i + 1}`.toLowerCase(),
      level,
      difficulty: "medium",
      skill: s,
      prompt,
      audio,
      options,
      answer,
      explanation,
    }));
  return [...base, ...extra];
}

export const fullSet = { id: "full", label: "Full test", jp: "総合", desc: "Two questions from every topic" } as const;
export const levelQuizSets = [fullSet, ...quizTopics];

// Ten questions on one topic at one level.
export function topicQuiz(level: QuizLevel, topic: QuizTopic): QuizQuestion[] {
  const skill = quizTopics.find((t) => t.id === topic)!.skill;
  return pool(level, skill).slice(0, 10).map(shuffleOptions);
}

// The level's full test: questions that are not in any topic quiz, two per topic.
export function fullQuiz(level: QuizLevel): QuizQuestion[] {
  return quizTopics.flatMap((t) => pool(level, t.skill).slice(10, 12)).map(shuffleOptions);
}

// Kana reading quiz built from the chart: five kana → romaji, five romaji → kana.
export function kanaQuiz(kind: "hiragana" | "katakana", chart: { kana: string; romaji: string }[][]): QuizQuestion[] {
  const cells = chart.flat().filter((c) => c.kana);
  const ranked = [...cells].sort((a, b) => hash(`${kind}${a.kana}`) - hash(`${kind}${b.kana}`));
  return ranked.slice(0, 10).map((c, i) => {
    const wrong = cells.filter((o) => o.romaji !== c.romaji).sort((a, b) => hash(`${c.kana}${a.kana}`) - hash(`${c.kana}${b.kana}`)).slice(0, 3);
    const toRomaji = i < 5;
    return shuffleOptions({
      id: `${kind}-${i + 1}`,
      level: "N5",
      difficulty: "easy",
      skill: "Reading",
      prompt: toRomaji ? `How is 「${c.kana}」 read?` : `Which ${kind} is “${c.romaji}”?`,
      options: [c, ...wrong].map((o) => (toRomaji ? o.romaji : o.kana)),
      answer: 0,
      explanation: `${c.kana} = ${c.romaji}.`,
    });
  });
}
