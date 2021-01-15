export class Slider {
  constructor(options) {
    this.slides = options.slides;
    this.prev = options.prevBtn;
    this.next = options.nextBtn;
    this.dotsWrap = options.dotsWrap;
    this.dots = options.dots;
  }

  init() {
    let slideIndex = 1;
    let slides = document.querySelectorAll(this.slides);
    let prev = document.querySelector(this.prev);
    let next = document.querySelector(this.next);
    let dotsWrap = document.querySelector(this.dotsWrap);
    let dots = document.querySelectorAll(this.dots);

    showSlide(slideIndex);

    function showSlide(n) {
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }

      slides.forEach((item) => (item.style.display = "none"));
      dots.forEach((item) => item.classList.remove("dot-active"));
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].classList.add("dot-active");
    }

    function changeSlide(n) {
      showSlide((slideIndex += n));
    }

    function currentSlide(n) {
      showSlide((slideIndex = n));
    }

    prev.addEventListener("click", () => {
      changeSlide(-1);
    });

    next.addEventListener("click", () => {
      changeSlide(1);
    });

    dotsWrap.addEventListener("click", (event) => {
      for (let i = 0; i < dots.length + 1; i++) {
        if (
          event.target.classList.contains("dot") &&
          event.target == dots[i - 1]
        ) {
          currentSlide(i);
        }
      }
    });
  }
}
