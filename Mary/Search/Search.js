"use strict";

/* requires */
const utils = Mary.require("Utils");
const info = Mary.require("Info");
const dom = Mary.require("Dom");
const font = Mary.require("Font");

/* components */
const search = require("./model");
const css = require("./css");

/* constants */

/* variables */
let main, results, bookSet, pageLimit;
const setDefault = () => {
  main = utils.newObj();
  pageLimit = 24;
};

/* generation */
const genTop = host => {
  main.Top = dom("<div id='Search'></div>")
    .appendTo(host || document.body);
};

const genSearch = () => {
  main.Menu = dom("<div></div>")
    .class("Menu")
    .appendTo(main.Top);
  main.ResultFrame = dom("<div></div>")
    .class("ResultFrame")
    .appendTo(main.Top);
};

const genMenu = () => {
  main.VersionSelect = dom("<select></select>")
    .class("VersionSelect")
    .option(info.versionNames)
    .on("change", [setSubs, setFonts])
    .appendTo(main.Menu);
  main.SubSelect = dom("<select></select>")
    .class("SubSelect")
    .option(info.getSubs(getLang()))
    .appendTo(main.Menu);
  main.FontSelect = dom("<select></select>")
    .class("FontSelect")
    .option(font.getFonts(getLang()))
    .on("change", loadFont)
    .appendTo(main.Menu);
  main.TypeSelect = dom("<select></select>")
    .class("TypeSelect")
    .option(["General", "Exact", "Word", "Regex"])
    .appendTo(main.Menu);
  main.CaseSelect = dom("<select></select>")
    .class("CaseSelect")
    .option(["✓ Case", "✗ Case"])
    .appendTo(main.Menu);
  main.SearchInput = dom("<input></input>")
    .class("SearchInput")
    .placeholder("search")
    .on("keydown", loadModel)
    .appendTo(main.Menu);
  main.DisplayStats = dom("<div></div>")
    .class("DisplayStats")
    .appendTo(main.Menu);
};

const genFrame = () => {
  main.BookSelects = dom("<div></div>")
    .class("BookSelects")
    .appendTo(main.ResultFrame);
  main.Results = dom("<div></div>")
    .class("Results")
    .appendTo(main.ResultFrame);
};

/* get */
const getInput = () => main.SearchInput.value();
const getVersion = () => main.VersionSelect.value();
const getSub = () => main.SubSelect.value();
const getFont = () => main.FontSelect.value();
const getType = () => main.TypeSelect.value();
const getCase = () => main.CaseSelect.value();
const getLang = () => info.getLanguage(getVersion());

/* load */
const loadModel = event => {
  if (event.key !== "Enter") return;
  results = search(getVersion())(getInput(), {
    type: getType(),
    flag: /✓/.test(getCase()) ? "g" : "gi",
    sub: getSub()
  });
  loadStats();
  if (results == null) {
    main.BookSelects.children().remove();
    main.Results.children().remove();
    return;
  }
  loadBookSelects();
  main.BookSelects.children().first.click();
};

const loadStats = () => {
  if (!results) return main.DisplayStats.setText("");
  const vNum = results.verses;
  const bNum = results.books;
  const vWord = (vNum !== 1) ? "verses" : "verse";
  const bWord = (bNum !== 1) ? "books" : "book";
  main.DisplayStats.setText(`${vNum} ${vWord} in ${bNum} ${bWord}.`);
};

const loadBookSelects = () => {
  const books = utils.map.keys(results);
  main.BookSelects.children().remove();
  dom("<button></button>", main.BookSelects, books.length)
    .appendTo(main.BookSelects)
    .class("BookSelectButton")
    .setText(books, "spread")
    .on("click", loadResults);
};

const loadResults = function (event) {
  bookSet = results.get(this.node.textContent);
  highlightBook(this.index);
  main.Results.children().remove();
  loadPageSelects(bookSet);
};

const loadPageSelects = () => {
  const totalPages = Math.ceil(bookSet.length / pageLimit);
  const pageNums = utils.range(1, totalPages);
  main.PageSelects = dom("<div></div>")
    .class("PageSelects")
    .appendTo(main.Results);
  dom("<button></button>", main.PageSelects, pageNums.length)
    .appendTo(main.PageSelects)
    .class("PageSelectButton")
    .setText(pageNums, "spread")
    .on("click", loadPage);
  main.PageSelects.children().first.click();
};

const loadPage = function (event) {
  const pageNum = Number(this.node.textContent);
  const end = pageNum * pageLimit;
  const start = end - pageLimit;
  const pageResults = bookSet.slice(start, end);
  highlightPage(this.index);
  main.Results.find(".Result").remove();
  for (let result of pageResults) loadResult(result);
};

const loadResult = ([ref, verse]) => {
  const lang = info.getLanguage(getVersion());
  const result = dom(`<div class="Result"></div>`)
      .appendTo(main.Results);
    dom(`<div class="Ref">${ref}</div>`)
      .appendTo(result)
      .class(font("English", {f: "Coelacanth"}));
    dom(`<div class="Verse">${verse}</div>`)
      .appendTo(result)
      .class(font(lang, {f: getFont()}));
};

const loadFont = () => {
  const lang = info.getLanguage(getVersion());
  dom(".Verse", main.Results)
    .defaultClass()
    .class(font(lang, {f: getFont()}));
};

/* highlight */
const highlightBook = index => {
  main.BookSelects.children()
    .removeClass("Highlight")
    .class("Highlight", index);
};

const highlightPage = index => {
  main.PageSelects.children()
    .removeClass("Highlight")
    .class("Highlight", index);
};

/* set */
const setSubs = function (event) {
  main.SubSelect.option(info.getSubs(getLang()));
};

const setFonts = function (event) {
  main.FontSelect.option(font.getFonts(getLang()));
};

/* initialize */
const initialize = host => {
  if (main) return destroy();
  setDefault();
  genTop(host);
  genSearch();
  genMenu();
  genFrame();
  return true;
};

const destroy = () => {
  main.Top.remove();
  main = null;
  results = null;
  return false;
};

/* exports */
module.exports = initialize;
