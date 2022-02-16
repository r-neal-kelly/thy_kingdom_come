"use strict";

/* requires */
const fs = require("fs");
const {utils} = Mary;

/* constants */
const _ = Symbol();
const proto = utils.newObj();

/* methods */
proto.init = function () {
  this[_] = utils.newObj();
  this[_].windows = [];
  this[_].winGlobals = utils.newObj();
  this[_].winGlobals[_] = utils.newObj();
};

proto.initWindow = function (window) {
  let {x, y} = window.getPosition();
  while (true) {
    for (let win of this[_].windows) {
      const {x:x2, y:y2} = win.getPosition();
      if (x === x2 || y === y2) {
        x += 24, y += 24;
        continue;
      }
    }
    break;
  }
  window.setPosition(x, y);
  this.addWindow(window);
};

proto.addWindow = function (window) {
  this[_].windows.push(window);
};

proto.delWindow = function (window) {
  const i = this[_].windows.indexOf(window);
  if (i !== -1) this[_].windows.splice(i, 1);
};

proto.focusWindow = function (window) {
  this.delWindow(window);
  this.addWindow(window);
  for (let [i, window] of this[_].windows.entries()) {
    window.setZIndex(i);
  }
};

proto.focusLastActiveWindow = function () {
  for (let window of Array.from(this[_].windows).reverse()) {
    if (!window.isMinimized()) {
      window.focus();
      break;
    }
  }
};

proto.closeWindow = function (window) {
  this.delWindow(window);
  this.focusLastActiveWindow();
};

proto.readyWinGlobals = function () {
  const winGlobals = this[_].winGlobals;
  for (let prop of Object.keys(winGlobals[_])) {
    if (winGlobals[prop]) continue;
    Object.defineProperty(winGlobals, prop, {
      get: () => winGlobals[_][prop]
    });
  }
};

proto.getWinGlobals = function () {
  return this[_].winGlobals;
};

proto.setMaxWinGlobals = function ({base, position}) {
  const winGlobals = this[_].winGlobals[_];
  const size = `calc(100% - ${base}px)`;
  if (position === "bottom") {
    winGlobals.maximizedW = "100%";
    winGlobals.maximizedH = size;
    winGlobals.maxAnchorX = "left";
    winGlobals.maxAnchorY = "top";
  } else if (position === "top") {
    winGlobals.maximizedW = "100%";
    winGlobals.maximizedH = size;
    winGlobals.maxAnchorX = "left";
    winGlobals.maxAnchorY = "bottom";
  } else if (position === "left") {
    winGlobals.maximizedW = size;
    winGlobals.maximizedH = "100%";
    winGlobals.maxAnchorX = "right";
    winGlobals.maxAnchorY = "top";
  } else if (position === "right") {
    winGlobals.maximizedW = size;
    winGlobals.maximizedH = "100%";
    winGlobals.maxAnchorX = "left";
    winGlobals.maxAnchorY = "top";
  }
  this.readyWinGlobals();
};

proto.setDefWinGlobals = function ({w, h, x, y}) {
  // here we can set the def w,h,x,y of windows
  // with getter funcs that auto calc what we need.
  const winGlobals = this[_].winGlobals[_];
  winGlobals.defaultW = w;
  winGlobals.defaultH = h;
  winGlobals.defaultX = x;
  winGlobals.defaultY = y;
  this.readyWinGlobals();
};

/* exports */
module.exports = proto;
