export class Feedback {
  #el = document.querySelector(".feedback");
  #timeoutId = 0;

  constructor() {}

  show(msg) {
    this.#el.textContent = msg;
    if (!this.#el.classList.contains("active"))
      this.#el.classList.add("active");
  }

  hide() {
    if (this.#timeoutId) clearTimeout(this.#timeoutId);
    this.#timeoutId = setTimeout(() => {
      this.#el.classList.remove("active");
    }, 2000);
  }
}
