class Dropdown {
  #dropdownOptions = document.querySelector('.dropdown-options');
  #dropdownBtn = document.querySelector('.dropdown-btn');

  addHandler() {
    this.#dropdownBtn.addEventListener('click', () => this.#toggleDropdown());
  }

  //Rendering all dropdown options
  renderDropdownOptions(allCountryNames) {
    allCountryNames.forEach(name => {
      const button = document.createElement('button');
      button.classList.add('option');
      button.textContent = name;
      this.#dropdownOptions.append(button);
    });
  }
  //Enabling toggling options container on btn click
  #toggleDropdown() {
    this.#dropdownOptions.classList.toggle('hide');
    this.#dropdownBtn.classList.toggle('dropdown-btn--active');
  }

  //Remove active classes of dropdown if user clicks on country
  removeActiveClassesDropdown() {
    if (!this.#dropdownOptions.classList.contains('hide'))
      this.#dropdownOptions.classList.add('hide');
    if (this.#dropdownBtn.classList.contains('dropdown-btn--active'))
      this.#dropdownBtn.classList.remove('dropdown-btn--active');
  }
}

export default new Dropdown();
