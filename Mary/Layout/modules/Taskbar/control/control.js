"use strict";

/* requires */
const {utils} = Mary;

/* constants */
const _ = Symbol();
const proto = utils.newObj();

/* methods */
proto.init = function ({host, msg}) {
  this[_] = utils.newObj();
  this[_].msg = msg;
  this.c.setSubs();
  this.m.init();
  this.v.init(host);
  this.setPosition("bottom"); // should be in save file, called through model
  return this.v.getTop();
};

proto.setSubs = function () {
  const msgOptsM = {thisObj: this.m};
  this[_].msg.sub("window-opened", this.m.addWindow, msgOptsM);
  this[_].msg.sub("window-focused", this.m.focusWindow, msgOptsM);
  this[_].msg.sub("window-minimized", this.m.blurWindow, msgOptsM);
  this[_].msg.sub("window-closed", this.m.delWindow, msgOptsM);
};

proto.setPosition = function (position) {
  this.m.setPosition(position);
  this[_].msg.pub("taskbar-changed", this.m.getState());
};

proto.toggleMenu = function (e) {
  this[_].msg.pub("menu-toggled");
};

proto.focusWindow = function (e, {node}) {
  const i = this.v.getWindowIndex(node);
  this.m.focusWindowByIndex(i);
};

/* exports */
module.exports = proto;
