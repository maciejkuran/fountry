import { addValueBetweenWords } from '../helpers.js';
import icons from '../../img/icons/*.png'; //importing all icons

class Infobox {
  #header = document.querySelector('.home-header');
  #input = document.querySelector('.country-input');
  #searchBtn = document.querySelector('.search-btn');

  //Handlers
  searchBtnHandler(controlRenderUserInput) {
    this.#searchBtn.addEventListener('click', e => {
      e.preventDefault();
      controlRenderUserInput();
    });
  }

  //Getting userInput
  inputValue() {
    const userInput = this.#input.value.toLowerCase().trim();
    return addValueBetweenWords(userInput);
  }

  //Creating markup
  createMarkup(countryData) {
    const section = document.createElement('section');
    section.classList.add('country-content-container');
    section.innerHTML = `
    <div class="seperator"></div>
          <h2>about <span>${countryData.name}</span></h2>
  
          <div id="map"></div>
  
          <div class="general-data">
            <div class="imgs-flag--coat">
              <img src="${countryData.flag}" alt="${countryData.name} flag" />
              <img src="${countryData.coatOfArms}" alt="${countryData.name} coat of arms" />
            </div>
            <div class="seperator"></div>
            <h4>Official name</h4>
            <h3>${countryData.nameOfficial}</h3>
            <div class="other-data-grid">
              <div class="item">
                <img src="${icons.region}" alt="${countryData.name} region" />
                <div class="data">
                  <h4>Region & Subregion</h4>
                  <p>${countryData.region}, ${countryData.subregion}</p>
                </div>
              </div>
  
              <div class="item">
                <img src="${icons.capital}" alt="${countryData.name} capital city" />
                <div class="data">
                  <h4>Capital</h4>
                  <p>${countryData.capital}</p>
                </div>
              </div>
  
              <div class="item">
                <img src="${icons.area}" alt="${countryData.name}" />
                <div class="data">
                  <h4>Area</h4>
                  <p>${countryData.area} km<span class="square-unit">2</span></p>
                </div>
              </div>
  
              <div class="item">
                <img src="${icons.population}" alt="${countryData.name} population" />
                <div class="data">
                  <h4>Population</h4>
                  <p>${countryData.population} (estimated)</p>
                </div>
              </div>
  
              <div class="item">
                <img src="${icons.timezones}" alt="${countryData.name} timezones" />
                <div class="data">
                  <h4>Timezones</h4>
                  <p>${countryData.timezones}</p>
                </div>
              </div>
  
              <div class="item">
                <img src="${icons.languages}" alt="${countryData.name} languages" />
                <div class="data">
                  <h4>Languages</h4>
                  <p>${countryData.languages}</p>
                </div>
              </div>
  
              <div class="item">
                <img src="${icons.currency}" alt="${countryData.name} currency" />
                <div class="data">
                  <h4>Currency</h4>
                  <p>${countryData.currency}</p>
                </div>
              </div>
  
              <div class="item">
                <img src="${icons.car_side}" alt="${countryData.name} car side" />
                <div class="data">
                  <h4>Car side</h4>
                  <p>${countryData.carSide}</p>
                </div>
              </div>
            </div>
          </div>
  
          <div class="country-description">
            <div class="internal-wrapper">
              <div>
              <p></p>
              </div>
            </div>
          </div>
  
          <div class="slider-wrapper">
          <button class="slider-btn slide-left-btn">
              <i class="fa-solid fa-arrow-left-long"></i>
            </button>
            <button class="slider-btn slide-right-btn">
              <i class="fa-solid fa-arrow-right-long"></i>
            </button>
            </div>
            <div class="links-container">
            <div class="seperator"></div>
            <h4>links/sources</h4>
            <div class="links">
            </div>
            
          </div>  
    `;

    this.#header.append(section);
  }

  removeMarkup() {
    const createdSections = document.querySelectorAll(
      '.country-content-container'
    );

    if (createdSections) createdSections.forEach(section => section.remove());
  }
}

export default new Infobox();
