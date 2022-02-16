"use strict";

/* requires */
const fs = require("fs");
const utils = Mary.require("Utils");
const msg = Mary.require("Msg")("Library");

/* components */
const {path: titles} = require("./catalog");
const Bookmarks = require("./bookmarks");

/* constants */
const isWebp = /\.webp/;
const tag = /\..+$/;
const isAlt = /alt(\\|\/)/;

/* contructor */
const CheckOut = (img, title) => {
  const titlePath = titles[title];
  if (!titlePath) throw new Error("Book is Unavailable.");
  const contentPath = `${titlePath}/content.json`;
  const altPath = `${titlePath}/alt`;
  const pages = fs.readdirSync(titlePath, "utf8")
    .filter(p => isWebp.test(p))
    .map(p => `${titlePath}/${p}`);
  const altPages = (() => {
    const alt = {};
    if (!fs.existsSync(altPath)) return alt;
    fs.readdirSync(altPath, "utf8")
      .filter(p => isWebp.test(p))
      .forEach(p => {
        const num = Number(p.replace(tag, ""));
        alt[num] = `${altPath}/${p}`;
      });
    return alt;
  })();
  const content = (fs.existsSync(contentPath)) ?
    JSON.parse(fs.readFileSync(contentPath, "utf8")) : null;
  const borrowedBook = 
    { open: open(img, pages)
    , previous: previous(img, pages)
    , next: next(img, pages)
    , goto: goto(img, pages)
    , hasAlt: hasAlt(altPages)
    , toggleAlt: toggleAlt(img, pages, altPages)
    , bookmarks: Bookmarks(title)
    , page: 1
    , title
    , content
    };
  return borrowedBook;
};

/* methods */
const open = (img, pages) => function () {
  img.src = pages[this.page - 1];
  msg.pub("if-has-alt", this.hasAlt());
};

const previous = (img, pages) => function () {
  if (this.page === 1) this.page = pages.length;
  else this.page -= 1;
  img.src = pages[this.page - 1];
  msg.pub("if-has-alt", this.hasAlt());
};

const next = (img, pages) => function () {
  if (this.page === pages.length) this.page = 1;
  else this.page += 1;
  img.src = pages[this.page - 1];
  msg.pub("if-has-alt", this.hasAlt());
};

const goto = (img, pages) => function (pageNum) {
  const last = pages.length;
  pageNum = Number(pageNum);
  if (utils.isNaN()) return;
  if (pageNum < 1) pageNum = 1;
  if (pageNum > last) pageNum = last;
  this.page = pageNum;
  img.src = pages[this.page - 1];
  msg.pub("if-has-alt", this.hasAlt());
};

const hasAlt = (altPages) => function () {
  return !!altPages[this.page];
};

const toggleAlt = (img, pages, altPages) => function () {
  if (isAlt.test(img.src)) {
    img.src = pages[this.page - 1];
  } else {
    img.src = altPages[this.page];
  }
};

/* exports */
module.exports = CheckOut;
