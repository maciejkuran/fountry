class MainImgView {
  createMarkup(mainImg) {
    const pictureTag = document.createElement('picture');
    pictureTag.classList.add('country-main-img');
    pictureTag.innerHTML = `
  <a target="_blank" href="${mainImg.imgOnUnsplash}"
            ><img src="${mainImg.url}" alt=""
          /></a>
          <p class="author">
            Photo by
            <a target="_blank" href="${mainImg.authorPage}">${mainImg.author}</a> on
            <a target="_blank" href="https://unsplash.com">Unsplash</a>
          </p>
          <a target="_blank" href="${mainImg.download}">
        <button class="download-btn">
          <i class="fa-solid fa-file-arrow-down"></i>
          </button>
      </a>
  `;
    document.querySelector('.general-data').after(pictureTag);
  }
}

export default new MainImgView();
