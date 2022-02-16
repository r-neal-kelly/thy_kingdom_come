"use strict";

/* requires */
const css = Mary.css("Layout");
const {path} = Mary;

/* constants */
const fore = "#E0ECFF";
const back = "#0f1318";
const bord = "#3B3A32";
const high = "#261946";
const foreT = "rgba(224,236,255,.3)";
const foreT2 = "rgba(224,236,255,.5)";
const backT = "rgba(15,19,24,.5)";
const highT = "rgba(38,25,70,.5)";
const imgPath = `file://${path.images}`;
const backPath = `file://${path.images}/Background`;

css.define(".LayoutWindow", [
  "position: fixed",
  "margin: 0",
  "padding: 0",
  `box-shadow: 0 0 36px ${back}`,
  `border: solid ${back}`, // 13px
  `border-image: linear-gradient(${back}, ${foreT2}) 9 fill`
]);

css.define(".TitleBar", [
  "position: relative",
  "height: 24px",
  "margin: 0",
  "padding: 0",
  "overflow: auto",
  "background-color: transparent",
  "cursor: default",
  "user-select: none"
]);

css.define(".WinControl", [
  "position: absolute",
  "top: 0",
  "right: 0",
  "display: flex",
  "flex-direction: row",
  "margin: 0",
  "padding: 0",
  "user-select: none"
]);

css.define(".Module", [
  "height: calc(100% - 24px)",
  "overflow-y: auto"
]);

css.define(".Highlight", [
  `background-color: ${high}`
]);

/* exports */
module.exports = true;
