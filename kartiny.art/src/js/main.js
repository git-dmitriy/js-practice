import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";
import showMoreStyles from "./modules/showMoreStyles";
import calc from "./modules/calc";
import filter from "./modules/filter";

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  modals();
  sliders(".feedback-slider-item", "", ".main-prev-btn", ".main-next-btn");
  sliders(".main-slider-item", "vertical");
  forms();
  mask("[name='phone']");
  checkTextInputs('[name="name"]');
  checkTextInputs('[name="message"]');
  showMoreStyles(".button-styles", "#styles .row");
  calc("#size", "#material", "#options", ".promocode", ".calc-price");
  filter();
});

// + TODO Убрать эффект смещения виджета подарка при открытии и закрытии модальных окон.

// TODO Добавить минимальный индекс положения курсора в форме
// TODO Пофиксить баг с focus в chrome
// TODO Исключить появление модальных окон при заполнении форм
// todo Исключить возможность заполнения текстовых форм автозаполнением английскими буквами

// todo исправить запрос на server.php

// todo Добавить обработку исключения при недоступности "базы данных" в модуле подгрузки данных

// todo Добавить в стоимость портрета при отправки формы

// todo Реализовать подгрузку данных для калькулятора.
