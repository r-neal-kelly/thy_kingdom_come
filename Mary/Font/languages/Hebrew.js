"use strict";

/* requires */
const {fonts} = Mary.require("Path");

/* constants */
const path = `${fonts}/Hebrew`;
const paths =
  [ [ "Ezra"    , `${path}/Ezra/SILEOT.ttf`   ]
  , [ "Ezra SR" , `${path}/Ezra/SILEOTSR.ttf` ]
  ];
const presets =
  { "default"    : "Ezra SR"
  , "direction"  : "rtl"
  , "Coelacanth" : { len: "1.2", base: 26.0 }
  , "Ezra"       : { len: "1.5", base: 21.0 }
  , "Ezra SR"    : { len: "1.5", base: 21.0 }
  };

/* exports */
module.exports = {paths, presets};
