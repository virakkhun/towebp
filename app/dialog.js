export class Dialog {
  #el = document.createElement("div");
  #container = document.createElement("div");
  #closed = true;

  constructor() {
    this.#setup();
  }

  #setup() {
    this.#el.classList.add("dialog");
    this.#el.addEventListener("click", () => this.close());
    document.body.appendChild(this.#el);
  }

  /**
   * @typedef {Object} Config
   * @prop {string} name
   * @prop {string} size
   * @prop {url} string
   * @param {Config} config
   * */
  open(config) {
    this.#closed = false;
    this.#el.appendChild(this.#container);
    this.#container.classList.add("container");
    this.#container.innerHTML = `
<h1 class="title">${config.name}</h1>
<div class="badge">
  <p class="item">${config.size}</p>
  <p class="item">WebP</p>
</div>
<div class="image">
  <img src="${config.url}" />
</div>
`;
    setTimeout(() => {
      this.#el.classList.add("active");
      this.#container.classList.add("active");
    }, 50);
  }

  close() {
    if (this.#closed) return;
    this.#el.classList.remove("active");
    this.#container.classList.remove("active");
    this.#container.remove();
  }
}
