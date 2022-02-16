"use strict";

/* constants */
const genders =
  [ "m"
  , "f"
  , "m/f"
  , "n"
  ];

const numbers =
  [ "Singular"
  , "Plural"
  ];

const cases =
  [ "Nominative"
  , "Genitive"
  , "Dative"
  , "Accusative"
  , "Vocative"
  , "Ablative"
  // , "Locative"
  ];

const numCases = (() => {
  const arr = [];
  for (let number of numbers) {
    number = number[0];
    for (let caseName of cases) {
      arr.push(`${number}. ${caseName}`);
    }
  }
  return arr;
})();

const parts =
  [ "noun"
  , "proper noun"
  , "adjective"
  ]; // incomplete but you get the idea.

/* module */
const elements =
  { get genders()     { return Array.from(genders) }
  , get numbers()     { return Array.from(numbers) }
  , get cases()       { return Array.from(cases) }
  , get numCases()    { return Array.from(cases) }
  , get parts()       { return Array.from(parts) }
  };

/* exports */
module.exports = elements;
