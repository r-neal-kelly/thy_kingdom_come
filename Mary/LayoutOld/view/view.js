"use strict";

/* requires */
const {utils, dom, HTML} = Mary;
const msg = Mary.msg("Layout");

/* components */
require("./css");

/* constants */
const body = dom(document.body).removeChildren();
const view = utils.newObj();
const layout = dom(HTML.div, body, 1, true)
  .attr("id=Layout")
  .class("Layout");
const taskbar = dom(HTML.div, layout, 1, true)
  .class("Taskbar");
view.layout = layout;
view.taskbar = taskbar;

/* functions */
const getCenter = (offsetW = 0, offsetH = 0) => {
  const layoutW = layout.first.offsetWidth;
  const layoutH = layout.first.offsetHeight;
  const x = utils.round((layoutW / 2) - (offsetW / 2));
  const y = utils.round((layoutH / 2) - (offsetH / 2));
  return {x, y};
};

const genMenu = () => {
  view.menu = dom(HTML.div, taskbar, 1, true)
    .class("LayoutMenu")
    .style("display: none");
  view.openMenuBtn = dom(HTML.button)
    .appendTo(taskbar)
    .class("OpenMenuBtn");
  view.scripture = dom(HTML.button)
    .appendTo(view.menu)
    .class("MenuBtn")
    .setText("Scripture");
  view.wordSearch = dom(HTML.button)
    .appendTo(view.menu)
    .class("MenuBtn")
    .setText("WordSearch");
  view.memory = dom(HTML.button)
    .appendTo(view.menu)
    .class("MenuBtn")
    .setText("Memory");
};

const genTitleBar = function () {
  this.view.titlebar = dom(HTML.div)
    .appendTo(this.view.main)
    .class("TitleBar")
    .setText(this.name);
  this.view.winControl = dom(HTML.div)
    .appendTo(this.view.titlebar)
    .class("WinControl");
  this.view.minimize = dom(HTML.button)
    .appendTo(this.view.winControl)
    .class("Minimize")
    .setText("–");
  this.view.maximize = dom(HTML.button)
    .appendTo(this.view.winControl)
    .class("Maximize")
    .setText("☐");
  this.view.close = dom(HTML.button)
    .appendTo(this.view.winControl)
    .class("Close")
    .setText("☓");
};

/* methods */
let proto = utils.newObj();

proto.genGlobal = function () {
  const g = this.global;
};

proto.genData = function () {
  const topNode = layout.first;
  const w = utils.round(topNode.offsetWidth * 0.67);
  const h = utils.round(topNode.offsetHeight * 0.67);
  let {x, y} = getCenter(w, h);
  if (document.elementFromPoint(x, y) !== layout.first) {
    x += 30, y += 30;
  };
  this.data = utils.proto(null, {w, h, x, y});
  this.data.maximized = false;
  this.data.minimized = false;
  return this;
};

proto.genDataFromStyle = function () {
  const {main, module} = this.view;
  const {w, h} = this.data;
  const b = parseFloat(main.getStyle("border"));
  this.data.b = b;
  this.data.inW = w - b * 2;
  this.data.inH = h - b * 2;
  this.data.mW = parseFloat(module.getStyle("width"));
  this.data.mH = parseFloat(module.getStyle("height"));
};

proto.init = function () {
  const {x, y, w, h} = this.data;
  this.view = utils.newObj();
  this.view.layout = layout;
  this.view.taskbar = taskbar;
  this.view.main = dom(HTML.div)
    .appendTo(layout)
    .class("Window")
    .style([
      `left: ${x}px`,
      `top: ${y}px`,
      `width: ${w}px`,
      `height: ${h}px`
    ]);
  genTitleBar.call(this);
  this.view.module = dom(HTML.div)
    .appendTo(this.view.main)
    .class("Module");
  this.view.taskbarBtn = dom(HTML.button)
    .appendTo(taskbar)
    .class("TaskbarBtn")
    .setText(this.name);
  this.loadModule(this.view.module);
  this.genDataFromStyle();
};

proto.getLayoutWH = function () {
  //const layout = dom(".Layout").first;
  const w = layout.first.offsetWidth;
  const h = layout.first.offsetHeight;
  return {w, h};
};

/* subscriptions */
msg.sub("initialize", () => {
  genMenu();
  msg.pub("control-view", view);
});

msg.sub("view-init-proto", extend => {
  proto = extend(proto);
  msg.pub("control-init-proto", extend);
});

msg.sub("view-new-window", win => {
  msg.pub("control-new-window", win);
});

/* exports */
module.exports = true;
