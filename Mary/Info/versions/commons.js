"use strict";

/* requires */
const utils = Mary.require("Utils");

/* constants */
const ʹ = code => () => {
  if (utils.isNumber(code)) return utils.range(1, code);
  const codes = code.split(",");
  let chaps = [];
  for (let code of codes) {
    if (/-/.test(code)) {
      const range = code.split("-").map(Number);
      chaps = chaps.concat(
        utils.range(...range).map(String)
      );
    } else {
      chaps.push(code);
    }
  }
  return chaps;
};

/* exports */
module.exports = ʹ;
