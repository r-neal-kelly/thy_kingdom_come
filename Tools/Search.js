"use strict";

/* requires */
const readline = require("readline");
const fs = require("fs");

/* constants */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const path = "../Mary";
//const path = `F:/JavaScript/Electron/Thy Kingdom Come/Scripture/Greek/Alford's Greek NT`;
//const path = `F:/JavaScript/Electron/Thy Kingdom Come/Scripture`;

/* functions */
const search = query => {
  let results = [];
  const regex = new RegExp(query, "g");
  recurse({path, results, regex});
  results = JSON.stringify(results, null, " ");
  results = results.replace(/^(\s)|\[|\]|"|,$/gm, "").trim();
  return results;
};

const recurse = ({path, results, regex}) => {
  const files = fs.readdirSync(path, "utf8");
  for (let file of files) {
    const fpath = `${path}/${file}`;
    if (fs.statSync(fpath).isDirectory()) {
      recurse({path: fpath, results, regex});
    } else {
      const text = fs.readFileSync(fpath, "utf8");
      const matches = text.match(regex);
      if (matches) results.push(`(${fpath}, ${matches.length})`);
    }
  }
};

const main = () => {
  rl.question("Enter a search term (:quit to exit):\n", query => {
    if (query === ":quit") return rl.close();
    rl.write(`Results:\n${search(query)}\n`);
    main();
  });
};

main();
