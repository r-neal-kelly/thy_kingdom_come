"use strict";

/* requires */
const msg = Mary.msg("Game/Memory");
const {utils, dom} = Mary;

/* constructor */
const Memory = host => {
  const memory = utils.newObj(proto);
  memory.c = utils.newObj();
  memory.c.host = dom(host || document.body);
  memory.c.host.children().remove();
  return memory;
};

/* methods */
const proto = {};

proto.extend = function (extension) {
  Object.assign(proto, extension);
};

proto.initControl = function () {
  const evtOpts = {thisObj: this, ns: "Game/Memory"};
  this.initView();
  this.v.newGame.on("click", onNewGame, null, evtOpts);
  this.v.openSettings.on("click", onOpenSettings, null, evtOpts);
  this.v.openTitle.on("click", onOpenTitle, null, evtOpts);
};

proto.startGame = function () {
  const options = this.getOptions();
  this.newGame(options);
  this.setHandlers(options);
  this.getWord();
};

proto.setHandlers = function ({mode}) {
  const evtOpts = {thisObj: this, ns: "Game/Memory"};
  if (mode === "Input") {
    this.v.answer.on("keydown", onInputAnswer, null, evtOpts);
  } else {
    this.v.choices.on("click", onChoiceAnswer, null, evtOpts);
  }
  this.v.getResults.on("click", onGetResults, null, evtOpts);
};

proto.gameOver = function () {
  this.v.counter.remove();
  this.v.question.remove();
  this.v.answer.remove();
  this.v.getResults.show();
};

proto.endGame = function () {
  this.v.titleScreen.show();
  this.v.settingsScreen.hide();
  this.v.gameScreen.hide();
  this.v.resultScreen.hide();
};

/* listeners */
const onNewGame = function (e) {
  this.v.titleScreen.hide();
  this.v.gameScreen.show();
  this.startGame();
};

const onOpenSettings = function (e) {
  this.v.titleScreen.hide();
  this.v.settingsScreen.show();
};

const onOpenTitle = function (e) {
  this.v.titleScreen.show();
  this.v.settingsScreen.hide();
};

const onInputAnswer = function (e, {node}) {
  this.clearResponse();
  this.clearCorrect();
  if (e.key !== "Enter") return;
  this.getResponse(node.value);
  this.getWord();
  this.clearAnswer();
};

const onChoiceAnswer = function (e, {node}) {
  this.clearCorrect();
  this.getResponse(node.textContent);
  this.getWord();
};

const onGetResults = function (e) {
  const evtOpts = {thisObj: this, ns: "Game/Memory"};
  this.v.gameScreen.hide();
  this.v.resultScreen.show();
  this.genResults();
  this.v.endGame.on("click", onEndGame, null, evtOpts);
};

const onEndGame = function (e) {
  this.endGame();
};

/* subscriptions */
msg.sub("initialize", host => {
  const memory = Memory(host);
  msg.pub("model-init", memory);
  msg.pub("view-init", memory);
  memory.initControl();
});

/* exports */
module.exports = true;
