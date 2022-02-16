"use strict";

/* requires */
const utils = Mary.require("Utils")
const msg = Mary.require("Msg")("Library");
const dom = Mary.require("Dom");
const HTML = Mary.require("HTML");
const font = Mary.require("Font");

/* constants */
const main = {};

/* functions */
const genMenu = () => {
  main.menu = dom(HTML.div)
    .appendTo(document.body)
    .class("Menu");
  main.menuLists = dom(HTML.div, main.menu, 1, true)
    .class("MenuLists")
    .hide();
  main.menuToggle = dom(HTML.button, main.menu, 1, true)
    .setText("<")
    .class("MenuToggle")
    .on("click", (e, {node}) => {
      msg.pub("toggle-menu", main);
    });
  main.menuViewList = dom(HTML.div, main.menuLists, 1, true)
    .class("MenuViewList");
  main.catalogList = dom(HTML.div, main.menuLists, 1, true)
    .class("CatalogList");
  main.bookList = dom(HTML.div, main.menuLists, 1, true)
    .class("BookList");
  genMenuViewButtons();
  genCatalogButtons();
  msg.pub("gen-book-buttons", genBookButtons);
};

const genMenuViewButtons = () => {
  const menuViews = ["Opened", "Catalog"];
  main.menuViewButtons = dom(HTML.button, main.menuViewList, menuViews.length, true)
    .setText(menuViews, "spread")
    .class(["MenuViewButton", font("English", {s:"16px", f:"Gentium"})])
    .on("click", (e, {node}) => {
      msg.pub("set-catalog-view", {button: dom(node), main});
      msg.pub("gen-book-buttons", genBookButtons);
    });
};

const genCatalogButtons = () => {
  const options = ["id","category","language","creator","year","pages"];
  dom(HTML.button, main.catalogList, options.length, true)
    .setText(options, "spread")
    .class(["CatalogButton", font("English", {s:"12px", f:"Charis"})])
    .on("click", (e, {node}) => {
      msg.pub("set-curr-catalog", node.textContent);
      msg.pub("gen-book-buttons", genBookButtons);
    });
};

const genBookButtons = (catalog, openedBooks) => {
  main.bookList.children().remove();
  for (let [field, list] of catalog) {
    if (openedBooks)
      list = list.filter(title => openedBooks.includes(title));
    if (list.length === 0) continue;
    dom(HTML.div, main.bookList, 1, true)
      .setText(field)
      .class(["BookField", font("English", {s:"15px", f:"Noto Serif"})]);
    const divs = dom(HTML.div, main.bookList, list.length, true)
      .class("BookDiv");
    if (openedBooks) {
      dom(HTML.button, null, list.length)
        .appendTo(divs, "spread")
        .setText("x")
        .class("CloseBookButton")
        .on("click", (e, {node}) => {
          const title = node.nextSibling.textContent;
          msg.pub("return-book", title);
          msg.pub("gen-book-buttons", genBookButtons);
        });
    }
    dom(HTML.button, null, list.length)
      .appendTo(divs, "spread")
      .setText(list, "spread")
      .class(["BookButton", font("English", {s:"12px", f:"Noto Sans"})])
      .on("click", (e, {node}) => {
        msg.pub("request-book", node.textContent);
      });
  }
};

/* subscriptions */
msg.sub("highlight-catalog-view", catalogView => {
  const buttons = main.menuViewButtons;
  msg.pub("highlight-by-text", {text: catalogView, buttons});
});

msg.sub("highlight-book-button", catalog => {
  const buttons = main.catalogList.children();
  msg.pub("highlight-by-text", {text: catalog, buttons});
});

msg.sub("highlight-open-book", title => {
  const buttons = dom(".BookButton");
  msg.pub("highlight-by-text", {text: title, buttons});
});

msg.sub("close-canvas", () => {
  msg.pub("default-menu", main);
});

/* initialize */
msg.sub("initialize-view", () => {
  genMenu();
});

/* exports */
module.exports = true;
