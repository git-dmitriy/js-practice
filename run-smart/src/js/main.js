window.addEventListener("DOMContentLoaded", () => {
  let slider = tns({
    container: ".slider",
    items: 1,
    slideBy: "page",
    autoplay: false,
    controls: false,
    nav: false,
  });

  document.querySelector(".slider__prev").addEventListener("click", () => {
    slider.goTo("prev");
  });
  document.querySelector(".slider__next").addEventListener("click", () => {
    slider.goTo("next");
  });
});
