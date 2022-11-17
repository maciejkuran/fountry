import * as model from './model.js';
import dropdownView from './views/dropdownView.js';
import infoboxView from './views/infoboxView.js';

//Controlling dropdown options
const initDropdownOptions = async () => {
  //get all countries
  await model.getAllCountryNames();
  //render dropdown options in DOM
  dropdownView.renderDropdownOptions(model.state.allCountryNames);
  //allow toggling options container
  dropdownView.addHandler();
};

initDropdownOptions();

//Control rendering based on user input
const controlRenderUserInput = async () => {
  await model.getDataBasedOnInput(infoboxView.inputValue());
  infoboxView.createMarkup(model.state.countryData);
};

//Control rendering based on dropdown
const controlRenderDropdown = () => {};

//Handlers
const handlers = () => {
  infoboxView.searchBtnHandler(controlRenderUserInput);
};

handlers();
