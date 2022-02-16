"use strict";

/* requires */
const utils = Mary.require("Utils");

/* components */
const regex = require("./regex");

/* constants */
const noHTML = str => new RegExp(`${str}(?![^<]*>|[^<>]*<\\/)`, "g");
const spanWords = `<span class='SpellCheck_WordError'>$&</span>`;
const spanNonWords = `<span class='SpellCheck_NonWordError'>$&</span>`;
const spanNonWordsBefore = hasNonPunc => μ => {
  let α, β;
  if (hasNonPunc.test(μ[0])) α = μ[0], β = μ.slice(1);
  else α = "", β = μ;
  return `${α}<span class='SpellCheck_NonWordError'>${β}</span>`;
};

/* constructor */
const Check = dict => {
  dict.check = check(dict);
  return dict;
};

/* functions */
const check = dict => text => {
  text = checkSpaces(dict, text);
  text = checkNonWords(dict, text);
  text = checkWords(dict, text);
  return text;
};

const checkSpaces = (dict, text) => {
  text = text.replace(/(\S)\s(?!\s|$)/g, "$1 ");
  return text;
};

const checkNonWords = (dict, text) => {
  const rs = Object.entries(regex[dict.lang].punc || {});
  for (let [key, r] of rs) {
    if (key === "before") {
      const hasNonPunc = regex[dict.lang].hasNonPunc;
      text = text.replace(r, spanNonWordsBefore(hasNonPunc));
    } else {
      text = text.replace(r, spanNonWords);
    }
  }
  text = text.replace(noHTML("\\s{2,}"), spanNonWords);
  text = text.replace(noHTML("^\\s+"), spanNonWords);
  text = text.replace(noHTML("\\s+$"), spanNonWords);
  return text;
};

const checkWords = (dict, text) => {
  const allPunc = regex[dict.lang].allPunc;
  const nonPunc = regex[dict.lang].nonPunc;
  const words = utils.array.unDupe(text.split(allPunc));
  text = text.replace(nonPunc, "␀$&␀"); // word boundaries
  for (let word of words) {
    if (!word) continue;
    if(!dict.has(word)) {
      word = utils.escapeRegex(word);
      text = text.replace(noHTML(`␀${word}␀`), spanWords);
    }
  }
  text = text.replace(/␀/g, "");
  return text;
};

/* exports */
module.exports = Check;
