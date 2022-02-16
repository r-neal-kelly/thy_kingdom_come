"use strict";

/* requires */
const {utils, dom, HTML} = Mary;

/* components */
require("./css");

/* constants */
const _ = Symbol();
const proto = utils.newObj();
const backBtnText = "↰";

/* functions */
const isRoot = function (node) {
  return node.textContent === backBtnText;
};

const getName = function (node) {
  return node.textContent.replace("↳ ", "");
};

/* methods */
proto.init = function (host) {
  this[_] = utils.newObj();
  this[_].ns = Symbol();
  this[_].host = dom(host || document.body);
  this[_].menu = dom(HTML.div)
    .appendTo(this[_].host)
    .class("LayoutMenu")
    .hide();
};

proto.initFolder = function (folder = {}) {
  this[_].menu.children().remove();
  if (!folder.isRoot) {
    this.initBackBtn();
  }
  for (let folderName of folder.folders) {
    this.initFolderBtn(folderName);
  }
  for (let fileName of folder.files) {
    this.initFileBtn(fileName);
  }
  this.initListeners();
};

proto.initBackBtn = function () {
  dom(HTML.button)
    .appendTo(this[_].menu)
    .class("FolderBtn")
    .setText(backBtnText);
};

proto.initFolderBtn = function (name) {
  dom(HTML.button)
    .appendTo(this[_].menu)
    .class("FolderBtn")
    .setText(`↳ ${name}`);
};

proto.initFileBtn = function (name) {
  dom(HTML.button)
    .appendTo(this[_].menu)
    .class("FileBtn")
    .setText(name);
};

proto.initListeners = function () {
  const evtOpts = this.getEvtOpts();
  evtOpts.args = {isRoot, getName};
  dom(".FolderBtn").on("click", this.c.openFolder, null, evtOpts);
  dom(".FileBtn").on("click", this.c.openFile, null, evtOpts);
};

proto.getEvtOpts = function () {
  return {thisObj: this.c, ns: this[_].ns};
};

proto.getTop = function () {
  return this[_].menu;
};

proto.toggleMenu = function () {
  this[_].menu.toggle();
};

/* exports */
module.exports = proto;
