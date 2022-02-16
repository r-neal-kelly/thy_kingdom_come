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

/* Content */
css.define(".Content", [
  "left: 0",
  `border-right: solid 1.5px ${foreT}`,
]);

css.define(".ContentLists", [
  "padding-right: 1em"
]);

css.define(".LinkList", [
  "display: flex",
  "flex-direction: column",
  "align-items: center"
]);

css.define(".LinkField", [
  "position: relative",
  "width: 100%",
  "margin: 3px 0 3px 0",
  "padding-bottom: 2px",
  `border-bottom: solid 1px ${foreT}`,
  "font-variant: small-caps",
  "text-align: right",
  "cursor: default"
]);

css.define(".LinkGroup", [
  "text-align: center",
]);

css.define(".LinkButton", [
  "min-width: 1.5em"
]);

css.define(".LinkButton:hover", [
  `background-color: ${fore}`,
  `color: ${back}`
]);

css.define(".OpenLinkGroupButton", [
  "position: absolute",
  "bottom: 0",
  "left: 0"
]);

/* bookmarks */
css.define(".AddDiv", [
  "display: flex",
  "flex-direction: row",
  "justify-content: center"
]);

css.define(".AddInput", [
  `background-color: ${back}`,
  "text-align: center"
]);

css.define(".BookmarkButton", [
  "user-select: select"
]);

css.define(".AddButton:hover, .BookmarkButton:hover", [
  `background-color: ${fore}`,
  `color: ${back}`
]);

css.define(".BookmarkBtnDiv", [
  "display: flex",
  "flex-direction: column",
  "align-items: flex-start",
  "width:100%"
]);

css.define(".ContextMenu", [
  "position: fixed",
  "z-index: 1000",
  "padding: 5px",
  `background-color: ${back}`
]);

/* exports */
module.exports = true;
