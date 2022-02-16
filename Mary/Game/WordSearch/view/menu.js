"use strict";

/* requires */
const msg = Mary.msg("WordSearch");
const {utils, dom, HTML, font, info} = Mary;

/* constructor */
const Menu = function () {
  this.v = utils.newObj();
  this.v.top = dom(HTML.div)
    .appendTo(this.host)
    .attr("id=WordSearch");
  this.v.menu = dom(HTML.div)
    .appendTo(this.v.top)
    .class("Menu");
  this.v.newGame = dom(HTML.button)
    .appendTo(this.v.menu)
    .class("NewGame")
    .setText("New Game");
  this.v.endGame = dom(HTML.button)
    .appendTo(this.v.menu)
    .class("EndGame")
    .setText("End Game")
    .hide();
  this.v.fonts = dom(HTML.select)
    .appendTo(this.v.menu)
    .class("Fonts");
  this.v.fontSize = dom(HTML.select)
    .appendTo(this.v.menu)
    .class("FontSize")
    .options(utils.range(10,24).map(n => `${n}px`))
    .selectOption("16px");
  this.v.diff = dom(HTML.select)
    .appendTo(this.v.menu)
    .class("Difficulty")
    .options(["easy", "hard"])
    .selectOption("easy");
  this.v.size = dom(HTML.select)
    .appendTo(this.v.menu)
    .class("Size")
    .options(["small", "medium", "large"])
    .selectOption("small");
  this.v.lenLim = dom(HTML.select)
    .appendTo(this.v.menu)
    .class("LenLim")
    .options(utils.range(3,10))
    .selectOption("5");
  this.v.lang = dom(HTML.select)
    .appendTo(this.v.menu)
    .class("Language")
    .options(info.getLangs())
    .selectOption("English");
  this.v.versions = dom(HTML.select)
    .appendTo(this.v.menu)
    .class("Version");
  this.v.subs = dom(HTML.select)
    .appendTo(this.v.menu)
    .class("SubVersion");
  this.v.loading = dom(HTML.div)
    .appendTo(this.v.top)
    .class("Popup")
    .setText("Loading...")
    .hide();
  this.v.winGame = dom(HTML.div)
    .appendTo(this.v.top)
    .class("Popup")
    .setText("Completed Puzzle!")
    .hide();
  this.setFonts();
  this.setVersions();
  this.setSubs();
  this.styleFontSelect();
};

/* methods */
const menu = utils.newObj();

menu.getLang = function () {
  return this.v.lang.value();
};

menu.setFonts = function () {
  const oldFontName = this.getFontName();
  const newFontNames = font.getFonts(this.getLang())
  const fonts = this.v.fonts.options(newFontNames);
  if (fonts.hasOption(oldFontName)) {
    fonts.selectOption(oldFontName);
  } else {
    fonts.selectOption("Orkney");
  }
  this.styleFontSelect();
};

menu.setVersions = function () {
  this.v.versions.options(info.getVersions(this.getLang()));
};

menu.setSubs = function () {
  this.v.subs.options(info.getSubs(this.getLang()));
};

menu.getFontName = function () {
  return this.v.fonts.value();
};

menu.getFontSize = function () {
  return this.v.fontSize.value();
};

menu.getListFontSize = function () {
  const size = parseFloat(this.getFontSize());
  let ratio;
  if (["Hebrew", "Greek"].includes(this.getLang())) ratio = 5 / 6;
  else ratio = 3 / 4;
  return `${utils.round(size * ratio, 3)}px`;
};

menu.getPadSize = function () {
  const size = parseFloat(this.getFontSize());
  return utils.round(size * 2 / 3, 3);
};

menu.getFontStyle = function () {
  return `${this.getFontSize()} "${this.getFontName()}"`;
};

menu.styleFontSelect = function () {
  this.v.fonts.style(`font-family: ${this.getFontName()}`);
};

menu.showLoading = function () {
  this.v.loading.setText("Loading...").show();
};

menu.updateProgress = function (progress) {
  this.v.loading.setText(`Loading...${progress}`);
};

menu.hideLoading = function () {
  this.v.loading.hide();
};

/* subscriptions */
msg.sub("view-init-game", game => {
  game.extend(menu);
  Menu.call(game);
});

/* exports */
module.exports = true;
