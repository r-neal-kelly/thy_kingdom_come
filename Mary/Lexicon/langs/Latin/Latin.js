"use strict";

/* requires */
const fs = require("fs");
const {utils, regex} = Mary;

/* components */
const decline = require("./decline");

/* constants */

/* constructor */
const Lexicon = () => {
  const lexicon = utils.newObj(proto);
  lexicon.parseEntries(); // maybe put entries behind symbol and use methods.
  lexicon.getLessonList();
  Object.setPrototypeOf(lexicon, null); // eventually another proto
  return lexicon;
};

/* constructor methods */
const proto = utils.newObj();

proto.parseEntries = function () {
  const entries = JSON.parse(fs.readFileSync(`${__dirname}/dict.json`));
  this.entries = utils.newObj();
  for (let entry of entries) {
    const {id, PoS} = entry;
    if (["noun", "proper noun"].includes(PoS)) this.parseNoun(entry);
    else if (["adjective", "comparative"].includes(PoS)) this.parseAdjective(entry);
    else this.entries[id] = entry;
    Object.setPrototypeOf(entry, null);
  }
};

proto.parseNoun = function (entry) {
  const [nominative, genitive, gender] = entry.id.split(regex.comma);
  const noun = Object.assign(utils.newObj(), entry);
  noun.nominative = nominative;
  noun.genitive = genitive;
  noun.gender = gender;
  noun.defs = noun.defs || noun.sDefs || noun.pDefs || [];
  if (entry.declension) decline(noun); // temporary if?
  this.entries[entry.id] = noun;
};

proto.parseAdjective = function (entry) {
  const ids = entry.id.split(regex.comma);
  const {stem, declension, cases = {}} = entry;
  let nominatives, genitives, genders, declensions;

  if (declension === "1/2") {
    nominatives = ids;
    genitives = [`${stem}ī`, `${stem}ae`, `${stem}ī`];
    genders = ["m", "f", "n"];
    declensions = ["2", "1", "2"];
  } else if ((ids.length === 3)) {
    nominatives = ids;
    genders = ["m", "f", "n"];
  } else if ((ids.length === 2)) {
    nominatives = ids;
    genders = ["m/f", "n"];
  } else if ((ids.length === 1)) {
    nominatives = [ids[0], ids[0]];
    genders = ["m/f", "n"];
  }

  for (let [i, nominative] of nominatives.entries()) {
    const adjective = Object.assign(utils.newObj(), entry);
    const genitive = (genitives) ? genitives[i] : `${stem}is`;
    const gender = genders[i];
    adjective.id = `${nominative}, ${genitive}, ${gender}`;
    adjective.nominative = nominative;
    adjective.genitive = genitive;
    adjective.gender = gender;
    adjective.declension = (declensions) ?
      declensions[i] : declension;
    adjective.cases = utils.newObj();
    for (let [id, words] of Object.entries(cases))
      adjective.cases[id] = words[i];
    decline(adjective);
    this.entries[adjective.id] = adjective;
  }
};

proto.getLessonList = function () {
  this.lessons = Object.values(this.entries)
    .map(entry => entry.lesson)
    .filter((elem, i, arr) => arr.indexOf(elem) === i);
};

/* functions */
// not currently used.
const getWord = dict => {
  dict.words = utils.newObj();
  for (let w of dict.all) {
    dict.words[w.id] = w;
  }
  return word => dict.words[word];
};

const translate = dict => {
  // want to add more than just Latin and English,
  // but it's too much repetition for each dict.
  // Will need a separate module.
  dict.Latin = utils.newObj();
  dict.English = utils.newObj();
  for (let w of dict.all) {
    dict.Latin[w.id] = w.defs;
    for (let def of w.defs) {
      if (!dict.English[def])
        dict.English[def] = [];
      dict.English[def].push(w.id);
  }}
  return (word, lang = "Latin") => {
    return dict[lang][word] || null;
  };
};

/* exports */
module.exports = Lexicon;
