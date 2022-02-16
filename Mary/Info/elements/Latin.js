"use strict";

/* requires */
let {letters, caps, punctuation} = require("./English");

/* constants */
letters = letters.concat(["æ", "œ"]);
letters.splice(letters.indexOf("w"), 1);
// take j out?

caps = caps.concat(["Æ", "Œ"]);
caps.splice(caps.indexOf("W"), 1);

const combos =
  [ "̀" // Grave Accent
  , "́" // Acute Accent
  , "̂" // Circumflex Accent
  , "̈" // Diaeresis
  , "̄" // Macron
  , "̆" // Breve
  , "̇" // Dot Above
  , "̊" // Ring Above
  , "̃" // Tilde
  , "̧" // Cedilla
  , "̨" // Ogonek
  , "̏" // Double Grave Accent
  , "̋" // Double Acute Accent
  , "̌" // Caron
  , "̑" // Inverted Breve
  ];

/* module */
const elements =
  { get letters()     { return Array.from(letters) }
  , get caps()        { return Array.from(caps) }
  , get punctuation() { return Array.from(punctuation) }
  , get combos()      { return Array.from(combos) }
  };

/* exports */
module.exports = elements;
