"use strict";

/* requires */
const utils = Mary.require("Utils");
const msg = Mary.require("Msg")("ErrorCheck");
const keyboard = Mary.require("Keyboard");
const dom = Mary.require("Dom");

/* variables */
let unkeys = [];

/* subscriptions */
msg.sub("keyRoulette", ({entries, copies}) => {
  let start = 0, stop = 5;
  const allHidden = () => {
    return !entries.array()
      .map(n => dom(n).isShown())
      .includes(true);
  };
  const roulette = () => {
    if (entries == null) return;
    entries.hide();
    entries.show(utils.range(start, stop));
    copies.eq(start).focus();
    start += 6;
    stop += 6;
    if (allHidden()) {
      start = 0;
      stop = 5;
      entries.show();
    }
  };
  unkeys.push(keyboard.shortcut(
    "Control", "PageDown", roulette
  ));
});

msg.sub("keyCantilJump", ({get, sources, copies}) => {
  const cantillation =
    new RegExp("(֑|֒|֓|֔|֕|֖|֗|֘|֙|֚|֛|֜|֝|֞|֟|֠|֡|֢|֣|֤|֥|֦|֧|֨|֩|֪|֫|֬|֭|֮|ֽ|ׄ|ׅ|ﬞ)");
  const cantilJump = (event) => {
    if (get("subversion") !== "Te'amim") return;
    const index = copies.array().indexOf(document.activeElement);
    if (index === -1) return;
    const copy = copies[index];
    const source = sources[index];
    const start = copy.selectionStart + 1;
    const str = source.value.slice(start);
    const match = str.match(cantillation);
    if (!match) return;
    const goto = source.value.indexOf(match[0], start);
    copy.setSelectionRange(goto, goto);
    event.preventDefault();
  };
  unkeys.push(keyboard.shortcut(
    null, "ArrowLeft", cantilJump, {preventDefault: false}
  ));
});

msg.sub("killKeys", () => {
  for (let unkey of unkeys) unkey();
  unkeys = [];
});

/* exports */
module.exports = true;
