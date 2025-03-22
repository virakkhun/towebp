import { SUPPORTED_INPUT } from "./const.js";

export class SupportedInputBadge {
  #el = document.querySelector(".supported-input");

  constructor() {
    SUPPORTED_INPUT.map((type) => this.#item(type)).forEach((el) => {
      this.#el.appendChild(el);
    });
  }

  /** @param {string} type */
  #item(type) {
    const p = document.createElement("p");
    p.textContent = type.replace(/(image\/)/, "");
    p.classList.add("item");
    return p;
  }
}
