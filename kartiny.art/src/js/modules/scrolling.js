const scrolling = (upSelector) => {
  const upElement = document.querySelector(upSelector);
  console.log(upElement);
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 1650) {
      console.log(`scroll > 1650px`);
      upElement.classList.add("animated", "fadeIn");
      upElement.classList.remove("fadeOut");
    } else {
      upElement.classList.add("fadeOut");
      upElement.classList.remove("fadeIn");
    }
  });

  const element = document.documentElement,
    body = document.body;

  const calcScroll = () => {
    upElement.addEventListener("click", function (event) {
      let scrollTop = Math.round(body.scrollTop || element.scrollTop);

      if (this.hash !== "") {
        event.preventDefault();
        let hashElement = document.querySelector(this.hash),
          hashElementTop = 0;

        while (hashElement.offSetParent) {
          hashElementTop += hashElement.offsetTop;
          hashElement = hashElement.offSetParent;
        }
        hashElementTop = Math.round(hashElementTop);
        smoothScroll(scrollTop, hashElement, this.hash);
      }
    });
  };

  const smoothScroll = (from, to, hash) => {
    let timeInteraval = 1,
      prevScrollTop,
      speed;

    if (to > from) {
      speed = 30;
    } else {
      speed = -30;
    }
    let move = setInterval(function () {
      let scrollTop = Math.round(body.scrollTop || element.scrollTop);

      if (
        prevScrollTop === scrollTop ||
        (to > from && scrollTop >= to) ||
        (to < from && scrollTop <= to)
      ) {
        clearInterval(move);
        history.replacestate(
          history.state,
          document.title,
          location.href.replace(/#.*$/g, "") + hash
        );
      } else {
        console.log(`Пролистываем на ${scrollTop}`);
        body.scrollTop += speed;
        element.scrollTop += speed;
        prevScrollTop = scrollTop;
      }
    }, timeInteraval);
  };
  calcScroll();
};

export default scrolling;
