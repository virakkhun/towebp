export class Alert {
  el = document.getElementById("alert");
  timeoutId;

  constructor() {}

  toggle() {
    this.el.toggleAttribute("hidden");
  }

  showAlert(message) {
    this.el.textContent = message;
    if (this.el.hasAttribute("hidden")) this.el.removeAttribute("hidden");

    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.toggle();
    }, 4000);
  }
}
