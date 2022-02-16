"use strict";

/* requires */
const utils = Mary.require("Utils");
const dom = Mary.require("Dom");

/* constants */
const keyboard = utils.newObj();
const win = dom(window);

/* shortcuts */
keyboard.shortcut = (mods, keys, func, options = {}) => {
  const {repeat = false, preventDefault = true} = options;
  const listener = e => {
    let modMap, modified, keyMap, keyed;
    if (!repeat && e.repeat) {
      return;
    }
    if (mods) {
      mods = [].concat(mods);
      modMap = mods.map(mod => e.getModifierState(mod))
      modified = !modMap.includes(false);
    } else {
      modified = true;
    }
    keys = [].concat(keys); // not sure if this is working the way I want
    keyMap = keys.map(key => e.key === key);
    keyed = !keyMap.includes(false);
    if (modified && keyed) {
      if (preventDefault) e.preventDefault();
      func(e);
    }
  };
  const name = func.name;
  func = func.bind({mods, keys});
  win.on("keydown", listener, null, {names:name});
  return () => win.off(name);
};

keyboard.shortReplace = (mods, keys, replace) => {
  keyboard.shortcut(mods, keys, () => replaceSelected(replace));
};

const replaceSelected = (replace = "") => {
  // accepts either a str of func
  const elem = document.activeElement;
  const selc = document.getSelection();
  const orig = selc.toString();
  if (!orig) return;
  if (utils.isFunction(replace)) replace = replace(orig);
  if (elem.setRangeText) {
    elem.setRangeText(replace);
  } else {
    let range = selc.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(replace));
  }
};

/* typing */
const dict = utils.newObj();
const typeText = str => {
  const elem = document.activeElement;
  if (elem.setRangeText) {
    elem.setRangeText(str);
    let loc = elem.textLength;
    elem.setSelectionRange(loc, loc);
  }
};
keyboard.language = "English";
win.on("keydown", function KeyLang (e) {
  const d = dict[keyboard.language];
  if (!d) return;
  let key;
  if (e.ctrlKey && e.altKey && d["Ctrl+Alt"]) {
    key = d["Ctrl+Alt"][e.key];
  } else if (e.ctrlKey && d["Ctrl"]) {
    key = d["Ctrl"][e.key];
  } else if (e.altKey && d["Alt"]) {
    key = d["Alt"][e.key];
  } else {
    key = d[e.key];
  }
  if (key) {
    utils.freezeEvent(e);
    typeText(key);
  }
});

/* Hebrew */
dict["Hebrew"] = 
  { "t":"א"
  , "c":"ב"
  , "d":"ג"
  , "s":"ד"
  , "v":"ה"
  , "u":"ו"
  , "z":"ז"
  , "j":"ח"
  , "y":"ט"
  , "h":"י"
  , "f":"כ"
  , "k":"ל"
  , "n":"מ"
  , "b":"נ"
  , "x":"ס"
  , "g":"ע"
  , "p":"פ"
  , "m":"צ"
  , "e":"ק"
  , "r":"ר"
  , "a":"ש"
  , ",":"ת"
  , "l":"ך"
  , "o":"ם"
  , "i":"ן"
  , ";":"ף"
  , ".":"ץ"
  , "w":"־"
  , "q":"׀"
  , ":":"׃"
  , "'":"׳"
  , '"':"״"
  , "B":"׆"
  , "$":"₪"
  , "0":"֯"
  };

dict["Hebrew"]["Alt"] = 
  { "t":" ב"
  };

dict["Hebrew"]["Ctrl"] = 
  { "t":"test"
  };

/* exports */
module.exports = keyboard;
