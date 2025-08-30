if (!customElements.get('browser-size')) {
  class BrowserSize extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      if (!this.isConnected) return;

      this.update();
      this.setUpResizeListener();
    }

    disconnectedCallback() {
      this.cleanUp();
    }

    update() {
      this.updateSize();
      this.updateUI();
    }

    updateSize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }

    updateUI() {
      for (const dimension of ['width', 'height']) {
        this.querySelector(`${dimension}-display`).innerText =
          this[dimension];
      }
    }

    setUpResizeListener() {
      window.addEventListener('resize', this.update.bind(this), {
        passive: true,
      });
    }

    cleanUp() {
      window.removeEventListener('resize', this.update);
    }
  }

  customElements.define('browser-size', BrowserSize);
}
