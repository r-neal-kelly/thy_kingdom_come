"use strict";

/* requires */
const {utils} = Mary;

/* constants */
const _ = Symbol();
const proto = utils.newObj();

/* methods */
proto.init = function ({host, msg, winGlobals, module}) {
  this[_] = utils.newObj();
  this[_].msg = msg;
  this.c.setSubs();
  this.m.init(winGlobals, module);
  this.v.init(host);
  this.m.loadModule();
  this[_].msg.pub("window-opened", this); // maybe a protected object?
  this.focus();
};

proto.setSubs = function () {
  const msgOptsM = {thisObj: this.m};
  const msgOptsC = {thisObj: this.c};
  this[_].msg.sub("taskbar-changed", this.m.reMaximize, msgOptsM);
};

proto.startMove = function (e, {node}) {
  this.v.move(true);
};

proto.move = function (e, {node}) {
  const {buttons, movementX, movementY} = e;
  if (buttons !== 1) return this.v.move(false);
  this.m.addToPosition(movementX, movementY);
};

proto.startResize = function (e, {node}) {
  if (e.buttons === 1) return; // in case it's in move
  if (e.target !== node) return;
  this.v.resize(true);
};

proto.resize = function (e, {node}, {window}) {
  if (e.target !== window && e.buttons !== 1)
    return this.v.resize(false);
  if (e.buttons !== 1) {
    this[_].direction = this.m.getDirection(e.offsetX, e.offsetY);
    this.v.setCursor(this[_].direction);
  } else {
    this.m.resize(this[_].direction, e.movementX, e.movementY);
    this.v.sendResize();
  }
};

proto.startFocus = function (e, {node}, {close, minimize}) {
  if (e.target !== close && e.target !== minimize) this.focus();
};

proto.focus = function () {
  if (this.m.isMinimized()) return;
  this[_].msg.pub("window-focused", this);
};

proto.minimize = function () {
  if (this.m.isMinimized()) return;
  this.m.minimize();
  this[_].msg.pub("window-minimized", this);
};

proto.unminimize = function () {
  if (!this.m.isMinimized()) return;
  this.m.unminimize();
  this[_].msg.pub("window-unminimized", this);
};

proto.maximize = function () {
  if (this.m.isMaximized()) return;
  this.m.maximize();
  this[_].msg.pub("window-maximized", this);
  this.v.sendResize();
};

proto.unmaximize = function () {
  if (!this.m.isMaximized()) return;
  this.m.unmaximize();
  this[_].msg.pub("window-unmaximized", this);
  this.v.sendResize();
};

proto.toggleMaximize = function () {
  if (this.m.isMaximized()) {
    this.unmaximize();
  } else {
    this.maximize();
  }
};

proto.close = function () {
  this[_].msg.pub("window-closing", this); // maybe as a prevent system?
  this.m.close();
  this[_].msg.pub("window-closed", this);
};

// reroute methods
proto.getName = function () {
  return this.m.getName();
};

proto.getPosition = function () {
  return this.m.getPosition();
};

proto.setPosition = function (x, y) {
  return this.m.setPosition(x, y);
};

proto.setZIndex = function (index) {
  return this.v.setZIndex(index);
};

proto.isMinimized = function () {
  return this.m.isMinimized();
};

/* exports */
module.exports = proto;
