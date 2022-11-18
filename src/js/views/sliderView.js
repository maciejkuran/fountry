class SliderView {
  #curSlide = 0;
  #maxSlide = 5;

  addHandler() {
    this.#curSlide = 0; //reset curSlide if new search happens
    const sliderBtnRight = document.querySelector('.slide-right-btn');
    const sliderBtnLeft = document.querySelector('.slide-left-btn');

    sliderBtnRight.addEventListener('click', () => this.nextSlide());
    sliderBtnLeft.addEventListener('click', () => this.prevSlide());
  }

  setSlide(slide) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(
      (sl, i) => (sl.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }

  nextSlide() {
    if (this.#curSlide === this.#maxSlide) {
      this.#curSlide = 0;
    } else {
      this.#curSlide++;
    }
    this.setSlide(this.#curSlide);
  }

  prevSlide() {
    if (this.#curSlide === 0) {
      this.#curSlide = this.#maxSlide;
    } else {
      this.#curSlide--;
    }
    this.setSlide(this.#curSlide);
  }

  createMarkup(sliderImgs) {
    const sliderWrapper = document.querySelector('.slider-wrapper'); //each slide will be appended here

    sliderImgs.forEach(img => {
      if (!img) return;

      const div = document.createElement('div');
      div.classList.add('slide');
      div.innerHTML = `
      
     <img src="${img.url}" alt="" />
              <p class="author">
                Photo by
                <a target="_blank" href="${img.authorPage}">${img.author}</a> on
                <a target="_blank" href="https://unsplash.com">Unsplash</a>
              </p>
              <a target="_blank" href="${img.download}">
              <button class="download-btn"><i class="fa-solid fa-file-arrow-down"></i></button>
              </a>
     `;
      sliderWrapper.append(div);
    });
  }
}

export default new SliderView();
