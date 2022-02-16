"use strict";

/* requires */
const fs = require("fs");
const utils = Mary.require("Utils");
const {images} = Mary.require("Path");

/* constants */
const fpath = `${images}/Library/catalog.json`;
const catalog = JSON.parse(fs.readFileSync(fpath, "utf8"));
const isWebp = /\.webp/;
const noArticle = /^(?:The |A |An )?(.)/;
const books = Object.entries(catalog);
catalog.id = {}
catalog.path = {};
catalog.pages = {};

/* functions */
const addPath = (id, book) => {
  const {category, language} = book;
  catalog.path[id] = `${images}/Library/${category}/${language}/${id}`;
};

const addID = id => {
  if (!catalog.id[id[0]]) catalog.id[id[0]] = [];
  catalog.id[id[0]].push(id);
};

const addPages = id => {
  const path = catalog.path[id];
  const pages = fs.readdirSync(path, "utf8")
    .filter(p => isWebp.test(p)).length;
  if (!catalog.pages[pages]) catalog.pages[pages] = [];
  catalog.pages[pages].push(id);
};

const addTitle = (id, val) => {
  const char = noArticle.exec(val)[1];
  if (!catalog.title[char]) catalog.title[char] = [];
  catalog.title[char].push(id);
};

/* group */
for (let [id, book] of books) {
  addPath(id, book), addID(id), addPages(id);
  for (let [prop, val] of Object.entries(book)) {
    if (!catalog[prop]) catalog[prop] = {};
    if (prop === "title") {
      addTitle(id, val);
      continue;
    };
    if (!catalog[prop][val]) catalog[prop][val] = [];
    catalog[prop][val].push(id);
  }
}

/* sort */
for (let prop of ["id", "creator", "language", "category"]) {
  catalog[prop] = Object.keys(catalog[prop]).sort()
    .map(p => [p, catalog[prop][p].sort()]);
}

for (let prop of ["year", "pages"]) {
  catalog[prop] = Object.keys(catalog[prop]).sort((a, b) => b - a)
    .map(p => [p, catalog[prop][p].sort()]);
}

/* exports */
module.exports = catalog;
