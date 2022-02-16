"use strict";

/* requires */
const {fonts} = Mary.require("Path");

/* constants */
const path = `${fonts}/Ge'ez`;
const paths =
  [ [ "Abyssinica"      , `${path}/Abyssinica/AbyssinicaSIL-R.ttf`     ]
  , [ "Washra"          , `${path}/Washra/washrasb.ttf`                ]
  , [ "Washra Bold"     , `${path}/Washra/washrab.ttf`                 ]
  , [ "Noto Geez Sans"  , `${path}/Noto/NotoSansEthiopic-Regular.ttf`  ]
  , [ "Noto Geez Serif" , `${path}/Noto/NotoSerifEthiopic-Regular.ttf` ]
  ];
const presets =
  { "default"         : "Abyssinica"
  , "direction"       : "ltr"
  , "Abyssinica"      : { len: "1.5", base: 16.0 }
  , "Washra"          : { len: "1.5", base: 16.0 }
  , "Washra Bold"     : { len: "1.5", base: 16.0 }
  , "Noto Geez Sans"  : { len: "1.5", base: 16.0 }
  , "Noto Geez Serif" : { len: "1.5", base: 16.0 }
  };

/* exports */
module.exports = {paths, presets};
