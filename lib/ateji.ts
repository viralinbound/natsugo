// Artistic kanji for names and words that have no kanji of their own, such as Priya or a brand name.
// Each sound (mora) of the katakana spelling is matched to a kanji that can be read with that sound and has a
// pleasant meaning. This is the old Japanese practice called ateji: it is creative, not an official spelling,
// and the same name can be written many ways. The first choice for each sound is the most graceful one.

import { toRomaji } from "@/lib/kanaConvert";

// romaji sound : kanji|meaning, kanji|meaning, ...
const TABLE = `
a:亜|grace,愛|love,阿|gentle,安|peace
i:唯|only one,伊|that one,依|trust,衣|robe
u:羽|feather,宇|universe,雨|rain,有|being
e:恵|blessing,絵|picture,江|river bay,慧|wisdom
o:桜|cherry blossom,緒|thread of life,央|centre,織|weaving
ka:花|flower,香|fragrance,華|splendour,佳|excellent
ki:希|hope,輝|shine,貴|precious,季|season
ku:久|everlasting,玖|dark jade,空|sky,来|to come
ke:恵|blessing,景|scenery,慶|celebration,圭|jade
ko:心|heart,湖|lake,琴|harp,光|light
sa:咲|bloom,彩|colour,紗|silk gauze,沙|sand
shi:詩|poem,志|aspiration,紫|purple,史|history
su:澄|clear,寿|long life,菫|violet,朱|vermilion
se:星|star,清|pure,聖|sacred,世|world
so:想|thought,奏|to play music,蒼|deep blue,颯|dashing
ta:多|abundant,太|great,汰|wash clean,他|others
chi:千|a thousand,智|wisdom,知|knowing,地|earth
tsu:月|moon,津|harbour,都|capital,鶴|crane
te:天|heaven,照|shining,哲|wise,手|hand
to:登|to climb,斗|dipper,都|capital,翔|soar
na:奈|grace,菜|greens,七|seven,那|beautiful
ni:虹|rainbow,仁|kindness,二|two,弐|second
nu:布|cloth,縫|to sew
ne:音|sound,寧|peaceful,根|root,祢|ancestral shrine
no:乃|of,野|field,望|wish,能|ability
ha:葉|leaf,波|wave,春|spring,羽|feather
hi:陽|sun,妃|princess,緋|scarlet,日|day
fu:芙|lotus,風|wind,普|universal,富|wealth
he:平|peaceful,辺|surroundings
ho:帆|sail,穂|ear of grain,歩|step,保|protect
ma:茉|jasmine,真|truth,舞|dance,麻|hemp
mi:美|beauty,実|fruit,深|deep,未|future
mu:夢|dream,睦|harmony,武|valour,無|pure void
me:芽|sprout,萌|bud,明|bright,愛|affection
mo:桃|peach,茂|flourishing,萌|budding,百|hundred
ya:弥|ever more,椰|palm,夜|night,耶|wondering
yu:優|gentle,結|bond,悠|calm and far,友|friend
yo:洋|ocean,陽|sunlight,世|world,葉|leaf
ra:蘭|orchid,良|good,羅|silk net,来|to come
ri:莉|jasmine,里|home village,理|reason,梨|pear blossom
ru:瑠|lapis lazuli,琉|jewel,留|to stay,流|flow
re:玲|jade chime,麗|lovely,礼|courtesy,怜|clever
ro:路|path,露|dew,朗|cheerful,呂|melody
wa:和|harmony,環|ring,輪|circle,羽|wing
n:音|sound,温|warmth,杏|apricot,円|circle
sha:紗|silk gauze,謝|thanks,舎|home
shu:珠|pearl,朱|vermilion,秀|excellent
sho:初|first,翔|soar,章|chapter
cha:茶|tea,謝|thanks
chu:忠|loyalty,柱|pillar
cho:蝶|butterfly,長|long,朝|morning
kyo:京|capital,響|echo,杏|apricot
kyu:球|jewel sphere,究|to seek,久|everlasting
hyo:氷|ice,豹|leopard
myo:妙|wondrous,明|bright
ryo:涼|cool,遼|far-reaching,凌|rise above
nyu:乳|milk,入|enter
`;

interface Choice {
  kanji: string;
  meaning: string;
}
const sounds: Record<string, Choice[]> = {};
for (const line of TABLE.trim().split("\n")) {
  const [key, rest] = line.split(":");
  sounds[key] = rest.split(",").map((x) => {
    const [kanji, meaning] = x.split("|");
    return { kanji, meaning };
  });
}

// The katakana spelling, cut into one chunk per sound: ア, リ, シャ, ティ ...
function moras(kana: string): string[] {
  const out: string[] = [];
  for (const ch of [...kana]) {
    if (/[ァィゥェォャュョ]/.test(ch) && out.length) out[out.length - 1] += ch;
    else if (ch === "ッ" || ch === "ー") continue;
    else if (/[ァ-ヴ]/.test(ch)) out.push(ch);
  }
  return out;
}

// Voiced and foreign sounds borrow the kanji of the nearest plain sound (ガ from カ, パ and バ from ハ ...).
function key(mora: string): string {
  let r = toRomaji(mora).replace(/[āīūēō]/g, (c) => ({ ā: "a", ī: "i", ū: "u", ē: "e", ō: "o" })[c] ?? c);
  r = r.replace(/^(.*)'$/, "$1");
  if (sounds[r]) return r;
  const rules: [RegExp, string][] = [
    [/^[pbv]u$|^hu$/, "fu"], [/^j([aueo])$/, "sh$1"], [/^ji$/, "shi"], [/^dzu$|^zu$/, "su"], [/^z(.)$/, "s$1"], [/^g(.)$/, "k$1"], [/^gy(.)$/, "ky$1"],
    [/^d([aeo])$/, "t$1"], [/^di$|^ti$|^dji$/, "chi"], [/^du$|^tu$/, "tsu"], [/^b(.)$/, "h$1"], [/^p(.)$/, "h$1"], [/^by(.)$/, "hy$1"], [/^py(.)$/, "hy$1"],
    [/^v(.)$/, "h$1"], [/^f([aeo])$/, "h$1"], [/^fi$/, "hi"], [/^w([ie])$/, "$1"], [/^wo$/, "o"], [/^sh([e])$/, "se"], [/^che$/, "se"], [/^je$/, "se"],
    [/^ts([aeo])$/, "tsu"],
  ];
  for (const [re, to] of rules) if (re.test(r) && sounds[r.replace(re, to)]) return r.replace(re, to);
  // A sound with no table entry, such as kya or nyo, is split into its consonant sound plus ya, yu or yo.
  const y = /^([a-z]+?)y([auo])$/.exec(r);
  if (y) return `${y[1]}i`;
  return "n";
}

export interface AtejiPart {
  mora: string;
  sound: string;
  kanji: string;
  meaning: string;
}
export interface Ateji {
  kanji: string;
  parts: AtejiPart[];
  said: string;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// seed 0 gives the most graceful spelling; each higher seed rotates the choices for a different spelling.
export function atejiFor(kana: string, seed = 0): Ateji | null {
  const list = moras(kana);
  if (!list.length || list.length > 8) return null;
  const parts: AtejiPart[] = [];
  list.forEach((mora, i) => {
    const options = sounds[key(mora)] ?? sounds.n;
    let pick = (seed + (seed ? i : 0)) % options.length;
    // Do not repeat the same kanji twice in a row.
    if (i && options[pick].kanji === parts[i - 1].kanji) pick = (pick + 1) % options.length;
    parts.push({ mora, sound: toRomaji(mora), kanji: options[pick].kanji, meaning: options[pick].meaning });
  });
  return { kanji: parts.map((p) => p.kanji).join(""), parts, said: cap(parts.map((p) => p.sound).join("-")) };
}
