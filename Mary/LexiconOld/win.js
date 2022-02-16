"use strict";

/* requires */
const fs = require("fs");
const {boot:bootPath} = require("../Path");

/* components */
const NewWindow = require(`${bootPath}/NewWindow`);

/* functions */
const toggleLexicon = () => {
  const win = NewWindow("lexicon", __dirname, {dev:true, confirm:false});
};

/* exports */
module.exports = toggleLexicon;
