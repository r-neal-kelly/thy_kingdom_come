"use strict";

/* requires */
const {utils} = Mary;

/* constants */
const declensions = utils.newObj();
const exceptions = utils.newObj();

/* method */
const decline = ({dict}) => word => {
  let entry = dict.getWord(word);
  if (!entry) throw new Error("Word not found.");
  if (!entry.declension) throw new Error("Not declinable.");
  const dec = getDeclension(word, entry)(word, entry.genitive);
  checkForExceptions(dec);
  return dec;
};

/* functions */
const getDeclension = (nominative, {declension, gender}) => {
  let ending;
  if (declension === "1") {
    if (/a$/.test(nominative)) ending = "a";
    if (/ē$/.test(nominative)) ending = "ē";
    if (/ās$/.test(nominative)) ending = "ās";
    if (/ēs$/.test(nominative)) ending = "ēs";
  }
  if (declension === "2") {
    if (/us$/.test(nominative)) ending = "us";
    if (/er$/.test(nominative)) ending = "er";
    if (/um$/.test(nominative)) ending = "um";
  }
  if (declension === "3") {
    if (/m|f$/.test(gender)) ending = "m,f";
    if (/n$/.test(gender)) ending = "n";
  }
  if (!ending) {
    throw new Error("No declension found.");
  }
  return declensions[`${declension} - ${ending}`];
};

const checkForExceptions = dec => {
  const nom = dec.s_Nominative;
  if (exceptions[nom]) Object.assign(dec, exceptions[nom]);
};

declensions["1 - a"] = (nominative, genitive) => {
  const dec = utils.newObj();
  const stem = genitive.replace(/ae$/, "");
  dec.s_Nominative = nominative  , dec.p_Nominative = genitive;
  dec.s_Genitive = genitive      , dec.p_Genitive = `${stem}ārum`;
  dec.s_Dative = genitive        , dec.p_Dative = `${stem}īs`;
  dec.s_Accusative = `${stem}am` , dec.p_Accusative = `${stem}ās`;
  dec.s_Vocative = nominative    , dec.p_Vocative = genitive;
  dec.s_Ablative = `${stem}ā`    , dec.p_Ablative = `${stem}īs`;
  return dec;
};

declensions["2 - us"] = (nominative, genitive) => {
  const dec = utils.newObj();
  const stem = genitive.replace(/ī$/, "");
  dec.s_Nominative = nominative  , dec.p_Nominative = genitive;
  dec.s_Genitive = genitive      , dec.p_Genitive = `${stem}ōrum`;
  dec.s_Dative = `${stem}ō`      , dec.p_Dative = `${stem}īs`;
  dec.s_Accusative = `${stem}um` , dec.p_Accusative = `${stem}ōs`;
  dec.s_Vocative = `${stem}e`    , dec.p_Vocative = genitive;
  dec.s_Ablative = `${stem}ō`    , dec.p_Ablative = `${stem}īs`;
  return dec;
};

declensions["2 - er"] = (nominative, genitive) => {
  const dec = utils.newObj();
  const stem = genitive.replace(/ī$/, "");
  dec.s_Nominative = nominative  , dec.p_Nominative = genitive;
  dec.s_Genitive = genitive      , dec.p_Genitive = `${stem}ōrum`;
  dec.s_Dative = `${stem}ō`      , dec.p_Dative = `${stem}īs`;
  dec.s_Accusative = `${stem}um` , dec.p_Accusative = `${stem}ōs`;
  dec.s_Vocative = nominative    , dec.p_Vocative = genitive;
  dec.s_Ablative = `${stem}ō`    , dec.p_Ablative = `${stem}īs`;
  return dec;
};

declensions["2 - um"] = (nominative, genitive) => {
  const dec = utils.newObj();
  const stem = genitive.replace(/ī$/, "");
  dec.s_Nominative = nominative , dec.p_Nominative = `${stem}a`;
  dec.s_Genitive = genitive     , dec.p_Genitive = `${stem}ōrum`;
  dec.s_Dative = `${stem}ō`     , dec.p_Dative = `${stem}īs`;
  dec.s_Accusative = nominative , dec.p_Accusative = `${stem}a`;
  dec.s_Vocative = nominative   , dec.p_Vocative = `${stem}a`;
  dec.s_Ablative = `${stem}ō`   , dec.p_Ablative = `${stem}īs`;
  return dec;
};

declensions["3 - m,f"] = (nominative, genitive) => {
  const dec = utils.newObj();
  const stem = genitive.replace(/is$/, "");
  dec.s_Nominative = nominative  , dec.p_Nominative = `${stem}ēs`;
  dec.s_Genitive = genitive      , dec.p_Genitive = `${stem}um`;
  dec.s_Dative = `${stem}ī`      , dec.p_Dative = `${stem}ibus`;
  dec.s_Accusative = `${stem}em` , dec.p_Accusative = `${stem}ēs`;
  dec.s_Vocative = nominative    , dec.p_Vocative = `${stem}ēs`;
  dec.s_Ablative = `${stem}e`    , dec.p_Ablative = `${stem}ibus`;
  return dec;
};

declensions["3 - n"] = (nominative, genitive) => {
  const dec = utils.newObj();
  const stem = genitive.replace(/is$/, "");
  dec.s_Nominative = nominative , dec.p_Nominative = `${stem}a`;
  dec.s_Genitive = genitive     , dec.p_Genitive = `${stem}um`;
  dec.s_Dative = `${stem}ī`     , dec.p_Dative = `${stem}ibus`;
  dec.s_Accusative = nominative , dec.p_Accusative = `${stem}a`;
  dec.s_Vocative = nominative   , dec.p_Vocative = `${stem}a`;
  dec.s_Ablative = `${stem}e`   , dec.p_Ablative = `${stem}ibus`;
  return dec;
};

exceptions["meus"] = { s_Vocative: "mī" };
exceptions["fīlius"] = { s_Vocative: "fīlī" };

/* exports */
module.exports = decline;
