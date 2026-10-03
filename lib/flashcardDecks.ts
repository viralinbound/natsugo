// Every flashcard deck on the site, in one place. Group names organise the deck picker; card ids keep the
// old prefixes (h-, k-, kj-, v-, w-) so anyone's saved progress carries over.

import { grammarPoints, hiragana, kanjiN5, katakana, phrases, vocabulary } from "@/lib/learning";
import { kanjiByLevel } from "@/lib/kanjiLevels";
import { words } from "@/lib/words";

export interface Card {
  id: string;
  front: string;
  reading?: string;
  back: string;
  deck: string;
  group: string;
  // An example sentence or a short tip, shown when the card is flipped.
  note?: string;
  // Kanji from the larger JLPT lists have no meaning stored; it is looked up when the card is flipped.
  lookup?: boolean;
}

export const groups = ["Scripts", "Kanji", "Words", "Grammar and phrases"] as const;

// jp | reading | english | optional note
const make = (deck: string, group: string, id: string, rows: string[]): Card[] =>
  rows.map((r, i) => {
    const [front, reading, back, note] = r.split("|");
    return { id: `${id}-${i}-${front}`, front, reading: reading || undefined, back, deck, group, note: note || undefined };
  });

const NUMBERS = [
  "零|れい・ゼロ|zero (0)", "一|いち|one (1)", "二|に|two (2)", "三|さん|three (3)", "四|よん・し|four (4)", "五|ご|five (5)", "六|ろく|six (6)", "七|なな・しち|seven (7)",
  "八|はち|eight (8)", "九|きゅう・く|nine (9)", "十|じゅう|ten (10)", "百|ひゃく|hundred (100)", "千|せん|thousand (1,000)", "万|まん|ten thousand (10,000)",
  "三百|さんびゃく|three hundred (300)|Hundreds change their sound: 300 is sanbyaku, 600 is roppyaku, 800 is happyaku.",
];
const DAYS = [
  "月曜日|げつようび|Monday", "火曜日|かようび|Tuesday", "水曜日|すいようび|Wednesday", "木曜日|もくようび|Thursday", "金曜日|きんようび|Friday", "土曜日|どようび|Saturday", "日曜日|にちようび|Sunday",
  "今日|きょう|today", "明日|あした|tomorrow", "昨日|きのう|yesterday", "毎日|まいにち|every day", "今週|こんしゅう|this week", "来月|らいげつ|next month", "去年|きょねん|last year",
  "朝|あさ|morning", "昼|ひる|daytime, noon", "夜|よる|night", "今|いま|now",
];
const COLOURS = [
  "赤|あか|red", "青|あお|blue", "白|しろ|white", "黒|くろ|black", "黄色|きいろ|yellow", "緑|みどり|green", "茶色|ちゃいろ|brown", "紫|むらさき|purple", "灰色|はいいろ|grey",
  "ピンク|pinku|pink", "オレンジ|orenji|orange",
];
const BODY = [
  "頭|あたま|head", "顔|かお|face", "目|め|eye", "耳|みみ|ear", "鼻|はな|nose", "口|くち|mouth", "歯|は|tooth", "髪|かみ|hair", "手|て|hand", "指|ゆび|finger",
  "足|あし|foot, leg", "腕|うで|arm", "背中|せなか|back", "お腹|おなか|stomach", "心|こころ|heart, mind",
];
const FAMILY = [
  "家族|かぞく|family", "父|ちち|my father|Use this for your own family. For someone else's father, say お父さん.", "母|はは|my mother|Use this for your own family. For someone else's mother, say お母さん.",
  "お父さん|おとうさん|father (someone else's, or when addressing him)", "お母さん|おかあさん|mother (someone else's, or when addressing her)",
  "兄|あに|older brother", "姉|あね|older sister", "弟|おとうと|younger brother", "妹|いもうと|younger sister", "祖父|そふ|grandfather", "祖母|そぼ|grandmother",
  "夫|おっと|husband", "妻|つま|wife", "子供|こども|child", "友達|ともだち|friend",
];
const VERBS = [
  "食べる|たべる|to eat|ます form: たべます · て form: たべて", "飲む|のむ|to drink|ます form: のみます · て form: のんで", "見る|みる|to see, to watch|ます form: みます · て form: みて",
  "聞く|きく|to listen, to ask|ます form: ききます · て form: きいて", "読む|よむ|to read|ます form: よみます · て form: よんで", "書く|かく|to write|ます form: かきます · て form: かいて",
  "話す|はなす|to speak|ます form: はなします · て form: はなして", "行く|いく|to go|ます form: いきます · て form: いって (an exception)", "来る|くる|to come|ます form: きます · て form: きて (irregular)",
  "する|する|to do|ます form: します · て form: して (irregular)", "買う|かう|to buy|ます form: かいます · て form: かって", "会う|あう|to meet|ます form: あいます · て form: あって",
  "待つ|まつ|to wait|ます form: まちます · て form: まって", "遊ぶ|あそぶ|to play|ます form: あそびます · て form: あそんで", "働く|はたらく|to work|ます form: はたらきます · て form: はたらいて",
  "休む|やすむ|to rest|ます form: やすみます · て form: やすんで", "帰る|かえる|to return home|ます form: かえります · て form: かえって", "起きる|おきる|to wake up|ます form: おきます · て form: おきて",
  "寝る|ねる|to sleep|ます form: ねます · て form: ねて", "教える|おしえる|to teach|ます form: おしえます · て form: おしえて", "習う|ならう|to learn|ます form: ならいます · て form: ならって",
  "使う|つかう|to use|ます form: つかいます · て form: つかって", "作る|つくる|to make|ます form: つくります · て form: つくって", "歩く|あるく|to walk|ます form: あるきます · て form: あるいて",
  "走る|はしる|to run|ます form: はしります · て form: はしって", "開ける|あける|to open|ます form: あけます · て form: あけて", "閉める|しめる|to close|ます form: しめます · て form: しめて",
  "知る|しる|to know|ます form: しります · て form: しって", "住む|すむ|to live (reside)|ます form: すみます · て form: すんで", "勉強する|べんきょうする|to study|ます form: べんきょうします · て form: べんきょうして",
];
const ADJECTIVES = [
  "大きい|おおきい|big|い-adjective", "小さい|ちいさい|small|い-adjective", "高い|たかい|high, expensive|い-adjective", "安い|やすい|cheap|い-adjective", "新しい|あたらしい|new|い-adjective",
  "古い|ふるい|old (not for people)|い-adjective", "長い|ながい|long|い-adjective", "短い|みじかい|short|い-adjective", "暑い|あつい|hot (weather)|い-adjective", "寒い|さむい|cold (weather)|い-adjective",
  "美味しい|おいしい|delicious|い-adjective", "難しい|むずかしい|difficult|い-adjective", "楽しい|たのしい|fun|い-adjective", "忙しい|いそがしい|busy|い-adjective",
  "嬉しい|うれしい|happy, glad|い-adjective", "悲しい|かなしい|sad|い-adjective", "綺麗|きれい|pretty, clean|な-adjective: きれいな ひと", "静か|しずか|quiet|な-adjective: しずかな へや",
  "有名|ゆうめい|famous|な-adjective: ゆうめいな ひと", "元気|げんき|healthy, energetic|な-adjective: げんきな こ", "簡単|かんたん|simple, easy|な-adjective: かんたんな もんだい", "好き|すき|liked|な-adjective: すきな たべもの",
];
const KATAKANA_WORDS = [
  "コーヒー|kōhī|coffee", "テレビ|terebi|television", "パソコン|pasokon|personal computer", "スマホ|sumaho|smartphone", "レストラン|resutoran|restaurant", "ホテル|hoteru|hotel", "タクシー|takushī|taxi",
  "バス|basu|bus", "ケーキ|kēki|cake", "ニュース|nyūsu|news", "メール|mēru|email", "ドア|doa|door", "ペン|pen|pen", "ノート|nōto|notebook", "カメラ|kamera|camera", "アパート|apāto|apartment",
  "エレベーター|erebētā|elevator", "スーパー|sūpā|supermarket", "トイレ|toire|toilet", "ラーメン|rāmen|ramen noodles", "サラダ|sarada|salad", "ジュース|jūsu|juice", "ピザ|piza|pizza", "ホームページ|hōmupēji|website",
];
const PARTICLES = [
  "は|wa|topic marker|わたしは がくせいです。 = I am a student.", "が|ga|subject marker|ねこが います。 = There is a cat.", "を|o|object marker|みずを のみます。 = I drink water.",
  "に|ni|time, destination, where something exists|七時に おきます。 = I wake up at seven.", "で|de|where an action happens, by means of|バスで いきます。 = I go by bus.",
  "へ|e|direction towards|学校へ いきます。 = I go to school.", "と|to|and, with|ともだちと あそびます。 = I play with a friend.", "の|no|of, possession|わたしの ほん = my book",
  "も|mo|also, too|わたしも いきます。 = I will go too.", "から|kara|from, because|九時から はじまります。 = It starts from nine.", "まで|made|until, up to|五時まで はたらきます。 = I work until five.",
  "や|ya|and (a few among many)|りんごや みかん = apples, oranges and so on", "か|ka|question marker|がくせいですか。 = Are you a student?",
];

const kana = (rows: typeof hiragana, deck: string, p: string): Card[] =>
  rows.flat().filter((c) => c.kana).map((c) => ({ id: `${p}-${c.kana}`, front: c.kana, back: c.romaji, deck, group: "Scripts" }));

export function buildFlashcards(): Card[] {
  const curated = new Map(kanjiN5.map((k) => [k.k, k]));
  const kanjiDeck = (lvl: "N5" | "N4" | "N3" | "N2" | "N1"): Card[] =>
    kanjiByLevel[lvl].map((ch) => {
      const k = curated.get(ch);
      return k
        ? { id: `kj-${ch}`, front: ch, reading: k.r.split("・")[0], back: k.m, deck: `Kanji ${lvl}`, group: "Kanji" }
        : { id: `kj-${ch}`, front: ch, back: "", deck: `Kanji ${lvl}`, group: "Kanji", lookup: true };
    });

  return [
    ...kana(hiragana, "Hiragana", "h"),
    ...kana(katakana, "Katakana", "k"),
    ...make("Katakana words", "Scripts", "kw", KATAKANA_WORDS),
    ...(["N5", "N4", "N3", "N2", "N1"] as const).flatMap(kanjiDeck),
    ...words.map((w) => ({ id: `w-${w.jp}`, front: w.jp, reading: w.reading, back: w.meaning, deck: "Useful words", group: "Words", note: `${w.example_jp}  ${w.example_en}` })),
    ...vocabulary.flatMap((v) => v.words.map((w) => ({ id: `v-${w.jp}`, front: w.jp, back: w.en, deck: v.topic, group: "Words" }))),
    ...make("Numbers", "Words", "num", NUMBERS),
    ...make("Days and time", "Words", "day", DAYS),
    ...make("Colours", "Words", "col", COLOURS),
    ...make("Body", "Words", "body", BODY),
    ...make("Family", "Words", "fam", FAMILY),
    ...make("Verbs", "Words", "verb", VERBS),
    ...make("Adjectives", "Words", "adj", ADJECTIVES),
    ...make("Particles", "Grammar and phrases", "par", PARTICLES),
    ...grammarPoints.map((g, i) => ({ id: `g-${i}`, front: g.pattern, back: g.meaning, deck: "Grammar patterns", group: "Grammar and phrases", note: `${g.example}  ${g.translation}` })),
    ...phrases.map((p) => ({ id: `ph-${p.jp}`, front: p.jp, reading: p.romaji, back: p.en, deck: "Phrases", group: "Grammar and phrases" })),
  ];
}
