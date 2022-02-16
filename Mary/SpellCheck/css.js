"use strict";

/* requires */
const css = Mary.require("CSS")("SpellCheck", true);

css.define(".SpellCheck_WordError", [
  "border-bottom: 1px dotted #c20406"
]);

css.define(".SpellCheck_NonWordError", [
  "border-bottom: 1px dotted #00da6f"
]);

/* placeholder */
css.define("[contentEditable=true]:empty:before", [
  "content: attr(data-placeholder)",
  "opacity: .35",
  "cursor: text"
]);

/* exports */
module.exports = true;
