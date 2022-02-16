"use strict";

/* requires */
const utils = Mary.require("Utils");

/* components */
const regex = require("./regex");

/* constructor */
const Refresh = dict => {
  return dict.refresh = refresh(dict);
};

/* listeners */
const refresh = dict => (event, {node}) => {
  if (!node.textContent) return node.innerHTML = "";
  const selc = document.getSelection();
  let currNode = selc.anchorNode || node.firstChild;
  let currOffset = selc.anchorOffset;

  let children = Array.from(node.childNodes);
  let currNodeIndex = children.indexOf(currNode);
  if (currNodeIndex === -1) {
    currNodeIndex = children.indexOf(currNode.parentNode);
  }
  let totalIndex = 0;
  for (let [index, child] of children.entries()) {
    if (index === currNodeIndex) {
      totalIndex += currOffset;
      break;
    } else {
      totalIndex += child.textContent.length;
    }
  }

  node.innerHTML = dict.check(node.textContent);

  children = Array.from(node.childNodes);
  let newNode, newOffset;
  let charIndex = 0;
  for (let child of children) {
    for (let [index, char] of [...child.textContent].entries()) {
      charIndex += 1;
      if (charIndex === totalIndex) {
        newNode = (child.nodeName === "SPAN") ?
          child.childNodes[0] : child;
        newOffset = index + 1;
        break;
      }
    }
  }

  if (!newNode && !newOffset) {
    newNode = node;
    newOffset = 0;
  }

  selc.collapse(newNode, newOffset);
};

/* exports */
module.exports = Refresh;
