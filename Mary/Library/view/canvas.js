"use strict";

/* requires */
const utils = Mary.require("Utils");
const msg = Mary.require("Msg")("Library");

/* variables */
let canvas, ctx;
let img, imgW, imgH, imgX, imgY;
let x = 0, y = 0, z = 1, r = 0;
let on = true;

/* functions */
const clear = () => {
  ctx.save();
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
};
const draw = () => {
  round();
  clear();
  if (!on) return;
  ctx.save();
  ctx.scale(z, z);
  ctx.translate(x, y);
  ctx.rotate(r);
  ctx.drawImage(img, imgX, imgY);
  ctx.restore();
};
const round = () => {
  x = utils.round(x, 0);
  y = utils.round(y, 0);
  z = utils.round(z, 2);
  r = utils.round(r, 5);
};
const getWidthLimit = () => (canvas.width / 2 / z) + (imgW / 2.25);
const getHeightLimit = () => (canvas.height / 2 / z) + (imgH / 2.25);
const getCoordinates = () => ({x, y, z, r});

/* listeners */
const onImgLoad = e => {
  imgW = img.width;
  imgH = img.height;
  imgX = -(imgW / 2);
  imgY = -(imgH / 2);
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  draw();
};
const onMouseMove = e => {
  if (e.buttons !== 1) return;
  const w = getWidthLimit();
  const h = getHeightLimit();
  x += e.movementX * 2 / z;
  y += e.movementY * 2 / z;
  x = (x > w) ? w : x;
  x = (x < -w) ? -w: x;
  y = (y > h) ? h : y;
  y = (y < -h) ? -h : y;
  draw();
};
const onWheel = e => {
  e.preventDefault();
  z = (e.wheelDelta > 0) ? z + 0.05 : z - 0.05;
  z = (z < 0.3) ? 0.3 : z;
  z = (z > 4.0) ? 4.0 : z;
  draw();
};
const onWinResize = e => {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  draw();
};
const onBeforeUnload = e => {
  msg.pub("bookmark", getCoordinates());
  msg.pub("leave-library");
};

/* subscriptions */
msg.sub("set-coordinates", coordinates => {
  x = coordinates.x || 0;
  y = coordinates.y || 0;
  z = coordinates.z || 0.3;
  r = coordinates.r || 0;
});
msg.sub("request-book", title => {
  on = true;
  msg.pub("bookmark", getCoordinates());
  msg.pub("loan-book", {img, title});
});
msg.sub("request-coordinates", (info = {}) => {
  Object.assign(info, getCoordinates());
  msg.pub("add-bookmark", info);
});
msg.sub("close-canvas", () => {
  msg.pub("bookmark", getCoordinates());
  on = false;
  draw();
});
msg.sub("rotate-page-left", () =>{
  if (r < -4) r = 0;
  else r -= 90 * Math.PI / 180;
  draw();
});
msg.sub("rotate-page-right", () =>{
  if (r > 4) r = 0;
  else r += 90 * Math.PI / 180;
  draw();
});

/* initialize */
msg.sub("initialize-view", () => {
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  img = new Image();

  document.body.appendChild(canvas);
  ctx.imageSmoothingQuality = "high";
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  img.addEventListener("load", onImgLoad);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("wheel", onWheel);
  window.addEventListener("resize", onWinResize);
  window.addEventListener("beforeunload", onBeforeUnload);
});

/* exports */
module.exports = true;
