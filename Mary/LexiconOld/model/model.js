"use strict";

/* requires */
const {utils} = Mary;

/* functions */
const lexicon = lang => {
  // a function so we don't keep everything in memory
  return require(`./${lang}`)();
};

/* exports */
module.exports = lexicon;
