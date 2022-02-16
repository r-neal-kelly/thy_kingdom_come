"use strict";

/* requires */
const msg = Mary.msg("Game/Memory");
const {utils, dom, HTML, font, lexicon} = Mary;

/* components */
require("./css");

/* constants */
const fontOrkney = font("English", "Orkney");
const fontDejavu = font("English", {f:"DejaVu Sans"});
const fontGentium = font("English", {f:"Gentium"});

/* methods */
const proto = utils.newObj();

proto.initView = function () {
  this.v.top = dom(HTML.div)
    .appendTo(this.c.host)
    .attr("id=Game_Memory");
  this.v.titleScreen = dom(HTML.div)
    .appendTo(this.v.top)
    .class(["Screen", fontDejavu])
    .style("height: 76%");
  this.v.settingsScreen = dom(HTML.div)
    .appendTo(this.v.top)
    .class(["Screen", fontDejavu])
    .hide();
  this.v.gameScreen = dom(HTML.div)
    .appendTo(this.v.top)
    .class(["Screen", fontDejavu])
    .hide();
  this.v.resultScreen = dom(HTML.div)
    .appendTo(this.v.top)
    .class(["Screen", fontDejavu])
    .hide();
  this.genTitle();
  this.genSettings();
};

proto.genTitle = function () {
  this.v.title = dom(HTML.h1)
    .appendTo(this.v.titleScreen)
    .class("Title")
    .setText("Memory!");
  this.v.titleBtns = dom(HTML.div)
    .appendTo(this.v.titleScreen)
    .class("TitleBtns");
  this.v.newGame = dom(HTML.button)
    .appendTo(this.v.titleBtns)
    .class(["GeneralBtn", fontOrkney])
    .setText("New Game");
  this.v.openSettings = dom(HTML.button)
    .appendTo(this.v.titleBtns)
    .class(["GeneralBtn", fontOrkney])
    .setText("Settings");
};

proto.genSettings = function () {
  this.v.openTitle = dom(HTML.button)
    .appendTo(this.v.settingsScreen)
    .class(["GeneralBtn", fontOrkney])
    .setText("Back to Title");
  this.v.langSetting = dom(HTML.select)
    .options(["Latin"]);
  dom(HTML.div)
    .appendTo(this.v.settingsScreen)
    .setText("Language: ")
    .appendChildren(this.v.langSetting);
  this.v.modeSetting = dom(HTML.select)
    .options(["Input", "Choice"]);
  dom(HTML.div)
    .appendTo(this.v.settingsScreen)
    .setText("Mode: ")
    .appendChildren(this.v.modeSetting);
  this.v.studySetting = dom(HTML.select)
    .options(["Vocab", "Gender", "Declension"]);
  dom(HTML.div)
    .appendTo(this.v.settingsScreen)
    .setText("Study: ")
    .appendChildren(this.v.studySetting);
  this.v.lessonSetting = dom(HTML.select)
    .options(lexicon("Latin").lessons.concat("All"));
  dom(HTML.div)
    .appendTo(this.v.settingsScreen)
    .setText("Lesson: ")
    .appendChildren(this.v.lessonSetting);
  this.v.translateSetting = dom(HTML.select)
    .options(["Latin → English", "English → Latin"]);
  dom(HTML.div)
    .appendTo(this.v.settingsScreen)
    .setText("Translate from: ")
    .appendChildren(this.v.translateSetting);
  this.v.countTotalSetting = dom(HTML.select)
    .options(utils.range(10, 200, 10).concat("All"));
  dom(HTML.div)
    .appendTo(this.v.settingsScreen)
    .setText("Set count: ")
    .appendChildren(this.v.countTotalSetting);
  this.v.countChoiceSetting = dom(HTML.select)
    .options([4, 6, 8]);
  dom(HTML.div)
    .appendTo(this.v.settingsScreen)
    .setText("Max choices: ")
    .appendChildren(this.v.countChoiceSetting);
};

proto.genGame = function (data) {
  this.v.gameScreen.children().remove();
  this.v.speak = dom(HTML.div)
    .appendTo(this.v.gameScreen)
    .class("Section");
  this.v.response = dom(HTML.div)
    .appendTo(this.v.speak)
    .class(["Response", fontDejavu])
    .class("Clear")
    .setText(".");
  this.v.correct = dom(HTML.div)
    .appendTo(this.v.speak)
    .class(["Correct", fontGentium])
    .class("Clear");
  this.v.correctQ = dom(HTML.div)
    .appendTo(this.v.correct)
    .setText(".");
  this.v.correctA = dom(HTML.div)
    .appendTo(this.v.correct)
    .setText(".");
  this.v.play = dom(HTML.div)
    .appendTo(this.v.gameScreen)
    .class("Section");
  this.v.counter = dom(HTML.div)
    .appendTo(this.v.play)
    .class("Counter");
  this.v.question = dom(HTML.div)
    .appendTo(this.v.play)
    .class(["Question", fontGentium])
    .setText(".");
  this[`gen${this.v.modeSetting.value()}`](data);
  this.v.getResults = dom(HTML.button)
    .appendTo(this.v.gameScreen)
    .class(["Section", "GeneralBtn", fontOrkney])
    .setText("Get Results")
    .hide();
};

proto.genInput = function ({placeholder} = {}) {
  this.v.answer = dom(HTML.input)
    .appendTo(this.v.play)
    .class(["Answer", fontGentium])
    .placeholder(placeholder);
};

proto.genChoice = function () {
  const countChoice = parseInt(this.v.countChoiceSetting.value());
  this.v.answer = dom(HTML.div)
    .appendTo(this.v.play)
    .class(["Answer", fontGentium]);
  this.v.choices = dom(HTML.button, null, countChoice)
    .appendTo(this.v.answer)
    .class("Choice");
};

proto.getOptions = function () {
  const options =
    { lang: this.v.langSetting.value()
    , mode: this.v.modeSetting.value()
    , study: this.v.studySetting.value()
    , lesson: this.v.lessonSetting.value()
    , translate: this.v.translateSetting.value()
    , countTotal: this.v.countTotalSetting.value()
    , countChoice: this.v.countChoiceSetting.value()
    };
  return options;
};

proto.setCounter = function (count, total) {
  this.v.counter.setText(`${count} / ${total}`);
};

proto.setQuestion = function (question) {
  this.v.question.setText(question);
};

proto.setChoices = function (choices) {
  this.v.choices.setText("").hide();
  for (let [i, choice] of choices.entries()) {
    this.v.choices.eq(i).setText(choice).show();
  }
};

proto.setResponse = function (isCorrect) {
  let className, response;
  if (isCorrect) className = "Right", response = "True!";
  else className = "Wrong", response = "False...";
  this.v.response
    .defaultClass()
    .class(className)
    .setText(response);
};

proto.setCorrect = function (question, correct) {
  this.v.correct.defaultClass();
  this.v.correctQ.setText(question);
  this.v.correctA.setText(correct);
};

proto.clearAnswer = function () {
  this.v.answer.value("");
};

proto.clearResponse = function () {
  this.v.response.defaultClass().class("Clear");
};

proto.clearCorrect = function () {
  this.v.correct.defaultClass().class("Clear");
};

proto.genResults = function () {
  const {percent, corrected} = this.getResults();
  this.v.resultScreen.children().remove();
  this.v.percent = dom(HTML.div)
    .appendTo(this.v.resultScreen)
    .class(["Percent", fontDejavu]);
  dom(HTML.span)
    .appendTo(this.v.percent)
    .setText("Correct: ");
  dom(HTML.span)
    .appendTo(this.v.percent)
    .class((percent >= 70) ? "Right" : "Wrong")
    .setText(`${percent}%`);
  this.v.endGame = dom(HTML.button)
    .appendTo(this.v.resultScreen)
    .class(["GeneralBtn", "EndGameBtn", fontOrkney])
    .setText("End Game");
  if (corrected.length <= 0) return;
  this.v.corrected = dom(HTML.div)
    .appendTo(this.v.resultScreen)
    .class("Corrected");
  const header = dom(HTML.div)
    .appendTo(this.v.corrected)
    .class("HeaderC");
  dom(HTML.div, null, 3)
    .appendTo(header)
    .class("CellC")
    .setText(["Question", "Your Answer", "Correct Answer"], "spread");
  for (let [q, a, c] of corrected) {
    const row = dom(HTML.div)
      .appendTo(this.v.corrected)
      .class("RowC");
    dom(HTML.div, null, 3)
      .appendTo(row)
      .class(["CellC", fontGentium])
      .setText([q, a, c], "spread");
  }
};

/* subscriptions */
msg.sub("view-init", memory => {
  memory.v = utils.newObj();
  memory.extend(proto);
});

/* exports */
module.exports = true;
