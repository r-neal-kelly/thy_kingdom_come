"use strict";

/* requires */
const {fonts} = Mary.require("Path");

/* constants */
const path = `${fonts}/Latin`;
const paths =
  [ [ "Andika"               , `${path}/Andika/Andika-R.ttf`                 ]
  , [ "Charis"               , `${path}/Charis/CharisSIL-R.ttf`              ]
  , [ "Charis Bold"          , `${path}/Charis/CharisSIL-B.ttf`              ]
  , [ "Charis Italic"        , `${path}/Charis/CharisSIL-I.ttf`              ]
  , [ "Charis Bold Italic"   , `${path}/Charis/CharisSIL-BI.ttf`             ]
  , [ "Doulos"               , `${path}/Doulos/DoulosSIL-R.ttf`              ]
  , [ "Gentium"              , `${path}/Gentium/GentiumPlus-R.ttf`           ]
  , [ "Gentium Italic"       , `${path}/Gentium/GentiumPlus-I.ttf`           ]
  , [ "Noto Sans"            , `${path}/Noto/NotoSans-Regular.ttf`           ]
  , [ "Noto Serif"           , `${path}/Noto/NotoSerif-Regular.ttf`          ]
  , [ "Noto Old Italic"      , `${path}/Noto/NotoSansOldItalic-Regular.ttf`  ]
  , [ "Unifraktur Cook"      , `${path}/Unifraktur/UnifrakturCook-Light.ttf` ]
  , [ "Unifraktur Cook Bold" , `${path}/Unifraktur/UnifrakturCook.ttf`       ]
  , [ "Unifraktur Maguntia"  , `${path}/Unifraktur/UnifrakturMaguntia.ttf`   ]
  ];
const presets =
  { "default"              : "Gentium"
  , "direction"            : "ltr"
  , "Andika"               : { len: "1.5", base: 16.0 }
  , "Charis"               : { len: "1.5", base: 16.0 }
  , "Charis Bold"          : { len: "1.5", base: 16.0 }
  , "Charis Italic"        : { len: "1.5", base: 16.0 }
  , "Charis Bold Italic"   : { len: "1.5", base: 16.0 }
  , "Doulos"               : { len: "1.5", base: 16.0 }
  , "Gentium"              : { len: "1.3", base: 18.5 }
  , "Gentium Italic"       : { len: "1.3", base: 18.5 }
  , "Noto Sans"            : { len: "1.5", base: 16.0 }
  , "Noto Serif"           : { len: "1.5", base: 16.0 }
  , "Noto Old Italic"      : { len: "1.5", base: 16.0 }
  , "Unifraktur Cook"      : { len: "1.5", base: 16.0 }
  , "Unifraktur Cook Bold" : { len: "1.5", base: 16.0 }
  , "Unifraktur Maguntia"  : { len: "1.5", base: 16.0 }
  };

/* exports */
module.exports = {paths, presets};
