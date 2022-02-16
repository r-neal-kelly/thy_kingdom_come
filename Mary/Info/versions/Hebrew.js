"use strict";

/* requires */
const utils = Mary.require("Utils");

/* components */
const ʹ = require("./commons");

/* constants */
const hebrew = new Map();

/* commons */
hebrew.set("Leningrad", new Map([
  ["Genesis", {chaps: ʹ(50), alt: "בְּרֵאשִׁית"}],
  ["Exodus", {chaps: ʹ(40), alt: "שְׁמוֹת"}],
  ["Leviticus", {chaps: ʹ(27), alt: "וַיִּקְרָא"}],
  ["Numbers", {chaps: ʹ(36), alt: "בְּמִדְבַּר"}],
  ["Deuteronomy", {chaps: ʹ(34), alt: "הַדְּבָרִים"}],
  ["Joshua", {chaps: ʹ(24), alt: "יְהוֹשֻׁעַ"}],
  ["Judges", {chaps: ʹ(21), alt: "שׁוֹפְטִים"}],
  ["1 Samuel", {chaps: ʹ(31), alt: "שְׁמוּאֵל א"}],
  ["2 Samuel", {chaps: ʹ(24), alt: "שְׁמוּאֵל ב"}],
  ["1 Kings", {chaps: ʹ(22), alt: "מְלָכִים א"}],
  ["2 Kings", {chaps: ʹ(25), alt: "מְלָכִים ב"}],
  ["Isaiah", {chaps: ʹ(66), alt: "יְשַׁעְיָהוּ"}],
  ["Jeremiah", {chaps: ʹ(52), alt: "יִרְמְיָהוּ"}],
  ["Ezekiel", {chaps: ʹ(48), alt: "יְחֶזְקֵאל"}],
  ["Hosea", {chaps: ʹ(14), alt: "הוֹשֵׁעַ"}],
  ["Joel", {chaps: ʹ(4), alt: "יוֹאֵל"}],
  ["Amos", {chaps: ʹ(9), alt: "עָמוֹס"}],
  ["Obadiah", {chaps: ʹ(1), alt: "עוֹבַדְיָה"}],
  ["Jonah", {chaps: ʹ(4), alt: "יוֹנָה"}],
  ["Micah", {chaps: ʹ(7), alt: "מִיכָה"}],
  ["Nahum", {chaps: ʹ(3), alt: "נַחוּם"}],
  ["Habakkuk", {chaps: ʹ(3), alt: "חֲבַקּוּק"}],
  ["Zephaniah", {chaps: ʹ(3), alt: "צְפַנְיָה"}],
  ["Haggai", {chaps: ʹ(2), alt: "חַגַּי"}],
  ["Zechariah", {chaps: ʹ(14), alt: "זְכַרְיָה"}],
  ["Malachi", {chaps: ʹ(3), alt: "מַלְאָכִי"}],
  ["1 Chronicles", {chaps: ʹ(29), alt: "דִּבְרֵי־הַיָּמִים א"}],
  ["2 Chronicles", {chaps: ʹ(36), alt: "דִּבְרֵי־הַיָּמִים ב"}],
  ["Psalms", {chaps: ʹ(150), alt: "תְּהִילִּים"}],
  ["Job", {chaps: ʹ(42), alt: "אִיּוֹב"}],
  ["Proverbs", {chaps: ʹ(31), alt: "מִשְׁלֵי"}],
  ["Ruth", {chaps: ʹ(4), alt: "רוּת"}],
  ["Song of Solomon", {chaps: ʹ(8), alt: "שִׁיר הַשִּׁירִים"}],
  ["Ecclesiastes", {chaps: ʹ(12), alt: "קֹהֶלֶת"}],
  ["Lamentations", {chaps: ʹ(5), alt: "אֵיכָה"}],
  ["Esther", {chaps: ʹ(10), alt: "אֶסְתֵּר"}],
  ["Daniel", {chaps: ʹ(12), alt: "דָּנִיֵּאל"}],
  ["Ezra", {chaps: ʹ(10), alt: "עֶזְרָא"}],
  ["Nehemiah", {chaps: ʹ(13), alt: "נְחֶמְיָה"}]
]));

/* exports */
module.exports = hebrew;
