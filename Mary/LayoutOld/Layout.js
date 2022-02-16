"use strict";

/* initialize */
const init = () => {
  const msg = Mary.msg("Layout");
  require("./model/model");
  require("./view/view");
  require("./control/control");
  msg.pub("initialize");
};

/* exports */
module.exports = init;
