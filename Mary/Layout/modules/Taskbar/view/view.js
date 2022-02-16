"use strict";

/* requires */
const {utils, dom, HTML} = Mary;

/* components */
require("./css");

/* constants */
const _ = Symbol();
const proto = utils.newObj();

/* methods */
proto.init = function (host) {
  this[_] = utils.newObj();
  this[_].ns = Symbol();
  this[_].host = dom(host || document.body);
  this[_].taskbar = dom(HTML.div)
    .appendTo(this[_].host)
    .class("Taskbar");
  this[_].toggleMenu = dom(HTML.button)
    .appendTo(this[_].taskbar)
    .class("ToggleMenu");
  this.initListeners();
};

proto.getTop = function () {
  return this[_].taskbar;
};

proto.getEvtOpts = function () {
  return {thisObj: this.c, ns: this[_].ns};
};

proto.initListeners = function () {
  const {toggleMenu} = this[_];
  const evtOpts = this.getEvtOpts();
  toggleMenu.on("click", this.c.toggleMenu, null, evtOpts);
};

proto.getWindows = function () {
  return dom(".TaskbarBtn", this[_].taskbar)
};

proto.addWindow = function (name) {
  const evtOpts = this.getEvtOpts();
  dom(HTML.button)
    .appendTo(this[_].taskbar)
    .class("TaskbarBtn")
    .setText(name)
    .on("click", this.c.focusWindow, null, evtOpts);
};

proto.delWindow = function (index) {
  this.getWindows().eq(index).remove();
};

proto.focusWindow = function (index) {
  this.getWindows()
    .removeClass("TaskbarBtnSel")
    .eq(index)
      .class("TaskbarBtnSel");
};

proto.blurWindow = function (index) {
  this.getWindows().eq(index)
    .removeClass("TaskbarBtnSel");
};

proto.getWindowIndex = function (node) {
  return this.getWindows().indexOf(node);
};

proto.setSize = function (w, h) {
  this[_].taskbar.style([
    `width: ${w}`,
    `height: ${h}`
  ]);
};

proto.setPosition = function ({anchorX, anchorY, anchorB, b}) {
  this[_].taskbar.style([
    "left",
    "top",
    "right",
    "bottom",
    `${anchorX}: 0`,
    `${anchorY}: 0`,
    "border-width: 0",
    `border-${anchorB}-width: ${b}px`
  ]);
};

/* exports */
module.exports = proto;
