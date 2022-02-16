"use strict";

/* requires */
const {utils} = Mary;
const msg = Mary.msg("Layout");

/* constants */

/* variables */
let wins;

/* functions */
const getNum = (elem, prop) => parseFloat(elem.getStyle(prop));

const addEvents = function (win) {
  const options = {thisObj: win, ns: win.id};
  win.view.main
    .on("mousedown", activate, null, options)
    .on("mouseover", startResize, null, options);
  win.view.titlebar
    .on("mousedown", startMove, null, options);
  win.view.taskbarBtn
    .on("mousedown", taskToggle, null, options);
  win.view.close
    .on("click", win.close, null, options);
  win.view.maximize
    .on("click", maximize, null, options);
  win.view.minimize
    .on("click", minimize, null, options);
};

/* activate */
const activate = function (e) {
  const {close, minimize} = this.view;
  if (e.target === close.first) return;
  if (e.target === minimize.first) return;
  this.activate();
};

/* control buttons */
const maximize = function (e) {
  if (this.data.maximized) {
    this.unmaximize();
  } else {
    this.maximize();
  }
};

const minimize = function (e) {
  if (this.data.minimized) {
    this.unminimize();
  } else {
    this.minimize();
  }
};

const taskToggle = function (e) {
  const min = this.data.minimized;
  if (wins.last() === this && !min) {
    this.minimize();
  } else if (min) {
    this.unminimize();
  } else {
    this.activate();
  }
};

/* move */
const startMove = function (e, elem) {
  if (e.buttons !== 1) return;
  if (this.data.maximized) return;
  const {layout, titlebar} = this.view;
  if (e.target !== titlebar.first) return;
  const ns = this.id;
  layout.on("mousemove", move, null, {thisObj: this, ns});
  layout.style("user-select: none");
};

const move = function (e) {
  if (e.buttons !== 1)
    return stopMove.call(this);
  this.move(e.movementX, e.movementY, true);
};

const stopMove = function () {
  const {layout} = this.view;
  layout.off(move, null, {ns: this.id});
  layout.style("user-select");
};

/* resize */
const startResize = function (e, elem) {
  if (e.buttons === 1) return;
  if (this.data.maximized) return;
  const {layout, main} = this.view;
  if (e.target !== main.first) return;
  const ns = this.id;
  layout.on("mousemove", resize1, null, {thisObj: this, ns});
};

const resize1 = function (e, elem) {
  const {layout, main} = this.view;
  if (e.target !== main.first)
    return stopResize1.call(this);
  const x = e.offsetX;
  const y = e.offsetY;
  const {inW, inH} = this.data;
  let pos;
  if ((x < 0) && (y < 0)) pos = "nw";
  else if ((x > inW) && (y < 0)) pos = "ne";
  else if ((x < 0) && (y > inH)) pos = "sw";
  else if ((x > inW) && (y > inH)) pos = "se";
  else if (y < 0) pos = "n";
  else if (x < 0) pos = "w";
  else if (y > inH) pos = "s";
  else if (x > inW) pos = "e";
  layout.style(`cursor: ${pos}-resize`);
  if (e.buttons === 1) {
    const options = {thisObj: this, ns: this.id, args: {pos}};
    stopResize1.call(this);
    layout.style(`cursor: ${pos}-resize`);
    layout.on("mousemove", resize2, null, options);
    layout.style("user-select: none");
  }
};

const stopResize1 = function () {
  const {layout} = this.view;
  layout.off(resize1, null, {ns: this.id});
  layout.style("cursor");
};

const resize2 = function (e, elem, {pos}) {
  if (e.buttons !== 1) return stopResize2.call(this);
  let {w, h, x, y} = this.data;
  let {module} = this.view;
  if (["e","ne","se"].includes(pos)) w += e.movementX;
  if (["w","nw","sw"].includes(pos)) w -= e.movementX;
  if (["s","sw","se"].includes(pos)) h += e.movementY;
  if (["n","nw","ne"].includes(pos)) h -= e.movementY;
  if (["w","nw","sw"].includes(pos)) x += e.movementX;
  if (["n","nw","ne"].includes(pos)) y += e.movementY;
  this.move(x, y);
  this.resize(w, h);
  e.preventDefault();
  //document.getSelection().collapse(document);
};

const stopResize2 = function () {
  const {layout} = this.view;
  layout.off(resize2, null, {ns: this.id});
  layout.style("user-select");
  layout.style("cursor");
};

/* subscriptions */
msg.sub("initialize", () => {
  msg.pub("control-winEvents", addEvents);
});

msg.sub("control-wins", winsArray => {
  wins = winsArray;
});

/* exports */
module.exports = true;
