"use strict";

/* Mary */
global.Mary = Object.create(null);

Mary.require = (modulePath) => {
  if (Mary[modulePath]) return Mary[modulePath];
  else return require(`../Mary/${modulePath}`);
};

Mary.path = Mary.require("Path");
Mary.utils = Mary.require("Utils"); // possibly a problem.
Mary.megaMsg = Mary.require("Msg");
Mary.HTML = Mary.require("HTML");
Mary.stats = Mary.require("Stats");

/* requires */
const {app, BrowserWindow, Menu, dialog} = require("electron");
const {top:topPath, boot:bootPath} = Mary.require("Path");

/* components */
const NewWindow = require(`${bootPath}/NewWindow`);

/* variables */
let win;

/* functions */
const createWin = function () {
  win = NewWindow("main", topPath, {dev:true, title:"Thy Kingdom Come"});
};

/* events */
app.on("ready", function () {
  createWin();
});

app.on("window-all-closed", function () {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (win == null) createWin();
});
