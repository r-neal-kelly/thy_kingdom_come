"use strict";

/* requires */
const utils = Mary.require("Utils");

/* constants */
const parse = Object.create(null);

/* numbers */
parse.padOneNumber = function (number) { // make more general
  let num = String(number);
  num = (num.length < 2) ?
    "0" + num : num;
  return num;
};

parse.numberize = function (string) {
  // stop Number from casting "" to 0
  if (string !== "") {
    return Number(string);
  }
};

parse.hours24 = function (hours24) {
  const hours12 = Object.create(null);
  if (hours24 > 12) {
    hours12.hours = hours24 - 12;
    hours12.cycle = "PM";
  } else if (hours24 === 12) {
    hours12.hours = 12;
    hours12.cycle = "PM";
  } else if (hours24 === 0) {
    hours12.hours = 12;
    hours12.cycle = "AM";
  } else {
    hours12.hours = hours24;
    hours12.cycle = "AM";
  }
  return hours12;
};

/* statements */
parse.statement = function (statement, delimiter) {
  const result = [];
  let isAssigned, left, right, removes;
  if (utils.isArray(statement)) {
    // assumed to already be parsed
    return statement;
  }
  if (delimiter === ":") {
    isAssigned = /:(\s*)?\S/;
    left = /[^:]+/;
    right = /:.+/;
    removes = /:\s*|;/g;
  } else if (delimiter === "=") {
    isAssigned = /=(\s*)?\S/;
    left = /[^=]+/;
    right = /=.+/;
    removes = /=\s*|'|"/g;
  }
  result[0] = statement.match(left)[0].trim();
  if (isAssigned.test(statement)) {
    result[1] = statement.match(right)[0].replace(removes, "").trim();
  } else {
    result[1] = "";
  }
  return result;
};

parse.style = declaration => parse.statement(declaration, ":");

parse.attribute = pair => parse.statement(pair, "=");

/* Scripture */
parse.Scripture = utils.newObj();

parse.Scripture.toMap = data => {
  // maybe make a custom constructor, so I can verify it's not a normal map
  if (utils.isMap(data)) return data;
  return new Map(
    data.match(/.+/gm).map(
      v => v.trim().replace(/\s*:\s*/, "␀").split("␀")
    )
  );
};

parse.Scripture.toData = map => {
  if (utils.isString(map)) return map;
  let data = "";
  for (let [k, v] of map.entries()) {
    data += k.trim() + ": " + v.trim() + "\n";
  }
  return data;
};

parse.Scripture.noVerseNums = text => {
  return text.replace(/^[^:]+:\s*/gm, "");
};

parse.Scripture.noNewLine = text => {
  return text.replace(/\n+|\r+/g, " ");
};

parse.Scripture.toParagraph = text => {
  // for ¶ later on.
};

// All of the following parsers are used only to check against our own copies. The text put through them is not saved.

parse.Scripture.KingdomCome = src => src;

parse.Scripture.KJVOnline = src => {
  // https://www.kingjamesbibleonline.org, (ex. Genesis 1:1-999)
  src = src.replace(/^(\n|.)+\.{3}\n[^\n]+/, ""); // in case chap has num
  src = src.replace(/^[^\d\n].*/gm, ""); // non-verses
  src = src.replace(/\n+/g, "\n").trim(); // extra \n
  src = src.replace(/^(\d+)\s*/gm, "$1: ");
  return src;
};

parse.Scripture.TanachUS = src => {
  // https://tanach.us/ ("text-only", "accents", in text format)
  src = src.replace(/^[^x]{1}xxxx.+\n*/gm, "").trim(); // non-verses
  src = src.replace(/ +/g, " "); // multiple spaces
  src = src.replace(/^\u202B| *\u202C$/gm, ""); // RTL embed, pop directional format
  for (let i = 1; /^ /m.test(src); i += 1) src = src.replace(/^ /m, i + ": ");
  return src;
};

parse.Scripture.BibliaSacra = src => {
  // http://www.sacredbible.org/vulgate1914/index.htm
  src = src.replace(/\[.*\]/, ""); // book and chapter
  src = src.replace(/\{\d+:(\d+)\}\s*/g, "$1: ").trim(); // verse nums
  return src;
};

parse.Scripture.eBibleBrenton = src => {
  // http://ebible.org/eng-Brenton/
  src = src.replace(/^([^\d].*\n)|\d\n/gm, ""); // non-verses
  src = src.replace(/\s*[\*†‡§✡]+\s*/g, " "); // footnote symbols
  src = src.replace(/\s*(\d+(-\d+)?)\s*/g, "\n$1: ").trim(); // verse formatting
  return src;
}

parse.Scripture.GreekWikiSrc = src => {
  // https://el.wikisource.org/wiki/Παλαιά_Διαθήκη
  const tonos = ["ά","έ","ή","ί","ό","ύ","ώ","Ά","Έ","Ή","Ί","Ό","Ύ","Ώ","΄","ΐ","ΰ","΅"];
  const oxia =  ["ά","έ","ή","ί","ό","ύ","ώ","Ά","Έ","Ή","Ί","Ό","Ύ","Ώ","´","ΐ","ΰ","΅"];
  src = src.replace(/\s*(\d+)\s*/g, "\n$1: ").trim(); // verse nums
  for (let [i,t] of tonos.entries()) {
    src = src.replace(new RegExp(t, "g"), oxia[i]);
  }
  return src;
};

parse.Scripture.AcademicBible = src => {
  // https://www.academic-bible.com
  src = src.replace(/\n+|\*/g, "");
  src = src.replace(/\s+/g, " ");
  src = src.replace(/·/g, "·"); // Ano Teleia
  src = src.replace(/\s*(\d+)\s*/g, "\n$1: ").trim(); // verse nums
  return src;
};

/* exports */
module.exports = parse;
