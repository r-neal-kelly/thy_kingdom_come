"use strict";

/* requires */
const fs = require("fs");
const {utils, FileTree} = Mary;

/* components */

/* constants */
const _ = Symbol();
const proto = utils.newObj();
const modules =
  { scripture:  {name: "Scripture", path: "Scripture"}
  , search:     {name: "Search", path: "Search"}
  , memory:     {name: "Memory", path: "Game/Memory"}
  , wordsearch: {name: "Word Search", path: "Game/WordSearch"}
  , settings:   {name: "", path: ""}
  };

/* methods */
proto.init = function (host) {
  this[_] = utils.newObj();
  this[_].menu = FileTree({rootName: "LayoutMenu"})
    .folder("Bible")
      .file("Scripture", modules.scripture)
      .file("Search", modules.search)
      .openFolder("../")
    .folder("Games")
      .file("Memory", modules.memory)
      .file("Word Search", modules.wordsearch)
      .openFolder("/")
    .file("Settings", modules.settings);
};

proto.getFolder = function () {
  const folder =
    { "folders": this[_].menu.folders
    , "files": this[_].menu.files
    , "name": this[_].menu.name
    , "isRoot": this[_].menu.path === "LayoutMenu:"
    };
  return folder;
};

proto.openFolder = function (folderName = "") {
  this[_].menu.openFolder(folderName);
  this.v.initFolder(this.getFolder());
};

proto.getFile = function (fileName = "") {
  return this[_].menu.file(fileName);
};

/* exports */
module.exports = proto;
