import $ from "../core";

$.prototype.modal = function () {
  for (let i = 0; i < this.length; i++) {
    const target = this[i].getAttribute("data-target");

    $(this[i]).click((e) => {
      e.preventDefault();
      $(target).fadeIn(500, "block");
      document.body.style.overflow = "hidden";
      //    ! Устранить смещение контента при исчезновении полосы прокрутки
    });
  }
  const closeElements = document.querySelectorAll("[data-close]");
  closeElements.forEach((element) => {
    $(element).click(() => {
      $(".modal").fadeOut(500);
      document.body.style.overflow = "";
    });
  });
  $(".modal").click((e) => {
    if (e.target.classList.contains("modal")) {
      $(".modal").fadeOut(500);
      document.body.style.overflow = "";
    }
  });
};

$('[data-toggle="modal"]').modal();
