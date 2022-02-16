"use strict";

/* requires */
const msg = Mary.msg("Lexicon");
const {utils, dom, HTML, font} = Mary;

/* constants */
const main = utils.newObj();
const mainFont = font("English", {f:"DejaVu Sans"});
const qFont = font("English", {f:"Gentium"});
const cases = [ "Nominative", "Genitive", "Dative"
              , "Accusative", "Vocative", "Ablative"
              ];

/* functions */
const genView = () => {
  main.view = dom(HTML.div)
    .appendTo(document.body)
    .class(["View", mainFont])
    .setText("Latin Decline");
  main.word = dom(HTML.div)
    .appendTo(main.view)
    .class(["Declension", qFont]);
  main.grid = dom(HTML.div)
    .appendTo(main.view)
    .class("Grid");
  main.header = dom(HTML.div)
    .appendTo(main.grid)
    .class("Row");
  dom(HTML.div, null, 3)
    .appendTo(main.header)
    .class(["Cell", "ColumnHeader"])
    .setText(["case", "singular", "plural"], "spread")
    .eq(0).class("RowHeader").restore();
  main.rows = dom(HTML.div, null, 6)
    .appendTo(main.grid)
    .class("Row");
  main.rows.wrapEach((node, index, obj) =>{
    const caseName = cases[index];
    dom(HTML.div)
      .appendTo(node)
      .class(["Cell", "RowHeader"])
      .setText(caseName);
    dom(HTML.input, null, 2)
      .appendTo(node)
      .class(["Cell", mainFont])
      .class([`s_${caseName}`, `p_${caseName}`], "spread");
  });
  main.inputs = dom("input.Cell").on("keydown", (e, {obj}) => {
    main.result.setText("");
    if (e.key !== "Enter") return;
    msg.pub("check-declension", getDeclension());
  });
  main.result = dom(HTML.div)
    .appendTo(main.view)
    .class(["Result", qFont]);
};

const getDeclension = () => {
  const dec = utils.newObj();
  for (let caseName of cases) {
    const sName = `s_${caseName}`;
    const pName = `p_${caseName}`;
    dec[sName] = dom(`.${sName}`).value();
    dec[pName] = dom(`.${pName}`).value();
  }
  return dec;
};

const resetDeclension = () => {
  main.inputs.value("");
  main.inputs.eq(0).focus();
};

/* subscriptions */
msg.sub("set-declension-word", word => {
  main.word.setText(word);
});

msg.sub("set-declension-results", ({bool, results}) => {
  const clss = (bool) ? "Right" : "Wrong";
  main.result
    .setText(bool)
    .removeClass(["Right", "Wrong"])
    .class(clss);
  main.inputs.removeClass("CellIsWrong");
  if (bool === true) {
    resetDeclension();
    msg.pub("get-declension");
  } else {
    for (let className of Object.keys(results)) {
      dom(`.${className}`).class("CellIsWrong");
    }
  }
});

/* initialize */
msg.sub("initialize-view", () => {
  genView();
  msg.pub("get-declension");
});

/* exports */
module.exports = true;
