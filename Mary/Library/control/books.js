"use strict";

/* requires */
const utils = Mary.require("Utils");
const msg = Mary.require("Msg")("Library");

/* modules */
const {checkOut, state} = require("../model/model");

/* constants */
const loanedBooks = new Map();

/* variables */
let openBook;

/* functions */
const addTitle = title => {
  delTitle(title);
  state.openedBooks.push(title);
};

const delTitle = title => {
  let titles = state.openedBooks.join("␀");
  let escaped = utils.escapeRegex(title);
  let regex = new RegExp(`${escaped}(␀)?`, "g");
  titles = titles.replace(regex, "");
  state.openedBooks = titles.split(/␀+/).filter(t => !!t);
};

/* subscriptions */
msg.sub("loan-book", ({img, title}) => {
  if (loanedBooks.has(title)) {
    openBook = loanedBooks.get(title);
  } else {
    openBook = checkOut(img, title);
    loanedBooks.set(title, openBook);
  }
  state.openBook = title;
  addTitle(title);
  msg.pub("set-coordinates", state.load(openBook));
  openBook.open();
  msg.pub("gen-content-buttons");
  msg.pub("turn-page", openBook.page);
  msg.pub("highlight-open-book", title);
});

msg.sub("return-book", title => {
  openBook.bookmarks.save();
  loanedBooks.delete(title);
  delTitle(title);
  const last = utils.array.last(state.openedBooks);
  state.openBook = last || null;
  if (last) {
    msg.pub("request-book", last);
  } else {
    msg.pub("close-canvas");
  }
});

msg.sub("bookmark", coordinates => {
  if (openBook) state.store(openBook, coordinates);
});

msg.sub("leave-library", coordinates => {
  openBook.bookmarks.save();
  state.save();
});

msg.sub("previous-page", () => {
  if (!openBook) return;
  openBook.previous();
  msg.pub("turn-page", openBook.page);
});

msg.sub("next-page", () => {
  if (!openBook) return;
  openBook.next();
  msg.pub("turn-page", openBook.page);
});

msg.sub("goto-page", page => {
  if (!openBook) return;
  openBook.goto(page);
  msg.pub("turn-page", openBook.page);
});

msg.sub("toggle-alt-page", () => {
  if (!openBook) return;
  openBook.toggleAlt();
});

msg.sub("gen-content-buttons", () => {
  // if we separate contents and bookmarks from openBook we can move this to nav.
  if (state.contentView === "Contents") {
    msg.pub("load-content", openBook.content);
  } else {
    openBook.bookmarks.load();
  }
});

msg.sub("goto-folder", index => {
  openBook.bookmarks.gotoFolder(index);
});

msg.sub("goto-bookmark", index => {
  openBook.bookmarks.gotoFile(index);
});

msg.sub("add-folder", name => {
  openBook.bookmarks.addFolder(name);
});

msg.sub("add-bookmark", info => {
  info.page = openBook.page;
  openBook.bookmarks.addFile(info);
});

msg.sub("del", data => {
  openBook.bookmarks.del(data);
});

msg.sub("move", data => {
  openBook.bookmarks.move(data);
});

/* initialize */
msg.sub("initialize", () => {
  msg.pub("initialize-view");
  if (state.openBook) {
    msg.pub("request-book", state.openBook);
  } else {
    msg.pub("close-canvas");
  }
});

/* exports */
module.exports = true;
