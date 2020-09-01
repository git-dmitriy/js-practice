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

  bindTriggers(container, items, counter) {
    container.querySelector(".plus").addEventListener("click", () => {
      if (counter !== items.length - 2) {
        items[counter].style.display = "flex";
        items[counter].style.setProperty('animation-duration', '0.3s');
        items[counter].classList.add('animated', 'fadeInDown');
        counter++;
      } else {
        items[counter].style.display = "flex";
        items[counter].style.setProperty('animation-duration', '0.3s');
        items[counter].classList.add('animated', 'fadeInDown');
        items[items.length - 1].remove();
      }
    });
  }

  hideItems(items) {
    items.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = "none";
      }
    });
  }

  init() {
    this.hideItems(this.oldItems);
    this.hideItems(this.newItems);
    this.bindTriggers(this.officerOld, this.oldItems, this.oldCounter);
    this.bindTriggers(this.officerNew, this.newItems, this.newCounter);
  }
}
