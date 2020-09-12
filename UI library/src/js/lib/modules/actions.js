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
