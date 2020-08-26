export default class Slider {
  constructor(page, btns) {
    this.page = document.querySelector(page);
    this.slides = this.page.children;
    this.btns = document.querySelectorAll(btns);
    this.slideIndex = 1;
  }

  showSlides(n, direction) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    this.slides.forEach((slide) => {
      slide.style.display = "none";
      slide.classList.add("animated");
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
    // if (n > this.n) {

    // }

    this.showSlides((this.slideIndex += n), direction);
  }

  render() {
    // this.showSlides(1, "up");
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
