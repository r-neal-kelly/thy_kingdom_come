"use strict";

/* requires */
const fs = require("fs");
const {utils, dom} = Mary;

/* constants */
const lexicon = utils.newObj();
const noCombos = /̄|̆/g;
const types = ["noun", "proper noun", "adjective", "verb", "other"];

/* functions */
const add = function (type, wordObj) {
  lexicon[type].push(wordObj);
};

const saveLexicon = function (e) {
  for (let type of types) {
    const file = lexicon[type];
    const json = JSON.stringify(file.sort(sorter), null, "  ");
    fs.writeFileSync(`${__dirname}/dict/${type}.json`, json, "utf8");
  }
};

const sorter = function (a, b) {
  a = a.nominative || a.verb || a.id;
  b = b.nominative || b.verb || b.id;
  a = a.replace(noCombos, "");
  b = b.replace(noCombos, "");
  return utils.array.sortStr(a, b);
};

/* init */
for (let type of types) {
  const file = fs.readFileSync(`${__dirname}/dict/${type}.json`, "utf8");
  lexicon[type] = JSON.parse(file);
}

dom(window).on("beforeunload", saveLexicon, null, {ns: "Latin"});

/* exports */
module.exports = add;
