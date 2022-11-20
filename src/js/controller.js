import * as model from './model.js';
import dropdownView from './views/dropdownView.js';
import infoboxView from './views/infoboxView.js';
import mainImgView from './views/mainimgView.js';
import sliderView from './views/sliderView.js';
import descriptionView from './views/descriptionView.js';
import linksView from './views/linksView.js';
import errorView from './views/errorView.js';

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

//Control rendering output based on user input
const controlOutputBasedOnInput = async () => {
  try {
    errorView.clearMarkup(); //clear error markup
    infoboxView.removeMarkup(); //remove old html markup
    // Getting actual data about the country
    await model.getDataBasedOnInput(infoboxView.inputValue());
    //Rendering markup in DOM
    infoboxView.createMarkup(model.state.countryData);
    //Rendering leaflet map
    model.loadMap(
      model.state.countryData.capitalCoords,
      model.state.countryData.capital,
      model.state.countryData.name
    );
    //Getting images data
    await model.getImages(infoboxView.inputValue());
    // Render main img
    mainImgView.createMarkup(model.state.mainImg);
    //Rendering slider imgs
    sliderView.createMarkup(model.state.sliderImgs);
    // Init slider
    sliderView.setSlide(0); //set first img as first slide
    sliderView.addHandler();
    //Rendering description
    await model.getDescription(infoboxView.inputValue());
    descriptionView.createMarkup(
      model.state.countryDescription,
      model.state.countryData
    );
    //Rendering links
    await model.getLinks(infoboxView.inputValue());
    linksView.createMarkup(model.state.sourceLinks);
    //Removing active classes from dropdown
    dropdownView.removeActiveClassesDropdown();
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
    //Rendering markup in DOM
    infoboxView.createMarkup(model.state.countryData);
    //Rendering leaflet map
    model.loadMap(
      model.state.countryData.capitalCoords,
      model.state.countryData.capital,
      model.state.countryData.name
    );
    //Getting images data
    await model.getImages(infoboxView.dropdownValue(e));
    // Render main img
    mainImgView.createMarkup(model.state.mainImg);
    //Rendering slider imgs
    sliderView.createMarkup(model.state.sliderImgs);
    // Init slider
    sliderView.setSlide(0); //set first img as first slide
    sliderView.addHandler();
    //Rendering description
    await model.getDescription(infoboxView.dropdownValue(e));
    descriptionView.createMarkup(
      model.state.countryDescription,
      model.state.countryData
    );
    //Rendering links
    await model.getLinks(infoboxView.inputValue());
    linksView.createMarkup(model.state.sourceLinks);
    //Removing active classes from dropdown
    dropdownView.removeActiveClassesDropdown();
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

//TODO:
//1) Get data from unsplash - model: DONE
//2) Main img view and render main img: DONE
//3) Make slider view and render slider - unsplash data: DONE
//4) Get data from Wikipedia description & links: DONE
//5) Make description view and render: DONE
//6) Make links view and render: DONE
//7) Handle errors everywhere! (render in DOM)
//8)**Refactor controlOutput functions in controller as they look the same
