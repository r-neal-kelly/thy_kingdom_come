"use strict";

/* requires */
const {fonts} = Mary.require("Path");

/* constants */
const path = `${fonts}/Greek`;
const paths =
  [ [ "Cardo"        , `${path}/Cardo/Cardo-Regular.ttf`           ]
  , [ "Cardo Bold"   , `${path}/Cardo/Cardo-Bold.ttf`              ]
  , [ "Cardo Italic" , `${path}/Cardo/Cardo-Italic.ttf`            ]
  , [ "Galatia"      , `${path}/Galatia/GalSILR.ttf`               ]
  , [ "Galatia Bold" , `${path}/Galatia/GalSILB.ttf`               ]
  , [ "Theano"       , `${path}/Theano/TheanoModern-Regular.ttf`   ]
  , [ "Theano Old"   , `${path}/Theano/TheanoOldStyle-Regular.ttf` ]
  , [ "Theano Didot" , `${path}/Theano/TheanoDidot-Regular.ttf`    ]
  , [ "Thryomanes"   , `${path}/Thryomanes/Thryn___.ttf`           ]
  ];
const presets =
  { "default"        : "Quivira"
  , "direction"      : "ltr"
  , "Cardo"          : { len: "1.5", base: 24.0 }
  , "Cardo Bold"     : { len: "1.5", base: 24.0 }
  , "Cardo Italic"   : { len: "1.5", base: 24.0 }
  , "Carlito"        : { len: "1.5", base: 16.0 }
  , "DejaVu Serif"   : { len: "1.5", base: 24.0 }
  , "DejaVu Sans"    : { len: "1.5", base: 24.0 }
  , "DejaVu Mono"    : { len: "1.5", base: 24.0 }
  , "Doulos"         : { len: "1.5", base: 18.0 }
  , "FreeSerif"      : { len: "1.3", base: 24.0 }
  , "Galatia"        : { len: "1.3", base: 24.0 }
  , "Galatia Bold"   : { len: "1.3", base: 18.5 }
  , "Gentium"        : { len: "1.3", base: 24.0 }
  , "Gentium Italic" : { len: "1.3", base: 18.5 }
  , "Noto Sans"      : { len: "1.5", base: 16.0 }
  , "Noto Serif"     : { len: "1.5", base: 16.0 }
  , "Quivira"        : { len: "1.3", base: 25.0 }
  , "Theano"         : { len: "1.5", base: 24.0 }
  , "Theano Old"     : { len: "1.5", base: 24.0 }
  , "Theano Didot"   : { len: "1.5", base: 24.0 }
  , "Thryomanes"     : { len: "1.5", base: 24.0 }
  };

/* exports */
module.exports = {paths, presets};
