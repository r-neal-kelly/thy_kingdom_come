"use strict";

/* requires */
const utils = Mary.require("Utils");

/* functions */

/* filter */
const filter = (type, str) => {
  return str;
};
// one to change out the ligatures for separates.
// one to look up dictionary and copy entries to add macrons and breves.
// one to take away macrons and breves.

/* exports */
module.exports = filter;
