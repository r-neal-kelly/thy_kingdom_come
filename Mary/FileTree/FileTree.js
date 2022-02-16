"use strict";

/* requires */
const {utils, regex} = Mary;
const Recycler = require("./Recycler");

/* constants */
const κ = Symbol("Current");
const π = Symbol("Paths");
const ρ = Symbol("Recycle");
const proto = utils.newObj();
const endsWithNum = /\d+$/;
const doubleSolidus = /\/+/g;
const endingSolidus = /\/$/;
const pathDelimiters = /[/:]/;
const nameHasPathDelimiter = new Error("Cannot use '/', or ':' in names.");

/* functions */
const normalizePath = function (path) {
  return path.replace(doubleSolidus, "/").replace(endingSolidus, "");
};

const resolveNewName = function (namesInUse = {}, newName = "") {
  if (pathDelimiters.test(newName))
    throw nameHasPathDelimiter;
  while (namesInUse[newName]) {
    if (endsWithNum.test(newName)) {
      newName = newName.replace(
        endsWithNum, n => `${Number(n) + 1}`
      );
    } else {
      newName = `${newName} 1`;
    }
  }
  return newName;
};

const resolveNewFolderName = function (parent, folderName) {
  return resolveNewName(parent.folders, folderName);
};

const resolveNewFileName = function (parent, fileName) {
  return resolveNewName(parent.files, fileName);
};

const resolveRelation = function (fileTree = {}, itemPath = "") {
  const path = fileTree.resolvePath(itemPath);
  if (!itemPath) return {parentPath: path, childName: ""};
  const pathList = path.split("/");
  const childName = pathList.pop();
  const parentPath = pathList.join("/");
  return {parentPath, childName};
};

const openFolderHandle = function (fileTree = {}, folderPath = "", autoCreate = false) {
  folderPath = fileTree.resolvePath(folderPath);
  if (autoCreate && !fileTree.hasFolder(folderPath))
    fileTree.newFolder(folderPath);
  return fileTree[π][folderPath];
};

const openFileHandle = function (fileTree = {}, filePath = "") {
  const {parentPath, childName} = resolveRelation(fileTree, filePath);
  if (!fileTree[π][parentPath]) return;
  return fileTree[π][parentPath].files[childName];
};

const modifyFolder = function (folderHandle, info = {}) {
  Object.assign(folderHandle, info);
  const parentHandle = folderHandle.home;
  parentHandle.files[folderHandle.name] = folderHandle;
  relinkFolder(parentHandle, folderHandle);
  updateModified(parentHandle, folderHandle);
};

const modifyFile = function (fileHandle, info = {}) {
  Object.assign(fileHandle, info);
  const parentHandle = fileHandle.home;
  parentHandle.files[fileHandle.name] = fileHandle;
  fileHandle.path = `${parentHandle.path}/${fileHandle.name}`;
  updateModified(parentHandle, fileHandle);
};

const unlinkFolder = function (folder) {
  const fileTree = folder["/"].home;
  delete fileTree[π][folder.path];
  for (let child of Object.values(folder.folders)) {
    unlinkFolder(child);
  }
};

const relinkFolder = function (parent, folder) {
  const fileTree = parent["/"].home;
  folder.path = `${parent.path}/${folder.name}`;
  fileTree[π][folder.path] = folder;
  for (let file of Object.values(folder.files)) {
    file.path = `${folder.path}/${file.name}`;
  }
  for (let child of Object.values(folder.folders)) {
    relinkFolder(folder, child);
  }
};

const updateModified = function (parent, child) {
  const modified = new Date();
  while (parent) {
    parent.modified = modified;
    parent = parent["../"];
  }
  child.modified = modified;
};

const newRootFolder = function (fileTree = {}, rootName = "") {
  if (pathDelimiters.test(rootName)) throw nameHasPathDelimiter;
  const root = utils.newObj();
  rootName = `${rootName}:`;
  Object.defineProperties(root,
    { "/":        { value: root }
    , "./":       { value: root }
    , "../":      { value: null }
    , "name":     { value: rootName, writable: true, enumerable: true }
    , "path":     { value: rootName, writable: true, enumerable: true }
    , "home":     { value: fileTree }
    , "created":  { value: new Date(), enumerable: true }
    , "modified": { value: new Date(), writable: true, enumerable: true }
    , "folders":  { value: utils.newObj(), enumerable: true }
    , "files":    { value: utils.newObj(), enumerable: true }
    , "type":     { value: "root" }
    }
  );
  fileTree[π][rootName] = root;
  return root;
};

const newChildFolder = function (parentPath = "", folderName = "") {
  if (!parentPath) return;
  const parent = openFolderHandle(this, parentPath);
  const uniqueName = resolveNewFolderName(parent, folderName);
  const uniquePath = `${parentPath}/${uniqueName}`;
  const folder = utils.newObj();
  Object.defineProperties(folder,
    { "/":        { value: parent["/"] }
    , "./":       { value: folder }
    , "../":      { get: function () { return this.home } }
    , "name":     { value: uniqueName, writable: true, enumerable: true }
    , "path":     { value: uniquePath, writable: true, enumerable: true }
    , "home":     { value: parent, writable: true }
    , "created":  { value: new Date(), enumerable: true }
    , "modified": { value: new Date(), writable: true, enumerable: true }
    , "folders":  { value: utils.newObj(), enumerable: true }
    , "files":    { value: utils.newObj(), enumerable: true }
    , "type":     { value: "folder" }
    }
  );
  parent.folders[uniqueName] = folder;
  this[π][uniquePath] = folder;
  updateModified.call(this, parent, folder);
};

const newChildFile = function (parentPath = "", fileName = "", data) {
  if (!parentPath) return;
  const parent = openFolderHandle(this, parentPath);
  const uniqueName = resolveNewFileName(parent, fileName);
  const uniquePath = `${parentPath}/${uniqueName}`;
  const file = utils.newObj();
  Object.defineProperties(file,
    { "name":     { value: uniqueName, writable: true, enumerable: true }
    , "path":     { value: uniquePath, writable: true, enumerable: true }
    , "data":     { value: data, writable: true, enumerable: true }
    , "home":     { value: parent, writable: true }
    , "created":  { value: new Date(), enumerable: true }
    , "modified": { value: new Date(), writable: true, enumerable: true }
    , "type":     { value: "file" }
    }
  );
  parent.files[uniqueName] = file;
  updateModified.call(this, parent, file);
};

/* constructor */
const FileTree = (options = {}) => {
  let {rootName = "root", cacheSize, saveFile} = options;
  const fileTree = utils.newObj(proto);
  fileTree[π] = utils.newObj();
  fileTree[κ] = newRootFolder(fileTree, rootName);
  fileTree[ρ] = Recycler();
  return fileTree;
};

/* statics */
FileTree.inspectCurrent = fileTree => fileTree[κ];
FileTree.inspectPaths   = fileTree => fileTree[π];
FileTree.inspectRecycle = fileTree => fileTree[ρ];

/* methods */
proto.resolvePath = function (path = "") {
  if (path == null) return this[κ].path;
  const current = this[κ];
  while (!/:/.test(path)) {
    if (regex.path.root.test(path)) {
      path = path.replace(regex.path.root, "");
      this[κ] = this[κ]["/"];
    } else if (regex.path.current.test(path)) {
      path = path.replace(regex.path.current, "");
      this[κ] = this[κ]["./"];
    } else if (regex.path.parent.test(path)) {
      path = path.replace(regex.path.parent, "");
      this[κ] = this[κ]["../"] || this[κ];
    } else {
      path = `${this[κ].name}/${path}`;
      this[κ] = this[κ]["../"];
    }
  }
  this[κ] = current;
  return normalizePath(path);
};

proto.folder = function (folderPath = "") {
  if (this.hasFolder(folderPath)) {
    return this.openFolder(folderPath);
  } else {
    return this.newFolder(folderPath).openFolder(folderPath);
  }
};

proto.newFolder = function (folderPath = "New Folder") {
  const folders = this.resolvePath(folderPath).split("/");
  for (let [i, folderName] of folders.entries()) {
    const isNotLast = i !== (folders.length - 1);
    const path = folders.slice(0, i + 1).join("/");
    if (isNotLast && this.hasFolder(path)) continue;
    const parentPath = folders.slice(0, i).join("/");
    newChildFolder.call(this, parentPath, folderName);
  }
  return this;
};

proto.openFolder = function (folderPath = "") {
  const folderHandle = openFolderHandle(this, folderPath);
  if (!folderHandle) return this;
  this[κ] = folderHandle;
  // cache history for this[κ]
  return this;
};

proto.hasFolder = function (folderPath = "") {
  return !!openFolderHandle(this, folderPath);
};

proto.renameFolder = function (folderPath = "", newName = "", overwrite = false) {
  // crashes on renaming Root!!!
  const folderHandle = openFolderHandle(this, folderPath);
  if (!folderHandle || !newName) return this;
  const parentHandle = folderHandle.home;
  unlinkFolder(folderHandle);
  delete parentHandle.folders[folderHandle.name];
  if (!overwrite) {
    newName = resolveNewFolderName(parentHandle, newName);
  }
  modifyFolder(folderHandle, {name: newName});
  return this;
};

proto.moveFolder = function (childPath = "", newParentPath = "", overwrite = false) {
  const child = openFolderHandle(this, childPath);
  if (!child || child === child["/"]) return this;
  unlinkFolder(child); // comes first, so we can move to same path
  delete child["../"].folders[child.name];
  const newParent = openFolderHandle(this, newParentPath, true);
  if (!overwrite) {
    child.name = resolveNewFolderName(newParent, child.name);
  }
  modifyFolder(child, {home: newParent});
  return this;
};

proto.recycleFolder = function (path = "", permanent = false) {
  const folder = this[π][this.resolvePath(path)];
  if (!folder || folder === folder["/"]) return this;
  let currentIsDeleted;
  while (true) {
    currentIsDeleted = this[κ].path.match(folder.path);
    if (currentIsDeleted) this[κ] = folder["../"];
    else break;
  }
  unlinkFolder(folder);
  delete folder["../"].folders[folder.name];
  if (permanent) return this;
  this[ρ].recycle(folder);
  return this;
};

proto.restoreFolder = function (folderPath = "", overwrite = false) {
  folderPath = this.resolvePath(folderPath);
  let child;
  if (folderPath) child = this[ρ].restorePath(folderPath)
  else child = this[ρ].restoreType("folder");
  if (!child) return this;
  const {parentPath} = resolveRelation(this, folderPath);
  const parent = openFolderHandle(this, parentPath, true);
  if (!overwrite) {
    child.name = resolveNewFolderName(parent, child.name);
  }
  modifyFolder(child, {home: parent});
  return this;
};

proto.file = function (filePath = "", data) {
  if (arguments.length < 2) {
    return this.openFile(filePath);
  } else {
    return this.modifyFile(filePath, data);
  }
};

proto.newFile = function (filePath = "New File", data) {
  const {parentPath, childName} = resolveRelation(this, filePath);
  if (!this.hasFolder(parentPath)) this.newFolder(parentPath);
  newChildFile.call(this, parentPath, childName, data);
  return this;
};

proto.openFile = function (filePath = "") {
  const fileHandle = openFileHandle(this, filePath);
  if (fileHandle) return fileHandle.data;
};

proto.modifyFile = function (filePath = "", data) {
  const fileHandle = openFileHandle(this, filePath);
  if (!fileHandle) return this.newFile(filePath, data);
  modifyFile(fileHandle, {data});
  return this;
};

proto.hasFile = function (filePath = "") {
  return !!openFileHandle(this, filePath);
};

proto.renameFile = function (filePath = "", newName = "", overwrite = false) {
  const fileHandle = openFileHandle(this, filePath);
  if (!fileHandle || !newName) return this;
  const folderHandle = fileHandle.home;
  delete folderHandle.files[fileHandle.name];
  if (!overwrite) {
    newName = resolveNewFileName(folderHandle, newName);
  }
  modifyFile(fileHandle, {name: newName});
  return this;
};

proto.moveFile = function (filePath = "", movePath = "", overwrite = false) {
  const fileHandle = openFileHandle(this, filePath);
  if (!fileHandle) return this;
  delete fileHandle.home.files[fileHandle.name];
  const folderHandle = openFolderHandle(this, movePath, true);
  if (!overwrite) {
    fileHandle.name = resolveNewFileName(folderHandle, fileHandle.name);
  }
  modifyFile(fileHandle, {home: folderHandle});
  return this;
};

proto.recycleFile = function (filePath = "", permanent = false) {
  const fileHandle = openFileHandle(this, filePath);
  if (!fileHandle) return this;
  delete fileHandle.home.files[fileHandle.name];
  if (permanent) return this;
  this[ρ].recycle(fileHandle);
  return this;
};

proto.restoreFile = function (filePath = "", overwrite = false) {
  filePath = this.resolvePath(filePath);
  let fileHandle;
  if (filePath) {
    fileHandle = this[ρ].restorePath(filePath);
  } else {
    fileHandle = this[ρ].restoreType("file");
  }
  if (!fileHandle) return this;
  const {parentPath} = resolveRelation(this, filePath);
  const folderHandle = openFolderHandle(this, parentPath, true);
  if (!overwrite) {
    fileHandle.name = resolveNewFileName(folderHandle, fileHandle.name);
  }
  modifyFile(fileHandle, {home: folderHandle});
  return this;
};

proto.sortBy = function (property) {
  // will set a method with which folders' and files' getters will sort
  // by name or date.
  return this;
};

proto.undoRecycle = function () {
  // when overriding in move, or when deleting
  // save a ref in an obj that can be used to restore.
  // but only a limited amount, and auto delete on each operation
};

Object.defineProperties(proto,
  { "name":     { get: function () { return this[κ].name } }
  , "path":     { get: function () { return this[κ].path } }
  , "created":  { get: function () { return this[κ].created } }
  , "modified": { get: function () { return this[κ].modified } }
  , "folders":  { get: function () { return Object.keys(this[κ].folders) } } // add sorters
  , "files":    { get: function () { return Object.keys(this[κ].files) } }
  , "recycle":  { get: function () { return this[ρ].cache } }
  }
);

/* exports */
module.exports = FileTree;
