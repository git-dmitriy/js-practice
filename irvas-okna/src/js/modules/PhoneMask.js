export default class PhoneMask {
  constructor(selector) {
    this.selector = selector;
  }

  createMask(event) {
    let matrix = "+7 (___) ___ __ __",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");

    if (def.length >= val.length) {
      val = def;
    }

    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ""
        : a;
    });
    if (event.type == "blur") {
      if (this.value.length == 2) {
        this.value = "";
      }
    }
  }

  init() {
    let inputs = document.querySelectorAll(this.selector);

    inputs.forEach((input) => {
      input.addEventListener("input", this.createMask);
      input.addEventListener("focus", this.createMask);
      input.addEventListener("blur", this.createMask);
    });
  }
}
