import getScrollbarWidth from "./getScrollbarWidth";

const modals = () => {
  let scrollWidth = getScrollbarWidth();
  function bindModal(
    triggerSelector,
    modalSelector,
    closeSelector,
    destroyTrigger = false
  ) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]");

    trigger.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        if (destroyTrigger) {
          item.remove();
        }

        windows.forEach((item) => {
          item.style.display = "none";
        });
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scrollWidth}px`;
      });
    });

    close.addEventListener("click", () => {
      windows.forEach((item) => {
        item.style.display = "none";
      });
      modal.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = "0px";
      // document.body.classList.remove('modal-open');
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        windows.forEach((item) => {
          item.style.display = "none";
        });
        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = "0px";
        // document.body.classList.remove('modal-open');
      }
    });
  }
  function showModalOnTimer(selector, time) {
    setTimeout(function () {
      let display;

      document.querySelectorAll("[data-modal").forEach((item) => {
        if (getComputedStyle(item).display !== "none") {
          display = "block";
        }
      });

      if (!display) {
        document.querySelector(selector).style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scrollWidth}px`;
      }
    }, time);
  }
  bindModal(".button-design", ".popup-design", ".popup-design .popup-close");
  bindModal(
    ".button-consultation",
    ".popup-consultation",
    ".popup-consultation .popup-close"
  );

  showModalOnTimer(".popup-consultation", 5000);
};

export default modals;
