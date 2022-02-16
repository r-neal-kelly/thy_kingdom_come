"use strict";

/* requires */
const utils = Mary.require("Utils");
const info = Mary.require("Info");

/* constants */
const regex = utils.newObj();
const escape = utils.escapeRegex;
const langs = ["English", "Hebrew", "Greek", "Latin"];
const puncExcludes = /['᾽]/g; // these can be nonPunc.

// globals
regex.comma = /\s*,\s*/;

// elements
for (let lang of langs) {
  // punc
  const punc = escape(info.getPunctuation(lang).join(""));
  const puncPlus = punc.replace(" ", "\\s");
  const puncReg = puncPlus.replace(puncExcludes, "");
  const puncPlusMinusSpace = punc.replace(" ", "");
  regex[lang] = utils.newObj();
  regex[lang].allPunc = new RegExp(`[${puncReg}]+`, "g");
  regex[lang].nonPunc = new RegExp(`[^${puncReg}]+`, "g");
  regex[lang].hasPunc = new RegExp(`[${puncReg}]`);
  regex[lang].hasNonPunc = new RegExp(`[^${puncReg}]`);
  regex[lang].allPuncPlus = new RegExp(`[${puncPlus}]+`, "g");
  regex[lang].nonPuncPlus = new RegExp(`[^${puncPlus}]+`, "g");
  regex[lang].hasPuncPlus = new RegExp(`[${puncPlus}]`);
  regex[lang].hasNonPuncPlus = new RegExp(`[^${puncPlus}]`);
  regex[lang].allPuncPlusMinusSpace = new RegExp(`[${puncPlusMinusSpace}]+`, "g");
  if (lang === "Greek") {
    regex[lang].endWordSigma = new RegExp(`σ(?=[${puncReg}]|$)`, "g");
  }

  // letters
  const letters = info.getElements(lang, "letters").join("");
  const caps = info.getElements(lang, "caps").join("");
  const combos = info.getElements(lang, "combos").join("");
  const unit = `[${letters}${caps}][${combos}]*|[^${letters}${caps}]`;
  regex[lang].unit = new RegExp(unit);
  regex[lang].unitG = new RegExp(unit, "g");
  regex[lang].unitM = new RegExp(unit, "m");
};

{
  const lang = "Hebrew";
  const vowels = info.getElements(lang, "vowels").join("");
  const accents = info.getElements(lang, "accents").join("");
  const controls = info.getElements(lang, "controls").join("");
  const combos = info.getElements(lang, "combos").join("");
  const extra = info.getElements(lang, "extra").join("");
  const markers = info.getElements(lang, "markers").join("");
  regex[lang].vowels = new RegExp(`[${vowels}${controls}]+`, "g");
  regex[lang].accents = new RegExp(`[${accents}${controls}]+`, "g");
  regex[lang].combos = new RegExp(`[${combos}]+`, "g");
  regex[lang].vowelsPlus = new RegExp(`[${vowels}${controls}${extra}]+`, "g");
  regex[lang].accentsPlus = new RegExp(`[${accents}${controls}${extra}]+`, "g");
  regex[lang].combosPlus = new RegExp(`[${combos}${extra}]+`, "g");
}

// freeze
for (let lang of langs) Object.freeze(regex[lang]);

// file paths
{
  regex.path = utils.newObj();
  regex.path.root = /^\//;
  regex.path.parent = /^\.\.\//;
  regex.path.current = /^\.\//;
  //regex.path.isInRoot = /^\/./;
  //regex.path.isInParent = /^\.\.\/./;
  //regex.path.isInCurrent = /^\.\/./;
  Object.freeze(regex.path);
}

Object.freeze(regex);

/* exports */
module.exports = regex;
