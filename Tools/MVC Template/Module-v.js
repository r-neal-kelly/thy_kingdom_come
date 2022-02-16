"use strict";

/* requires */
const {utils, dom, HTML} = Mary;

/* components */
require("./Module-v-css");

/* constants */
const _ = Symbol();
const proto = utils.newObj();

/* methods */
proto.init = function (host) {
  this[_] = utils.newObj();
  this[_].ns = Symbol();
  this[_].global = dom(window);
  this[_].html = dom(document.documentElement);
  this[_].host = dom(host || document.body);
  this[_].host.children().remove();
  this[_].module = dom(HTML.div)
    .appendTo(this[_].host)
    .attr("id=module");
  this.initListeners();
};

proto.initListeners = function () {
  const {ns, html, module} = this[_];
  const args = {module: module.first};
  const evtOpts = {thisObj: this.c, ns, args};
  //html.on("mousemove", this.c.method, null, evtOpts);
};

/* exports */
module.exports = proto;
