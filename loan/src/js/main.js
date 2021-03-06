import MainSlider from "./modules/sliders/slider-main";
import MiniSlider from "./modules/sliders/slider-mini";
import VideoPlayer from "./modules/playVideo";
import Difference from "./modules/difference";
import Forms from "./modules/forms";
import ShowInfo from "./modules/showInfo";
import Download from "./modules/download";

window.addEventListener("DOMContentLoaded", () => {
  const slider = new MainSlider({ container: ".page", btns: ".next" });
  slider.render();

  const secondPageSlider = new MainSlider({
    container: ".moduleapp",
    btns: ".next",
    multiplePrev: ".prevmodule",
    multipleNext: ".nextmodule",
  });
  secondPageSlider.render();

  const showUpSlider = new MiniSlider({
    container: ".showup__content-slider",
    prev: ".showup__prev",
    next: ".showup__next",
    activeClass: "card-active",
    animate: true,
  });
  showUpSlider.init();

  const modulesSlider = new MiniSlider({
    container: ".modules__content-slider",
    prev: ".modules__info-btns .slick-prev",
    next: ".modules__info-btns .slick-next",
    activeClass: "card-active",
    animate: true,
    autoPlay: true,
  });
  modulesSlider.init();

  const feedSlider = new MiniSlider({
    container: ".feed__slider",
    prev: ".feed__slider .slick-prev",
    next: ".feed__slider .slick-next",
    activeClass: "feed__item-active",
  });
  feedSlider.init();

  new VideoPlayer(".showup .play", ".overlay").init();
  new VideoPlayer(".module__video-item .play", ".overlay").init();

  new Difference(".officerold", ".officernew", ".officer__card-item").init();

  new Forms(".form").init();

  new ShowInfo(".plus").init();

  new Download(".download").init();
});

// * Добавить фильтрацию для третьего слайдера

//  todo Добавить правильную анимацию при возвращении на первый экран по стрелке вниз

// +todo Отключать автовоспроизведение слайдера при появлении мыши в области слайдера

// +todo Перенести инициализацию кнопок страницы modules в класс Slider
