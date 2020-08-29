export default class Slider {
  constructor({
    container = null,
    btns = null,
    prev = null,
    next = null,
  } = {}) {
    this.container = document.querySelector(container);
    this.slides = this.container.children;
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.slideIndex = 1;
  }
}
