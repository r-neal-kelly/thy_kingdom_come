"use strict";

/* requires */
const utils = Mary.require("Utils");
const keyboard = Mary.require("Keyboard");
const dom = Mary.require("Dom");
const info = Mary.require("Info");

/* components */
const css = require("./css");
const regex = require("./regex");
const Dict = require("./dict");
const Refresh = require("./refresh");
const Check = require("./check");

/* constants */
const spellCheck = utils.newObj();
const hasError = /<span class=("|')SpellCheck/;

/* variables */
let current = null;
let currNode = null;

/* functions */
const changeDict = method => {
  if (!current) return;
  const selc = document.getSelection();
  const word = selc.toString().trim();
  if (!word) return;
  if (!regex[current.lang].hasPunc.test(word)) {
    current[method](word);
    if (currNode) current.refresh(null, {node: currNode});
    selc.collapse(document);
  }
};

/* listeners */
const click = (event, refs) => {
  currNode = refs.node;
  const selc = document.getSelection();
  const sameNode = selc.anchorNode === selc.focusNode;
  const sameOffset = selc.anchorOffset === selc.focusOffset;
  const isCollapsed = sameNode && sameOffset;
  if (isCollapsed) current.refresh(event, refs);
};

const saveDictOnExit = () => {
  if (current) current.save();
};

const addDictWord = () => changeDict("add");

const delDictWord = () => changeDict("del");

dom(window).on("beforeunload", saveDictOnExit);
keyboard.shortcut(null, "Insert", addDictWord);
keyboard.shortcut(null, "Delete", delDictWord);

/* methods */
spellCheck.set = version => {
  if (current) current.save();
  if (!info.versionNames.includes(version)) {
    current = null;
  } else {
    current = Dict(version);
    Refresh(current);
    Check(current);
  }
};

spellCheck.get = () => {
  if (!current) return null;
  const version = current.version;
  const lang = current.lang;
  return {lang, version};
};

spellCheck.register = node => {
  if (!current) return;
  if (!node.constructor === dom) node = dom(node);
  node.attr("contentEditable='true'");
  node.on("click", click);
  node.on("input", current.refresh);
};

spellCheck.hasError = node => {
  node.click();
  return hasError.test(node.innerHTML);
};

/* exports */
module.exports = spellCheck;
