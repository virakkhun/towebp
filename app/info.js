import { formatFileSize } from "./utils.js";

export class Info {
  el = document.getElementById("label-info");

  showInfo(fileSize) {
    this.el.innerHTML = [formatFileSize(fileSize), ".webP"]
      .map(this.#item)
      .join("");
  }

  #item(text) {
    return `<p class="item">${text}</p>`;
  }
}
