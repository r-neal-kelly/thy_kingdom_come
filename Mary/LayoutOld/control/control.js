"use strict";

/* requires */
const {utils, dom} = Mary;
const msg = Mary.msg("Layout");

/* components */
require("./wins");
require("./menuEvents");
require("./winEvents");
// require("./shortcuts"); wip

/* variables */
let view, wins, addMenuEvents, addWinEvents, layoutWH;

/* functions */
const getNum = (elem, prop) => parseInt(elem.getStyle(prop));

/* methods */
let proto = utils.newObj();

proto.activate = function () {
  const {taskbar, taskbarBtn} = this.view;
  const {minimized} = this.data;
  if (minimized) this.unminimize();
  wins.update(this);
};

proto.close = function () {
  const {main, taskbarBtn} = this.view;
  wins.remove(this);
  wins.gotoPrevious();
  // need to save model also
  main.remove();
  taskbarBtn.remove();
};

proto.maximize = function () {
  const {layout, taskbar, main, titlebar, module} = this.view;
  const w = getNum(layout, "width");
  const layoutH = getNum(layout, "height");
  const taskbarH = getNum(taskbar, "height");
  const h = layoutH - taskbarH;
  this.data.maximized = true;
  main.style([
    `left: ${0}px`,  `top: ${0}px`,
    `width: ${w}px`, `height: ${h}px`
  ]);
  this.sendEvt(module, "resize", {w, h});
};

proto.unmaximize = function () {
  const {main, titlebar, module} = this.view;
  const {x, y, w, h} = this.data;
  const options = {thisObj: this, ns: this.id};
  this.data.maximized = false;
  main.style("border");
  main.style([
    `left: ${x}px`,  `top: ${y}px`,
    `width: ${w}px`, `height: ${h}px`
  ]);
  this.sendEvt(module, "resize", {w, h});
};

proto.minimize = function () {
  const {main} = this.view;
  this.data.minimized = true;
  main.style("display: none");
  wins.gotoPrevious();
};

proto.unminimize = function () {
  const {main} = this.view;
  this.data.minimized = false;
  wins.update(this);
  main.style("display");
};

proto.move = function (x, y, relative = false) {
  if (relative) {
    this.data.x += x;
    this.data.y += y;
  } else {
    this.data.x = x;
    this.data.y = y;
  }
  this.view.main.style([
    `left: ${this.data.x}px`,
    `top: ${this.data.y}px`,
  ]);
};

proto.resize = function (w, h, relative = false) {
  const min = 200;
  if (relative) {
    this.data.w += w;
    this.data.h += h;
  } else {
    this.data.w = w;
    this.data.h = h;
  }
  ({w, h} = this.data);
  if (w < min) w = min;
  if (h < min) h = min;
  this.view.main.style([
    `width: ${w}px`,
    `height: ${h}px`
  ]);
  this.genDataFromStyle();
  const {module} = this.view;
  const {mW, mH} = this.data;
  this.sendEvt(module, "resize", {w:mW, h:mH});
};

proto.sendEvt = function (elem, msg, data) {
  if (elem.first) elem = elem.first;
  const evt = new CustomEvent(msg, {detail: data});
  elem.dispatchEvent(evt); // maybe MaryDom this?
};

/* listeners */
const resizeAllWins = function (e) {
  const {w: oldW, h: oldH} = layoutWH;
  layoutWH = proto.getLayoutWH();
  const {w: newW, h: newH} = layoutWH;
  const proW = 1.00 * newW / oldW;
  const proH = 1.00 * newH / oldH;
  for (let win of wins) {
    const x = win.data.x * proW;
    const y = win.data.y * proH;
    const w = utils.round(win.data.w * proW, 4);
    const h = utils.round(win.data.h * proH, 4);
    win.move(x, y);
    win.resize(w, h);
    if (win.data.maximized) win.maximize();
  }
};

/* subscriptions */
msg.sub("control-view", viewObj => {
  view = viewObj;
});

msg.sub("control-wins", winsArray => {
  wins = winsArray;
});

msg.sub("control-menuEvents", addEvents => {
  addMenuEvents = addEvents;
});

msg.sub("control-winEvents", addEvents => {
  addWinEvents = addEvents;
});

msg.sub("control-init-proto", extend => {
  proto = extend(proto);
  msg.pub("model-proto-ready");
});

msg.sub("control-new-window", win => {
  win.loadData() || win.genData();
  win.init();
  wins.update(win);
  addWinEvents(win);
});

msg.sub("initialize", () => {
  // the idea is to somehow tell it what 
  // sub-module to start loading. This
  // will do for now though.
  msg.pub("model-init-proto");
  msg.pub("model-new-window", "Scripture");
  msg.pub("model-new-window", "Search");
  dom(window).on("resize", resizeAllWins);
  addMenuEvents(view);
  layoutWH = proto.getLayoutWH();
});

/* exports */
module.exports = true;
