export class Popup {
  constructor(options) {
    this.btn = options.btn;
    this.overlay = options.overlay;
    this.closeBtn = options.closeBtn;
    this.fixedHeader = options.fixedHeader;
  }

  init() {
    let btns = document.querySelectorAll(this.btn);
    let overlay = document.querySelector(this.overlay);
    let closeBtn = document.querySelector(this.closeBtn);
    let scrollWidth = this.getScrollbarWidth();

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        overlay.style.display = "block";

        if (this.fixedHeader) {
          let header = document.querySelector(this.fixedHeader);
          let headerWidth = header.offsetWidth;
          header.style.width = `${headerWidth}px`;
        }
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scrollWidth}px`;
      });
    });

    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";

      document.body.style.overflow = "";
      document.body.style.marginRight = "";
      if (this.fixedHeader) {
        document.querySelector(this.fixedHeader).style.width = "";
      }
    });
  }

  getScrollbarWidth() {
    let div = document.createElement("div");

    div.style.cssText = `
      width: 50px;
      height: 50px;
      overflow-y: scroll;
      visibility: hidden;
    `;

    document.body.appendChild(div);

    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }
}
