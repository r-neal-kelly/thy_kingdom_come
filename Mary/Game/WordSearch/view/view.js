"use strict";

/* requires */
const msg = Mary.msg("WordSearch");
const {utils, dom, HTML, font} = Mary;

/* components */
require("./css");
require("./menu");
require("./canvas");

/* constants */

/* functions */

/* constructor */

/* methods */

/* subscriptions */
msg.sub("initialize", host => {
});

msg.sub("view-init-game", game => {
  //game.refresh();
  msg.pub("control-init-game", game);
});

/* exports */
module.exports = true;
