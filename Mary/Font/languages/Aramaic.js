"use strict";

/* requires */
const {fonts} = Mary.require("Path");

/* constants */
const path = `${fonts}/Aramaic`;
const paths =
  [ [ "Noto Syriac"     , `${path}/Noto/NotoSansSyriacEstrangela-Regular.ttf` ]
  , [ "Noto Samaritan"  , `${path}/Noto/NotoSansSamaritan-Regular.ttf`        ]
  , [ "Noto Phoenician" , `${path}/Noto/NotoSansPhoenician-Regular.ttf`       ]
  ];
const presets =
  { "default"         : "Noto Syriac"
  , "direction"       : "rtl"
  , "Noto Syriac"     : { len: "1.5", base: 16.0 }
  , "Noto Samaritan"  : { len: "1.5", base: 16.0 }
  , "Noto Phoenician" : { len: "1.5", base: 16.0 }
  };

/* exports */
module.exports = {paths, presets};
