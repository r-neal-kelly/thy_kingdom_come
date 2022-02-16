"use strict";

/* requires */
const fs = require("fs");
const {top:topPath} = Mary.require("Path");

/* constants */
const windowPath = `${topPath}/Save/window.json`;
const settings = {};

/* methods */
settings.saveWin = (win, id) => {
  const maxed = isMaxed(win);
  const file = read(windowPath);
  const [x,y] = win.getPosition();
  const [w,h] = win.getSize();
  file[id] = {x,y,w,h,maxed};
  write(windowPath, file);
};

settings.loadWin = (win, id) => {
  if (!fs.existsSync(windowPath)) return;
  const {x,y,w,h,maxed} = read(windowPath)[id];
  if (x == null) return;
  win.setPosition(x,y);
  win.setSize(w,h);
  if (maxed) win.maximize();
};

/* functions */
const read = fpath => {
  return JSON.parse(fs.readFileSync(fpath, "utf8"));
};

const write = (fpath, file) => {
  file = JSON.stringify(file, null, "  ");
  fs.writeFileSync(fpath, file, "utf8");
};

const isMaxed = win => {
  const maxed = win.isMaximized();
  win.unmaximize();
  return maxed;
};

/* exports */
module.exports = settings;
