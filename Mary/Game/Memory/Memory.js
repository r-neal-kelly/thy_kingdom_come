"use strict";

/* initialize */
const init = (host) => {
  const msg = Mary.msg("Game/Memory");
  require("./model/model");
  require("./view/view");
  require("./control/control");
  msg.pub("initialize", host);
};

/* exports */
module.exports = init;
