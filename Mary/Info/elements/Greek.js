"use strict";

/* requires */

/* constants */
const letters =
  [ "α" // Small Alpha
  , "ά" // Small Alpha with Tonos
  , "ά" // Small Alpha with Oxia
  , "ὰ" // Small Alpha with Varia
  , "ᾶ" // Small Alpha with Perispomeni
  , "ἀ" // Small Alpha with Psili
  , "ἄ" // Small Alpha with Psili and Oxia
  , "ἂ" // Small Alpha with Psili and Varia
  , "ἆ" // Small Alpha with Psili and Perispomeni
  , "ἁ" // Small Alpha with Dasia
  , "ἅ" // Small Alpha with Dasia and Oxia
  , "ἃ" // Small Alpha with Dasia and Varia
  , "ἇ" // Small Alpha with Dasia and Perispomeni
  , "ᾳ" // Small Alpha with Ypogegrammeni
  , "ᾴ" // Small Alpha with Oxia and Ypogegrammeni
  , "ᾲ" // Small Alpha with Varia and Ypogegrammeni
  , "ᾷ" // Small Alpha with Perispomeni and Ypogegrammeni
  , "ᾀ" // Small Alpha with Psili and Ypogegrammeni
  , "ᾄ" // Small Alpha with Psili and Oxia and Ypogegrammeni
  , "ᾂ" // Small Alpha with Psili and Varia and Ypogegrammeni
  , "ᾆ" // Small Alpha with Psili and Perispomeni and Ypogegrammeni
  , "ᾁ" // Small Alpha with Dasia and Ypogegrammeni
  , "ᾅ" // Small Alpha with Dasia and Oxia and Ypogegrammeni
  , "ᾃ" // Small Alpha with Dasia and Varia and Ypogegrammeni
  , "ᾇ" // Small Alpha with Dasia and Perispomeni and Ypogegrammeni
  , "ᾱ" // Small Alpha with Macron
  , "ᾰ" // Small Alpha with Vrachy

  , "β" // Small Beta

  , "γ" // Small Gamma

  , "δ" // Small Delta

  , "ε" // Small Epsilon
  , "έ" // Small Epsilon with Tonos
  , "έ" // Small Epsilon with Oxia
  , "ὲ" // Small Epsilon with Varia
  , "ἐ" // Small Epsilon with Psili
  , "ἔ" // Small Epsilon with Psili and Oxia
  , "ἒ" // Small Epsilon with Psili and Varia
  , "ἑ" // Small Epsilon with Dasia
  , "ἕ" // Small Epsilon with Dasia and Oxia
  , "ἓ" // Small Epsilon with Dasia and Varia

  , "ζ" // Small Zeta

  , "η" // Small Eta
  , "ή" // Small Eta with Tonos
  , "ή" // Small Eta with Oxia
  , "ὴ" // Small Eta with Varia
  , "ῆ" // Small Eta with Perispomeni
  , "ἠ" // Small Eta with Psili
  , "ἤ" // Small Eta with Psili and Oxia
  , "ἢ" // Small Eta with Psili and Varia
  , "ἦ" // Small Eta with Psili and Perispomeni
  , "ἡ" // Small Eta with Dasia
  , "ἥ" // Small Eta with Dasia and Oxia
  , "ἣ" // Small Eta with Dasia and Varia
  , "ἧ" // Small Eta with Dasia and Perispomeni
  , "ῃ" // Small Eta with Ypogegrammeni
  , "ῄ" // Small Eta with Oxia and Ypogegrammeni
  , "ῂ" // Small Eta with Varia and Ypogegrammeni
  , "ῇ" // Small Eta with Perispomeni and Ypogegrammeni
  , "ᾐ" // Small Eta with Psili and Ypogegrammeni
  , "ᾔ" // Small Eta with Psili and Oxia and Ypogegrammeni
  , "ᾒ" // Small Eta with Psili and Varia and Ypogegrammeni
  , "ᾖ" // Small Eta with Psili and Perispomeni and Ypogegrammeni
  , "ᾑ" // Small Eta with Dasia and Ypogegrammeni
  , "ᾕ" // Small Eta with Dasia and Oxia and Ypogegrammeni
  , "ᾓ" // Small Eta with Dasia and Varia and Ypogegrammeni
  , "ᾗ" // Small Eta with Dasia and Perispomeni and Ypogegrammeni

  , "θ" // Small Theta

  , "ι" // Small Iota
  , "ί" // Small Iota with Tonos
  , "ϊ" // Small Iota with Dialytika
  , "ΐ" // Small Iota with Dialytika and Tonos
  , "ί" // Small Iota with Oxia
  , "ὶ" // Small Iota with Varia
  , "ῖ" // Small Iota with Perispomeni
  , "ἰ" // Small Iota with Psili
  , "ἴ" // Small Iota with Psili and Oxia
  , "ἲ" // Small Iota with Psili and Varia
  , "ἶ" // Small Iota with Psili and Perispomeni
  , "ἱ" // Small Iota with Dasia
  , "ἵ" // Small Iota with Dasia and Oxia
  , "ἳ" // Small Iota with Dasia and Varia
  , "ἷ" // Small Iota with Dasia and Perispomeni
  , "ϊ" // Small Iota with Dialytika
  , "ΐ" // Small Iota with Dialytika and Oxia
  , "ῒ" // Small Iota with Dialytika and Varia
  , "ῗ" // Small Iota with Dialytika and Perispomeni
  , "ῑ" // Small Iota with Macron
  , "ῐ" // Small Iota with Vrachy

  , "κ" // Small Kappa

  , "λ" // Small Lambda

  , "μ" // Small Mu

  , "ν" // Small Nu

  , "ξ" // Small Xi

  , "ο" // Small Omicron
  , "ό" // Small Omicron with Tonos
  , "ό" // Small Omicron with Oxia
  , "ὸ" // Small Omicron with Varia
  , "ὀ" // Small Omicron with Psili
  , "ὄ" // Small Omicron with Psili and Oxia
  , "ὂ" // Small Omicron with Psili and Varia
  , "ὁ" // Small Omicron with Dasia
  , "ὅ" // Small Omicron with Dasia and Oxia
  , "ὃ" // Small Omicron with Dasia and Varia

  , "π" // Small Pi

  , "ρ" // Small Rho
  , "ῤ" // Small Rho with Psili
  , "ῥ" // Small Rho with Dasia

  , "σ" // Small Sigma
  , "ς" // Small Final Sigma

  , "τ" // Small Tau

  , "υ" // Small Upsilon
  , "ύ" // Small Upsilon with Tonos
  , "ϋ" // Small Upsilon with Dialytika
  , "ΰ" // Small Upsilon with Dialytika and Tonos
  , "ύ" // Small Upsilon with Oxia
  , "ὺ" // Small Upsilon with Varia
  , "ῦ" // Small Upsilon with Perispomeni
  , "ὐ" // Small Upsilon with Psili
  , "ὔ" // Small Upsilon with Psili and Oxia
  , "ὒ" // Small Upsilon with Psili and Varia
  , "ὖ" // Small Upsilon with Psili and Perispomeni
  , "ὑ" // Small Upsilon with Dasia
  , "ὕ" // Small Upsilon with Dasia and Oxia
  , "ὓ" // Small Upsilon with Dasia and Varia
  , "ὗ" // Small Upsilon with Dasia and Perispomeni
  , "ϋ" // Small Upsilon with Dialytika
  , "ΰ" // Small Upsilon with Dialytika and Oxia
  , "ῢ" // Small Upsilon with Dialytika and Varia
  , "ῧ" // Small Upsilon with Dialytika and Perispomeni
  , "ῡ" // Small Upsilon with Macron
  , "ῠ" // Small Upsilon with Vrachy

  , "φ" // Small Phi

  , "χ" // Small Chi

  , "ψ" // Small Psi

  , "ω" // Small Omega
  , "ώ" // Small Omega with Tonos
  , "ώ" // Small Omega with Oxia
  , "ὼ" // Small Omega with Varia
  , "ῶ" // Small Omega with Perispomeni
  , "ὠ" // Small Omega with Psili
  , "ὤ" // Small Omega with Psili and Oxia
  , "ὢ" // Small Omega with Psili and Varia
  , "ὦ" // Small Omega with Psili and Perispomeni
  , "ὡ" // Small Omega with Dasia
  , "ὥ" // Small Omega with Dasia and Oxia
  , "ὣ" // Small Omega with Dasia and Varia
  , "ὧ" // Small Omega with Dasia and Perispomeni
  , "ῳ" // Small Omega with Ypogegrammeni
  , "ῴ" // Small Omega with Oxia and Ypogegrammeni
  , "ῲ" // Small Omega with Varia and Ypogegrammeni
  , "ῷ" // Small Omega with Perispomeni and Ypogegrammeni
  , "ᾠ" // Small Omega with Psili and Ypogegrammeni
  , "ᾤ" // Small Omega with Psili and Oxia and Ypogegrammeni
  , "ᾢ" // Small Omega with Psili and Varia and Ypogegrammeni
  , "ᾦ" // Small Omega with Psili and Perispomeni and Ypogegrammeni
  , "ᾡ" // Small Omega with Dasia and Ypogegrammeni
  , "ᾥ" // Small Omega with Dasia and Oxia and Ypogegrammeni
  , "ᾣ" // Small Omega with Dasia and Varia and Ypogegrammeni
  , "ᾧ" // Small Omega with Dasia and Perispomeni and Ypogegrammeni"
  ];

const caps =
  [ "Α" // Capital Alpha
  , "Ά" // Capital Alpha with Tonos
  , "Ά" // Capital Alpha with Oxia
  , "Ὰ" // Capital Alpha with Varia
  , "Ἀ" // Capital Alpha with Psili
  , "Ἄ" // Capital Alpha with Psili and Oxia
  , "Ἂ" // Capital Alpha with Psili and Varia
  , "Ἆ" // Capital Alpha with Psili and Perispomeni
  , "Ἁ" // Capital Alpha with Dasia
  , "Ἅ" // Capital Alpha with Dasia and Oxia
  , "Ἃ" // Capital Alpha with Dasia and Varia
  , "Ἇ" // Capital Alpha with Dasia and Perispomeni
  , "ᾼ" // Capital Alpha with Prosgegrammeni
  , "ᾈ" // Capital Alpha with Psili and Prosgegrammeni
  , "ᾌ" // Capital Alpha with Psili and Oxia and Prosgegrammeni
  , "ᾊ" // Capital Alpha with Psili and Varia and Prosgegrammeni
  , "ᾎ" // Capital Alpha with Psili and Perispomeni and Prosgegrammeni
  , "ᾉ" // Capital Alpha with Dasia and Prosgegrammeni
  , "ᾍ" // Capital Alpha with Dasia and Oxia and Prosgegrammeni
  , "ᾋ" // Capital Alpha with Dasia and Varia and Prosgegrammeni
  , "ᾏ" // Capital Alpha with Dasia and Perispomeni and Prosgegrammeni
  , "Ᾱ" // Capital Alpha with Macron
  , "Ᾰ" // Capital Alpha with Vrachy

  , "Β" // Capital Beta

  , "Γ" // Capital Gamma

  , "Δ" // Capital Delta

  , "Ε" // Capital Epsilon
  , "Έ" // Capital Epsilon with Tonos
  , "Έ" // Capital Epsilon with Oxia
  , "Ὲ" // Capital Epsilon with Varia
  , "Ἐ" // Capital Epsilon with Psili
  , "Ἔ" // Capital Epsilon with Psili and Oxia
  , "Ἒ" // Capital Epsilon with Psili and Varia
  , "Ἑ" // Capital Epsilon with Dasia
  , "Ἕ" // Capital Epsilon with Dasia and Oxia
  , "Ἓ" // Capital Epsilon with Dasia and Varia

  , "Ζ" // Capital Zeta

  , "Η" // Capital Eta
  , "Ή" // Capital Eta with Tonos
  , "Ή" // Capital Eta with Oxia
  , "Ὴ" // Capital Eta with Varia
  , "Ἠ" // Capital Eta with Psili
  , "Ἤ" // Capital Eta with Psili and Oxia
  , "Ἢ" // Capital Eta with Psili and Varia
  , "Ἦ" // Capital Eta with Psili and Perispomeni
  , "Ἡ" // Capital Eta with Dasia
  , "Ἥ" // Capital Eta with Dasia and Oxia
  , "Ἣ" // Capital Eta with Dasia and Varia
  , "Ἧ" // Capital Eta with Dasia and Perispomeni
  , "ῌ" // Capital Eta with Prosgegrammeni
  , "ᾘ" // Capital Eta with Psili and Prosgegrammeni
  , "ᾜ" // Capital Eta with Psili and Oxia and Prosgegrammeni
  , "ᾚ" // Capital Eta with Psili and Varia and Prosgegrammeni
  , "ᾞ" // Capital Eta with Psili and Perispomeni and Prosgegrammeni
  , "ᾙ" // Capital Eta with Dasia and Prosgegrammeni
  , "ᾝ" // Capital Eta with Dasia and Oxia and Prosgegrammeni
  , "ᾛ" // Capital Eta with Dasia and Varia and Prosgegrammeni
  , "ᾟ" // Capital Eta with Dasia and Perispomeni and Prosgegrammeni

  , "Θ" // Capital Theta

  , "Ι" // Capital Iota
  , "Ί" // Capital Iota with Tonos
  , "Ϊ" // Capital Iota with Dialytika
  , "Ί" // Capital Iota with Oxia
  , "Ὶ" // Capital Iota with Varia
  , "Ἰ" // Capital Iota with Psili
  , "Ἴ" // Capital Iota with Psili and Oxia
  , "Ἲ" // Capital Iota with Psili and Varia
  , "Ἶ" // Capital Iota with Psili and Perispomeni
  , "Ἱ" // Capital Iota with Dasia
  , "Ἵ" // Capital Iota with Dasia and Oxia
  , "Ἳ" // Capital Iota with Dasia and Varia
  , "Ἷ" // Capital Iota with Dasia and Perispomeni
  , "Ϊ" // Capital Iota with Dialytika
  , "Ῑ" // Capital Iota with Macron
  , "Ῐ" // Capital Iota with Vrachy

  , "Κ" // Capital Kappa

  , "Λ" // Capital Lambda

  , "Μ" // Capital Mu

  , "Ν" // Capital Nu

  , "Ξ" // Capital Xi

  , "Ο" // Capital Omicron
  , "Ό" // Capital Omicron with Tonos
  , "Ό" // Capital Omicron with Oxia
  , "Ὸ" // Capital Omicron with Varia
  , "Ὀ" // Capital Omicron with Psili
  , "Ὄ" // Capital Omicron with Psili and Oxia
  , "Ὂ" // Capital Omicron with Psili and Varia
  , "Ὁ" // Capital Omicron with Dasia
  , "Ὅ" // Capital Omicron with Dasia and Oxia
  , "Ὃ" // Capital Omicron with Dasia and Varia

  , "Π" // Capital Pi

  , "Ρ" // Capital Rho
  , "Ῥ" // Capital Rho with Dasia

  , "Σ" // Capital Sigma

  , "Τ" // Capital Tau

  , "Υ" // Capital Upsilon
  , "Ύ" // Capital Upsilon with Tonos
  , "Ϋ" // Capital Upsilon with Dialytika
  , "Ύ" // Capital Upsilon with Oxia
  , "Ὺ" // Capital Upsilon with Varia
  , "Ὑ" // Capital Upsilon with Dasia
  , "Ὕ" // Capital Upsilon with Dasia and Oxia
  , "Ὓ" // Capital Upsilon with Dasia and Varia
  , "Ὗ" // Capital Upsilon with Dasia and Perispomeni
  , "Ϋ" // Capital Upsilon with Dialytika
  , "Ῡ" // Capital Upsilon with Macron
  , "Ῠ" // Capital Upsilon with Vrachy

  , "Φ" // Capital Phi

  , "Χ" // Capital Chi

  , "Ψ" // Capital Psi

  , "Ω" // Capital Omega
  , "Ώ" // Capital Omega with Tonos
  , "Ώ" // Capital Omega with Oxia
  , "Ὼ" // Capital Omega with Varia
  , "Ὠ" // Capital Omega with Psili
  , "Ὤ" // Capital Omega with Psili and Oxia
  , "Ὢ" // Capital Omega with Psili and Varia
  , "Ὦ" // Capital Omega with Psili and Perispomeni
  , "Ὡ" // Capital Omega with Dasia
  , "Ὥ" // Capital Omega with Dasia and Oxia
  , "Ὣ" // Capital Omega with Dasia and Varia
  , "Ὧ" // Capital Omega with Dasia and Perispomeni
  , "ῼ" // Capital Omega with Prosgegrammeni
  , "ᾨ" // Capital Omega with Psili and Prosgegrammeni
  , "ᾬ" // Capital Omega with Psili and Oxia and Prosgegrammeni
  , "ᾪ" // Capital Omega with Psili and Varia and Prosgegrammeni
  , "ᾮ" // Capital Omega with Psili and Perispomeni and Prosgegrammeni
  , "ᾩ" // Capital Omega with Dasia and Prosgegrammeni
  , "ᾭ" // Capital Omega with Dasia and Oxia and Prosgegrammeni
  , "ᾫ" // Capital Omega with Dasia and Varia and Prosgegrammeni
  , "ᾯ" // Capital Omega with Dasia and Perispomeni and Prosgegrammeni
  ];

const punctuation =
  [ "ʹ" // Greek Numeral Sign
  , "͵" // Greek Lower Numeral Sign
  , ";" // Greek Question Mark
  , "·" // Greek Ano Teleia
  , "ϗ" // Greek Kai Symbol
  , "᾽" // Greek Koronis
  , "(" // Left Parenthesis
  , ")" // Right Parenthesis
  , "[" // Left Square Bracket
  , "]" // Right Square Bracket
  , "." // Full Stop
  , "," // Comma
  , "…" // Horizontal Ellipsis
  , "!" // Exclamation Mark
  , " " // Space
  , "–" // En Dash
  , "—" // Em Dash
  , "―" // Horizontal Bar
  , "¶" // Pilcrow Sign
  , "§" // Section Sign
  ];

const combos =
  [ "̓" // Combining Comma Above (Smooth Breath)
  , "̔" // Combining Reversed Comma Above (Rough Breath)
  , "́" // Combining Acute Accent
  , "̀" // Combining Grave Accent
  , "͂" // Combining Greek Perispomeni (Circumflex)
  , "ͅ" // Combining Greek Ypogegrammeni (Iota Subscript)
  , "̈" // Combining Diaeresis
  , "̄" // Combining Macron
  , "̆" // Combining Breve
  ];

const alpha =
  [ "α" // Small Alpha
  , "Α" // Capital Alpha
  , "ά" // Small Alpha with Tonos
  , "Ά" // Capital Alpha with Tonos
  , "ά" // Small Alpha with Oxia
  , "Ά" // Capital Alpha with Oxia
  , "ὰ" // Small Alpha with Varia
  , "Ὰ" // Capital Alpha with Varia
  , "ᾶ" // Small Alpha with Perispomeni
  , "ἀ" // Small Alpha with Psili
  , "Ἀ" // Capital Alpha with Psili
  , "ἄ" // Small Alpha with Psili and Oxia
  , "Ἄ" // Capital Alpha with Psili and Oxia
  , "ἂ" // Small Alpha with Psili and Varia
  , "Ἂ" // Capital Alpha with Psili and Varia
  , "ἆ" // Small Alpha with Psili and Perispomeni
  , "Ἆ" // Capital Alpha with Psili and Perispomeni
  , "ἁ" // Small Alpha with Dasia
  , "Ἁ" // Capital Alpha with Dasia
  , "ἅ" // Small Alpha with Dasia and Oxia
  , "Ἅ" // Capital Alpha with Dasia and Oxia
  , "ἃ" // Small Alpha with Dasia and Varia
  , "Ἃ" // Capital Alpha with Dasia and Varia
  , "ἇ" // Small Alpha with Dasia and Perispomeni
  , "Ἇ" // Capital Alpha with Dasia and Perispomeni
  , "ᾳ" // Small Alpha with Ypogegrammeni
  , "ᾼ" // Capital Alpha with Prosgegrammeni
  , "ᾴ" // Small Alpha with Oxia and Ypogegrammeni
  , "ᾲ" // Small Alpha with Varia and Ypogegrammeni
  , "ᾷ" // Small Alpha with Perispomeni and Ypogegrammeni
  , "ᾀ" // Small Alpha with Psili and Ypogegrammeni
  , "ᾈ" // Capital Alpha with Psili and Prosgegrammeni
  , "ᾄ" // Small Alpha with Psili and Oxia and Ypogegrammeni
  , "ᾌ" // Capital Alpha with Psili and Oxia and Prosgegrammeni
  , "ᾂ" // Small Alpha with Psili and Varia and Ypogegrammeni
  , "ᾊ" // Capital Alpha with Psili and Varia and Prosgegrammeni
  , "ᾆ" // Small Alpha with Psili and Perispomeni and Ypogegrammeni
  , "ᾎ" // Capital Alpha with Psili and Perispomeni and Prosgegrammeni
  , "ᾁ" // Small Alpha with Dasia and Ypogegrammeni
  , "ᾉ" // Capital Alpha with Dasia and Prosgegrammeni
  , "ᾅ" // Small Alpha with Dasia and Oxia and Ypogegrammeni
  , "ᾍ" // Capital Alpha with Dasia and Oxia and Prosgegrammeni
  , "ᾃ" // Small Alpha with Dasia and Varia and Ypogegrammeni
  , "ᾋ" // Capital Alpha with Dasia and Varia and Prosgegrammeni
  , "ᾇ" // Small Alpha with Dasia and Perispomeni and Ypogegrammeni
  , "ᾏ" // Capital Alpha with Dasia and Perispomeni and Prosgegrammeni
  , "ᾱ" // Small Alpha with Macron
  , "Ᾱ" // Capital Alpha with Macron
  , "ᾰ" // Small Alpha with Vrachy
  , "Ᾰ" // Capital Alpha with Vrachy
  ];

const epsilon =
  [ "ε" // Small Epsilon
  , "Ε" // Capital Epsilon
  , "έ" // Small Epsilon with Tonos
  , "Έ" // Capital Epsilon with Tonos
  , "έ" // Small Epsilon with Oxia
  , "Έ" // Capital Epsilon with Oxia
  , "ὲ" // Small Epsilon with Varia
  , "Ὲ" // Capital Epsilon with Varia
  , "ἐ" // Small Epsilon with Psili
  , "Ἐ" // Capital Epsilon with Psili
  , "ἔ" // Small Epsilon with Psili and Oxia
  , "Ἔ" // Capital Epsilon with Psili and Oxia
  , "ἒ" // Small Epsilon with Psili and Varia
  , "Ἒ" // Capital Epsilon with Psili and Varia
  , "ἑ" // Small Epsilon with Dasia
  , "Ἑ" // Capital Epsilon with Dasia
  , "ἕ" // Small Epsilon with Dasia and Oxia
  , "Ἕ" // Capital Epsilon with Dasia and Oxia
  , "ἓ" // Small Epsilon with Dasia and Varia
  , "Ἓ" // Capital Epsilon with Dasia and Varia
  ];

const eta =
  [ "η" // Small Eta
  , "Η" // Capital Eta
  , "ή" // Small Eta with Tonos
  , "Ή" // Capital Eta with Tonos
  , "ή" // Small Eta with Oxia
  , "Ή" // Capital Eta with Oxia
  , "ὴ" // Small Eta with Varia
  , "Ὴ" // Capital Eta with Varia
  , "ῆ" // Small Eta with Perispomeni
  , "ἠ" // Small Eta with Psili
  , "Ἠ" // Capital Eta with Psili
  , "ἤ" // Small Eta with Psili and Oxia
  , "Ἤ" // Capital Eta with Psili and Oxia
  , "ἢ" // Small Eta with Psili and Varia
  , "Ἢ" // Capital Eta with Psili and Varia
  , "ἦ" // Small Eta with Psili and Perispomeni
  , "Ἦ" // Capital Eta with Psili and Perispomeni
  , "ἡ" // Small Eta with Dasia
  , "Ἡ" // Capital Eta with Dasia
  , "ἥ" // Small Eta with Dasia and Oxia
  , "Ἥ" // Capital Eta with Dasia and Oxia
  , "ἣ" // Small Eta with Dasia and Varia
  , "Ἣ" // Capital Eta with Dasia and Varia
  , "ἧ" // Small Eta with Dasia and Perispomeni
  , "Ἧ" // Capital Eta with Dasia and Perispomeni
  , "ῃ" // Small Eta with Ypogegrammeni
  , "ῌ" // Capital Eta with Prosgegrammeni
  , "ῄ" // Small Eta with Oxia and Ypogegrammeni
  , "ῂ" // Small Eta with Varia and Ypogegrammeni
  , "ῇ" // Small Eta with Perispomeni and Ypogegrammeni
  , "ᾐ" // Small Eta with Psili and Ypogegrammeni
  , "ᾘ" // Capital Eta with Psili and Prosgegrammeni
  , "ᾔ" // Small Eta with Psili and Oxia and Ypogegrammeni
  , "ᾜ" // Capital Eta with Psili and Oxia and Prosgegrammeni
  , "ᾒ" // Small Eta with Psili and Varia and Ypogegrammeni
  , "ᾚ" // Capital Eta with Psili and Varia and Prosgegrammeni
  , "ᾖ" // Small Eta with Psili and Perispomeni and Ypogegrammeni
  , "ᾞ" // Capital Eta with Psili and Perispomeni and Prosgegrammeni
  , "ᾑ" // Small Eta with Dasia and Ypogegrammeni
  , "ᾙ" // Capital Eta with Dasia and Prosgegrammeni
  , "ᾕ" // Small Eta with Dasia and Oxia and Ypogegrammeni
  , "ᾝ" // Capital Eta with Dasia and Oxia and Prosgegrammeni
  , "ᾓ" // Small Eta with Dasia and Varia and Ypogegrammeni
  , "ᾛ" // Capital Eta with Dasia and Varia and Prosgegrammeni
  , "ᾗ" // Small Eta with Dasia and Perispomeni and Ypogegrammeni
  , "ᾟ" // Capital Eta with Dasia and Perispomeni and Prosgegrammeni
  ];

const iota =
  [ "ι" // Small Iota
  , "Ι" // Capital Iota
  , "ί" // Small Iota with Tonos
  , "Ί" // Capital Iota with Tonos
  , "ϊ" // Small Iota with Dialytika
  , "Ϊ" // Capital Iota with Dialytika
  , "ΐ" // Small Iota with Dialytika and Tonos
  , "ί" // Small Iota with Oxia
  , "Ί" // Capital Iota with Oxia
  , "ὶ" // Small Iota with Varia
  , "Ὶ" // Capital Iota with Varia
  , "ῖ" // Small Iota with Perispomeni
  , "ἰ" // Small Iota with Psili
  , "Ἰ" // Capital Iota with Psili
  , "ἴ" // Small Iota with Psili and Oxia
  , "Ἴ" // Capital Iota with Psili and Oxia
  , "ἲ" // Small Iota with Psili and Varia
  , "Ἲ" // Capital Iota with Psili and Varia
  , "ἶ" // Small Iota with Psili and Perispomeni
  , "Ἶ" // Capital Iota with Psili and Perispomeni
  , "ἱ" // Small Iota with Dasia
  , "Ἱ" // Capital Iota with Dasia
  , "ἵ" // Small Iota with Dasia and Oxia
  , "Ἵ" // Capital Iota with Dasia and Oxia
  , "ἳ" // Small Iota with Dasia and Varia
  , "Ἳ" // Capital Iota with Dasia and Varia
  , "ἷ" // Small Iota with Dasia and Perispomeni
  , "Ἷ" // Capital Iota with Dasia and Perispomeni
  , "ϊ" // Small Iota with Dialytika
  , "Ϊ" // Capital Iota with Dialytika
  , "ΐ" // Small Iota with Dialytika and Oxia
  , "ῒ" // Small Iota with Dialytika and Varia
  , "ῗ" // Small Iota with Dialytika and Perispomeni
  , "ῑ" // Small Iota with Macron
  , "Ῑ" // Capital Iota with Macron
  , "ῐ" // Small Iota with Vrachy
  , "Ῐ" // Capital Iota with Vrachy
  ];

const omicron =
  [ "ο" // Small Omicron
  , "Ο" // Capital Omicron
  , "ό" // Small Omicron with Tonos
  , "Ό" // Capital Omicron with Tonos
  , "ό" // Small Omicron with Oxia
  , "Ό" // Capital Omicron with Oxia
  , "ὸ" // Small Omicron with Varia
  , "Ὸ" // Capital Omicron with Varia
  , "ὀ" // Small Omicron with Psili
  , "Ὀ" // Capital Omicron with Psili
  , "ὄ" // Small Omicron with Psili and Oxia
  , "Ὄ" // Capital Omicron with Psili and Oxia
  , "ὂ" // Small Omicron with Psili and Varia
  , "Ὂ" // Capital Omicron with Psili and Varia
  , "ὁ" // Small Omicron with Dasia
  , "Ὁ" // Capital Omicron with Dasia
  , "ὅ" // Small Omicron with Dasia and Oxia
  , "Ὅ" // Capital Omicron with Dasia and Oxia
  , "ὃ" // Small Omicron with Dasia and Varia
  , "Ὃ" // Capital Omicron with Dasia and Varia
  ];

const rho =
  [ "ρ" // Small Rho
  , "Ρ" // Capital Rho
  , "ῤ" // Small Rho with Psili
  , "ῥ" // Small Rho with Dasia
  , "Ῥ" // Capital Rho with Dasia
  ];

const upsilon =
  [ "υ" // Small Upsilon
  , "Υ" // Capital Upsilon
  , "ύ" // Small Upsilon with Tonos
  , "Ύ" // Capital Upsilon with Tonos
  , "ϋ" // Small Upsilon with Dialytika
  , "Ϋ" // Capital Upsilon with Dialytika
  , "ΰ" // Small Upsilon with Dialytika and Tonos
  , "ύ" // Small Upsilon with Oxia
  , "Ύ" // Capital Upsilon with Oxia
  , "ὺ" // Small Upsilon with Varia
  , "Ὺ" // Capital Upsilon with Varia
  , "ῦ" // Small Upsilon with Perispomeni
  , "ὐ" // Small Upsilon with Psili
  , "ὔ" // Small Upsilon with Psili and Oxia
  , "ὒ" // Small Upsilon with Psili and Varia
  , "ὖ" // Small Upsilon with Psili and Perispomeni
  , "ὑ" // Small Upsilon with Dasia
  , "Ὑ" // Capital Upsilon with Dasia
  , "ὕ" // Small Upsilon with Dasia and Oxia
  , "Ὕ" // Capital Upsilon with Dasia and Oxia
  , "ὓ" // Small Upsilon with Dasia and Varia
  , "Ὓ" // Capital Upsilon with Dasia and Varia
  , "ὗ" // Small Upsilon with Dasia and Perispomeni
  , "Ὗ" // Capital Upsilon with Dasia and Perispomeni
  , "ϋ" // Small Upsilon with Dialytika
  , "Ϋ" // Capital Upsilon with Dialytika
  , "ΰ" // Small Upsilon with Dialytika and Oxia
  , "ῢ" // Small Upsilon with Dialytika and Varia
  , "ῧ" // Small Upsilon with Dialytika and Perispomeni
  , "ῡ" // Small Upsilon with Macron
  , "Ῡ" // Capital Upsilon with Macron
  , "ῠ" // Small Upsilon with Vrachy
  , "Ῠ" // Capital Upsilon with Vrachy
  ];

const omega =
  [ "ω" // Small Omega
  , "Ω" // Capital Omega
  , "ώ" // Small Omega with Tonos
  , "Ώ" // Capital Omega with Tonos
  , "ώ" // Small Omega with Oxia
  , "Ώ" // Capital Omega with Oxia
  , "ὼ" // Small Omega with Varia
  , "Ὼ" // Capital Omega with Varia
  , "ῶ" // Small Omega with Perispomeni
  , "ὠ" // Small Omega with Psili
  , "Ὠ" // Capital Omega with Psili
  , "ὤ" // Small Omega with Psili and Oxia
  , "Ὤ" // Capital Omega with Psili and Oxia
  , "ὢ" // Small Omega with Psili and Varia
  , "Ὢ" // Capital Omega with Psili and Varia
  , "ὦ" // Small Omega with Psili and Perispomeni
  , "Ὦ" // Capital Omega with Psili and Perispomeni
  , "ὡ" // Small Omega with Dasia
  , "Ὡ" // Capital Omega with Dasia
  , "ὥ" // Small Omega with Dasia and Oxia
  , "Ὥ" // Capital Omega with Dasia and Oxia
  , "ὣ" // Small Omega with Dasia and Varia
  , "Ὣ" // Capital Omega with Dasia and Varia
  , "ὧ" // Small Omega with Dasia and Perispomeni
  , "Ὧ" // Capital Omega with Dasia and Perispomeni
  , "ῳ" // Small Omega with Ypogegrammeni
  , "ῼ" // Capital Omega with Prosgegrammeni
  , "ῴ" // Small Omega with Oxia and Ypogegrammeni
  , "ῲ" // Small Omega with Varia and Ypogegrammeni
  , "ῷ" // Small Omega with Perispomeni and Ypogegrammeni
  , "ᾠ" // Small Omega with Psili and Ypogegrammeni
  , "ᾨ" // Capital Omega with Psili and Prosgegrammeni
  , "ᾤ" // Small Omega with Psili and Oxia and Ypogegrammeni
  , "ᾬ" // Capital Omega with Psili and Oxia and Prosgegrammeni
  , "ᾢ" // Small Omega with Psili and Varia and Ypogegrammeni
  , "ᾪ" // Capital Omega with Psili and Varia and Prosgegrammeni
  , "ᾦ" // Small Omega with Psili and Perispomeni and Ypogegrammeni
  , "ᾮ" // Capital Omega with Psili and Perispomeni and Prosgegrammeni
  , "ᾡ" // Small Omega with Dasia and Ypogegrammeni
  , "ᾩ" // Capital Omega with Dasia and Prosgegrammeni
  , "ᾥ" // Small Omega with Dasia and Oxia and Ypogegrammeni
  , "ᾭ" // Capital Omega with Dasia and Oxia and Prosgegrammeni
  , "ᾣ" // Small Omega with Dasia and Varia and Ypogegrammeni
  , "ᾫ" // Capital Omega with Dasia and Varia and Prosgegrammeni
  , "ᾧ" // Small Omega with Dasia and Perispomeni and Ypogegrammeni
  , "ᾯ" // Capital Omega with Dasia and Perispomeni and Prosgegrammeni
  ];

/* module */
const elements =
  { get letters()     { return Array.from(letters) }
  , get caps()        { return Array.from(caps) }
  , get punctuation() { return Array.from(punctuation) }
  , get combos()      { return Array.from(combos) }
  , get alpha()       { return Array.from(alpha) }
  , get epsilon()     { return Array.from(epsilon) }
  , get eta()         { return Array.from(eta) }
  , get iota()        { return Array.from(iota) }
  , get omicron()     { return Array.from(omicron) }
  , get rho()         { return Array.from(rho) }
  , get upsilon()     { return Array.from(upsilon) }
  , get omega()       { return Array.from(omega) }
  };

/* exports */
module.exports = elements;
