export class ProgressBar {
  /** @type {HTMLElement} */
  #el = document.createElement("div");
  #itemCounts = 0;

  constructor() {
    document.body.appendChild(this.#el);
    this.#el.classList.add("progress-bar");
  }

  /** @param {number} itemCounts */
  start(itemCounts) {
    this.#el.style.height = "0%";
    this.#itemCounts = itemCounts;
  }

  /** @param {number} completedItem */
  update(completedItem) {
    const progress = (completedItem / this.#itemCounts) * 100;
    this.#el.style.height = `${progress}%`;
  }
}
