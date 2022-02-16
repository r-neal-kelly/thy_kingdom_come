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

/* Menu */
css.define(".Menu", [
  "right: 0",
  `border-left: solid 1.5px ${foreT}`,
]);

css.define(".MenuLists", [
  "padding-left: 1em"
]);

css.define(".CatalogList", [
  "display: flex",
  "flex-direction: row",
  "flex-wrap: wrap",
  "justify-content: center"
]);

css.define(".CatalogButton", [
  "margin: 0",
  "background-color: transparent",
  "border-radius: 15px",
  "font-variant: small-caps"
]);

css.define(".OpenList, .BookList", [
  "display: flex",
  "flex-direction: column"
]);

css.define(".BookField", [
  "margin: 3px 0 3px 0",
  "padding-bottom: 2px",
  `border-bottom: solid 1px ${foreT}`,
  "font-variant: small-caps"
]);

css.define(".BookDiv", [
  "position: relative"
]);

css.define(".CloseBookButton", [
  "position: absolute",
  "left: -1em",
  "text-align: left"
]);

css.define(".BookButton", [
  "text-align: right"
]);

css.define(".CloseBookButton:hover, .CatalogButton:hover, .BookButton:hover", [
  `background-color: ${fore}`,
  `color: ${back}`
]);

css.define(".MenuLists::-webkit-scrollbar, .ContentLists::-webkit-scrollbar", [
  "display: none"
]);

/* exports */
module.exports = true;
