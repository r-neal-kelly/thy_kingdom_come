"use strict";

/* requires */
const fs = require("fs");
const {utils} = Mary;

/* constants */
const _ = Symbol();
const proto = utils.newObj();
const defBase = 36;
const defBorder = 3;
const defPosition = "bottom";

/* methods */
proto.init = function () {
  this[_] = utils.newObj();
  this[_].windows = [];
  this[_].base = defBase;
  this[_].b = defBorder;
  this[_].position = defPosition;
  this[_].w = null;
  this[_].h = null;
  this[_].anchorX = null;
  this[_].anchorY = null;
  this[_].anchorB = null;
};

proto.addWindow = function (window) {
  this[_].windows.push(window);
  this.v.addWindow(window.getName());
};

proto.delWindow = function (window) {
  const i = this[_].windows.indexOf(window);
  if (i !== -1) {
    this[_].windows.splice(i, 1);
    this.v.delWindow(i);
  }
};

proto.movWindow = function (fromIndex, toIndex) {
  const window = this[_].windows[fromIndex];
  if (window) this[_].windows.splice(fromIndex, 1);
  this[_].windows.splice(toIndex, 0, window);
  this.v.movWindow(); // will drop do it or is it manual?
};

proto.focusWindow = function (window) {
  const i = this[_].windows.indexOf(window);
  if (i !== -1) this.v.focusWindow(i);
};

proto.blurWindow = function (window) {
  const i = this[_].windows.indexOf(window);
  if (i !== -1) this.v.blurWindow(i);
};

proto.focusWindowByIndex = function (index) {
  const window = this[_].windows[index];
  window.unminimize();
  window.focus();
};

proto.getState = function () {
  const {base, position} = this[_];
  return {base, position};
};

proto.setSize = function (w, h) {
  this[_].w = w || this[_].w;
  this[_].h = h || this[_].h;
  this.v.setSize(this[_].w, this[_].h);
};

proto.setPosition = function (position) {
  if (!position) position = this[_].position;
  else this[_].position = position;
  if (position === "bottom") {
    this[_].anchorX = "left";
    this[_].anchorY = "bottom";
    this[_].anchorB = "top";
    this.setSize("100%", `${this[_].base}px`);
  } else if (position === "top") {
    this[_].anchorX = "left";
    this[_].anchorY = "top";
    this[_].anchorB = "bottom";
    this.setSize("100%", `${this[_].base}px`);
  } else if (position === "left") {
    this[_].anchorX = "left";
    this[_].anchorY = "top";
    this[_].anchorB = "right";
    this.setSize(`${this[_].base}px`, "100%");
  } else if (position === "right") {
    this[_].anchorX = "right";
    this[_].anchorY = "top";
    this[_].anchorB = "left";
    this.setSize(`${this[_].base}px`, "100%");
  }
  const {anchorX, anchorY, anchorB, b} = this[_];
  this.v.setPosition({anchorX, anchorY, anchorB, b});
};

/* exports */
module.exports = proto;
