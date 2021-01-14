export class Popup {
  constructor(options) {
    this.btn = options.btn;
    this.overlay = options.overlay;
    this.closeBtn = options.closeBtn;
    this.addition;
  }

  init() {
    let moreBtn = document.querySelector(this.btn);
    let overlay = document.querySelector(this.overlay);
    let closeBtn = document.querySelector(this.closeBtn);

    moreBtn.addEventListener("click", (event) => {
      overlay.style.display = "block";
      // event.target.classList.add(`${this.btn.substr(1)}-splash`);
      document.body.style.overflow = "hidden";
    });

    closeBtn.addEventListener("click", function () {
      overlay.style.display = "none";
      // moreBtn.classList.remove(`${this.btn.substr(1)}-splash`);
      document.body.style.overflow = "";
    });
  }
}
