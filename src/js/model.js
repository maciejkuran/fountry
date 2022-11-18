import {
  fetchData,
  formatNumber,
  addValueBetweenWords,
  currencyCheck,
  capitalCheck,
  languagesCheck,
} from './helpers.js';
import { COUNTRIES_API } from './config.js';

//Holds important data
export const state = {
  countryData: {}, // specific country data
  allCountryNames: [], //sorted array of all country names
};

//Get all countries in the world
export const getAllCountryNames = async () => {
  const data = await fetchData(`${COUNTRIES_API}all`);
  data.forEach(object => state.allCountryNames.push(object.name.common));
  state.allCountryNames.sort();
};

//Getting data based on dropdown click and storing to state.countryData object
export const getDataBasedOnDropdownClick = async clickedCountry => {
  try {
    const [data] = await fetchData(`${COUNTRIES_API}name/${clickedCountry}`);
    addPropertiesCountryDataObject(data);
  } catch (err) {
    throw err;
  }
};
//Getting data based on user input and storing to state.countryData object
export const getDataBasedOnInput = async input => {
  try {
    const allResults = await fetchData(`${COUNTRIES_API}all`);
    //prettier-ignore
    const data = allResults.find(country =>
      country.name.common.toLowerCase() === input ||
      country.name.official.toLowerCase() === input
  );

    if (data === undefined) throw new Error('Country not found');

    addPropertiesCountryDataObject(data);
  } catch (err) {
    throw err;
  }
};

//Helper function - setting properties and values to state.countryData object
const addPropertiesCountryDataObject = data => {
  state.countryData.name = data.name.common;
  state.countryData.nameOfficial = data.name.official;
  state.countryData.flag = data.flags.png;
  state.countryData.coatOfArms = data.coatOfArms.png;
  state.countryData.region = data.region;
  state.countryData.subregion = data.subregion;
  state.countryData.capital = capitalCheck(data);
  state.countryData.area = formatNumber(data.area);
  state.countryData.carSide = data.car.side;
  state.countryData.capitalCoords = data.capitalInfo.latlng;
  state.countryData.timezones = data.timezones.join(', ');
  state.countryData.languages = languagesCheck(data);
  state.countryData.population = formatNumber(data.population);
  state.countryData.currency = currencyCheck(data);
};

//Leaflet map
export const loadMap = (coords, city, country) => {
  //Before initializing map check for if the map is already initiated or not
  const container = L.DomUtil.get('map');
  if (container != null) {
    container._leaflet_id = null;
  }

  if (!coords) return;

  const map = L.map('map').setView(coords, 4);

  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map);

  L.marker(coords)
    .addTo(map)
    .bindPopup(`🌍 ${city}, the capital of ${country}`)
    .openPopup();

  map.scrollWheelZoom.disable();
  map.on('focus', () => {
    map.scrollWheelZoom.enable();
  });
  map.on('blur', () => {
    map.scrollWheelZoom.disable();
  });
};
