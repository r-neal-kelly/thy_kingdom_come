"use strict";

/* requires */
const fs = require("fs");
const utils = Mary.require("Utils");
const msg = Mary.require("Msg")("Library");
const {save: savePath} = Mary.require("Path");

/* constants */
const lbPath = `${savePath}/LibraryBookmarks`;
const regexNum = /\d+\.?\d*/;
const sort = {};

/* initialize */
if (!fs.existsSync(lbPath)) fs.mkdirSync(lbPath);

/* functions */
sort.folders = ({name:a}, {name:b}) => {
  if (regexNum.test(a) && regexNum.test(b)) {
    a = a.match(regexNum)[0];
    b = b.match(regexNum)[0];
    return Number(a) - Number(b);
  } else {
    return a.charCodeAt(0) - b.charCodeAt(0);
  }
};

sort.files = (a, b) => {
  const pageDiff = a.page - b.page;
  if (pageDiff !== 0) {
    return pageDiff;
  } else {
    return (b.x + b.y) - (a.x + a.y);
  }
};

const loadTOP = PATH => {
  const dir = (fs.existsSync(PATH)) ?
    JSON.parse(fs.readFileSync(PATH)) :
    {path: "root", name: "root", folders: [], files: []};
  Object.defineProperty(dir, "../", {value: null, writable: true});
  linkDirs(dir);
  return dir;
};

const linkDirs = dir => {
  for (let folder of dir.folders) {
    Object.defineProperty(folder, "../", {value: dir, writable: true});
    linkDirs(folder);
  }
};

const updatePaths = (path, dir) => {
  dir.path = `${path}/${dir.name}`;
  for (let folder of dir.folders) {
    updatePaths(dir.path, folder);
  }
};

/* contructors */
const Bookmarks = title => {
  const PATH = `${lbPath}/${title}.json`;
  const DIR = Symbol();
  const TOP = Symbol();
  const bookmarks = {};
  bookmarks[TOP] = loadTOP(PATH);
  bookmarks[DIR] = bookmarks[TOP];
  bookmarks.gotoFolder = gotoFolder(DIR);
  bookmarks.gotoFile = gotoFile(DIR);
  bookmarks.addFolder = addFolder(DIR);
  bookmarks.addFile = addFile(DIR);
  bookmarks.del = del(DIR);
  bookmarks.move = move(DIR);
  bookmarks.load = load(DIR);
  bookmarks.save = save(TOP, PATH);
  return bookmarks;
};

/* methods */
const gotoFolder = DIR => function (index) {
  let folder = this[DIR].folders[index] || this[DIR]["../"];
  if (!folder) return;
  this[DIR] = folder;
  this.load();
};

const gotoFile = DIR => function (index) {
  const bookmark = this[DIR].files[index];
  if (!bookmark) return;
  msg.pub("set-coordinates", bookmark);
  msg.pub("goto-page", bookmark.page);
};

const addFolder = DIR => function (name) {
  if (!name) return;
  const path = `${this[DIR].path}/${name}`;
  const folder = {path, name, folders: [], files: []};
  Object.defineProperty(folder, "../", {value: this[DIR], writable: true});
  this[DIR].folders.push(folder);
  this[DIR].folders = this[DIR].folders.sort(sort.folders);
  this.load();
};

const addFile = DIR => function (mark) {
  // mark has x, y, z, r, page, name
  if (!mark.name) return;
  this[DIR].files.push(mark);
  this[DIR].files = this[DIR].files.sort(sort.files);
  this.load();
};

const del = DIR => function (items) {
  if (!confirm("Delete file(s)?")) return;
  if (items == null) {
    const oldDir = this[DIR];
    this[DIR] = oldDir["../"];
    const index = this[DIR].folders.indexOf(oldDir);
    this[DIR].folders.splice(index, 1);
    return this.load();
  }
  for (let {type, index} of items) {
    if (type === "folders")
      this[DIR].folders.splice(index, 1, null);
    if (type === "files")
      this[DIR].files.splice(index, 1, null);
  }
  for (let type of ["folders", "files"]) {
    this[DIR][type] = this[DIR][type].filter(elem => {
      return elem != null;
    });
  }
  this.load();
};

const move = DIR => function ({to, items}) {
  // pass an array of these objects, do for loop, load after.
  const folder = (to != null) ?
    this[DIR].folders[to] : this[DIR]["../"];
  if (!folder) return;
  for (let {type, index} of items) {
    const item = this[DIR][type][index];
    folder[type].push(item);
    if (type === "folders") {
      item["../"] = folder;
      updatePaths(folder.path, item);
    }
    this[DIR][type].splice(index, 1, null);
  }
  for (let type of ["folders", "files"]) {
    this[DIR][type] = this[DIR][type].filter(elem => {
      return elem != null;
    });
    folder[type].sort(sort[type]);
  }
  this.load();
};

const load = DIR => function () {
  let folders = this[DIR].folders.map(x => x.name);
  let files = this[DIR].files.map(x => x.name);
  let dirName = this[DIR].path;
  msg.pub("load-bookmarks", {folders, files, dirName});
};

const save = (TOP, PATH) => function () {
  const dir = this[TOP];
  if (dir.files.length === 0 && dir.folders.length === 0) {
    if (fs.existsSync(PATH)) fs.unlinkSync(PATH);
  } else {
    fs.writeFileSync(PATH, JSON.stringify(dir, null, "  "));
  }
};

/* exports */
module.exports = Bookmarks;
