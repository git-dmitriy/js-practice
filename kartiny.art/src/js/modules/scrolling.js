const scrolling = (upSelector) => {
  const upElement = document.querySelector(upSelector);

  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 1650) {
      console.log(`scroll > 1650px`);
      upElement.classList.add("animated", "fadeIn");
      upElement.classList.remove("fadeOut");
    } else {
      upElement.classList.add("fadeOut");
      upElement.classList.remove("fadeIn");
    }
  });
};

export default scrolling;
