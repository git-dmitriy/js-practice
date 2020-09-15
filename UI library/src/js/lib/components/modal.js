import $ from "../core";

$.prototype.modal = function () {
  for (let i = 0; i < this.length; i++) {
    const target = this[i].getAttribute("data-target");

    $(this[i]).click((e) => {
      e.preventDefault();
      $(target).fadeIn(500, "block");
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = `${_scrollWidth()}px`;
    });
  }
  const closeElements = document.querySelectorAll("[data-close]");
  closeElements.forEach((element) => {
    $(element).click(() => {
      $(".modal").fadeOut(500);
      document.body.style.overflow = "";
      document.body.style.marginRight = "";
    });
  });
  $(".modal").click((e) => {
    if (e.target.classList.contains("modal")) {
      $(".modal").fadeOut(500);
      document.body.style.overflow = "";
      document.body.style.marginRight = "";
    }
  });
};

$('[data-toggle="modal"]').modal();

function _scrollWidth() {
  let div = document.createElement("div");

  div.style.width = "50px";
  div.style.height = "50px";
  div.style.overflowY = "scroll";
  div.style.visibility = "hidden";

  document.body.appendChild(div);

  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollWidth;
}
