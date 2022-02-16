"use strict";

/* requires */
const {utils} = Mary;

/* constants */
const _ = Symbol();
const proto = utils.newObj();

/* function */
const it = function (should, doThis) {
  const [key] = utils.map.last(this[_]);
  const value = utils.isFunction(doThis) ?
    doThis() : doThis;
  this[_].get(key).set(`it ${should}`, value); // maybe !!value?
};

/* constructor */
const Ensure = function () {
  this[_] = new Map();
};
Ensure.prototype = proto;

/* methods */
proto.describe = function (description, test) {
  this[_].set(description, new Map());
  test(it.bind(this));
};

proto.display = function () {
  let str = "\n";
  for (let [description, test] of this[_].entries()) {
    str += `DESCRIBE '${description}'...\n`;
    for (let [key, value] of test.entries()) {
      const falsePad = (value) ? "  " : "   X ";
      str += `${falsePad}${key}: ${value}\n`;
    }
    str += "\n";
  }
  return str;
};

/* test suite */
const test = function (path) {
  const ensure = new Ensure();

  ensure.describe("the root", function (it) {
    const ft = Mary.FileTree();
    it(`has a default name of 'root:'`, function () {
      return ft.name === `root:`;
    });
    it("has the path 'root:'", function () {
      return ft.path === "root:";
    });
    it("has a created date", function () {
      return !!ft.created;
    });
    it("has a modified date", function () {
      return !!ft.modified;
    });
    it(`has no folders`, function () {
      return !ft.folders[0];
    });
    it(`has no files`, function () {
      return !ft.files[0];
    });
    it(`can, on construction, be given a name, e.g. "amen"`, function () {
      const ft = Mary.FileTree({rootName: "amen"});
      return ft.name === `amen:`;
    });
  });

  ensure.describe("new folder", function (it) {
    const ft = Mary.FileTree();
    it("has the method 'newFolder'", function () {
      return !!ft.newFolder;
    });
    it("is currently in root", function () {
      return ft.path === "root:"
    });
    it("created a new folder", function () {
      ft.newFolder("hello");
      return !!ft.folders[0];
    });
    it("should still be in root", function () {
      return ft.path === "root:"
    });
    ft.openFolder("hello");
    it(`has the name of 'hello'`, function () {
      return ft.name === `hello`;
    });
    it("has the path 'root:/hello'", function () {
      return ft.path === "root:/hello";
    });
    it("has a created date", function () {
      return !!ft.created;
    });
    it("has a modified date", function () {
      return !!ft.modified;
    });
    it(`has no folders`, function () {
      return !ft.folders[0];
    });
    it(`has no files`, function () {
      return !ft.files[0];
    });
  });

  ensure.describe("open folder", function (it) {
    const ft = Mary.FileTree();
    it("has the method 'openFolder'", function () {
      return !!ft.openFolder;
    });
    it("is currently in root", function () {
      return ft.path === "root:"
    });
    it("won't open a non-existent folder", function () {
      ft.openFolder("this/path");
      return ft.path === "root:";
    });
    it("can now open `this/path`", function () {
      ft.newFolder("this/path");
      ft.openFolder("this/path");
      return ft.path !== "root:";
    });
    it("has the name 'path'", function () {
      return ft.name === "path";
    });
    it("has the path 'root:/this/path'", function () {
      return ft.path === "root:/this/path";
    });
  });

  ensure.describe("has folder", function (it) {
    const ft = Mary.FileTree();
    it("has the method 'hasFolder'", function () {
      return !!ft.hasFolder;
    });
    it("can tell it doesn't have 'this/folder'", function () {
      return !ft.hasFolder("this/folder");
    });
    it("can tell that it now has 'this/folder'", function () {
      ft.newFolder("this/folder");
      return !!ft.hasFolder("this/folder");
    });
  });

  ensure.describe("folder shortcut", function (it) {
    const ft = Mary.FileTree();
    const path = "this/path";
    it("has a 'folder' method", function () {
      return !!ft.folder;
    });
    it("does not have a folder at 'this/path'", function () {
      return !ft.hasFolder(path);
    });
    it("creates a new folder because 'this/path' is unoccupied", function () {
      ft.folder(path);
      return ft.hasFolder(path) && ft.path === "root:";
    });
    it("opens the new folder at 'this/path', now that it's occupied", function () {
      ft.folder(path);
      return ft.path === "root:/this/path";
    });
  });

  ensure.describe("resolve", function (it) {
    const ft = Mary.FileTree();
    ft.newFolder("test/path").openFolder("test/path");
    it("can resolve a path with just a name", function () {
      return ft.resolvePath("love") === "root:/test/path/love";
    });
    it("can resolve a path with './'", function () {
      return ft.resolvePath("./love") === "root:/test/path/love";
    });
    it("can resolve a path with '../'", function () {
      return ft.resolvePath("../love") === "root:/test/love";
    });
    it("can resolve a path to root with '../../'", function () {
      return ft.resolvePath("../../love") === "root:/love";
    });
    it("can resolve the root itself with '/'", function () {
      return ft.resolvePath("/") === "root:";
    });
    it("can resolve off the root with '/love'", function () {
      return ft.resolvePath("/love") === "root:/love";
    });
    it("can resolve the root, from root, with '../../../../../'", function () {
      const ft = Mary.FileTree();
      return ft.resolvePath("../../../../../") === "root:";
    });
    it("can resolve the root, from a single child, with '../../../../../'", function () {
      const ft = Mary.FileTree();
      ft.newFolder("test").openFolder("test");
      return ft.resolvePath("../../../../../") === "root:";
    });
  });

  ensure.describe("pathing", function (it) {
    const ft = Mary.FileTree();
    const path = "root:/" + utils.range(1, 1000).join("/");
    it("has no folders", function () {
      return !ft.folders[0];
    });
    it("creates a folder and opens: '1/2/../1000'", function () {
      ft.newFolder(path).openFolder(path);
      return ft.name === "1000" && ft.path === path;
    });
    it("verifies that the parent folder is '1/2/../999'", function () {
      ft.openFolder("../");
      return ft.name === "999" && ft.path === path.replace(/\/1000$/, "");
    });
    it("verifies that '1/2/..500' exists", function () {
      const path = "root:/" + utils.range(1, 500).join("/");
      ft.newFolder(path).openFolder(path);
      return ft.name === "500" && ft.path === path;
    });
  });

  ensure.describe("unique folder names", function (it) {
    const ft = Mary.FileTree();
    it(`creates a folder with the default name`, function () {
      ft.newFolder();
      return !!ft.folders[0];
    });
    it("says the folder's name is 'New Folder'", function () {
      return ft.folders[0] === "New Folder";
    });
    it("creates another default without overwriting", function () {
      ft.newFolder();
      return ft.folders.length === 2;
    });
    it("says the second folder's name is 'New Folder 1'", function () {
      ft.newFolder();
      return ft.folders[1] === "New Folder 1";
    });
    it("creates another default, and says its name is 'New Folder 2'", function () {
      ft.newFolder();
      return ft.folders[2] === "New Folder 2";
    });
    it("can do this to 'n' where 'n' is say, 100", function () {
      while (!ft.hasFolder("New Folder 100")) ft.newFolder();
      return ft.folders[ft.folders.length - 1] === "New Folder 100";
    });
  });

  ensure.describe("moveFolder", function (it) {
    const ft = Mary.FileTree();
    it(`can move a folder from one path to another`, function () {
      ft.newFolder("1/2/3/4/5/6");
      ft.moveFolder("1/2/3", "new");
      return ft.hasFolder("new/3/4/5/6") && !ft.hasFolder("1/2/3/4/5/6");
    });
  });

  ensure.describe("files", function (it) {
    const ft = Mary.FileTree();
    it(`has no files`, function () {
      return !ft.files[0];
    });
    it("created a new file called 'love'", function () {
      ft.file("love", "yes");
      return ft.files[0] === "love";
    });
    it("has the correct contents in the file", function () {
      return ft.file("love") === "yes";
    });
  });

  ensure.describe("files shortcut", function (it) {
    const ft = Mary.FileTree();
    it("has a 'file' method", function () {
      return !!ft.file;
    });
    it("does not have a file called 'love'", function () {
      return !ft.hasFile("love");
    });
    it("creates a new file because 'love' doesn't exist", function () {
      ft.file("love", "yes");
      return ft.hasFile("love");
    });
    it("opens the file 'love', now that it exists", function () {
      return ft.file("love") === "yes";
    });
  });

  ensure.describe("recycle", function (it) {
    const ft = Mary.FileTree();
    it(`has a recycler`, function () {
      return !!ft.recycle;
    });
    it("has no recycled items", function () {
      return !ft.recycle[0];
    });
    ft.folder()
    it("has recycled a file", function () {
      return !ft.recycle[0];
    });
  });

  return ensure.display();
};

/* exports */
module.exports = test;
