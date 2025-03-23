export class Feedback {
  #el = document.querySelector(".feedback");
  #timeoutId = 0;
  #delay = 2000;

  constructor() {}

  /** @param {string} msg  */
  show(msg) {
    this.#el.textContent = msg;
    if (!this.#el.classList.contains("active"))
      this.#el.classList.add("active");
  }

  hide() {
    if (this.#timeoutId) clearTimeout(this.#timeoutId);
    this.#timeoutId = setTimeout(() => {
      this.#el.classList.remove("active");
    }, this.#delay);
  }
}
