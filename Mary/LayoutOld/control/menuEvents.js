"use strict";

/* requires */
const {utils} = Mary;
const msg = Mary.msg("Layout");

/* variables */
let view;

/* functions */
const addEvents = function () {
  const options = {thisObj: view};
  view.openMenuBtn
    .on("mousedown", open, null, options);
  view.scripture
    .on("click", newWin("Scripture"), null, options);
  view.wordSearch
    .on("click", newWin("Game/WordSearch"), null, options);
  view.memory
    .on("click", newWin("Game/Memory"), null, options);
};

/* open */
const open = function (e) {
  const {menu} = this;
  menu.toggle();
};

const newWin = moduleName => function (e) {
  const {menu} = this;
  msg.pub("model-new-window", moduleName);
  menu.hide();
};

/* subscriptions */
msg.sub("initialize", () => {
  msg.pub("control-menuEvents", addEvents);
});

msg.sub("control-view", viewObj => {
  view = viewObj;
});

/* exports */
module.exports = true;
