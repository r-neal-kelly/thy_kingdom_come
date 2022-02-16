"use strict";

/* requires */
const utils = Mary.require("Utils");

/* constants */
const HTML = utils.proto(null, {
  div: "<div></div>",
  span: "<span></span>",
  button: "<button></button>",
  select: "<select></select>",
  textarea: "<textarea></textarea>",
  input: "<input></input>",
  editDiv: "<div contentEditable='true'></div>",
  canvas: "<canvas></canvas>",
  h1: "<h1></h1>",
  h2: "<h2></h2>",
  h3: "<h3></h3>"
});

Object.freeze(HTML);

/* exports */
module.exports = HTML;
