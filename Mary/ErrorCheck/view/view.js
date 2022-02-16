"use strict";

/* requires */
const utils = Mary.require("Utils");
const msg = Mary.require("Msg")("ErrorCheck");
const spellCheck = Mary.require("SpellCheck");
const HTML = Mary.require("HTML");
const info = Mary.require("Info");
const filter = Mary.require("Filter");
const dom = Mary.require("Dom");
const font = Mary.require("Font");
const data = Mary.require("Data").Scripture;

/* components */
const css = require("./css");

/* constants */
const μ = str => (event, refs) => msg.pub(str, {main, event, refs});

/* variables */
let main;
const setDefault = () => {
  main = utils.newObj();
  main.sourceVisibility = true;
  main.get = str => {
    if (/^version$/i.test(str)) return main.selects.value(null, 0);
    if (/^book$/i.test(str)) return main.selects.value(null, 1);
    if (/^chapter$/i.test(str)) return main.selects.value(null, 2);
    if (/^subversion$/i.test(str)) return main.subVersion.value();
  };
};

/* generation */
const genTop = host => {
  main.Top = dom("<div id='ErrorCheck'></div>")
    .appendTo(host || document.body);
};

const genSections = () => {
  ["Load", "Source", "Check", "More", "Frame", "Change"].forEach(s => {
    main[s] = dom(HTML.div, main.Top, 1, true).hide();
  });
  main.Load.show();
};

const genLoad = () => {
  main.selects = dom(HTML.select, main.Load, 3, true)
    .class("GeneralSelect")
    .option(info.versionNames, 0)
    .on("change", [setBooks, setChapters], "spread");
  dom(HTML.button, main.Load, 3, true)
    .class("GeneralButton")
    .setText(["Load", "Close", "Save"], "spread")
    .on("click", [μ("load"), μ("close"), μ("save")], "spread");
  setBooks();
  //setChapters();
};

const genSourceLoad = () => {
  const parsers =
    [ "KingdomCome"
    , "KJVOnline"
    , "TanachUS"
    , "BibliaSacra"
    , "eBibleBrenton"
    , "GreekWikiSrc"
    , "AcademicBible"
    ];
  dom(HTML.button, main.Source, 1, true)
    .class("GeneralButton")
    .setText("Load Src")
    .on("click", μ("loadSource"));
  main.sourceParser = dom(HTML.select, main.Source, 1, true)
    .class("GeneralSelect")
    .option(parsers);
  main.sourceInput = dom(HTML.textarea, main.Source, 1, true)
    .class("SourceInput")
    .placeholder("input source");
};

const genCheck = () => {
  dom(HTML.button, main.Check, 2, true)
    .class("GeneralButton")
    .setText(["Check", "Clear"], "spread")
    .on("click", [μ("check"), clearChecks], "spread");
  main.subVersion = dom(HTML.select, main.Check, 1, true)
    .class("GeneralSelect")
    .option(["Standard"]);
};

const genMore = () => {
  const hide = () => main.entries.hide();
  const show = () => main.entries.show();
  dom(HTML.button, main.More, 5, true)
    .class("GeneralButton")
    .setText(["Show All", "Hide All", "Sub-Assist", "Misspells", "Asterisks"], "spread")
    .on("click", [show, hide, μ("subAssist"), misspells, asterisks], "spread");
};

const genChange = () => {
  dom(HTML.button, main.Change, 1, true)
    .class("GeneralButton")
    .setText(["Toggle Src"], "spread")
    .on("click", [toggleSources], "spread");
  dom(HTML.button, main.Change, 2, true)
    .class("SmallButton")
    .setText(["-", "+"], "spread")
    .on("click", [μ("trash"), μ("add")], "spread");
  main.newName = dom(HTML.input, main.Change, 1, true)
    .class("GeneralInput")
    .placeholder("new entry");
};

/* main.Load */
const setBooks = () => {
  const version = main.get("version");
  const oldBook = main.get("book");
  const books = utils.map.keys(info.getVersion(version));
  main.selects.eq(1).option(books);
  if (books.includes(oldBook))
    main.selects.eq(1).setOption(oldBook);
  setChapters();
};

const setChapters = () => {
  const version = main.get("version");
  const book = main.get("book");
  const oldChapter = main.get("chapter");
  const chapters = info.getVersion(version).get(book).chaps();
  const select = main.selects.eq(2);
  select.option(chapters);
  if (chapters.includes(Number(oldChapter)))
    select.setOption(oldChapter);
  select.find("option").wrapEach(option => {
    const chapter = option.getText();
    if (data(version, book, chapter).check())
      option.class("ChapterExists");
  });
};

/* main.Check */
const clearChecks = () => {
  if (main.entries == null) return alert("Load a chapter.");
  main.checks.setText("");
};

/* main.More */
const misspells = () => {
  const indexes = [];
  for (let [i, v] of main.copies.array().entries()) {
    if (spellCheck.hasError(v)) indexes.push(i);
  }
  main.entries.hide();
  main.entries.show(indexes);
};

const asterisks = () => {
  const indexes = [];
  for (let [i, v] of main.copies.array().entries()) {
    if (/\*/.test(v.textContent)) indexes.push(i);
  }
  main.entries.hide();
  main.entries.show(indexes);
};

/* main.Frame */
const toggleEntry = (e, {index}) => main.entries.toggle(index);

const setFont = () => {
  const entries = dom([main.sources, main.copies, main.subAssists]);
  const lang = info.getLanguage(main.get("version"));
  const fontClass = (lang === "English") ?
    font(lang, {f:"Gentium"}) : font(lang);
  entries.class(fontClass);
};

const setSpellCheck = () => {
  const version = main.get("version");
  spellCheck.set(version);
  spellCheck.register(main.copies);
};

/* main.Change */
const toggleSources = () => {
  if (main.sourceVisibility) {
    main.sourceVisibility = false;
    main.sources.hide();
    main.subAssists.hide();
  } else {
    main.sourceVisibility = true;
    main.sources.show();
    main.subAssists.hide();
  }
};

/* subscriptions */
msg.sub("genEntries", ({size, srcKeys, srcVals, cpyVals}) => {
  main.Frame.children().remove();
  main.names = dom(HTML.button, main.Frame, size, true)
    .class("EntryName")
    .setText(srcKeys, "spread")
    .on("click", toggleEntry);
  main.entries = dom(HTML.div, main.Frame, size, true)
    .class("Entry")
    .hide();
  main.ids = dom(HTML.button, main.entries, size, "spread")
    .class("EntryID")
    .setText(srcKeys, "spread")
    .on("click", toggleEntry);
  main.sources = dom(HTML.textarea, main.entries, size, "spread")
    .class("source")
    .setText(srcVals, "spread")
    .placeholder("source");
  main.subAssists = dom(HTML.div, main.entries, size, "spread")
    .class("SubAssist")
    .hide();
  main.copies = dom(HTML.editDiv, main.entries, size, "spread")
    .class("copy")
    .setText(cpyVals, "spread")
    .attr("data-placeholder='copy'");
  main.checks = dom(HTML.div, main.entries, size, "spread")
    .class("check");
  if (!main.sourceVisibility) main.sources.hide();
  setFont();
  setSpellCheck();
});

msg.sub("setChecks", ({checks, wrongs}) => {
  checks = checks.map(([source, copy, error]) => {
    return `${source}<br><br>${copy}<br><br>${error}`;
  });
  main.checks.setHTML(checks, "spread");
  main.entries.hide();
  main.entries.show(wrongs);
});

msg.sub("setAssists", ({sources}) => {
  const version = main.get("version");
  const subVersion = main.get("subversion");
  for (let [i, v] of sources.entries()) {
    v = filter(version, subVersion, v);
    main.subAssists.setText(v, i);
  }
});

msg.sub("setChapters", setChapters);

msg.sub("initialize", ({host}) => {
  if (main) return msg.pub("destroy");
  setDefault();
  genTop(host);
  genSections();
  genLoad();
  genSourceLoad();
  genCheck();
  genMore();
  genChange();
});

msg.sub("destroy", () => {
  main.Top.remove();
  main = null;
  msg.pub("killModel");
  msg.pub("killKeys");
});

/* exports */
module.exports = true;
