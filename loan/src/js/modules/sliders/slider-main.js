import Slider from "./slider";

export default class MainSlider extends Slider {
  constructor(btns) {
    super(btns);
  }

  showSlides(n, direction) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    try {
      if (n === 3) {
        this.hanson.style.opacity = "0";
        this.hanson.classList.add("animated");
        setTimeout(() => {
          this.hanson.style.opacity = "1";
          this.hanson.classList.add("slideInUp");
          this.hanson.addEventListener("animationend", () => {
            this.hanson.classList.remove("slideInUp");
          });
        }, 1500);
      }
    } catch (e) {}

    this.slides.forEach((slide) => {
      slide.style.display = "none";
      slide.classList.add("animated");
      slide.style.setProperty("animation-duration", ".5s");
    });

    this.slides[this.slideIndex - 1].style.display = "block";

    if (direction === "down") {
      this.slides[this.slideIndex - 1].classList.add("fadeInUp");
      this.slides[this.slideIndex - 1].addEventListener("animationend", () => {
        this.slides[this.slideIndex - 1].classList.remove("fadeInUp");
      });
    }
    if (direction === "up") {
      this.slides[this.slideIndex - 1].classList.add("fadeInDown");
      this.slides[this.slideIndex - 1].addEventListener("animationend", () => {
        this.slides[this.slideIndex - 1].classList.remove("fadeInDown");
      });
    }
  }

  plusSlides(n, direction) {
    this.showSlides((this.slideIndex += n), direction);
  }

  render() {
    try {
      this.hanson = document.querySelector(".hanson");
    } catch (e) {}

    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.plusSlides(1, "down");
      });

      btn.parentNode.previousElementSibling.addEventListener("click", (e) => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex, "up");
      });
    });

    this.showSlides(this.slideIndex);
  }
}
