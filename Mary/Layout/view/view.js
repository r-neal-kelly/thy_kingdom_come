"use strict";

/* requires */
const {utils, dom, HTML} = Mary;

/* components */
require("./css");

/* constants */
const _ = Symbol();
const proto = utils.newObj();
const defWPercent = 67;
const defHPercent = 60;

/* methods */
proto.init = function (host) {
  this[_] = utils.newObj();
  this[_].ns = Symbol();
  this[_].global = dom(window);
  this[_].html = dom(document.documentElement);
  this[_].host = dom(host || document.body);
  this[_].host.children().remove();
  this[_].layout = dom(HTML.div)
    .appendTo(this[_].host)
    .attr("id=Layout");
  this[_].taskbar = this.c.initTaskbar(this[_].layout);
  this[_].menu = this.c.initMenu(this[_].taskbar);
  this.initListeners();
};

proto.initListeners = function () {
  const {ns, html, layout} = this[_];
  const args = {layout: layout.first};
  const evtOpts = {thisObj: this.c, ns, args};
  html.on("mousemove", this.c.preventTextSelect, null, evtOpts);
};

proto.getTop = function () {
  return this[_].layout;
};

proto.getDefWinGlobals = function () {
  // now we can do while loop to get a unique spot with offsetTop, etc.
  const {offsetWidth, offsetHeight} = this[_].layout.getOffset();
  const w = utils.round( defWPercent * offsetWidth / 100  );
  const h = utils.round( defHPercent * offsetHeight / 100 );
  const x = utils.round( (offsetWidth / 2) - (w / 2)      );
  const y = utils.round( (offsetHeight / 2) - (h / 2)     );
  return {w, h, x, y};
};

/* exports */
module.exports = proto;
