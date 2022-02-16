"use strict";

/* requires */
const {utils, msg} = Mary;

/* components */
//const Menu = require("./modules/Menu");

/* constants */
const _ = Symbol();
const proto = utils.newObj();

/* methods */
proto.init = function (host) {
  this[_] = utils.newObj();
  this[_].msg = msg();
  this.c.setSubs();
  this.m.init();
  this.v.init(host);
  this.m.initState();
  return true;
};

proto.setSubs = function () {
  const msgOptsM = {thisObj: this.m};
  //this[_].msg.sub("new-msg", this.m.method, msgOptsM);
};

proto.selectVersion = function (e, {node}, {version}) {
  this.m.selectVersion(version);
};

proto.selectSubVersion = function (e, {node}, {getVar}) {
  this.m.selectSubVersion(getVar(node));
};

proto.selectFontName = function (e, {node}, {getVar}) {
  this.m.selectFontName(getVar(node));
};

proto.selectFontSize = function (e, {node}, {getVar}) {
  this.m.selectFontSize(getVar(node));
};

proto.selectBook = function (e, {node}, {book}) {
  this.m.selectBook(book);
};

proto.selectChapter = function (e, {node}, {chapter}) {
  this.m.selectChapter(chapter);
};

proto.selectVerse = function (e, {node}, {number}) {
  //this.m.selectVerse(number);
  console.log(number);
};

/* exports */
module.exports = proto;
