"use strict";

/* requires */
const fs = require("fs");
const {save: savePath} = Mary.require("Path");

/* constants */
const path = `${savePath}/library.json`;

/* variables */
let state;

/* initialize */
if (!fs.existsSync(path)) {
  state = 
    { openBook: null
    , currCatalog: "id"
    , menuView: "Catalog"
    , openedBooks: []
    };
} else {
  state = JSON.parse(fs.readFileSync(path, "utf8"));
}

/* methods */
state.store = (book, coordinates) => {
  const bookState = state[book.title] || {};
  bookState.page = book.page;
  Object.assign(bookState, coordinates);
  state[book.title] = bookState;
};

state.load = book => {
  const bookState = state[book.title] || {};
  book.page = bookState.page || 1;
  return bookState;
};

state.save = () => {
  const data = JSON.stringify(state, null, "  ");
  fs.writeFileSync(path, data, "utf8");
};

/* exports */
module.exports = state;
