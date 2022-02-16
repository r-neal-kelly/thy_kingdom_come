"use strict";

/* requires */
const {utils} = Mary;
const msg = Mary.msg("Layout");

/* constants */
const wins = [];

/* methods */
wins.last = function () {
  return this[this.length - 1] || null;
};

wins.gotoPrevious = function () {
  if (!this.previous) return;
  const minimized = this.previous.data.minimized;
  if (!minimized) this.previous.activate();
  else this.refresh();
};

wins.update = function (win) {
  const {main} = win.view;
  const i = this.indexOf(win);
  const last = this.last();
  if (win === last)
    return this.refresh();
  this.previous = last;
  if (i !== -1) this.splice(i, 1);
  this.push(win);
  this.refresh();
};

wins.remove = function (win) {
  const i = this.indexOf(win);
  this.splice(i, 1);
  this.refresh();
};

wins.refresh = function () {
  for (let [i, w] of this.entries()) {
    w.view.main.style(`z-index: ${i}`);
  }
  const lastWin = this.last();
  if (!lastWin) return;
  lastWin.view.taskbar.children()
    .removeClass("TaskbarBtnSel");
  if (!lastWin.data.minimized)
    lastWin.view.taskbarBtn
      .class("TaskbarBtnSel");
};

/* subscriptions */
msg.sub("initialize", () => {
  msg.pub("control-wins", wins);
});

/* exports */
module.exports = true;
