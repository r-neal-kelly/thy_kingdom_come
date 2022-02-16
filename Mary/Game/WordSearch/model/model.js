"use strict";

/* requires */
const fs = require("fs");
const msg = Mary.msg("WordSearch");
const {utils, path, info, regex, filter} = Mary;

/* constants */
const cardinalArr = ["nw", "sw", "ne", "se", "w", "n", "s", "e"];
const cardinalFuncs = {};

/* variable */
let wordCache; // not sure how to do this, but don't want to redo words each game

/* functions */
cardinalFuncs.nw = ({x, y}, i) => ({ x: x - i, y: y - i });
cardinalFuncs.n  = ({x, y}, i) => ({ x       , y: y - i });
cardinalFuncs.ne = ({x, y}, i) => ({ x: x + i, y: y - i });
cardinalFuncs.e  = ({x, y}, i) => ({ x: x + i, y        });
cardinalFuncs.se = ({x, y}, i) => ({ x: x + i, y: y + i });
cardinalFuncs.s  = ({x, y}, i) => ({ x       , y: y + i });
cardinalFuncs.sw = ({x, y}, i) => ({ x: x - i, y: y + i });
cardinalFuncs.w  = ({x, y}, i) => ({ x: x - i, y        });

/* constructor */
const WordSearch = async (options = {}) => {
  const game = utils.newObj(proto);
  game.w = options.w || 12;
  game.h = options.h || 12;
  game.max = options.max || null;
  game.diff = options.diff || "easy";
  game.lenLim = parseInt(options.lenLim) || 4;
  game.lang = options.lang || "English";
  game.version = options.version || "KJV 1872-1888";
  game.sub = options.sub || "null";
  game.module = options.module || null;
  await game.init();
  return game;
};

/* constuctor methods */
const proto = utils.newObj();

proto.init = async function () {
  this.grid = utils.newObj();
  this.wordMaps = {};
  this.delimiters = {};
  this.unitRegex = regex[this.lang].unitG;
  this.readyWords();
  this.fillLetters();
  await this.fillWords(this.getAllPoints());
  this.fillGrid();
  this.text = this.display();
  delete this.module;
  delete this.chars;
  delete this.caps;
  Object.setPrototypeOf(this, null);
};

proto.readyWords = function () {
  let {lenLim, lang, version, sub} = this;

  // temp versioning
  if (["KJV 1611", "WEBA"].includes(version)) version = "KJV 1872-1888";
  if (["Rahlfs' Greek OT"].includes(version)) version = "Alford's Greek NT";

  // capitals
  let caps; // have to do more in fillGrid.
  if (["Polytonic"].includes(sub)) caps = false;
  else caps = true;
  this.caps = caps;

  // original word list
  let wordList = `${path.mary}/Stats/texts/${lang}/${version}/wordList.json`;
  let words = JSON.parse(fs.readFileSync(wordList, "utf8")).join("␀");
  words = filter(version, this.sub, words).split("␀");

  // break apart by letter
  const chars = {};
  const excludes = /['᾽*]/;
  for (let word of words) {
    word = (caps) ? word.toUpperCase() : word.toLowerCase();
    if (excludes.test(word)) continue;
    const units = word.match(this.unitRegex);
    if (units.length < lenLim) continue;
    const char = units[0];
    if (chars[char]) chars[char].push(word);
    else chars[char] = [word];
  }
  this.chars = chars;
};

proto.getRdmElem = function (arr, splice = false) {
  // in utils now, very useful.
  const i = Math.floor(Math.random() * arr.length);
  const elem = arr[i];
  if (splice) arr.splice(i, 1);
  return elem;
};

proto.getRdmPoint = function () {
  const x = Math.ceil(Math.random() * this.w);
  const y = Math.ceil(Math.random() * this.h);
  return {x, y};
};

proto.getAllPoints = function () {
  const grid = this.grid;
  const points = [];
  for (let x = 1; x <= this.w; x += 1) {
    for (let y = 1; y <= this.h; y += 1) {
      points.push({x, y});
    }
  }
  return points;
};

proto.getEmptyPoints = function () {
  const grid = this.grid;
  const points = [];
  for (let x = 1; x <= this.w; x += 1) {
    for (let y = 1; y <= this.h; y += 1) {
      if (!grid[`${x}.${y}`]) points.push({x, y});
    }
  }
  return points;
};

proto.getRdmWord = function () {
  const chars = Object.values(this.chars);
  const char = this.getRdmElem(chars);
  const word = this.getRdmElem(char);
  return word;
};

proto.delWord = function (word) {
  const first = word.match(this.unitRegex)[0];
  const char = this.chars[first];
  const i = char.indexOf(word);
  if (i > -1) char.splice(i, 1);
  if (char.length === 0) {
    delete this.chars[first]
  }
};

proto.isMaxed = function () {
  if (!this.max) return false;
  const wordCount = Object.values(this.wordMaps).length;
  return wordCount >= this.max;
};

proto.fillLetters = function () {
  const points = this.getAllPoints();
  while (points.length > 0) {
    const point = this.getRdmElem(points, true);
    const word = this.getRdmWord();
    const newMap = this.getMap(word, point);
    if (newMap) {
      this.setMap(word, newMap);
      this.delWord(word);
      if (this.isMaxed()) return;
    }
  }
};

proto.fillWords = async function (points) {
  if (points.length === 0) return;
  const point = this.getRdmElem(points, true);
  const {x, y} = point;
  const chars = Object.values(this.chars);
  let words = Array.from(
    this.chars[this.grid[`${x}.${y}`]] ||
    this.getRdmElem(chars)
  );
  while (words.length > 0) {
    let word = this.getRdmElem(words, true);
    const newMap = this.getMap(word, point);
    if (newMap && this.isUniqueEnough(word, newMap)) {
      this.setMap(word, newMap);
      this.delWord(word);
      if (this.isMaxed()) return;
    }
  }
  this.loadProgress(points);
  return new Promise(resolve => {
    setTimeout(() => resolve(this.fillWords(points)), 6);
  });
};

proto.isUniqueEnough = function (newWord, map) {
  const limit = 3;
  const {x:x1, y:y1} = map[0];
  const {x:x2, y:y2} = map[map.length - 1];
  const first = this.delimiters[`${x1}.${y1}`];
  const last = this.delimiters[`${x2}.${y2}`];
  const oldWords = [].concat(first || [], last || []);
  for (let oldWord of oldWords) {
    const oldPart = oldWord.replace(newWord, "");
    const newPart = newWord.replace(oldWord, "");
    if (oldWord !== oldPart && oldWord.length - oldPart.length >= limit) return false;
    if (newWord !== newPart && newWord.length - newPart.length >= limit) return false;
  }
  return true;
};

proto.getMap = function (word, point) {
  const {w, h} = this;
  let cards = [];
  for (let c of cardinalArr) {
    let points = [];
    points.card = c;
    for (let [i, l] of word.match(this.unitRegex).entries()) {
      const {x, y} = cardinalFuncs[c](point, i);
      const a = this.grid[`${x}.${y}`] || l;
      if ( x > w || x < 1 || y > h || y < 1 || a !== l) {
        points = null; break;
      }
      points.push({l, x, y});
    }
    if (points) cards.push(points);
  }
  if (this.diff === "easy") {
    return this.getRdmElem(cards) || null;
  } else {
    return cards[0] || null;
  }
};

proto.setMap = function (word, map) {
  this.wordMaps[word] = map;
  for (let [i, {l, x, y}] of map.entries()) {
    const coord = `${x}.${y}`;
    const delimiter = this.delimiters[coord] || [];
    this.grid[coord] = l;
    if (i === 0) delimiter.push(word); 
    if (i === map.length - 1) delimiter.push(word);
    this.delimiters[coord] = delimiter;
  }
};

proto.loadProgress = function (points) {
  if (!this.module) return;
  const area = this.w * this.h;
  const pointsLeft = points.length;
  const progress = (area - pointsLeft) * 100 / area;
  this.module.updateProgress(`${utils.round(progress)}%`);
};

proto.fillGrid = function () {
  const {version, sub, grid} = this;
  const chars = (this.caps) ? "caps" : "letters";
  let ls = info.getElements(this.lang, chars).join("␀");
  ls = filter(version, sub, ls).split("␀");
  for (let {x, y} of this.getEmptyPoints()) {
    const coord = `${x}.${y}`;
    if (!grid[coord]) grid[coord] = this.getRdmElem(ls);
  }
};

proto.display = function () {
  const grid = this.grid;
  let str = "\n";
  for (let y = 1; y <= this.h; y += 1) {
    for (let x = 1; x <= this.w; x += 1) {
      const l = grid[`${x}.${y}`] || "*";
      str += `${l} `;
    }
    str += "\n";
  }
  return str;
};

/* game methods */
const model = utils.newObj();

model.getNewModel = async function () {
  const options = this.getOptions();
  this.m = await WordSearch(options);
};

model.getMatch = function (oldPoint, newPoint) {
  const startWords = this.m.delimiters[oldPoint];
  const endWords = this.m.delimiters[newPoint];
  if (!startWords || !endWords) return;
  const firstL = this.m.grid[oldPoint];
  const lastL = this.m.grid[newPoint];
  let word = null;
  for (let w of startWords) {
    if (!endWords.includes(w)) continue;
    if (w.slice(0, firstL.length) !== firstL) continue;
    if (w.slice(-lastL.length) !== lastL) continue;
    word = w;
    break;
  }
  if (word) this.getWordHighlight(word);
};

model.getWordHighlight = function (word) {
  if (word == null) return;
  const {head, last} = utils.array;
  const card = this.m.wordMaps[word].card;
  const len = this.m.wordMaps[word].length;
  const points = this.m.wordMaps[word].map(l => `${l.x}.${l.y}`);
  const {x: hX, y: hY} = this.v.state.points[head(points)];
  const {x: lX, y: lY} = this.v.state.points[last(points)];
  this.drawHighlight(word, {hX, hY, lX, lY, len, card});
};

/* subscriptions */
msg.sub("initialize", host => {
});

msg.sub("model-init-game", game => {
  game.extend(model);
  msg.pub("view-init-game", game);
});

/* exports */
module.exports = true;
