import { Popup } from "./modules/Popup";
import { Slider } from "./modules/Slider";
import { Tabs } from "./modules/Tabs";
import { Timer } from "./modules/Timer";
import Cleave from "cleave.js";
require("cleave.js/dist/addons/cleave-phone.ru.js");

// const Cleave = require("cleave.js");
// require("cleave.js/dist/addons/cleave-phone.{country}");

window.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const tabs = new Tabs({
    tabs: ".info-header-tab",
    tabsHeader: ".info-header",
    tabsContent: ".info-tab-content",
  });

  const timer = new Timer({
    container: "#timer",
    endDate: {
      year: "2021",
      month: "09",
      day: "21",
      hours: "00",
      minutes: "00",
      seconds: "00",
    },
  });

  // popup

  const popup = new Popup({
    btn: ".more",
    overlay: ".overlay",
    closeBtn: ".popup-close",
    fixedHeader: "header",
  });

  const description = new Popup({
    btn: ".description-btn",
    overlay: ".overlay",
    closeBtn: ".popup-close",
    fixedHeader: "header",
  });

  const slider = new Slider({
    slides: ".slider-item",
    prevBtn: ".prev",
    nextBtn: ".next",
    dotsWrap: ".slider-dots",
    dots: ".dot",
  });

  tabs.init();
  timer.init();
  slider.init();
  popup.init();
  description.init();

  const cleave = new Cleave(".phone", {
    phone: true,
    phoneRegionCode: "RU",
  });
  const popupPhone = new Cleave("#phone", {
    phone: true,
    phoneRegionCode: "RU",
  });

  //  Form

  let message = {
    loading: "Пожлуйста подождите...",
    succes: "Спасибо! Мы скоро свяжемся с вами!",
    failure: "Что-то пошло не так...",
  };

  let form = document.querySelector(".main-form"),
    input = form.getElementsByTagName("input"),
    statusMessage = document.createElement("div");

  statusMessage.classList.add("status");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.appendChild(statusMessage);

    let request = new XMLHttpRequest();
    request.open("POST", "server.php");
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    let formData = new FormData(form);
    request.send(formData);

    request.addEventListener("readystatechange", function () {
      if (request.reqdyState < 4) {
        statusMessage.innerHTML = message.loading;
      } else if (request.readyState === 4 && request.status == 200) {
        statusMessage.innerHTML = message.succes;
      } else {
        statusMessage.innerHTML = message.failure;
      }
    });
  });

  // calculator

  let persons = document.querySelectorAll(".counter-block-input")[0],
    restDays = document.querySelectorAll(".counter-block-input")[1],
    place = document.getElementById("select"),
    totalValue = document.getElementById("total"),
    personsSum = 0,
    daysSum = 0,
    total = 0;

  totalValue.innerHTML = 0;

  persons.addEventListener("input", function () {
    personsSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (restDays.value == "") {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
  });

  restDays.addEventListener("input", function () {
    daysSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (persons.value == "") {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
  });

  place.addEventListener("input", function () {
    if ((restDays.value == "") | (RTCSessionDescription.value == "")) {
      totalValue.innerHTML = 0;
    } else {
      let a = total;
      totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }
  });
});
