"use strict";

/* requires */
const utils = Mary.require("Utils");

/* components */
const ʹ = require("./commons");

/* constants */
const latin = new Map();

/* Biblia Sacra 1914 */
latin.set("Biblia Sacra 1914", new Map([
  ["Genesis", {chaps: ʹ(50)}],
  ["Exodus", {chaps: ʹ(40)}],
  ["Leviticus", {chaps: ʹ(27)}],
  ["Numbers", {chaps: ʹ(36), alt: "Numeri"}],
  ["Deuteronomy", {chaps: ʹ(34), alt: "Deuteronomium"}],
  ["Joshua", {chaps: ʹ(24), alt: "Iosue"}],
  ["Judges", {chaps: ʹ(21), alt: "Iudicum"}],
  ["Ruth", {chaps: ʹ(4)}],
  ["1 Samuel", {chaps: ʹ(31), alt: "I Regum/I Samuelis"}],
  ["2 Samuel", {chaps: ʹ(24), alt: "II Regum/II Samuelis"}],
  ["1 Kings", {chaps: ʹ(22), alt: "III Regum"}],
  ["2 Kings", {chaps: ʹ(25), alt: "IV Regum"}],
  ["1 Chronicles", {chaps: ʹ(29), alt: "I Paralipomenon"}],
  ["2 Chronicles", {chaps: ʹ(36), alt: "II Paralipomenon"}],
  ["Ezra", {chaps: ʹ(10), alt: "I Esdræ"}],
  ["Nehemiah", {chaps: ʹ(13), alt: "II Esdræ/Nehemiæ"}],
  ["Tobit", {chaps: ʹ(14), alt: "Tobiæ"}],
  ["Judith", {chaps: ʹ(16), alt: "Iudith"}],
  ["Esther", {chaps: ʹ(16)}],
  ["Job", {chaps: ʹ(42), alt: "Iob"}],
  ["Psalms", {chaps: ʹ(150), alt: "Psalmi"}],
  ["Proverbs", {chaps: ʹ(31), alt: "Proverbia"}],
  ["Ecclesiastes", {chaps: ʹ(12)}],
  ["Song of Solomon", {chaps: ʹ(8), alt: "Canticum Canticorum"}],
  ["Wisdom of Solomon", {chaps: ʹ(19), alt: "Sapientiæ"}],
  ["Ecclesiasticus", {chaps: ʹ("P,1-51")}],
  ["Isaiah", {chaps: ʹ(66), alt: "Isaiæ"}],
  ["Jeremiah", {chaps: ʹ(52), alt: "Ieremiæ"}],
  ["Lamentations", {chaps: ʹ("P,1-5"), alt: "Lamentationes"}], // P = Prologue
  ["Baruch", {chaps: ʹ(6)}],
  ["Ezekiel", {chaps: ʹ(48), alt: "Ezechielis"}],
  ["Daniel", {chaps: ʹ(14), alt: "Danielis"}],
  ["Hosea", {chaps: ʹ(14), alt: "Osee"}],
  ["Joel", {chaps: ʹ(3), alt: "Ioel"}],
  ["Amos", {chaps: ʹ(9)}],
  ["Obadiah", {chaps: ʹ(1), alt: "Abdiæ"}],
  ["Jonah", {chaps: ʹ(4), alt: "Ionæ"}],
  ["Micah", {chaps: ʹ(7), alt: "Michææ"}],
  ["Nahum", {chaps: ʹ(3)}],
  ["Habakkuk", {chaps: ʹ(3), alt: "Habacuc"}],
  ["Zephaniah", {chaps: ʹ(3), alt: "Sophoniae"}],
  ["Haggai", {chaps: ʹ(2), alt: "Aggæi"}],
  ["Zechariah", {chaps: ʹ(14), alt: "Zachariæ"}],
  ["Malachi", {chaps: ʹ(4), alt: "Malachiæ"}],
  ["1 Maccabees", {chaps: ʹ(16), alt: "I Machabæorum"}],
  ["2 Maccabees", {chaps: ʹ(15), alt: "II Machabæorum"}],
  ["Matthew", {chaps: ʹ(28), alt: "secundum Matthæum"}],
  ["Mark", {chaps: ʹ(16), alt: "secundum Marcum"}],
  ["Luke", {chaps: ʹ(24), alt: "secundum Lucam"}],
  ["John", {chaps: ʹ(21), alt: "secundum Ioannem"}],
  ["Acts", {chaps: ʹ(28), alt: "Actus Apostolorum"}],
  ["Romans", {chaps: ʹ(16), alt: "ad Romanos"}],
  ["1 Corinthians", {chaps: ʹ(16), alt: "I ad Corinthios"}],
  ["2 Corinthians", {chaps: ʹ(13), alt: "II ad Corinthios"}],
  ["Galatians", {chaps: ʹ(6), alt: "ad Galatas"}],
  ["Ephesians", {chaps: ʹ(6), alt: "ad Ephesios"}],
  ["Philippians", {chaps: ʹ(4), alt: "ad Philippenses"}],
  ["Colossians", {chaps: ʹ(4), alt: "ad Colossenses"}],
  ["1 Thessalonians", {chaps: ʹ(5), alt: "I ad Thessalonicenses"}],
  ["2 Thessalonians", {chaps: ʹ(3), alt: "II ad Thessalonicenses"}],
  ["1 Timothy", {chaps: ʹ(6), alt: "I ad Timotheum"}],
  ["2 Timothy", {chaps: ʹ(4), alt: "II ad Timotheum"}],
  ["Titus", {chaps: ʹ(3), alt: "ad Titum"}],
  ["Philemon", {chaps: ʹ(1), alt: "ad Philemonem"}],
  ["Hebrews", {chaps: ʹ(13), alt: "ad Hebræos"}],
  ["James", {chaps: ʹ(5), alt: "Iacobi"}],
  ["1 Peter", {chaps: ʹ(5), alt: "I Petri"}],
  ["2 Peter", {chaps: ʹ(3), alt: "II Petri"}],
  ["1 John", {chaps: ʹ(5), alt: "I Ioannis"}],
  ["2 John", {chaps: ʹ(1), alt: "II Ioannis"}],
  ["3 John", {chaps: ʹ(1), alt: "III Ioannis"}],
  ["Jude", {chaps: ʹ(1), alt: "Iudæ"}],
  ["Revelation", {chaps: ʹ(22), alt: "Apocalypsis"}],
  ["Prayer of Manasseh", {chaps: ʹ(1), alt: "Oratio Manassæ regis"}],
  ["1 Esdras", {chaps: ʹ(9), alt: "III Esdræ"}],
  ["2 Esdras", {chaps: ʹ(16), alt: "IV Esdræ"}]
]));

/* Gutenberg */
// so cool! has diacritics!

/* Version Notes
  "Rest of Esther" is included in Esther
  "Letter of Jeremiah" is Baruch 6
  "Prayer of Azariah" is in between Daniel 3:23 and 24
  "Susanna" is Daniel 13
  "Bel and the Dragon" is Daniel 14
*/

// when it comes to Psalms 151, and Letter to the Laodicians, maybe that should be in Apocrypha collection...?

// when it comes to prologues, perhaps set an option in book obj, to set a "0" or "P" chapter, or an explicit chapter listing. Could give a "start" property, so Lamentations here would start at 0, and Aleppo codex would start were necessary for whatever is missing.

/* exports */
module.exports = latin;
