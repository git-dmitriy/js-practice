const sliders = (slides, dir, prev, next) => {
  let slideIndex = 1;

  const items = document.querySelectorAll(slides);

  function showSlide(n) {
    if (n > items.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = items.length;
    }

    items.forEach((item) => {
      item.classList.add("animated");
      item.style.display = "none";
    });

    items[slideIndex - 1].style.display = "block";
  }

  showSlide(slideIndex);

  function selectSlide(n) {
    showSlide((slideIndex += n));
  }

  try {
    const prevBtn = document.querySelector(prev),
      nextBtn = document.querySelector(next);

    prevBtn.addEventListener("click", () => {
      selectSlide(-1);
      items[slideIndex - 1].classList.remove("slideInLeft");
      items[slideIndex - 1].classList.add("slideInRight");
    });
    nextBtn.addEventListener("click", () => {
      selectSlide(1);
      items[slideIndex - 1].classList.remove("slideInRight");
      items[slideIndex - 1].classList.add("slideInLeft");
    });
  } catch (e) {}

  if (dir === "vertical") {
    setInterval(function () {
      selectSlide(1);
      items[slideIndex - 1].classList.add("slideInDown");
    }, 3000);
  } else {
    setInterval(function () {
      selectSlide(1);
      items[slideIndex - 1].classList.remove("slideInRight");
      items[slideIndex - 1].classList.add("slideInLeft");
    }, 3000);
  }
};

export default sliders;
