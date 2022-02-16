"use strict";

/* requires */
const utils = Mary.require("Utils");

/* functions */
const longS = str => str.replace(/s(?=\w)/g, "ſ");
const shortS = str => str.replace(/ſ/g, "s");
// need to add custom stuff

/* filter */
// should put original and custom in here, no reason to separate them, I don't think.
const filter = (type, str) => {
  if (type === "Long S") return longS(str);
  if (type === "Short S") return shortS(str);
  else return str;
};

/* exports */
module.exports = filter;
