"use strict";

/* requires */
const msg = Mary.msg("Lexicon");
const {utils, dom, HTML, font} = Mary;

/* constants */
const main = utils.newObj();
const mainFont = font("English", {f:"DejaVu Sans"});
const qFont = font("English", {f:"Gentium"});
const regexComma = /\s*,\s*/;
const types = [ "noun", "proper noun", "adjective"
              , "verb", "other" ];
const nouns = [ "nominative", "genitive", "gender"
              , "declension", "defs" ];
const verbs = [ "verb", "voice", "number", "defs" ];
const other = [ "id", "PoS", "defs" ];
const parts =
 { "noun": nouns
 , "proper noun": nouns
 , "adjective": nouns
 , "verb": verbs
 , "other": other
 };

/* functions */
const genView = () => {
  main.view = dom(HTML.div)
    .appendTo(document.body)
    .class(["Add", mainFont])
    .setText("Add to Latin Lexicon");
  main.type = dom(HTML.select)
    .appendTo(main.view)
    .class(["Type", mainFont])
    .options(types)
    .on("change", e => {
      genInput();
    });
  main.input = dom(HTML.div)
    .appendTo(main.view)
    .class(["Input", qFont]);
  main.save = dom(HTML.button)
    .appendTo(main.view)
    .setText("Add")
    .on("click", e => {
      msg.pub("add-to-lexicon", getType(), getData());
      genInput();
    });
  genInput();
};

const genInput = () => {
  const type = getType();
  main.input.children().remove();
  for (let part of parts[type]) {
    dom(HTML.div)
      .appendTo(main.input)
      .setText(part);
    dom(HTML.input)
      .appendTo(main.input)
      .placeholder(part);
  }
};

const getType = () => main.type.value();

const getData = () => {
  const wordObj = utils.newObj();
  for (let elem of dom("input", main.input).array()) {
    elem = dom(elem);
    let prop = elem.placeholder();
    let val = elem.value();
    if (val === "") return alert(`No value in ${prop} input!`);
    if (prop === "defs") val = val.split(regexComma);
    wordObj[prop] = val;
  };
  return wordObj;
};

/* subscriptions */

/* initialize */
msg.sub("initialize-view", () => {
  genView();
});

/* exports */
module.exports = true;
