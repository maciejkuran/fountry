class NavbarView {
  #searchBtn = document.querySelector('.search-countries-btn');
  #searchContainer = document.querySelector('.search-container');

  addHandler() {
    window.addEventListener('scroll', () => this.showSearchBtn());
    this.#searchBtn.addEventListener('click', () =>
      this.smoothScrollToSearchCont()
    );
  }

  showSearchBtn() {
    let position = window.scrollY;

    if (position > 300) this.#searchBtn.classList.remove('hide');
    if (position < 300) this.#searchBtn.classList.add('hide');
  }

  smoothScrollToSearchCont() {
    this.#searchContainer.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }
}

export default new NavbarView();
