"use strict";

/* requires */
const msg = Mary.msg("Lexicon");
const {utils} = Mary;

/* modules */
const latin = require("../model/model")("Latin");

/* constants */
const game = latin.game("Vocab");
const decline = latin.game("Decline");

/* variables */

/* functions */

/* subscriptions */
msg.sub("get-question", ({mode}) => {
  msg.pub("set-question", game.ask(mode.value()));
});

msg.sub("give-answer", ({answer}) => {
  const vals = game.answer(answer.value());
  answer.value("");
  msg.pub("set-response", vals);
});

msg.sub("clear-response", ({response}) => {
  response
    .removeClass(["Right", "Wrong"])
    .class("Clear");
});

/* decline */
msg.sub("get-declension", () => {
  msg.pub("set-declension-word", decline.ask());
});

msg.sub("check-declension", answer => {
  const results = decline.answer(answer);
  msg.pub("set-declension-results", results);
});

/* add */
msg.sub("add-to-lexicon", (type, wordObj) => {
  if (wordObj == null) return;
  latin.add(type, wordObj);
});

/* initialize */
msg.sub("initialize", () => {
  msg.pub("initialize-view");
});

/* exports */
module.exports = true;
