"use strict";

/* requires */
const utils = Mary.require("Utils");
const msg = Mary.require("Msg")("Library");
const dom = Mary.require("Dom");

/* modules */
const {state, catalog} = require("../model/model");

/* subscriptions */
msg.sub("set-catalog-view", ({button, main: {menuViewButtons}}) => {
  state.catalogView = button.getText();
  menuViewButtons.removeClass("Highlight");
  button.class("Highlight");
});

msg.sub("set-content-view", ({button, main: {menuViewButtons}}) => {
  state.contentView = button.getText();
  menuViewButtons.removeClass("Highlight");
  button.class("Highlight");
});

msg.sub("set-curr-catalog", currCatalog => {
  state.currCatalog = currCatalog;
  msg.pub("highlight-book-button", currCatalog);
});

msg.sub("gen-book-buttons", gen => {
  let openedBooks;
  if (state.catalogView === "Opened") openedBooks = state.openedBooks;
  gen(catalog[state.currCatalog], openedBooks);
  msg.pub("highlight-open-book", state.openBook);
});

msg.sub("highlight-by-text", ({text, buttons}) => {
  const index = buttons.array()
    .map(n => n.textContent)
    .indexOf(text);
  buttons.removeClass("Highlight")
    .eq(index)
    .class("Highlight");
});

msg.sub("default-menu", ({menuToggle, menuLists, menuViewButtons}) => {
  menuToggle.setText(">");
  menuLists.show();
  menuViewButtons.eq(1).click();
});

msg.sub("toggle-menu", ({menuToggle, menuLists}) => {
  if (menuToggle.getText() === "<") {
    menuToggle.setText(">");
    menuLists.show();
  } else {
    menuToggle.setText("<");
    menuLists.hide();
  }
});

msg.sub("toggle-content", ({contentToggle, contentLists}) => {
  if (contentToggle.getText() === ">") {
    contentToggle.setText("<");
    contentLists.show();
  } else {
    contentToggle.setText(">");
    contentLists.hide();
  }
});

msg.sub("toggle-link-group", ({toggle, group}) => {
  if (toggle.getText() === "+") {
    toggle.setText("-");
    group.show();
  } else {
    toggle.setText("+");
    group.hide();
  }
});

/* initialize */
msg.sub("initialize", () => {
  msg.pub("highlight-catalog-view", state.catalogView);
  msg.pub("highlight-content-view", state.contentView);
  msg.pub("highlight-book-button", state.currCatalog);
});

/* exports */
module.exports = true;
