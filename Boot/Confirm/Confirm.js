"use strict";

/* requires */
const {dialog} = require("electron");

/* constants */
const confirm = {};

/* methods */
confirm.onClose = () => {
  return dialog.showMessageBox(null,
    { type: "question"
    , buttons: ["Yes", "No"]
    , defaultId: 1
    , message: "Sure you want to close?"
    , cancelId: 1
    }
  );
};

/* exports */
module.exports = confirm;
