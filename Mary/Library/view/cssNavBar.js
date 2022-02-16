"use strict";

/* requires */
const css = Mary.require("CSS")("Library", true);

/* constants */
const fore = "#E0ECFF";
const back = "#0f1318";
const bord = "#3B3A32";
const high = "#261946";
const foreT = "rgba(224,236,255,.3)";
const backT = "rgba(15,19,24,.5)";
const sideBarW = "13em";

/* Bar */
css.define(".Bar", [
  "display: flex",
  "flex-direction: row",
  "justify-content: center",
  "position: absolute",
  "bottom: 0",
  "left: 0",
  "width: 100%",
  "height: 3em",
  "margin: 0",
  "padding-bottom: 3px",
  `background-color: transparent`,
  `color: ${fore}`,
  "user-select: none"
]);

css.define(".Previous, .Next, .RotateL, .RotateR", [
  "padding: 3px 10px 3px 10px",
  `background-color: ${backT}`,
  `border: solid 1.5px ${foreT}`,
  "text-align: center"
]);

css.define(".Previous, .RotateL", [
  "margin: 6px 6px 6px 0"
]);

css.define(".Next, .RotateR", [
  "margin: 6px 0 6px 6px"
]);

css.define(".Previous, .Next", [
  "width: 3em",
  "border-radius: 20px 20px 20px 20px",
]);

css.define(".RotateL, .RotateR", [
  "width: 1.5em",
]);

css.define(".Previous:hover, .Next:hover, .RotateL:hover, .RotateR:hover", [
  `background-color: ${back}`,
  `border: solid 1.5px ${fore}`
]);

css.define(".Goto, .AltButton", [
  "width: 3em",
  "margin: 0",
  `background-color: ${backT}`,
  `border: solid 1.5px ${foreT}`,
  "border-radius: 20px 20px 20px 20px",
  "text-align: center"
]);

css.define(".AltButton", [
  "position: absolute",
  "bottom: 4em",
  "height: 1em"
]);

css.define(".Goto:hover, .AltButton:hover", [
  `background-color: ${back}`,
  `border-color: ${fore}`
]);

css.define(".Goto:focus", [
  `color: ${fore}`
]);

/* exports */
module.exports = true;
