const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
  const header = document.querySelector(headerSelector),
    tabs = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector);

  function hideContent() {
    content.forEach(item => {
      item.display = 'none';
    });

    tab.forEach(item => {
      item.classList.remove(activeClass);
    });
  };

  function showcontent(i = 0) {
    content[i].display = 'block';
    tab[i].classList.add(activeClass);

  }

  hideContent();
  showcontent();

};

export default tabs;