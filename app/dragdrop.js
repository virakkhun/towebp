export class DragDrop {
  el = document.getElementById("drag-zone");

  /**
   * @typedef {Object} Callback
   * @prop {(file: FileList) => void} fn
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

      const files = ev.dataTransfer.files;
      if (!files) return;

      callback.fn(files);

      this.el.classList.remove("enter");
      this.el.classList.remove("dragging");
    });
  }
}
