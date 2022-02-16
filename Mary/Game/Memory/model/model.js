"use strict";

/* requires */
const fs = require("fs");
const msg = Mary.msg("Game/Memory");
const {utils, path, info, lexicon} = Mary;

/* constants */
const m = Symbol("modelKey");

/* constructor */
const Model = (options = {}) => {
  const model = utils.newObj(constructProto);
  model.lang = options.lang || "Latin";
  model.mode = options.mode || "Input";
  model.study = options.study || "Vocab";
  model.lesson = parseInt(options.lesson) || options.lesson || "All";
  model.translate = options.translate || "Latin → English";
  model.countTotal = parseInt(options.countTotal) || options.countTotal || 10;
  model.countChoice = parseInt(options.countChoice) || 4;
  model.init();
  Object.setPrototypeOf(model, null);
  return model;
};

/* constuctor methods */
const constructProto = utils.newObj();

constructProto.init = function () {
  this.count = 0;
  this.countRight = 0;
  this.countWrong = 0;
  this.corrected = [];
  this.getLexicon();
};

constructProto.getLexicon = function () {
  const {lesson} = this;
  const allEntries = Object.values(lexicon(this.lang).entries);
  const lessonEntries = allEntries.filter(entry => entry.lesson === lesson);
  const entries = (lessonEntries.length > 0) ? lessonEntries : allEntries;
  const isLatinToEnglish = this.translate[0] === "L";
  const words = {};

  // a much better algorythim would be to take the random elems
  // here, and not store ALL words and extras in memory needlessly!
  // but we need to go through all English words to build dict.
  // maybe do that the one time in lexicon module.

  if (this.study === "Vocab") {
    if (isLatinToEnglish) this.placeholder = "translate";
    else this.placeholder = "nom., gen., gndr., (num.?)";
    for (let {id, defs} of entries) {
      if (isLatinToEnglish) {
        words[id] = defs;
      } else {
        for (let def of defs) {
          if (words[def]) words[def].push(id);
          else words[def] = [id];
        }
      }
    }
  }

  if (this.study === "Gender") {
    this.placeholder = "m, f, n, m/f";
    for (let {nominative, genitive, gender, defs} of entries) {
      if (!gender) continue;
      if (isLatinToEnglish) {
        words[`${nominative}, ${genitive}`] = [gender];
      } else {
        for (let def of defs) {
          if (words[def]) words[def].push(gender);
          else words[def] = [gender];
        }
      }
    }
  }

  if (this.study === "Declension") {
    if (isLatinToEnglish) this.placeholder = "num., case";
    else this.placeholder = "decline";
    const {unDupe} = utils.array;
    this.cases = utils.newObj();
    for (let {id, defs, cases} of entries) {
      if (!cases) continue;
      const caseEntries = Object.entries(cases);
      if (isLatinToEnglish) {
        const caseKeys = Object.keys(cases);
        for (let [caseName, declension] of caseEntries) {
          this.cases[declension] = unDupe((this.cases[declension] || []).concat(caseKeys));
          if (words[declension] && !words[declension].includes(caseName))
            words[declension].push(caseName);
          else words[declension] = [caseName];
        }
      } else {
        const caseVals = Object.values(cases);
        for (let def of defs) {
          this.cases[def] = unDupe((this.cases[def] || []).concat(caseVals));
          for (let [caseName, declension] of caseEntries) {
            const propID = `${def} : ${caseName}`;
            if (words[propID]) words[propID].push(declension);
            else words[propID] = [declension];
          }
        }
      }
    }
  }

  this.words = Object.entries(words);
  this.corrects = Object.values(words); // can we combine this with cases?
  if ((this.countTotal === "All") || (this.countTotal > this.words.length)) {
    this.countTotal = this.words.length;
  }
};

/* game methods */
const gameProto = utils.newObj();

gameProto.newGame = function (options) {
  this[m] = Model(options);
  const {placeholder} = this[m];
  this.genGame({placeholder});
};

gameProto.getWord = function () {
  if (this[m].count >= this[m].countTotal) return this.gameOver();
  const {getRandom} = utils.array;
  const [question, correct] = getRandom(this[m].words, "splice");
  this[m].question = question;
  this[m].correct = correct;
  this.setQuestion(question);
  if (this[m].mode === "Choice") this.setChoices(this.getChoices());
  this[m].count += 1;
  this.setCounter(this[m].count, this[m].countTotal);
};

gameProto.getChoices = function () {
  const {getRandom} = utils.array;
  const {study} = this[m];
  if (study === "Gender") {
    return info.getEtymology(this.lang, "genders");
  }
  let choices = [];
  if (study === "Vocab") {
    const {words, corrects, correct, countChoice} = this[m];
    choices.push(getRandom(correct));
    while (choices.length < this[m].countChoice) {
      const correctArr = getRandom(this[m].corrects);
      if (correctArr === correct) continue;
      else choices.push(getRandom(correctArr));
    }
  }
  if (study === "Declension") {
    const {words, question, correct, countChoice, cases} = this[m];
    const caseArr = Array.from(cases[question.split(" : ")[0]]);
    choices.push(getRandom(correct));
    while (caseArr.length > 0 && choices.length < this[m].countChoice) {
      const word = getRandom(caseArr, "splice");
      if (choices.includes(word)) continue;
      else choices.push(word);
    }
  }
  choices.sort(() => {
    if (utils.rdmBool()) return 1;
    else return -1;
  })
  return choices;
};

gameProto.getResponse = function (answer) {
  let {question, correct} = this[m];
  let response = correct.includes(answer);
  correct = correct.join(", ");
  this.setResponse(response);
  if (response) {
    this[m].countRight += 1;
  } else {
    this[m].countWrong += 1;
    this.setCorrect(question, correct);
    this[m].corrected.push([question, answer || "", correct]);
  }
};

gameProto.getResults = function () {
  const {countRight, countTotal, corrected} = this[m];
  const results =
    { percent: utils.round(countRight * 100 / countTotal, 2)
    , corrected
    };
  return results;
};

/* subscriptions */
msg.sub("model-init", memory => {
  memory.extend(gameProto);
});

/* exports */
module.exports = true;
