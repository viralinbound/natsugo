export interface Word {
  jp: string;
  reading: string;
  romaji: string;
  meaning: string;
  example_jp: string;
  example_en: string;
  level: string;
}

export const words: Word[] = [
  { jp: "頑張る", reading: "がんばる", romaji: "ganbaru", meaning: "to do one's best, to hang in there", example_jp: "試験、頑張ってください！", example_en: "Good luck with your exam!", level: "N4" },
  { jp: "桜", reading: "さくら", romaji: "sakura", meaning: "cherry blossom", example_jp: "桜がきれいです。", example_en: "The cherry blossoms are beautiful.", level: "N5" },
  { jp: "勉強", reading: "べんきょう", romaji: "benkyō", meaning: "study", example_jp: "毎日日本語を勉強します。", example_en: "I study Japanese every day.", level: "N5" },
  { jp: "友達", reading: "ともだち", romaji: "tomodachi", meaning: "friend", example_jp: "友達と映画を見ました。", example_en: "I watched a movie with a friend.", level: "N5" },
  { jp: "約束", reading: "やくそく", romaji: "yakusoku", meaning: "promise, appointment", example_jp: "約束を守ります。", example_en: "I keep my promises.", level: "N4" },
  { jp: "木漏れ日", reading: "こもれび", romaji: "komorebi", meaning: "sunlight filtering through trees", example_jp: "木漏れ日が気持ちいい。", example_en: "The sunlight through the trees feels nice.", level: "N2" },
  { jp: "美味しい", reading: "おいしい", romaji: "oishii", meaning: "delicious", example_jp: "このカレーは美味しいです。", example_en: "This curry is delicious.", level: "N5" },
  { jp: "仕事", reading: "しごと", romaji: "shigoto", meaning: "work, job", example_jp: "今日は仕事が忙しいです。", example_en: "Work is busy today.", level: "N5" },
  { jp: "練習", reading: "れんしゅう", romaji: "renshū", meaning: "practice", example_jp: "会話の練習をしましょう。", example_en: "Let's practise conversation.", level: "N4" },
  { jp: "夢", reading: "ゆめ", romaji: "yume", meaning: "dream", example_jp: "日本で働くのが夢です。", example_en: "My dream is to work in Japan.", level: "N4" },
  { jp: "一期一会", reading: "いちごいちえ", romaji: "ichigo ichie", meaning: "a once-in-a-lifetime encounter", example_jp: "一期一会を大切にします。", example_en: "I treasure every encounter.", level: "N1" },
  { jp: "旅行", reading: "りょこう", romaji: "ryokō", meaning: "travel, trip", example_jp: "来年、日本へ旅行します。", example_en: "I'll travel to Japan next year.", level: "N5" },
  { jp: "大丈夫", reading: "だいじょうぶ", romaji: "daijōbu", meaning: "okay, all right", example_jp: "大丈夫ですか。", example_en: "Are you okay?", level: "N5" },
  { jp: "経験", reading: "けいけん", romaji: "keiken", meaning: "experience", example_jp: "いい経験になりました。", example_en: "It was a good experience.", level: "N3" },
  { jp: "水", reading: "みず", romaji: "mizu", meaning: "water", example_jp: "水をください。", example_en: "Please give me water.", level: "N5" },
  { jp: "学校", reading: "がっこう", romaji: "gakkō", meaning: "school", example_jp: "学校へ行きます。", example_en: "I go to school.", level: "N5" },
  { jp: "電車", reading: "でんしゃ", romaji: "densha", meaning: "train", example_jp: "電車で会社へ行きます。", example_en: "I go to work by train.", level: "N5" },
  { jp: "朝ご飯", reading: "あさごはん", romaji: "asagohan", meaning: "breakfast", example_jp: "朝ご飯を食べました。", example_en: "I ate breakfast.", level: "N5" },
  { jp: "天気", reading: "てんき", romaji: "tenki", meaning: "weather", example_jp: "今日はいい天気です。", example_en: "The weather is nice today.", level: "N5" },
  { jp: "先生", reading: "せんせい", romaji: "sensei", meaning: "teacher", example_jp: "先生は優しいです。", example_en: "The teacher is kind.", level: "N5" },
  { jp: "家族", reading: "かぞく", romaji: "kazoku", meaning: "family", example_jp: "家族は四人です。", example_en: "There are four people in my family.", level: "N5" },
  { jp: "犬", reading: "いぬ", romaji: "inu", meaning: "dog", example_jp: "犬が好きです。", example_en: "I like dogs.", level: "N5" },
  { jp: "買い物", reading: "かいもの", romaji: "kaimono", meaning: "shopping", example_jp: "週末に買い物をします。", example_en: "I go shopping on weekends.", level: "N5" },
  { jp: "駅", reading: "えき", romaji: "eki", meaning: "station", example_jp: "駅はどこですか。", example_en: "Where is the station?", level: "N5" },
  { jp: "時間", reading: "じかん", romaji: "jikan", meaning: "time", example_jp: "時間がありません。", example_en: "I don't have time.", level: "N5" },
  { jp: "言葉", reading: "ことば", romaji: "kotoba", meaning: "word, language", example_jp: "新しい言葉を覚えました。", example_en: "I learned a new word.", level: "N5" },
  { jp: "元気", reading: "げんき", romaji: "genki", meaning: "healthy, energetic", example_jp: "お元気ですか。", example_en: "How are you?", level: "N5" },
  { jp: "休み", reading: "やすみ", romaji: "yasumi", meaning: "day off, holiday", example_jp: "明日は休みです。", example_en: "Tomorrow is a day off.", level: "N5" },
  { jp: "音楽", reading: "おんがく", romaji: "ongaku", meaning: "music", example_jp: "毎晩、音楽を聞きます。", example_en: "I listen to music every night.", level: "N5" },
  { jp: "映画", reading: "えいが", romaji: "eiga", meaning: "movie", example_jp: "昨日、映画を見ました。", example_en: "I watched a movie yesterday.", level: "N5" },
  { jp: "料理", reading: "りょうり", romaji: "ryōri", meaning: "cooking, a dish", example_jp: "母の料理は美味しいです。", example_en: "My mother's cooking is delicious.", level: "N5" },
  { jp: "準備", reading: "じゅんび", romaji: "junbi", meaning: "preparation", example_jp: "旅行の準備をします。", example_en: "I prepare for the trip.", level: "N4" },
  { jp: "相談", reading: "そうだん", romaji: "sōdan", meaning: "consultation, talking it over", example_jp: "先生に相談します。", example_en: "I will talk it over with my teacher.", level: "N4" },
  { jp: "習慣", reading: "しゅうかん", romaji: "shūkan", meaning: "habit", example_jp: "早く起きる習慣があります。", example_en: "I have a habit of waking up early.", level: "N4" },
  { jp: "景色", reading: "けしき", romaji: "keshiki", meaning: "scenery", example_jp: "山の景色がきれいです。", example_en: "The mountain scenery is beautiful.", level: "N4" },
  { jp: "季節", reading: "きせつ", romaji: "kisetsu", meaning: "season", example_jp: "好きな季節は春です。", example_en: "My favourite season is spring.", level: "N4" },
  { jp: "思い出", reading: "おもいで", romaji: "omoide", meaning: "memory", example_jp: "楽しい思い出ができました。", example_en: "I made happy memories.", level: "N4" },
  { jp: "笑顔", reading: "えがお", romaji: "egao", meaning: "smile", example_jp: "笑顔で挨拶します。", example_en: "I greet people with a smile.", level: "N4" },
  { jp: "挑戦", reading: "ちょうせん", romaji: "chōsen", meaning: "challenge", example_jp: "新しいことに挑戦します。", example_en: "I take on new challenges.", level: "N4" },
  { jp: "目標", reading: "もくひょう", romaji: "mokuhyō", meaning: "goal", example_jp: "目標はN3に合格することです。", example_en: "My goal is to pass N3.", level: "N4" },
  { jp: "心配", reading: "しんぱい", romaji: "shinpai", meaning: "worry", example_jp: "心配しないでください。", example_en: "Please don't worry.", level: "N4" },
  { jp: "丁寧", reading: "ていねい", romaji: "teinei", meaning: "polite, careful", example_jp: "丁寧に説明します。", example_en: "I explain it carefully.", level: "N4" },
  { jp: "続ける", reading: "つづける", romaji: "tsuzukeru", meaning: "to continue", example_jp: "毎日勉強を続けます。", example_en: "I keep studying every day.", level: "N4" },
  { jp: "感謝", reading: "かんしゃ", romaji: "kansha", meaning: "gratitude", example_jp: "皆さんに感謝しています。", example_en: "I am grateful to everyone.", level: "N4" },
  { jp: "趣味", reading: "しゅみ", romaji: "shumi", meaning: "hobby", example_jp: "趣味は写真です。", example_en: "My hobby is photography.", level: "N4" },
  { jp: "花見", reading: "はなみ", romaji: "hanami", meaning: "cherry blossom viewing", example_jp: "春に花見をします。", example_en: "We go cherry blossom viewing in spring.", level: "N4" },
  { jp: "祭り", reading: "まつり", romaji: "matsuri", meaning: "festival", example_jp: "夏祭りに行きました。", example_en: "I went to a summer festival.", level: "N4" },
  { jp: "温泉", reading: "おんせん", romaji: "onsen", meaning: "hot spring", example_jp: "温泉でゆっくりしました。", example_en: "I relaxed at a hot spring.", level: "N4" },
  { jp: "努力", reading: "どりょく", romaji: "doryoku", meaning: "effort", example_jp: "努力は必ず報われます。", example_en: "Effort is always rewarded.", level: "N3" },
  { jp: "成長", reading: "せいちょう", romaji: "seichō", meaning: "growth", example_jp: "一年で大きく成長しました。", example_en: "I grew a lot in one year.", level: "N3" },
  { jp: "偶然", reading: "ぐうぜん", romaji: "gūzen", meaning: "coincidence, by chance", example_jp: "駅で偶然友達に会いました。", example_en: "I met a friend by chance at the station.", level: "N3" },
  { jp: "尊敬", reading: "そんけい", romaji: "sonkei", meaning: "respect", example_jp: "先生を尊敬しています。", example_en: "I respect my teacher.", level: "N3" },
  { jp: "伝統", reading: "でんとう", romaji: "dentō", meaning: "tradition", example_jp: "日本の伝統を学びます。", example_en: "I study Japanese traditions.", level: "N3" },
  { jp: "魅力", reading: "みりょく", romaji: "miryoku", meaning: "charm, appeal", example_jp: "この町には魅力があります。", example_en: "This town has charm.", level: "N3" },
  { jp: "気持ち", reading: "きもち", romaji: "kimochi", meaning: "feeling", example_jp: "気持ちを言葉にします。", example_en: "I put my feelings into words.", level: "N3" },
  { jp: "意味", reading: "いみ", romaji: "imi", meaning: "meaning", example_jp: "この言葉の意味を教えてください。", example_en: "Please tell me the meaning of this word.", level: "N3" },
  { jp: "安心", reading: "あんしん", romaji: "anshin", meaning: "relief, peace of mind", example_jp: "聞いて安心しました。", example_en: "I was relieved to hear that.", level: "N3" },
  { jp: "理想", reading: "りそう", romaji: "risō", meaning: "ideal", example_jp: "理想の生活を考えます。", example_en: "I think about my ideal life.", level: "N3" },
  { jp: "縁", reading: "えん", romaji: "en", meaning: "fate, a bond between people", example_jp: "いい縁に恵まれました。", example_en: "I was blessed with good connections.", level: "N2" },
  { jp: "絆", reading: "きずな", romaji: "kizuna", meaning: "bond, ties", example_jp: "家族の絆は大切です。", example_en: "Family bonds are important.", level: "N1" },
  { jp: "侘び寂び", reading: "わびさび", romaji: "wabi-sabi", meaning: "beauty in what is simple and imperfect", example_jp: "侘び寂びの美しさを感じます。", example_en: "I feel the beauty of wabi-sabi.", level: "N1" },
];

// Same word for everyone on a given IST date. The list is put in a fixed pseudo-random order first, so the
// levels are mixed day to day, and the word changes on its own at midnight IST with no one touching anything.
const hash = (t: string) => {
  let h = 2166136261;
  for (const c of t) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
};
export function wordForDate(list: Word[], date = new Date()) {
  const ist = new Date(date.getTime() + 5.5 * 3600_000);
  const day = Math.floor(ist.getTime() / 86_400_000);
  const order = [...list].sort((a, b) => hash(a.jp) - hash(b.jp));
  return order[day % order.length];
}
