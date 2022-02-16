"use strict";

/* requires */
const utils = Mary.require("Utils");
const filter = Mary.require("Filter");

/* constants */
const _ = "\u00A4"; // ¤
const x = utils.array.cons;
const h = utils.array.head;
const l = utils.array.length;
const plain = str => `<div class="Plain">${str}</div>`;
const right = str => `<div class="Right">${str}</div>`;
const wrong = str => `<div class="Wrong">${str}</div>`;
const isLess = (s, c) => [ right(s), wrong(_) ];
const isMore = (s, c) => [ right(_), wrong(c) ];
const isPass = (s, c) => [ plain(s), plain(c) ];
const isMiss = (s, c) => [ right(s), wrong(c) ];

const check = ([s, ...ss], [c, ...cs]) => {
  if (   !s && !c    ) return [];
  if (    s && !c    ) return x( isLess(s,c), check(   ss , cs   ) );
  if (   !s &&  c    ) return x( isMore(s,c), check(   ss , cs   ) );
  if (    s === c    ) return x( isPass(s,c), check(   ss , cs   ) );
  if (  s === h(cs)  ) return x( isMore(s,c), check( x(s,ss), cs ) );
  if (  h(ss) === c  ) return x( isLess(s,c), check( ss, x(c,cs) ) );
  if ( l(ss) < l(cs) ) return x( isMore(s,c), check( x(s,ss), cs ) );
  if ( l(ss) > l(cs) ) return x( isLess(s,c), check( ss, x(c,cs) ) );
  else                 return x( isMiss(s,c), check(   ss , cs   ) );
};

const errorCount = (copy = "") => {
  const matches = copy.match(/<div class="Wrong">/g);
  if (!matches) return "0 errors.";
  const len = matches.length;
  if (len === 1) return "1 error.";
  else return `${len} errors.`;
};

const zip = utils.array.zip;
const unzip = utils.array.unzip;
const keys = utils.map.keys;
const values = utils.map.values;

/* constructor */
const ModelCheck = (version, sub, source, copy) => {
  source = filter(version, sub, source);
  const sources = [];
  const copies = [];
  const errors = [];
  const wrongs = [];
  const verses = zip( values(source), values(copy) );
  for (let [i, [s, c]] of verses.entries()) {
    [s = "", c = ""] = unzip( check(s, c) ).map(arr => arr.join(""));
    sources.push(s);
    copies.push(c);
    errors.push(errorCount(c));
    if (/<div class="Wrong">/.test(c)) wrongs.push(i);
  }
  const checks = zip(sources, copies, errors);
  return {checks, wrongs};
};

/* exports */
module.exports = ModelCheck;
