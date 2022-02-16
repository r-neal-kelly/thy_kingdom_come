"use strict";

/* requires */
const {utils, info} = Mary;
const regex = Mary.regex["Hebrew"];

/* constants */
const { vowels
      , accents
      , combos
      , vowelsPlus
      , accentsPlus
      , combosPlus
      , allPuncPlus
      , allPuncPlusMinusSpace
      } = regex;

const toTransliteration = // should be an obj with pairs, inclu combos.
  [ "'a" // Aleph
  , "B"  // Bet
  , "G"  // Gimmel
  , "D"  // Dalet
  , "'h" // Hey
  , "'u" // Waw
  , "Z"  // Zayin
  , "Hh" // Hhet
  , "T"  // Tet
  , "'y" // Yodh
  , "K"  // Kaph
  , "L"  // Lamed
  , "M"  // Mem
  , "N"  // Nun
  , "S"  // Samek
  , "'o" // Ayin
  , "Ph" // Peh
  , "Ts" // Tsade
  , "Qu" // Qoph
  , "R"  // Resh
  , "Sh" // Shin
  , "Th" // Taw
  , "K"  // Final Kaph
  , "M"  // Final Mem
  , "N"  // Final Nun
  , "Ph" // Final Peh
  , "Ts" // Final Tsade
  ];

const toTranscription = {};

/* functions */
const byRegex = (regex, str, replace) => str.replace(regex, replace || "");

const byDict = (dict, str) => {
  const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
  for (let key of keys) {
    str = str.replace(new RegExp(key, "g"), dict[key]);
  }
  return str;
};

/* filters */
const filters = utils.newObj();
filters["All Marks"] = str => str;
filters["Consonants"] = str => byRegex(combos, str);
filters["Consonants+"] = str => byRegex(combosPlus, str);
filters["Niqqud"] = str => byRegex(accents, str);
filters["Niqqud+"] = str => byRegex(accentsPlus, str);
filters["Te'amim"] = str => byRegex(vowels, str);
filters["Te'amim+"] = str => byRegex(vowelsPlus, str);
filters["Transliteration"] = str => byDict(toTransliteration, str);
filters["Transcription"] = str => byDict(toTranscription, str);
filters["No Punc"] = str => byRegex(allPuncPlusMinusSpace, str);
filters["No Punc+"] = str => byRegex(allPuncPlus, str);
filters["Dot Space"] = str => byRegex(/\s/g, str, ".");
filters["Reg Space"] = str => byRegex(/\./g, str, " ");
// need to add qere

const filter = (types, str) => {
  types = [].concat(types);
  for (let type of types) {
    if (filters[type]) str = filters[type](str);
  }
  return str;
};

/* exports */
module.exports = filter;
