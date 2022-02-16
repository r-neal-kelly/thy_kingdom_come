"use strict";

/* requires */
const fs = require("fs");
const utils = Mary.require("Utils");
const info = Mary.require("Info");

/* components */
const regex = require("./regex");

/* constants */
const dir = "./Mary/SpellCheck/dicts/";

/* functions */
const load = version => {
  const path = dir + version + ".json";
  if (!fs.existsSync(path)) return [];
  return JSON.parse(fs.readFileSync(path, "utf8"));
};

const clean = (lang, word) => {
  const rs = Object.values(regex[lang].spelling || {});
  for (let r of rs) word = word.replace(r, "");
  if (regex[lang].hasPunc.test(word)) return null;
  else return word;
};

/* constructor */
const Dict = version => {
  const dict = utils.newObj();
  dict.version = version;
  dict.lang = info.getLanguage(version);
  dict.words = load(version);
  dict.save = save(dict);
  dict.add = add(dict);
  dict.del = del(dict);
  dict.has = has(dict);
  dict.constructor = Dict;
  return dict;
};

/* methods */
const save = ({version, words}) => () => {
  const path = dir + version + ".json";
  const file = JSON.stringify(words.sort());
  fs.writeFileSync(path, file, "utf8");
};

const add = ({lang, words}) => word => {
  word = clean(lang, word);
  if (!word) return;
  const index = words.indexOf(word);
  if (index === -1) words.push(word);
};

const del = ({lang, words}) => word => {
  word = clean(lang, word);
  if (!word) return;
  const index = words.indexOf(word);
  if (index !== -1) words.splice(index, 1);
};

const has = ({lang, words}) => word => {
  word = clean(lang, word);
  if (!word) return null;
  else return words.includes(word);
};

/* exports */
module.exports = Dict;
