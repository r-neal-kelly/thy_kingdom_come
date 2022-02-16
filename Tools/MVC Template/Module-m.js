"use strict";

/* requires */
const fs = require("fs");
const {utils} = Mary;

/* components */

/* constants */
const _ = Symbol();
const proto = utils.newObj();

/* methods */
proto.init = function () {
  this[_] = utils.newObj();
};

/* exports */
module.exports = proto;
