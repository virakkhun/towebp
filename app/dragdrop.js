export class DragDrop {
  el = document.getElementById("drag-zone");

  /**
   * @typedef {Object} Callback
   * @prop {(file: File) => void} fn
   *
   * @param {Callback} callback
   */
  onDragDrop(callback) {
    this.el.addEventListener("dragover", (e) => {
      e.preventDefault();
      this.el.classList.add("dragging");
    });

    this.el.addEventListener("dragenter", (e) => {
      e.preventDefault();
      this.el.classList.add("enter");
    });

    this.el.addEventListener("dragleave", (e) => {
      e.preventDefault();
      this.el.classList.remove("enter");
      this.el.classList.remove("dragging");
    });

    this.el.addEventListener("drop", (ev) => {
      ev.preventDefault();

      const file = ev.dataTransfer.files[0];
      if (!file) return;

      callback.fn(file);

      this.el.classList.remove("enter");
      this.el.classList.remove("dragging");
    });
  }
}
