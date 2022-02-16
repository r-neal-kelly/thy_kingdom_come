"use strict";

// making this a lot less general than it can be. But I can
// make a more general class later, and call that in here
// to get the basic methods.

/* requires */
const {utils} = Mary;

/* constants */
const _ = Symbol();
const proto = utils.newObj();

/* functions */

/* constructor */
const Recycler = function (maxCacheSize = 36) {
  this[_] = utils.newObj();
  this[_].cache = [];
  this[_].max = parseInt(maxCacheSize);
};
Recycler.prototype = proto;

/* methods */
proto.recycle = function (item) {
  this[_].cache.push(item);
  if (this.size > this.max) {
    this[_].cache.shift();
  }
};

proto.restoreType = function (type = "") {
  if (!type) return this.restoreLast();
  const len = this[_].cache.length - 1;
  for (let i = len; i >= 0; i -= 1) {
    if (arr[i].type !== type) continue;
    return this[_].cache.splice(i, 1)[0];
  }
  return null;
};

proto.restorePath = function (path = "") {
  if (!path) return this.restoreLast();
  const cache = this[_].cache;
  for (let [i, item] of cache.entries()) {
    if (item.path !== path) continue;
    return cache.splice(i, 1)[0];
  }
  return null;
};

proto.restoreLast = function () {
  return this[_].cache.pop();
};

proto.takeInventory = function (byType = "") {
  const {cache} = this[_];
  if (!byType) {
    return cache.map(({type, name, path}) => {
      return {type, name, path};
    });
  } else {
    return cache.filter(({type}) => {
      return type === byType;
    }).map(({name, path}) => {
      return {name, path};
    });
  }
};

proto.clear = function () {
  this[_].cache = [];
};

proto.setMax = function (max) {
  this[_].max = parseInt(max) || this[_].max;
  while (this.size > this.max) {
    this[_].cache.shift();
  }
};

Object.defineProperties(proto,
  { "cache":   { get: function () { return this.takeInventory() } }
  , "folders": { get: function () { return this.takeInventory("folder") } }
  , "files":   { get: function () { return this.takeInventory("file") } }
  , "size":    { get: function () { return this[_].cache.length } }
  , "max":     { get: function () { return this[_].max }
               , set: function (max) { this.setMax(max); }
               }
  }
);

/* exports */
module.exports = () => new Recycler();
