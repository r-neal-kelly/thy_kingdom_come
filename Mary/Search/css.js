"use strict";

/* requires */
const css = Mary.require("CSS")("Search");

/* constants */
const fore = "#E0ECFF";
const back = "#0f1318";
const bord = "#3B3A32";

/* resets */ css.comment("resets");
css.define("button, select, input", [
  "margin: 0 3px 0 3px",
  "padding: 3px",
  "border: 0px solid " + bord,
  "background-color: inherit",
  "color: inherit"
]);

css.define("textarea, option", [
  "background-color: " + back,
  "border: none",
  "color: " + fore
]);

/* top */ css.comment("top");
css.define("", [
  "box-sizing: border-box",
  "padding: 10px",
  "background-color: " + back,
  "border: 1px solid " + bord,
  "color: " + fore
]);

/* sections */ css.comment("sections");
css.define(".Menu", [
]);

css.define(".ResultFrame", [
  "display: flex",
  "flex-direction: row"
]);

css.define(".BookSelects", [
  "display: inline-flex",
  "flex-direction: column",
  "align-items: flex-end",
  "flex-basis: 9em",
  "flex-grow: 0",
  "flex-shrink: 0"
]);

css.define(".Results", [
  "display: inline-flex",
  "flex-direction: column",
  "flex-basis: 100%"
]);

css.define(".PageSelects", [
  "display: inline-flex",
  "flex-direction: row",
  "flex-wrap: wrap",
  "align-items: flex-start"
]);

/* Menu */
css.define(".DisplayStats", [
  "display: inline"
]);

/* Results */ css.comment("results");
css.define(".Result", [
  "padding: 0 0 10px 0"
]);

css.define(".Ref", [
  "padding: 0 0 5px 0"
]);

css.define(".Verse", [
  "padding: 0 12px 0 12px"
]);

css.define(".Highlight", [
  "background-color: #261946"
]);

css.define(".Right", [
  "justify-content: flex-end"
]);

css.define(".Left", [
  "justify-content: flex-start"
]);

/* interactables */ css.comment("interactables");
css.define(".SearchInput", [
  //"display: block"
]);

css.define(".BookSelectButton", [
  "width: 100%",
  "text-align: right"
]);

css.define(".PageSelectButton", [
  "width: 1.7em"
]);

/* exports */
module.exports = true;
