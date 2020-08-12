import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  modals();
  sliders(".feedback-slider-item", "", ".main-prev-btn", ".main-next-btn");
  sliders(".main-slider-item", "vertical");
  forms();
});

// TODO Убрать эффект смещения виджета подарка при открытии и закрытии модальных окон.
