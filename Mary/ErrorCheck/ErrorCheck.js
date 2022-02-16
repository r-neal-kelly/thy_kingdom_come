"use strict";

/* requires */
const msg = Mary.require("Msg")("ErrorCheck");

/* components */
const view = require("./view/view");
const control = require("./control/control");
const model = require("./model/model");

/* exports */
module.exports = host => msg.pub("initialize", {host});
