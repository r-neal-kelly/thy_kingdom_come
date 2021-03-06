"use strict";

/* requires */
const utils = Mary.require("Utils");

/* components */
const ʹ = require("./commons");

/* constants */
const Greek = new Map();

/* Brenton's Greek OT */
Greek.set("Brenton's Greek OT", new Map([
  ["Genesis", {chaps: ʹ(50), alt: "ΓΕΝΕΣΙΣ"}],
  ["Exodus", {chaps: ʹ(40), alt: "ΕΞΟΔΟΣ"}],
  ["Leviticus", {chaps: ʹ(27), alt: "ΛΕΥΙΤΙΚΟΝ"}],
  ["Numbers", {chaps: ʹ(36), alt: "ΑΡΙΘΜΟΙ"}],
  ["Deuteronomy", {chaps: ʹ(34), alt: "ΔΕΥΤΕΡΟΝΟΜΙΟΝ"}],
  ["Joshua", {chaps: ʹ(24), alt: "ΙΗΣΟΥΣ ΝΑΥΗ"}],
  ["Judges", {chaps: ʹ(21), alt: "ΚΡΙΤΑΙ"}],
  ["Ruth", {chaps: ʹ(4), alt: "ΡΟΥΘ"}],
  ["1 Samuel", {chaps: ʹ(31), alt: "ΒΑΣΙΛΕΙΩΝ Αʹ/ΣΑΜΟΥΗΛ Αʹ"}],
  ["2 Samuel", {chaps: ʹ(24), alt: "ΒΑΣΙΛΕΙΩΝ Βʹ/ΣΑΝΟΥΗΛ Βʹ"}],
  ["1 Kings", {chaps: ʹ(22), alt: "ΒΑΣΙΛΕΙΩΝ Γʹ/ΒΑΣΙΛΕΙΩΝ Αʹ"}],
  ["2 Kings", {chaps: ʹ(25), alt: "ΒΑΣΙΛΕΙΩΝ Δʹ/ΒΑΣΙΛΕΙΩΝ Βʹ"}],
  ["1 Chronicles", {chaps: ʹ(29), alt: "ΠΑΡΑΛΕΙΠΟΜΕΝΩΝ Αʹ/ΧΡΟΝΙΚΩΝ Αʹ"}],
  ["2 Chronicles", {chaps: ʹ(36), alt: "ΠΑΡΑΛΕΙΠΟΜΕΝΩΝ Βʹ/ΧΡΟΝΙΚΩΝ Βʹ"}],
  ["Ezra", {chaps: ʹ(10), alt: "ΕΣΔΡΑΣ"}],
  ["Nehemiah", {chaps: ʹ(13), alt: "ΝΕΕΜΙΑΣ"}],
  ["Esther", {chaps: ʹ(10), alt: "ΕΣΘΗΡ"}],
  ["Job", {chaps: ʹ(42), alt: "ΙΩΒ"}],
  ["Psalms", {chaps: ʹ(150), alt: "ΨΑΛΜΟΙ"}],
  ["Proverbs", {chaps: ʹ(29), alt: "ΠΑΡΟΙΜΙΑΙ"}],
  ["Ecclesiastes", {chaps: ʹ(12), alt: "ΕΚΚΛΗΣΙΑΣΤΗΣ"}],
  ["Song of Solomon", {chaps: ʹ(8), alt: "ΑΣΜΑ/ΑΣΜΑ ΑΣΜΑΤΩΝ"}],
  ["Isaiah", {chaps: ʹ(66), alt: "ΗΣΑΙΑΣ"}],
  ["Jeremiah", {chaps: ʹ(52), alt: "ΙΕΡΕΜΙΑΣ"}],
  ["Lamentations", {chaps: ʹ(5), alt: "ΘΡΗΝΟΙ/ΘΡΗΝΟΙ ΙΕΡΕΜΙΟΥ"}],
  ["Ezekiel", {chaps: ʹ(48), alt: "ΙΕΖΕΚΙΗΛ"}],
  ["Daniel", {chaps: ʹ(12), alt: "ΔΑΝΙΗΛ"}],
  ["Hosea", {chaps: ʹ(14), alt: "ΩΣΗΕ"}],
  ["Joel", {chaps: ʹ(3), alt: "ΙΩΗΛ"}],
  ["Amos", {chaps: ʹ(9), alt: "ΑΜΩΣ"}],
  ["Obadiah", {chaps: ʹ(1), alt: "ΟΒΔΙΟΥ"}],
  ["Jonah", {chaps: ʹ(4), alt: "ΙΩΝΑΣ"}],
  ["Micah", {chaps: ʹ(7), alt: "ΜΙΧΑΙΑΣ"}],
  ["Nahum", {chaps: ʹ(3), alt: "ΝΑΟΥΜ"}],
  ["Habakkuk", {chaps: ʹ(3), alt: "ΑΜΒΑΚΟΥΜ"}],
  ["Zephaniah", {chaps: ʹ(3), alt: "ΣΟΦΟΝΙΑΣ"}],
  ["Haggai", {chaps: ʹ(2), alt: "ΑΓΓΑΙΟΣ"}],
  ["Zechariah", {chaps: ʹ(14), alt: "ΖΑΧΑΡΙΑΣ"}],
  ["Malachi", {chaps: ʹ(4), alt: "ΜΑΛΑΧΙΑΣ/ΑΓΓΕΛΟΣ"}],
  ["1 Esdras", {chaps: ʹ(9), alt: "ΕΣΔΡΑΣ Αʹ"}],
  ["Tobit", {chaps: ʹ(14), alt: "ΤΩΒΙΤ"}],
  ["Judith", {chaps: ʹ(16), alt: "ΙΟΥΔΙΘ"}],
  ["Wisdom of Solomon", {chaps: ʹ(19), alt: "ΣΟΦΙΑ ΣΑΛΩΜΩΝΟΣ"}],
  ["Ecclesiasticus", {chaps: ʹ(51), alt: "ΣΟΦΙΑ ΣΙΡΑΧ"}],
  ["Baruch", {chaps: ʹ(5), alt: "ΒΑΡΟΥΧ"}],
  ["Epistle of Jeremiah", {chaps: ʹ(1), alt: "ΕΠΙΣΤΟΛΗ ΙΕΡΕΜΙΟΥ"}],
  ["Song of the Three Children", {chaps: ʹ(1), alt: "ΤΩΝ ΤΡΙΩΝ ΠΑΙΔΩΝ ΑΙΝΕΣΙΣ"}],
  ["Susanna", {chaps: ʹ(1), alt: "ΣΟΥΣΑΝΝΑ"}],
  ["Bel and the Dragon", {chaps: ʹ(1), alt: "ΒΗΛ ΚΑΙ ΔΡΑΚΩΝ"}],
  ["1 Maccabees", {chaps: ʹ(16), alt: "ΜΑΚΚΑΒΑΙΩΝ Αʹ"}],
  ["2 Maccabees", {chaps: ʹ(15), alt: "ΜΑΚΚΑΒΑΙΩΝ Βʹ"}],
  ["3 Maccabees", {chaps: ʹ(7), alt: "ΜΑΚΚΑΒΑΙΩΝ Γʹ"}],
  ["4 Maccabees", {chaps: ʹ(18), alt: "ΜΑΚΚΑΒΑΙΩΝ Δʹ"}],
  ["Prayer of Manasseh", {chaps: ʹ(1), alt: "ΠΡΟΣΕΥΧΗ ΜΑΝΑΣΣΗ"}]
]));

/* Rahlfs' Greek OT */
Greek.set("Rahlfs' Greek OT", new Map([
  ["Genesis", {chaps: ʹ(50), alt: "ΓΕΝΕΣΙΣ"}],
  ["Exodus", {chaps: ʹ(40), alt: "ΕΞΟΔΟΣ"}],
  ["Leviticus", {chaps: ʹ(27), alt: "ΛΕΥΙΤΙΚΟΝ"}],
  ["Numbers", {chaps: ʹ(36), alt: "ΑΡΙΘΜΟΙ"}],
  ["Deuteronomy", {chaps: ʹ(34), alt: "ΔΕΥΤΕΡΟΝΟΜΙΟΝ"}],
  ["Joshua (Vaticanus)", {chaps: ʹ(24), alt: "ΙΗΣΟΥΣ (ΒΑΤΙΚΑΝΟΣ)"}],
  ["Joshua (Alexandrinus)", {chaps: ʹ("15,18,19"), alt: "ΙΗΣΟΥΣ (ΑΛΕΞΑΝΔΡΙΝΟΣ)"}],
  ["Judges (Alexandrinus)", {chaps: ʹ(21), alt: "ΚΡΙΤΑΙ (ΑΛΕΞΑΝΔΡΙΝΟΣ)"}],
  ["Judges (Vaticanus)", {chaps: ʹ(21), alt: "ΚΡΙΤΑΙ (ΒΑΤΙΚΑΝΟΣ)"}],
  ["Ruth", {chaps: ʹ(4), alt: "ΡΟΥΘ"}],
  ["1 Samuel", {chaps: ʹ(31), alt: "ΒΑΣΙΛΕΙΩΝ Αʹ/ΣΑΜΟΥΗΛ Αʹ"}],
  ["2 Samuel", {chaps: ʹ(24), alt: "ΒΑΣΙΛΕΙΩΝ Βʹ/ΣΑΝΟΥΗΛ Βʹ"}],
  ["1 Kings", {chaps: ʹ(22), alt: "ΒΑΣΙΛΕΙΩΝ Γʹ/ΒΑΣΙΛΕΙΩΝ Αʹ"}],
  ["2 Kings", {chaps: ʹ(25), alt: "ΒΑΣΙΛΕΙΩΝ Δʹ/ΒΑΣΙΛΕΙΩΝ Βʹ"}],
  ["1 Chronicles", {chaps: ʹ(29), alt: "ΠΑΡΑΛΕΙΠΟΜΕΝΩΝ Αʹ/ΧΡΟΝΙΚΩΝ Αʹ"}],
  ["2 Chronicles", {chaps: ʹ(36), alt: "ΠΑΡΑΛΕΙΠΟΜΕΝΩΝ Βʹ/ΧΡΟΝΙΚΩΝ Βʹ"}],
  ["1 Esdras", {chaps: ʹ(9), alt: "ΕΣΔΡΑΣ Αʹ"}],
  ["Ezra and Nehemiah", {chaps: ʹ(23), alt: "ΕΣΔΡΑΣ Βʹ/ΕΣΔΡΑΣ ΚΑΙ ΝΕΕΜΙΑΣ"}],
  ["Esther", {chaps: ʹ(10), alt: "ΕΣΘΗΡ"}],
  ["Judith", {chaps: ʹ(16), alt: "ΙΟΥΔΙΘ"}],
  ["Tobit", {chaps: ʹ(14), alt: "ΤΩΒΙΤ"}],
  ["Tobit (Sinaiticus)", {chaps: ʹ(14), alt: "ΤΩΒΙΤ (ΣΙΝΑΙΤΙΚΟΣ)"}],
  ["1 Maccabees", {chaps: ʹ(16), alt: "ΜΑΚΚΑΒΑΙΩΝ Αʹ"}],
  ["2 Maccabees", {chaps: ʹ(15), alt: "ΜΑΚΚΑΒΑΙΩΝ Βʹ"}],
  ["3 Maccabees", {chaps: ʹ(7), alt: "ΜΑΚΚΑΒΑΙΩΝ Γʹ"}],
  ["4 Maccabees", {chaps: ʹ(18), alt: "ΜΑΚΚΑΒΑΙΩΝ Δʹ"}],
  ["Psalms", {chaps: ʹ(151), alt: "ΨΑΛΜΟΙ"}],
  ["Book of Odes", {chaps: ʹ(14), alt: "ΩΔΑΙ"}], // possibly 15???
  ["Proverbs", {chaps: ʹ(34), alt: "ΠΑΡΟΙΜΙΑΙ"}], // need to do chap str
  ["Ecclesiastes", {chaps: ʹ(12), alt: "ΕΚΚΛΗΣΙΑΣΤΗΣ"}],
  ["Song of Solomon", {chaps: ʹ(8), alt: "ΑΣΜΑ/ΑΣΜΑ ΑΣΜΑΤΩΝ"}],
  ["Job", {chaps: ʹ(42), alt: "ΙΩΒ"}],
  ["Wisdom of Solomon", {chaps: ʹ(19), alt: "ΣΟΦΙΑ ΣΑΛΩΜΩΝΟΣ"}],
  ["Ecclesiasticus", {chaps: ʹ("P,1-51"), alt: "ΣΟΦΙΑ ΣΙΡΑΧ"}], // P = Prologue
  ["Psalms of Solomon", {chaps: ʹ(18), alt: "ΨΑΛΜΟΙ ΣΟΛΟΜΩΝΤΟΣ"}],
  ["Hosea", {chaps: ʹ(14), alt: "ΩΣΗΕ"}],
  ["Amos", {chaps: ʹ(9), alt: "ΑΜΩΣ"}],
  ["Micah", {chaps: ʹ(7), alt: "ΜΙΧΑΙΑΣ"}],
  ["Joel", {chaps: ʹ(4), alt: "ΙΩΗΛ"}],
  ["Obadiah", {chaps: ʹ(1), alt: "ΑΒΔΙΟΥ"}],
  ["Jonah", {chaps: ʹ(4), alt: "ΙΩΝΑΣ"}],
  ["Nahum", {chaps: ʹ(3), alt: "ΝΑΟΥΜ"}],
  ["Habakkuk", {chaps: ʹ(3), alt: "ΑΜΒΑΚΟΥΜ"}],
  ["Zephaniah", {chaps: ʹ(3), alt: "ΣΟΦΟΝΙΑΣ"}],
  ["Haggai", {chaps: ʹ(2), alt: "ΑΓΓΑΙΟΣ"}],
  ["Zechariah", {chaps: ʹ(14), alt: "ΖΑΧΑΡΙΑΣ"}],
  ["Malachi", {chaps: ʹ(3), alt: "ΜΑΛΑΧΙΑΣ/ΑΓΓΕΛΟΣ"}],
  ["Isaiah", {chaps: ʹ(66), alt: "ΗΣΑΙΑΣ"}],
  ["Jeremiah", {chaps: ʹ(52), alt: "ΙΕΡΕΜΙΑΣ"}],
  ["Baruch", {chaps: ʹ(5), alt: "ΒΑΡΟΥΧ"}],
  ["Lamentations", {chaps: ʹ(5), alt: "ΘΡΗΝΟΙ/ΘΡΗΝΟΙ ΙΕΡΕΜΙΟΥ"}],
  ["Epistle of Jeremiah", {chaps: ʹ(1), alt: "ΕΠΙΣΤΟΛΗ ΙΕΡΕΜΙΟΥ"}],
  ["Ezekiel", {chaps: ʹ(48), alt: "ΙΕΖΕΚΙΗΛ"}],
  ["Susanna", {chaps: ʹ(1), alt: "ΣΟΥΣΑΝΝΑ"}],
  ["Susanna (Theodotion)", {chaps: ʹ(1), alt: "ΣΟΥΣΑΝΝΑ (ΘΕΟΔΟΤΙΩΝ)"}],
  ["Daniel", {chaps: ʹ(12), alt: "ΔΑΝΙΗΛ"}],
  ["Daniel (Theodotion)", {chaps: ʹ(12), alt: "ΔΑΝΙΗΛ (ΘΕΟΔΟΤΙΩΝ)"}],
  ["Bel and the Dragon", {chaps: ʹ(1), alt: "ΒΗΛ ΚΑΙ ΔΡΑΚΩΝ"}],
  ["Bel and the Dragon (Theodotion)", {chaps: ʹ(1), alt: "ΒΗΛ ΚΑΙ ΔΡΑΚΩΝ (ΘΕΟΔΟΤΙΩΝ)"}]
]));

/* Alford's Greek NT */
Greek.set("Alford's Greek NT", new Map([
  ["Matthew", {chaps: ʹ(28), alt: "ΚΑΤΑ ΜΑΘΘΑΙΟΝ"}],
  ["Mark", {chaps: ʹ(16), alt: "ΚΑΤΑ ΜΑΡΚΟΝ"}],
  ["Luke", {chaps: ʹ(24), alt: "ΚΑΤΑ ΛΟΥΚΑΝ"}],
  ["John", {chaps: ʹ(21), alt: "ΚΑΤΑ ΙΩΑΝΝΗΝ"}],
  ["Acts", {chaps: ʹ(28), alt: "ΠΡΑΞΕΙΣ ΑΠΟΣΤΟΛΩΝ"}],
  ["Romans", {chaps: ʹ(16), alt: "ΠΡΟΣ ΡΩΜΑΙΟΥΣ"}],
  ["1 Corinthians", {chaps: ʹ(16), alt: "ΠΡΟΣ ΚΟΡΙΝΘΙΟΥΣ Αʹ"}],
  ["2 Corinthians", {chaps: ʹ(13), alt: "ΠΡΟΣ ΚΟΡΙΝΘΙΟΥΣ Βʹ"}],
  ["Galatians", {chaps: ʹ(6), alt: "ΠΡΟΣ ΓΑΛΑΤΑΣ"}],
  ["Ephesians", {chaps: ʹ(6), alt: "ΠΡΟΣ ΕΦΕΣΙΟΥΣ"}],
  ["Philippians", {chaps: ʹ(4), alt: "ΠΡΟΣ ΦΙΛΙΠΠΗΣΙΟΥΣ"}],
  ["Colossians", {chaps: ʹ(4), alt: "ΠΡΟΣ ΚΟΛΑΣΣΑΕΙΣ"}],
  ["1 Thessalonians", {chaps: ʹ(5), alt: "ΠΡΟΣ ΘΕΣΣΑΛΟΝΙΚΕΙΣ Αʹ"}],
  ["2 Thessalonians", {chaps: ʹ(3), alt: "ΠΡΟΣ ΘΕΣΣΑΛΟΝΙΚΕΙΣ Βʹ"}],
  ["1 Timothy", {chaps: ʹ(6), alt: "ΠΡΟΣ ΤΙΜΟΘΕΟΝ Αʹ"}],
  ["2 Timothy", {chaps: ʹ(4), alt: "ΠΡΟΣ ΤΙΜΟΘΕΟΝ Βʹ"}],
  ["Titus", {chaps: ʹ(3), alt: "ΠΡΟΣ ΤΙΤΟΝ"}],
  ["Philemon", {chaps: ʹ(1), alt: "ΠΡΟΣ ΦΙΛΗΜΟΝΑ"}],
  ["Hebrews", {chaps: ʹ(13), alt: "ΠΡΟΣ ΕΒΡΑΙΟΥΣ"}],
  ["James", {chaps: ʹ(5), alt: "ΙΑΚΩΒΟΥ ΕΠΙΣΤΟΛΗ"}],
  ["1 Peter", {chaps: ʹ(5), alt: "ΠΕΤΡΟΥ Αʹ"}],
  ["2 Peter", {chaps: ʹ(3), alt: "ΠΕΤΡΟΥ Βʹ"}],
  ["1 John", {chaps: ʹ(5), alt: "ΙΩΑΝΝΟΥ Αʹ"}],
  ["2 John", {chaps: ʹ(1), alt: "ΙΩΑΝΝΟΥ Βʹ"}],
  ["3 John", {chaps: ʹ(1), alt: "ΙΩΑΝΝΟΥ Γʹ"}],
  ["Jude", {chaps: ʹ(1), alt: "ΙΟΥΔΑ"}],
  ["Revelation", {chaps: ʹ(22), alt: "ΑΠΟΚΑΛΥΨΙΣ ΙΩΑΝΝΟΥ"}]
]));

/* exports */
module.exports = Greek;
