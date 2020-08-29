import Slider from "./slider";

export default class Minislider extends Slider {
  constructor(container, next, prev, activeClass, animate, autoPlay) {
    super(container, next, prev, activeClass, animate, autoPlay);
  }

  decorized() {
    this.slides.forEach((slide) => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector(".card__controls").style.opacity = ".4";
        slide.querySelector(".card__title").style.opacity = ".4";
        slide.querySelector(".card__controls-arrow").style.opacity = ".4";
      }
    });
    this.slides[0].classList.add(this.activeClass);
    if (this.animate) {
      this.slides[0].querySelector(".card__controls").style.opacity = "1";
      this.slides[0].querySelector(".card__title").style.opacity = "1";
      this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
    }
  }

  bindTriggers() {
    this.next.addEventListener("click", () => {
      this.container.appendChild(this.slides[0]);
      this.decorized();
    });

    this.prev.addEventListener("click", () => {
      let active = this.slides[this.slides.length - 1];
      this.container.insertBefore(active, this.slides[0]);
      this.decorized();
    });
  }

  init() {
    this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-items: flex-start;
    `;
    this.bindTriggers();
    this.decorized();
  }
}
