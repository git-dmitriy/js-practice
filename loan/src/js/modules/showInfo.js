export default class ShowInfo {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
  }

  init() {
    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.closest(".module__info-show").nextElementSibling.style.display =
          "block";
      });
    });
  }
}
