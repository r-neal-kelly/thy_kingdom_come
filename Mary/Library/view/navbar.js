"use strict";

/* requires */
const utils = Mary.require("Utils")
const msg = Mary.require("Msg")("Library");
const dom = Mary.require("Dom");
const HTML = Mary.require("HTML");
const font = Mary.require("Font");

/* constants */
const main = {};

/* functions */
const genBar = () => {
  main.bar = dom(HTML.div)
    .appendTo(document.body)
    .class("Bar");
  main.rotateL = dom(HTML.button, main.bar, 1, true)
    .setText("↶")
    .class("RotateL")
    .on("click", () => {
      msg.pub("rotate-page-left");
    });
  main.previous = dom(HTML.button, main.bar, 1, true)
    .setText("<")
    .class("Previous")
    .on("click", () => {
      msg.pub("previous-page");
    });
  main.goto = dom(HTML.input, main.bar, 1, true)
    .class("Goto")
    .on("change", (e, {node}) => {
      msg.pub("goto-page", node.value);
    });
  main.next = dom(HTML.button, main.bar, 1, true)
    .setText(">")
    .class("Next")
    .on("click", () => {
      msg.pub("next-page");
    });
  main.rotateR = dom(HTML.button, main.bar, 1, true)
    .setText("↷")
    .class("RotateR")
    .on("click", () => {
      msg.pub("rotate-page-right");
    });
};

const genAltButton = () => {
  if (main.altButton) main.altButton.remove();
  main.altButton = dom(HTML.button, main.bar, 1, true)
    .setText("Alt")
    .class("AltButton")
    .on("click", () => {
      msg.pub("toggle-alt-page");
    });
};

/* subscriptions */
msg.sub("turn-page", page => {
  main.bar.show();
  main.goto.value(page || "");
});

msg.sub("if-has-alt", hasAlt => {
  if (hasAlt) genAltButton();
  else if (main.altButton) main.altButton.remove();
});

msg.sub("close-canvas", () => {
  main.bar.hide();
});

/* initialize */
msg.sub("initialize-view", () => {
  genBar();
});

/* exports */
module.exports = true;
