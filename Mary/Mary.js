"use strict";

/* requires */
const process = require("process");
const {remote} = require("electron");

/* constants */
const cwd = process.cwd();
const globalMary = remote.getGlobal("Mary");

/* init */
window.Mary = Object.create(null);

/* methods */
Mary.require = (modulePath) => {
  const module = modulePath.toLowerCase();
  if (Mary[module]) return Mary[module];
  else return require(`${cwd}/Mary/${modulePath}`);
};

/* modules */
// I want these to be getters that can require the module
Mary.path = globalMary["path"];
Mary.megaMsg = globalMary["megaMsg"];
Mary.HTML = globalMary["HTML"];
Mary.stats = globalMary["stats"];
Mary.utils = Mary.require("Utils");
Mary.parse = Mary.require("Parse");
Mary.msg = Mary.require("Msg");
Mary.info = Mary.require("Info");
Mary.regex = Mary.require("Regex");
Mary.filter = Mary.require("Filter");
Mary.MVC = Mary.require("MVC");
Mary.dom = Mary.require("Dom");
Mary.css = Mary.require("CSS");
Mary.font = Mary.require("Font");
Mary.keyboard = Mary.require("Keyboard");
Mary.resize = Mary.require("Resize");
Mary.lasso = Mary.require("Lasso");
Mary.data = Mary.require("Data");
Mary.spellCheck = Mary.require("SpellCheck");
Mary.errorCheck = Mary.require("ErrorCheck");
Mary.scripture = Mary.require("Scripture");
Mary.library = Mary.require("Library");
Mary.search = Mary.require("Search");
Mary.lexicon = Mary.require("Lexicon");
Mary.FileTree = Mary.require("FileTree");
Mary.layout = Mary.require("Layout");
Mary.game = Mary.require("Game");
Mary.init = Mary.require("Init"); // put layout init in here

/* exports */
module.exports = true;
