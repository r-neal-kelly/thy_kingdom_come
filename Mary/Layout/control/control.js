"use strict";

/* requires */
const {utils, msg} = Mary;

/* components */
const Taskbar = require("../modules/Taskbar");
const Menu = require("../modules/Menu");
const Window = require("../modules/Window");

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
  return true;
};

proto.setSubs = function () {
  const msgOptsM = {thisObj: this.m};
  const msgOptsC = {thisObj: this.c};
  this[_].msg.sub("taskbar-changed", this.m.setMaxWinGlobals, msgOptsM);
  this[_].msg.sub("window-requested", this.c.newWindow, msgOptsC);
  this[_].msg.sub("window-opened", this.m.initWindow, msgOptsM);
  this[_].msg.sub("window-focused", this.m.focusWindow, msgOptsM);
  this[_].msg.sub("window-minimized", this.m.focusLastActiveWindow, msgOptsM);
  this[_].msg.sub("window-closed", this.m.closeWindow, msgOptsM);
};

proto.initTaskbar = function (host) {
  const {msg} = this[_];
  return this[_].taskbar = Taskbar({host, msg});
};

proto.initMenu = function (host) {
  const {msg} = this[_];
  return this[_].menu = Menu({host, msg});
};

proto.newWindow = function ({module}) {
  const host = this.v.getTop();
  const {msg} = this[_];
  const winGlobals = this.m.getWinGlobals();
  const defs = this.v.getDefWinGlobals();
  this.m.setDefWinGlobals(defs);
  Window({host, msg, winGlobals, module});
};

proto.preventTextSelect = function (e, {node}, {layout}) {
  if (e.target === node || e.target === layout) e.preventDefault();
};

/* exports */
module.exports = proto;
