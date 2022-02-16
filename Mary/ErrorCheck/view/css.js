"use strict";

/* requires */
const css = Mary.require("CSS")("ErrorCheck");

/* constants */
const fore = "#E0ECFF";
const back = "#0f1318";
const bord = "#3B3A32";

/* top */
css.define("", [
  "box-sizing: border-box",
  "padding: 10px",
  "background-color: " + back,
  "border: 1px solid " + bord,
  "font-size: 24px",
  "color: " + fore
]);

/* buttons */
css.define(".GeneralButton", [
  "width: 72px",
  "text-align: left"
]);

css.define(".SmallButton", [
  "width: 24px",
]);

/* selects */
css.define(".GeneralSelect", [
]);

css.define(".ChapterExists", [
  "color: #35c37d"
]);

/* inputs */
css.define(".GeneralInput", [
]);

css.define(".SourceInput", [
  "position: relative",
  "top: 7px",
  "width: 360px",
  "height: 22px",
  "border: 1px solid " + bord,
  "font-family: Arial",
  "resize: none"
]);

/* verses */
css.define(".Entry", [
  "margin: 0 5px 5px 5px",
  "border: 1px solid " + bord
]);

css.define(".EntryName, .EntryID", [
  "margin-bottom: 3px",
  "min-width: 24px"
]);

css.define(".EntryID", [
  "border: none"
]);

css.define(".source, .copy, .SubAssist", [
  "overflow-y: auto",
  "width: 100%",
  "height: 2.8em", // 2.65em
  "padding: 0px 5px",
  "vertical-align: middle"
]);

css.define(".source, .copy", [
  "resize: none",
  "color: inherit"
]);

css.define(".English, .Latin", [
  "direction: ltr",
  "font-family: Gentium",
  "font-size: 18.5px",
  "line-height: 1.2"
]);

css.define(".Hebrew", [
  "direction: rtl",
  "font-size: 21px",
  "font-family: Ezra SR"
]);

/* checks */
css.define(".check", [
  "font-family: monospace",
  "font-size: 22px",
  "text-align: center"
]);

css.define(".Plain", [
  "display: inline"
]);

css.define(".Right", [
  "display: inline",
  "background-color: #026735"
]);

css.define(".Wrong", [
  "display: inline",
  "background-color: #540505"
]);

/* exports */
module.exports = true;
