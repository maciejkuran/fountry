class DescriptionView {
  createMarkup(countryDescription, countryData) {
    const pTag = document.querySelector('.internal-wrapper div p');
    pTag.innerHTML = countryDescription;
    // description section also contains a country flag. Let's create a markup for that.
    const img = document.createElement('img');
    img.src = countryData.flag;
    document.querySelector('.internal-wrapper').prepend(img);
  }
}

export default new DescriptionView();
