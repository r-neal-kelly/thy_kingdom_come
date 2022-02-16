"use strict";

/* requires */
const {utils, msg} = Mary;

/* components */

/* constants */
const _ = Symbol();
const proto = utils.newObj();

/* methods */
proto.init = function (host) {
  this[_] = utils.newObj();
  this[_].msg = msg();
  this.c.setSubs();
  this.m.init();
  this.v.init(host);
  return true;
};

proto.setSubs = function () {
  const msgOptsM = {thisObj: this.m};
  //this[_].msg.sub("new-msg", this.m.method, msgOptsM);
};

/* exports */
module.exports = proto;
