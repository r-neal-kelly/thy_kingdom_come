"use strict";

/* requires */
const {MVC} = Mary;

/* components */
const mProto = require("./Scripture-m");
const vProto = require("./Scripture-v");
const cProto = require("./Scripture-c");

/* constants */
const Scripture = MVC(mProto, vProto, cProto);

/* exports */
module.exports = Scripture;
