"use strict";

/* requires */
const css = Mary.css("Lexicon", true);

/* constants */
const fore = "#E0ECFF";
const back = "#0f1318";
const bord = "#3B3A32";
const high = "#261946";
const foreT = "rgba(224,236,255,.3)";
const backT = "rgba(15,19,24,.5)";

css.define(".Highlight", [
  `background-color: ${high}`
]);

css.define(".View", [
  "display: flex",
  "flex-direction: column",
  "align-items: center",
  "width: 100%",
  "text-align: center"
]);

css.define(".Mode", [
  "flex-basis: 33%",
  "text-align: center"
]);

css.define(".Question", [
  "flex-basis: 33%",
  "text-align: center"
]);

css.define(".Answer", [
  "flex-basis: 33%",
  "text-align: center"
]);

css.define(".Right", [
  "color: green"
]);

css.define(".Wrong", [
  "color: red"
]);

css.define(".Clear", [
  "color: transparent"
]);

/* exports */
module.exports = true;
