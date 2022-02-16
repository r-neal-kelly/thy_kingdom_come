"use strict";

/* requires */
const css = Mary.css("WordSearch");

/* constants */
const fore = "#E0ECFF";
const back = "#0f1318";
const bord = "#3B3A32";
const high = "#261946";
const foreT = "rgba(224,236,255,.3)";
const backT = "rgba(15,19,24,.84)";
const highT = "rgba(38,25,70,.5)";
const popupW = "180px";
const popupH = "24px";

/* canvas */
css.define("WordSearch", [
  "position: relative",
  "width: 100%",
  "height: 100%",
  "margin: 0",
  "padding: 0",
  "overflow: hidden",
  `background-color: ${backT}`
]);

css.define(".Menu", [
  "margin: 0",
  "padding: 0 3px 0 3px"
]);

css.define(".Popup", [
  "position: absolute",
  `top: calc(50% - ${popupH} / 2)`,
  `left: calc(50% - ${popupW} / 2)`,
  `width: ${popupW}`,
  `height: ${popupH}`,
  "padding: 0 3px 0 3px",
  `background-color: ${backT}`,
  `border: 1px solid ${foreT}`,
  "text-align: center",
  "vertical-align: middle"
]);

css.define(".Canvas", [
  "margin: 0",
  "padding: 0",
  "overflow: hidden"
]);

/* exports */
module.exports = true;
