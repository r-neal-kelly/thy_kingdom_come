"use strict";

/* requires */
const utils = Mary.require("Utils");
const msg = Mary.require("Msg")("Lasso");
const dom = Mary.require("Dom");
const HTML = Mary.require("HTML");
const css = Mary.require("CSS")("Lasso", true);

/* variables */
let lasso;
let lassoStartX, lassoStartY;
let lassoWidth, lassoHeight;
let lassoPosX, lassoPosY;
let elements, selection;

/* css */
css.define(".Lasso", [
  "position: fixed",
  "z-index: 1000",
  "background-color: rgba(224,236,255,.7)"
]);

css.define(".LassoHighlight", [
  "background-color: rgba(255,255,255,.5)"
]);

/* functions */
const getElements = () => {
  elements = dom("[data-lasso]").array();
};

const terminate = () => {
  if (!lasso) return;
  lasso.remove();
  lasso = null;
  msg.pub("payload", selection);
};

const initialize = e => {
  getElements();
  lassoStartX = e.x;
  lassoStartY = e.y;
  lasso = dom(HTML.div, document.body, 1, true)
    .class("Lasso");
};

const update = e => {
  lassoWidth = Math.abs(lassoStartX - e.x);
  lassoHeight = Math.abs(lassoStartY - e.y);
  lassoPosX = (e.x < lassoStartX) ?
    lassoStartX - lassoWidth : lassoStartX;
  lassoPosY = (e.y < lassoStartY) ?
    lassoStartY - lassoHeight : lassoStartY;
  lasso.style([
    `left: ${lassoPosX}px`,
    `top: ${lassoPosY}px`,
    `width: ${lassoWidth}px`,
    `height: ${lassoHeight}px`
  ]);
  hitDetect();
  e.preventDefault();
};

const hitDetect = () => {
  const lassoRect = lasso.first.getBoundingClientRect();
  selection = [];
  for (let elem of elements) {
    if (!elem.getBoundingClientRect) continue;
    const elemRect = elem.getBoundingClientRect();
    const elemClass = dom(elem).getAttr("data-lasso");
    if (intersects(lassoRect, elemRect)) {
      selection.push(elem);
      dom(elem).class(elemClass || "LassoHighlight");
    } else {
      dom(elem).removeClass(elemClass || "LassoHighlight");
    }
  }
};

const intersects = (a, b) => {
  return (
    a.left <= b.right &&
    b.left <= a.right &&
    a.top <= b.bottom &&
    b.top <= a.bottom
  );
};

/* listeners */
const lassoSelect = e => {
  if ([0,1].includes(e.buttons))
    return terminate();
  if (!lasso)
    initialize(e);
  update(e);
};

const lassoDeselect = e => {
  if (lasso || !selection) return;
  if (e && e.ctrlKey) return;
  dom(selection).wrapEach(node => {
    const elemClass = node.getAttr("data-lasso");
    node.removeClass(elemClass || "LassoHighlight");
  });
  selection = null;
  msg.pub("deselected");
};

const ctrlSelect = e => {
  if (!e.ctrlKey) return;
  const node = dom(e.target);
  if (!node.hasAttr("data-lasso")) return;
  const highlight =
    node.getAttr("data-lasso") || "LassoHighlight";
  node.class(highlight);
  selection = selection || [];
  selection.push(node.first);
  e.preventDefault();
};

/* subscriptions */
msg.sub("deselect", lassoDeselect);

/* initialize */
dom(window).on("mousemove", lassoSelect);
dom(window).on("click", lassoDeselect);
dom(window).on("click", ctrlSelect);

/* exports */
module.exports = true;
