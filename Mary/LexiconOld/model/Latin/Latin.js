"use strict";

/* requires */
const fs = require("fs");
const {utils} = Mary;

/* components */
const add = require("./add");
const decline = require("./decline");
const game = require(`./game`);

/* constants */
const dictParsers = utils.newObj();
const regexComma = /\s*,\s*/;

/* constructor */
const Lexicon = () => {
  const lexicon = utils.newObj();
  lexicon.dict = parseDict();
  lexicon.add = add;
  lexicon.decline = decline(lexicon);
  lexicon.game = game(lexicon);
  return lexicon;
};

/* functions */
const parseDict = () => {
  const dict = utils.newObj();
  let json = [];
  for (let path of ["noun", "proper noun", "adjective", "verb", "other"]) {
    let pathArr = JSON.parse(fs.readFileSync(`${__dirname}/dict/${path}.json`));
    if (path !== "other") pathArr.forEach(w => w.PoS = path);
    json = json.concat(pathArr);
  }
  dict.all = [];
  dict.PoS = [];
  for (let w of json) {
    const parser = dictParsers[w.PoS] || dictParsers["other"];
    parser(dict.all, w);
    if (dict.PoS.includes(w.PoS)) continue;
    dict.PoS.push(w.PoS);
  }
  for (let part of dict.PoS) {
    dict[part] = dict.all.filter(w => w.PoS === part);
  }
  dict.getWord = getWord(dict);
  dict.translate = translate(dict);
  return dict;
};

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

dictParsers["noun"] = (all, word) => {
  const nom = word.nominative.split(regexComma);
  const gen = word.genitive.split(regexComma);
  for (let [i, n] of nom.entries()) {
    const w = Object.assign(utils.newObj(), word);
    w.id = n;
    w.nominative = n;
    w.genitive = gen[i];
    all.push(w);
  }
};

dictParsers["proper noun"] = dictParsers["noun"];

dictParsers["adjective"] = (all, word) => {
  const nom = word.nominative.split(regexComma);
  const gen = word.genitive.split(regexComma);
  const dec = word.declension.split(regexComma);
  const sex = word.gender.split(regexComma);
  for (let [i, n] of nom.entries()) {
    const w = Object.assign(utils.newObj(), word);
    w.id = n;
    w.nominative = n;
    w.genitive = gen[i];
    w.declension = dec[i];
    w.gender = sex[i];
    all.push(w);
  }
};

dictParsers["verb"] = (all, word) => {
  word.id = word.verb;
  if (word.number === "singular"){
    let defs = [];
    word.defs.map(w => {
      defs.push(`he ${w}`);
      defs.push(`she ${w}`);
      defs.push(`it ${w}`);
    });
    word.defs = defs;
  }
  if (word.number === "plural") {
    word.defs = word.defs.map(w => `they ${w}`);
  }
  all.push(word);
};

dictParsers["other"] = (all, word) => {
  all.push(word);
};

/* exports */
module.exports = Lexicon;
