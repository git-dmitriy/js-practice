import getScrollbarWidth from "./getScrollbarWidth";

const modals = () => {
  let scrollWidth = getScrollbarWidth();
  function bindModal(
    triggerSelector,
    modalSelector,
    closeSelector,
    closeClickOverlay = true
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
      if (e.target === modal && closeClickOverlay) {
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
      let anotherPopup = document.querySelector(".popup");

      if (anotherPopup && anotherPopup.offsetWidth == 0) {
        let display;
        document.querySelectorAll("[data-modal]").forEach((item) => {
          if (getComputedStyle(item).display !== "none") {
            display = "block";
          }
        });

        if (!display) {
          document.querySelector(selector).style.display = "block";
          document.body.style.overflow = "hidden";
          document.body.style.marginRight = `${scrollWidth}px`;
        }
      }
    }, time);
  }

  bindModal(
    ".popup_engineer_btn",
    ".popup_engineer",
    ".popup_engineer .popup_close"
  );

  bindModal(".phone_link", ".popup", ".popup .popup_close");

  bindModal(".popup_calc_btn", ".popup_calc", ".popup_calc_close");

  bindModal(
    ".popup_calc_button",
    ".popup_calc_profile",
    ".popup_calc_profile_close",
    false
  );

  bindModal(
    ".popup_calc_profile_button",
    ".popup_calc_end",
    ".popup_calc_end_close",
    false
  );

  showModalOnTimer("[data-modal-timer]", 6000);
};

export default modals;
