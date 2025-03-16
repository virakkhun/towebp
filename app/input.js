export class InputCtrl {
  el = document.getElementById("file");

  /**
   * @typedef {Object} Callback
   * @prop {(file: File) => void} fn
   *
   * @param {Callback} callback
   */
  onChange(callback) {
    this.el.addEventListener("change", (e) => {
      const file = e.target.files[0];

      if (!file) return;

      callback.fn(file);
    });
  }
}
