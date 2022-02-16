"use strict";

/* requires */
const dom = Mary.require("Dom");
const HTML = Mary.require("HTML");

/* constants */
const body = dom(document.body);
const top = Mary.css(); // put in requires.
const fore = "#E0ECFF";
const back = "#0f1318";
const bord = "#3B3A32";

/* css top */
top.comment("resets");

top.define("*:focus", [
  "outline: 0"
]);

top.define("*, *:before, *:after", [
  "box-sizing: inherit"
]);

top.define("html, body", [
  "box-sizing: border-box", // borders are interior
  "overflow: auto", // no collapsing margins.
  "width: 100%",
  "height: 100%",
  "margin: 0",
  "padding: 0"
]);

top.define("body", [
  "position: relative",
  `background-color: ${back}`,
  `color: ${fore}`
]);

top.define("h1, h2, h3, h4, h5, h6", [
  "margin-left: 8px",
  "margin-right: 8px",
  "font-family: Merriweather"
]);

top.define("button, select, input", [
  "margin: 0 3px 0 3px",
  "padding: 3px",
  `border: 0px solid ${bord}`,
  "background-color: transparent",
  //"font-family: inherit",
  //"font-size: inherit",
  "color: inherit"
]);

top.define("textarea, option", [
  `background-color: ${back}`,
  "border: none",
  `color: ${fore}`
]);

/* dom */
const mainName = "Thy Kingdom Come";
if (dom("title").getText() === mainName)
  dom(HTML.h1).appendTo(body).setText(mainName);

/* listeners */
dom(window).on("dblclick", function betterHighlight(event) {
  const elem = document.activeElement;
  const selc = document.getSelection();
  const str = selc.toString();
  if (!/ $/.test(str)) return;
  if (elem.setSelectionRange) {
    const start = elem.selectionStart;
    const end = elem.selectionEnd - 1;
    elem.setSelectionRange(start, end);
  } else {
    selc.extend(selc.focusNode, selc.focusOffset - 1);
  }
});

/* exports */
module.exports = true;
