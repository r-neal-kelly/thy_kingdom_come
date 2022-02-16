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
const sideBarW = "13em";

/* main */
css.define("*:focus", [
  "outline: 0"
]);

css.define("*, *:before, *:after", [
  "box-sizing: inherit"
]);

css.define("button, select, input", [
  "margin: 0",
  "padding: 0",
  "border: 0px",
  "background-color: inherit",
  "color: inherit"
]);

css.define("textarea, option", [
  `background-color: ${back}`,
  "border: none",
  `color: ${fore}`
]);

css.define("html", [
  "margin: 0",
  "padding: 0",
  "height: 100%"
]);

css.define("body", [
  "position: relative",
  "height: 100%",
  "margin: 0",
  "padding: 0",
  `background-color: ${back}`,
  `color: ${fore}`
]);

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
