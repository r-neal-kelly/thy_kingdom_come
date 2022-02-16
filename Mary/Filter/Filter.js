"use strict";

/* requires */
const utils = Mary.require("Utils");
const parse = Mary.require("Parse").Scripture;
const info = Mary.require("Info");

/* constants */
const langNames = info.getLangNames();
const langs = utils.newObj();
const errorTxt = "Invalid language or version.";
for (let lang of langNames) {
  langs[lang] = require(`./languages/${lang}`);
}

/* constructor */
const filter = (langVer, types, data) => {
  // langVer = language or version name
  // types = string or array of filters
  // data = chapter map or any string
  const filter = langs[langVer] ||
    langs[info.getLanguage(langVer)];
  if (!filter) throw new Error(errorTxt);
  const dataIsMap = utils.isMap(data);
  let result = (dataIsMap) ?
    parse.toData(data) : data;
  for (let type of [].concat(types)) {
    result = filter(type, result);
  }
  if (dataIsMap) result = parse.toMap(result);
  return result;
};

/* exports */
module.exports = filter;
