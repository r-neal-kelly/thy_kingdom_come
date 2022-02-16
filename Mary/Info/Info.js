"use strict";

/* requires */
const utils = Mary.require("Utils");
const subs = require("./subversions");

/* constants */
const info = utils.newObj();
const langNames = [ "English", "Hebrew", "Greek", "Latin" ];
const rightLangs = /Hebrew|Aramaic|Arabic/;

/* languages */
const langs = utils.newObj();
for (let l of langNames) {
  langs[l] = require(`./versions/${l}`);
}

info.getLangNames = () => Array.from(langNames);

info.getLangs = info.getLangNames;

info.getLanguage = version => {
  for (let [lang, versions] of Object.entries(langs)) {
    if (versions.has(version)) return lang;
  }
};

info.getDirection = version => {
  for (let [lang, versions] of Object.entries(langs)) {
    if (versions.has(version)) {
      if (rightLangs.test(lang)) return "Right";
      else return "Left";
  }}
};

/* versions */
const versions = utils.map.combine(...Object.values(langs));

info.versionNames = utils.map.keys(versions); // take out

info.getVersion = version => versions.get(version);

info.getSubs = lang => Array.from(subs[lang]);

info.getVersionNames = lang => {
  if (lang) return utils.map.keys(langs[lang]);
  else return utils.map.keys(versions);
};

info.getVersions = info.getVersionNames;

info.getBooks = version => {
  return utils.map.keys(info.getVersion(version));
};

info.getChapters = (version, book) => {
  return info.getVersion(version).get(book).chaps();
};

/* elements */
const elements = utils.newObj();
for (let l of langNames) {
  elements[l] = require(`./elements/${l}`);
}

info.getElements = (lang = "English", set = null) => {
  if (set) return elements[lang][set.toLowerCase()] || [];
  else return Object.assign({}, elements[lang]);
};

info.getPunctuation = lang => elements[lang]["punctuation"];

info.getLetters = lang => elements[lang]["letters"];

info.getCaps = lang => {
  return elements[lang]["caps"] || elements[lang]["letters"];
};

/* etymology */
const etymology = utils.newObj();
// just Latin for now.
etymology["Latin"] = require("./etymology/Latin");

info.getEtymology = (lang = "Latin", set = null) => {
  if (set) return etymology[lang][set.toLowerCase()] || [];
  else return Object.assign({}, etymology[lang]);
};

/* exports */
module.exports = info;
