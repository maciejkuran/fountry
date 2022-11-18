import * as model from './model.js';
import dropdownView from './views/dropdownView.js';
import infoboxView from './views/infoboxView.js';

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
    //render err to DOM
  }
};

// initDropdownOptions();

//Control rendering output based on user input
const controlOutputBasedOnInput = async () => {
  try {
    infoboxView.removeMarkup(); //remove old html markup
    // Getting actual data
    await model.getDataBasedOnInput(infoboxView.inputValue());
    //Rendering markup in DOM
    infoboxView.createMarkup(model.state.countryData);
    //Rendering leaflet map
    model.loadMap(
      model.state.countryData.capitalCoords,
      model.state.countryData.capital,
      model.state.countryData.name
    );
  } catch (err) {
    //render err to DOM
  }
};

//Control rendering output based on dropdown user choice
const countrolOutputBasedOnDropdown = async e => {
  try {
    infoboxView.removeMarkup(); //remove old html markup
    //Getting data
    await model.getDataBasedOnDropdownClick(infoboxView.dropdownValue(e));
    //Rendering markup in DOM
    infoboxView.createMarkup(model.state.countryData);
    //Rendering leaflet map
    model.loadMap(
      model.state.countryData.capitalCoords,
      model.state.countryData.capital,
      model.state.countryData.name
    );
    dropdownView.removeActiveClassesDropdown();
  } catch (err) {
    // render err to DOM
  }
};

//Handlers
const handlers = async () => {
  infoboxView.searchBtnHandler(controlOutputBasedOnInput);
  infoboxView.dropdownBtnHandler(countrolOutputBasedOnDropdown);
};

const initApp = async () => {
  await initDropdownOptions();
  await handlers();
};

initApp();

//TODO:
//1) removeMarkup() after new search
//2) Render map
