"use strict";

/* requires */
const msg = Mary.msg("Lexicon");
const {utils, dom, HTML, font} = Mary;

/* constants */
const main = utils.newObj();
const mainFont = font("English", {f:"DejaVu Sans"});
const qFont = font("English", {f:"Gentium"});

/* functions */
const genView = () => {
  main.view = dom(HTML.div)
    .appendTo(document.body)
    .class(["View", mainFont])
    .setText("Latin Memory");
  main.mode = dom(HTML.select)
    .appendTo(main.view)
    .class(["Mode", mainFont])
    .options(["Latin", "English"])
    .on("change", e => {
      msg.pub("get-question", main);
    });
  main.question = dom(HTML.div)
    .appendTo(main.view)
    .class(["Question", qFont]);
  main.answer = dom(HTML.input)
    .appendTo(main.view)
    .class("Answer")
    .placeholder("answer")
    .on("keydown", e => {
      msg.pub("clear-response", main);
      if (e.key !== "Enter") return;
      msg.pub("give-answer", main);
      msg.pub("get-question", main);
    });
  main.response = dom(HTML.div + HTML.div)
    .appendTo(main.view)
    .class(["Response", "Clear"])
    .setText("null")
    .on("click", e => {
      msg.pub("clear-response", main);
    });
};

/* subscriptions */
msg.sub("set-question", question => {
  main.question.setText(question);
});

msg.sub("set-response", ({bool, words}) => {
  const clss = (bool) ? "Right" : "Wrong";
  main.response.eq(0)
    .setText(bool)
    .removeClass("Clear")
    .class(clss);
  if (!bool) {
    main.response.eq(1)
      .setText(words || "")
      .removeClass("Clear");
  }
});

/* initialize */
msg.sub("initialize-view", () => {
  genView();
  msg.pub("get-question", main);
});

/* exports */
module.exports = true;
