import getScrollbarWidth from "./getScrollbarWidth";

const images = () => {
  /*
  TODO + Отключить прокрутку страницы при открытии изображения

  TODO (+-) Контролировать размер изображения в модальном окне
         Добавлено не больше 50vw;

  */

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
      bigImage.style.maxWidth = "50vw";
    }

    if (target && target.matches("div.popup")) {
      imgPopup.style.display = "none";
      document.body.style.overflowY = "";
      document.body.style.marginRight = `0px`;
    }
  });
};

export default images;
