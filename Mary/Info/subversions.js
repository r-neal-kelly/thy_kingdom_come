"use strict";

/* requires */
const utils = Mary.require("Utils");

/* constants */
const subs = utils.newObj();

/* subversions */
subs["English"] =
  [ "Standard"
  ];

subs["Hebrew"] =
  [ "All Marks"
  , "Consonants"
  , "Niqqud"
  , "Te'amim"
  , "No Punc"
  , "Dot Space"
  ];

subs["Greek"] =
  [ "Polytonic"
  , "Monotonic"
  , "Atonic"
  , "No Punc"
  , "Majuscule"
  , "Minuscule"
  , "Majuscule+"
  , "Minuscule+"
  ];

subs["Latin"] =
  [ "Standard"
  // "Ligatures or not, diacritics"
  ];

subs["Ge'ez"] =
  [ "Vowels"
  , "Consonants"
  ];

/* exports */
module.exports = subs;
