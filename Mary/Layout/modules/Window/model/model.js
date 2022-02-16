"use strict";

/* requires */
const fs = require("fs");
const {utils} = Mary;

/* constants */
const _ = Symbol();
const proto = utils.newObj();
const defName = "Empty";
const defX = 0;
const defY = 0;
const minW = 200;
const minH = 200;
const defB = 13;

/* methods */
proto.init = function (winGlobals, {name, path}) {
  this[_] = utils.newObj();
  this[_].name = name || defName;
  this[_].path = path || null;
  this[_].w = minW;
  this[_].h = minH;
  this[_].x = defX;
  this[_].y = defY;
  this[_].b = defB;
  this[_].minimized = false;
  this[_].maximized = false;
  Object.defineProperties(this[_],
    { inW:        { get: function () { return this.w - this.b * 2   } }
    , inH:        { get: function () { return this.h - this.b * 2   } }
    , maximizedW: { get: function () { return winGlobals.maximizedW } } // use loop?
    , maximizedH: { get: function () { return winGlobals.maximizedH } }
    , maxAnchorX: { get: function () { return winGlobals.maxAnchorX } }
    , maxAnchorY: { get: function () { return winGlobals.maxAnchorY } }
    , defaultW:   { get: function () { return winGlobals.defaultW   } }
    , defaultH:   { get: function () { return winGlobals.defaultH   } }
    , defaultX:   { get: function () { return winGlobals.defaultX   } }
    , defaultY:   { get: function () { return winGlobals.defaultY   } }
    }
  );
};

proto.getName = function () {
  return this[_].name;
};

proto.getSize = function () {
  const {w, h} = this[_];
  return {w, h};
};

proto.setSize = function (w, h) {
  this[_].w = (utils.isNumber(w)) ? w : this[_].w;
  this[_].h = (utils.isNumber(h)) ? h : this[_].h;
  this.v.setSize(this[_].w, this[_].h);
};

proto.addToSize = function (w, h) {
  this[_].w += (utils.isNumber(w)) ? w : 0;
  this[_].h += (utils.isNumber(h)) ? h : 0;
  this.v.setSize(this[_].w, this[_].h);
};

proto.getPosition = function () {
  const {x, y} = this[_];
  return {x, y};
};

proto.setPosition = function (x, y) {
  this[_].x = (utils.isNumber(x)) ? x : this[_].x;
  this[_].y = (utils.isNumber(y)) ? y : this[_].y;
  this.v.setPosition(this[_].x, this[_].y);
};

proto.addToPosition = function (x, y) {
  this[_].x += (utils.isNumber(x)) ? x : 0;
  this[_].y += (utils.isNumber(y)) ? y : 0;
  this.v.setPosition(this[_].x, this[_].y);
};

proto.getBorder = function () {
  const {b} = this[_];
  return {b};
};

proto.getDirection = function (x, y) {
  const {inW, inH} = this[_];
  let direction = "";
  if ( y < 0   ) direction += "n";
  if ( y > inH ) direction += "s";
  if ( x < 0   ) direction += "w";
  if ( x > inW ) direction += "e";
  return direction;
};

proto.resize = function (direction, x2, y2) {
  let {w, h, x, y} = this[_];
  if (/s/.test(direction)) h += y2;
  if (/e/.test(direction)) w += x2;
  if (/n/.test(direction)) h -= y2, y += y2;
  if (/w/.test(direction)) w -= x2, x += x2;
  if (w < minW) w = null, x = null;
  if (h < minH) h = null, y = null;
  this.setSize(w, h);
  this.setPosition(x, y);
};

proto.minimize = function () {
  this[_].minimized = true;
  this.v.minimize();
};

proto.unminimize = function () {
  this[_].minimized = false;
  this.v.unminimize();
};

proto.isMinimized = function () {
  return this[_].minimized;
};

proto.maximize = function () {
  const {maximizedW, maximizedH, maxAnchorX, maxAnchorY} = this[_];
  this[_].maximized = true;
  this.v.maximize(maximizedW, maximizedH, maxAnchorX, maxAnchorY);
};

proto.unmaximize = function () {
  const {w, h, x, y} = this[_];
  this[_].maximized = false;
  this.v.unmaximize(w, h, x, y);
};

proto.isMaximized = function () {
  return this[_].maximized;
};

proto.reMaximize = function () {
  if (this[_].maximized) this.maximize();
};

proto.close = function () {
  // save window information, then:
  this.v.close();
};

proto.loadModule = function (host) {
  const {name, path} = this[_];
  this.v.loadModule({name, path});
  const {defaultW, defaultH, defaultX, defaultY} = this[_];
  this.setSize(defaultW, defaultH);
  this.setPosition(defaultX, defaultY);
};

/* exports */
module.exports = proto;
