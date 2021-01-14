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
    let scrollWidth = this.getScrollbarWidth();

    moreBtn.addEventListener("click", (event) => {
      overlay.style.display = "block";
      // event.target.classList.add(`${this.btn.substr(1)}-splash`);
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = `${scrollWidth}px`;
    });

    closeBtn.addEventListener("click", function () {
      overlay.style.display = "none";
      // moreBtn.classList.remove(`${this.btn.substr(1)}-splash`);
      document.body.style.overflow = "";
      document.body.style.marginRight = "";
    });
  }

  getScrollbarWidth() {
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
}
