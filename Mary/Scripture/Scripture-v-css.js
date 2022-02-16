"use strict";

/* requires */
const css = Mary.css("Scripture");

/* constants */
const fore = "#E0ECFF";
const back = "#0f1318";
const bord = "#3B3A32";
const high = "#261946";
const foreT = "rgba(224,236,255,.3)";
const foreT2 = "rgba(224,236,255,.5)";
const backT = "rgba(15,19,24,.5)";
const highT = "rgba(38,25,70,.5)";

/* css.define("::-webkit-scrollbar", `
  width: 12px
  background-color: ${backT}
`); */

css.define(".Scripture", `
  display: grid
  grid-template-columns: 12em 3em 1fr
  grid-template-rows: 1.2em 1.2em 1fr;
  width: 100%
  height: 100%
  background-color: ${backT}
  color: ${fore}
`);

css.define(".VersionSelect, .VersionOptions", `
  grid-column: 1 / 4
`);

css.define(".BookSelect, .ChapterSelect, .ChapterView", `
  overflow-y: auto
  overflow-x: hidden
`);

css.define(".BookSelect", `
  grid-column: 1
`);

css.define(".ChapterSelect", `
  grid-column: 2
`);

css.define(".ChapterView", `
  grid-column: 3
`);

css.define(".VerseView", `
  padding-bottom: 15%
`);

css.define(".VerseFrame", `
  display: flex
  align-items: flex-start
`);

css.define(".BookSelectBtn, .ChapterSelectBtn", `
  width: 100%
  text-align: left
`);

css.define(".VerseSelectBtn", `
  flex: 0 0 2em
`);

/* exports */
module.exports = true;
