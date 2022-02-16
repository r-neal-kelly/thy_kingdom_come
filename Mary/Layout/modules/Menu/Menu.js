"use strict";

/* requires */
const {MVC} = Mary;

/* components */
const mProto = require("./model/model");
const vProto = require("./view/view");
const cProto = require("./control/control");

/* constants */
const Menu = MVC(mProto, vProto, cProto);

/* exports */
module.exports = Menu;
