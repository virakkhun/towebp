export class Quality {
  el = document.querySelector(".quality-ctrl");
  #value = 80;

  constructor() {
    const inputCtrl = this.el.querySelector("input");
    const value = this.el.querySelector(".value");

    value.textContent = inputCtrl.value;

    inputCtrl.addEventListener("input", () => {
      value.textContent = inputCtrl.value;
    });

    inputCtrl.addEventListener("change", () => {
      this.#value = inputCtrl.value;
    });
  }

  get value() {
    return this.#value;
  }
}
