"use strict";

/* requires */
const {utils, regex} = Mary;

/* constants */
const declensions = utils.newObj();

/* functions */
const decline = entry => {
  const {id, declension, stem, cases = {}} = entry;
  const [nominative, genitive, gender, number] = id.split(regex.comma);
  const decID = getDecID(nominative, gender, declension);
  const dec = declensions[decID](nominative, stem);
  if (number) getOnlyNumber(dec, number);
  entry.cases = Object.assign(dec, cases);
};

const getDecID = (nominative, gender, declension) => {
  const isNeuter = gender === "n";
  if (declensions[declension]) return declension;
  if (declension === "1") return "1 - m/f";
  if (declension === "2" && !isNeuter) return "2 - m/f";
  if (declension === "2" && isNeuter) return "2 - n";
  if (declension === "3 - I" && !isNeuter) return "3 - I - m/f";
  if (declension === "3 - I" && isNeuter) return "3 - I - n";
  if (declension === "3 - II" && !isNeuter) return "3 - II - m/f";
  if (declension === "3 - II" && isNeuter) return "3 - II - n";
  throw new Error(`Declension not found. Check dictionary for '${nominative}'.`);
};

const getOnlyNumber = (dec, number) => {
  if (number === "s") {
    delete dec.p_nominative;
    delete dec.p_genitive;
    delete dec.p_dative;
    delete dec.p_accusative;
    delete dec.p_vocative;
    delete dec.p_ablative;
  }
  if (number === "p") {
    delete dec.s_nominative;
    delete dec.s_genitive;
    delete dec.s_dative;
    delete dec.s_accusative;
    delete dec.s_vocative;
    delete dec.s_ablative;
  }
};

declensions["1 - m/f"] = (nominative, stem) => {
  const dec = utils.newObj();
  dec.s_nominative = nominative  , dec.p_nominative = `${stem}ae`;
  dec.s_genitive =   `${stem}ae` , dec.p_genitive =   `${stem}ārum`;
  dec.s_dative =     `${stem}ae` , dec.p_dative =     `${stem}īs`;
  dec.s_accusative = `${stem}am` , dec.p_accusative = `${stem}ās`;
  dec.s_vocative =   nominative  , dec.p_vocative =   `${stem}ae`;
  dec.s_ablative =   `${stem}ā`  , dec.p_ablative =   `${stem}īs`;
  return dec;
};

declensions["2 - m/f"] = (nominative, stem) => {
  const dec = utils.newObj();
  dec.s_nominative = nominative  , dec.p_nominative = `${stem}ī`;
  dec.s_genitive =   `${stem}ī`  , dec.p_genitive =   `${stem}ōrum`;
  dec.s_dative =     `${stem}ō`  , dec.p_dative =     `${stem}īs`;
  dec.s_accusative = `${stem}um` , dec.p_accusative = `${stem}ōs`;
  dec.s_vocative =   `${stem}e`  , dec.p_vocative =   `${stem}ī`;
  dec.s_ablative =   `${stem}ō`  , dec.p_ablative =   `${stem}īs`;
  if (/er$|ir$/.test(nominative)) dec.s_vocative = nominative;
  return dec;
};

declensions["2 - n"] = (nominative, stem) => {
  const dec = utils.newObj();
  dec.s_nominative = nominative  , dec.p_nominative = `${stem}a`;
  dec.s_genitive =   `${stem}ī`  , dec.p_genitive =   `${stem}ōrum`;
  dec.s_dative =     `${stem}ō`  , dec.p_dative =     `${stem}īs`;
  dec.s_accusative = nominative  , dec.p_accusative = `${stem}a`;
  dec.s_vocative =   nominative  , dec.p_vocative =   `${stem}a`;
  dec.s_ablative =   `${stem}ō`  , dec.p_ablative =   `${stem}īs`;
  return dec;
};

declensions["3 - I - m/f"] = (nominative, stem) => {
  const dec = utils.newObj();
  dec.s_nominative = nominative  , dec.p_nominative = `${stem}ēs`;
  dec.s_genitive =   `${stem}is` , dec.p_genitive =   `${stem}um`;
  dec.s_dative =     `${stem}ī`  , dec.p_dative =     `${stem}ibus`;
  dec.s_accusative = `${stem}em` , dec.p_accusative = `${stem}ēs`;
  dec.s_vocative =   nominative  , dec.p_vocative =   `${stem}ēs`;
  dec.s_ablative =   `${stem}e`  , dec.p_ablative =   `${stem}ibus`;
  return dec;
};

declensions["3 - I - n"] = (nominative, stem) => {
  const dec = utils.newObj();
  dec.s_nominative = nominative  , dec.p_nominative = `${stem}a`;
  dec.s_genitive =   `${stem}is` , dec.p_genitive =   `${stem}um`;
  dec.s_dative =     `${stem}ī`  , dec.p_dative =     `${stem}ibus`;
  dec.s_accusative = nominative  , dec.p_accusative = `${stem}a`;
  dec.s_vocative =   nominative  , dec.p_vocative =   `${stem}a`;
  dec.s_ablative =   `${stem}e`  , dec.p_ablative =   `${stem}ibus`;
  return dec;
};

declensions["3 - II - m/f"] = (nominative, stem) => {
  const dec = utils.newObj();
  dec.s_nominative = nominative  , dec.p_nominative = `${stem}ēs`;
  dec.s_genitive =   `${stem}is` , dec.p_genitive =   `${stem}ium`;
  dec.s_dative =     `${stem}ī`  , dec.p_dative =     `${stem}ibus`;
  dec.s_accusative = `${stem}im` , dec.p_accusative = `${stem}ēs, ${stem}īs`;
  dec.s_vocative =   nominative  , dec.p_vocative =   `${stem}ēs`;
  dec.s_ablative =   `${stem}ī`  , dec.p_ablative =   `${stem}ibus`;
  return dec;
};

declensions["3 - II - n"] = (nominative, stem) => {
  const dec = utils.newObj();
  dec.s_nominative = nominative  , dec.p_nominative = `${stem}ia`;
  dec.s_genitive =   `${stem}is` , dec.p_genitive =   `${stem}ium`;
  dec.s_dative =     `${stem}ī`  , dec.p_dative =     `${stem}ibus`;
  dec.s_accusative = nominative  , dec.p_accusative = `${stem}ia`;
  dec.s_vocative =   nominative  , dec.p_vocative =   `${stem}ia`;
  dec.s_ablative =   `${stem}ī`  , dec.p_ablative =   `${stem}ibus`;
  return dec;
};

/* exports */
module.exports = decline;
