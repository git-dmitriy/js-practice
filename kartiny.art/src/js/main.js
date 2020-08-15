import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import masks from "./modules/masks";

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  modals();
  sliders(".feedback-slider-item", "", ".main-prev-btn", ".main-next-btn");
  sliders(".main-slider-item", "vertical");
  forms();
  masks("[name='phone']");
});

// TODO Убрать эффект смещения виджета подарка при открытии и закрытии модальных окон.

// TODO Добавить минимальный индекс положения курсора в форме
// TODO Пофиксить баг с focus в chrome
// TODO Исключить появление модальных окон при заполнении форм