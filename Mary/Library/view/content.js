"use strict";

/* requires */
const utils = Mary.require("Utils")
const msg = Mary.require("Msg")("Library");
const msgLasso = Mary.require("Msg")("Lasso");
const dom = Mary.require("Dom");
const HTML = Mary.require("HTML");
const font = Mary.require("Font");

/* constants */
const main = {};

/* functions */
const genContent = () => {
  main.content = dom(HTML.div)
    .appendTo(document.body)
    .class("Content");
  main.contentToggle = dom(HTML.button, main.content, 1, true)
    .setText(">")
    .class("ContentToggle")
    .on("click", (e, {node}) => {
      msg.pub("toggle-content", main);
    });
  main.contentLists = dom(HTML.div, main.content, 1, true)
    .class("ContentLists")
    .hide();
  main.menuViewList = dom(HTML.div, main.contentLists, 1, true)
    .class("MenuViewList");
  main.btnList = dom(HTML.div, main.contentLists, 1, true)
    .class("LinkList");
  genMenuViewButtons();
};

const genMenuViewButtons = () => {
  const menuViews = ["Contents", "Bookmarks"];
  main.menuViewButtons = dom(HTML.button, main.menuViewList, menuViews.length, true)
    .setText(menuViews, "spread")
    .class(["MenuViewButton", font("English", {s:"16px", f:"Gentium"})])
    .on("click", (e, {node}) => {
      msg.pub("set-content-view", {button: dom(node), main});
      msg.pub("gen-content-buttons");
    });
};

const genContents = content => {
  const headFont = font("English", {s:"15px", f:"Noto Serif"});
  const regFont = font("English", {s:"12px", f:"Noto Sans"});
  main.btnList.children().remove();
  if (!content) {
    dom(HTML.span, main.btnList, 1, true)
      .setText("Content unavailable.")
      .class(headFont);
    return;
  }
  for (let [link, page, list] of content) {
    const head = dom(HTML.div, main.btnList, 1, true)
      .setText(link)
      .class(["LinkField", headFont]);
    head.first.LIBRARY_LINK_PAGE = page;
    if (!list) continue;
    dom(HTML.button, head, 1, true)
      .setText("+")
      .class("OpenLinkGroupButton");
    const group = dom(HTML.div, main.btnList, 1, true)
      .class("LinkGroup")
      .hide();
    for (let [link, page] of list) {
      const sub = dom(HTML.button, group, 1, true)
        .setText(link)
        .class(["LinkButton", regFont]);
      sub.first.LIBRARY_LINK_PAGE = page;
    }
  }
  dom(".LinkField, .LinkButton").on("click", (e, {node}) => {
    msg.pub("goto-page", node.LIBRARY_LINK_PAGE);
  });
  dom(".OpenLinkGroupButton").on("click", (e, {node, index}) => {
    event.stopPropagation();
    msg.pub("toggle-link-group", {toggle: dom(node), group: dom(".LinkGroup").eq(index)});
  });
};

const genBookmarks = ({folders, files, dirName}) => {
  const addFolder = name => {
    if (!name) return;
    msg.pub("add-folder", name);
  };
  const addMark = name => {
    if (!name) return;
    msg.pub("request-coordinates", {name});
  };

  const blocks = [["add folder", addFolder], ["add bookmark", addMark]];
  main.btnList.children().remove();
  for (let [placeholder, handler] of blocks) {
    const div = dom(HTML.div, main.btnList, 1, true)
      .class("AddDiv");
    dom(HTML.input, div, 1, true)
      .class("AddInput")
      .placeholder(placeholder)
      .on("keydown", (e, {node}) => {
        if (e.key === "Enter") handler(node.value);
        node.focus();
      });
    dom(HTML.button, div, 1, true)
      .class("AddButton")
      .setText("+")
      .on("click", (e, {node}) => {
        handler(node.previousSibling.value);
      });
  }

  dom(HTML.div, main.btnList, 1, true)
    .setText(dirName);

  const parentDir = ["↰ ../"];
  folders = folders.map(f => `↳ ${f}`);
  for (let strs of [parentDir, folders, files]) {

    // init
    if (strs === parentDir && dirName === "root") continue;
    const div = dom(HTML.div, main.btnList, 1, true)
      .class("BookmarkBtnDiv");
    const btns = dom(HTML.button, div, strs.length, true)
      .setText(strs, "spread")
      .class(["BookmarkButton", font("English", {s:"12px", f:"Noto Sans"})])
      .attr("draggable=true");
    if (strs !== parentDir) {
      btns.attr("data-lasso=SelectedHighlight");
    }

    // shortcuts
    if (strs === folders) main.bmFolders = btns;
    if (strs === files) main.bmFiles = btns;

    // clicks
    if (strs === parentDir) {
      btns.on("click", e => {
        if (e.ctrlKey) return;
        msg.pub("goto-folder", null);
      });
    }
    if (strs === folders) {
      btns.on("click", (e, {index}) => {
        if (e.ctrlKey) return;
        msg.pub("goto-folder", index);
      });
    }
    if (strs === files) {
      btns.on("click", (e, {index}) => {
        if (e.ctrlKey) return;
        msg.pub("goto-bookmark", index);
      });
    }

    // context menus
    if (strs === parentDir) {
      btns.on("contextmenu", ContextMenu(({menu, kill}) => {
        dom(HTML.button, menu, 1, true)
          .class("BookButton")
          .setText("delete directory")
          .on("click", () => {
            msg.pub("del", null);
            kill();
          });
      }));
    }
    if (strs === folders || strs === files) {
      btns.on("contextmenu", ContextMenu(({menu, kill}) => {
        dom(HTML.button, menu, 1, true)
          .class("BookButton")
          .setText("delete file(s)")
          .on("click", () => {
            const items = getSelection();
            msg.pub("del", items);
            kill();
          });
      }));
    }

    // drag and drop
    if (strs === parentDir || strs === folders) {
      btns.on("dragover", (e, {node}) => {
        e.preventDefault();
        dom(node).class("Highlight");
      });
      btns.on("dragleave", (e, {node}) => {
        dom(node).removeClass("Highlight");
      });
    }
    if (strs === parentDir) {
      btns.on("drop", (e, {node, index}) => {
        dom(node).removeClass("Highlight");
        const items = getSelection();
        msg.pub("move", {to: null, items});
      });
    }
    if (strs === folders) {
      btns.on("drop", (e, {node, index}) => {
        node = dom(node);
        node.removeClass("Highlight");
        if (node.hasClass("SelectedHighlight")) return;
        const items = getSelection();
        msg.pub("move", {to: index, items});
      });
    }
    if (strs === folders || strs === files) {
      btns.on("dragstart", (e, {node}) => {
        dom(node).class("SelectedHighlight");
      });
    }

  }
};

const ContextMenu = contents => (e, {node}) => {
  if (contents == null) return;
  const kill = () => {
    node.removeClass("SelectedHighlight");
    dom(window).off(handleContextMenu);
    menu.remove();
  };
  const handleContextMenu = (e) => {
    const targets = Array.from(menu.first.childNodes);
    targets.push(menu.first);
    if (!targets.includes(e.target)) kill();
  };
  const menu = dom(HTML.div, document.body, 1, true)
    .class("ContextMenu")
    .style([`left: ${e.x}px`,`top: ${e.y}px`]);
  node = dom(node).class("SelectedHighlight");
  contents({menu, kill});
  dom(window).on("mousedown", handleContextMenu);
  e.preventDefault();
};

const getSelection = () => {
  return dom(".SelectedHighlight").array().map(node => {
    let type, index;
    if (main.bmFolders.has(node)) {
      type = "folders";
      index = main.bmFolders.indexOf(node);
    } else {
      type = "files";
      index = main.bmFiles.indexOf(node);
    }
    return {type, index};
  });
};

/* subscriptions */
msg.sub("highlight-content-view", contentView => {
  const buttons = main.menuViewButtons;
  msg.pub("highlight-by-text", {text: contentView, buttons});
});

msg.sub("load-content", content => {
  genContents(content);
});

msg.sub("load-bookmarks", dir => {
  genBookmarks(dir);
});

msg.sub("turn-page", page => {
  main.content.show();
});

msg.sub("close-canvas", () => {
  main.content.hide();
});

/* initialize */
msg.sub("initialize-view", () => {
  genContent();
});

/* exports */
module.exports = true;
