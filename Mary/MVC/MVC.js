"use strict";

/* requires */
const {utils} = Mary;

/* constants */
const initErr = new Error("Control proto must have an 'init' method.");

/* constructor */
const MVC = (mProto, vProto, cProto) => (data) => {
  if (!utils.isFunction(cProto.init)) throw initErr;
  const model = utils.newObj(mProto);
  const view = utils.newObj(vProto);
  const control = utils.newObj(cProto);
  for (let module of [model, view, control]) {
    Object.defineProperties(module,
      { "m":       { get: () => model   }
      , "v":       { get: () => view    }
      , "c":       { get: () => control }
      }
    );
  }
  return control.init(data);
};

/* exports */
module.exports = MVC;
