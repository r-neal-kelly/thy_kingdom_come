"use strict";

/* requires */
const msg = Mary.msg("WordSearch");
const {utils, dom} = Mary;

/* constants */
const games = utils.newObj();

/* functions */

/* constructor */
const Game = host => {
  const game = utils.newObj(proto);
  game.host = dom(host || document.body);
  game.host.children().remove();
  game.c = utils.newObj();
  game.c.on = false;
  return game;
};

/* methods */
const proto = {};

proto.extend = function (extension) {
  Object.assign(proto, extension);
};

proto.getOptions = function () {
  if (!this.v) return; // defaults
  const diff = this.v.diff.value();
  const size = this.v.size.value();
  const lenLim = this.v.lenLim.value();
  const lang = this.v.lang.value();
  const version = this.v.versions.value();
  const sub = this.v.subs.value();
  const module = this;
  let w, h;
  if (size === "small") w = 12, h = 12;
  if (size === "medium") w = 18, h = 18;
  if (size === "large") w = 28, h = 28;
  return {w, h, diff, lenLim, lang, version, sub, module};
};

proto.reset = async function () {
  this.v.endGame.show();
  this.v.winGame.hide();
  this.v.canvas.show();
  this.showLoading();
  await this.getNewModel();
  this.getNewState();
  this.setFonts();
  this.c.on = true;
  this.refresh();
  this.hideLoading();
};

proto.find = function (fx, fy) {
  const {max, pad, points} = this.v.state;
  const oldPoint = this.c.lastPoint;
  for (let [point, {x, y, l}] of Object.entries(points)) {
    const X = x + max;
    const Y = y + max;
    if (fx < x || fx > X || fy < y || fy > Y) continue;
    this.c.lastPoint = point;
    if (oldPoint && point) this.getMatch(oldPoint, point);
    break;
  }
};

proto.close = function () {
  this.clear();
  this.c.on = false;
  this.v.state = null;
  this.m = null;
  this.v.endGame.hide();
  this.v.winGame.hide();
  this.v.canvas.hide();
};

proto.ifDone = function () {
  const {highlighted} = this.v.state;
  const wordMaps = Object.keys(this.m.wordMaps);
  if (highlighted.length === wordMaps.length)
    this.v.winGame.show();
};

/* listeners */
const onResize = function (e, thisObj) {
  this.refresh();
};

const onNewGame = function (e, thisObj) {
  this.reset();
};

const onEndGame = function (e, thisObj) {
  this.close();
};

const onLangChange = function (e, thisObj) {
  this.setVersions();
  this.setSubs();
};

const onFontChange = function (e, thisObj) {
  this.styleFontSelect();
  this.refresh();
};

const onFontSizeChange = function (e, thisObj) {
  this.refresh();
};

const onCanvasClick = function (e, thisObj) {
  const fx = e.offsetX;
  const fy = e.offsetY;
  this.find(fx, fy);
};

/* subscriptions */
msg.sub("initialize", host => {
  const game = Game(host);
  msg.pub("model-init-game", game);
});

msg.sub("control-init-game", game => {
  const options = {thisObj: game, ns: "WordSearch"};
  game.host.on("resize", onResize, null, options);
  game.v.newGame.on("click", onNewGame, null, options);
  game.v.endGame.on("click", onEndGame, null, options);
  game.v.lang.on("change", onLangChange, null, options);
  game.v.fonts.on("change", onFontChange, null, options);
  game.v.fontSize.on("change", onFontSizeChange, null, options);
  game.v.canvas.on("click", onCanvasClick, null, options);
});

/* exports */
module.exports = true;
