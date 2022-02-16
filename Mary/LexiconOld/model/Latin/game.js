"use strict";

/* requires */
const {utils} = Mary;

/* constants */
const games = utils.newObj();

/* functions */
const getRandomIndex = arr => Math.floor(Math.random() * (arr.length - 1));

const historyAdd = function (x) {
  const i = this.indexOf(x);
  if (i > -1) this.splice(i, 1);
  this.push(x);
  if (this.length > this.limit)
    this.shift();
  return this;
};

/* constructors */
const Game = (lexicon) => type => {
  if (!games[type]) throw new Error("Not a game.");
  return games[type](lexicon);
};

const History = (limit = 200) => {
  const history = [];
  history.limit = limit;
  history.add = historyAdd;
  history.has = Array.prototype.includes;
  return history;
};

games.Vocab = ({dict}) => {
  const game = utils.newObj();
  const history = History();
  let word, correctArr;
  game.ask = (mode = "Latin") => {
    const arr = Object.keys(dict[mode]);
    let random = getRandomIndex(arr);
    const newWord = arr[random];
    if (newWord === word)
      return game.ask(mode);
    if (history.has(newWord))
      return game.ask(mode);
    history.add(newWord);
    word = newWord;
    correctArr = dict.translate(word, mode);
    return word;
  };
  game.answer = answer => {
    if (correctArr.includes(answer)) {
      return {bool: true, words: ""};
    } else {
      return {bool: false, words: correctArr.join(",")};
    }
  };
  // should add way to ask declension, gender, PoS, and to preset # of questions.
  return game;
};

games.Decline = ({dict, decline}) => {
  const game = utils.newObj();
  const history = History();
  const words = dict.all.filter(word => !!word.nominative);
  let word, correctObj;
  game.ask = () => {
    let random = getRandomIndex(words);
    const newWord = words[random].nominative;
    if (newWord === word)
      return game.ask();
    if (history.has(newWord))
      return game.ask();
    history.add(newWord);
    word = newWord;
    correctObj = decline(word);
    return word;
  };
  game.answer = answer => {
    const results = utils.newObj();
    let bool = true;
    for (let [caseName, word] of Object.entries(correctObj)) {
      if (answer[caseName] !== word) {
        results[caseName] = word;
        bool = false;
    }}
    return {bool, results};
  };
  return game;
};

/* exports */
module.exports = Game;
