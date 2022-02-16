"use strict";

/* requires */
const css = Mary.css("Layout");
const {path} = Mary;

/* constants */
const fore = "#E0ECFF";
const back = "#0f1318";
const bord = "#3B3A32";
const high = "#261946";
const foreT = "rgba(224,236,255,.3)";
const foreT2 = "rgba(224,236,255,.5)";
const backT = "rgba(15,19,24,.5)";
const highT = "rgba(38,25,70,.5)";
const imgPath = `file://${path.images}`;
const backPath = `file://${path.images}/Background`;

/* main */
css.define(".Layout", [
  "position: relative",
  `background-image: url("${backPath}/russia-102187_1920.jpg")`,
  "background-position: center",
  "background-color: transparent",
  "width: 100%",
  "height: 100%",
  "margin: 0",
  "padding: 0",
  "overflow: auto"
]);

/* taskbar */
css.define(".Taskbar", [
  "position: fixed",
  "bottom: 0",
  "left: 0",
  "z-index: 300",
  "display: flex",
  "flex-direction: row",
  "align-items: center",
  "width: 100%",
  "height: 36px",
  "margin: 0",
  "padding: 0",
  `background-color: ${backT}`,
  `border-top: 3px solid ${bord}`
]);

css.define(".TaskbarBtn", [
  "width: 120px",
  "height: 90%",
  `border: 1px solid ${bord}`,
  "text-align: left"
]);

css.define(".TaskbarBtnSel", [
  `background-color: ${foreT}`
]);

css.define(".TaskbarBtn:hover", [
  `background-color: ${high}`
]);

/* menu */
css.define(".LayoutMenu", [
  "display: flex",
  "flex-direction: column",
  "position: absolute",
  "bottom: 100%",
  "left: 0",
  "width: 200px",
  "height: 300px",
  "margin: 0",
  "padding: 0",
  `background-color: ${foreT}`,
  `border: 1px solid ${bord}`
]);

css.define(".OpenMenuBtn", [
  `background-image: url("${imgPath}/AlephTaw.ico")`,
  "background-position: center",
  "background-color: transparent",
  "width: 32px",
  "height: 32px",
  "border-radius: 100%"
]);

css.define(".MenuBtn", [
  "margin: 0",
  `background-color: ${backT}`,
  `border: 1px solid ${bord}`,
  "text-align: left"
]);

css.define(".MenuBtn:hover", [
  `background-color: ${high}`
]);

/* window */
css.define(".Window", [
  "position: fixed",
  "margin: 0",
  "padding: 0",
  `box-shadow: 0 0 36px ${back}`,
  `border: 13px solid ${back}`,
  `border-image: linear-gradient(${back}, ${foreT2}) 9 fill`
]);

css.define(".TitleBar", [
  "position: relative",
  "height: 24px",
  "margin: 0",
  "padding: 0",
  "overflow: auto",
  "background-color: transparent",
  "cursor: default",
  "user-select: none"
]);

css.define(".WinControl", [
  "position: absolute",
  "top: 0",
  "right: 0",
  "display: flex",
  "flex-direction: row",
  "margin: 0",
  "padding: 0",
  "user-select: none"
]);

css.define(".Module", [
  "height: calc(100% - 24px)",
  "overflow-y: auto"
]);

css.define(".Highlight", [
  `background-color: ${high}`
]);

/* exports */
module.exports = true;
