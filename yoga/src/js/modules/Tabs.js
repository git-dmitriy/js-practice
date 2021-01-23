export class Tabs {
  constructor(options) {
    this.tabs = options.tabs;
    this.tabsHeader = options.tabsHeader;
    this.tabsContent = options.tabsContent;
  }

  init() {
    let tabs = document.querySelectorAll(this.tabs),
      tabsHeader = document.querySelector(this.tabsHeader),
      tabsContent = document.querySelectorAll(this.tabsContent);

    tabsHeader.addEventListener("click", (event) => {
      let target = event.target;
      tabs.forEach((element) => {
        element.classList.remove(`${this.tabs.substr(1)}_active`);
      });
      if (target && target.classList.contains(this.tabs.substr(1))) {
        for (let i = 0; i < tabs.length; i++) {
          if (target == tabs[i]) {
            target.classList.add(`${this.tabs.substr(1)}_active`);
            hideTabContent(0);
            showTabContent(i);
            break;
          }
        }
      }
    });

    tabs[0].classList.add(`${this.tabs.substr(1)}_active`);
    hideTabContent(1);

    function hideTabContent(a) {
      for (let i = a; i < tabsContent.length; i++) {
        tabsContent[i].classList.remove("show");
        tabsContent[i].classList.add("hide");
      }
    }

    function showTabContent(element) {
      if (tabsContent[element].classList.contains("hide")) {
        tabsContent[element].classList.remove("hide");
        tabsContent[element].classList.add("show");
      }
    }
  }
}
