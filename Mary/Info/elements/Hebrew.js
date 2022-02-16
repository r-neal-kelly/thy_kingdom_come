"use strict";

/* requires */

/* constants */
const letters =
  [ "א" // Aleph
  , "ב" // Bet
  , "ג" // Gimmel
  , "ד" // Dalet
  , "ה" // Hey
  , "ו" // Waw
  , "ז" // Zayin
  , "ח" // Hhet
  , "ט" // Tet
  , "י" // Yodh
  , "כ" // Kaph
  , "ל" // Lamed
  , "מ" // Mem
  , "נ" // Nun
  , "ס" // Samek
  , "ע" // Ayin
  , "פ" // Peh
  , "צ" // Tsade
  , "ק" // Qoph
  , "ר" // Resh
  , "ש" // Shin
  , "ת" // Taw
  , "ך" // Final Kaph
  , "ם" // Final Mem
  , "ן" // Final Nun
  , "ף" // Final Peh
  , "ץ" // Final Tsade
  ];

const punctuation =
  [ "־" // Maqaf
  , "׀" // Pasuq
  , "׃" // Sof Pasuq
  , "׳" // Geresh
  , "״" // Gereshyim
  , "﬩" // Plus Sign
  , "₪" // Shekel
  , "׆" // Nun Hafukha
  , " " // Space
  , "." // Full Stop
  ];

const vowels =
  [ "ְ" // Sheva
  , "ֱ" // Hataf Segol
  , "ֲ" // Hataf Patah
  , "ֳ" // Hataf Qamats
  , "ִ" // Hiriq
  , "ֵ" // Tsere
  , "ֶ" // Segol
  , "ַ" // Patah
  , "ָ" // Qamats
  , "ֹ" // Holam (it's there)
  , "ֺ" // Holam for Waw (it's there)
  , "ֻ" // Qubuts
  , "ּ" // Dagesh
  , "ׁ" // Shin Dot
  , "ׂ" // Sin Dot
  , "ׇ" // Qamats Qatan
  , "ֿ" // Rafe
  ];

const accents =
  [ "֑" // Ethnahta
  , "֒" // Segol
  , "֓" // Shalshelet
  , "֔" // Zaqef Qatan
  , "֕" // Zaqef Gadol
  , "֖" // Tipeha
  , "֗" // Revia
  , "֘" // Zarqa
  , "֙" // Pashta
  , "֚" // Yetiv
  , "֛" // Tevir
  , "֜" // Geresh
  , "֝" // Geresh Muqdam
  , "֞" // Gershayim
  , "֟" // Qarney Para
  , "֠" // Telisha Gedola
  , "֡" // Pazer
  , "֢" // Hafukh
  , "֣" // Munah
  , "֤" // Mahapakh
  , "֥" // Merkha
  , "֦" // Merkha Kefula
  , "֧" // Darga
  , "֨" // Qadma
  , "֩" // Telisha Qetana
  , "֪" // Yerah Ben Yomo
  , "֫" // Ole
  , "֬" // Iluy
  , "֭" // Dehi
  , "֮" // Zinor
  , "ֽ" // Meteg
  , "ׄ" // Upper Dot
  , "ׅ" // Lower Dot
  , "ﬞ" // Varika
  ];

const controls =
  [ "\u200D"  // Zero Width Joiner
  ];

const combos = [].concat(vowels, accents, controls);

const extra =
  [ "֯" // Masora Circle
  ];

const markers =
  [ "נכ׆"  // Ketiv Open
  , "נכ׆"  // Ketiv Close
  , "נק׆"  // Qere Open
  , "נ׀ק׆" // Qere Close
  ];

/* module */
const elements =
  { get letters()     { return Array.from(letters) }
  , get caps()        { return Array.from(letters) }
  , get punctuation() { return Array.from(punctuation) }
  , get vowels()      { return Array.from(vowels) }
  , get accents()     { return Array.from(accents) }
  , get controls()    { return Array.from(controls) }
  , get combos()      { return Array.from(combos) }
  , get extra()       { return Array.from(extra) }
  , get markers()     { return Array.from(markers) }
  };

/* exports */
module.exports = elements;
