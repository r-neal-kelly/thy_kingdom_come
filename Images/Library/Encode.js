"use strict";

/* requires */
const {execFileSync} = require("child_process");
const fs = require("fs");

/* constants */
const codec = "cwebp.exe";
const book = `./Scripture/Latin/Biblia Sacra 1914/alt`;
const png = `${book}/png`;
const webp = `${book}/webp`;
const files = fs.readdirSync(png, "utf8");

/* initialize */
if (!fs.existsSync(webp)) fs.mkdirSync(webp);

/* encode */
for (let file of files) {
  const fpath = `${png}/${file}`;
  if (fs.statSync(fpath).isDirectory()) continue;
  const newName = `${webp}/${file.replace(/\..+/, ".webp")}`;
  const out = execFileSync(codec,
    [ fpath, "-q", "60", "-m", "6", "-o", newName ],
    { encoding: "utf8" }
  );
}
