"use strict";

/* requires */
const {remote} = require("electron");
const {mary:maryPath} = Mary.require("Path");

/* exports */
module.exports = remote.require(`${__dirname}/win.js`);
