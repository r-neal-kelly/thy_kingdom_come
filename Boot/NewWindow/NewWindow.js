"use strict";

/* requires */
const fs = require("fs");
const {BrowserWindow} = require("electron");
const utils = Mary.require("Utils");
const { boot: bootPath, images: imgPath, mary: maryPath} = Mary.require("Path");

/* components */
const settings = require(`${bootPath}/Settings`);
const confirm = require(`${bootPath}/Confirm`);

/* constants */
const defaultOptions = 
  { confirm: true
  , save: true
  , dev: false
  , win:
    { backgroundColor: "#0f1318" // need theme module here
    , icon: `${imgPath}/AlephTaw.ico`
    , show: false
    }
  };

/* functions */
const checkOptions = options => {
  for (let prop in defaultOptions) {
    if (options[prop] == null) {
      options[prop] = defaultOptions[prop];
  }}
  // obligatories
  const win = options.win;
  win.show = false;
};

const genHTML = (id, path, options) => {
  // HTML on the fly. data uri won't load src scripts.
  const title = options.title || utils.titleCap(id);
  const load = options.load || "./load.js";
  let html = `
    <!DOCTYPE html>
    <meta charset="utf-8" />
    <title>${title}</title>
    <script src="${maryPath}/Mary.js" defer></script>
  `;
  if (id !== "main") html += `
    <script src="${load}" defer></script>
  `;
  fs.writeFileSync(`${path}/${id}.html`, html, "utf8");
};

const delHTML = (id, path) => {
  let idPath = `${path}/${id}.html`;
  if (fs.existsSync(idPath)) fs.unlinkSync(idPath);
};

/* constructor */
const NewWindow = (id, path, options = {}) => {
  if (!id || !path) {
    throw new Error ("Need an id and dir path.");
  }
  checkOptions(options);
  let win = new BrowserWindow(options.win);
  genHTML(id, path, options);
  win.loadURL(`file://${path}/${id}.html`);
  win.once("ready-to-show", () => {
    if (options.save) {
      settings.loadWin(win, id);
    }
    if (options.dev) {
      win.webContents.openDevTools();
    }
    win.show();
  });
  win.webContents.on("did-start-loading", () => {
    genHTML(id, path, options);
  });
  win.webContents.on("dom-ready", () => {
    delHTML(id, path);
  });
  win.on("close", e => {
    if (options.save) {
      settings.saveWin(win, id);
    }
    if (options.confirm) {
      const i = confirm.onClose();
      if (i === 1) return e.preventDefault();
    }
    if (win) win = null;
  });
  return win;
};

/* exports */
module.exports = NewWindow;
