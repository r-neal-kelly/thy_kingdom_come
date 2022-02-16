"use strict";

/* constants */
const top = __dirname
  .replace(/\\Mary\\Path/, "")
  .replace(/\\/g, "/");
const Path = 
  { top
  , boot:      `${top}/Boot`
  , fonts:     `${top}/Fonts`
  , images:    `${top}/Images`
  , libs:      `${top}/Libs`
  , mary:      `${top}/Mary`
  , save:      `${top}/Save`
  , scripture: `${top}/Scripture`
  , tools:     `${top}/Tools`
  };

Object.freeze(Path);

/* exports */
module.exports = Path;
