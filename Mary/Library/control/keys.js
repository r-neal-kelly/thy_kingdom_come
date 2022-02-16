"use strict";

/* requires */
const win = require("electron").remote.getCurrentWindow();
const msg = Mary.require("Msg")("Library");
const keyboard = Mary.require("Keyboard");

/* shortcuts */
keyboard.shortcut(null, "F11", function fullScreen(e) {
  if (win.isFullScreen()) win.setFullScreen(false);
  else win.setFullScreen(true);
});

keyboard.shortcut(null, "Escape", function esc(e) {
  if (win.isFullScreen()) win.setFullScreen(false);
  else if (win.isMaximized()) win.unmaximize();
});

keyboard.shortcut(null, "F12", function devTools(e) {
  win.webContents.openDevTools();
});

keyboard.shortcut("Control", "r", function reload(e) {
  win.reload();
});

keyboard.shortcut(null, "ArrowLeft", function previousPage(e) {
  msg.pub("previous-page");
});

keyboard.shortcut(null, "ArrowRight", function nextPage(e) {
  msg.pub("next-page");
});

/* exports */
module.exports = true;
