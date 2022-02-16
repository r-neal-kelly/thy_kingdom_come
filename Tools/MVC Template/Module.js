"use strict";

/* requires */
const {MVC} = Mary;

/* components */
const mProto = require("./Module-m");
const vProto = require("./Module-v");
const cProto = require("./Module-c");

/* constants */
const Module = MVC(mProto, vProto, cProto);

/* exports */
module.exports = Module;
