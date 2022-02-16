"use strict";

/* requires */
const utils = Mary.require("Utils");
const parse = Mary.require("Parse").Scripture;
const msg = Mary.require("Msg")("ErrorCheck");
const spellCheck = Mary.require("SpellCheck");
const info = Mary.require("Info");

/* components */
const shortcuts = require("./shortcuts");

/* constants */
const setSubs = (version, main) => {
  const lang = info.getLanguage(version);
  main.subVersion.option(info.getSubs(lang));
};

/* subscriptions */
msg.sub("collect", ({main, src}) => {
  const names = main.names.array().map(n => n.textContent);
  const sources = main.sources.array().map(s => s.value.trim());
  const copies = main.copies.array()
    .map(c => c.textContent.replace(/\s/g, " ").trim());
  const source = src || new Map(utils.array.zip(names, sources));
  const copy = new Map(utils.array.zip(names, copies));
  msg.pub("storeModel", {source, copy});
});

/* main.Load */
msg.sub("load", ({main}) => {
  const version = main.get("version");
  const book = main.get("book");
  const chapter = main.get("chapter");
  const subVersion = main.subVersion.value();
  msg.pub("loadModel", {version, book, chapter});
  msg.pub("loadEntries");
  setSubs(version, main);
  main.Source.show();
  main.Check.show();
  main.More.show();
  main.Frame.show();
  main.Change.show();
  msg.pub("keyRoulette", main);
  msg.pub("keyCantilJump", main);
});

msg.sub("close", ({main}) => {
  const refs =
    [ "entries", "names", "ids", "sources"
    , "copies", "checks", "subAssists" ];
  msg.pub("killModel");
  for (let ref of refs) main[ref] = null;
  main.Frame.children().remove();
  main.Source.hide();
  main.Check.hide();
  main.More.hide();
  main.Frame.hide();
  main.Change.hide();
  spellCheck.set("");
  msg.pub("killKeys");
});

msg.sub("save", ({main}) => {
  if (main.entries == null) return alert("Load a chapter.");
  msg.pub("collect", {main});
  msg.pub("saveModel");
  msg.pub("setChapters");
  alert("Chapter saved.");
});

/* main.Source */
msg.sub("loadSource", ({main}) => {
  const input = main.sourceInput.value();
  if (!input) return alert("Input a source.");
  const parser = parse[main.sourceParser.value()];
  const src = parse.toMap(parser(input));
  msg.pub("collect", {main, src});
  main.sourceVisibility = true;
  msg.pub("loadEntries");
  //msg.pub("subAssist", {main});
  main.entries.show();
});

/* main.Check */
msg.sub("check", ({main}) => {
  if (!main.entries) return alert("Load a chapter.");
  const subVersion = main.get("subversion");
  msg.pub("collect", {main});
  msg.pub("loadEntries");
  msg.pub("getChecks", {subVersion});
  //msg.pub("subAssist", {main});
});

/* main.More */
msg.sub("subAssist", ({main}) => {
  if (main.subAssists.isShown()) {
    main.sources.show();
    main.subAssists.hide();
  } else {
    main.sources.hide();
    main.subAssists.show();
    msg.pub("collect", {main});
    msg.pub("getAssists");
  }
});

/* main.Change */
msg.sub("trash", ({main}) => {
  if (main.entries == null) return alert("Load a chapter.");
  msg.pub("delEntry");
});

msg.sub("add", ({main}) => {
  if (main.entries == null) return alert("Load a chapter.");
  const name = (main.newName.value() === "") ?
    String(Number(main.names.last.textContent) + 1) :
    main.newName.value();
  msg.pub("collect", {main});
  msg.pub("addEntry", {name});
  main.entries.show(main.entries.length - 1);
  main.copies.last.focus();
});

/* exports */
module.exports = true;
