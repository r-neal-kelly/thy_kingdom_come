"use strict";

/* requires */
const utils = Mary.require("Utils");
const msg = Mary.require("Msg")("ErrorCheck");
const parse = Mary.require("Parse").Scripture;
const data = Mary.require("Data").Scripture;

/* components */
const check = require("./check");

/* variables */
let model;

/* constructor */
const Model = (version, book, chapter) => {
  const model = utils.newObj();
  model.copy = getCopy(version, book, chapter);
  model.source = getSource(model);
  model.check = (sub) => check(version, sub, model.source, model.copy);
  model.save = () => saveCopy(model, version, book, chapter);
  return model;
};

/* functions */
const getCopy = (version, book, chapter) => {
  const chapData = data(version, book, chapter);
  if (chapData.check()) {
    return parse.toMap(chapData.read());
  } else {
    alert("Starting a new file.");
    return new Map([["1", ""]]);
  }
};

const getSource = ({copy}) => {
  const entries = utils.map.keys(copy)
    .map(key => [key, ""]);
  return new Map(entries);
};

const saveCopy = ({copy}, version, book, chapter) => {
  const chapData = data(version, book, chapter);
  chapData.write(parse.toData(copy));
  return true;
};

/* subscriptions */
msg.sub("loadModel", ({version, book, chapter}) => {
  model = Model(version, book, chapter);
});

msg.sub("storeModel", ({source, copy}) => {
  model.source = source;
  model.copy = copy;
});

msg.sub("saveModel", () => model.save());

msg.sub("killModel", () => model = null);

msg.sub("loadEntries", () => {
  const size = model.source.size;
  const srcKeys = utils.map.keys(model.source);
  const srcVals = utils.map.values(model.source);
  const cpyVals = utils.map.values(model.copy);
  msg.pub("genEntries", {size, srcKeys, srcVals, cpyVals});
});

msg.sub("getChecks", ({subVersion}) => {
  const checks = model.check(subVersion);
  msg.pub("setChecks", checks);
});

msg.sub("getAssists", () => {
  const sources = utils.map.values(model.source);
  msg.pub("setAssists", {sources});
});

msg.sub("delEntry", () => {
  const last = utils.map.last(model.source).key;
  if (confirm(`Delete entry "${last}"?`)) {
    model.source.delete(last);
    model.copy.delete(last);
    msg.pub("loadEntries");
  }
});

msg.sub("addEntry", ({name}) => {
  model.source.set(name, "");
  model.copy.set(name, "");
  msg.pub("loadEntries");
});

/* exports */
module.exports = true;
