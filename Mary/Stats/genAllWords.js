"use strict";

/* requires */
const fs = require("fs");
const utils = Mary.require("Utils");
const path = Mary.require("Path");
const info = Mary.require("Info");
const parse = Mary.require("Parse");
const regex = Mary.require("Regex");

/* constants */
const textPath = `${__dirname}/texts`;
const versions = info.getVersions(); // all versions.

/* functions */
const genAllWords = () => {
  makeDir(textPath);
  for (let version of versions) {
    const words = {};
    const lang = info.getLanguage(version);
    const langPath = `${textPath}/${lang}`;
    makeDir(langPath);
    const versionPath = `${langPath}/${version}`;
    makeDir(versionPath);
    const books = info.getBooks(version);
    for (let book of books) {
      const chapters = info.getChapters(version, book);
      for (let chapter of chapters) {
        const scripPath = getScriptPath(lang, version, book, chapter);
        if (!fs.existsSync(scripPath)) continue;
        const allPunc = regex[lang].allPunc;
        let data = fs.readFileSync(scripPath, "utf8");
        data = parse.Scripture.noVerseNums(data);
        data = parse.Scripture.noNewLine(data);
        data = data.replace(allPunc, "␀").split("␀");
        data = data.filter(w => w !== "");
        for (let word of data) {
          if (!words[word]) words[word] = {count: 0};
          words[word].count += 1;
        }
      }
    }
    let json = JSON.stringify(words, null, "  ");
    fs.writeFileSync(`${versionPath}/words.json`, json, "utf8");
    const wordList = Object.keys(words).sort(utils.array.sortStr);
    json = JSON.stringify(wordList);
    fs.writeFileSync(`${versionPath}/wordList.json`, json, "utf8");
    const wordCount = Object.entries(words)
      .map(([w, {count}]) => [w, count])
      .sort(([, a], [, b]) => b - a);
    json = JSON.stringify(wordCount, null, "  ");
    fs.writeFileSync(`${versionPath}/wordCount.json`, json, "utf8");
  }
  console.log("Completed.");
};

const makeDir = dirPath => {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
};

const getScriptPath = (lang, version, book, chapter) => {
  return `${path.scripture}/${lang}/${version}/${book}/${chapter}.txt`;
};

/* exports */
module.exports = genAllWords;
