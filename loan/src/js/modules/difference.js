export default class Difference {
  constructor(officerOld, officerNew, items) {
    this.officerOld = document.querySelector(officerOld);
    this.officerNew = document.querySelector(officerNew);
    this.items = items;
    this.oldItems = this.officerOld.querySelectorAll(items);
    this.newItems = this.officerNew.querySelectorAll(items);
    this.newCounter = 0;
    this.oldCounter = 0;
  }

  bindTriggers() {
    this.officerOld.querySelector(".plus").addEventListener("click", () => {
      if (this.oldCounter !== this.oldItems.length - 2) {
        this.oldItems[this.oldCounter].style.display = "flex";
        this.oldCounter++;
      } else {
        this.oldItems[this.oldCounter].style.display = "flex";
        this.oldItems[this.oldItems.length - 1].remove();
      }
    });

    this.officerNew.querySelector(".plus").addEventListener("click", () => {
      if (this.newCounter !== this.newItems.length - 2) {
        this.newItems[this.newCounter].style.display = "flex";
        this.newCounter++;
      } else {
        this.newItems[this.newCounter].style.display = "flex";
        this.newItems[this.newItems.length - 1].remove();
      }
    });
  }

  hideItems() {
    this.oldItems.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = "none";
      }
    });

    this.newItems.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = "none";
      }
    });
  }

  init() {
    this.hideItems();
    this.bindTriggers();
  }
}
