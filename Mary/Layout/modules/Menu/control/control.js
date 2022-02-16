"use strict";

/* requires */
const {utils} = Mary;

/* constants */
const _ = Symbol();
const proto = utils.newObj();

/* methods */
proto.init = function ({host, msg}) {
  this[_] = utils.newObj();
  this[_].msg = msg;
  this.c.setSubs();
  this.m.init();
  this.v.init(host);
  this.m.openFolder();
  return this.v.getTop();
};

proto.setSubs = function () {
  const msgOptsV = {thisObj: this.v};
  this[_].msg.sub("menu-toggled", this.v.toggleMenu, msgOptsV);
};

proto.openFolder = function (e, {node}, {isRoot, getName}) {
  if (isRoot(node)) this.m.openFolder("../");
  else this.m.openFolder(getName(node));
};

proto.openFile = function (e, {node}, {getName}) {
  const module = this.m.getFile(getName(node));
  this[_].msg.pub("window-requested", {module});
};

/* exports */
module.exports = proto;
