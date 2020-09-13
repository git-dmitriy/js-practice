import $ from "../core";

$.prototype.html = function (content) {
  for (let i = 0; i < this.length; i++) {
    if (content) {
      return (this[i].innerHTML = content);
    } else {
      return this[i].innerHTML;
    }
  }
  return this;
};

$.prototype.eq = function (i) {
  const swap = this[i];
  const objLength = Object.keys(this).length;

  for (let i = 0; i < objLength; i++) {
    delete this[i];
  }
  this[0] = swap;
  this.length = 1;
  return this;
};

$.prototype.index = function () {
  const parent = this[0].parentNode;
  const childs = [...parent.children];

  const findMyIndex = (item) => {
    return item == this[0];
  };

  return childs.findIndex(findMyIndex);
};

$.prototype.find = function (selector) {
  let numberOfItems = 0;
  let counter = 0;

  const copyObj = Object.assign({}, this);

  for (let i = 0; i < copyObj.length; i++) {
    const arr = document.querySelectorAll(selector);
    if (arr.length == 0) {
      continue;
    }
    for (let j = 0; j < arr.length; j++) {
      this[counter] = arr[j];
      counter++;
    }
    numberOfItems += arr.length;
  }
  this.length = numberOfItems;

  const objLength = Object.keys(this).length;

  for (; numberOfItems < objLength; numberOfItems++) {
    delete this[numberOfItems];
  }

  return this;
};

$.prototype.closest = function (selector) {
  let counter = 0;
  for (let i = 0; i < this.length; i++) {
    if (this[i].closest(selector) === null) {
      continue;
    } else {
      this[i] = this[i].closest(selector);
      counter++;
    }
  }
  this.length = counter;
  const objLength = Object.keys(this).length;
  for (; counter < objLength; counter++) {
    delete this[counter];
  }

  return this;
};
