"use strict";

/* requires */
const {remote} = require("electron");
const eScreen = require("electron").screen;
const utils = Mary.require("Utils");

/* constants */
const sizes = 
  { "error-check": {w:1250,h:602}
  };
const positions = 
  { "error-check": {x:670,y:297}
  };

/* variables */
let scrW, scrH;

/* functions */
const resize = (size, position) => {
  const win = remote.getCurrentWindow(); // problem when called from other window.
  const is = utils.isNumber;
  let S, P;

  if (!size && !position) {
    win.setSize(800,600);
    win.center();
    return;
  }

  if (!utils.isObject(size))
    S = sizes[size] || sizes[position];
  if (!utils.isObject(position))
    P = positions[position] || positions[size];

  if (utils.isFunction(S)) S = S();
  if (utils.isFunction(P)) P = P();

  const {w,h} = S || {};
  const {x,y} = P || {};
  if (size !== null && is(w) && is(h))
    win.setSize(w,h);
  if (position !== null && is(x) && is(y))
    win.setPosition(x,y);
};

const getDisplay = () => {
  const point = eScreen.getCursorScreenPoint();
  const display = eScreen.getDisplayNearestPoint(point);
  ({width: scrW, height: scrH} = display.workArea);
};

/* sets */
sizes["left-half"] = () => {
  getDisplay();
  const w = utils.round(scrW / 2, 0);
  const h = scrH;
  return {w,h};
};
positions["left-half"] = () => {
  getDisplay();
  const x = 0;
  const y = 0;
  return {x,y};
};

sizes["right-half"] = sizes["left-half"];
positions["right-half"] = () => {
  getDisplay();
  const x = utils.round(scrW / 2, 0);
  const y = 0;
  return {x,y};
};

/* exports */
module.exports = resize;
