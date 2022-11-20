class ErrorView {
  #errorLabel = document.querySelector('.error-label-fixed');

  createMarkup(msg) {
    if (!this.#errorLabel) return;
    this.#errorLabel.classList.remove('hide');
    this.#errorLabel.textContent = msg;
  }

  clearMarkup() {
    this.#errorLabel.classList.add('hide');
  }
}

export default new ErrorView();
