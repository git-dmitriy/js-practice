import $ from "../core";

$.prototype.addAttribute = function (attr, value = "") {
  if (!attr) {
    return this;
  }
  for (let i = 0; i < this.length; i++) {
    this[i].setAttribute(attr, value);
  }
  return this;
};

$.prototype.removeAttribute = function (attrName) {
  if (!attrName) {
    return this;
  }
  for (let i = 0; i < this.length; i++) {
    this[i].removeAttribute(attrName);
  }
  return this;
};

$.prototype.toggleAtrribute = function (attrName) {
  if (!attrName) {
    return this;
  }
  for (let i = 0; i < this.length; i++) {
    this[i].toggleAttribute(attrName);
  }
  return this;
};
