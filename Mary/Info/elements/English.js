"use strict";

/* requires */

/* constants */
const letters =
  [ "a"
  , "b"
  , "c"
  , "d"
  , "e"
  , "f"
  , "g"
  , "h"
  , "i"
  , "j"
  , "k"
  , "l"
  , "m"
  , "n"
  , "o"
  , "p"
  , "q"
  , "r"
  , "s"
  , "t"
  , "u"
  , "v"
  , "w"
  , "x"
  , "y"
  , "z"
  ];

const caps =
  [ "A"
  , "B"
  , "C"
  , "D"
  , "E"
  , "F"
  , "G"
  , "H"
  , "I"
  , "J"
  , "K"
  , "L"
  , "M"
  , "N"
  , "O"
  , "P"
  , "Q"
  , "R"
  , "S"
  , "T"
  , "U"
  , "V"
  , "W"
  , "X"
  , "Y"
  , "Z"
  ];

const punctuation =
  [ "'" // Apostrophe
  , "(" // Left Parenthesis
  , ")" // Right Parenthesis
  , "[" // Left Square Bracket
  , "]" // Right Square Bracket
  , "{" // Left Curly Bracket
  , "}" // Right Curly Bracket
  , ":" // Colon
  , "," // Comma
  , "…" // Horizontal Ellipsis
  , "!" // Exclamation Mark
  , "." // Full Stop
  , "<" // Less-Than Sign
  , ">" // Greater-Than Sign
  , "‹" // Single Left-Pointing Angle Quotation Mark
  , "›" // Single Right-Pointing Angle Quotation Mark
  , "«" // Left-Pointing Double Angle Quotation Mark
  , "»" // Right-Pointing Double Angle Quotation Mark
  , "-" // Hyphen-Minus
  , "‐" // Hyphen
  , "–" // En Dash
  , "—" // Em Dash
  , "―" // Horizontal Bar
  , "·" // Middle Dot
  , "?" // Question Mark
  , '"' // Quotation Mark
  , "‘" // Left Single Quotation Mark
  , "’" // Right Single Quotation Mark
  , "“" // Left Double Quotation Mark
  , "”" // Right Double Quotation Mark
  , ";" // Semicolon
  , "/" // Solidus
  , "⁄" // Fraction Slash
  , "\\" // Reverse Solidus
  , " " // Space
  , "&" // Ampersand
  , "*" // Asterisk
  , "@" // Commercial At
  , "•" // Bullet
  , "^" // Circumflex Accent
  , "†" // Dagger
  , "‡" // Double Dagger
  , "°" // Degree Sign
  , "$" // Dollar Sign
  , "#" // Number Sign
  , "№" // Numero Sign
  , "÷" // Division Sign
  , "×" // Multiplication Sign
  , "º" // Masculine Ordinal Indicator
  , "ª" // Feminine Ordinal Indicator
  , "%" // Percent Sign
  , "+" // Plus Sign
  , "=" // Equals Sign
  , "¶" // Pilcrow Sign
  , "§" // Section Sign
  , "~" // Tilde
  , "_" // Low Line
  , "|" // Vertical Line
  , "‖" // Double Vertical Line
  , "¦" // Broken Bar
  ];

/* module */
const elements =
  { get letters()     { return Array.from(letters) }
  , get caps()        { return Array.from(caps) }
  , get punctuation() { return Array.from(punctuation) }
  };

/* exports */
module.exports = elements;
