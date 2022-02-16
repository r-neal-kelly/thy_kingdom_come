"use strict";

/* requires */
const {fonts} = Mary.require("Path");

/* constants */
const path = `${fonts}/English`;
const paths =
  [ [ "Argentum"     , `${path}/Argentum/ArgentumSans-Regular.ttf`   ]
  , [ "Carlito"      , `${path}/Carlito/Carlito-Regular.ttf`         ]
  , [ "Coelacanth"   , `${path}/Coelacanth/Coelacanth.otf`           ]
  , [ "DejaVu Serif" , `${path}/DejaVu/DejaVuSerif.ttf`              ]
  , [ "DejaVu Sans"  , `${path}/DejaVu/DejaVuSans.ttf`               ]
  , [ "DejaVu Mono"  , `${path}/DejaVu/DejaVuSansMono.ttf`           ]
  , [ "FreeSerif"    , `${path}/FreeSerif/FreeSerif.otf`             ]
  , [ "Merriweather" , `${path}/Merriweather/Merriweather-Black.ttf` ]
  , [ "Orkney"       , `${path}/Orkney/Orkney Regular.ttf`           ]
  , [ "Quivira"      , `${path}/Quivira/Quivira.otf`                 ]
  ];
const presets =
  { "default"              : "Orkney"
  , "direction"            : "ltr"
  , "Andika"               : { len: "1.5", base: 16.0 }
  , "Argentum"             : { len: "1.5", base: 16.0 }
  , "Carlito"              : { len: "1.5", base: 16.0 }
  , "Charis"               : { len: "1.5", base: 16.0 }
  , "Charis Bold"          : { len: "1.5", base: 16.0 }
  , "Charis Italic"        : { len: "1.5", base: 16.0 }
  , "Charis Bold Italic"   : { len: "1.5", base: 16.0 }
  , "Coelacanth"           : { len: "1.5", base: 16.0 }
  , "DejaVu Serif"         : { len: "1.5", base: 16.0 }
  , "DejaVu Sans"          : { len: "1.5", base: 16.0 }
  , "DejaVu Mono"          : { len: "1.5", base: 16.0 }
  , "Doulos"               : { len: "1.5", base: 16.0 }
  , "FreeSerif"            : { len: "1.5", base: 16.0 }
  , "Gentium"              : { len: "1.3", base: 18.5 }
  , "Gentium Italic"       : { len: "1.3", base: 18.5 }
  , "Merriweather"         : { len: "1.5", base: 16.0 }
  , "Noto Sans"            : { len: "1.5", base: 16.0 }
  , "Noto Serif"           : { len: "1.5", base: 16.0 }
  , "Noto Old Italic"      : { len: "1.5", base: 16.0 }
  , "Orkney"               : { len: "1.5", base: 16.3 }
  , "Quivira"              : { len: "1.5", base: 16.3 }
  , "Unifraktur Cook"      : { len: "1.5", base: 16.0 }
  , "Unifraktur Cook Bold" : { len: "1.5", base: 16.0 }
  , "Unifraktur Maguntia"  : { len: "1.5", base: 16.0 }
  };

/* exports */
module.exports = {paths, presets};
