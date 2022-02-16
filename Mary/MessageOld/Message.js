"use strict";

/* requires */
const {newObj, isNumber} = Mary.require("Utils");

/* constants */
const pubSubs = newObj();
const registers = [];

/* constructor */
const PubSub = (id = "Mary") => {
  if (pubSubs[id]) return pubSubs[id];
  const pubSub = newObj();
  const messages = newObj();
  const register = [];
  pubSubs[id] = pubSub;
  registers[id] = register;
  pubSub.id = id;
  pubSub.pub = pub(messages);
  pubSub.sub = sub(messages);
  pubSub.list = list(register);
  pubSub.constructor = PubSub;
  return pubSub;
};

PubSub.list = () => Array.from(registers);

/* functions */
const registrate = (id, msg, num) => {
  const registration = `${msg}, ${num}`;
  registers[id].push(registration);
  registers.push(`${id}, ${registration}`);
};

/* methods */
const pub = messages => function (message, ...data) {
  // 1 is invoked after 0, and 0 after -1, etc.
  if (!messages[message]) {
    return;
  }
  let priorities = Object.keys(messages[message])
    .map(function (key) {
      return Number(key);
    })
    .sort();
  priorities.forEach(function (priority) {
    messages[message][priority].forEach(function (callback) {
      callback(...data);
    });
  });
};

const sub = messages => function (message, callback, priority) {
  if (!messages[message]) {
    messages[message] = newObj();
  }
  if (!isNumber(priority)) {
    priority = 0;
  }
  if (!messages[message][priority]) {
    messages[message][priority] = [];
  }
  messages[message][priority].push(callback);
  registrate(this.id, message, priority);
};

const list = register => function () {
  return Array.from(register);
};

/* exports */
module.exports = PubSub;
