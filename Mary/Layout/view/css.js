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

/* main */
css.define(".Layout", [
  "position: relative",
  `background-image: url("${backPath}/russia-102187_1920.jpg")`,
  "background-position: center",
  "background-color: transparent",
  "width: 100%",
  "height: 100%",
  "margin: 0",
  "padding: 0",
  "overflow: auto",

  // vars
  "--TaskBar-height: 36px",
  "--TaskBar-border-width: 3px"
]);

/* exports */
module.exports = true;
