import getScrollbarWidth from "./getScrollbarWidth";

const images = () => {
  const imgPopup = document.createElement("div"),
    workSection = document.querySelector(".works"),
    bigImage = document.createElement("img"),
    scrollWidth = getScrollbarWidth();

  workSection.addEventListener("click", (e) => {
    e.preventDefault();

    imgPopup.classList.add("popup");
    workSection.appendChild(imgPopup);

    imgPopup.style.justifyContent = "center";
    imgPopup.style.alignItems = "center";
    imgPopup.style.display = "none";

    imgPopup.appendChild(bigImage);

    let target = e.target;

    if (target && target.classList.contains("preview")) {
      imgPopup.style.display = "flex";
      document.body.style.overflowY = "hidden";
      document.body.style.marginRight = `${scrollWidth}px`;

      const path = target.parentNode.getAttribute("href");
      bigImage.setAttribute("src", path);

      if (window.innerWidth <= 992 && window.innerWidth > 768) {
        bigImage.style.maxWidth = "60vw";
      } else if (window.innerWidth <= 768 && window.innerWidth > 576) {
        bigImage.style.maxWidth = "70vw";
      } else if (window.innerWidth <= 576) {
        bigImage.style.maxWidth = "95vw";
      } else {
        bigImage.style.maxWidth = "50vw";
      }

      const closePopup = () => {
        imgPopup.style.display = "none";
        document.body.style.overflowY = "";
        document.body.style.marginRight = `0px`;
        window.removeEventListener("resize", closePopup);
      };

      window.addEventListener("resize", closePopup);
    }

    if (
      (target && target.matches("div.popup")) ||
      target.matches("div.popup > img")
    ) {
      imgPopup.style.display = "none";
      document.body.style.overflowY = "";
      document.body.style.marginRight = `0px`;
    }
  });
};

export default images;
