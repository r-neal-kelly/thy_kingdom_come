"use strict";

/* requires */
const {utils, info, regex} = Mary
const {allPuncPlus, allPuncPlusMinusSpace, endWordSigma} = regex["Greek"];

/* constants */
const toUpper =
  { "α": "Α" // Alpha
  , "β": "Β" // Beta
  , "γ": "Γ" // Gamma
  , "δ": "Δ" // Delta
  , "ε": "Ε" // Epsilon
  , "ζ": "Ζ" // Zeta
  , "η": "Η" // Eta
  , "θ": "Θ" // Theta
  , "ι": "Ι" // Iota
  , "κ": "Κ" // Kappa
  , "λ": "Λ" // Lambda
  , "μ": "Μ" // Mu
  , "ν": "Ν" // Nu
  , "ξ": "Ξ" // Xi
  , "ο": "Ο" // Omicron
  , "π": "Π" // Pi
  , "ρ": "Ρ" // Rho
  , "σ": "Σ" // Sigma
  , "ς": "Σ" // Final Sigma
  , "τ": "Τ" // Tau
  , "υ": "Υ" // Upsilon
  , "φ": "Φ" // Phi
  , "χ": "Χ" // Chi
  , "ψ": "Ψ" // Psi
  , "ω": "Ω" // Omega

  , "ά": "Ά" // Alpha with Tonos
  , "ά": "Ά" // Alpha with Oxia
  , "ὰ": "Ὰ" // Alpha with Varia
  , "ἀ": "Ἀ" // Alpha with Psili
  , "ἄ": "Ἄ" // Alpha with Psili and Oxia
  , "ἂ": "Ἂ" // Alpha with Psili and Varia
  , "ἆ": "Ἆ" // Alpha with Psili and Perispomeni
  , "ἁ": "Ἁ" // Alpha with Dasia
  , "ἅ": "Ἅ" // Alpha with Dasia and Oxia
  , "ἃ": "Ἃ" // Alpha with Dasia and Varia
  , "ἇ": "Ἇ" // Alpha with Dasia and Perispomeni
  , "ᾳ": "ᾼ" // Alpha with Ypogegrammeni
  , "ᾀ": "ᾈ" // Alpha with Psili and Ypogegrammeni
  , "ᾄ": "ᾌ" // Alpha with Psili and Oxia and Ypogegrammeni
  , "ᾂ": "ᾊ" // Alpha with Psili and Varia and Ypogegrammeni
  , "ᾆ": "ᾎ" // Alpha with Psili and Perispomeni and Ypogegrammeni
  , "ᾁ": "ᾉ" // Alpha with Dasia and Ypogegrammeni
  , "ᾅ": "ᾍ" // Alpha with Dasia and Oxia and Ypogegrammeni
  , "ᾃ": "ᾋ" // Alpha with Dasia and Varia and Ypogegrammeni
  , "ᾇ": "ᾏ" // Alpha with Dasia and Perispomeni and Ypogegrammeni
  , "ᾱ": "Ᾱ" // Alpha with Macron
  , "ᾰ": "Ᾰ" // Alpha with Vrachy

  , "έ": "Έ" // Epsilon with Tonos
  , "έ": "Έ" // Epsilon with Oxia
  , "ὲ": "Ὲ" // Epsilon with Varia
  , "ἐ": "Ἐ" // Epsilon with Psili
  , "ἔ": "Ἔ" // Epsilon with Psili and Oxia
  , "ἒ": "Ἒ" // Epsilon with Psili and Varia
  , "ἑ": "Ἑ" // Epsilon with Dasia
  , "ἕ": "Ἕ" // Epsilon with Dasia and Oxia
  , "ἓ": "Ἓ" // Epsilon with Dasia and Varia

  , "ή": "Ή" // Eta with Tonos
  , "ή": "Ή" // Eta with Oxia
  , "ὴ": "Ὴ" // Eta with Varia
  , "ἠ": "Ἠ" // Eta with Psili
  , "ἤ": "Ἤ" // Eta with Psili and Oxia
  , "ἢ": "Ἢ" // Eta with Psili and Varia
  , "ἦ": "Ἦ" // Eta with Psili and Perispomeni
  , "ἡ": "Ἡ" // Eta with Dasia
  , "ἥ": "Ἥ" // Eta with Dasia and Oxia
  , "ἣ": "Ἣ" // Eta with Dasia and Varia
  , "ἧ": "Ἧ" // Eta with Dasia and Perispomeni
  , "ῃ": "ῌ" // Eta with Ypogegrammeni
  , "ᾐ": "ᾘ" // Eta with Psili and Ypogegrammeni
  , "ᾔ": "ᾜ" // Eta with Psili and Oxia and Ypogegrammeni
  , "ᾒ": "ᾚ" // Eta with Psili and Varia and Ypogegrammeni
  , "ᾖ": "ᾞ" // Eta with Psili and Perispomeni and Ypogegrammeni
  , "ᾑ": "ᾙ" // Eta with Dasia and Ypogegrammeni
  , "ᾕ": "ᾝ" // Eta with Dasia and Oxia and Ypogegrammeni
  , "ᾓ": "ᾛ" // Eta with Dasia and Varia and Ypogegrammeni
  , "ᾗ": "ᾟ" // Eta with Dasia and Perispomeni and Ypogegrammeni

  , "ί": "Ί" // Iota with Tonos
  , "ί": "Ί" // Iota with Oxia
  , "ὶ": "Ὶ" // Iota with Varia
  , "ἰ": "Ἰ" // Iota with Psili
  , "ἴ": "Ἴ" // Iota with Psili and Oxia
  , "ἲ": "Ἲ" // Iota with Psili and Varia
  , "ἶ": "Ἶ" // Iota with Psili and Perispomeni
  , "ἱ": "Ἱ" // Iota with Dasia
  , "ἵ": "Ἵ" // Iota with Dasia and Oxia
  , "ἳ": "Ἳ" // Iota with Dasia and Varia
  , "ἷ": "Ἷ" // Iota with Dasia and Perispomeni
  , "ϊ": "Ϊ" // Iota with Dialytika
  , "ῑ": "Ῑ" // Iota with Macron
  , "ῐ": "Ῐ" // Iota with Vrachy

  , "ό": "Ό" // Omicron with Tonos
  , "ό": "Ό" // Omicron with Oxia
  , "ὸ": "Ὸ" // Omicron with Varia
  , "ὀ": "Ὀ" // Omicron with Psili
  , "ὄ": "Ὄ" // Omicron with Psili and Oxia
  , "ὂ": "Ὂ" // Omicron with Psili and Varia
  , "ὁ": "Ὁ" // Omicron with Dasia
  , "ὅ": "Ὅ" // Omicron with Dasia and Oxia
  , "ὃ": "Ὃ" // Omicron with Dasia and Varia

  , "ῥ": "Ῥ" // Rho with Dasia

  , "ύ": "Ύ" // Upsilon with Tonos
  , "ύ": "Ύ" // Upsilon with Oxia
  , "ὺ": "Ὺ" // Upsilon with Varia
  , "ὑ": "Ὑ" // Upsilon with Dasia
  , "ὕ": "Ὕ" // Upsilon with Dasia and Oxia
  , "ὓ": "Ὓ" // Upsilon with Dasia and Varia
  , "ὗ": "Ὗ" // Upsilon with Dasia and Perispomeni
  , "ϋ": "Ϋ" // Upsilon with Dialytika
  , "ῡ": "Ῡ" // Upsilon with Macron
  , "ῠ": "Ῠ" // Upsilon with Vrachy

  , "ώ": "Ώ" // Omega with Tonos
  , "ώ": "Ώ" // Omega with Oxia
  , "ὼ": "Ὼ" // Omega with Varia
  , "ὠ": "Ὠ" // Omega with Psili
  , "ὤ": "Ὤ" // Omega with Psili and Oxia
  , "ὢ": "Ὢ" // Omega with Psili and Varia
  , "ὦ": "Ὦ" // Omega with Psili and Perispomeni
  , "ὡ": "Ὡ" // Omega with Dasia
  , "ὥ": "Ὥ" // Omega with Dasia and Oxia
  , "ὣ": "Ὣ" // Omega with Dasia and Varia
  , "ὧ": "Ὧ" // Omega with Dasia and Perispomeni
  , "ῳ": "ῼ" // Omega with Ypogegrammeni
  , "ᾠ": "ᾨ" // Omega with Psili and Ypogegrammeni
  , "ᾤ": "ᾬ" // Omega with Psili and Oxia and Ypogegrammeni
  , "ᾢ": "ᾪ" // Omega with Psili and Varia and Ypogegrammeni
  , "ᾦ": "ᾮ" // Omega with Psili and Perispomeni and Ypogegrammeni
  , "ᾡ": "ᾩ" // Omega with Dasia and Ypogegrammeni
  , "ᾥ": "ᾭ" // Omega with Dasia and Oxia and Ypogegrammeni
  , "ᾣ": "ᾫ" // Omega with Dasia and Varia and Ypogegrammeni
  , "ᾧ": "ᾯ" // Omega with Dasia and Perispomeni and Ypogegrammeni

  // uses combining marks
  , "ᾶ": "Α͂" // Alpha with Perispomeni
  , "ᾴ": "Άͅ" // Alpha with Oxia and Ypogegrammeni
  , "ᾲ": "Ὰͅ" // Alpha with Varia and Ypogegrammeni
  , "ᾷ": "ᾼ͂" // Alpha with Perispomeni and Ypogegrammeni

  , "ῆ": "Η͂" // Eta with Perispomeni
  , "ῄ": "Ήͅ" // Eta with Oxia and Ypogegrammeni
  , "ῂ": "Ὴͅ" // Eta with Varia and Ypogegrammeni
  , "ῇ": "ῌ͂" // Eta with Perispomeni and Ypogegrammeni

  , "ΐ": "Ϊ́" // Iota with Dialytika and Tonos
  , "ῖ": "Ι͂" // Iota with Perispomeni
  , "ΐ": "Ϊ́" // Iota with Dialytika and Oxia
  , "ῒ": "Ϊ̀" // Iota with Dialytika and Varia
  , "ῗ": "Ϊ͂" // Iota with Dialytika and Perispomeni

  , "ῤ": "Ρ̓" // Rho with Psili

  , "ΰ": "Ϋ́" // Upsilon with Dialytika and Tonos
  , "ῦ": "Υ͂" // Upsilon with Perispomeni
  , "ὐ": "Υ̓" // Upsilon with Psili
  , "ὔ": "Ύ̓" // Upsilon with Psili and Oxia
  , "ὒ": "Ὺ̓" // Upsilon with Psili and Varia
  , "ὖ": "Υ̓͂" // Upsilon with Psili and Perispomeni
  , "ΰ": "Ϋ́" // Upsilon with Dialytika and Oxia
  , "ῢ": "Ϋ̀" // Upsilon with Dialytika and Varia
  , "ῧ": "Ϋ͂" // Upsilon with Dialytika and Perispomeni

  , "ῶ": "Ω͂" // Omega with Perispomeni
  , "ῴ": "Ώͅ" // Omega with Oxia and Ypogegrammeni
  , "ῲ": "Ὼͅ" // Omega with Varia and Ypogegrammeni
  , "ῷ": "ῼ͂" // Omega with Perispomeni and Ypogegrammeni
  };

const toLower = (() => {
  const dict = {};
  const toU = Object.entries(toUpper);
  for (let [l, u] of toU) dict[u] = l;
  dict["Σ"] = "σ";
  return dict;
})();

const toMonotonic =
  { "ά": "ά" // Small Alpha with Oxia -> Tonos
  , "έ": "έ" // Small Epsilon with Oxia -> Tonos
  , "ή": "ή" // Small Eta with Oxia -> Tonos
  , "ί": "ί" // Small Iota with Oxia -> Tonos
  , "ό": "ό" // Small Omicron with Oxia -> Tonos
  , "ύ": "ύ" // Small Upsilon with Oxia -> Tonos
  , "ώ": "ώ" // Small Omega with Oxia -> Tonos
  , "Ά": "Ά" // Capital Alpha with Oxia -> Tonos
  , "Έ": "Έ" // Capital Epsilon with Oxia -> Tonos
  , "Ή": "Ή" // Capital Eta with Oxia -> Tonos
  , "Ί": "Ί" // Capital Iota with Oxia -> Tonos
  , "Ό": "Ό" // Capital Omicron with Oxia -> Tonos
  , "Ύ": "Ύ" // Capital Upsilon with Oxia -> Tonos
  , "Ώ": "Ώ" // Capital Omega with Oxia -> Tonos

  , "ὰ": "ά" // Small Alpha with Varia -> Tonos
  , "ὲ": "έ" // Small Epsilon with Varia -> Tonos
  , "ὴ": "ή" // Small Eta with Varia -> Tonos
  , "ὶ": "ί" // Small Iota with Varia -> Tonos
  , "ὸ": "ό" // Small Omicron with Varia -> Tonos
  , "ὺ": "ύ" // Small Upsilon with Varia -> Tonos
  , "ὼ": "ώ" // Small Omega with Varia -> Tonos
  , "Ὰ": "Ά" // Capital Alpha with Varia -> Tonos
  , "Ὲ": "Έ" // Capital Epsilon with Varia -> Tonos
  , "Ὴ": "Ή" // Capital Eta with Varia -> Tonos
  , "Ὶ": "Ί" // Capital Iota with Varia -> Tonos
  , "Ὸ": "Ό" // Capital Omicron with Varia -> Tonos
  , "Ὺ": "Ύ" // Capital Upsilon with Varia -> Tonos
  , "Ὼ": "Ώ" // Capital Omega with Varia -> Tonos

  , "ᾶ": "ά" // Small Alpha with Perispomeni -> Tonos
  , "ῆ": "ή" // Small Eta with Perispomeni -> Tonos
  , "ῖ": "ί" // Small Iota with Perispomeni -> Tonos
  , "ῦ": "ύ" // Small Upsilon with Perispomeni -> Tonos
  , "ῶ": "ώ" // Small Omega with Perispomeni -> Tonos

  , "ἀ": "α" // Small Alpha with Psili -> Reg
  , "ἐ": "ε" // Small Epsilon with Psili -> Reg
  , "ἠ": "η" // Small Eta with Psili -> Reg
  , "ἰ": "ι" // Small Iota with Psili -> Reg
  , "ὀ": "ο" // Small Omicron with Psili -> Reg
  , "ὐ": "υ" // Small Upsilon with Psili -> Reg
  , "ὠ": "ω" // Small Omega with Psili -> Reg
  , "ῤ": "ρ" // Small Rho with Psili -> Reg
  , "Ἀ": "Α" // Capital Alpha with Psili -> Reg
  , "Ἐ": "Ε" // Capital Epsilon with Psili -> Reg
  , "Ἠ": "Η" // Capital Eta with Psili -> Reg
  , "Ἰ": "Ι" // Capital Iota with Psili -> Reg
  , "Ὀ": "Ο" // Capital Omicron with Psili -> Reg
  , "Ὠ": "Ω" // Capital Omega with Psili -> Reg

  , "ἄ": "ά" // Small Alpha with Psili and Oxia -> Tonos
  , "ἔ": "έ" // Small Epsilon with Psili and Oxia -> Tonos
  , "ἤ": "ή" // Small Eta with Psili and Oxia -> Tonos
  , "ἴ": "ί" // Small Iota with Psili and Oxia -> Tonos
  , "ὄ": "ό" // Small Omicron with Psili and Oxia -> Tonos
  , "ὔ": "ύ" // Small Upsilon with Psili and Oxia -> Tonos
  , "ὤ": "ώ" // Small Omega with Psili and Oxia -> Tonos
  , "Ἄ": "Ά" // Capital Alpha with Psili and Oxia -> Tonos
  , "Ἔ": "Έ" // Capital Epsilon with Psili and Oxia -> Tonos
  , "Ἤ": "Ή" // Capital Eta with Psili and Oxia -> Tonos
  , "Ἴ": "Ί" // Capital Iota with Psili and Oxia -> Tonos
  , "Ὄ": "Ό" // Capital Omicron with Psili and Oxia -> Tonos
  , "Ὤ": "Ώ" // Capital Omega with Psili and Oxia -> Tonos

  , "ἂ": "ά" // Small Alpha with Psili and Varia -> Tonos
  , "ἒ": "έ" // Small Epsilon with Psili and Varia -> Tonos
  , "ἢ": "ή" // Small Eta with Psili and Varia -> Tonos
  , "ἲ": "ί" // Small Iota with Psili and Varia -> Tonos
  , "ὂ": "ό" // Small Omicron with Psili and Varia -> Tonos
  , "ὒ": "ύ" // Small Upsilon with Psili and Varia -> Tonos
  , "ὢ": "ώ" // Small Omega with Psili and Varia -> Tonos
  , "Ἂ": "Ά" // Capital Alpha with Psili and Varia -> Tonos
  , "Ἒ": "Έ" // Capital Epsilon with Psili and Varia -> Tonos
  , "Ἢ": "Ή" // Capital Eta with Psili and Varia -> Tonos
  , "Ἲ": "Ί" // Capital Iota with Psili and Varia -> Tonos
  , "Ὂ": "Ό" // Capital Omicron with Psili and Varia -> Tonos
  , "Ὢ": "Ώ" // Capital Omega with Psili and Varia -> Tonos

  , "ἆ": "ά" // Small Alpha with Psili and Perispomeni -> Tonos
  , "ἦ": "ή" // Small Eta with Psili and Perispomeni -> Tonos
  , "ἶ": "ί" // Small Iota with Psili and Perispomeni -> Tonos
  , "ὖ": "ύ" // Small Upsilon with Psili and Perispomeni -> Tonos
  , "ὦ": "ώ" // Small Omega with Psili and Perispomeni -> Tonos
  , "Ἆ": "Ά" // Capital Alpha with Psili and Perispomeni -> Tonos
  , "Ἦ": "Ή" // Capital Eta with Psili and Perispomeni -> Tonos
  , "Ἶ": "Ί" // Capital Iota with Psili and Perispomeni -> Tonos
  , "Ὦ": "Ώ" // Capital Omega with Psili and Perispomeni -> Tonos

  , "ἁ": "α" // Small Alpha with Dasia -> Reg
  , "ἑ": "ε" // Small Epsilon with Dasia -> Reg
  , "ἡ": "η" // Small Eta with Dasia -> Reg
  , "ἱ": "ι" // Small Iota with Dasia -> Reg
  , "ὁ": "ο" // Small Omicron with Dasia -> Reg
  , "ὑ": "υ" // Small Upsilon with Dasia -> Reg
  , "ὡ": "ω" // Small Omega with Dasia -> Reg
  , "ῥ": "ρ" // Small Rho with Dasia -> Reg
  , "Ἁ": "Α" // Capital Alpha with Dasia -> Reg
  , "Ἑ": "Ε" // Capital Epsilon with Dasia -> Reg
  , "Ἡ": "Η" // Capital Eta with Dasia -> Reg
  , "Ἱ": "Ι" // Capital Iota with Dasia -> Reg
  , "Ὁ": "Ο" // Capital Omicron with Dasia -> Reg
  , "Ὑ": "Υ" // Capital Upsilon with Dasia -> Reg
  , "Ὡ": "Ω" // Capital Omega with Dasia -> Reg
  , "Ῥ": "Ρ" // Capital Rho with Dasia -> Reg

  , "ἅ": "ά" // Small Alpha with Dasia and Oxia -> Tonos
  , "ἕ": "έ" // Small Epsilon with Dasia and Oxia -> Tonos
  , "ἥ": "ή" // Small Eta with Dasia and Oxia -> Tonos
  , "ἵ": "ί" // Small Iota with Dasia and Oxia -> Tonos
  , "ὅ": "ό" // Small Omicron with Dasia and Oxia -> Tonos
  , "ὕ": "ύ" // Small Upsilon with Dasia and Oxia -> Tonos
  , "ὥ": "ώ" // Small Omega with Dasia and Oxia -> Tonos
  , "Ἅ": "Ά" // Capital Alpha with Dasia and Oxia -> Tonos
  , "Ἕ": "Έ" // Capital Epsilon with Dasia and Oxia -> Tonos
  , "Ἥ": "Ή" // Capital Eta with Dasia and Oxia -> Tonos
  , "Ἵ": "Ί" // Capital Iota with Dasia and Oxia -> Tonos
  , "Ὅ": "Ό" // Capital Omicron with Dasia and Oxia -> Tonos
  , "Ὕ": "Ύ" // Capital Upsilon with Dasia and Oxia -> Tonos
  , "Ὥ": "Ώ" // Capital Omega with Dasia and Oxia -> Tonos

  , "ἃ": "ά" // Small Alpha with Dasia and Varia -> Tonos
  , "ἓ": "έ" // Small Epsilon with Dasia and Varia -> Tonos
  , "ἣ": "ή" // Small Eta with Dasia and Varia -> Tonos
  , "ἳ": "ί" // Small Iota with Dasia and Varia -> Tonos
  , "ὃ": "ό" // Small Omicron with Dasia and Varia -> Tonos
  , "ὓ": "ύ" // Small Upsilon with Dasia and Varia -> Tonos
  , "ὣ": "ώ" // Small Omega with Dasia and Varia -> Tonos
  , "Ἃ": "Ά" // Capital Alpha with Dasia and Varia -> Tonos
  , "Ἓ": "Έ" // Capital Epsilon with Dasia and Varia -> Tonos
  , "Ἣ": "Ή" // Capital Eta with Dasia and Varia -> Tonos
  , "Ἳ": "Ί" // Capital Iota with Dasia and Varia -> Tonos
  , "Ὃ": "Ό" // Capital Omicron with Dasia and Varia -> Tonos
  , "Ὓ": "Ύ" // Capital Upsilon with Dasia and Varia -> Tonos
  , "Ὣ": "Ώ" // Capital Omega with Dasia and Varia -> Tonos

  , "ἇ": "ά" // Small Alpha with Dasia and Perispomeni -> Tonos
  , "ἧ": "ή" // Small Eta with Dasia and Perispomeni -> Tonos
  , "ἷ": "ί" // Small Iota with Dasia and Perispomeni -> Tonos
  , "ὗ": "ύ" // Small Upsilon with Dasia and Perispomeni -> Tonos
  , "ὧ": "ώ" // Small Omega with Dasia and Perispomeni -> Tonos
  , "Ἇ": "Ά" // Capital Alpha with Dasia and Perispomeni -> Tonos
  , "Ἧ": "Ή" // Capital Eta with Dasia and Perispomeni -> Tonos
  , "Ἷ": "Ί" // Capital Iota with Dasia and Perispomeni -> Tonos
  , "Ὗ": "Ύ" // Capital Upsilon with Dasia and Perispomeni -> Tonos
  , "Ὧ": "Ώ" // Capital Omega with Dasia and Perispomeni -> Tonos

  , "ᾳ": "α" // Small Alpha with Ypogegrammeni -> Reg
  , "ῃ": "η" // Small Eta with Ypogegrammeni -> Reg
  , "ῳ": "ω" // Small Omega with Ypogegrammeni -> Reg
  , "ᾼ": "Α" // Capital Alpha with Prosgegrammeni -> Reg
  , "ῌ": "Η" // Capital Eta with Prosgegrammeni -> Reg
  , "ῼ": "Ω" // Capital Omega with Prosgegrammeni -> Reg

  , "ᾴ": "ά" // Small Alpha with Oxia and Ypogegrammeni -> Tonos
  , "ῄ": "ή" // Small Eta with Oxia and Ypogegrammeni -> Tonos
  , "ῴ": "ώ" // Small Omega with Oxia and Ypogegrammeni -> Tonos

  , "ᾲ": "ά" // Small Alpha with Varia and Ypogegrammeni -> Tonos
  , "ῂ": "ή" // Small Eta with Varia and Ypogegrammeni -> Tonos
  , "ῲ": "ώ" // Small Omega with Varia and Ypogegrammeni -> Tonos

  , "ᾷ": "ά" // Small Alpha with Perispomeni and Ypogegrammeni -> Tonos
  , "ῇ": "ή" // Small Eta with Perispomeni and Ypogegrammeni -> Tonos
  , "ῷ": "ώ" // Small Omega with Perispomeni and Ypogegrammeni -> Tonos

  , "ᾀ": "α" // Small Alpha with Psili and Ypogegrammeni -> Reg
  , "ᾐ": "η" // Small Eta with Psili and Ypogegrammeni -> Reg
  , "ᾠ": "ω" // Small Omega with Psili and Ypogegrammeni -> Reg
  , "ᾈ": "Α" // Capital Alpha with Psili and Prosgegrammeni -> Reg
  , "ᾘ": "Η" // Capital Eta with Psili and Prosgegrammeni -> Reg
  , "ᾨ": "Ω" // Capital Omega with Psili and Prosgegrammeni -> Reg

  , "ᾄ": "ά" // Small Alpha with Psili and Oxia and Ypogegrammeni -> Tonos
  , "ᾔ": "ή" // Small Eta with Psili and Oxia and Ypogegrammeni -> Tonos
  , "ᾤ": "ώ" // Small Omega with Psili and Oxia and Ypogegrammeni -> Tonos
  , "ᾌ": "Ά" // Capital Alpha with Psili and Oxia and Prosgegrammeni -> Tonos
  , "ᾜ": "Ή" // Capital Eta with Psili and Oxia and Prosgegrammeni -> Tonos
  , "ᾬ": "Ώ" // Capital Omega with Psili and Oxia and Prosgegrammeni -> Tonos

  , "ᾂ": "ά" // Small Alpha with Psili and Varia and Ypogegrammeni -> Tonos
  , "ᾒ": "ή" // Small Eta with Psili and Varia and Ypogegrammeni -> Tonos
  , "ᾢ": "ώ" // Small Omega with Psili and Varia and Ypogegrammeni -> Tonos
  , "ᾊ": "Ά" // Capital Alpha with Psili and Varia and Prosgegrammeni -> Tonos
  , "ᾚ": "Ή" // Capital Eta with Psili and Varia and Prosgegrammeni -> Tonos
  , "ᾪ": "Ώ" // Capital Omega with Psili and Varia and Prosgegrammeni -> Tonos

  , "ᾆ": "ά" // Small Alpha with Psili and Perispomeni and Ypogegrammeni -> Tonos
  , "ᾖ": "ή" // Small Eta with Psili and Perispomeni and Ypogegrammeni -> Tonos
  , "ᾦ": "ώ" // Small Omega with Psili and Perispomeni and Ypogegrammeni -> Tonos
  , "ᾎ": "Ά" // Capital Alpha with Psili and Perispomeni and Prosgegrammeni -> Tonos
  , "ᾞ": "Ή" // Capital Eta with Psili and Perispomeni and Prosgegrammeni -> Tonos
  , "ᾮ": "Ώ" // Capital Omega with Psili and Perispomeni and Prosgegrammeni -> Tonos

  , "ᾁ": "α" // Small Alpha with Dasia and Ypogegrammeni -> Reg
  , "ᾑ": "η" // Small Eta with Dasia and Ypogegrammeni -> Reg
  , "ᾡ": "ω" // Small Omega with Dasia and Ypogegrammeni -> Reg
  , "ᾉ": "Α" // Capital Alpha with Dasia and Prosgegrammeni -> Reg
  , "ᾙ": "Η" // Capital Eta with Dasia and Prosgegrammeni -> Reg
  , "ᾩ": "Ω" // Capital Omega with Dasia and Prosgegrammeni -> Reg

  , "ᾅ": "ά" // Small Alpha with Dasia and Oxia and Ypogegrammeni -> Tonos
  , "ᾕ": "ή" // Small Eta with Dasia and Oxia and Ypogegrammeni -> Tonos
  , "ᾥ": "ώ" // Small Omega with Dasia and Oxia and Ypogegrammeni -> Tonos
  , "ᾍ": "Ά" // Capital Alpha with Dasia and Oxia and Prosgegrammeni -> Tonos
  , "ᾝ": "Ή" // Capital Eta with Dasia and Oxia and Prosgegrammeni -> Tonos
  , "ᾭ": "Ώ" // Capital Omega with Dasia and Oxia and Prosgegrammeni -> Tonos

  , "ᾃ": "ά" // Small Alpha with Dasia and Varia and Ypogegrammeni -> Tonos
  , "ᾓ": "ή" // Small Eta with Dasia and Varia and Ypogegrammeni -> Tonos
  , "ᾣ": "ώ" // Small Omega with Dasia and Varia and Ypogegrammeni -> Tonos
  , "ᾋ": "Ά" // Capital Alpha with Dasia and Varia and Prosgegrammeni -> Tonos
  , "ᾛ": "Ή" // Capital Eta with Dasia and Varia and Prosgegrammeni -> Tonos
  , "ᾫ": "Ώ" // Capital Omega with Dasia and Varia and Prosgegrammeni -> Tonos

  , "ᾇ": "ά" // Small Alpha with Dasia and Perispomeni and Ypogegrammeni -> Tonos
  , "ᾗ": "ή" // Small Eta with Dasia and Perispomeni and Ypogegrammeni -> Tonos
  , "ᾧ": "ώ" // Small Omega with Dasia and Perispomeni and Ypogegrammeni -> Tonos
  , "ᾏ": "Ά" // Capital Alpha with Dasia and Perispomeni and Prosgegrammeni -> Tonos
  , "ᾟ": "Ή" // Capital Eta with Dasia and Perispomeni and Prosgegrammeni -> Tonos
  , "ᾯ": "Ώ" // Capital Omega with Dasia and Perispomeni and Prosgegrammeni -> Tonos

  , "ϊ": "ϊ" // Small Iota with Dialytika -> Same
  , "ϋ": "ϋ" // Small Upsilon with Dialytika -> Same
  , "Ϊ": "Ϊ" // Capital Iota with Dialytika -> Same
  , "Ϋ": "Ϋ" // Capital Upsilon with Dialytika -> Same

  , "ΐ": "ΐ" // Small Iota with Dialytika and Oxia -> Dialytika w/ Tonos
  , "ΰ": "ΰ" // Small Upsilon with Dialytika and Oxia -> Dialytika w/ Tonos

  , "ῒ": "ΐ" // Small Iota with Dialytika and Varia -> Dialytika w/ Tonos
  , "ῢ": "ΰ" // Small Upsilon with Dialytika and Varia -> Dialytika w/ Tonos

  , "ῗ": "ΐ" // Small Iota with Dialytika and Perispomeni -> Dialytika w/ Tonos
  , "ῧ": "ΰ" // Small Upsilon with Dialytika and Perispomeni -> Dialytika w/ Tonos

  , "ᾱ": "ᾱ" // Small Alpha with Macron -> Same
  , "ῑ": "ῑ" // Small Iota with Macron -> Same
  , "ῡ": "ῡ" // Small Upsilon with Macron -> Same
  , "Ᾱ": "Ᾱ" // Capital Alpha with Macron -> Same
  , "Ῑ": "Ῑ" // Capital Iota with Macron -> Same
  , "Ῡ": "Ῡ" // Capital Upsilon with Macron -> Same

  , "ᾰ": "ᾰ" // Small Alpha with Vrachy -> Same
  , "ῐ": "ῐ" // Small Iota with Vrachy -> Same
  , "ῠ": "ῠ" // Small Upsilon with Vrachy -> Same
  , "Ᾰ": "Ᾰ" // Capital Alpha with Vrachy -> Same
  , "Ῐ": "Ῐ" // Capital Iota with Vrachy -> Same
  , "Ῠ": "Ῠ" // Capital Upsilon with Vrachy -> Same
  };

const toAtonic = (() => {
  const dict = {};
  const elems = info.getElements("Greek");
  const {letters} = elems;
  const tonics = [ "alpha", "epsilon", "eta", "iota"
                 , "omicron", "rho", "upsilon", "omega" ];
  for (let tonic of tonics) {
    const chars = elems[tonic];
    for (let char of chars) {
      const value = (letters.includes(char)) ?
        chars[0] : chars[1]; // 0 = small, 1 = cap;
      dict[char] = value;
    }
  }
  return dict;
})();

const toOxia =
  { "ά": "ά" // Small Alpha with Tonos -> Oxia
  , "Ά": "Ά" // Capital Alpha with Tonos -> Oxia
  , "έ": "έ" // Small Epsilon with Tonos -> Oxia
  , "Έ": "Έ" // Capital Epsilon with Tonos -> Oxia
  , "ή": "ή" // Small Eta with Tonos -> Oxia
  , "Ή": "Ή" // Capital Eta with Tonos -> Oxia
  , "ί": "ί" // Small Iota with Tonos -> Oxia
  , "Ί": "Ί" // Capital Iota with Tonos -> Oxia
  , "ΐ": "ΐ" // Small Iota with Dialytika and Tonos -> Dialytika w/ Oxia
  , "ό": "ό" // Small Omicron with Tonos -> Oxia
  , "Ό": "Ό" // Capital Omicron with Tonos -> Oxia
  , "ύ": "ύ" // Small Upsilon with Tonos -> Oxia
  , "Ύ": "Ύ" // Capital Upsilon with Tonos -> Oxia
  , "ΰ": "ΰ" // Small Upsilon with Dialytika and Tonos -> Dialytika w/ Oxia
  , "ώ": "ώ" // Small Omega with Tonos -> Oxia
  , "Ώ": "Ώ" // Capital Omega with Tonos -> Oxia
  };

const toTonos = (() => {
  const dict = {};
  const toO = Object.entries(toOxia);
  for (let [t, o] of toO) dict[o] = t;
  return dict;
})();

/* functions */
const byRegex = (regex, str) => str.replace(regex, "");

const byDict = (dict, str) => {
  const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
  for (let key of keys) {
    str = str.replace(new RegExp(key, "g"), dict[key]);
  }
  return str;
};

/* filters */
const filters = utils.newObj();
filters["Polytonic"] = str => str;
filters["Monotonic"] = str => byDict(toMonotonic, str);
filters["Atonic"] = str => byDict(toAtonic, str);
filters["Normalize"] = str => byDict(toOxia, str);
filters["Oxia"] = str => byDict(toOxia, str);
filters["Tonos"] = str => byDict(toTonos, str);
filters["Upper Case"] = str => byDict(toUpper, str);
filters["Lower Case"] = str => byDict(toLower, str).replace(endWordSigma, "ς");
filters["No Punc"] = str => byRegex(allPuncPlusMinusSpace, str);
filters["No Punc+"] = str => byRegex(allPuncPlus, str);
filters["Majuscule"] = str => filter(["No Punc", "Atonic", "Upper Case"], str);
filters["Minuscule"] = str => filter(["No Punc", "Atonic", "Lower Case"], str);
filters["Majuscule+"] = str => filter(["No Punc+", "Atonic", "Upper Case"], str);
filters["Minuscule+"] = str => filter(["No Punc+", "Atonic", "Lower Case"], str);

const filter = (types, str) => {
  types = [].concat(types);
  for (let type of types) {
    if (filters[type]) str = filters[type](str);
  }
  return str;
};

/* exports */
module.exports = filter;
