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

css.define(".Highlight", [
  `background-color: ${high}`
]);

css.define(".Grid", [
  "display: flex",
  "flex-direction: column"
]);

css.define(".Row", [
  "display: flex",
  "flex-direction: row"
]);

css.define(".Cell", [
  "width: 240px",
  "padding: 0 3px 0 3px",
  `border: 1px solid ${bord}`,
  "text-align: right"
]);

css.define(".ColumnHeader", [
  "font-variant: small-caps"
]);

css.define(".RowHeader", [
  "width: 100px",
  "font-size: .9em"
]);

css.define(".CellIsWrong", [
  "background-color: firebrick"
]);

/* exports */
module.exports = true;
