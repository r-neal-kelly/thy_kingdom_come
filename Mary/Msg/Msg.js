"use strict";

/* requires */
const {newObj, isFunction} = Mary.require("Utils");

/* constants */
const _ = Symbol();
const pubSubs = newObj();

/* functions */
const warn = (id, msg) => {
  if (!console || !console.warn) return;
  console.warn(`MaryMsg: No subs for '${id}: ${msg}' msg.`)
};

/* constructor */
const PubSub = id => {
  if (pubSubs[id]) return pubSubs[id];
  const pubSub = newObj(proto);
  if (id) pubSubs[id] = pubSub;
  pubSub[_] = newObj();
  pubSub[_].msgs = newObj();
  pubSub[_].id = id || "instance";
  pubSub.constructor = PubSub;
  return pubSub;
};

/* statics */
PubSub.key = _;

/* methods */
const proto = newObj();

proto.pub = function (msg, data, pubCall, options = {}) {
  const {thisObj} = options;
  const {id, msgs} = this[_];
  if (!msgs[msg]) return; //warn(id, msg);
  for (let subCall of msgs[msg]) {
    const subThisObj = subCall[_].thisObj;
    const returnData = subCall.call(subThisObj, data);
    if (pubCall) pubCall.call(thisObj, returnData);
  }
  msgs[msg] = msgs[msg].filter(subCall => !subCall[_].once);
};

proto.sub = function (msg, subCall, options = {}) {
  const {thisObj, once} = options;
  const {msgs} = this[_];
  if (!msgs[msg]) msgs[msg] = [];
  subCall[_] = {thisObj, once};
  msgs[msg].push(subCall);
};

proto.view = function () {
  const msgs = {};
  for (let [msg, subs] of Object.entries(this[_].msgs)) {
    msgs[msg] = subs.length;
  }
  return msgs;
};

/* exports */
module.exports = PubSub;
