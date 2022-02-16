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

/* menu */
css.define(".LayoutMenu", [
  "display: flex",
  "flex-direction: column",
  "position: absolute",
  "bottom: calc(100% + 3px)",
  "left: 0",
  "width: 200px",
  "height: 300px",
  "margin: 0",
  "padding: 0",
  `background-color: ${foreT}`,
  `border: 1px solid ${bord}`,
  "border-bottom: none"
]);

css.define(".FolderBtn, .FileBtn", [
  "margin: 0",
  `background-color: ${backT}`,
  `border: 1px solid ${bord}`,
  "text-align: left"
]);

css.define(".FolderBtn:hover, .FileBtn:hover", [
  `background-color: ${high}`
]);

/* exports */
module.exports = true;
