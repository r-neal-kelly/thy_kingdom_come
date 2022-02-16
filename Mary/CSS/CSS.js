"use strict";

/* requires */
const utils = Mary.require("Utils");
const dom = Mary.require("Dom");

/* constructor */
const CSS = function (id, global) {
  const css = utils.newObj();
  const {ID, sheet} = getSheet(id, global);
  css.define = define(ID, sheet);
  css.meta = meta(ID, sheet);
  css.comment = comment(ID, sheet);
  css.has = has(ID, sheet);
  css.id = unCss(ID);
  css.constructor = CSS;
  return css;
};

/* functions */
const getSheet = (id = "#Mary", g) => {
  let doc = document, sheet, tag, ID;
  if (!/^#/.test(id)) id = `#${id}`;
  tag = `${id}_Style`;
  if (doc.querySelector(tag)) sheet = dom(tag);
  else sheet = dom(`<style id="${tag.substr(1)}">`)
    .appendTo(doc.head)
    .setText("\n");
  ID = (id === "#Mary" || g) ? "" : `${id}`;
  return {ID, sheet};
};

const unCss = str => str.replace(/#|\./, "");

const getSelector = (id, selector) => {
  if (unCss(id) === unCss(selector)) selector = "";
  selector = selector.replace(/( +)?,( +)?/g, `, ${id} `);
  return selector;
};

const getStyleHeader = (id, selector, meta = "") => {
  let style;
  if (id && selector) style = `${id} ${selector} {\n`;
  else if (id) style = `${id} {\n`;
  else if (selector) style = `${selector} {\n`;
  if (meta) style = `${meta} {\n  ${style}`;
  return style;
};

const getArr = str => {
  if (!utils.isString(str)) return str;
  const isComment = /^\/\//;
  return str.split(/\n+/)
    .map(rule => rule.trim())
    .filter(rule => !!rule && !isComment.exec(rule));
};

/* methods */
const define = (id, sheet) => (selector, rules) => {
  selector = getSelector(id, selector);
  let style = getStyleHeader(id, selector);
  rules = getArr(rules);
  for (let declaration of rules) {
    declaration = (/;$/.test(declaration)) ?
      declaration : `${declaration};`;
    style += `  ${declaration}\n`;
  }
  style += "}\n";
  sheet.addText(style);
};

const meta = (id, sheet) => (meta, selector, rules) => {
  selector = getSelector(id, selector);
  let style = getStyleHeader(id, selector, meta);
  rules = getArr(rules);
  for (let declaration of rules) {
    declaration = (/;$/.test(declaration)) ?
      declaration : `${declaration};`;
    style += `    ${declaration}\n`;
  }
  style += "  }\n}\n";
  sheet.addText(style);
};

const comment = (id, sheet) => (comment) => {
  if (!/^\/\*/.test(comment)) comment = `/* ${comment}`;
  if (!/\*\/$/.test(comment)) comment = `${comment} */`;
  sheet.addText("\n\n" + comment);
};

const has = (id, sheet) => selector => {
  return new RegExp(selector).test(sheet.getText());
};

/* exports */
module.exports = CSS;
