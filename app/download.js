export class DownloadBtn {
  el = document.getElementById("btn");
  #timeoutId;

  constructor() {
    this.disable();
  }

  disable() {
    this.el.setAttribute("hidden", "true");
    this.el.classList.add("inactive");
  }

  enable() {
    this.el.removeAttribute("hidden");
    this.el.classList.remove("inactive");
  }

  /**
   * @param {string} url
   * @param {string} originalName
   */
  enableDownload(url, originalName) {
    this.enable();

    this.el.addEventListener("click", () => {
      this.#setup(url, originalName);

      if (this.#timeoutId) clearTimeout(this.#timeoutId);
      this.#timeoutId = setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 0);
    });
  }

  /**
   * @param {string} url
   * @param {string} originalName
   */
  #setup(url, originalName) {
    this.el.download = originalName;
    this.el.href = url;
  }
}
