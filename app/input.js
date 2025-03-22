export class InputCtrl {
  el = document.getElementById("file");

  /**
   * @typedef {Object} Callback
   * @prop {(file: FileList) => void} fn
   *
   * @param {Callback} callback
   */
  onChange(callback) {
    this.el.addEventListener("change", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();

      const files = e.target.files;

      if (!files) return;

      callback.fn(files);
    });
  }
}
