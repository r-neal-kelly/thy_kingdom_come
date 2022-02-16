"use strict";

/* requires */
const msg = Mary.require("Message")("Lexicon");

/* components */
require("./model/model");
require("./view/view");
require("./control/control");

/* initilize */
msg.pub("initialize");

/* exports */
module.exports = true;
