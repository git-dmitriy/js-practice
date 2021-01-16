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
    const slides = document.querySelectorAll(this.slides);
    const prev = document.querySelector(this.prev);
    const next = document.querySelector(this.next);
    const dotsWrap = document.querySelector(this.dotsWrap);
    const dotsClass = this.dots.substr(1);
    const dots = createDots();

    showSlide(slideIndex);

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

    function createDots() {
      const dots = [];
      for (let i = 0; i < slides.length; i++) {
        dots.push(document.createElement("span"));
      }

      dots.forEach((element) => {
        element.classList.add(dotsClass);
        dotsWrap.append(element);
      });
      return dots;
    }

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
  }
}
