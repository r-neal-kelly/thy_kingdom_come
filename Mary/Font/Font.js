"use strict";

/* requires */
const utils = Mary.require("Utils");
const css = Mary.require("CSS")("Fonts", true);

/* constants */
const urls = utils.newObj();
const classes = utils.newObj();
const fontNames = utils.newObj();
const langs =
  [ "English"
  , "Hebrew"
  , "Greek"
  , "Latin"
  , "Ge'ez"
  , "Aramaic"
  ];

/* functions */
const load = lang => {
  for (let [name, path] of lang) {
    urls[name] = path;
    css.define("@font-face", [
      `font-family: "${name}"`,
      `src: url("${path}")`
    ]);
  }
};
const calc = (base, factor) => {
  if (factor === null) return "null";
  if (utils.isString(factor)) {
    if (/em|%|px/.test(factor)) return factor;
    else if (/small|sml/i.test(factor)) factor = 0.5;
    else if (/medium|med/i.test(factor)) factor = 1.0;
    else if (/large|lrg/i.test(factor)) factor = 2.0;
    else factor = parseFloat(factor);
  }
  let num = base * factor;
  return `${(num > 0) ? num : 1}px`;
};

/* load */
for (let l of langs) {
  let {paths, presets} = require(`./languages/${l}`);
  css.comment(`${l} Fonts`);
  load(paths);
  classes[l] = presets;
  fontNames[l] = [];
  for (let name of Object.keys(presets).sort()) {
    if (/default|direction/.test(name)) continue;
    fontNames[l].push(name);
  }
}
css.comment("presets");

/* module */
const font = (lang, options) => {
  // OPTIONS = f: family (name), s: size ("sml/med/lrg"/1/null)
  // EXAMPLE = Font("Hebrew", {f:"Ezra", s:"med"})
  let selector, d, l;
  const set = classes[lang];
  if (!set) throw new Error("Language not found.");
  let {f, s = 1} = options || {};
  if (!set[f]) f = set["default"];
  s = calc(set[f]["base"], s);
  selector = `${lang}-${f.replace(/ /g, "-")}-${s.replace(/\./, "_")}`;
  if (css.has(selector)) return selector;
  d = set["direction"];
  l = set[f]["len"];
  css.define(`.${selector}`, [
    `direction: ${d}`,
    `font-family: "${f}"`,
    `font-size: ${s}`,
    `line-height: ${l}`
  ]);
  return selector;
};

font.getFonts = lang => Array.from(fontNames[lang]);

font.getUrl = fontName => urls[fontName];

/* exports */
module.exports = font;
