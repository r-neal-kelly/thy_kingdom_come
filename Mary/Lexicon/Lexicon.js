"use strict";

/* requires */
const {utils} = Mary;

/* constants */
const lexicons = utils.newObj();
const langs = ["Latin"];
for (let lang of langs) {
  lexicons[lang] = require(`./langs/${lang}`)();
}

/* functions */
const getLexicon = lang => lexicons[lang];
// likely to be more functions in the future.

/* exports */
module.exports = getLexicon;
