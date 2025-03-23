import { Dialog } from "./dialog.js";

const templ = {};

templ.innerHTML = `
<div class="img-wrapper">
  <img class="img" src="{src}" />
</div>

<div class="info">
  <p class="filename">
    {name}
  </p>

  <div class="extra">
    <p class="text">{fileSize}</p>
    <p class="text">WebP</p>
  </div>
</div>

<div class="action flex row gap-sm">
  <button class="btn flat p-{id}">
    <img src="./public/svg/pointing-out.svg" width="20" height="20" />
  </button>
  <button type="button" class="btn flat d-{id}">
    <img src="./public/svg/download.svg" width="20" height="20" />
  </button>
</div>
`;

export class WebPResult {
  #el = document.querySelector(".result");
  #dialog = new Dialog();

  constructor() {}

  /**
   * @param {string} url
   * @param {number} fileSize
   * @param {string} name
   **/
  new(url, fileSize, name) {
    const item = this.#itemRef;
    const id = this.#makeId(name);
    const innerHTML = this.#buildTemplate(url, fileSize, name, id);
    item.innerHTML = innerHTML;
    this.#el.appendChild(item);
    this.#setupBtnPreview(url, fileSize, name, id);
    this.#setupDownloadBtn(url, name, id);
  }

  feedbackOnError(name, msg) {
    const item = this.#itemRef;

    item.style.display = "flex";
    item.style.flexDirection = "column";
    item.innerHTML = `
      <p>${name}</p>
      <p>${msg}</p>
`;

    this.#el.appendChild(item);
  }

  /**
   * @param {string} url
   * @param {number} fileSize
   * @param {string} name
   * @param {string} id
   **/
  #setupBtnPreview(url, fileSize, name, id) {
    const selector = `.p-${id}`;
    const btn = this.#el.querySelector(selector);

    btn.addEventListener("click", () => {
      this.#dialog.open({
        url: url,
        size: fileSize,
        name: name,
      });
    });
  }

  /**
   * @param {string} url
   * @param {string} name
   * @param {string} id
   **/
  #setupDownloadBtn(url, name, id) {
    const selector = `.d-${id}`;
    const btn = this.#el.querySelector(selector);

    btn.addEventListener("click", () => {
      const anchor = document.createElement("a");
      anchor.style.display = "none";
      anchor.href = url;
      anchor.download = name;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    });
  }

  get #itemRef() {
    const ref = document.createElement("div");
    ref.classList.add("item");
    return ref;
  }

  /**
   * @param {string} src
   * @param {number} fileSize
   * @param {string} name
   * @param {string} id
   **/
  #buildTemplate(src, fileSize, name, id) {
    return templ.innerHTML
      .replace(/{src}/g, src)
      .replace(/{fileSize}/g, fileSize)
      .replace(/{name}/g, name)
      .replace(/{id}/g, id);
  }

  /** @param {string} data */
  #makeId(data) {
    return data.replace(/(\s+|\.)/g, "_");
  }
}
