"use strict";

/* requires */
const fs = require("fs");
const {utils, info, font, data, filter} = Mary; // try and put fonts in info

/* components */

/* constants */
const _ = Symbol();
const proto = utils.newObj();

/* functions */
const getVerses = function () {
  // filtering in here.
  const {lang, version, subVersion, book, chapter} = this[_];
  const path = `./Scripture/${lang}/${version}/${book}/${chapter}.txt`;
  if (!fs.existsSync(path)) return [];
  const file = fs.readFileSync(path, "utf8");
  return filter(lang, subVersion, file).match(/.+/gm).map(verse => {
    return verse.trim().replace(/\s*:\s*/, "␀").split("␀");
  });
};

/* methods */
proto.init = function () {
  // maybe we'll get defaults from json
  this[_] = utils.newObj();
  this[_].version = "KJV";
  this[_].subVersion;
  this[_].fontName;
  this[_].fontSize;
  this[_].book = "Genesis";
  this[_].chapter = "1";
  this[_].verse;
  Object.defineProperties(this[_],
    { lang:      { get: function () { return info.getLanguage(this.version)  } }
    , direction: { get: function () { return info.getDirection(this.version) } }
    }
  );
};

proto.initState = function () {
  const versions = info.getVersions();
  this.v.initVersionSelect(versions);
  this.selectVersion(this[_].version);
};

proto.selectVersion = function (version) {
  this[_].version = version;
  const subVersions = info.getSubs(this[_].lang);
  const fonts = font.getFonts(this[_].lang);
  const books = info.getBooks(this[_].version);
  const sizes = utils.range(12, 48, 2).map(n => `${n}px`);
  this.v.initVersionOptions(subVersions, fonts, sizes);
  this.v.initBookSelect(books);
  this.selectBook(this[_].book);
};

proto.selectSubVersion = function (subVersion) {
  this[_].subVersion = subVersion;
  this.selectChapter(this[_].chapter);
};

proto.selectFontName = function (fontName) {
  this[_].fontName = fontName;
  this.selectChapter(this[_].chapter);
};

proto.selectFontSize = function (fontSize) {
  this[_].fontSize = fontSize;
  this.selectChapter(this[_].chapter);
};

proto.selectBook = function (book) {
  this[_].book = book;
  const chapters = info.getChapters(this[_].version, this[_].book);
  this.v.initChapterSelect(chapters);
  this.selectChapter(this[_].chapter);
};

proto.selectChapter = function (chapter) {
  this[_].chapter = chapter;
  const verses = getVerses.call(this);
  const {lang, direction, fontName, fontSize} = this[_];
  this.v.initChapterView({verses, lang, direction, fontName, fontSize});
};

/* exports */
module.exports = proto;
