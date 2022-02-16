"use strict";

/* requires */
const {utils, dom, HTML, font} = Mary;

/* components */
require("./Scripture-v-css");

/* constants */
const _ = Symbol();
const proto = utils.newObj();

/* functions */
const getEvtOpts = function (args) {
  return {thisObj: this.c, ns: this[_].ns, args};
};

/* methods */
proto.init = function (host) {
  this[_] = utils.newObj();
  this[_].ns = Symbol();
  this[_].global = dom(window);
  this[_].html = dom(document.documentElement);
  this[_].host = dom(host || document.body);
  this[_].host.children().remove();
  this[_].scripture = dom(HTML.div)
    .appendTo(this[_].host)
    .attr("id=Scripture");
  this.intiGrid();
};

proto.intiGrid = function () {
  this[_].versionSelect = dom(HTML.div)
    .appendTo(this[_].scripture)
    .class("VersionSelect");
  this[_].versionOptions = dom(HTML.div)
    .appendTo(this[_].scripture)
    .class("VersionOptions");
  this[_].bookSelect = dom(HTML.div)
    .appendTo(this[_].scripture)
    .class("BookSelect");
  this[_].chapterSelect = dom(HTML.div)
    .appendTo(this[_].scripture)
    .class("ChapterSelect");
  this[_].chapterView = dom(HTML.div)
    .appendTo(this[_].scripture)
    .class("ChapterView");
};

proto.initVersionSelect = function (versions = []) {
  this[_].versionSelect.children().remove();
  for (let version of versions) {
    const args = {version};
    const evtOpts = getEvtOpts.call(this, args);
    dom(HTML.button)
      .appendTo(this[_].versionSelect)
      .class("VersionSelectBtn")
      .setText(version)
      .on("click", this.c.selectVersion, null, evtOpts);
  }
};

proto.initVersionOptions = function (subVersions = [], fonts = [], sizes = []) {
  this[_].versionOptions.children().remove();
  const args = {getVar: node => node.value};
  const evtOpts = getEvtOpts.call(this, args);
  dom(HTML.select)
    .appendTo(this[_].versionOptions)
    .class("SubVersions")
    .options(subVersions)
    .on("change", this.c.selectSubVersion, null, evtOpts);
  dom(HTML.select)
    .appendTo(this[_].versionOptions)
    .class("FontNames")
    .options(fonts)
    .on("change", this.c.selectFontName, null, evtOpts);
  dom(HTML.select)
    .appendTo(this[_].versionOptions)
    .class("FontSizes")
    .options(sizes)
    .on("change", this.c.selectFontSize, null, evtOpts);
};

proto.initBookSelect = function (books = []) {
  this[_].bookSelect.children().remove();
  for (let book of books) {
    const args = {book};
    const evtOpts = getEvtOpts.call(this, args);
    dom(HTML.button)
      .appendTo(this[_].bookSelect)
      .class("BookSelectBtn")
      .setText(book)
      .on("click", this.c.selectBook, null, evtOpts);
  }
};

proto.initChapterSelect = function (chapters = []) {
  this[_].chapterSelect.children().remove();
  for (let chapter of chapters) {
    const args = {chapter};
    const evtOpts = getEvtOpts.call(this, args);
    dom(HTML.button)
      .appendTo(this[_].chapterSelect)
      .class("ChapterSelectBtn")
      .setText(chapter)
      .on("click", this.c.selectChapter, null, evtOpts);
  }
};

proto.initChapterView = function ({verses, lang, direction, fontName, fontSize}) {
  this[_].chapterView.children().remove();
  const verseView = dom(HTML.div)
    .appendTo(this[_].chapterView)
    .class("VerseView");
  for (let [number, verse] of verses) {
    const args = {number};
    const evtOpts = getEvtOpts.call(this, args);
    const verseFrame = dom(HTML.div)
      .appendTo(verseView)
      .class("VerseFrame");
    dom(HTML.button)
      .appendTo(verseFrame)
      .class("VerseSelectBtn")
      .setText(number)
      .on("click", this.c.selectVerse, null, evtOpts);
    dom(HTML.div)
      .appendTo(verseFrame)
      .class(["VerseText", font(lang, {f:fontName, s:fontSize})])
      .setText(verse);
  }
  if (direction === "Left") {
    verseView.children().style("flex-direction: row");
  } else {
    verseView.children().style("flex-direction: row-reverse");
  }
};

/* exports */
module.exports = proto;
