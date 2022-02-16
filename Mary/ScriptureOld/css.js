"use strict";

/* requires */
const css = Mary.require("CSS")("Scripture");

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
css.define(".VersionSelect", [
]);

css.define(".VersionFrame", [
  "display: flex",
  "flex-direction: row"
]);

css.define(".BookSelect, .ChapterSelect, .Chapter", [
  "display: inline-flex",
  "flex-direction: column",
  "align-items: flex-end"
]);

css.define(".BookSelect", [
  "flex-basis: 9em",
  "flex-grow: 0",
  "flex-shrink: 0"
]);

css.define(".ChapterSelect", [
  "flex-basis: 2.2em",
  "flex-grow: 0",
  "flex-shrink: 0"
]);

css.define(".Chapter", [
  "align-items: flex-start",
  "flex-basis: 100%"
]);

/* verses */ css.comment("verses");
css.define(".Verse", [
  "display: flex",
  "flex-direction: row",
  "align-items: flex-start",
  "width: 100%",
  "padding: .3em"
]);

css.define(".Highlight", [
  "background-color: #261946"
]);

css.define(".VerseRight", [
  "justify-content: flex-end"
]);

css.define(".VerseLeft", [
  "justify-content: flex-start"
]);

css.define(".English", [
  "direction: ltr",
  "font-family: Orkney",
  "font-size: 16.3px",
  "line-height: 1.5"
]);

css.define(".Hebrew", [
  "direction: rtl",
  "font-family: Ezra SR",
  "font-size: 21px"
]);

css.define(".Latin", [
  "direction: ltr",
  "font-family: Gentium",
  "font-size: 18.5px",
  "line-height: 1.3"
]);

/* buttons */ css.comment("buttons");
css.define(".BookSelectButton, .ChapterSelectButton", [
  "width: 100%",
  "text-align: right"
]);

/* exports */
module.exports = true;
