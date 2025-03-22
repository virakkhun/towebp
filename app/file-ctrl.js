import { supportedTypes } from "./utils.js";

export class FileCtrl {
  /** @type {FileList} */
  #items = [];
  #index = 0;
  #completed = 0;

  /**
   * @param {FileList} files
   * @param {(file: File) => void} onReady
   * */
  setFiles(files, onReady) {
    this.#items = [
      ...[...files].filter((f) => supportedTypes(f.type)),
      ...[...files].filter((f) => !supportedTypes(f.type)),
    ];
    this.#index = 0;
    this.#completed = 0;
    if (this.#items.length > 0) onReady(this.#items[this.#index]);
  }

  get files() {
    return this.#items;
  }

  get index() {
    return this.#index;
  }

  get maxIndex() {
    return this.#items.length - 1;
  }

  get total() {
    return this.#items.length;
  }

  get completed() {
    return this.#completed;
  }

  /** @param {(file: File) => void} onNext  */
  next(onNext) {
    this.#index += 1;
    onNext(this.#items[this.#index]);
  }

  incrementCompleted() {
    this.#completed += 1;
  }
}
