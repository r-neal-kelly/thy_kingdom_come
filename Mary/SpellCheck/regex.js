"use strict";

/* requires */
const utils = Mary.require("Utils");
const info = Mary.require("Info");

/* constants */
const regex = utils.newObj();

/* functions */
const toRegex = lang => {
  const {allPunc, spelling, punc: {after, middle, before}} = lang;
  const str = arr => arr.map(utils.escapeRegex).join("").replace(" ", "\\s");
  const str2 = arr => arr.join("|").replace(" ", "\\s");
  const regex = str => new RegExp(str);
  const regexG = str => new RegExp(str, "g");
  if (allPunc) {
    const excludes = /['᾽]/g; // acts as nonPunc.
    let punc = allPunc.concat(["<",">"]); // needed for HTML.
    punc = utils.array.unDupe(punc);
    punc = str(punc).replace(excludes, "");
    lang.allPunc = regexG(`[${punc}]+`);
    lang.nonPunc = regexG(`[^${punc}]+`);
    lang.hasPunc = regex(`[${punc}]`);
    lang.hasNonPunc = regex(`[^${punc}]`);
  }
  if (spelling) {
    const es = Object.entries(spelling);
    for (let [k, v] of es) spelling[k] = regexG(str2(v));
  }
  if (after) {
    const a = `[${str(after)}]`;
    const brackets = `[${str(['"',")","}","]"])}\\s]`;
    lang.punc.after = regexG(
      `((^|\\s+)${a}(\\s+)?)|((\\s+)?${a}(\\s{2,}|\\s+$|(?!${brackets}|$)))`
    );
  }
  if (middle) {
    const m = `[${str(middle)}]`;
    lang.punc.middle = regexG(
      `((^|\\s+)${m}(\\s+)?)|((\\s+)?${m}(\\s+|(\\s+)?$))`
    );
  }
  if (before) {
    const b = `[${str(before)}]`;
    const brackets = `[^${str(['"',"(","{","["])}\\s]`;
    lang.punc.before = regexG(
      `((\\s+)?${b}(\\s+|(\\s+)?$))|((\\s{2,}|^\\s+|${brackets})${b}(\\s+)?)`
    );
  }
};

/* langs */
regex["English"] =
  { allPunc:    info.getPunctuation("English")
  , punc:     { after:  [",",".",";",":","?","!",")","}"]
              , middle: ["-","‐","…"]
              , before: ["(","{"]
              }
  };
regex["Hebrew"] =
  { allPunc:    info.getPunctuation("Hebrew")
  , spelling: { accent: info.getElements("Hebrew", "accentsPlus") }
  , punc:     { after:  ["׃","׳","״"]
              , middle: ["־"]
              }
  };
regex["Greek"] =
  { allPunc:    info.getPunctuation("Greek")
  , punc:     { after:  ["ʹ","͵",";","·",".",",","!",")","}"]
              , before: ["(","{"]
              }
  };

for (let lang of Object.values(regex)) toRegex(lang);

regex["Latin"] = regex["English"];

/* exports */
module.exports = regex;
