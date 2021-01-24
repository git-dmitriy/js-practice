import "./slider";
import modals from "./modules/modals";
import tabs from "./modules/tabs";
import forms from "./modules/forms";
import changeModalState from "./modules/changeModalState";
import timer from "./modules/timer";
import images from "./modules/images";
import PhoneMask from "./modules/PhoneMask";
import "lazysizes";

window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  let modalState = {};
  let deadline = "2022-01-01T00:00:00";

  changeModalState(modalState);
  modals();
  tabs(".glazing_slider", ".glazing_block", ".glazing_content", "active");
  tabs(
    ".decoration_slider",
    ".no_click",
    ".decoration_content > div > div",
    "after_click"
  );

  tabs(
    ".balcon_icons",
    ".balcon_icons_img",
    ".big_img > img",
    "do_image_more",
    "inline-block"
  );

  forms(modalState);
  timer(".container1", deadline);
  images();

  const phoneInputs = new PhoneMask(".phone").init();
});

/*
+ TODO  Закрытие модального окна после отправки формы

+ TODO  Очистка объекта после отправки формы

TODO Валидация формы на заполнение всех полей

+ TODO Добавить проверку открытых модальных окон,
     для функции showModalOnTimer

*/
