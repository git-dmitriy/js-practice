import $ from "../core";

$.prototype.show = function (model = "block") {
  for (let i = 0; i < this.length; i++) {
    if (!this[i].style) {
      continue;
    }
    this[i].style.display = model;
  }
  return this;
};

$.prototype.hide = function () {
  for (let i = 0; i < this.length; i++) {
    if (!this[i].style) {
      continue;
    }
    this[i].style.display = "none";
  }
  return this;
};

$.prototype.toggle = function (model = "block") {
  for (let i = 0; i < this.length; i++) {
    if (!this[i].style) {
      continue;
    }

    if (this[i].style.display === "none") {
      this[i].style.display = model;
    }
    this[i].style.display = "none";
  }
  return this;
};
