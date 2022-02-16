"use strict";

/* requires */
const css = Mary.css("Game_Memory");

/* constants */
const fore = "#E0ECFF";
const back = "#0f1318";
const bord = "#3B3A32";
const high = "#261946";
const foreT = "rgba(224,236,255,.6)";
const backT = "rgba(15,19,24,.84)";
const highT = "rgba(38,25,70,.5)";
const popupW = "180px";
const popupH = "24px";

/* top */
css.define(".Game_Memory", [
  "width: 100%",
  "height: 100%"
]);

css.define(".Screen, .TitleBtns, .Section, .Response, .Correct, .Corrected", [
  "display: flex",
  "flex-direction: column",
  "flex-wrap: wrap",
  "justify-content: center",
  "align-items: center"
]);

css.define(".Screen", [
  "position: relative",
  "width: 100%",
  "height: 100%",
  "margin: 0",
  "padding: 0",
  "overflow: hidden"
]);

css.define(".GeneralBtn", [
  "margin: 0",
  "padding: 0",
  "background-color: transparent"
]);

/* game screen */
css.define(".Section", [
  "margin-bottom: auto",
  "margin-top: 0"
]);

css.define(".Clear", [
  "color: transparent",
  "cursor: default",
  "user-select: none"
]);

css.define(".Right", [
  "color: #23ce23"
]);

css.define(".Wrong", [
  "color: #ec7f7f"
]);

css.define(".Answer", [
  "text-align: center"
]);

css.define(".Answer::placeholder", [
  `color: ${foreT}`
]);

css.define(".Choice", [
  "margin: .5em",
  "padding: .5em",
  `border: 1px solid ${foreT}`,
  "border-radius: 15px"
]);

/* results */
css.define(".Corrected", [
  "height: 100%",
  "overflow: auto",
  "margin: auto",
  "padding: 3px",
  "text-align: center"
]);

css.define(".EndGameBtn, .Percent", [
  "margin: auto"
]);

css.define(".RowC, .HeaderC", [
  "display: flex",
  "flex-direction: row",
  "align-self: flex-start"
]);

css.define(".HeaderC", [
  `background-color: ${back}`,
  "font-variant: small-caps"
]);

css.define(".CellC", [
  "width: 216px",
  "padding: 0 3px 0 3px",
  `border: 1px solid ${bord}`
]);

/* exports */
module.exports = true;
