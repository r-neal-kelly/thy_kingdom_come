"use strict";

/* requires */
const fs = require("fs");
const {utils, dom, path} = Mary;
const msg = Mary.msg("Layout");

/* components */
// any model components...

/* constants */
// for now, just one file.
// Later, a file per window instance?
const savePath = `${path.save}/layout.json`;
const saveData = (fs.existsSync(savePath)) ?
  JSON.parse(fs.readFileSync(savePath)) :
  utils.newObj();

/* constructor */
const LayoutWindow = moduleName => {
  const win = utils.newObj(LayoutWindow.prototype);
  win.name = moduleName;
  win.id = Symbol();
  msg.pub("view-new-window", win);
};

/* methods */
const proto = {};
LayoutWindow.prototype = proto;
LayoutWindow.prototype.constructor = LayoutWindow;
LayoutWindow.prototype[Symbol.toStringTag] = "LayoutWindow";

proto.extend = function (methods) {
  if (utils.isObject(methods)) {
    Object.assign(proto, methods);
  } else if (utils.isFunction(methods)) {
    if (!methods.name)
    throw new Error("Method must have a name.");
    proto[methods.name] = methods;
  } else {
    throw new Error("Must be a func or obj.");
  }
  return proto;
};

proto.loadData = function () {
  this.data = saveData[this.name] || null;
  if (this.data) return true;
  else return false;
};

proto.saveData = function () {
  saveData[this.name] = this.data || null;
  if (this.data) return true;
  else return false;
};

proto.loadModule = function (host) {
  require(`${path.mary}/${this.name}`)(host);
};

proto.global = saveData[this.global] || utils.newObj();

/* functions */

/* listeners */
dom(window).on("beforeunload", function saveLayout(e) {
  const json = JSON.stringify(saveData);
  fs.writeFileSync(savePath, json);
});

/* subscriptions */
msg.sub("model-init-proto", () => {
  msg.pub("view-init-proto", proto.extend);
});

msg.sub("model-proto-ready", () => {
  proto.genGlobal();
});

msg.sub("model-new-window", moduleName => {
  LayoutWindow(moduleName);
});

/* exports */
module.exports = true;
