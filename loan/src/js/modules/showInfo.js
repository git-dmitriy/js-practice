export default class ShowInfo {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
  }

  init() {
    try {
      this.btns.forEach((btn) => {
        const sibling = btn.closest(".module__info-show").nextElementSibling;
        btn.addEventListener("click", () => {
          sibling.style.marginTop = "20px";
          sibling.classList.toggle("msg");
        });
      });
    } catch (e) {}
  }
}
