"use strict";

/* requires */
const fs = require("fs");
const {boot:bootPath} = require("../Path");

/* components */
const NewWindow = require(`${bootPath}/NewWindow`);

/* functions */
const toggleLibrary = () => {
  const win = NewWindow("library", __dirname, {dev: false});
  win.setMenu(null);
};

/* exports */
module.exports = toggleLibrary;
