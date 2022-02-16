"use strict"; // seriously needs to be rewritten

/* requires */
const fs = require("fs");
const utils = Mary.require("Utils");
const info = Mary.require("Info");
const parseScripture = Mary.require("Parse").Scripture;

/* constants */
const Data = utils.newObj();
const cache = new Map();
const paths = new Map(info.versionNames.map(
  v => [v, `./Scripture/${info.getLanguage(v)}/${v}/`]
));

/* constructor */
Data.Scripture = function (version, book, chapter) {
  version = paths.get(version);
  return utils.proto(null, {
    read: () => read(version, book, chapter),
    write: (file) => write(version, book, chapter, file),
    check: () => check(version, book, chapter),
    parse: () => parse(version, book, chapter)
  });
};

/* functions */
const read = (version, book, chapter) => {
  const fpath = version + book + "/" + chapter + ".txt";
  const file = fs.readFileSync(fpath, "utf8")
    .replace(/\r\n/g, "\n").trim();
  if (!cache.has(fpath) && cache.size > 100) { // I don't even think it's grabbing from cache!
    cache.delete(utils.map.head(cache).key);
  }
  cache.set(fpath, file);
  return file;
};

const write = (version, book, chapter, file) => {
  const dirpath = version + book + "/";
  const fpath = dirpath + chapter + ".txt";
  if (!file) throw new Error("Need a file to write.");
  if (!fs.existsSync(dirpath)) fs.mkdirSync(dirpath);
  if (check(version, book, chapter) === true) {
    const safePath = fpath.replace(/\.txt$/, "_SAFE.txt");
    (confirm("File already exists. Overwrite?")) ?
      fs.writeFileSync(fpath, file, "utf8") :
      fs.writeFileSync(safePath, file, "utf8");
  } else {
    fs.writeFileSync(fpath, file, "utf8");
  }
  cache.set(fpath, file);
  return file;
};

const check = (version, book, chapter) => {
  const fpath = version + book + "/" + chapter + ".txt";
  return fs.existsSync(fpath);
};

const parse = (version, book, chapter) => {
  return parseScripture.toMap(read(version, book, chapter));
};

/* exports */
module.exports = Data;
