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

/* taskbar */
css.define(".Taskbar", [
  "position: fixed",
  "z-index: 300",
  "display: flex",
  "flex-direction: row",
  "align-items: center",
  "margin: 0",
  "padding: 0",
  `background-color: ${backT}`,
  `border: solid ${bord}`,
  "user-select: none"
]);

css.define(".ToggleMenu", [
  `background-image: url("${imgPath}/AlephTaw.ico")`,
  "background-position: center",
  "background-color: transparent",
  "width: 32px",
  "height: 32px",
  "border-radius: 100%"
]);

css.define(".TaskbarBtn", [
  "width: 120px",
  "height: 90%",
  `border: 1px solid ${bord}`,
  "text-align: left"
]);

css.define(".TaskbarBtnSel", [
  `background-color: ${foreT}`
]);

css.define(".TaskbarBtn:hover", [
  `background-color: ${high}`
]);

/* exports */
module.exports = true;
