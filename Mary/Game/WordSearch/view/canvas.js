"use strict";

/* requires */
const msg = Mary.msg("WordSearch");
const {utils, dom, HTML, font} = Mary;

/* components */

/* constants */
const loadedFonts = {};

/* functions */
const getRadius = (max, len, pad, card) => {
  let radius = ((len * max * pad - max) / 2) + (max * .72);
  if (["nw", "ne", "se", "sw"].includes(card))
    radius += len * max / 3;
  return radius;
};

const getRotation = card => {
  let degree = 0;
  if (["w", "e"].includes(card)) degree = 0
  if (["nw", "se"].includes(card)) degree = 45
  if (["n", "s"].includes(card)) degree = 90
  if (["ne", "sw"].includes(card)) degree = 135
  return degree * Math.PI / 180;
};

/* constructor */
const Canvas = function () {
  this.v.canvas = dom(HTML.canvas)
    .appendTo(this.v.top)
    .class("Canvas")
    .hide();
  this.v.ctx = this.v.canvas.first.getContext("2d");
};

/* methods */
const canvas = utils.newObj();

canvas.getNewState = function () {
  this.c.lastPoint = null;
  this.v.state = {pad: 1.67, highlighted: []};
};

canvas.refresh = (id => function () {
  if (!this.c.on) return;
  if (id) clearTimeout(id);
  id = setTimeout(this.quickRefresh.bind(this), 200);
})();

canvas.quickRefresh = function () {
  this.resize(); // also clears
  this.styleText();
  this.draw();
  this.drawWords();
  this.drawHighlights();
};

canvas.resize = function () {
  let top = this.v.top.first;
  let menu = this.v.menu.first;
  let canvas = this.v.canvas.first;
  canvas.width = top.offsetWidth;
  canvas.height = top.offsetHeight - menu.offsetHeight;
};

canvas.styleText = function (styles = {}) {
  const {font, textAlign, textBaseline, direction} = styles;
  this.v.ctx.fillStyle = "white";
  this.v.ctx.strokeStyle = "#ae4a60";
  this.v.ctx.font = font || this.getFontStyle();
  this.v.ctx.textAlign = textAlign || "start";
  this.v.ctx.textBaseline = textBaseline || "alphabetic";
  this.v.ctx.direction = direction || "inherit";
};

canvas.clear = function () {
  const {width, height} = this.v.canvas.first;
  this.v.ctx.clearRect(0, 0, width, height);
};

canvas.getMetric = function () {
  const font = this.getFontStyle();
  const {text, unitRegex} = this.m;
  const span = dom(HTML.span)
    .appendTo(document.body)
    .style([ "margin:0", "padding:0", `font: ${font}`]);
  let maxWidth = 0, maxHeight = 0;
  let chars = {};
  for (let char of text.match(unitRegex)) {
    span.setText(char);
    const w = span.first.offsetWidth;
    const h = span.first.offsetHeight;
    if (w > maxWidth) maxWidth = w;
    if (h > maxHeight) maxHeight = h;
    if (chars[char]) continue;
    chars[char] = {cX: w / 2, cY: h / 2};
  }
  const max = Math.max(maxWidth, maxHeight);
  span.remove();
  return {max, chars};
};

canvas.draw = function () {
  const {ctx} = this.v;
  const {pad} = this.v.state;
  const {max, chars} = this.getMetric();
  this.v.state.points = {};
  this.v.state.max = max;
  this.v.state.gridW = this.m.w * max * pad;
  this.v.state.gridH = this.m.h * max * pad;
  for (let [point, l] of Object.entries(this.m.grid)) {
    let [x, y] = point.split(".");
    let {cX, cY} = chars[l];
    x = x * max * pad - max;
    y = y * max * pad - max;
    cX = x + (max / 2) - cX;
    cY = y + max - (cY / 2);
    ctx.fillText(l, cX, cY);
    this.v.state.points[point] = {x, y, l};
  }
};

canvas.drawWords = function () {
  const {max, pad, gridW, gridH} = this.v.state;
  let x = max * 2 + gridW, y = max;
  let maxWidth =  0;
  this.v.ctx.font = `${this.getListFontSize()} "${this.getFontName()}"`;
  this.v.state.wCoords = {};
  for (let word of Object.keys(this.m.wordMaps).sort()) {
    const {width} = this.v.ctx.measureText(word);
    if (width > maxWidth) maxWidth = width;
    if (y + max >= gridH) x += maxWidth + max, y = max;
    this.v.ctx.fillText(word, x, y);
    this.v.state.wCoords[word] = {x, y, w: width};
    y += max;
  }
};

canvas.drawHighlights = function () {
  const {highlighted} = this.v.state;
  for (let word of highlighted) {
    this.getWordHighlight(word);
  }
};

canvas.drawHighlight = function (word, points) {
  const {max, pad, highlighted} = this.v.state;
  const {ctx} = this.v;
  const {hX, hY, lX, lY, len, card} = points;
  const x = (hX + lX + max) / 2;
  const y = (hY + lY + max) / 2;
  const rX = getRadius(max, len, pad, card);
  const rY = (max * pad - max) * .96;
  const ro = getRotation(card);
  ctx.beginPath()
  ctx.ellipse(x, y, rX, rY, ro, 0, 2 * Math.PI);
  ctx.stroke();
  if (!highlighted.includes(word)) highlighted.push(word);
  this.drawWordHighlight(word);
  this.ifDone();
};

canvas.drawWordHighlight = function (word) {
  const {ctx} = this.v;
  const {max, wCoords} = this.v.state;
  const {x, y, w} = wCoords[word];
  const h = max;
  this.v.ctx.strokeRect(x, y - h / 4, w, h - h);
};

/* subscriptions */
msg.sub("initialize", host => {
});

msg.sub("view-init-game", game => {
  game.extend(canvas);
  Canvas.call(game);
});

/* exports */
module.exports = true;
