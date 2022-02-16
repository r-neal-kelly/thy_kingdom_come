"use strict";

/* requires */
const fs = require("fs");
const utils = Mary.require("Utils");
const parse = Mary.require("Parse");
const info = Mary.require("Info");
const filter = Mary.require("Filter");
const font = Mary.require("Font");

/* constants */
const versions = utils.newObj();
const regexs = utils.newObj();
const esc = utils.escapeRegex;
const span = "Highlight";
// for now, I'm not going to load mult. versions simultaneously, because I need a module to translate what verses equate to what in which version, etc.
// in view, will need keyboard module, plus autohotkey, plus onscreen keyboard.
// should probably make an option to add another version, another pane in view.

/* functions */
const load = version => {
  const bible = info.getVersion(version);
  const lang = info.getLanguage(version);
  const versionMap = new Map();
  for (let [book, {chaps}] of bible.entries()) {
    let bookPath = `./Scripture/${lang}/${version}/${book}/`;
    if (!fs.existsSync(bookPath)) continue;
    const bookMap = new Map();
    versionMap.set(book, bookMap);
    for (let chap of chaps()) {
      let chapPath = `${bookPath}${chap}.txt`;
      if (!fs.existsSync(chapPath)) continue;
      let data = fs.readFileSync(chapPath, "utf8");
      bookMap.set(`${chap}`, parse.Scripture.toMap(data));
  }}
  return versionMap;
};

const checkResults = results => {
  let className = font("English");
  let message = `<div class="${className}">Nothing found.</div>`;
  if (results.length === 0) results.push(["", message]);
};

/* regexs */
regexs["General"] = (q) => {
  q = esc(q);
  const test = `^${q.split(" ").map(q => `(?=.*${q})`).join("")}`;
  const regex = q.replace(/ /g, "|");
  const div = `<span class='${span}'>$&</span>`;
  return {test, regex, div};
};

regexs["Exact"] = (q, v) => {
  const lang = info.getLanguage(v);
  const punc = info.getPunctuation(lang).map(esc);
  const rPunc = ["^", "$"].concat(punc).join("|");
  const regex = `(${rPunc})(${esc(q)})(?=${rPunc})`;
  const test = regex;
  const div = `$1<span class='${span}'>$2</span>`;
  return {test, regex, div};
};

regexs["Word"] = (q, v) => {
  const lang = info.getLanguage(v);
  const punc = info.getPunctuation(lang);
  const rPunc = ["^", "$"].concat(punc.map(esc)).join("|");
  q = q.split(" ").map(q => `(${rPunc})(${esc(q)})(?=${rPunc})`);
  const test = `^${q.map(q => `(?=.*${q})`).join("")}`;
  const regex = q.map(q => `(?:${q})`).join("|");
  const div = m => {
    let α, β;
    if (punc.includes(m[0])) α = m[0], β = m.slice(1);
    else α = "", β = m;
    return `${α}<span class='${span}'>${β}</span>`;
  };
  return {test, regex, div};
};

regexs["Regex"] = (q) => {
  const test = q;
  const regex = q;
  const div = `<span class='${span}'>$&</span>`;
  return {test, regex, div};
};

/* module */
const search = v => (query, options = {}) => {
  if (!query) return null;
  if (!versions[v]) versions[v] = load(v);
  const results = new Map();
  let {type, flag, sub} = options;
  let {test, regex, div} = regexs[type](query, v);
  test = new RegExp(test, flag);
  regex = new RegExp(regex, flag);
  results.set("All Books", []);
  results.books = 0;
  results.verses = 0;
  for (let [book, chapters] of versions[v].entries()) {
    for (let [chapter, verses] of chapters.entries()) {
      for (let [verse, text] of verses.entries()) {
        text = filter(v, sub, text);
        if (!test.test(text)) continue;
        if (!results.has(book))
          results.set(book, []), results.books += 1;
        let ref = `${book} ${chapter}:${verse}`;
        let result = [ref, text.replace(regex, div)];
        results.get(book).push(result);
        results.get("All Books").push(result);
        results.verses += 1;
  }}}
  checkResults(results.get("All Books"));
  return results;
};

/* exports */
module.exports = search;
