export class Previewer {
  el = document.getElementById("previewer");
  /** @type {HTMLElement}*/
  loading;
  /** @type {HTMLImageElement}*/
  panel;

  constructor() {
    this.loading = this.el.querySelector(".loading");
    this.panel = this.el.querySelector(".panel");
  }

  disable() {
    this.el.classList.add("inactive");
    this.panel.setAttribute("hidden", "true");
  }

  enable() {
    this.el.classList.remove("inactive");
    this.panel.removeAttribute("hidden");
  }

  removeLoading() {
    this.loading.setAttribute("hidden", "true");
  }

  addLoading() {
    this.loading.removeAttribute("hidden");
  }

  start() {
    this.addLoading();
    this.disable();
  }

  /**
   * @param {string} url
   * @param {string} originalName
   */
  preview(url, originalName) {
    this.removeLoading();
    this.enable();
    this.panel.src = url;
    this.panel.alt = originalName;
  }
}
