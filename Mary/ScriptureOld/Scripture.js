"use strict";

/* requires */
const utils = Mary.require("Utils");
const parse = Mary.require("Parse").Scripture;
const info = Mary.require("Info");
const data = Mary.require("Data");
const filter = Mary.require("Filter");
const dom = Mary.require("Dom");

/* components */
const css = require("./css");

/* constants */
const chapters = utils.newObj();
const subs = utils.newObj();

/* variables */
let main, Version, Book, Chapter, Sub, Verse;
const setDefault = () => {
  main = utils.newObj();
  Version = "X";
  Book = "Genesis";
  Chapter = "1";
  Sub = "All Marks";
  Verse = [];
};

/* generation */
const genTop = host => {
  main.Top = dom('<div id="Scripture"></div>')
    .appendTo(host || document.body);
};

const genScripture = () => {
  main.Menu = dom("<div></div>")
    .class("Menu")
    .appendTo(main.Top);
  main.VersionSelect = dom("<div></div>")
    .class("VersionSelect")
    .appendTo(main.Top);
  main.VersionFrame = dom("<div></div>")
    .class("VersionFrame")
    .appendTo(main.Top);
};

const genMenu = () => {
  main.SubSelect = dom("<select></select>")
    .class("SubSelect")
    .style("display: none")
    .on("change", loadSub)
    .appendTo(main.Menu);
};

const genFrame = () => {
  main.BookSelect = dom("<div></div>")
    .class("BookSelect")
    .appendTo(main.VersionFrame);
  main.ChapterSelect = dom("<div></div>")
    .class("ChapterSelect")
    .appendTo(main.VersionFrame);
  main.Chapter = dom("<div></div>")
    .class("Chapter")
    .appendTo(main.VersionFrame);
};

const genVersionSelects = () => {
  main.VersionSelect.children().remove();
  dom("<button></button>", main.VersionSelect, info.versionNames.length + 1)
    .appendTo(main.VersionSelect)
    .class("VersionSelectButton")
    .setText(["X", ...info.versionNames], "spread")
    .on("click", loadVersion);
};

const genBookSelects = () => {
  const version = info.getVersion(Version);
  const books = utils.map.keys(version);
  main.BookSelect.children().remove();
  dom("<button></button>", main.BookSelect, books.length)
    .appendTo(main.BookSelect)
    .class("BookSelectButton")
    .setText(books, "spread")
    .on("click", loadBook);
};

const genChapterSelects = () => {
  const version = info.getVersion(Version);
  const book = version.get(Book);
  const chapters = (book) ? book.chaps() : [];
  main.ChapterSelect.children().remove();
  dom("<button></button>", main.ChapterSelect, chapters.length)
    .appendTo(main.ChapterSelect)
    .class("ChapterSelectButton")
    .setText(chapters, "spread")
    .on("click", loadChapter);
};

/* Load */
const loadVersion = function (event) {
  if (Version === "X") open();
  Version = dom(this.node).getText();
  if (Version === "X") return close();
  setSubs();
  genBookSelects();
  genChapterSelects();
  loadVerses();
};

const loadSub = function (event) {
  Sub = dom(this.node).value();
  storeSub();
  loadVerses();
};

const loadBook = function (event) {
  Book = dom(this.node).getText();
  currentChapter();
  genChapterSelects();
  loadVerses();
};

const loadChapter = function (event) {
  Chapter = dom(this.node).getText();
  chapters[Book] = Chapter;
  loadVerses();
};

const loadVerses = () => {
  const {html, verseC, textC} = verseDirection();
  const genVerse = loadVerse(html, verseC, textC);
  let chapter = data.Scripture(Version, Book, Chapter);
  main.Chapter.children().remove();
  if (chapter.check()) {
    chapter = parse.toMap(filter(Version, Sub, chapter.read()));
    for (let verse of chapter) {
      genVerse(verse);
    }
  } else {
    missingChapter();
  }
  addHighlight();
};

const loadVerse = (html, verseC, textC) => verse => {
  dom(html)
    .appendTo(main.Chapter)
    .class(["Verse", verseC])
    .find("button")
      .class("VerseButton")
      .setText(verse[0])
      .on("click", setHighlight)
      .restore()
    .find("div")
      .class(textC)
      .setText(verse[1]);
};

const currentChapter = () => {
  const current = chapters[Book];
  if (current) {
    Chapter = current;
  } else {
    const first = info.getVersion(Version)
      .get(Book).chaps()[0];
    chapters[Book] = first;
    Chapter = first;
  }
};

const verseDirection = () => {
  const λ = utils.newObj();
  const language = info.getLanguage(Version);
  const direction = info.getDirection(Version);
  if (direction === "Right") {
    λ.html = "<div><div></div><button></button></div>";
  }
  if (direction === "Left") {
    λ.html = "<div><button></button><div></div></div>";
  }
  λ.verseC = "Verse" + direction;
  λ.textC = language;
  return λ;
};

const missingChapter = () => {
  dom(`<div>${Book} ${Chapter} is unavailable in ${Version}.</div>`)
    .appendTo(main.Chapter);
};

/* Highlight */
const addHighlight = node => {
  const λ = [Version, Book, Chapter];
  const { VersionSelect: v
        , BookSelect: b
        , ChapterSelect: c
        } = main;
  const verseNum = (utils.array.includes(Verse, [Book, Chapter])) ?
    Verse.verse - 1 : -1;
  dom([v, b, c]).children()
    .removeClass("Highlight")
    .filter(node => λ.includes(node.textContent))
      .class("Highlight");
  main.VersionFrame.find(".Verse")
    .removeClass("Highlight")
    .eq(verseNum)
      .class("Highlight");
};

const setHighlight = function (event) {
  Verse = [Book, Chapter];
  if (dom(this.node.parentElement).hasClass("Highlight")) {
    Verse.verse = 0;
  } else {
    Verse.verse = Number(dom(this.node).getText());
  }
  addHighlight();
};

/* Subs */
const setSubs = () => {
  const lang = info.getLanguage(Version);
  main.SubSelect.option(info.getSubs(lang));
  if (subs[lang]) main.SubSelect.selectOption(subs[lang]);
};

const storeSub = () => {
  const lang = info.getLanguage(Version);
  subs[lang] = Sub;
};

/* Open and Close */
const open = () => {
  main.SubSelect.style("display");
  genFrame();
};

const close = () => {
  main.VersionFrame.children().remove();
  main.SubSelect.style("display: none");
  addHighlight();
};

/* initialize */
const initialize = host => {
  if (!host && main) return destroy();
  setDefault();
  genTop(host);
  genScripture();
  genMenu();
  genVersionSelects();
  addHighlight();
  return true;
};

const destroy = () => {
  main.Top.remove();
  main = null;
  return false;
};

/* exports */
module.exports = initialize;
