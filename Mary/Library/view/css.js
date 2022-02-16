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

css.define("body", [
  "box-sizing: content-box",
  "overflow-x: hidden",
  "overflow-y: hidden",
]);

/* commons */
css.define(".Highlight", [
  `background-color: ${high}`
]);

css.define(".Menu, .Content", [
  "display: flex",
  "flex-direction: row",
  "position: absolute",
  "min-width: 1em",
  "height: 100%",
  "bottom: 0",
  "margin: 0",
  `background-color: ${backT}`,
  `color: ${fore}`,
  "user-select: none"
]);

css.define(".MenuToggle, .ContentToggle", [
  "height: 100%",
  "background-color: transparent",
  `color: ${foreT}`
]);

css.define(".MenuToggle:hover, .ContentToggle:hover", [
  `color: ${fore}`
]);

css.define(".MenuLists, .ContentLists", [
  "display: flex",
  "flex-direction: column",
  `width: ${sideBarW}`,
  "overflow-y: auto"
]);

css.define(".MenuViewList", [
  "display: flex",
  "flex-direction: row",
  "justify-content: center",
  "margin-bottom: 3px",
  `border-bottom: solid 1px ${foreT}`
]);

css.define(".MenuViewButton", [
  "flex-basis: 50%",
  "margin: 0"
]);

css.define(".MenuViewButton:hover, .SelectedHighlight", [
  `background-color: ${fore}`,
  `color: ${back}`
]);

/* exports */
module.exports = true;
