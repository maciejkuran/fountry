import * as model from './model.js';
import navbarView from './views/navbarView.js';
import dropdownView from './views/dropdownView.js';
import infoboxView from './views/infoboxView.js';
import mainImgView from './views/mainimgView.js';
import sliderView from './views/sliderView.js';
import descriptionView from './views/descriptionView.js';
import linksView from './views/linksView.js';
import errorView from './views/errorView.js';

// Controlling navbar - displaying search btn when user scrolls up, by default search btn has set className 'hide' and smooth scroll to search container when click btn
const controlNavbar = () => {
  navbarView.addHandler();
};

controlNavbar();

// Controlling dropdown options
const initDropdownOptions = async () => {
  try {
    //get all countries
    await model.getAllCountryNames();
    //render dropdown options in DOM
    dropdownView.renderDropdownOptions(model.state.allCountryNames);
    //allow toggling options container
    dropdownView.addHandler();
  } catch (err) {
    //Rendering error message
    errorView.createMarkup(
      `🔴 Something went wrong: ${err.message} Try again!`
    );
  }
};

//Function gets and renders data, called in controlOutputBasedOnInput and controlOutputBasedOnDropdown
const fetchAndRender = async country => {
  errorView.clearMarkup(); //clear error markup
  infoboxView.removeMarkup(); //remove old html markup
  //Removing active classes from dropdown
  dropdownView.removeActiveClassesDropdown();
  //Rendering markup in DOM
  infoboxView.createMarkup(model.state.countryData);
  //Rendering leaflet map
  model.loadMap(
    model.state.countryData.capitalCoords,
    model.state.countryData.capital,
    model.state.countryData.name
  );
  //Getting images data
  await model.getImages(country);
  // Render main img
  mainImgView.createMarkup(model.state.mainImg);
  //Rendering slider imgs
  sliderView.createMarkup(model.state.sliderImgs);
  // Init slider
  sliderView.setSlide(0); //set first img as first slide
  sliderView.addHandler();
  //Rendering description
  await model.getDescription(country);
  descriptionView.createMarkup(
    model.state.countryDescription,
    model.state.countryData
  );
  //Rendering links
  await model.getLinks(country);
  linksView.createMarkup(model.state.sourceLinks);
};

//Control rendering output based on user input
const controlOutputBasedOnInput = async () => {
  try {
    // Getting actual data about the country
    await model.getDataBasedOnInput(infoboxView.inputValue());
    fetchAndRender(infoboxView.inputValue());
  } catch (err) {
    //Rendering error message
    errorView.createMarkup(
      `🔴 Something went wrong: ${err.message} Try again!`
    );
  }
};

//Control rendering output based on dropdown user choice
const controlOutputBasedOnDropdown = async e => {
  try {
    errorView.clearMarkup(); //clear error markup
    infoboxView.removeMarkup(); //remove old html markup
    //Getting data about the country
    await model.getDataBasedOnDropdownClick(infoboxView.dropdownValue(e));
    fetchAndRender(infoboxView.dropdownValue(e));
  } catch (err) {
    //Rendering error message
    errorView.createMarkup(
      `🔴 Something went wrong: ${err.message} Try again!`
    );
  }
};

//Handlers
const handlers = async () => {
  infoboxView.searchBtnHandler(controlOutputBasedOnInput);
  infoboxView.dropdownBtnHandler(controlOutputBasedOnDropdown);
};

const initApp = async () => {
  await initDropdownOptions();
  await handlers();
};

initApp();
