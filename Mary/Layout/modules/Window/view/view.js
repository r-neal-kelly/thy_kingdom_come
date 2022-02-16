"use strict";

/* requires */
const {utils, dom, HTML} = Mary;

/* components */
require("./css");

/* constants */
const _ = Symbol();
const proto = utils.newObj();

/* functions */

/* methods */
proto.init = function (host) {
  this[_] = utils.newObj();
  this[_].ns = Symbol();
  this[_].layout = host;
  this.initWindow();
  this.initTitleBar();
  this.initModule();
  this.initListeners();
};

proto.initWindow = function () {
  const {w, h} = this.m.getSize();
  const {x, y} = this.m.getPosition();
  const {b} = this.m.getBorder();
  this[_].window = dom(HTML.div)
    .appendTo(this[_].layout)
    .class("LayoutWindow")
    .style([
      `width: ${w}px`,
      `height: ${h}px`,
      `left: ${x}px`,
      `top: ${y}px`,
      `border-width: ${b}px`
    ]);
};

proto.initTitleBar = function () {
  this[_].titleBar = dom(HTML.div)
    .appendTo(this[_].window)
    .class("TitleBar");
  this[_].title = dom(HTML.div)
    .appendTo(this[_].titleBar)
    .class("WindowTitle");
  this[_].winControl = dom(HTML.div)
    .appendTo(this[_].titleBar)
    .class("WinControl");
  this[_].minimize = dom(HTML.button)
    .appendTo(this[_].winControl)
    .class("Minimize")
    .setText("–");
  this[_].maximize = dom(HTML.button)
    .appendTo(this[_].winControl)
    .class("Maximize")
    .setText("☐");
  this[_].close = dom(HTML.button)
    .appendTo(this[_].winControl)
    .class("Close")
    .setText("☓");
};

proto.initModule = function () {
  this[_].module = dom(HTML.div)
    .appendTo(this[_].window)
    .class("Module");
};

proto.getEvtOpts = function () {
  return {thisObj: this.c, ns: this[_].ns};
};

proto.initListeners = function () {
  const {window, titleBar, minimize, maximize, close} = this[_];
  const evtOpts = this.getEvtOpts();
  const focusArgs = {close: close[0], minimize: minimize[0]};
  const focusOpts = Object.assign({args: focusArgs}, evtOpts);
  window.on("mousedown", this.c.startFocus, null, focusOpts);
  titleBar.on("mousedown", this.c.startMove, null, evtOpts);
  window.on("mousemove", this.c.startResize, null, evtOpts);
  minimize.on("click", this.c.minimize, null, evtOpts);
  maximize.on("click", this.c.toggleMaximize, null, evtOpts);
  close.on("click", this.c.close, null, evtOpts);
};

proto.move = function (on) {
  const {layout} = this[_];
  const evtOpts = this.getEvtOpts();
  if (on) {
    layout.on("mousemove", this.c.move, null, evtOpts)
      .style("user-select: none");
  } else {
    layout.off(this.c.move, null, evtOpts)
      .style("user-select");
  }
};

proto.resize = function (on) {
  const {layout, window} = this[_];
  const evtOpts = this.getEvtOpts();
  evtOpts.args = {window: window.first};
  if (on) {
    window.off(this.c.startResize, null, evtOpts);
    layout.on("mousemove", this.c.resize, null, evtOpts)
      .style("user-select: none");
  } else {
    layout.off(this.c.resize, null, evtOpts)
      .style("user-select");
    window.on("mousemove", this.c.startResize, null, evtOpts);
    this.setCursor();
  }
};

proto.setSize = function (w, h) {
  this[_].window.style([
    `width: ${w}px`,
    `height: ${h}px`
  ]);
};

proto.setPosition = function (x, y) {
  this[_].window.style([
    `left: ${x}px`,
    `top: ${y}px`
  ]);
};

proto.setCursor = function (direction) {
  if (direction) {
    this[_].layout.style([
      `cursor: ${direction}-resize`
    ]);
  } else {
    this[_].layout.style("cursor");
  }
};

proto.setZIndex = function (index) {
  this[_].window.style(`z-index: ${index}`);
};

proto.minimize = function () {
  this[_].window.hide();
};

proto.unminimize = function () {
  this[_].window.show();
};

proto.maximize = function (w, h, anchorX, anchorY) {
  this[_].window.style([
    `width: ${w}`,
    `height: ${h}`,
    "left",
    "top",
    "right",
    "bottom",
    `${anchorX}: 0`,
    `${anchorY}: 0`
  ]);
};

proto.unmaximize = function (w, h, x, y) {
  this[_].window.style([
    `width: ${w}px`,
    `height: ${h}px`,
    `left: ${x}px`,
    `top: ${y}px`,
    "right",
    "bottom"
  ]);
};

proto.close = function () {
  this[_].window.remove();
};

proto.sendResize = function () {
  const offset = this[_].module.getOffset();
  this[_].module.send("resize", offset);
};

proto.loadModule = function ({name, path}) {
  if (!path) return;
  this[_].title.setText(name);
  Mary.require(path)(this[_].module);
};

/* exports */
module.exports = proto;
